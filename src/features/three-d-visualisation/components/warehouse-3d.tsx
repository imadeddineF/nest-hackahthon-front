"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import type * as THREE from "three";
import type { Robot } from "../lib/types";

// Export as default component for dynamic import
export default function Warehouse3D({
	robots,
	focusedRobotId,
}: {
	robots: Robot[];
	focusedRobotId: string | null;
}) {
	return (
		<div className="w-full h-full">
			<Canvas shadows>
				<ambientLight intensity={0.5} />
				<directionalLight
					position={[10, 10, 10]}
					intensity={1}
					castShadow
					shadow-mapSize-width={2048}
					shadow-mapSize-height={2048}
				/>
				<Environment preset="warehouse" />

				{/* Floor */}
				<mesh
					rotation={[-Math.PI / 2, 0, 0]}
					position={[0, 0, 0]}
					receiveShadow
				>
					<planeGeometry args={[50, 50]} />
					<meshStandardMaterial color="#f0f0f0" />
				</mesh>

				{/* Walls */}
				<Wall position={[0, 10, -25]} rotation={[0, 0, 0]} />
				<Wall position={[0, 10, 25]} rotation={[0, Math.PI, 0]} />
				<Wall position={[-25, 10, 0]} rotation={[0, Math.PI / 2, 0]} />
				<Wall position={[25, 10, 0]} rotation={[0, -Math.PI / 2, 0]} />

				{/* Robots */}
				<Suspense fallback={null}>
					{robots.map((robot) => (
						<RobotModel
							key={robot.id}
							robot={robot}
							isFocused={robot.id === focusedRobotId}
						/>
					))}
				</Suspense>

				{/* Camera Controls */}
				<CameraController focusedRobotId={focusedRobotId} robots={robots} />
				<OrbitControls makeDefault />
			</Canvas>
		</div>
	);
}

function Wall({
	position,
	rotation,
}: {
	position: [number, number, number];
	rotation: [number, number, number];
}) {
	return (
		<mesh position={position} rotation={rotation} castShadow receiveShadow>
			<boxGeometry args={[50, 20, 0.5]} />
			<meshStandardMaterial color="#e0e0e0" />
		</mesh>
	);
}

function RobotModel({
	robot,
	isFocused,
}: {
	robot: Robot;
	isFocused: boolean;
}) {
	const group = useRef<THREE.Group>(null);
	const [prevPosition, setPrevPosition] = useState(robot.position);

	// Smooth movement animation
	useFrame((_, delta) => {
		if (group.current) {
			// Smoothly interpolate to the new position
			group.current.position.x +=
				(robot.position.x - group.current.position.x) * 5 * delta;
			group.current.position.y +=
				(robot.position.y - group.current.position.y) * 5 * delta;
			group.current.position.z +=
				(robot.position.z - group.current.position.z) * 5 * delta;

			// Calculate direction of movement for rotation
			if (
				Math.abs(prevPosition.x - robot.position.x) > 0.01 ||
				Math.abs(prevPosition.z - robot.position.z) > 0.01
			) {
				const angle = Math.atan2(
					robot.position.x - prevPosition.x,
					robot.position.z - prevPosition.z
				);
				group.current.rotation.y = angle;
			}
		}

		setPrevPosition(robot.position);
	});

	return (
		<group
			ref={group}
			position={[robot.position.x, robot.position.y, robot.position.z]}
		>
			{/* Use a simple geometric shape as a placeholder for the robot */}
			<SimpleRobotModel type={robot.type} />

			{/* Highlight effect for focused robot */}
			{isFocused && (
				<mesh position={[0, -0.1, 0]}>
					<ringGeometry args={[1.5, 2, 32]} />
					<meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
				</mesh>
			)}

			{/* Robot label - using the proper Html component from drei */}
			<Html position={[0, 2, 0]} center distanceFactor={10}>
				<div className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs whitespace-nowrap">
					{robot.name} ({robot.battery}%)
				</div>
			</Html>
		</group>
	);
}

// Simple geometric model as a placeholder for the robot
function SimpleRobotModel({ type }: { type: string }) {
	const color = type === "heavy-duty" ? "#3b82f6" : "#10b981";
	const scale = type === "heavy-duty" ? 1.2 : 0.8;

	return (
		<group scale={[scale, scale, scale]}>
			{/* Robot body */}
			<mesh castShadow>
				<boxGeometry args={[1.5, 0.5, 2]} />
				<meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
			</mesh>

			{/* Robot top */}
			<mesh position={[0, 0.5, 0]} castShadow>
				<boxGeometry args={[1, 0.5, 1.5]} />
				<meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
			</mesh>

			{/* Wheels */}
			<mesh position={[0.8, -0.25, 0.7]} castShadow>
				<cylinderGeometry
					args={[0.3, 0.3, 0.2, 16]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<meshStandardMaterial color="#333" />
			</mesh>
			<mesh position={[-0.8, -0.25, 0.7]} castShadow>
				<cylinderGeometry
					args={[0.3, 0.3, 0.2, 16]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<meshStandardMaterial color="#333" />
			</mesh>
			<mesh position={[0.8, -0.25, -0.7]} castShadow>
				<cylinderGeometry
					args={[0.3, 0.3, 0.2, 16]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<meshStandardMaterial color="#333" />
			</mesh>
			<mesh position={[-0.8, -0.25, -0.7]} castShadow>
				<cylinderGeometry
					args={[0.3, 0.3, 0.2, 16]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<meshStandardMaterial color="#333" />
			</mesh>

			{/* Sensor or light on top */}
			<mesh position={[0, 0.8, 0.5]} castShadow>
				<sphereGeometry args={[0.2, 16, 16]} />
				<meshStandardMaterial
					color={type === "heavy-duty" ? "#ff4040" : "#40ff40"}
					emissive={type === "heavy-duty" ? "#ff0000" : "#00ff00"}
					emissiveIntensity={0.5}
				/>
			</mesh>
		</group>
	);
}

function CameraController({
	focusedRobotId,
	robots,
}: {
	focusedRobotId: string | null;
	robots: Robot[];
}) {
	const { camera } = useThree();

	useEffect(() => {
		if (focusedRobotId) {
			const focusedRobot = robots.find((r) => r.id === focusedRobotId);
			if (focusedRobot) {
				// Set camera position to look at the focused robot
				camera.position.set(
					focusedRobot.position.x + 5,
					focusedRobot.position.y + 5,
					focusedRobot.position.z + 5
				);
				camera.lookAt(
					focusedRobot.position.x,
					focusedRobot.position.y,
					focusedRobot.position.z
				);
			}
		} else {
			// Reset to default view
			camera.position.set(10, 10, 10);
			camera.lookAt(0, 0, 0);
		}
	}, [focusedRobotId, robots, camera]);

	return null;
}
