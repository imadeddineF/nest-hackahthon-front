"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

// Sample data - would be replaced with actual robot performance data
const performanceData = [
	{
		date: "2024-01-01",
		taskCompletion: 82,
		efficiency: 75,
		quality: 30,
		satisfaction: 79,
	},
	{
		date: "2024-01-15",
		taskCompletion: 84,
		efficiency: 77,
		quality: 87,
		satisfaction: 80,
	},
	{
		date: "2024-02-01",
		taskCompletion: 85,
		efficiency: 79,
		quality: 89,
		satisfaction: 81,
	},
	{
		date: "2024-02-15",
		taskCompletion: 86,
		efficiency: 80,
		quality: 88,
		satisfaction: 82,
	},
	{
		date: "2024-03-01",
		taskCompletion: 88,
		efficiency: 82,
		quality: 90,
		satisfaction: 83,
	},
	{
		date: "2024-03-15",
		taskCompletion: 90,
		efficiency: 83,
		quality: 91,
		satisfaction: 85,
	},
	{
		date: "2024-04-01",
		taskCompletion: 91,
		efficiency: 85,
		quality: 92,
		satisfaction: 86,
	},
	{
		date: "2024-04-15",
		taskCompletion: 93,
		efficiency: 86,
		quality: 93,
		satisfaction: 88,
	},
	{
		date: "2024-05-01",
		taskCompletion: 94,
		efficiency: 87,
		quality: 94,
		satisfaction: 89,
	},
	{
		date: "2024-05-15",
		taskCompletion: 95,
		efficiency: 88,
		quality: 94,
		satisfaction: 90,
	},
	{
		date: "2024-06-01",
		taskCompletion: 97,
		efficiency: 89,
		quality: 95,
		satisfaction: 91,
	},
	{
		date: "2024-06-02",
		taskCompletion: 98,
		efficiency: 90,
		quality: 95,
		satisfaction: 92,
	},
	{
		date: "2024-06-03",
		taskCompletion: 96,
		efficiency: 88,
		quality: 94,
		satisfaction: 90,
	},
	{
		date: "2024-06-04",
		taskCompletion: 97,
		efficiency: 91,
		quality: 96,
		satisfaction: 93,
	},
	{
		date: "2024-06-05",
		taskCompletion: 99,
		efficiency: 92,
		quality: 97,
		satisfaction: 94,
	},
	{
		date: "2024-06-06",
		taskCompletion: 98,
		efficiency: 93,
		quality: 96,
		satisfaction: 95,
	},
	{
		date: "2024-06-07",
		taskCompletion: 97,
		efficiency: 90,
		quality: 95,
		satisfaction: 92,
	},
	{
		date: "2024-06-08",
		taskCompletion: 96,
		efficiency: 89,
		quality: 94,
		satisfaction: 91,
	},
	{
		date: "2024-06-09",
		taskCompletion: 98,
		efficiency: 91,
		quality: 96,
		satisfaction: 93,
	},
	{
		date: "2024-06-10",
		taskCompletion: 99,
		efficiency: 94,
		quality: 97,
		satisfaction: 96,
	},
	{
		date: "2024-06-11",
		taskCompletion: 97,
		efficiency: 92,
		quality: 95,
		satisfaction: 94,
	},
	{
		date: "2024-06-12",
		taskCompletion: 98,
		efficiency: 93,
		quality: 96,
		satisfaction: 95,
	},
	{
		date: "2024-06-13",
		taskCompletion: 99,
		efficiency: 95,
		quality: 98,
		satisfaction: 97,
	},
	{
		date: "2024-06-14",
		taskCompletion: 98,
		efficiency: 94,
		quality: 97,
		satisfaction: 96,
	},
	{
		date: "2024-06-15",
		taskCompletion: 97,
		efficiency: 92,
		quality: 96,
		satisfaction: 93,
	},
	{
		date: "2024-06-16",
		taskCompletion: 98,
		efficiency: 93,
		quality: 97,
		satisfaction: 94,
	},
	{
		date: "2024-06-17",
		taskCompletion: 99,
		efficiency: 94,
		quality: 98,
		satisfaction: 95,
	},
	{
		date: "2024-06-18",
		taskCompletion: 98,
		efficiency: 93,
		quality: 97,
		satisfaction: 94,
	},
	{
		date: "2024-06-19",
		taskCompletion: 97,
		efficiency: 92,
		quality: 96,
		satisfaction: 93,
	},
	{
		date: "2024-06-20",
		taskCompletion: 98,
		efficiency: 93,
		quality: 97,
		satisfaction: 94,
	},
	{
		date: "2024-06-21",
		taskCompletion: 99,
		efficiency: 94,
		quality: 98,
		satisfaction: 95,
	},
	{
		date: "2024-06-22",
		taskCompletion: 98,
		efficiency: 93,
		quality: 97,
		satisfaction: 94,
	},
	{
		date: "2024-06-23",
		taskCompletion: 97,
		efficiency: 92,
		quality: 96,
		satisfaction: 93,
	},
	{
		date: "2024-06-24",
		taskCompletion: 98,
		efficiency: 93,
		quality: 97,
		satisfaction: 94,
	},
	{
		date: "2024-06-25",
		taskCompletion: 99,
		efficiency: 95,
		quality: 98,
		satisfaction: 96,
	},
	{
		date: "2024-06-26",
		taskCompletion: 98,
		efficiency: 94,
		quality: 97,
		satisfaction: 95,
	},
	{
		date: "2024-06-27",
		taskCompletion: 97,
		efficiency: 93,
		quality: 96,
		satisfaction: 94,
	},
	{
		date: "2024-06-28",
		taskCompletion: 98,
		efficiency: 94,
		quality: 97,
		satisfaction: 95,
	},
	{
		date: "2024-06-29",
		taskCompletion: 99,
		efficiency: 95,
		quality: 98,
		satisfaction: 96,
	},
	{
		date: "2024-06-30",
		taskCompletion: 98,
		efficiency: 94,
		quality: 97,
		satisfaction: 95,
	},
	{
		date: "2024-07-01",
		taskCompletion: 96,
		efficiency: 92,
		quality: 95,
		satisfaction: 93,
	},
	{
		date: "2024-07-02",
		taskCompletion: 95,
		efficiency: 91,
		quality: 94,
		satisfaction: 92,
	},
	{
		date: "2024-07-03",
		taskCompletion: 93,
		efficiency: 89,
		quality: 92,
		satisfaction: 90,
	},
	{
		date: "2024-07-04",
		taskCompletion: 90,
		efficiency: 86,
		quality: 89,
		satisfaction: 87,
	},
	{
		date: "2024-07-05",
		taskCompletion: 92,
		efficiency: 88,
		quality: 91,
		satisfaction: 89,
	},
	{
		date: "2024-07-06",
		taskCompletion: 94,
		efficiency: 90,
		quality: 93,
		satisfaction: 91,
	},
	{
		date: "2024-07-07",
		taskCompletion: 96,
		efficiency: 92,
		quality: 95,
		satisfaction: 93,
	},
	{
		date: "2024-07-08",
		taskCompletion: 97,
		efficiency: 93,
		quality: 96,
		satisfaction: 94,
	},
	{
		date: "2024-07-09",
		taskCompletion: 98,
		efficiency: 94,
		quality: 97,
		satisfaction: 95,
	},
	{
		date: "2024-07-10",
		taskCompletion: 99,
		efficiency: 95,
		quality: 98,
		satisfaction: 96,
	},
	{
		date: "2024-07-15",
		taskCompletion: 97,
		efficiency: 93,
		quality: 96,
		satisfaction: 94,
	},
	{
		date: "2024-07-20",
		taskCompletion: 95,
		efficiency: 91,
		quality: 94,
		satisfaction: 92,
	},
	{
		date: "2024-07-25",
		taskCompletion: 96,
		efficiency: 92,
		quality: 95,
		satisfaction: 93,
	},
	{
		date: "2024-07-30",
		taskCompletion: 98,
		efficiency: 94,
		quality: 97,
		satisfaction: 95,
	},
	{
		date: "2024-08-01",
		taskCompletion: 99,
		efficiency: 95,
		quality: 98,
		satisfaction: 96,
	},
	{
		date: "2024-08-05",
		taskCompletion: 97,
		efficiency: 93,
		quality: 96,
		satisfaction: 94,
	},
	{
		date: "2024-08-10",
		taskCompletion: 95,
		efficiency: 91,
		quality: 94,
		satisfaction: 92,
	},
	{
		date: "2024-08-15",
		taskCompletion: 93,
		efficiency: 89,
		quality: 92,
		satisfaction: 90,
	},
	{
		date: "2024-08-20",
		taskCompletion: 91,
		efficiency: 87,
		quality: 90,
		satisfaction: 88,
	},
	{
		date: "2024-08-25",
		taskCompletion: 93,
		efficiency: 89,
		quality: 92,
		satisfaction: 90,
	},
	{
		date: "2024-08-30",
		taskCompletion: 95,
		efficiency: 91,
		quality: 94,
		satisfaction: 92,
	},
	{
		date: "2024-09-01",
		taskCompletion: 96,
		efficiency: 92,
		quality: 95,
		satisfaction: 93,
	},
	{
		date: "2024-09-05",
		taskCompletion: 76,
		efficiency: 70,
		quality: 60,
		satisfaction: 94,
	},
	{
		date: "2024-09-10",
		taskCompletion: 98,
		efficiency: 94,
		quality: 97,
		satisfaction: 95,
	},
	{
		date: "2024-09-15",
		taskCompletion: 99,
		efficiency: 95,
		quality: 98,
		satisfaction: 96,
	},
	{
		date: "2024-09-20",
		taskCompletion: 98,
		efficiency: 94,
		quality: 97,
		satisfaction: 95,
	},
	{
		date: "2024-09-25",
		taskCompletion: 97,
		efficiency: 93,
		quality: 96,
		satisfaction: 94,
	},
	{
		date: "2024-09-30",
		taskCompletion: 96,
		efficiency: 92,
		quality: 95,
		satisfaction: 93,
	},
	{
		date: "2024-10-01",
		taskCompletion: 95,
		efficiency: 91,
		quality: 94,
		satisfaction: 92,
	},
	{
		date: "2024-10-05",
		taskCompletion: 94,
		efficiency: 20,
		quality: 93,
		satisfaction: 91,
	},
	{
		date: "2024-10-10",
		taskCompletion: 50,
		efficiency: 87,
		quality: 20,
		satisfaction: 92,
	},
	{
		date: "2024-10-15",
		taskCompletion: 96,
		efficiency: 20,
		quality: 95,
		satisfaction: 93,
	},
	{
		date: "2024-10-20",
		taskCompletion: 60,
		efficiency: 20,
		quality: 96,
		satisfaction: 94,
	},
	{
		date: "2024-10-25",
		taskCompletion: 98,
		efficiency: 94,
		quality: 97,
		satisfaction: 95,
	},
	{
		date: "2024-10-30",
		taskCompletion: 99,
		efficiency: 95,
		quality: 98,
		satisfaction: 96,
	},
];

export default performanceData;

const chartConfig = {
	performance: {
		label: "Performance",
	},
	taskCompletion: {
		label: "Task Completion",
		color: "hsl(var(--chart-1))",
	},
	efficiency: {
		label: "Efficiency",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

interface ChartPerformanceProps {
	timeRange: string;
	robotId: string;
}

export function ChartPerformance({
	timeRange,
	robotId,
}: ChartPerformanceProps) {
	const filteredData = React.useMemo(() => {
		// Filter data based on time range
		const now = new Date("2024-06-30");
		let daysToSubtract = 7;

		if (timeRange === "24h") {
			daysToSubtract = 1;
		} else if (timeRange === "7d") {
			daysToSubtract = 7;
		} else if (timeRange === "30d") {
			daysToSubtract = 30;
		} else if (timeRange === "90d") {
			daysToSubtract = 90;
		}

		const startDate = new Date(now);
		startDate.setDate(startDate.getDate() - daysToSubtract);

		return performanceData.filter((item) => {
			const itemDate = new Date(item.date);
			return itemDate >= startDate;
		});
	}, [timeRange]);

	return (
		<ChartContainer
			config={chartConfig}
			className="aspect-auto h-[300px] w-full"
		>
			<AreaChart data={filteredData}>
				<defs>
					<linearGradient id="fillTaskCompletion" x1="0" y1="0" x2="0" y2="1">
						<stop
							offset="5%"
							stopColor="var(--color-taskCompletion)"
							stopOpacity={0.8}
						/>
						<stop
							offset="95%"
							stopColor="var(--color-taskCompletion)"
							stopOpacity={0.1}
						/>
					</linearGradient>
					<linearGradient id="fillEfficiency" x1="0" y1="0" x2="0" y2="1">
						<stop
							offset="5%"
							stopColor="var(--color-efficiency)"
							stopOpacity={0.8}
						/>
						<stop
							offset="95%"
							stopColor="var(--color-efficiency)"
							stopOpacity={0.1}
						/>
					</linearGradient>
				</defs>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="date"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					minTickGap={32}
					tickFormatter={(value) => {
						const date = new Date(value);
						return date.toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
						});
					}}
				/>
				<ChartTooltip
					cursor={false}
					content={
						<ChartTooltipContent
							labelFormatter={(value) => {
								return new Date(value).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
							indicator="dot"
						/>
					}
				/>
				<Area
					dataKey="taskCompletion"
					type="monotone"
					fill="url(#fillTaskCompletion)"
					stroke="var(--color-taskCompletion)"
					strokeWidth={2}
				/>
				<Area
					dataKey="efficiency"
					type="monotone"
					fill="url(#fillEfficiency)"
					stroke="var(--color-efficiency)"
					strokeWidth={2}
				/>
			</AreaChart>
		</ChartContainer>
	);
}
