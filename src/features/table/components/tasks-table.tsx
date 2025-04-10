"use client";

import type { Task } from "@/features/table/types/schema";
import type { DataTableRowAction } from "@/features/table/types/data-table";
import * as React from "react";

import { DataTable } from "./data-table";
import { useDataTable } from "@/hooks/use-data-table";

import { DataTableAdvancedToolbar } from "./data-table-advanced-toolbar";
import { DataTableFilterList } from "./data-table-filter-list";
import { DataTableFilterMenu } from "./data-table-filter-menu";
import { DataTableSortList } from "./data-table-sort-list";
import { DataTableToolbar } from "./data-table-toolbar";
// import type {
//     getEstimatedHoursRange,
//     getTaskPriorityCounts,
//     getTaskStatusCounts,
//     getTasks,
// } from "../_lib/queries";
import { DeleteTasksDialog } from "./delete-tasks-dialog";
import { useFeatureFlags } from "./feature-flags-provider";
import { TasksTableActionBar } from "./tasks-table-action-bar";
import { getTasksTableColumns } from "./tasks-table-columns";
import { UpdateTaskSheet } from "./update-task-sheet";

interface TasksTableProps {
	promises: Promise<
		[
			//     Awaited<ReturnType<typeof getTasks>>,
			//     Awaited<ReturnType<typeof getTaskStatusCounts>>,
			//     Awaited<ReturnType<typeof getTaskPriorityCounts>>,
			//     Awaited<ReturnType<typeof getEstimatedHoursRange>>
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			Awaited<ReturnType<any>>,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			Awaited<ReturnType<any>>,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			Awaited<ReturnType<any>>,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			Awaited<ReturnType<any>>
		]
	>;
}

export function TasksTable({ promises }: TasksTableProps) {
	const { enableAdvancedFilter, filterFlag } = useFeatureFlags();

	const [
		{ data, pageCount },
		statusCounts,
		priorityCounts,
		estimatedHoursRange,
	] = React.use(promises);

	const [rowAction, setRowAction] =
		React.useState<DataTableRowAction<Task> | null>(null);

	const columns = React.useMemo(
		() =>
			getTasksTableColumns({
				statusCounts,
				priorityCounts,
				estimatedHoursRange,
				setRowAction,
			}),
		[statusCounts, priorityCounts, estimatedHoursRange]
	);

	const { table, shallow, debounceMs, throttleMs } = useDataTable({
		data,
		columns,
		pageCount,
		enableAdvancedFilter,
		initialState: {
			sorting: [{ id: "createdAt", desc: true }],
			columnPinning: { right: ["actions"] },
		},
		getRowId: (originalRow) => originalRow.id,
		shallow: false,
		clearOnDefault: true,
	});

	return (
		<>
			<DataTable
				table={table}
				actionBar={<TasksTableActionBar table={table} />}
			>
				{enableAdvancedFilter ? (
					<DataTableAdvancedToolbar table={table}>
						<DataTableSortList table={table} align="start" />
						{filterFlag === "advancedFilters" ? (
							<DataTableFilterList
								table={table}
								shallow={shallow}
								debounceMs={debounceMs}
								throttleMs={throttleMs}
								align="start"
							/>
						) : (
							<DataTableFilterMenu
								table={table}
								shallow={shallow}
								debounceMs={debounceMs}
								throttleMs={throttleMs}
							/>
						)}
					</DataTableAdvancedToolbar>
				) : (
					<DataTableToolbar table={table}>
						<DataTableSortList table={table} align="end" />
					</DataTableToolbar>
				)}
			</DataTable>
			<UpdateTaskSheet
				open={rowAction?.variant === "update"}
				onOpenChange={() => setRowAction(null)}
				task={rowAction?.row.original ?? null}
			/>
			<DeleteTasksDialog
				open={rowAction?.variant === "delete"}
				onOpenChange={() => setRowAction(null)}
				tasks={rowAction?.row.original ? [rowAction?.row.original] : []}
				showTrigger={false}
				onSuccess={() => rowAction?.row.toggleSelected(false)}
			/>
		</>
	);
}
