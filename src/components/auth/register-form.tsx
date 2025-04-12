"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface RegisterFormProps {
	onLoginClick: () => void;
}

export function RegisterForm({ onLoginClick }: RegisterFormProps) {
	const [isLoading, setIsLoading] = useState(false);

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);

		// Simulate a delay for demonstration
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}

	const formVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.1,
				duration: 0.4,
			},
		}),
	};

	return (
		<Card className="border-none shadow-none">
			<CardHeader className="space-y-1 p-0 pb-6">
				<CardTitle className="text-3xl font-bold">Create Account</CardTitle>
				<CardDescription>
					Fill in the details below to get started
				</CardDescription>
			</CardHeader>
			<CardContent className="p-0 space-y-4">
				<form onSubmit={onSubmit} className="space-y-4">
					<motion.div
						className="grid grid-cols-2 gap-4"
						initial="hidden"
						animate="visible"
						custom={1}
						variants={formVariants}
					>
						<div className="space-y-2">
							<Label htmlFor="first-name">First name</Label>
							<Input
								id="first-name"
								placeholder="John"
								required
								autoComplete="given-name"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="last-name">Last name</Label>
							<Input
								id="last-name"
								placeholder="Doe"
								required
								autoComplete="family-name"
							/>
						</div>
					</motion.div>
					<motion.div
						className="space-y-2"
						initial="hidden"
						animate="visible"
						custom={2}
						variants={formVariants}
					>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="you@example.com"
							required
							autoComplete="email"
						/>
					</motion.div>
					<motion.div
						className="space-y-2"
						initial="hidden"
						animate="visible"
						custom={3}
						variants={formVariants}
					>
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							required
							autoComplete="new-password"
						/>
					</motion.div>
					<motion.div
						className="space-y-2"
						initial="hidden"
						animate="visible"
						custom={4}
						variants={formVariants}
					>
						<Label htmlFor="confirm-password">Confirm Password</Label>
						<Input
							id="confirm-password"
							type="password"
							required
							autoComplete="new-password"
						/>
					</motion.div>
					<motion.div
						className="flex items-center space-x-2"
						initial="hidden"
						animate="visible"
						custom={5}
						variants={formVariants}
					>
						<Checkbox id="terms" required />
						<Label htmlFor="terms" className="text-sm font-normal">
							I agree to the{" "}
							<Link href="/terms" className="text-purple-600 hover:underline">
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link href="/privacy" className="text-purple-600 hover:underline">
								Privacy Policy
							</Link>
						</Label>
					</motion.div>
					<motion.div
						initial="hidden"
						animate="visible"
						custom={6}
						variants={formVariants}
					>
						<Button
							type="submit"
							className="w-full bg-purple-600 hover:bg-purple-700"
							disabled={isLoading}
						>
							{isLoading ? "Creating account..." : "Create Account"}
						</Button>
					</motion.div>
				</form>

				<div className="relative">
					<Separator />
					<div className="absolute inset-0 flex items-center justify-center">
						<span className="bg-background px-2 text-muted-foreground text-xs">
							Or continue with
						</span>
					</div>
				</div>

				<div className="flex flex-col space-y-2">
					<Button variant="outline" type="button" className="w-full">
						Continue with Google
					</Button>
					<Button variant="outline" type="button" className="w-full">
						Continue with GitHub
					</Button>
				</div>
			</CardContent>
			<CardFooter className="p-0 pt-4 flex justify-center">
				<div className="text-sm text-center">
					Already have an account?{" "}
					<button
						onClick={onLoginClick}
						className="text-purple-600 hover:underline font-medium"
					>
						Sign in
					</button>
				</div>
			</CardFooter>
		</Card>
	);
}
