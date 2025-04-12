"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

// Sample data - would be replaced with actual robot error data
const errorData = [
	{ date: "2024-06-24", navigation: 3, sensor: 2, mechanical: 1 },
	{ date: "2024-06-25", navigation: 2, sensor: 1, mechanical: 0 },
	{ date: "2024-06-26", navigation: 1, sensor: 3, mechanical: 2 },
	{ date: "2024-06-27", navigation: 2, sensor: 1, mechanical: 1 },
	{ date: "2024-06-28", navigation: 0, sensor: 2, mechanical: 1 },
	{ date: "2024-06-29", navigation: 1, sensor: 0, mechanical: 2 },
	{ date: "2024-06-30", navigation: 2, sensor: 1, mechanical: 0 },
];

const chartConfig = {
	errors: {
		label: "Errors",
	},
	navigation: {
		label: "Navigation",
		color: "hsl(var(--chart-1))",
	},
	sensor: {
		label: "Sensor",
		color: "hsl(var(--chart-2))",
	},
	mechanical: {
		label: "Mechanical",
		color: "hsl(var(--chart-3))",
	},
} satisfies ChartConfig;

interface ChartErrorRatesProps {
	timeRange: string;
	robotId: string;
}

export function ChartErrorRates({ timeRange, robotId }: ChartErrorRatesProps) {
	const filteredData = React.useMemo(() => {
		// In a real application, we would filter data based on timeRange and robotId
		return errorData;
	}, [timeRange, robotId]);

	return (
		<ChartContainer
			config={chartConfig}
			className="aspect-auto h-[300px] w-full"
		>
			<BarChart data={filteredData} accessibilityLayer>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="date"
					tickLine={false}
					axisLine={false}
					tickMargin={10}
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
				<Bar dataKey="navigation" fill="var(--color-navigation)" radius={4} />
				<Bar dataKey="sensor" fill="var(--color-sensor)" radius={4} />
				<Bar dataKey="mechanical" fill="var(--color-mechanical)" radius={4} />
			</BarChart>
		</ChartContainer>
	);
}
