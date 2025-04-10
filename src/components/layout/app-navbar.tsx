"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const DashboardNavbar = () => {
	const pathName = usePathname();
	const [sessionName, setSessionName] = useState<string>(pathName);

	console.log(pathName);

	useEffect(() => {
		setSessionName(pathName === "/dashboard" ? "overview" : pathName.slice(11));
	}, [pathName]);

	return (
		<nav className="relative w-full z-50 border-b h-20 flex items-center justify-between px-6">
			<h1 className="capitalize font-bold">{sessionName}</h1>
		</nav>
	);
};
