import {
	Battery,
	BatteryCharging,
	Bot,
	CheckCircle,
	Clock,
	Pause,
	Play,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function RobotStatusCards() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<Card>
				<CardHeader className="pb-2">
					<div className="flex justify-between items-center">
						<CardTitle className="text-base font-medium">WR-001</CardTitle>
						<Badge className="bg-green-500">Active</Badge>
					</div>
					<CardDescription>Picking Zone A</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-2">
								<Battery className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm">Battery</span>
							</div>
							<span className="text-sm font-medium">78%</span>
						</div>
						<Progress value={78} className="h-2" />
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>Est. 4.2 hours remaining</span>
							<span>Cycle: 342</span>
						</div>
						<div className="flex gap-2 pt-2">
							<Button variant="outline" size="sm" className="w-full">
								<Pause className="h-3.5 w-3.5 mr-1" />
								Pause
							</Button>
							<Button size="sm" className="w-full">
								Details
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-2">
					<div className="flex justify-between items-center">
						<CardTitle className="text-base font-medium">WR-002</CardTitle>
						<Badge className="bg-green-500">Active</Badge>
					</div>
					<CardDescription>Storage Zone C</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-2">
								<Battery className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm">Battery</span>
							</div>
							<span className="text-sm font-medium">92%</span>
						</div>
						<Progress value={92} className="h-2" />
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>Est. 5.8 hours remaining</span>
							<span>Cycle: 127</span>
						</div>
						<div className="flex gap-2 pt-2">
							<Button variant="outline" size="sm" className="w-full">
								<Pause className="h-3.5 w-3.5 mr-1" />
								Pause
							</Button>
							<Button size="sm" className="w-full">
								Details
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-2">
					<div className="flex justify-between items-center">
						<CardTitle className="text-base font-medium">WR-003</CardTitle>
						<Badge
							variant="outline"
							className="bg-amber-100 text-amber-700 border-amber-200"
						>
							Charging
						</Badge>
					</div>
					<CardDescription>Charging Station 2</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-2">
								<BatteryCharging className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm">Charging</span>
							</div>
							<span className="text-sm font-medium">43%</span>
						</div>
						<Progress value={43} className="h-2" />
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>Est. 35 min until full</span>
							<span>Cycle: 289</span>
						</div>
						<div className="flex gap-2 pt-2">
							<Button variant="outline" size="sm" className="w-full">
								<Play className="h-3.5 w-3.5 mr-1" />
								Deploy
							</Button>
							<Button size="sm" className="w-full">
								Details
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-2">
					<div className="flex justify-between items-center">
						<CardTitle className="text-base font-medium">WR-004</CardTitle>
						<Badge
							variant="outline"
							className="bg-red-100 text-red-700 border-red-200"
						>
							Maintenance
						</Badge>
					</div>
					<CardDescription>Service Bay 1</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-2">
								<Bot className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm">Status</span>
							</div>
							<span className="text-sm font-medium text-red-500">
								Sensor Fault
							</span>
						</div>
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-2">
								<Clock className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm">Downtime</span>
							</div>
							<span className="text-sm font-medium">2h 15m</span>
						</div>
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>Est. completion: 45 min</span>
							<span>Cycle: 412</span>
						</div>
						<div className="flex gap-2 pt-2">
							<Button variant="outline" size="sm" className="w-full">
								<CheckCircle className="h-3.5 w-3.5 mr-1" />
								Test
							</Button>
							<Button size="sm" className="w-full">
								Details
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
