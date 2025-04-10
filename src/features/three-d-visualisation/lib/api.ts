import type { Robot } from "./types";

// Mock API function to fetch robot data
// In a real application, this would connect to your backend API
export async function fetchRobotData(): Promise<Robot[]> {
	// For demo purposes, we'll generate some random robot data
	// In a real application, you would fetch this from your API
	return [
		{
			id: "robot-1",
			name: "Hauler-1",
			type: "heavy-duty",
			status: "active",
			position: {
				x: Math.sin(Date.now() / 3000) * 5,
				y: 0.5,
				z: Math.cos(Date.now() / 3000) * 5,
			},
			battery: 85,
		},
		{
			id: "robot-2",
			name: "Picker-1",
			type: "lightweight",
			status: "active",
			position: {
				x: Math.sin(Date.now() / 2000 + 1) * 8,
				y: 0.3,
				z: Math.cos(Date.now() / 2000 + 1) * 8,
			},
			battery: 72,
		},
		{
			id: "robot-3",
			name: "Hauler-2",
			type: "heavy-duty",
			status: "charging",
			position: {
				x: -5,
				y: 0.5,
				z: -5,
			},
			battery: 35,
		},
		{
			id: "robot-4",
			name: "Picker-2",
			type: "lightweight",
			status: "active",
			position: {
				x: Math.sin(Date.now() / 2500 + 2) * 6,
				y: Math.sin(Date.now() / 1000) * 0.5 + 0.8, // Adding some vertical movement
				z: Math.cos(Date.now() / 2500 + 2) * 6,
			},
			battery: 90,
		},
	];
}
