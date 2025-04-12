"use client";

import {
	Battery,
	BatteryCharging,
	Bot,
	Clock,
	Cpu,
	Gauge,
	Layers,
	MapPin,
	Package,
	Truck,
	Zap,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/dashboard/overview/data-table";
import { RobotStatusCards } from "@/components/dashboard/overview/robot-status-cards";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from "@/components/layout/vercel-tabs";
import { robotData } from "@/data/robot-data";

export default function RobotAnalytics() {
	const [timeRange, setTimeRange] = useState("24h");
	const [selectedRobot, setSelectedRobot] = useState("all");

	const ChartAreaComponent = dynamic(
		() =>
			import("@/components/dashboard/overview/chart-performance").then(
				(mod) => mod.ChartPerformance
			),
		{ ssr: false }
	);

	const ChartPieDonutComponent = dynamic(
		() =>
			import("@/components/dashboard/overview/chart-task-distribution").then(
				(mod) => mod.ChartTaskDistribution
			),
		{ ssr: false }
	);

	const ChartBarMultipleComponent = dynamic(
		() =>
			import("@/components/dashboard/overview/chart-error-rates").then(
				(mod) => mod.ChartErrorRates
			),
		{ ssr: false }
	);

	const ChartBarLabelComponent = dynamic(
		() =>
			import("@/components/dashboard/overview/chart-cycle-times").then(
				(mod) => mod.ChartCycleTimes
			),
		{ ssr: false }
	);

	const RobotMapComponent = dynamic(
		() =>
			import("@/components/dashboard/overview/robot-map").then(
				(mod) => mod.RobotMap
			),
		{ ssr: false }
	);

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 w-full">
					<Tabs defaultValue="overview" className="space-y-4">
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
							<TabsList>
								<TabsTrigger value="overview">Overview</TabsTrigger>
								<TabsTrigger value="performance">Performance</TabsTrigger>
								<TabsTrigger value="maintenance">Maintenance</TabsTrigger>
								<TabsTrigger value="location">Location</TabsTrigger>
							</TabsList>

							<div className="flex gap-2">
								<Select value={selectedRobot} onValueChange={setSelectedRobot}>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Select Robot" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Robots</SelectItem>
										<SelectItem value="WR-001">WR-001</SelectItem>
										<SelectItem value="WR-002">WR-002</SelectItem>
										<SelectItem value="WR-003">WR-003</SelectItem>
										<SelectItem value="WR-004">WR-004</SelectItem>
									</SelectContent>
								</Select>
								<Select value={timeRange} onValueChange={setTimeRange}>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Time Range" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="24h">Last 24 Hours</SelectItem>
										<SelectItem value="7d">Last 7 Days</SelectItem>
										<SelectItem value="30d">Last 30 Days</SelectItem>
										<SelectItem value="90d">Last 90 Days</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<TabsContent value="overview" className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-sm font-medium">
											Task Completion Rate
										</CardTitle>
										<Gauge className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">98.3%</div>
										<p className="text-xs text-muted-foreground">
											<span className="text-green-500">+2.5%</span> from
											previous period
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-sm font-medium">
											Avg. Cycle Time
										</CardTitle>
										<Clock className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">3.2 min</div>
										<p className="text-xs text-muted-foreground">
											<span className="text-green-500">-0.5 min</span> from
											previous period
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-sm font-medium">
											Error Rate
										</CardTitle>
										<Zap className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">1.7%</div>
										<p className="text-xs text-muted-foreground">
											<span className="text-green-500">-0.3%</span> from
											previous period
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-sm font-medium">
											Battery Efficiency
										</CardTitle>
										<Battery className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">92.5%</div>
										<p className="text-xs text-muted-foreground">
											<span className="text-green-500">+1.2%</span> from
											previous period
										</p>
									</CardContent>
								</Card>
							</div>

							<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
								<Card className="lg:col-span-4">
									<CardHeader>
										<CardTitle>Performance Metrics</CardTitle>
										<CardDescription>
											Task completion and efficiency over time
										</CardDescription>
									</CardHeader>
									<CardContent className="px-2 pt-0">
										<ChartAreaComponent
											timeRange={timeRange}
											robotId={selectedRobot}
										/>
									</CardContent>
								</Card>

								<Card className="lg:col-span-3">
									<CardHeader>
										<CardTitle>Task Distribution</CardTitle>
										<CardDescription>
											Types of tasks performed by robots
										</CardDescription>
									</CardHeader>
									<CardContent className="px-2 pt-0">
										<ChartPieDonutComponent
											timeRange={timeRange}
											robotId={selectedRobot}
										/>
									</CardContent>
								</Card>
							</div>

							<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
								<Card className="lg:col-span-3">
									<CardHeader>
										<CardTitle>Cycle Times</CardTitle>
										<CardDescription>
											Average time to complete tasks by type
										</CardDescription>
									</CardHeader>
									<CardContent className="px-2 pt-0">
										<ChartBarLabelComponent
											timeRange={timeRange}
											robotId={selectedRobot}
										/>
									</CardContent>
								</Card>
								<Card className="lg:col-span-4">
									<CardHeader>
										<CardTitle>Error Occurrences</CardTitle>
										<CardDescription>
											Frequency and types of errors
										</CardDescription>
									</CardHeader>
									<CardContent className="px-2 pt-0">
										<ChartBarMultipleComponent
											timeRange={timeRange}
											robotId={selectedRobot}
										/>
									</CardContent>
								</Card>
							</div>
						</TabsContent>

						<TabsContent value="performance" className="space-y-4">
							<RobotStatusCards />
							<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
								<Card className="lg:col-span-2">
									<CardHeader>
										<CardTitle>Detailed Performance Analysis</CardTitle>
										<CardDescription>
											Comprehensive metrics for all robots
										</CardDescription>
									</CardHeader>
									<CardContent>
										<DataTable
											data={robotData.map((robot) => ({
												...robot,
												status: robot.status as
													| "maintenance"
													| "active"
													| "charging"
													| "idle",
											}))}
										/>
									</CardContent>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle>Performance Insights</CardTitle>
										<CardDescription>
											Key observations and recommendations
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<div className="flex items-center gap-2">
												<Badge
													variant="outline"
													className="bg-green-50 text-green-700 border-green-200"
												>
													Insight
												</Badge>
												<span className="font-medium">
													WR-002 shows 15% higher efficiency
												</span>
											</div>
											<p className="text-sm text-muted-foreground">
												Robot WR-002 consistently outperforms other units in
												pick-and-place tasks. Consider analyzing its path
												optimization algorithm for potential fleet-wide
												implementation.
											</p>
											<div className="flex items-center gap-2 pt-2">
												<Badge
													variant="outline"
													className="bg-amber-50 text-amber-700 border-amber-200"
												>
													Alert
												</Badge>
												<span className="font-medium">
													WR-003 battery degradation detected
												</span>
											</div>
											<p className="text-sm text-muted-foreground">
												Battery efficiency has decreased by 8% over the past
												month. Schedule maintenance to prevent operational
												disruptions.
											</p>
										</div>
									</CardContent>
									<CardFooter>
										<Button variant="outline" className="w-full">
											View All Insights
										</Button>
									</CardFooter>
								</Card>
							</div>
						</TabsContent>

						<TabsContent value="maintenance" className="space-y-4">
							<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
								<Card>
									<CardHeader>
										<CardTitle>Maintenance Schedule</CardTitle>
										<CardDescription>
											Upcoming maintenance tasks
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<div className="flex justify-between items-center">
												<div className="flex items-center gap-2">
													<Bot className="h-5 w-5 text-muted-foreground" />
													<div>
														<p className="font-medium">WR-001</p>
														<p className="text-sm text-muted-foreground">
															Routine inspection
														</p>
													</div>
												</div>
												<Badge>Tomorrow</Badge>
											</div>
											<div className="flex justify-between items-center">
												<div className="flex items-center gap-2">
													<BatteryCharging className="h-5 w-5 text-muted-foreground" />
													<div>
														<p className="font-medium">WR-003</p>
														<p className="text-sm text-muted-foreground">
															Battery replacement
														</p>
													</div>
												</div>
												<Badge variant="outline">3 days</Badge>
											</div>
											<div className="flex justify-between items-center">
												<div className="flex items-center gap-2">
													<Cpu className="h-5 w-5 text-muted-foreground" />
													<div>
														<p className="font-medium">WR-002</p>
														<p className="text-sm text-muted-foreground">
															Software update
														</p>
													</div>
												</div>
												<Badge variant="outline">5 days</Badge>
											</div>
										</div>
									</CardContent>
									<CardFooter>
										<Button variant="outline" className="w-full">
											View Full Schedule
										</Button>
									</CardFooter>
								</Card>
								<Card className="lg:col-span-2">
									<CardHeader>
										<CardTitle>Component Health</CardTitle>
										<CardDescription>
											Current status of critical components
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<div className="flex justify-between">
													<span className="text-sm font-medium">Battery</span>
													<span className="text-sm text-green-500">92%</span>
												</div>
												<div className="h-2 bg-muted rounded-full overflow-hidden">
													<div
														className="h-full bg-green-500 rounded-full"
														style={{ width: "92%" }}
													></div>
												</div>
											</div>
											<div className="space-y-2">
												<div className="flex justify-between">
													<span className="text-sm font-medium">Motors</span>
													<span className="text-sm text-green-500">95%</span>
												</div>
												<div className="h-2 bg-muted rounded-full overflow-hidden">
													<div
														className="h-full bg-green-500 rounded-full"
														style={{ width: "95%" }}
													></div>
												</div>
											</div>
											<div className="space-y-2">
												<div className="flex justify-between">
													<span className="text-sm font-medium">Sensors</span>
													<span className="text-sm text-green-500">98%</span>
												</div>
												<div className="h-2 bg-muted rounded-full overflow-hidden">
													<div
														className="h-full bg-green-500 rounded-full"
														style={{ width: "98%" }}
													></div>
												</div>
											</div>
											<div className="space-y-2">
												<div className="flex justify-between">
													<span className="text-sm font-medium">
														Lifting Mechanism
													</span>
													<span className="text-sm text-amber-500">87%</span>
												</div>
												<div className="h-2 bg-muted rounded-full overflow-hidden">
													<div
														className="h-full bg-amber-500 rounded-full"
														style={{ width: "87%" }}
													></div>
												</div>
											</div>
											<div className="space-y-2">
												<div className="flex justify-between">
													<span className="text-sm font-medium">
														Navigation System
													</span>
													<span className="text-sm text-green-500">96%</span>
												</div>
												<div className="h-2 bg-muted rounded-full overflow-hidden">
													<div
														className="h-full bg-green-500 rounded-full"
														style={{ width: "96%" }}
													></div>
												</div>
											</div>
											<div className="space-y-2">
												<div className="flex justify-between">
													<span className="text-sm font-medium">
														Communication Module
													</span>
													<span className="text-sm text-green-500">99%</span>
												</div>
												<div className="h-2 bg-muted rounded-full overflow-hidden">
													<div
														className="h-full bg-green-500 rounded-full"
														style={{ width: "99%" }}
													></div>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</TabsContent>

						<TabsContent value="location" className="space-y-4">
							<Card>
								<CardHeader>
									<CardTitle>Warehouse Map</CardTitle>
									<CardDescription>
										Real-time location of all robots
									</CardDescription>
								</CardHeader>
								<CardContent className="h-[500px] p-0">
									<RobotMapComponent />
								</CardContent>
							</Card>
							<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-sm font-medium">
											Zone Coverage
										</CardTitle>
										<MapPin className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">92%</div>
										<p className="text-xs text-muted-foreground">
											<span className="text-green-500">+5%</span> from previous
											period
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-sm font-medium">
											Path Efficiency
										</CardTitle>
										<Truck className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">87%</div>
										<p className="text-xs text-muted-foreground">
											<span className="text-green-500">+3.2%</span> from
											previous period
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-sm font-medium">
											Collision Avoidance
										</CardTitle>
										<Layers className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">99.9%</div>
										<p className="text-xs text-muted-foreground">
											<span className="text-green-500">+0.1%</span> from
											previous period
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-sm font-medium">
											Items Transported
										</CardTitle>
										<Package className="h-4 w-4 text-muted-foreground" />
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">12,543</div>
										<p className="text-xs text-muted-foreground">
											<span className="text-green-500">+842</span> from previous
											period
										</p>
									</CardContent>
								</Card>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
