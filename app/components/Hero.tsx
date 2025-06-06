'use client'

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

const valueProps = [
  "FROM DRILL CORE TO DIGITAL INSIGHT — IN MINUTES",
  "ONE OPERATOR, ONE PLATFORM, COMPLETE CONTROL",
  "PRECISION • TRACEABILITY • VALIDATION",
  "REAL-TIME STRUCTURAL ANALYSIS — ANYWHERE, ANYTIME",
  "DIGITAL TWIN TECHNOLOGY FOR CORE ANALYSIS",
  "ACCELERATE YOUR GEOLOGICAL WORKFLOW",
  "SEAMLESS INTEGRATION WITH EXISTING SYSTEMS"
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % valueProps.length)
    }, 4000) // Change text every 4 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="relative z-10 px-8 pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="text-xs tracking-wider text-gray-400">
              STRUCTURAL <span className="text-blue-400">GEOLOGY</span>
            </div>
            <h1 className="text-7xl font-bold tracking-tighter text-white">
              <span className="block transform -skew-x-12">ANDES</span>
              <span className="block mt-2 transform -skew-x-12">ORIENTED</span>
              <span className="block mt-2 transform -skew-x-12">CORE</span>
            </h1>
            <div className="space-y-1">
              <p className="text-blue-400 text-sm">" REINVENTED "</p>
              <div className="text-gray-400 text-xs tracking-wider h-6 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                    className="absolute w-full"
                  >
                    {valueProps[currentIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                href="/demo"
                className="inline-block bg-transparent border border-blue-400/20 text-blue-400 
                         px-8 py-4 text-sm tracking-wider rounded-[15%] hover:bg-blue-400/10 
                         transition-all duration-300"
              >
                SEE HOW IT WORKS
              </Link>
              <Link
                href="/access"
                className="button-flare inline-block bg-blue-400/10 text-blue-400 
                         px-8 py-4 text-sm tracking-wider rounded-[15%] hover:bg-blue-400/20 
                         transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0.2)]
                         hover:shadow-[0_0_25px_rgba(0,102,255,0.3)]"
              >
                <span className="relative z-10">REQUEST EARLY ACCESS</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
} 