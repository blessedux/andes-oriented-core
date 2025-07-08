'use client'

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const valueProps = [
  "REDUCING HUMAN ERROR IN STRUCTURAL ANALYSIS",
  "INCREASING TRACEABILITY OF SENSITIVE DATA",
  "IMPROVING DRILLING SITE EFFICIENCY",
  "PROVIDING BETTER INSIGHTS THROUGH 3D VISUALIZATION",
  "STANDARDIZING EXPERT GEOLOGICAL FORMULAS"
]

export default function ProductSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % valueProps.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left side - iPhone Mockup Placeholder */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[9/19] w-full max-w-[300px] mx-auto bg-gradient-to-b from-blue-400/10 to-transparent rounded-[3rem] border border-blue-400/20 shadow-[0_0_30px_rgba(0,102,255,0.2)] overflow-hidden">
              {/* Screen content placeholder */}
              <div className="absolute inset-4 bg-black/50 rounded-[2rem] backdrop-blur-sm">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-blue-400/20 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4/5 h-4/5 bg-gradient-to-br from-blue-400/10 to-transparent rounded-2xl border border-blue-400/20" />
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-4xl font-bold text-white">
              A New Era of <br />
              <span className="text-blue-400">Structural Geology</span>
            </h2>

            <div className="word-swipe-container h-12">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-white text-sm"
                >
                  {valueProps[currentIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <p className="text-white text-sm leading-relaxed">
              Our platform combines cutting-edge technology with geological expertise to provide a comprehensive solution for structural data analysis. By standardizing the process and leveraging advanced visualization tools, we're helping geologists make more informed decisions with greater confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 