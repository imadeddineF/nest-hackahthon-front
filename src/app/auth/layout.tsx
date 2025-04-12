"use client";

import { AnimatePresence } from "framer-motion";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-screen w-full overflow-hidden flex">
			<AnimatePresence mode="wait" initial={false}>
				{children}
			</AnimatePresence>
		</div>
	);
}
