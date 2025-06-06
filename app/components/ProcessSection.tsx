'use client'

import { motion, AnimatePresence } from "framer-motion"
import { Linkedin, Mail, Calendar } from "lucide-react"
import { useState, useRef } from "react"
import { useInView } from "framer-motion"

export default function ProcessSection() {
  const [showFounder, setShowFounder] = useState(false)
  const secondSectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(secondSectionRef, {
    amount: 0.3,
    once: false
  })

  return (
    <section ref={secondSectionRef} className="relative min-h-screen bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.05),transparent_70%)]" />
      </div>
      
      <div className="relative z-10 px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl ml-auto">
            <AnimatePresence mode="wait">
              {!showFounder ? (
                <motion.div
                  key="main-content"
                  initial={{ opacity: 1 }}
                  exit={{ 
                    opacity: 0,
                    x: -50,
                    transition: { duration: 0.5, ease: "easeInOut" }
                  }}
                  className="space-y-8"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-8">
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl font-bold tracking-tighter text-white text-right"
                      >
                        <span className="block transform -skew-x-12">STANDARDIZING</span>
                        <span className="block mt-2 transform -skew-x-12">STRUCTURAL ANALYSIS</span>
                      </motion.h2>
                      
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
                          The first standardized platform for precise structural geology analysis. Eliminate human error and ensure data consistency with our proven digital workflow—from core orientation to final structural interpretation.
                        </motion.p>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      <button
                        onClick={() => setShowFounder(true)}
                        className="button-flare inline-block bg-blue-400/10 text-blue-400 px-6 py-3 text-sm tracking-wider rounded-[15%] hover:bg-blue-400/20 transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0.2)] hover:shadow-[0_0_25px_rgba(0,102,255,0.3)]"
                      >
                        <span className="relative z-10">MEET THE FOUNDERS</span>
                      </button>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12"
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
                        Andes Oriented Core digitizes and standardizes the entire structural analysis process, from core orientation to final interpretation, ensuring consistent, reliable data for better drilling decisions.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="pt-12"
                  >
                    <div className="flex items-center justify-end space-x-3 mb-6">
                      <span className="text-blue-400 text-xs tracking-wider">CURRENTLY IN DEVELOPMENT</span>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    <h3 className="text-blue-400 text-sm tracking-wider mb-4 text-right">THE PROCESS</h3>
                    <div className="space-y-4">
                      {[
                        "Digital core orientation using our proprietary measurement system",
                        "Automated structural feature detection and measurement",
                        "Standardized data collection with built-in validation",
                        "Real-time structural interpretation and 3D modeling",
                        "Complete data traceability reducing measurement errors and optimizing drilling operations",
                        "Seamless integration with industry-leading geological and mining software"
                      ].map((text, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.8, delay: 1.4 + (index * 0.2) }}
                          className="flex items-start justify-end space-x-4"
                        >
                          <motion.p 
                            className="text-gray-400 text-sm leading-relaxed text-right relative"
                            animate={isInView && index < 2 ? 
                              { color: "rgb(34 197 94 / 0.7)" } : 
                              { color: "rgb(156 163 175)" }
                            }
                            transition={{ duration: 0.8 }}
                          >
                            {text}
                          </motion.p>
                          <div className="flex items-center">
                            <div className="relative w-8 text-right">
                              <motion.span 
                                className="text-sm inline-block"
                                animate={isInView && index < 2 ? 
                                  { color: "rgb(34 197 94 / 0.7)" } : 
                                  { color: "rgb(59 130 246)" }
                                }
                                transition={{ duration: 0.8 }}
                              >
                                {(index + 1).toString().padStart(2, '0')}
                              </motion.span>
                              {index < 2 && (
                                <motion.svg
                                  className="absolute inset-0 w-full h-full"
                                  initial={{ pathLength: 0 }}
                                  animate={isInView ? 
                                    { pathLength: 1 } : 
                                    { pathLength: 0 }
                                  }
                                  transition={{ 
                                    duration: 0.5,
                                    ease: "easeInOut"
                                  }}
                                >
                                  <motion.line
                                    x1="0"
                                    y1="50%"
                                    x2="100%"
                                    y2="50%"
                                    stroke="rgb(34 197 94 / 0.7)"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                  />
                                </motion.svg>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="founder"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="space-y-8"
                >
                  <div className="flex justify-between items-start gap-12">
                    {/* Founder Image */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="w-1/3"
                    >
                      <div className="aspect-square rounded-[15%] overflow-hidden bg-blue-400/10 border border-blue-400/20">
                        <img 
                          src="/founder.jpg" 
                          alt="Founder" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>

                    {/* Founder Bio */}
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="w-2/3 space-y-8"
                    >
                      <div>
                        <h2 className="text-4xl font-bold tracking-tighter text-white mb-4">
                          <span className="block transform -skew-x-12">JOAQUIN</span>
                          <span className="block mt-2 transform -skew-x-12">NAM</span>
                        </h2>
                        <p className="text-blue-400 text-sm tracking-wider">FOUNDER & CEO</p>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed">
                        With over a decade of experience in structural geology and mining technology, 
                        Joaquin founded Andes Oriented Core to revolutionize how mining companies 
                        analyze and interpret drill core data. His vision combines cutting-edge 
                        technology with deep geological expertise to create a new standard in 
                        structural analysis.
                      </p>

                      {/* Social Links */}
                      <div className="flex gap-4">
                        <motion.a
                          href="https://linkedin.com/in/joaquinnam"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-400/80 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Linkedin className="w-6 h-6" />
                        </motion.a>
                        <motion.a
                          href="mailto:joaquin@andesorientedcore.com"
                          className="text-blue-400 hover:text-blue-400/80 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Mail className="w-6 h-6" />
                        </motion.a>
                        <motion.a
                          href="https://calendly.com/joaquinnam"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-400/80 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Calendar className="w-6 h-6" />
                        </motion.a>
                      </div>

                      {/* Back Button */}
                      <motion.button
                        onClick={() => setShowFounder(false)}
                        className="button-flare inline-block bg-blue-400/10 text-blue-400 px-6 py-3 text-sm tracking-wider rounded-[15%] hover:bg-blue-400/20 transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0.2)] hover:shadow-[0_0_25px_rgba(0,102,255,0.3)]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">BACK TO HOME</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
} 