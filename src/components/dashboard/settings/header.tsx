"use client";
import React from "react";
import { Link } from "next-view-transitions";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export const Header = () => {
	const pathname = usePathname();

	const isActive = (path: string) => {
		return pathname?.endsWith(path);
	};

	const tabs = [
		{ id: "profile", label: "Profile", path: "/dashboard/settings" },
		{
			id: "preferences",
			label: "Preferences",
			path: "/dashboard/settings/preferences",
		},
		{
			id: "notifications",
			label: "Notifications",
			path: "/dashboard/settings/notifications",
		},
	];

	const TAB_WIDTH = 125;
	const GAP_WIDTH = 0;

	// calculate the x position based on the active tab index
	const getXPosition = () => {
		const activeIndex = tabs.findIndex((tab) => isActive(tab.path));
		if (activeIndex === -1) return 0;

		return activeIndex * (TAB_WIDTH + GAP_WIDTH);
	};

	return (
		<div className="relative flex bg-muted w-fit rounded-md p-1 mb-3">
			{tabs.map((tab) => (
				<Link
					key={tab.id}
					href={tab.path}
					className="relative rounded-md w-[125px] flex justify-center py-1"
				>
					<span
						className={`relative z-30 ${
							isActive(tab.path) ? "text-foreground" : "text-muted-foreground"
						}`}
					>
						{tab.label}
					</span>
				</Link>
			))}
			{tabs.some((tab) => isActive(tab.path)) && (
				<motion.div
					layoutId="activeTabIndicator"
					className="absolute bg-background rounded-md z-10 h-[calc(100%-8px)] top-1"
					initial={false}
					animate={{
						width: TAB_WIDTH,
						x: getXPosition(),
					}}
					transition={{
						type: "spring",
						bounce: 0.2,
						duration: 0.6,
					}}
				/>
			)}
		</div>
	);
};
