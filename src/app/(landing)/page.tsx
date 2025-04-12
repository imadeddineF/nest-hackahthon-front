"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, ChevronRight, Menu, Moon, Star, Sun, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const slideIn = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const WarehouseSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="warehouseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0.6" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="10" floodOpacity="0.2" />
      </filter>
    </defs>

    {/* Background grid */}
    <motion.path
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      transition={{ duration: 1 }}
      d="M0 100 H800 M0 200 H800 M0 300 H800 M0 400 H800 M0 500 H800 M100 0 V600 M200 0 V600 M300 0 V600 M400 0 V600 M500 0 V600 M600 0 V600 M700 0 V600"
      stroke="#f97316"
      strokeWidth="1"
    />

    {/* Warehouse floor */}
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      d="M100 400H700V500H100V400Z"
      stroke="#f97316"
      strokeWidth="4"
      fill="url(#warehouseGradient)"
      filter="url(#shadow)"
    />

    {/* Warehouse roof */}
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
      d="M150 300H650L700 400H100L150 300Z"
      stroke="#f97316"
      strokeWidth="4"
      fill="#FDBA74"
      filter="url(#shadow)"
    />

    {/* Warehouse boxes */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1 }}>
      <motion.rect
        initial={{ y: 380 }}
        animate={{ y: 420 }}
        transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
        x="200"
        width="80"
        height="80"
        fill="#f97316"
        rx="4"
        filter="url(#shadow)"
      />
      <motion.rect
        initial={{ y: 380 }}
        animate={{ y: 420 }}
        transition={{ duration: 0.5, delay: 1.4, type: "spring" }}
        x="360"
        width="80"
        height="80"
        fill="#f97316"
        rx="4"
        filter="url(#shadow)"
      />
      <motion.rect
        initial={{ y: 380 }}
        animate={{ y: 420 }}
        transition={{ duration: 0.5, delay: 1.6, type: "spring" }}
        x="520"
        width="80"
        height="80"
        fill="#f97316"
        rx="4"
        filter="url(#shadow)"
      />
    </motion.g>

    {/* Status indicator */}
    <motion.circle
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 1.8 }}
      cx="400"
      cy="350"
      r="20"
      fill="#10B981"
      filter="url(#shadow)"
    />
    <motion.path
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 2 }}
      d="M380 350H420M400 330V370"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Data flow lines */}
    <motion.path
      initial={{ pathLength: 0, opacity: 0.7 }}
      animate={{ pathLength: 1, opacity: 0.7 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 2.2 }}
      d="M250 320C250 320 300 280 400 320C500 360 550 320 550 320"
      stroke="#3B82F6"
      strokeWidth="3"
      strokeDasharray="5 5"
      fill="none"
    />

    {/* Animated dots */}
    <motion.circle
      initial={{ cx: 250, opacity: 0 }}
      animate={{ cx: 550, opacity: [0, 1, 0] }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 2.5 }}
      cy="320"
      r="5"
      fill="#3B82F6"
    />
    <motion.circle
      initial={{ cx: 250, opacity: 0 }}
      animate={{ cx: 550, opacity: [0, 1, 0] }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 3 }}
      cy="320"
      r="5"
      fill="#3B82F6"
    />

    {/* Warehouse details */}
    <motion.path
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{ duration: 0.5, delay: 2.2 }}
      d="M150 400V300M650 400V300"
      stroke="#f97316"
      strokeWidth="2"
      strokeDasharray="5 5"
    />
    <motion.path
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{ duration: 0.5, delay: 2.4 }}
      d="M100 450H700"
      stroke="#f97316"
      strokeWidth="2"
      strokeDasharray="5 5"
    />
  </svg>
)

const MonitoringSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="monitorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
      <filter id="monitorShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
      </filter>
      <linearGradient id="chartGradient1" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="chartGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
      </linearGradient>
    </defs>

    {/* Monitor frame */}
    <motion.rect
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      x="150"
      y="150"
      width="500"
      height="300"
      rx="16"
      fill="url(#monitorGradient)"
      stroke="#f97316"
      strokeWidth="4"
      filter="url(#monitorShadow)"
    />

    {/* Monitor header */}
    <motion.rect
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      x="150"
      y="150"
      width="500"
      height="40"
      rx="16"
      fill="#f97316"
    />
    <motion.circle
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      cx="180"
      cy="170"
      r="8"
      fill="#FECACA"
    />
    <motion.circle
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      cx="210"
      cy="170"
      r="8"
      fill="#FEF3C7"
    />
    <motion.circle
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      cx="240"
      cy="170"
      r="8"
      fill="#D1FAE5"
    />

    {/* Chart lines */}
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
      d="M200 350L300 250L400 300L500 200L600 280"
      stroke="#f97316"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut", delay: 1.5 }}
      d="M200 300L300 350L400 280L500 330L600 250"
      stroke="#10B981"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />

    {/* Chart area fills */}
    <motion.path
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
      d="M200 350L300 250L400 300L500 200L600 280L600 400L200 400Z"
      fill="url(#chartGradient1)"
    />
    <motion.path
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2.2 }}
      d="M200 300L300 350L400 280L500 330L600 250L600 400L200 400Z"
      fill="url(#chartGradient2)"
      opacity="0.5"
    />

    {/* Data points */}
    <motion.circle
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 2.5 }}
      cx="300"
      cy="250"
      r="8"
      fill="#f97316"
      stroke="white"
      strokeWidth="2"
    />
    <motion.circle
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 2.6 }}
      cx="400"
      cy="300"
      r="8"
      fill="#f97316"
      stroke="white"
      strokeWidth="2"
    />
    <motion.circle
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 2.7 }}
      cx="500"
      cy="200"
      r="8"
      fill="#f97316"
      stroke="white"
      strokeWidth="2"
    />
    <motion.circle
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 2.8 }}
      cx="300"
      cy="350"
      r="8"
      fill="#10B981"
      stroke="white"
      strokeWidth="2"
    />
    <motion.circle
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 2.9 }}
      cx="400"
      cy="280"
      r="8"
      fill="#10B981"
      stroke="white"
      strokeWidth="2"
    />
    <motion.circle
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 3 }}
      cx="500"
      cy="330"
      r="8"
      fill="#10B981"
      stroke="white"
      strokeWidth="2"
    />

    {/* Grid lines */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 1, delay: 0.8 }}>
      <path
        d="M200 200H600M200 250H600M200 300H600M200 350H600"
        stroke="#64748B"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <path
        d="M250 200V400M300 200V400M350 200V400M400 200V400M450 200V400M500 200V400M550 200V400"
        stroke="#64748B"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
    </motion.g>
  </svg>
)

const AutomationSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gearGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id="gearGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id="gearGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
      </linearGradient>
      <filter id="gearShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
      </filter>
    </defs>

    {/* Background circle */}
    <motion.circle
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      cx="400"
      cy="300"
      r="180"
      fill="#FEF3C7"
      opacity="0.3"
      filter="url(#gearShadow)"
    />

    {/* Connection lines */}
    <motion.path
      initial={{ pathLength: 0, opacity: 0.5 }}
      animate={{ pathLength: 1, opacity: 0.5 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      d="M320 280L400 300M400 300L480 280"
      stroke="#64748B"
      strokeWidth="2"
      strokeDasharray="5 5"
    />

    {/* Main gear */}
    <motion.g
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
      style={{ originX: "400px", originY: "300px" }}
    >
      <motion.path
        d="M400 240L415 250L430 245L440 260L455 260L460 275L475 280L475 295L490 305L485 320L495 335L485 345L490 360L475 370L475 385L460 390L455 405L440 405L430 420L415 415L400 425L385 415L370 420L360 405L345 405L340 390L325 385L325 370L310 360L315 345L305 335L315 320L310 305L325 295L325 280L340 275L345 260L360 260L370 245L385 250L400 240Z"
        fill="url(#gearGradient1)"
        stroke="#f97316"
        strokeWidth="2"
        filter="url(#gearShadow)"
      />
      <circle cx="400" cy="300" r="40" fill="white" stroke="#f97316" strokeWidth="3" />
      <path d="M385 300L395 310L415 290" stroke="#f97316" strokeWidth="6" strokeLinecap="round" fill="none" />
    </motion.g>

    {/* Left gear */}
    <motion.g
      initial={{ rotate: 0 }}
      animate={{ rotate: -360 }}
      transition={{ duration: 15, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
      style={{ originX: "320px", originY: "280px" }}
    >
      <motion.path
        d="M320 240L330 245L340 242L345 252L355 252L358 262L368 265L368 275L378 280L375 290L380 300L375 305L378 315L368 320L368 330L358 333L355 343L345 343L340 353L330 350L320 355L310 350L300 353L295 343L285 343L282 333L272 330L272 320L262 315L265 305L260 300L265 290L262 280L272 275L272 265L282 262L285 252L295 252L300 242L310 245L320 240Z"
        fill="url(#gearGradient2)"
        stroke="#10B981"
        strokeWidth="2"
        filter="url(#gearShadow)"
      />
      <circle cx="320" cy="280" r="25" fill="white" stroke="#10B981" strokeWidth="2" />
    </motion.g>

    {/* Right gear */}
    <motion.g
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 15, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
      style={{ originX: "480px", originY: "280px" }}
    >
      <motion.path
        d="M480 240L490 245L500 242L505 252L515 252L518 262L528 265L528 275L538 280L535 290L540 300L535 305L538 315L528 320L528 330L518 333L515 343L505 343L500 353L490 350L480 355L470 350L460 353L455 343L445 343L442 333L432 330L432 320L422 315L425 305L420 300L425 290L422 280L432 275L432 265L442 262L445 252L455 252L460 242L470 245L480 240Z"
        fill="url(#gearGradient3)"
        stroke="#3B82F6"
        strokeWidth="2"
        filter="url(#gearShadow)"
      />
      <circle cx="480" cy="280" r="25" fill="white" stroke="#3B82F6" strokeWidth="2" />
    </motion.g>

    {/* Animated dots */}
    <motion.circle
      initial={{ cx: 400, cy: 300, opacity: 0 }}
      animate={{
        cx: [400, 320, 320, 400, 480, 480, 400],
        cy: [300, 300, 280, 280, 280, 300, 300],
        opacity: [0, 1, 1, 1, 1, 1, 0],
      }}
      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
      r="5"
      fill="#f97316"
    />
    <motion.circle
      initial={{ cx: 400, cy: 300, opacity: 0 }}
      animate={{
        cx: [400, 480, 480, 400, 320, 320, 400],
        cy: [300, 300, 280, 280, 280, 300, 300],
        opacity: [0, 1, 1, 1, 1, 1, 0],
      }}
      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 4 }}
      r="5"
      fill="#10B981"
    />
  </svg>
)

const SecuritySvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0.3" />
      </linearGradient>
      <filter id="shieldShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.15" />
      </filter>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Shield background glow */}
    <motion.path
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 0.3, scale: 1 }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      d="M400 150L550 200V350C550 400 400 450 400 450C400 450 250 400 250 350V200L400 150Z"
      fill="#f97316"
      filter="url(#glow)"
    />

    {/* Shield */}
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      d="M400 150L550 200V350C550 400 400 450 400 450C400 450 250 400 250 350V200L400 150Z"
      stroke="#f97316"
      strokeWidth="4"
      fill="url(#shieldGradient)"
      filter="url(#shieldShadow)"
    />

    {/* Inner circle */}
    <motion.circle
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      cx="400"
      cy="300"
      r="70"
      fill="white"
      stroke="#f97316"
      strokeWidth="3"
      filter="url(#shieldShadow)"
    />

    {/* Checkmark */}
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
      d="M375 300L390 315L425 280"
      stroke="#10B981"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />

    {/* Scanning effect */}
    <motion.rect
      initial={{ y: 150, opacity: 0 }}
      animate={{ y: 450, opacity: [0, 0.5, 0] }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
      x="250"
      width="300"
      height="4"
      fill="#3B82F6"
    />

    {/* Animated dots around shield */}
    {[...Array(8)].map((_, i) => {
      const angle = (i * Math.PI) / 4
      const x = 400 + 200 * Math.cos(angle)
      const y = 300 + 200 * Math.sin(angle)
      return (
        <motion.circle
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.25 }}
          cx={x}
          cy={y}
          r="5"
          fill="#f97316"
        />
      )
    })}
  </svg>
)

const AnalyticsSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="barGradient1" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="barGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
      </linearGradient>
      <filter id="dashboardShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
      </filter>
    </defs>

    {/* Dashboard background */}
    <motion.rect
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      x="200"
      y="150"
      width="400"
      height="300"
      rx="16"
      fill="#F8FAFC"
      stroke="#E2E8F0"
      strokeWidth="2"
      filter="url(#dashboardShadow)"
    />

    {/* Dashboard header */}
    <motion.rect
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      x="200"
      y="150"
      width="400"
      height="40"
      rx="16"
      fill="#f97316"
    />
    <motion.text
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      x="220"
      y="175"
      fill="white"
      fontFamily="Arial"
      fontSize="14"
      fontWeight="bold"
    >
      Warehouse Analytics Dashboard
    </motion.text>

    {/* Chart grid */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 1, delay: 0.8 }}>
      <path
        d="M220 220H580M220 270H580M220 320H580M220 370H580"
        stroke="#64748B"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <path
        d="M250 200V400M300 200V400M350 200V400M400 200V400M450 200V400M500 200V400M550 200V400"
        stroke="#64748B"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
    </motion.g>

    {/* Chart bars */}
    <motion.rect
      initial={{ height: 0 }}
      animate={{ height: 100 }}
      transition={{ duration: 1, delay: 1, type: "spring" }}
      x="250"
      y="300"
      width="40"
      height="100"
      rx="4"
      fill="url(#barGradient1)"
    />
    <motion.rect
      initial={{ height: 0 }}
      animate={{ height: 150 }}
      transition={{ duration: 1, delay: 1.2, type: "spring" }}
      x="325"
      y="250"
      width="40"
      height="150"
      rx="4"
      fill="url(#barGradient2)"
    />
    <motion.rect
      initial={{ height: 0 }}
      animate={{ height: 80 }}
      transition={{ duration: 1, delay: 1.4, type: "spring" }}
      x="400"
      y="320"
      width="40"
      height="80"
      rx="4"
      fill="url(#barGradient1)"
    />
    <motion.rect
      initial={{ height: 0 }}
      animate={{ height: 180 }}
      transition={{ duration: 1, delay: 1.6, type: "spring" }}
      x="475"
      y="220"
      width="40"
      height="180"
      rx="4"
      fill="url(#barGradient2)"
    />

    {/* Data labels */}
    <motion.text
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 2 }}
      x="270"
      y="410"
      fill="#64748B"
      fontFamily="Arial"
      fontSize="12"
      textAnchor="middle"
    >
      Q1
    </motion.text>
    <motion.text
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 2.1 }}
      x="345"
      y="410"
      fill="#64748B"
      fontFamily="Arial"
      fontSize="12"
      textAnchor="middle"
    >
      Q2
    </motion.text>
    <motion.text
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 2.2 }}
      x="420"
      y="410"
      fill="#64748B"
      fontFamily="Arial"
      fontSize="12"
      textAnchor="middle"
    >
      Q3
    </motion.text>
    <motion.text
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 2.3 }}
      x="495"
      y="410"
      fill="#64748B"
      fontFamily="Arial"
      fontSize="12"
      textAnchor="middle"
    >
      Q4
    </motion.text>

    {/* Animated data point */}
    <motion.circle
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, -10, 10, 0],
      }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 2.5 }}
      cx="495"
      cy="220"
      r="8"
      fill="#f97316"
      stroke="white"
      strokeWidth="2"
    />
  </svg>
)

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("monitoring")
  const { setTheme, theme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ${scrolled ? "shadow-md" : ""}`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-md bg-primary p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <rect width="18" height="10" x="3" y="11" rx="2" />
                <circle cx="12" cy="5" r="2" />
                <path d="M12 7v4" />
                <line x1="8" y1="16" x2="8" y2="16" />
                <line x1="16" y1="16" x2="16" y2="16" />
              </svg>
            </div>
            <span className="font-bold text-xl">WarehouseIQ</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Testimonials
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Solutions
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary md:block hidden">
              Sign In
            </Link>
            <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t"
            >
              <div className="container py-4 flex flex-col gap-4">
                <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
                  How It Works
                </Link>
                <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
                  Testimonials
                </Link>
                <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
                  Solutions
                </Link>
                <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
                  Blog
                </Link>
                <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
                  Sign In
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 20 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button className="bg-primary hover:bg-primary/90 shadow-lg rounded-full px-6">
          Start Free Trial <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="flex flex-col justify-center space-y-4"
              >
                <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  Intelligent Warehouse Management
                </Badge>
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Smart Warehouse Monitoring for the Modern Supply Chain
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Real-time monitoring, analytics, and automation for your warehouse operations. Increase efficiency,
                    reduce costs, and optimize your supply chain.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-md">
                    Start Free Trial <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    View Demo
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex -space-x-2">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted">
                      <span className="text-xs font-medium">JD</span>
                    </div>
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted">
                      <span className="text-xs font-medium">ST</span>
                    </div>
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted">
                      <span className="text-xs font-medium">RK</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="ml-2 text-muted-foreground">5.0 (2k+ reviews)</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mx-auto w-full max-w-[500px] lg:max-w-none relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-3xl transform rotate-3 scale-105"></div>
                <div className="relative">
                  <WarehouseSvg />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Key Features</Badge>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Complete Warehouse Intelligence</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Our platform provides all the tools you need to monitor, analyze, and optimize your warehouse
                  operations.
                </p>
              </div>
            </motion.div>

            <Tabs defaultValue="monitoring" className="mt-12" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-center">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl">
                  <TabsTrigger value="monitoring" onClick={() => setActiveTab("monitoring")}>
                    Monitoring
                  </TabsTrigger>
                  <TabsTrigger value="automation" onClick={() => setActiveTab("automation")}>
                    Automation
                  </TabsTrigger>
                  <TabsTrigger value="security" onClick={() => setActiveTab("security")}>
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="analytics" onClick={() => setActiveTab("analytics")}>
                    Analytics
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="monitoring" className="mt-8 tab-content-animate">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="h-[400px] w-full order-2 md:order-1">
                    <MonitoringSvg />
                  </div>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={slideIn}
                    className="space-y-4 order-1 md:order-2"
                  >
                    <h3 className="text-2xl font-bold">Real-time Monitoring</h3>
                    <p className="text-muted-foreground">
                      Track inventory levels, equipment status, and environmental conditions in real-time with our
                      advanced sensor network. Get instant alerts when metrics fall outside of acceptable ranges.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span>Temperature and humidity monitoring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span>Equipment status and maintenance alerts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span>Real-time inventory tracking</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="mt-4">
                      Learn More
                    </Button>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="automation" className="mt-8 tab-content-animate">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <motion.div initial="hidden" animate="visible" variants={slideIn} className="space-y-4">
                    <h3 className="text-2xl font-bold">Smart Automation</h3>
                    <p className="text-muted-foreground">
                      Automate routine tasks, optimize picking routes, and streamline operations with AI-powered
                      workflows. Reduce manual errors and increase throughput.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span>Automated inventory replenishment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span>Optimized picking and packing routes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span>Workflow automation and scheduling</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="mt-4">
                      Learn More
                    </Button>
                  </motion.div>
                  <div className="h-[400px] w-full">
                    <AutomationSvg />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="mt-8 tab-content-animate">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="h-[400px] w-full order-2 md:order-1">
                    <SecuritySvg />
                  </div>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={slideIn}
                    className="space-y-4 order-1 md:order-2"
                  >
                    <h3 className="text-2xl font-bold">Advanced Security</h3>
                    <p className="text-muted-foreground">
                      Protect your assets with comprehensive security monitoring, access control, and incident
                      detection. Ensure compliance with industry regulations.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span>Access control and authentication</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span>Video surveillance and motion detection</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span>Incident reporting and response</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="mt-4">
                      Learn More
                    </Button>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-8 tab-content-animate">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <motion.div initial="hidden" animate="visible" variants={slideIn} className="space-y-4">
                    <h3 className="text-2xl font-bold">Powerful Analytics</h3>
                    <p className="text-muted-foreground">
                      Gain actionable insights with customizable dashboards, predictive analytics, and comprehensive
                      reporting. Make data-driven decisions to optimize your operations.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span>Customizable dashboards and reports</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span>Predictive inventory management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span>Performance metrics and KPI tracking</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="mt-4">
                      Learn More
                    </Button>
                  </motion.div>
                  <div className="h-[400px] w-full">
                    <AnalyticsSvg />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform-gpu"></div>
          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">How It Works</Badge>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Simple Implementation, Powerful Results
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Get up and running quickly with our easy-to-implement warehouse monitoring solution.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mt-12 grid gap-8 md:grid-cols-3"
            >
              <motion.div
                variants={fadeIn}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-background shadow-md"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Install Sensors</h3>
                <p className="text-muted-foreground">
                  Our plug-and-play sensors can be installed in your warehouse in minutes, with no complex wiring or
                  configuration required.
                </p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-background shadow-md"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">Connect Platform</h3>
                <p className="text-muted-foreground">
                  Connect to our cloud platform and customize your dashboard to monitor the metrics that matter most to
                  your business.
                </p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-background shadow-md"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Optimize Operations</h3>
                <p className="text-muted-foreground">
                  Use real-time data and actionable insights to optimize your warehouse operations and improve
                  efficiency.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Testimonials</Badge>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by industry leaders</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Don't just take our word for it. Here's what our customers have to say about WarehouseIQ.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3"
            >
              <motion.div variants={fadeIn} whileHover={{ y: -5 }} transition={{ type: "spring" }}>
                <Card className="h-full border-primary/10 hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-1">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          SL
                        </div>
                      </div>
                      <div>
                        <CardTitle>Sarah Logistics</CardTitle>
                        <CardDescription>Operations Director, Global Shipping Co.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex mb-2">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <Star className="h-5 w-5 fill-primary text-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      "WarehouseIQ has completely transformed our warehouse operations. We've reduced picking errors by
                      45% and improved inventory accuracy to 99.8%. The real-time monitoring is a game-changer."
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeIn} whileHover={{ y: -5 }} transition={{ type: "spring" }}>
                <Card className="h-full border-primary/10 hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-1">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          MC
                        </div>
                      </div>
                      <div>
                        <CardTitle>Michael Chen</CardTitle>
                        <CardDescription>CTO, E-commerce Solutions Inc.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex mb-2">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <Star className="h-5 w-5 fill-primary text-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      "The security features in WarehouseIQ are unmatched. As a fast-growing e-commerce company, we
                      needed a solution that could scale with us while keeping our inventory secure. WarehouseIQ
                      delivered."
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeIn} whileHover={{ y: -5 }} transition={{ type: "spring" }}>
                <Card className="h-full border-primary/10 hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-1">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          ER
                        </div>
                      </div>
                      <div>
                        <CardTitle>Emily Rodriguez</CardTitle>
                        <CardDescription>Supply Chain Manager, Retail Giant</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex mb-2">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <Star className="h-5 w-5 fill-primary text-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      "The analytics capabilities have given us insights we never had before. We've optimized our
                      inventory levels, reduced carrying costs by 22%, and improved order fulfillment times
                      dramatically."
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,transparent,#000)]"></div>
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-2"
            >
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors mb-2">
                Get Started Today
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to transform your warehouse operations?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join industry leaders who have optimized their supply chain with WarehouseIQ's intelligent monitoring
                solutions.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-md">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Schedule Demo
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-12 md:py-16 lg:py-20">
        <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-md bg-primary p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-white"
                >
                  <rect width="18" height="10" x="3" y="11" rx="2" />
                  <circle cx="12" cy="5" r="2" />
                  <path d="M12 7v4" />
                  <line x1="8" y1="16" x2="8" y2="16" />
                  <line x1="16" y1="16" x2="16" y2="16" />
                </svg>
              </div>
              <span className="font-bold text-xl">WarehouseIQ</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Intelligent warehouse monitoring and optimization solutions for the modern supply chain.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Licenses
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container flex flex-col gap-4 sm:flex-row py-6 items-center px-4 md:px-6 border-t mt-10">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} WarehouseIQ, Inc. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Cookies
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
