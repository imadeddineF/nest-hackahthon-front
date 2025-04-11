"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"
import type { Robot } from "../lib/types"

interface Warehouse2DProps {
  robots: Robot[]
  focusedRobotId: string | null
}

export default function Warehouse2D({ robots = [], focusedRobotId }: Warehouse2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, resolvedTheme } = useTheme()

  // Determine if we're in dark mode
  const isDarkMode = theme === "dark" || resolvedTheme === "dark"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match container
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation loop
    let animationFrameId: number

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Theme-based colors
      const colors = {
        background: isDarkMode ? "#1a1a1a" : "#f5f5f5",
        grid: isDarkMode ? "#333333" : "#e0e0e0",
        walls: isDarkMode ? "#ffffff" : "#000000",
        text: isDarkMode ? "#ffffff" : "#000000",
        heavyRobot: isDarkMode ? "#60a5fa" : "#3b82f6", // Blue
        lightRobot: isDarkMode ? "#34d399" : "#10b981", // Green
        focusHighlight: "#f59e0b", // Amber for both themes
        batteryGood: isDarkMode ? "#34d399" : "#10b981", // Green
        batteryLow: isDarkMode ? "#f87171" : "#ef4444", // Red
      }

      // Draw warehouse floor
      ctx.fillStyle = colors.background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Scale factor for drawing
      const scale = 5 // 5 pixels per cm

      // Calculate the warehouse position on canvas
      const warehouseWidth = 120 * scale // 120cm
      const warehouseHeight = 100 * scale // 100cm

      const startX = (canvas.width - warehouseWidth) / 2
      const startY = (canvas.height - warehouseHeight) / 2

      // Draw grid
      ctx.strokeStyle = colors.grid
      ctx.lineWidth = 1

      const gridSize = 10 * scale // 10cm grid

      // Horizontal grid lines
      for (let y = 0; y <= warehouseHeight; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(startX, startY + y)
        ctx.lineTo(startX + warehouseWidth, startY + y)
        ctx.stroke()
      }

      // Vertical grid lines
      for (let x = 0; x <= warehouseWidth; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(startX + x, startY)
        ctx.lineTo(startX + x, startY + warehouseHeight)
        ctx.stroke()
      }

      // Draw warehouse layout based on the floor plan
      ctx.strokeStyle = colors.walls
      ctx.lineWidth = 3
      ctx.beginPath()

      // Outer rectangle
      ctx.rect(startX, startY, warehouseWidth, warehouseHeight)

      // Inner walls
      // Top-right section (TAG 1)
      ctx.moveTo(startX + 45 * scale, startY)
      ctx.lineTo(startX + 45 * scale, startY + 50 * scale)

      // Bottom section divider
      ctx.moveTo(startX + 45 * scale, startY + 50 * scale)
      ctx.lineTo(startX + 90 * scale, startY + 50 * scale)

      // Right section divider (TAG 2)
      ctx.moveTo(startX + 90 * scale, startY)
      ctx.lineTo(startX + 90 * scale, startY + warehouseHeight)

      ctx.stroke()

      // Draw labels
      ctx.fillStyle = colors.text
      ctx.font = "14px sans-serif"

      // Home label
      ctx.fillText("Home", startX + 10, startY + 20)

      // TAG labels
      ctx.fillText("TAG 1", startX + 60 * scale, startY + 20)
      ctx.fillText("TAG 2", startX + 100 * scale, startY + 30)
      ctx.fillText("TAG 3", startX + 100 * scale, startY + 80 * scale)
      ctx.fillText("TAG 4", startX + 20 * scale, startY + 80 * scale)

      // Draw robots
      if (Array.isArray(robots)) {
        robots.forEach((robot) => {
          // Convert 3D coordinates to 2D canvas coordinates
          const x = startX + robot.position.x * scale
          const y = startY + robot.position.z * scale // Using Z as Y in 2D top-down view

          // Draw robot
          ctx.beginPath()

          // Different styles for different robot types
          if (robot.type === "heavy-duty") {
            ctx.fillStyle = colors.heavyRobot
            ctx.arc(x, y, 15, 0, Math.PI * 2)
          } else {
            ctx.fillStyle = colors.lightRobot
            ctx.arc(x, y, 10, 0, Math.PI * 2)
          }

          // Highlight focused robot
          if (robot.id === focusedRobotId) {
            ctx.strokeStyle = colors.focusHighlight
            ctx.lineWidth = 3
            ctx.stroke()
          }

          ctx.fill()

          // Draw robot label
          ctx.fillStyle = colors.text
          ctx.font = "12px sans-serif"
          ctx.textAlign = "center"
          ctx.fillText(robot.name, x, y - 20)

          // Draw battery indicator
          const batteryWidth = 30
          const batteryHeight = 5
          const batteryX = x - batteryWidth / 2
          const batteryY = y + 20

          // Battery outline
          ctx.strokeStyle = colors.text
          ctx.lineWidth = 1
          ctx.strokeRect(batteryX, batteryY, batteryWidth, batteryHeight)

          // Battery fill
          ctx.fillStyle = robot.battery > 20 ? colors.batteryGood : colors.batteryLow
          ctx.fillRect(batteryX, batteryY, batteryWidth * (robot.battery / 100), batteryHeight)
        })
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [robots, focusedRobotId, isDarkMode])

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
}
