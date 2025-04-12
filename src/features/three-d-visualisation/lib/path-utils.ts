import type { Position } from "./types"

// Define the warehouse layout based on the provided floor plan
export const warehouseDimensions = {
  width: 120, // 45cm + 45cm + 30cm
  height: 100, // 100cm as shown in the image
}

// Define the wall offset for the perimeter path
const WALL_OFFSET = 15 // 15cm away from walls

// Define the path waypoints based on the floor plan
// These coordinates are in centimeters and will be aligned exactly with the walls
export const pathWaypoints: Position[] = [
  // Start at home position
  // { x: 22.5, y: 0, z: 15 },
  // // Move right to the first vertical path
  // { x: 30, y: 50, z: 15 },
  // // Move down along the first vertical path
  // { x: 30, y: 0, z: 46 },
  // // Move right along the horizontal path
  // { x: 52.5, y: 0, z: 46 },
  // // Move down along the middle vertical path
  // { x: 52.5, y: 0, z: 73 },
  // // Move right to the second vertical path
  // { x: 75, y: 0, z: 73 },
  // // Move up along the second vertical path
  // { x: 75, y: 0, z: 46 },
  // // Move right to near the right wall
  // { x: 90, y: 0, z: 46 },
  // // Move up along the right wall path
  // { x: 90, y: 0, z: 15 },
  // // Move left back to the home position
  // { x: 22.5, y: 0, z: 15 },
]

// Define a perimeter path that follows the walls with an offset
export const perimeterPathWaypoints: Position[] = [
  // Start at top-left corner (with offset from walls)
  { x: WALL_OFFSET, y: 0, z: WALL_OFFSET },
  // Move right along the top wall
  { x: warehouseDimensions.width - WALL_OFFSET, y: 0, z: WALL_OFFSET },
  // Move down along the right wall
  { x: warehouseDimensions.width - WALL_OFFSET, y: 0, z: warehouseDimensions.height - WALL_OFFSET },
  // Move left along the bottom wall
  { x: WALL_OFFSET, y: 0, z: warehouseDimensions.height - WALL_OFFSET },
  // Move up along the left wall to complete the loop
  { x: WALL_OFFSET, y: 0, z: WALL_OFFSET },
]

// Combine both paths for visualization
export const allPathWaypoints = [...pathWaypoints, ...perimeterPathWaypoints]

// Function to get a position along the path based on progress (0-1)
export function getPositionOnPath(progress: number, usePerimeterPath = false): Position {
  const selectedPath = usePerimeterPath ? perimeterPathWaypoints : pathWaypoints
  
  if (progress <= 0) return selectedPath[0]
  if (progress >= 1) return selectedPath[0] // Return to starting point for a complete loop

  // Calculate the total path length
  let totalLength = 0
  const segmentLengths: number[] = []

  for (let i = 0; i < selectedPath.length - 1; i++) {
    const length = calculateDistance(selectedPath[i], selectedPath[i + 1])
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
  const start = selectedPath[segmentIndex]
  const end = selectedPath[segmentIndex + 1]

  return {
    x: start.x + (end.x - start.x) * segmentProgress,
    y: start.y + (end.y - start.y) * segmentProgress,
    z: start.z + (end.z - start.z) * segmentProgress,
  }
}

// Calculate distance between two positions
export function calculateDistance(pos1: Position, pos2: Position): number {
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
