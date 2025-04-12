"use client";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

// Sample data - would be replaced with actual robot cycle time data
const cycleTimeData = [
	{ task: "Picking", time: 2.8 },
	{ task: "Placing", time: 3.2 },
	{ task: "Transporting", time: 4.5 },
	{ task: "Scanning", time: 1.5 },
	{ task: "Charging", time: 45.0 },
];

const chartConfig = {
	time: {
		label: "Time (minutes)",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

interface ChartCycleTimesProps {
	timeRange: string;
	robotId: string;
}

export function ChartCycleTimes({ timeRange, robotId }: ChartCycleTimesProps) {
	// In a real application, we would filter data based on timeRange and robotId

	return (
		<ChartContainer
			config={chartConfig}
			className="aspect-auto h-[300px] w-full"
		>
			<BarChart
				data={cycleTimeData}
				accessibilityLayer
				layout="vertical"
				margin={{ left: 80 }}
			>
				<CartesianGrid horizontal={false} />
				<XAxis type="number" />
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="dot" />}
				/>
				<Bar
					dataKey="time"
					fill="var(--color-time)"
					radius={4}
					name="Time (minutes)"
				>
					<LabelList
						dataKey="time"
						position="right"
						offset={10}
						className="fill-foreground"
						fontSize={12}
						formatter={(value: number) => `${value} min`}
					/>
				</Bar>
			</BarChart>
		</ChartContainer>
	);
}
