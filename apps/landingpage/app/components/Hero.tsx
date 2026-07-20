'use client'

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Space_Grotesk } from "next/font/google"
import Link from "next/link"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
})

export default function Hero() {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative min-h-screen flex flex-col">
      <div className="container mx-auto px-8 flex-1 flex flex-col">
        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-12">
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-7xl font-bold tracking-tighter text-white">
                <span className="block transform -skew-x-12">ANDES</span>
                <span className="block transform -skew-x-12">ORIENTED</span>
                <span className="block transform -skew-x-12">CORE</span>
              </h1>
              <div className="space-y-1">
                <p className="text-white text-base font-medium"> STANDARDIZING THE ART
OF CORE LOGGING
  </p>
              </div>

              {/* Scroll chevron — mobile: below subtitle, above CTAs */}
              <div className="md:hidden flex justify-center pt-2">
                <button
                  type="button"
                  onClick={scrollToNext}
                  aria-label="Scroll to more content"
                  className="text-blue-400/80 hover:text-blue-400 transition-colors"
                >
                  <motion.span
                    className="inline-flex"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-7 h-7" strokeWidth={1.5} />
                  </motion.span>
                </button>
              </div>

              {/* Mobile CTAs — directly below chevron */}
              <div className="md:hidden flex flex-col space-y-4 pt-2">
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

            {/* Desktop dashboard mock-up */}
            <div className="hidden md:flex w-full md:w-1/2 items-center justify-end">
              <div className="group relative w-full max-w-xl overflow-hidden rounded-2xl border border-blue-400/20 shadow-[0_0_30px_rgba(0,102,255,0.15)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/desktop_mockup.jpeg"
                  alt="AndesOriCore dashboard preview"
                  className="w-full h-auto rounded-2xl"
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-black/0 transition-[background-color] duration-[2000ms] ease-in-out group-hover:bg-black/55" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-[2000ms] ease-in-out group-hover:opacity-100">
                  <span
                    className={`${spaceGrotesk.className} text-3xl font-bold tracking-tight text-white/80 md:text-4xl`}
                  >
                    geostar app
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: chevron left-aligned with titles, vertically aligned with CTAs */}
        <div className="hidden md:flex items-center justify-between pb-12">
          <button
            type="button"
            onClick={scrollToNext}
            aria-label="Scroll to more content"
            className="text-blue-400/80 hover:text-blue-400 transition-colors"
          >
            <motion.span
              className="inline-flex"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-7 h-7" strokeWidth={1.5} />
            </motion.span>
          </button>

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
    </section>
  )
}
