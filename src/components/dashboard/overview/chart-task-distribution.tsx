"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

// Sample data - would be replaced with actual robot task distribution data
const taskData = [
	{ task: "picking", count: 425, fill: "var(--color-picking)" },
	{ task: "placing", count: 310, fill: "var(--color-placing)" },
	{ task: "transporting", count: 280, fill: "var(--color-transporting)" },
	{ task: "scanning", count: 185, fill: "var(--color-scanning)" },
	{ task: "other", count: 120, fill: "var(--color-other)" },
];

const chartConfig = {
	count: {
		label: "Count",
	},
	picking: {
		label: "Picking",
		color: "hsl(var(--chart-1))",
	},
	placing: {
		label: "Placing",
		color: "hsl(var(--chart-2))",
	},
	transporting: {
		label: "Transporting",
		color: "hsl(var(--chart-3))",
	},
	scanning: {
		label: "Scanning",
		color: "hsl(var(--chart-4))",
	},
	other: {
		label: "Other",
		color: "hsl(var(--chart-5))",
	},
} satisfies ChartConfig;

interface ChartTaskDistributionProps {
	timeRange: string;
	robotId: string;
}

export function ChartTaskDistribution({
	timeRange,
	robotId,
}: ChartTaskDistributionProps) {
	// In a real application, we would filter data based on timeRange and robotId
	const totalTasks = React.useMemo(() => {
		return taskData.reduce((acc, item) => acc + item.count, 0);
	}, []);

	return (
		<ChartContainer
			config={chartConfig}
			className="aspect-auto h-[300px] w-full"
		>
			<PieChart>
				<ChartTooltip content={<ChartTooltipContent hideLabel />} />
				<Pie
					data={taskData}
					dataKey="count"
					nameKey="task"
					fill="#8884d8"
					innerRadius={60}
				>
					<Label
						content={({ viewBox }) => {
							if (viewBox && "cx" in viewBox && "cy" in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor="middle"
										dominantBaseline="middle"
									>
										<tspan
											x={viewBox.cx}
											y={viewBox.cy}
											className="fill-foreground text-3xl font-bold"
										>
											{totalTasks.toLocaleString()}
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 24}
											className="fill-muted-foreground"
										>
											Tasks
										</tspan>
									</text>
								);
							}
						}}
					/>
				</Pie>
			</PieChart>
		</ChartContainer>
	);
}
