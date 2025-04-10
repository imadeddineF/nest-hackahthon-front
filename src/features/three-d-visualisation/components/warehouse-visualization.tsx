"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import { Warehouse2D } from "./warehouse-2d";
import { fetchRobotData } from "../lib/api";
import type { Robot } from "../lib/types";

// Dynamically import the 3D component with SSR disabled
const Warehouse3D = dynamic(() => import("./warehouse-3d"), {
	ssr: false,
	loading: () => (
		<div className="flex items-center justify-center h-full">
			<p>Loading 3D view...</p>
		</div>
	),
});

export default function WarehouseVisualization() {
	const [selectedView, setSelectedView] = useState<"3d" | "2d">("3d");
	const [focusedRobotId, setFocusedRobotId] = useState<string | null>(null);

	// Fetch robot data using TanStack Query
	const {
		data: robots = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["robots"],
		queryFn: fetchRobotData,
		refetchInterval: 1000, // Refetch every second for real-time updates
	});

	const handleRobotSelect = (robotId: string) => {
		setFocusedRobotId(robotId === "all" ? null : robotId);
	};

	return (
		<div className="container mx-auto p-4 h-full flex flex-col">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Warehouse Robot Visualization</h1>
				<div className="flex items-center gap-4">
					<Select
						value={focusedRobotId || "all"}
						onValueChange={handleRobotSelect}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select Robot" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Robots</SelectItem>
							{robots.map((robot) => (
								<SelectItem key={robot.id} value={robot.id}>
									{robot.name} ({robot.type})
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Tabs
						value={selectedView}
						onValueChange={(v) => setSelectedView(v as "3d" | "2d")}
					>
						<TabsList>
							<TabsTrigger value="3d">3D View</TabsTrigger>
							<TabsTrigger value="2d">2D View</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
			</div>

			<Card className="flex-1">
				<CardContent className="p-0 h-full">
					{isLoading ? (
						<div className="flex items-center justify-center h-full">
							<p>Loading robot data...</p>
						</div>
					) : error ? (
						<div className="flex items-center justify-center h-full">
							<p className="text-red-500">Error loading robot data</p>
						</div>
					) : (
						<>
							{selectedView === "3d" ? (
								<Warehouse3D robots={robots} focusedRobotId={focusedRobotId} />
							) : (
								<Warehouse2D robots={robots} focusedRobotId={focusedRobotId} />
							)}
						</>
					)}
				</CardContent>
			</Card>

			<div className="mt-4 flex items-center gap-2 w-full">
				{robots.slice(0, 3).map((robot) => (
					<RobotStatusCard
						key={robot.id}
						robot={robot}
						isFocused={robot.id === focusedRobotId}
						onFocus={() => handleRobotSelect(robot.id)}
					/>
				))}
			</div>
		</div>
	);
}

function RobotStatusCard({
	robot,
	isFocused,
	onFocus,
}: {
	robot: Robot;
	isFocused: boolean;
	onFocus: () => void;
}) {
	return (
		<Card
			className={`cursor-pointer transition-all w-full ${
				isFocused ? "ring-2 ring-primary" : ""
			}`}
			onClick={onFocus}
		>
			<div className="p-4">
				<div className="flex justify-between items-start">
					<h3 className="text-lg font-medium">{robot.name}</h3>
					<Badge variant={robot.status === "active" ? "default" : "secondary"}>
						{robot.status}
					</Badge>
				</div>
				<p className="text-sm text-muted-foreground">Type: {robot.type}</p>
				<div className="grid grid-cols-2 gap-2 text-sm mt-2">
					<div>Position X: {robot.position.x.toFixed(2)}</div>
					<div>Position Y: {robot.position.y.toFixed(2)}</div>
					<div>Position Z: {robot.position.z.toFixed(2)}</div>
					<div>Battery: {robot.battery}%</div>
				</div>
			</div>
		</Card>
	);
}
