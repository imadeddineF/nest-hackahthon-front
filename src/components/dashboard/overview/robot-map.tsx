"use client";

import { useEffect, useRef, useState } from "react";

export function RobotMap() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Set canvas dimensions to match container
		const resizeCanvas = () => {
			const container = canvas.parentElement;
			if (container) {
				canvas.width = container.clientWidth;
				canvas.height = container.clientHeight;
				drawWarehouseMap(ctx, canvas.width, canvas.height);
			}
		};

		// Initial resize
		resizeCanvas();

		// Listen for window resize
		window.addEventListener("resize", resizeCanvas);

		// Set loaded state
		setIsLoaded(true);

		return () => {
			window.removeEventListener("resize", resizeCanvas);
		};
	}, []);

	useEffect(() => {
		if (!isLoaded) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Robot positions (would come from real-time data)
		const robots = [
			{
				id: "WR-001",
				x: canvas.width * 0.2,
				y: canvas.height * 0.3,
				status: "active",
			},
			{
				id: "WR-002",
				x: canvas.width * 0.7,
				y: canvas.height * 0.6,
				status: "active",
			},
			{
				id: "WR-003",
				x: canvas.width * 0.1,
				y: canvas.height * 0.8,
				status: "charging",
			},
			{
				id: "WR-004",
				x: canvas.width * 0.5,
				y: canvas.height * 0.2,
				status: "maintenance",
			},
		];

		// Animation loop
		let animationFrameId: number;

		const render = () => {
			drawWarehouseMap(ctx, canvas.width, canvas.height);
			drawRobots(ctx, robots);
			animationFrameId = window.requestAnimationFrame(render);
		};

		render();

		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
	}, [isLoaded]);

	// Draw warehouse layout
	const drawWarehouseMap = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number
	) => {
		// Clear canvas
		ctx.clearRect(0, 0, width, height);

		// Draw background
		ctx.fillStyle = "#f8f9fa";
		ctx.fillRect(0, 0, width, height);

		// Draw grid
		ctx.strokeStyle = "#e9ecef";
		ctx.lineWidth = 1;

		// Vertical grid lines
		for (let x = 0; x <= width; x += 50) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);
			ctx.stroke();
		}

		// Horizontal grid lines
		for (let y = 0; y <= height; y += 50) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(width, y);
			ctx.stroke();
		}

		// Draw storage racks
		ctx.fillStyle = "#ced4da";

		// Left racks
		for (let y = 50; y < height - 100; y += 100) {
			ctx.fillRect(50, y, 150, 50);
		}

		// Right racks
		for (let y = 50; y < height - 100; y += 100) {
			ctx.fillRect(width - 200, y, 150, 50);
		}

		// Center racks
		for (let y = 150; y < height - 150; y += 150) {
			ctx.fillRect(width / 2 - 75, y, 150, 50);
		}

		// Draw charging stations
		ctx.fillStyle = "#4dabf7";
		ctx.fillRect(50, height - 80, 80, 40);
		ctx.fillRect(150, height - 80, 80, 40);

		// Draw maintenance area
		ctx.fillStyle = "#ff8787";
		ctx.fillRect(width - 150, height - 80, 100, 40);

		// Draw labels
		ctx.fillStyle = "#495057";
		ctx.font = "12px sans-serif";
		ctx.fillText("Charging Stations", 60, height - 50);
		ctx.fillText("Maintenance", width - 130, height - 50);
		ctx.fillText("Picking Zone A", 80, 30);
		ctx.fillText("Storage Zone B", width - 150, 30);
		ctx.fillText("Storage Zone C", width / 2 - 50, 130);
	};

	// Draw robots on the map
	const drawRobots = (ctx: CanvasRenderingContext2D, robots: any[]) => {
		robots.forEach((robot) => {
			// Set color based on status
			let color = "#40c057"; // active - green
			if (robot.status === "charging") {
				color = "#fab005"; // charging - yellow
			} else if (robot.status === "maintenance") {
				color = "#fa5252"; // maintenance - red
			}

			// Draw robot
			ctx.beginPath();
			ctx.arc(robot.x, robot.y, 10, 0, Math.PI * 2);
			ctx.fillStyle = color;
			ctx.fill();
			ctx.strokeStyle = "#343a40";
			ctx.lineWidth = 2;
			ctx.stroke();

			// Draw label
			ctx.fillStyle = "#212529";
			ctx.font = "bold 12px sans-serif";
			ctx.fillText(robot.id, robot.x - 20, robot.y - 15);
		});
	};

	return (
		<canvas
			ref={canvasRef}
			className="w-full h-full"
			style={{ display: "block" }}
		/>
	);
}
