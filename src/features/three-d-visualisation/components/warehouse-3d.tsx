"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Html,
  Grid,
  AccumulativeShadows,
  RandomizedLight,
  MeshReflectorMaterial,
} from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "next-themes"
import type { Robot } from "../lib/types"
import { getRotationFromDirection, warehouseDimensions } from "../lib/path-utils"

// Export as default component for dynamic import
export default function Warehouse3D({
  robots = [],
  focusedRobotId,
}: {
  robots: Robot[]
  focusedRobotId: string | null
}) {
  const { theme, resolvedTheme } = useTheme()

  // Determine if we're in dark mode
  const isDarkMode = theme === "dark" || resolvedTheme === "dark"

  // Theme-based colors
  const colors = {
    background: isDarkMode ? "#121212" : "#f0f2f5",
    floor: isDarkMode ? "#1e1e1e" : "#a0a0a0",
    grid: isDarkMode ? "#333333" : "#6f6f6f",
    gridSection: isDarkMode ? "#9d4b4b" : "#9d4b4b",
    walls: isDarkMode ? "#2a3f5a" : "#2a3f5a",
    glass: isDarkMode ? "#1e293b" : "#88a1c7",
    floorMarking: isDarkMode ? "#1e293b" : "#e0e0e0",
    floorEmissive: isDarkMode ? "#304878" : "#304878",
    heavyRobot: isDarkMode ? "#2563eb" : "#2563eb",
    lightRobot: isDarkMode ? "#059669" : "#059669",
    labelBg: isDarkMode ? "bg-gray-800/90" : "bg-blue-900/90",
    shadow: isDarkMode ? "#000000" : "#9d7b7b",
    path: isDarkMode ? "#000000" : "#111111",
  }

  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 30, 30], fov: 50 }}>
        {/* Theme-based background and fog */}
        <color attach="background" args={[colors.background]} />
        {/* <fog attach="fog" args={[colors.background, 30, 100]} /> */}

        <ambientLight intensity={isDarkMode ? 0.3 : 0.5} />
        <Environment preset={isDarkMode ? "night" : "city"} />

        {/* Theme-based floor - moved inside Canvas */}
        <WarehouseFloor color={colors.floor} isDarkMode={isDarkMode} />

        {/* Theme-based grid */}
        <Grid
          position={[0, 0.01, 0]}
          args={[200, 200]}
          cellSize={5}
          cellThickness={0.6}
          cellColor={colors.grid}
          sectionSize={20}
          sectionThickness={1.2}
          sectionColor={colors.gridSection}
          fadeDistance={50}
          fadeStrength={1.5}
        />

        {/* Warehouse Layout with theme colors */}
        <WarehouseLayout
          wallColor={colors.walls}
          glassColor={colors.glass}
          floorColor={colors.floorMarking}
          floorEmissive={colors.floorEmissive}
          labelBg={colors.labelBg}
          isDarkMode={isDarkMode}
          pathColor={colors.path}
        />

        {/* Robots */}
        {Array.isArray(robots) &&
          robots.map((robot) => (
            <RobotModel
              key={robot.id}
              robot={robot}
              isFocused={robot.id === focusedRobotId}
              heavyColor={colors.heavyRobot}
              lightColor={colors.lightRobot}
              isDarkMode={isDarkMode}
            />
          ))}

        {/* Camera Controls */}
        <CameraController focusedRobotId={focusedRobotId} robots={robots || []} />
        <OrbitControls 
          makeDefault 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI} 
          enableZoom={true}
          zoomSpeed={1}
          enablePan={true}
          panSpeed={1.2}
          minDistance={5}
          maxDistance={200}
          enableDamping={true}
          dampingFactor={0.1}
          enableRotate={true}
          rotateSpeed={1.2}
        />

        {/* Shadows - theme based */}
        <AccumulativeShadows
          temporal
          frames={100}
          color={colors.shadow}
          colorBlend={0.5}
          opacity={isDarkMode ? 0.6 : 0.8}
          scale={20}
          position={[0, 0.01, 0]}
        >
          <RandomizedLight amount={4} radius={10} ambient={0.5} position={[10, 10, 10]} bias={0.001} />
        </AccumulativeShadows>
      </Canvas>
    </div>
  )
}

function WarehouseFloor({
  color,
  isDarkMode,
}: {
  color: string
  isDarkMode: boolean
}) {
  // Create a simple procedural texture instead of loading external files
  const [normalMap] = useState(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 512
    const context = canvas.getContext("2d")
    if (context) {
      // Create a simple noise pattern
      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          const value = Math.floor(Math.random() * 40) + 215
          context.fillStyle = `rgb(${value}, ${value}, ${value})`
          context.fillRect(x, y, 1, 1)
        }
      }
    }
    return new THREE.CanvasTexture(canvas)
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <planeGeometry args={[200, 200]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={1024}
        mirror={isDarkMode ? 0.3 : 0.5}
        mixBlur={6}
        mixStrength={isDarkMode ? 1 : 1.5}
        color={color}
        metalness={isDarkMode ? 0.2 : 0.4}
        roughness={0.8}
        normalMap={normalMap}
        normalScale={[0.1, 0.1]}
      />
    </mesh>
  )
}

function WarehouseLayout({
  wallColor,
  glassColor,
  floorColor,
  floorEmissive,
  labelBg,
  isDarkMode,
  pathColor,
}: {
  wallColor: string
  glassColor: string
  floorColor: string
  floorEmissive: string
  labelBg: string
  isDarkMode: boolean
  pathColor: string
}) {
  // Center the warehouse
  const offsetX = -warehouseDimensions.width / 2
  const offsetZ = -warehouseDimensions.height / 2

  const wallHeight = 8
  const wallThickness = 0.5

  // Theme-based materials
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: wallColor,
    metalness: 0.2,
    roughness: 0.3,
  })

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: glassColor,
    metalness: isDarkMode ? 0.5 : 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: isDarkMode ? 0.2 : 0.3,
    transmission: isDarkMode ? 0.5 : 0.9,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  })

  return (
    <group>
      {/* Outer Walls */}
      {/* Bottom Wall */}
      <Wall
        position={[0, wallHeight / 2, offsetZ + warehouseDimensions.height]}
        size={[warehouseDimensions.width, wallHeight, wallThickness]}
        materialProps={{ color: wallColor, metalness: 0.2, roughness: 0.3 }}
      />

      {/* Top Wall */}
      <Wall
        position={[0, wallHeight / 2, offsetZ]}
        size={[warehouseDimensions.width, wallHeight, wallThickness]}
        materialProps={{ color: wallColor, metalness: 0.2, roughness: 0.3 }}
      />

      {/* Left Wall */}
      <Wall
        position={[offsetX, wallHeight / 2, warehouseDimensions.height / 2 + offsetZ]}
        size={[wallThickness, wallHeight, warehouseDimensions.height]}
        materialProps={{ color: wallColor, metalness: 0.2, roughness: 0.3 }}
      />

      {/* Right Wall */}
      <Wall
        position={[offsetX + warehouseDimensions.width, wallHeight / 2, warehouseDimensions.height / 2 + offsetZ]}
        size={[wallThickness, wallHeight, warehouseDimensions.height]}
        materialProps={{ color: wallColor, metalness: 0.2, roughness: 0.3 }}
      />

      {/* Black Paths - based on the exact diagram */}
      {/* Vertical path on the left (x=45) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[offsetX + 30, 1, offsetZ + 25.8]}>
        <planeGeometry args={[3, 51.4]} />
        <meshStandardMaterial 
          color={pathColor}
          metalness={0.3}
          roughness={0.7}
          emissive={pathColor}
          emissiveIntensity={0.1}
        />
      </mesh>

	  {/* Vertical path on the right (x=90) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[offsetX + 75, 1, offsetZ + 25.8]}>
        <planeGeometry args={[3, 51.5]} />
        <meshStandardMaterial 
          color={pathColor}
          metalness={0.3}
          roughness={0.7}
          emissive={pathColor}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Horizontal path in the middle (z=50) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[offsetX + 51, 1, offsetZ + 50]}>
        <planeGeometry args={[45, 3]} />
        <meshStandardMaterial 
          color={pathColor}
          metalness={0.3}
          roughness={0.7}
          emissive={pathColor}
          emissiveIntensity={0.1}
        />
      </mesh>



      {/* Additional vertical path (x=70) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[offsetX + 52.5, 1, offsetZ + 75]}>
        <planeGeometry args={[3, 50]} />
        <meshStandardMaterial 
          color={pathColor}
          metalness={0.3}
          roughness={0.7}
          emissive={pathColor}
          emissiveIntensity={0.1}
        />
      </mesh>

      

      {/* Floor markings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[warehouseDimensions.width, warehouseDimensions.height]} />
        <meshStandardMaterial
          color={floorColor}
          metalness={0.2}
          roughness={0.8}
          emissive={floorEmissive}
          emissiveIntensity={isDarkMode ? 0.4 : 0.2}
        />
      </mesh>
    </group>
  )
}

function Wall({
  position,
  size,
  materialProps,
  isGlass = false,
}: {
  position: [number, number, number]
  size: [number, number, number]
  materialProps: any
  isGlass?: boolean
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      {isGlass ? <meshPhysicalMaterial {...materialProps} /> : <meshStandardMaterial {...materialProps} />}
    </mesh>
  )
}

function RobotModel({
  robot,
  isFocused,
  heavyColor,
  lightColor,
  isDarkMode,
}: {
  robot: Robot
  isFocused: boolean
  heavyColor: string
  lightColor: string
  isDarkMode: boolean
}) {
  const group = useRef<THREE.Group>(null)
  const [prevPosition, setPrevPosition] = useState(robot.position)

  // Center the robot position
  const offsetX = -warehouseDimensions.width / 2
  const offsetZ = -warehouseDimensions.height / 2

  // Smooth movement animation
  useFrame((_, delta) => {
    if (group.current) {
      // Calculate centered position
      const targetX = robot.position.x + offsetX
      const targetY = robot.position.y
      const targetZ = robot.position.z + offsetZ

      // Smoothly interpolate to the new position
      group.current.position.x += (targetX - group.current.position.x) * 5 * delta
      group.current.position.y += (targetY - group.current.position.y) * 5 * delta
      group.current.position.z += (targetZ - group.current.position.z) * 5 * delta

      // Calculate direction of movement for rotation
      if (Math.abs(prevPosition.x - robot.position.x) > 0.01 || Math.abs(prevPosition.z - robot.position.z) > 0.01) {
        const angle = getRotationFromDirection(prevPosition, robot.position)
        group.current.rotation.y = angle
      }
    }

    setPrevPosition(robot.position)
  })

  return (
    <group ref={group} position={[robot.position.x + offsetX, robot.position.y, robot.position.z + offsetZ]}>
      {/* Use a modern robot model */}
      <ModernRobotModel
        type={robot.type}
        battery={robot.battery}
        heavyColor={heavyColor}
        lightColor={lightColor}
        isDarkMode={isDarkMode}
      />

      {/* Highlight effect for focused robot */}
      {isFocused && (
        <group>
          <mesh position={[0, -0.1, 0]}>
            <ringGeometry args={[1.5, 2, 32]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={isDarkMode ? 0.7 : 0.5} />
          </mesh>
          <pointLight position={[0, 0.5, 0]} intensity={isDarkMode ? 1 : 0.7} distance={5} color="#000000" />
        </group>
      )}

      {/* Robot label - using the proper Html component from drei */}
      <Html position={[0, 2.5, 0]} center distanceFactor={10}>
        <div
          className={`${isDarkMode ? "bg-gray-800/90" : "bg-blue-900/90"} backdrop-blur-md px-3 py-2 rounded-md text-white text-xs font-medium whitespace-nowrap shadow-lg`}
        >
          {robot.name} ({robot.battery}%)
        </div>
      </Html>
    </group>
  )
}

// Modern robot model
function ModernRobotModel({
  type,
  battery,
  heavyColor,
  lightColor,
  isDarkMode,
}: {
  type: string
  battery: number
  heavyColor: string
  lightColor: string
  isDarkMode: boolean
}) {
  const isHeavyDuty = type === "heavy-duty"
  const mainColor = isHeavyDuty ? heavyColor : lightColor
  const accentColor = isHeavyDuty ? (isDarkMode ? "#1e40af" : "#1e40af") : isDarkMode ? "#047857" : "#047857"
  const scale = isHeavyDuty ? 1.2 : 0.8

  // Battery indicator color
  const batteryColor =
    battery > 50
      ? isDarkMode
        ? "#34d399"
        : "#10b981"
      : battery > 20
        ? isDarkMode
          ? "#fbbf24"
          : "#f59e0b"
        : isDarkMode
          ? "#f87171"
          : "#ef4444"

  return (
    <group scale={[scale, scale, scale]}>
      {/* Robot base */}
      <mesh castShadow position={[0, 0.3, 0]}>
        <boxGeometry args={[1.8, 0.6, 2.2]} />
        <meshStandardMaterial color={mainColor} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Robot top */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[1.2, 0.6, 1.8]} />
        <meshStandardMaterial color={accentColor} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Robot head/sensor array */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.4, 8]} />
        <meshStandardMaterial color={isDarkMode ? "#333333" : "#111111"} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Sensor light */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={batteryColor}
          emissiveIntensity={isDarkMode ? 1.5 : 1}
          toneMapped={false}
        />
      </mesh>
      <pointLight position={[0, 1.6, 0]} intensity={isDarkMode ? 0.7 : 0.5} distance={3} color={batteryColor} />

      {/* Wheels */}
      <Wheel position={[0.9, 0, 0.8]} isDarkMode={isDarkMode} />
      <Wheel position={[-0.9, 0, 0.8]} isDarkMode={isDarkMode} />
      <Wheel position={[0.9, 0, -0.8]} isDarkMode={isDarkMode} />
      <Wheel position={[-0.9, 0, -0.8]} isDarkMode={isDarkMode} />

      {/* Details */}
      <mesh position={[0, 0.6, 1.1]} castShadow>
        <boxGeometry args={[1, 0.1, 0.1]} />
        <meshStandardMaterial color={isDarkMode ? "#333333" : "#111111"} metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Battery indicator */}
      <mesh position={[0, 0.6, -1.1]} castShadow>
        <boxGeometry args={[1, 0.2, 0.05]} />
        <meshStandardMaterial color={isDarkMode ? "#555555" : "#333333"} />
      </mesh>
      <mesh position={[-0.5 + (battery / 100) * 0.5, 0.6, -1.08]} castShadow>
        <boxGeometry args={[(battery / 100) * 0.9, 0.15, 0.05]} />
        <meshStandardMaterial
          color={batteryColor}
          emissive={batteryColor}
          emissiveIntensity={isDarkMode ? 0.7 : 0.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function Wheel({ position, isDarkMode }: { position: [number, number, number]; isDarkMode: boolean }) {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
      <meshStandardMaterial color={isDarkMode ? "#333333" : "#111111"} metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

function CameraController({
  focusedRobotId,
  robots = [],
}: {
  focusedRobotId: string | null
  robots: Robot[]
}) {
  const { camera } = useThree()

  // Center the robot position
  const offsetX = -warehouseDimensions.width / 2
  const offsetZ = -warehouseDimensions.height / 2

  // First useEffect - initial camera setup
  useEffect(() => {
    // Set default position on component mount
    camera.position.set(0, 40, 40)
    camera.lookAt(0, 0, 0)
  }, []);

  return null
}
