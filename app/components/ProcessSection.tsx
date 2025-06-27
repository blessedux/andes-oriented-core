'use client'

import { motion, useInView } from "framer-motion"
import { useState, useRef } from "react"
import { Scan, Database, LineChart } from "lucide-react"

export default function ProcessSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, {
    amount: 0.3,
    once: true
  })

  const processCards = [
    {
      icon: Scan,
      title: "CAPTURE",
      description: "Upload your core sample image with our proprietary measurement system"
    },
    {
      icon: Database,
      title: "ANALYZE",
      description: "Our AI-powered system processes and standardizes your structural data capture workflow"
    },
    {
      icon: LineChart,
      title: "VISUALIZE",
      description: "Get real-time 3D visualizations and insights for better decision making"
    }
  ]

  return (
    <section className="relative min-h-screen bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.05),transparent_70%)]" />
      </div>
      
      <div className="relative z-10 px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl ml-auto">
            <div className="space-y-8">
              {/* Title - Always Visible */}
              <h2 className="text-4xl font-bold tracking-tighter text-white text-right">
                <span className="block transform -skew-x-12">STANDARDIZING</span>
                <span className="block mt-2 transform -skew-x-12">STRUCTURAL DATA ANALYSIS</span>
              </h2>

              {/* Animated Content */}
              <div ref={contentRef}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-8 mb-16"
                >
                  <div className="flex justify-end items-start">
                    <div className="space-y-8">
                      <div className="space-y-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          className="flex items-center justify-end space-x-3"
                        >
                          <span className="text-blue-400 text-xs tracking-wider">PRIVATE BETA</span>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        </motion.div>

                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                          className="text-gray-400 text-sm leading-relaxed text-right"
                        >
                          The first standardized platform for precise structural geology analysis. Eliminate human error and ensure data consistency with our proven digital workflow—from core orientation QA/AC to final structural interpretation.
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Cards - Full Width Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 w-full"
        >
          {processCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.0 + (index * 0.2) }}
              className="bg-blue-400/5 backdrop-blur-sm border border-blue-400/10 rounded-lg p-6 hover:bg-blue-400/10 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-blue-400/10 flex items-center justify-center group-hover:bg-blue-400/20 transition-all duration-300">
                  <card.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-blue-400 text-sm tracking-wider">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Challenge/Solution Section - Full Width */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 mt-16 w-full"
        >
          <div className="space-y-4">
            <h3 className="text-blue-400 text-sm tracking-wider text-right">THE CHALLENGE</h3>
            <p className="text-gray-400 text-sm leading-relaxed text-right">
              Traditional structural logging relies on manual measurements and subjective interpretations, leading to inconsistent data collection and potential errors that can impact exploration decisions.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-blue-400 text-sm tracking-wider text-right">OUR SOLUTION</h3>
            <p className="text-gray-400 text-sm leading-relaxed text-right">
              Andes Oriented Core digitizes and standardizes the entire structural data capture and analysis process, from core orientation to final interpretation, including the measurement of strucutral angles, ensuring consistent, reliable data for better drilling decisions.
            </p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl ml-auto">
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="pt-12 mt-16"
              >
                <div className="flex items-center justify-end space-x-3 mb-6">
                  <span className="text-blue-400 text-xs tracking-wider">CURRENTLY IN DEVELOPMENT</span>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                </div>

                <h3 className="text-blue-400 text-sm tracking-wider mb-4 text-right">THE PROCESS</h3>
                <div className="space-y-4">
                  {[
                    "Digital QA/QC for core orientation using our proprietary measurement system",
                    "Automated structural feature detection and measurement",
                    "Standardized data collection with built-in validation",
                    "Complete data traceability reducing measurement errors and optimizing drilling operations",
                    "Structural interpretation and 3D modeling",
                    "Seamless integration with industry-leading geological and mining software"
                  ].map((text, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.8, delay: 1.4 + (index * 0.2) }}
                      className="flex items-start justify-end space-x-4"
                    >
                      <p className="text-gray-400 text-sm leading-relaxed text-right relative">
                        {text}
                      </p>
                      <div className="flex items-center">
                        <div className="relative w-8 text-right">
                          <span className="text-sm inline-block text-blue-400">
                            {(index + 1).toString().padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 