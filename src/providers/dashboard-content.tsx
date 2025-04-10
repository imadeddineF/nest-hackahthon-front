"use client";

import { DashboardNavbar } from "@/components/layout";
import { usePathname } from "next/navigation";
import * as React from "react";

export function DashboardContent({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();

	const isActive = pathname?.includes("wirehouses");

	return (
		<>
			<main className="flex flex-col flex-1 w-full">
				{!isActive && <DashboardNavbar />}
				<div className="flex-1 overflow-y-auto p-6">{children}</div>
			</main>
		</>
	);
}
