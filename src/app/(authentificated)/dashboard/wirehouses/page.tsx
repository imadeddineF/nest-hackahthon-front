import React from "react";
import { WarehouseVisualization } from "@/features/three-d-visualisation";
// import type { SearchParams } from "@/types";

// import { Table } from "@/features/table";

interface IndexPageProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	searchParams: Promise<any>;
	// searchParams: Promise<SearchParams>;
}

async function Users(props: IndexPageProps) {
	const searchParams = await props.searchParams;

	return (
		<div className="h-full">
			{/* <Table searchParams={searchParams} /> */}
			<WarehouseVisualization />
		</div>
	);
}

export default Users;
