'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col">
      <div className="container mx-auto px-8 flex-1 flex flex-col">
        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-7xl font-bold tracking-tighter text-white">
              <span className="block transform -skew-x-12">ANDES</span>
              <span className="block transform -skew-x-12">ORIENTED</span>
              <span className="block transform -skew-x-12">CORE</span>
            </h1>
            <div className="space-y-1">
              <p className="text-white text-base font-medium"> STANDARDIZING THE ART
OF STRUCTURAL GEOLOGY
  </p>
            </div>
          </div>
        </div>

        {/* Buttons - Desktop */}
        <div className="hidden md:flex justify-end pb-12">
          <div className="flex space-x-4">
            <Link 
              href="https://wiki.andesoricore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="button-flare text-xs text-blue-400 border border-blue-400/20 px-4 py-6 rounded-[15%] hover:bg-blue-400/10 transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0.2)] hover:shadow-[0_0_25px_rgba(0,102,255,0.3)]"
            >
              <span className="relative z-10">SEE HOW IT WORKS</span>
            </Link>
            <Link 
              href="https://calendly.com/luis-farfan-andesoricore/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="button-flare text-xs text-blue-400 border border-blue-400/20 px-4 py-6 rounded-[15%] hover:bg-blue-400/10 transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0.2)] hover:shadow-[0_0_25px_rgba(0,102,255,0.3)]"
            >
              <span className="relative z-10">REQUEST EARLY ACCESS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Buttons */}
      {isMobile && (
        <div className="px-8 pb-12">
          <div className="flex flex-col space-y-4">
            <Link 
              href="https://wiki.andesoricore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="button-flare text-xs text-blue-400 border border-blue-400/20 px-4 py-6 rounded-[15%] hover:bg-blue-400/10 transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0.2)] hover:shadow-[0_0_25px_rgba(0,102,255,0.3)]"
            >
              <span className="relative z-10">SEE HOW IT WORKS</span>
            </Link>
            <Link 
              href="https://calendly.com/luis-farfan-andesoricore/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="button-flare text-xs text-blue-400 border border-blue-400/20 px-4 py-6 rounded-[15%] hover:bg-blue-400/10 transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0.2)] hover:shadow-[0_0_25px_rgba(0,102,255,0.3)]"
            >
              <span className="relative z-10">REQUEST EARLY ACCESS</span>
            </Link>
          </div>
        </div>
      )}
    </section>
  )
} 