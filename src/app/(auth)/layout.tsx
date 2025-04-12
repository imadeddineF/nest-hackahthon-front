"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";

export default function AuthLayout({
	login,
	register,
	children,
}: {
	login: React.ReactNode;
	register: React.ReactNode;
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<div className="h-screen w-full overflow-hidden flex">
			<AnimatePresence mode="wait" initial={false}>
				{pathname === "/login" && (
					<>
						<div className="w-full h-full bg-red-400">{login}</div>
						<div className="w-full hidden lg:block">{children}</div>
					</>
				)}

				{pathname === "/register" && (
					<>
						<div className="w-full hidden lg:block">{children}</div>
						<div className="w-full h-full bg-red-400">{register}</div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}
