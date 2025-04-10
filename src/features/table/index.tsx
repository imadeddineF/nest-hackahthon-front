import React from "react";
// import type { SearchParams } from "@/types";

import { DataTableSkeleton } from "@/features/table/components/data-table-skeleton";
import { Shell } from "@/features/table/components/shell";
import { getValidFilters } from "@/features/table/lib/data-table";

import { FeatureFlagsProvider } from "@/features/table/components/feature-flags-provider";
import { TasksTable } from "@/features/table/components/tasks-table";
import {
	getEstimatedHoursRange,
	getTaskPriorityCounts,
	getTaskStatusCounts,
	getTasks,
} from "@/features/table/lib/queries";
import { searchParamsCache } from "@/features/table/lib/validations";

interface IndexPageProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	searchParams: Promise<any>;
	// searchParams: Promise<SearchParams>;
}

export async function Table(props: IndexPageProps) {
	const searchParams = await props.searchParams;
	const search = searchParamsCache.parse(searchParams);

	const validFilters = getValidFilters(search.filters);

	const promises = Promise.all([
		getTasks({
			...search,
			filters: validFilters,
		}),
		getTaskStatusCounts(),
		getTaskPriorityCounts(),
		getEstimatedHoursRange(),
	]);

	return (
		<Shell data-testid="users-table-shell" className="gap-2">
			<FeatureFlagsProvider>
				<React.Suspense
					fallback={
						<DataTableSkeleton
							columnCount={7}
							filterCount={2}
							cellWidths={[
								"10rem",
								"30rem",
								"10rem",
								"10rem",
								"6rem",
								"6rem",
								"6rem",
							]}
							shrinkZero
						/>
					}
				>
					<TasksTable promises={promises} />
				</React.Suspense>
			</FeatureFlagsProvider>
		</Shell>
	);
}
