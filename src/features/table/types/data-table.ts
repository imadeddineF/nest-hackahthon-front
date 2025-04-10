import type { DataTableConfig } from "@/config/data-table";
import type { FilterItemSchema } from "@/features/table/lib/parsers";
import type { ColumnSort, Row, RowData } from "@tanstack/react-table";
import { z } from "zod";
import type { ElementType } from "react";

declare module "@tanstack/react-table" {
	// biome-ignore lint/correctness/noUnusedVariables: <explanation>
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface ColumnMeta<TData extends RowData, TValue> {
		label?: string;
		placeholder?: string;
		variant?: FilterVariant;
		options?: Option[];
		range?: [number, number];
		unit?: string;
		icon?: React.FC<React.SVGProps<SVGSVGElement>>;
	}
}

export interface Option {
	label: string;
	value: string;
	count?: number;
	icon?: ElementType;
}

export type FilterOperator = DataTableConfig["operators"][number];
export type FilterVariant = DataTableConfig["filterVariants"][number];
export type JoinOperator = DataTableConfig["joinOperators"][number];

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
	id: Extract<keyof TData, string>;
}

export type ExtendedColumnFilter<TData> = {
	id: Extract<keyof TData, string>;
	value: string | string[] | undefined;
	variant: FilterVariant;
	operator: FilterOperator;
	filterId: string;
};

export interface DataTableRowAction<TData> {
	row: Row<TData>;
	variant: "update" | "delete";
}

const TaskStatus = z.enum(["todo", "in-progress", "done", "canceled"]);
const TaskLabel = z.enum(["bug", "feature", "enhancement", "documentation"]);
const TaskPriority = z.enum(["low", "medium", "high"]);

export const TaskSchema = z.object({
	id: z.string().length(30),
	code: z.string().min(1).max(128),
	title: z.string().max(128).optional(),
	status: TaskStatus.default("todo"),
	label: TaskLabel.default("bug"),
	priority: TaskPriority.default("low"),
	estimatedHours: z.number().nonnegative().default(0),
	archived: z.boolean().default(false),
	createdAt: z.date().default(() => new Date()),
	updatedAt: z.date().default(() => new Date()),
});

export const NewTaskSchema = TaskSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
}).extend({
	id: z.string().length(30).optional(),
});
