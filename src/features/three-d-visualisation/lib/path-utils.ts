import type { Position } from "./types"

// Define the warehouse layout based on the provided floor plan
export const warehouseDimensions = {
  width: 120, // 45cm + 45cm + 30cm
  height: 100, // 100cm as shown in the image
}

// Define the path waypoints based on the floor plan
// These coordinates are in centimeters and will be aligned exactly with the walls
export const pathWaypoints: Position[] = [
  // Home position (top-left corner)
  { x: 22.5, y: 0, z: 15 },
  // Move right along the top wall
  { x: 67.5, y: 0, z: 15 },
  // Move down along the right side
  { x: 67.5, y: 0, z: 50 },
  // Move to the center section
  { x: 45, y: 0, z: 50 },
  // Move down to the bottom of the center section
  { x: 45, y: 0, z: 85 },
  // Move left to the bottom-left corner
  { x: 22.5, y: 0, z: 85 },
  // Move up to complete the path
  { x: 22.5, y: 0, z: 15 },
]

// Function to get a position along the path based on progress (0-1)
export function getPositionOnPath(progress: number): Position {
  if (progress <= 0) return pathWaypoints[0]
  if (progress >= 1) return pathWaypoints[pathWaypoints.length - 1]

  // Calculate the total path length
  let totalLength = 0
  const segmentLengths: number[] = []

  for (let i = 0; i < pathWaypoints.length - 1; i++) {
    const length = calculateDistance(pathWaypoints[i], pathWaypoints[i + 1])
    segmentLengths.push(length)
    totalLength += length
  }

  // Find the appropriate segment based on progress
  const targetDistance = progress * totalLength
  let coveredDistance = 0
  let segmentIndex = 0

  for (let i = 0; i < segmentLengths.length; i++) {
    if (coveredDistance + segmentLengths[i] >= targetDistance) {
      segmentIndex = i
      break
    }
    coveredDistance += segmentLengths[i]
  }

  // Calculate progress within the segment
  const segmentProgress = (targetDistance - coveredDistance) / segmentLengths[segmentIndex]

  // Interpolate position within the segment
  const start = pathWaypoints[segmentIndex]
  const end = pathWaypoints[segmentIndex + 1]

  return {
    x: start.x + (end.x - start.x) * segmentProgress,
    y: start.y + (end.y - start.y) * segmentProgress,
    z: start.z + (end.z - start.z) * segmentProgress,
  }
}

// Calculate distance between two positions
function calculateDistance(pos1: Position, pos2: Position): number {
  return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2) + Math.pow(pos2.z - pos1.z, 2))
}

// Get the rotation angle based on movement direction
export function getRotationFromDirection(current: Position, next: Position): number {
  return Math.atan2(next.x - current.x, next.z - current.z)
}

// Convert warehouse coordinates to canvas coordinates
export function warehouseToCanvasCoords(
  position: Position,
  canvasWidth: number,
  canvasHeight: number,
  scale = 5,
): { x: number; y: number } {
  // Scale and center the coordinates
  const x = position.x * scale + (canvasWidth / 2 - (warehouseDimensions.width * scale) / 2)
  const y = position.z * scale + (canvasHeight / 2 - (warehouseDimensions.height * scale) / 2)

  return { x, y }
}
