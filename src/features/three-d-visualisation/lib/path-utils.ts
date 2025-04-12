import type { Position } from "./types";

export const warehouseDimensions = {
	width: 120,
	height: 100,
};

const WALL_OFFSET = 15;

export const pathWaypoints: Position[] = [
	{ x: 22.5, y: 0, z: 15 },
	{ x: 30, y: 0, z: 15 },
	{ x: 30, y: 0, z: 46 },
	{ x: 52.5, y: 0, z: 46 },
	{ x: 52.5, y: 0, z: 73 },
	{ x: 75, y: 0, z: 73 },
	{ x: 75, y: 0, z: 46 },
	{ x: 90, y: 0, z: 46 },
	{ x: 90, y: 0, z: 15 },
	{ x: 22.5, y: 0, z: 15 },
];

export const perimeterPathWaypoints: Position[] = [
	{ x: WALL_OFFSET, y: 0, z: WALL_OFFSET },
	{ x: warehouseDimensions.width - WALL_OFFSET, y: 0, z: WALL_OFFSET },
	{
		x: warehouseDimensions.width - WALL_OFFSET,
		y: 0,
		z: warehouseDimensions.height - WALL_OFFSET,
	},
	{ x: WALL_OFFSET, y: 0, z: warehouseDimensions.height - WALL_OFFSET },
	{ x: WALL_OFFSET, y: 0, z: WALL_OFFSET },
];

export function getPositionOnPath(
	progress: number,
	usePerimeterPath = false
): Position {
	const selectedPath = usePerimeterPath
		? perimeterPathWaypoints
		: pathWaypoints;
	if (!selectedPath.length) return { x: 22.5, y: 0, z: 15 }; // Fallback position
	if (progress <= 0 || progress >= 1) return selectedPath[0];

	let totalLength = 0;
	const segmentLengths: number[] = [];
	for (let i = 0; i < selectedPath.length - 1; i++) {
		const length = calculateDistance(selectedPath[i], selectedPath[i + 1]);
		segmentLengths.push(length);
		totalLength += length;
	}

	const targetDistance = progress * totalLength;
	let coveredDistance = 0;
	let segmentIndex = 0;
	for (let i = 0; i < segmentLengths.length; i++) {
		if (coveredDistance + segmentLengths[i] >= targetDistance) {
			segmentIndex = i;
			break;
		}
		coveredDistance += segmentLengths[i];
	}

	const segmentProgress =
		(targetDistance - coveredDistance) / segmentLengths[segmentIndex];
	const start = selectedPath[segmentIndex];
	const end = selectedPath[segmentIndex + 1];

	return {
		x: start.x + (end.x - start.x) * segmentProgress,
		y: 0,
		z: start.z + (end.z - start.z) * segmentProgress,
	};
}

export function calculateDistance(pos1: Position, pos2: Position): number {
	return Math.sqrt(
		Math.pow(pos2.x - pos1.x, 2) +
			Math.pow(pos2.y - pos1.y, 2) +
			Math.pow(pos2.z - pos1.z, 2)
	);
}

export function getRotationFromDirection(
	current: Position,
	next: Position
): number {
	return Math.atan2(next.x - current.x, next.z - current.z);
}

export function warehouseToCanvasCoords(
	position: Position,
	canvasWidth: number,
	canvasHeight: number,
	scale = 5
): { x: number; y: number } {
	const x =
		position.x * scale +
		(canvasWidth / 2 - (warehouseDimensions.width * scale) / 2);
	const y =
		position.z * scale +
		(canvasHeight / 2 - (warehouseDimensions.height * scale) / 2);
	return { x, y };
}
