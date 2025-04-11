"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useTheme } from "next-themes";
// import { LanguagePicker } from "@/components/shared";
// import SaudiFlag from "../../../../../../public/flags/Flag_of_Saudi_Arabia.svg";
// import { GlobeIcon } from "lucide-react";
import { Check } from "lucide-react";

function Preferences() {
	const { setTheme, theme } = useTheme();

	return (
		<div className="space-y-6 pt-5">
			<div>
				<h3 className="text-lg font-medium">Appearance</h3>
				<p className="text-sm text-muted-foreground">
					Customize the appearance of the app. Automatically switch between day
					and night themes.
				</p>
			</div>
			<Separator />
			<div className="flex items-center gap-10">
				<Card
					onClick={() => setTheme("light")}
					className={`px-6 py-8 cursor-pointer hover:bg-gray-200/20 transition-all duration-300 relative ${
						theme === "light" ? "ring-2 ring-primary" : ""
					}`}
				>
					{theme === "light" && (
						<div className="absolute top-2 right-2 bg-primary rounded-full p-1">
							<Check className="h-4 w-4 text-primary-foreground" />
						</div>
					)}
					<div>
						<div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
							<div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
								<div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
									<div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
									<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
								</div>
								<div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
									<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
									<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
								</div>
								<div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
									<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
									<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
								</div>
							</div>
						</div>
						<span className="block w-full p-2 text-center font-normal">
							Light
						</span>
					</div>
				</Card>
				<Card
					onClick={() => setTheme("dark")}
					className={`px-6 py-8 cursor-pointer hover:bg-gray-200/20 transition-all duration-300 relative ${
						theme === "dark" ? "ring-2 ring-primary" : ""
					}`}
				>
					{theme === "dark" && (
						<div className="absolute top-2 right-2 bg-primary rounded-full p-1">
							<Check className="h-4 w-4 text-primary-foreground" />
						</div>
					)}
					<div>
						<div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
							<div className="space-y-2 rounded-sm bg-slate-950 p-2">
								<div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
									<div className="h-2 w-[80px] rounded-lg bg-slate-400" />
									<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
								</div>
								<div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
									<div className="h-4 w-4 rounded-full bg-slate-400" />
									<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
								</div>
								<div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
									<div className="h-4 w-4 rounded-full bg-slate-400" />
									<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
								</div>
							</div>
						</div>
						<span className="block w-full p-2 text-center font-normal">
							Dark
						</span>
					</div>
				</Card>
				<Card
					onClick={() => setTheme("system")}
					className={`px-6 py-8 cursor-pointer hover:bg-gray-200/20 transition-all duration-300 relative ${
						theme === "system" ? "ring-2 ring-primary" : ""
					}`}
				>
					{theme === "system" && (
						<div className="absolute top-2 right-2 bg-primary rounded-full p-1">
							<Check className="h-4 w-4 text-primary-foreground" />
						</div>
					)}
					<div>
						<div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
							<div className="space-y-2 rounded-sm bg-slate-950 p-2">
								<div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
									<div className="h-2 w-[80px] rounded-lg bg-slate-400" />
									<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
								</div>
								<div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
									<div className="h-4 w-4 rounded-full bg-slate-400" />
									<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
								</div>
								<div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
									<div className="h-4 w-4 rounded-full bg-slate-400" />
									<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
								</div>
							</div>
						</div>
						<span className="block w-full p-2 text-center font-normal">
							System
						</span>
					</div>
				</Card>
			</div>
		</div>
	);
}

export default Preferences;
