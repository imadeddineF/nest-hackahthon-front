import { string, z } from "zod";
import { generateId } from "@/features/table/lib/id";

// Define enum values as constant arrays
const STATUS_VALUES = ["todo", "in-progress", "done", "canceled"] as const;
const LABEL_VALUES = [
	"bug",
	"feature",
	"enhancement",
	"documentation",
] as const;
const PRIORITY_VALUES = ["low", "medium", "high"] as const;

// Define enum types
// type StatusType = (typeof STATUS_VALUES)[number];
// type LabelType = (typeof LABEL_VALUES)[number];
// type PriorityType = (typeof PRIORITY_VALUES)[number];

// Create custom Zod enum schemas with enumValues property
const createZodEnum = <T extends readonly string[]>(values: T) => {
	// Create the enum
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const enumObj = z.enum(values as any);
	// Attach the values as a property
	return Object.assign(enumObj, { enumValues: values });
};

// Define task schema fields
export const tasks = {
	id: z.string().length(30).default(generateId),
	code: z.string().max(128),
	title: z.string().max(128).nullable().optional(),
	description: z.string(),
	status: createZodEnum(STATUS_VALUES),
	label: createZodEnum(LABEL_VALUES),
	priority: createZodEnum(PRIORITY_VALUES),
	estimatedHours: z.number(),
	assignee: z.string(),
	createdAt: z.date() || string,
	updatedAt: z.date() || string,
};

// Task schema using the defined fields
export const TaskSchema = z.object({
	id: tasks.id,
	code: tasks.code,
	title: tasks.title,
	description: tasks.description,
	status: tasks.status.default("todo"),
	label: tasks.label.default("bug"),
	priority: tasks.priority.default("low"),
	estimatedHours: tasks.estimatedHours.default(0),
	assignee: tasks.assignee,
	createdAt: tasks.createdAt.default(() => new Date()) || string,
	updatedAt: tasks.updatedAt.default(() => new Date()) || string,
});

// Type definitions
export type Task = z.infer<typeof TaskSchema>;

// For creating a new task
export const NewTaskSchema = TaskSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
}).extend({
	id: tasks.id.optional(),
	createdAt: tasks.createdAt.optional(),
	updatedAt: tasks.updatedAt.optional(),
});

export type NewTask = z.infer<typeof NewTaskSchema>;

// For updating an existing task
export const UpdateTaskSchema = NewTaskSchema.partial();
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;

// Helper functions
export function validateTask(data: unknown): Task {
	return TaskSchema.parse(data);
}

export function validateNewTask(data: unknown): NewTask {
	return NewTaskSchema.parse(data);
}

export function validateTaskUpdate(data: unknown): UpdateTask {
	return UpdateTaskSchema.parse(data);
}
