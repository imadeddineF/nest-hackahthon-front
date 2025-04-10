import { type Task, tasks } from "@/features/table/types/schema";
import { faker } from "@faker-js/faker";
import {
	ArrowDownIcon,
	ArrowRightIcon,
	ArrowUpIcon,
	CheckCircle2,
	CircleHelp,
	CircleIcon,
	CircleX,
	Timer,
} from "lucide-react";
import { customAlphabet } from "nanoid";

import { generateId } from "@/features/table/lib/id";

export function generateRandomTask(): Task {
	return {
		id: generateId("task"),
		code: `TASK-${customAlphabet("0123456789", 4)()}`,
		title: faker.hacker
			.phrase()
			.replace(/^./, (letter) => letter.toUpperCase()),
		description: faker.lorem.paragraph(),
		assignee: faker.person.fullName(),
		estimatedHours: faker.number.int({ min: 1, max: 24 }),
		status: faker.helpers.shuffle(tasks.status.enumValues)[0] ?? "todo",
		label: faker.helpers.shuffle(tasks.label.enumValues)[0] ?? "bug",
		priority: faker.helpers.shuffle(tasks.priority.enumValues)[0] ?? "low",
		createdAt: new Date(),
		updatedAt: new Date(),
	};
}

export function getStatusIcon(status: Task["status"]) {
	const statusIcons: Record<Task["status"], React.ElementType> = {
		canceled: CircleX,
		done: CheckCircle2,
		"in-progress": Timer,
		todo: CircleHelp,
	};

	return statusIcons[status] || CircleIcon;
}

export function getPriorityIcon(priority: Task["priority"]) {
	const priorityIcons: Record<Task["status"], React.ElementType> = {
		high: ArrowUpIcon,
		low: ArrowDownIcon,
		medium: ArrowRightIcon,
	};

	return priorityIcons[priority] || CircleIcon;
}
