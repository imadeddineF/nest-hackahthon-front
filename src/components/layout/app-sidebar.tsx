"use client";

import * as React from "react";
import { Box, Home, SquareTerminal, Users } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
	useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { SettingsNav } from "./settings-navbar";
import { usePathname } from "next/navigation";

const data = {
	user: {
		name: "nest",
		email: "nest@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	projects: [
		{
			name: "Overview",
			url: "/dashboard",
			icon: SquareTerminal,
		},
	],
	navMain: [
		{
			title: "Wirehouses",
			url: "dashboard/wirehouses",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "One",
					url: "/dashboard/wirehouses",
				},
				// {
				// 	title: "Two",
				// 	url: "/dashboard/wirehouses/two",
				// },
				// {
				// 	title: "Three",
				// 	url: "/dashboard/wirehouses/three",
				// },
			],
		},
	],
	settingsNav: [
		{
			title: "Settings",
			url: "dashboard/settings",
			isActive: true,
			items: [
				{
					title: "Profile",
					url: "/dashboard/settings",
				},
				{
					title: "Appearance",
					url: "/dashboard/settings/preferences",
				},
				{
					title: "Notifications",
					url: "/dashboard/settings/notifications",
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { open } = useSidebar();
	const pathname = usePathname();

	const shouldHideSidebar = pathname?.includes("wirehouses");

	if (shouldHideSidebar) {
		return null;
	}

	const isActive = (path: string) => {
		return pathname?.includes(path);
	};

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader
				className={`min-h-20 flex justify-center border-b border-softligne ${
					open ? "items-start ml-2" : "items-center"
				}`}
			>
				<Link href="/dashboard">
					{open ? (
						<div className="flex items-center gap-3">
							<Home className="inline-block" />
							<span className="font-bold text-xl">Nest Hackaton</span>
						</div>
					) : (
						<Box className="inline-block" />
					)}
				</Link>
			</SidebarHeader>
			<SidebarContent className="pt-4">
				<NavProjects projects={data.projects} />
				<NavMain items={data.navMain} />
				<SettingsNav items={data.settingsNav} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
