"use client"

import type React from "react"

interface RobotStatusCardProps {
  robot: {
    id: string
    name: string
    type: string
    battery: number
  }
  isFocused: boolean
  onFocus: () => void
}

const RobotStatusCard: React.FC<RobotStatusCardProps> = ({ robot, isFocused, onFocus }) => {
  return (
    <div
      className={`border rounded-md p-4 shadow-sm cursor-pointer ${isFocused ? "border-blue-500" : "border-gray-200"}`}
      onClick={onFocus}
    >
      <h3 className="text-lg font-semibold">{robot.name}</h3>
      <p className="text-sm text-gray-500">Type: {robot.type}</p>
      <div className="flex items-center gap-2">
        <p className="text-sm">Battery:</p>
        <div className="w-20 h-4 bg-gray-200 rounded-md relative">
          <div
            className="absolute top-0 left-0 h-full rounded-md bg-green-500"
            style={{ width: `${robot.battery}%` }}
          ></div>
        </div>
        <p className="text-sm">{robot.battery}%</p>
      </div>
    </div>
  )
}

export default RobotStatusCard
