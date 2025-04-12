"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Illustration() {
	const pathname = usePathname();
	return (
		<div className="h-full w-full">
			{pathname === "/login" ? (
				<motion.div
					className="relative hidden bg-gradient-to-br from-teal-500 to-teal-700 lg:flex lg:items-center lg:justify-center overflow-hidden"
					initial={{ opacity: 0.8 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0.8 }}
					transition={{ duration: 0.5 }}
				>
					<div className="absolute inset-0 bg-teal-600 opacity-20 [mask-image:radial-gradient(farthest-side_at_top_right,white,transparent)]"></div>
					<motion.div
						className="relative z-10 w-full max-w-lg px-8"
						initial={{ scale: 0.95 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.95 }}
						transition={{ duration: 0.5 }}
					>
						<motion.svg
							className="w-full h-auto text-white"
							viewBox="0 0 500 400"
							xmlns="http://www.w3.org/2000/svg"
							initial={{ rotate: -5 }}
							animate={{ rotate: 0 }}
							exit={{ rotate: 5 }}
							transition={{ duration: 0.5 }}
						>
							<motion.path
								initial={{ pathLength: 0, opacity: 0 }}
								animate={{ pathLength: 1, opacity: 0.9 }}
								transition={{ duration: 1, delay: 0.2 }}
								fill="currentColor"
								fillOpacity="0.9"
								d="M169.8 78.5c15.3-18.8 45.3-20.9 60-2.6 4.9 6.1 9.5 12.7 11.6 20.3 3.2 12 1.4 24.9-3.5 36.3-5.7 13-15.5 24.7-19.3 38.4-3.6 13 1.7 28.4-7.3 38.6-10.7 12-30.9 12.8-45.5 6.7-15.3-6.3-27.2-18.8-32.5-34.5-4.5-13.3-4.5-27.6-2.5-41.4 1.5-10.8 4.6-21.3 8.6-31.5 3.7-9.1 8.7-17.8 15.3-24.9 4.5-5 9.9-9.2 15.1-5.4z"
							/>
							<motion.path
								initial={{ pathLength: 0, opacity: 0 }}
								animate={{ pathLength: 1, opacity: 0.8 }}
								transition={{ duration: 1, delay: 0.4 }}
								fill="currentColor"
								fillOpacity="0.8"
								d="M334.1 81.5c18.7-7.6 40-6.6 58.4 1.9 15.1 6.9 28.1 18.3 37.3 32.5 10.4 16.2 16.5 35.7 15.3 54.8-1.1 17.1-8.3 33.3-19.5 46.2-11.9 13.6-27.8 22.9-45 27.2-14.9 3.8-31.1 4.4-45.3-1.2-13.7-5.4-24.7-16.9-30.6-30.2-7.2-16.5-8-35.2-5.8-52.8 2.2-18.6 7.9-37.2 19.2-52.3 7.1-9.5 15.9-17.8 26-21.2 10.7-3.6 22.7-3.5 33.5-7.3z"
							/>
							<motion.circle
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 0.2 }}
								transition={{ duration: 0.8, delay: 0.6 }}
								fill="white"
								fillOpacity="0.2"
								cx="150"
								cy="150"
								r="40"
							/>
							<motion.circle
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 0.2 }}
								transition={{ duration: 0.8, delay: 0.7 }}
								fill="white"
								fillOpacity="0.2"
								cx="350"
								cy="250"
								r="50"
							/>
							<motion.circle
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 0.2 }}
								transition={{ duration: 0.8, delay: 0.8 }}
								fill="white"
								fillOpacity="0.2"
								cx="250"
								cy="300"
								r="30"
							/>
							<motion.path
								initial={{ pathLength: 0, opacity: 0 }}
								animate={{ pathLength: 1, opacity: 0.5 }}
								transition={{ duration: 1, delay: 0.6 }}
								fill="white"
								fillOpacity="0.5"
								d="M205.5 231.5c12.3-1.5 24.9-1.1 36.8 2.1 11.3 3 22 8.3 31.3 15.5 9.5 7.4 17.8 16.5 23.1 27.4 5.2 10.5 7.5 22.5 6.7 34.3-.8 11.7-5.6 22.7-12.1 32.3-7.4 10.8-17.1 19.7-28.2 26.2-12.2 7.1-26 10.5-40 11.1-13.7.6-27.3-1.7-40-6.8-11.6-4.7-22.4-11.7-30.4-21.2-7.6-9.1-12.7-20.4-14.5-32.2-1.8-12.3-.4-25 3.6-36.7 3.9-11.3 10.3-21.6 18.8-30 8.8-8.8 19.8-14.9 31.6-18.9 4.7-1.5 9.6-2.7 14.5-3.5z"
							/>
						</motion.svg>
						<motion.div
							className="mt-8 text-center text-white"
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.8 }}
						>
							<h2 className="text-3xl font-bold">Welcome Back</h2>
							<p className="mt-4 text-lg opacity-80">
								Sign in to access your account and continue your journey with
								us.
							</p>
						</motion.div>
					</motion.div>
				</motion.div>
			) : (
				<motion.div
					className="relative hidden bg-gradient-to-br from-purple-500 to-indigo-700 lg:flex lg:items-center lg:justify-center overflow-hidden"
					initial={{ opacity: 0.8 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0.8 }}
					transition={{ duration: 0.5 }}
				>
					<div className="absolute inset-0 bg-indigo-600 opacity-20 [mask-image:radial-gradient(farthest-side_at_top_left,white,transparent)]"></div>
					<motion.div
						className="relative z-10 w-full max-w-lg px-8"
						initial={{ scale: 0.95 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.95 }}
						transition={{ duration: 0.5 }}
					>
						<motion.svg
							className="w-full h-auto text-white"
							viewBox="0 0 500 400"
							xmlns="http://www.w3.org/2000/svg"
							initial={{ rotate: 5 }}
							animate={{ rotate: 0 }}
							exit={{ rotate: -5 }}
							transition={{ duration: 0.5 }}
						>
							<motion.circle
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 0.1 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								fill="white"
								fillOpacity="0.1"
								cx="100"
								cy="200"
								r="80"
							/>
							<motion.circle
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 0.2 }}
								transition={{ duration: 0.8, delay: 0.3 }}
								fill="white"
								fillOpacity="0.2"
								cx="400"
								cy="150"
								r="60"
							/>
							<motion.path
								initial={{ pathLength: 0, opacity: 0 }}
								animate={{ pathLength: 1, opacity: 0.8 }}
								transition={{ duration: 1, delay: 0.4 }}
								fill="currentColor"
								fillOpacity="0.8"
								d="M276.5 62.5c14.3-9.8 32.5-13.5 49.7-11.3 17.3 2.2 33.4 10.2 45.9 21.9 12.4 11.6 21.7 26.7 24.9 43.3 3.2 16.5 0.3 34.4-8.1 49-7.5 12.9-19.2 23.1-32.2 30.2-14.3 7.8-30.6 11.5-46.7 10.9-16.4-.5-32.3-6.1-45.3-15.6-12.5-9.1-22.2-21.2-29.4-35.1-7.1-13.5-12.4-28.4-9.8-43.5 2.6-15.2 13.1-27.7 25.9-37 8.1-5.9 17.1-10.4 25.1-12.8z"
							/>
							<motion.path
								initial={{ pathLength: 0, opacity: 0 }}
								animate={{ pathLength: 1, opacity: 0.9 }}
								transition={{ duration: 1, delay: 0.6 }}
								fill="currentColor"
								fillOpacity="0.9"
								d="M161.2 196.5c11.5-8.4 26.5-10.5 40.8-9.3 14.2 1.2 27.5 6.4 39.4 13.8 12.5 7.8 23.6 17.6 31.6 29.9 7.8 12.1 12.5 26.5 10.9 40.9-1.6 14.2-9.5 26.6-19.8 36.3-11.2 10.5-25.1 17.3-39.7 21.1-15.5 4-31.8 3.9-47.3 0.6-14.9-3.2-29.1-9.9-40.2-20-9.6-8.7-16.9-20.2-19.8-32.9-2.9-12.9-1.6-26.8 3.3-39 4.7-11.8 13-21.9 23.3-29.5 9.4-7 20.3-11.7 31.5-13.6z"
							/>
							<motion.path
								initial={{ pathLength: 0, opacity: 0 }}
								animate={{ pathLength: 1, opacity: 0.5 }}
								transition={{ duration: 1, delay: 0.8 }}
								fill="white"
								fillOpacity="0.5"
								d="M175.8 108.5c9.9-14.8 28.7-22.8 46.7-21.9 18.4.9 35.6 10.8 47.3 24.4 11.5 13.4 18.5 29.9 24.3 46.5 6 17.2 10.5 35.4 7.7 53.5-2.6 17.8-12.9 33.9-26.9 45.6-15.5 12.8-35.1 19.4-54.9 19.9-19.1.5-38.3-5.3-53.5-16.9-14.1-10.7-24.8-25.7-29.9-42.9-4.8-16.2-4.6-33.5-.1-49.8 4.4-15.8 13.2-30.3 25.5-41.2 9.7-8.7 21.3-14.8 33.8-17.2z"
							/>
						</motion.svg>
						<motion.div
							className="mt-8 text-center text-white"
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.5, delay: 1 }}
						>
							<h2 className="text-3xl font-bold">Join Our Community</h2>
							<p className="mt-4 text-lg opacity-80">
								Create an account to unlock all features and start your journey
								with us.
							</p>
						</motion.div>
					</motion.div>
				</motion.div>
			)}
		</div>
	);
}
