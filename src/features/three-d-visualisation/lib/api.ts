import type { Robot } from "./types"
import { getPositionOnPath } from "./path-utils"

// Mock API function to fetch robot data
// In a real application, this would connect to your backend API
export async function fetchRobotData(): Promise<Robot[]> {
  // Calculate progress along the path based on time
  const baseProgress = (Date.now() % 60000) / 60000 // Complete path every 60 seconds

  return [
    {
      id: "robot-1",
      name: "Hauler-1",
      type: "heavy-duty",
      status: "active",
      position: getPositionOnPath(baseProgress),
      battery: 85,
    },
    // {
    //   id: "robot-2",
    //   name: "Picker-1",
    //   type: "light-duty",
    //   status: "active",
    //   position: getPositionOnPath((baseProgress + 0.25) % 1), // 25% offset from first robot
    //   battery: 72,
    // },
    // {
    //   id: "robot-3",
    //   name: "Hauler-2",
    //   type: "heavy-duty",
    //   status: "charging",
    //   position: {
    //     x: 22.5, // Home position
    //     y: 0.5,
    //     z: 20,
    //   },
    //   battery: 35,
    // },
    // {
    //   id: "robot-4",
    //   name: "Picker-2",
    //   type: "light-duty",
    //   status: "active",
    //   position: getPositionOnPath((baseProgress + 0.5) % 1), // 50% offset from first robot
    //   battery: 90,
    // },
  ]
}
