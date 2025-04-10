"use client";

import { useRef, useEffect } from "react";
import type { Robot } from "../lib/types";

export function Warehouse2D({
	robots,
	focusedRobotId,
}: {
	robots: Robot[];
	focusedRobotId: string | null;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// Draw the 2D visualization
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Set canvas dimensions to match container
		const resizeCanvas = () => {
			const parent = canvas.parentElement;
			if (parent) {
				canvas.width = parent.clientWidth;
				canvas.height = parent.clientHeight;
			}
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		// Animation loop
		let animationFrameId: number;

		const render = () => {
			// Clear canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Draw warehouse floor
			ctx.fillStyle = "#f5f5f5";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Draw grid
			ctx.strokeStyle = "#e0e0e0";
			ctx.lineWidth = 1;

			const gridSize = 50;
			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;

			// Horizontal grid lines
			for (let y = centerY % gridSize; y < canvas.height; y += gridSize) {
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(canvas.width, y);
				ctx.stroke();
			}

			// Vertical grid lines
			for (let x = centerX % gridSize; x < canvas.width; x += gridSize) {
				ctx.beginPath();
				ctx.moveTo(x, 0);
				ctx.lineTo(x, canvas.height);
				ctx.stroke();
			}

			// Draw walls
			ctx.fillStyle = "#e0e0e0";
			ctx.fillRect(0, 0, canvas.width, 10); // Top wall
			ctx.fillRect(0, canvas.height - 10, canvas.width, 10); // Bottom wall
			ctx.fillRect(0, 0, 10, canvas.height); // Left wall
			ctx.fillRect(canvas.width - 10, 0, 10, canvas.height); // Right wall

			// Draw robots
			robots.forEach((robot) => {
				// Convert 3D coordinates to 2D canvas coordinates
				const x = centerX + robot.position.x * 10;
				const y = centerY + robot.position.z * 10; // Using Z as Y in 2D top-down view

				// Draw robot
				ctx.beginPath();

				// Different styles for different robot types
				if (robot.type === "heavy-duty") {
					ctx.fillStyle = "#3b82f6";
					ctx.arc(x, y, 15, 0, Math.PI * 2);
				} else {
					ctx.fillStyle = "#10b981";
					ctx.arc(x, y, 10, 0, Math.PI * 2);
				}

				// Highlight focused robot
				if (robot.id === focusedRobotId) {
					ctx.strokeStyle = "#f59e0b";
					ctx.lineWidth = 3;
					ctx.stroke();
				}

				ctx.fill();

				// Draw robot label
				ctx.fillStyle = "#000000";
				ctx.font = "12px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(robot.name, x, y - 20);

				// Draw battery indicator
				const batteryWidth = 30;
				const batteryHeight = 5;
				const batteryX = x - batteryWidth / 2;
				const batteryY = y + 20;

				// Battery outline
				ctx.strokeStyle = "#000000";
				ctx.lineWidth = 1;
				ctx.strokeRect(batteryX, batteryY, batteryWidth, batteryHeight);

				// Battery fill
				ctx.fillStyle = robot.battery > 20 ? "#10b981" : "#ef4444";
				ctx.fillRect(
					batteryX,
					batteryY,
					batteryWidth * (robot.battery / 100),
					batteryHeight
				);
			});

			animationFrameId = requestAnimationFrame(render);
		};

		render();

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			cancelAnimationFrame(animationFrameId);
		};
	}, [robots, focusedRobotId]);

	return (
		<div className="w-full h-full">
			<canvas ref={canvasRef} className="w-full h-full" />
		</div>
	);
}
