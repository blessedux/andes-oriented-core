'use client'

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { Loader } from "@/components/Loader"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const updateCursorPosition = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    })
  }, [])

  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const interactiveElements = document.querySelectorAll('a, button, input, [role="button"]')
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter)
      element.addEventListener("mouseleave", handleMouseLeave)
    })

    window.addEventListener("mousemove", updateCursorPosition)

    // Simulate loading time (remove this in production and use real loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("mousemove", updateCursorPosition)
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter)
        element.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [updateCursorPosition])

  return (
    <>
      {isLoading && <Loader />}
      <div className={`fixed inset-0 z-0 transition-all duration-1000 ${isLoading ? "blur-3xl" : "blur-none"}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.1),transparent_70%)]" />
      </div>
      <div
        className={`cursor-spotlight ${isHovering ? "hovering" : ""}`}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: `translate(-50%, -50%)`,
        }}
      >
        <div className="inner-circle"></div>
      </div>
      <div className={`transition-all duration-1000 ${isLoading ? "opacity-0 blur-xl" : "opacity-100 blur-none"}`}>
        {children}
      </div>
    </>
  )
} 