'use client'

import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="relative z-10 px-8 py-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-1 text-xs text-gray-500">
          <span>0</span>
          <span className="text-blue-400">1</span>
        </div>
        <div className="text-[10px] text-gray-500">
          2025 © ANDESORICORE - DIGITAL STRUCTURAL LOGGING, REINVENTED
        </div>
      </div>
    </footer>
  )
} 