"use client";

import * as React from "react";
import { Pie, PieChart } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const chartData = [
    {
        date: "2024-06-16",
        browser: "chrome",
        visitors: 275,
        fill: "var(--color-chrome)",
    },
    {
        date: "2024-06-17",
        browser: "safari",
        visitors: 200,
        fill: "var(--color-safari)",
    },
    {
        date: "2024-06-18",
        browser: "firefox",
        visitors: 187,
        fill: "var(--color-firefox)",
    },
    {
        date: "2024-06-19",
        browser: "edge",
        visitors: 173,
        fill: "var(--color-edge)",
    },
    {
        date: "2024-06-20",
        browser: "other",
        visitors: 90,
        fill: "var(--color-other)",
    },
    {
        date: "2024-05-25",
        browser: "chrome",
        visitors: 220,
        fill: "var(--color-chrome)",
    },
    {
        date: "2024-05-26",
        browser: "safari",
        visitors: 170,
        fill: "var(--color-safari)",
    },
    {
        date: "2024-05-15",
        browser: "firefox",
        visitors: 150,
        fill: "var(--color-firefox)",
    },
    {
        date: "2024-05-10",
        browser: "edge",
        visitors: 130,
        fill: "var(--color-edge)",
    },
    {
        date: "2024-05-05",
        browser: "other",
        visitors: 70,
        fill: "var(--color-other)",
    },
    {
        date: "2024-04-20",
        browser: "chrome",
        visitors: 190,
        fill: "var(--color-chrome)",
    },
    {
        date: "2024-04-15",
        browser: "safari",
        visitors: 160,
        fill: "var(--color-safari)",
    },
    {
        date: "2024-04-10",
        browser: "firefox",
        visitors: 140,
        fill: "var(--color-firefox)",
    },
    {
        date: "2024-04-05",
        browser: "edge",
        visitors: 120,
        fill: "var(--color-edge)",
    },
    {
        date: "2024-04-01",
        browser: "other",
        visitors: 60,
        fill: "var(--color-other)",
    },
    {
        date: "2024-06-30",
        browser: "chrome",
        visitors: 190,
        fill: "var(--color-chrome)",
    },
    {
        date: "2024-06-30",
        browser: "safari",
        visitors: 160,
        fill: "var(--color-safari)",
    },
    {
        date: "2024-06-30",
        browser: "firefox",
        visitors: 140,
        fill: "var(--color-firefox)",
    },
    {
        date: "2024-06-30",
        browser: "edge",
        visitors: 120,
        fill: "var(--color-edge)",
    },
    {
        date: "2024-06-30",
        browser: "other",
        visitors: 60,
        fill: "var(--color-other)",
    },
];

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

export function ChartPieLegend() {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = React.useState("30d");

    React.useEffect(() => {
        if (isMobile) {
            setTimeRange("7d");
        }
    }, [isMobile]);

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date);
        const referenceDate = new Date("2024-06-30");
        let daysToSubtract = 90;

        if (timeRange === "30d") {
            daysToSubtract = 30;
        } else if (timeRange === "7d") {
            daysToSubtract = 7;
        }

        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    // Aggregate data by browser for the filtered period
    const aggregatedData = filteredData.reduce<
        Array<{ browser: string; visitors: number; fill: string }>
    >((acc, item) => {
        const existingItem = acc.find((i) => i.browser === item.browser);

        if (existingItem) {
            existingItem.visitors += item.visitors;
        } else {
            acc.push({
                browser: item.browser,
                visitors: item.visitors,
                fill: item.fill,
            });
        }

        return acc;
    }, []);

    return (
        <Card className="w-full">
            <CardHeader className="relative">
                <CardTitle>Total Visitors</CardTitle>
                <CardDescription>
                    <span className="@[540px]/card:block hidden">
                        Total for the last{" "}
                        {timeRange === "90d"
                            ? "3 months"
                            : timeRange === "30d"
                            ? "30 days"
                            : "7 days"}
                    </span>
                    <span className="@[540px]/card:hidden">
                        Last{" "}
                        {timeRange === "90d"
                            ? "3 months"
                            : timeRange === "30d"
                            ? "30 days"
                            : "7 days"}
                    </span>
                </CardDescription>
                <div className="absolute right-4 top-4">
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={setTimeRange}
                        variant="outline"
                        className="@[767px]/card:flex hidden"
                    >
                        <ToggleGroupItem value="90d" className="h-8 px-2.5">
                            Last 3 months
                        </ToggleGroupItem>
                        <ToggleGroupItem value="30d" className="h-8 px-2.5">
                            Last 30 days
                        </ToggleGroupItem>
                        <ToggleGroupItem value="7d" className="h-8 px-2.5">
                            Last 7 days
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="@[767px]/card:hidden flex w-40"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="90d" className="rounded-lg">
                                Last 3 months
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                Last 30 days
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                Last 7 days
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>

            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={aggregatedData}
                            dataKey="visitors"
                            nameKey="browser"
                            label
                            fill="#8884d8"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
