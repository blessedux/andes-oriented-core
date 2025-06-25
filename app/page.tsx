"use client"

import { motion, useScroll } from "framer-motion"
import { Menu } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import Hero from "./components/Hero"
import ProductSection from "./components/ProductSection"
import ProcessSection from "./components/ProcessSection"
import Footer from "./components/Footer"

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src="https://my.spline.design/futuristicmapinterface-sMLkl6DgSYLOR3NkjU8OmtMz/" 
          frameBorder="0" 
          width="100%" 
          height="100%"
          className="absolute inset-0"
          style={{ 
            border: 'none',
            background: 'transparent' 
          }}
          loading="lazy"
          title="Futuristic Map Interface 3D Animation"
        />
        {/* Mantiene los gradientes para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.08),transparent_70%)]" />
      </div>

      {/* Navigation - Only visible on mobile */}
      {isMobile && (
        <header className="relative z-10 px-8 py-6">
          <nav className="flex justify-between items-center">
            <button className="text-blue-400 hover:text-blue-400/80 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <a href="/" className="text-blue-400 text-sm tracking-widest hover:text-blue-400/80 transition-colors">
              <div className="flex flex-col leading-none">
                <span>ANDES</span>
                <span>ORIENTED</span>
                <span>CORE</span>
              </div>
            </a>
            <a href="/login" className="button-flare text-xs text-blue-400 border border-blue-400/20 px-4 py-2 rounded-[15%] hover:bg-blue-400/10 transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0.2)] hover:shadow-[0_0_25px_rgba(0,102,255,0.3)]">
              <span className="relative z-10">REQUEST ACCESS</span>
            </a>
          </nav>
        </header>
      )}

      {/* Main Content */}
      <Hero />

      {/* Product Section */}
      <ProductSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Footer */}
      <Footer />

      <style jsx global>{`
        .word-swipe-container {
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
