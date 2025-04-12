"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { RegisterForm } from "@/components/auth/register-form";

export default function Register() {
	const router = useRouter();

	const handleLoginClick = () => {
		router.push("/login");
	};

	return (
		<div className="grid min-h-screen w-full">
			{/* Illustration on left */}

			{/* Form on right */}
			<motion.div
				className="flex flex-col p-6 md:p-10"
				initial={{ x: 50, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: 100, opacity: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className="flex justify-end gap-2">
					<Link href="/" className="flex items-center gap-2 font-medium">
						<div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-600 text-white">
							<GalleryVerticalEnd className="size-4" />
						</div>
						<span>Nest</span>
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-md">
						<RegisterForm onLoginClick={handleLoginClick} />
					</div>
				</div>
			</motion.div>
		</div>
	);
}
