'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const TARGET_DATE = new Date("2025-10-14T01:38:00")

export default function Countdown() {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = now.getTime() - TARGET_DATE.getTime()

      setTimeElapsed({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl md:text-3xl text-[#8bd5c4] mb-12 uppercase tracking-[0.5em] text-center"
      >
        Time in the Sanctuary
      </motion.h2>
      
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        {[
          { label: "Days", value: timeElapsed.days },
          { label: "Hours", value: timeElapsed.hours },
          { label: "Minutes", value: timeElapsed.minutes },
          { label: "Seconds", value: timeElapsed.seconds },
        ].map((unit, i) => (
          <motion.div 
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="text-6xl md:text-8xl font-bold text-[#f2f8fc] tabular-nums bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl mb-4 min-w-[140px] text-center shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              {String(unit.value).padStart(2, '0')}
            </div>
            <span className="text-lg text-[#8bd5c4] uppercase tracking-widest font-medium">{unit.label}</span>
          </motion.div>
        ))}
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-white/40 italic text-center max-w-md"
      >
        "Since the moment our paths converged in the digital void."
      </motion.p>
    </div>
  )
}
