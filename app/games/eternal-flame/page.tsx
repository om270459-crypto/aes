'use client'

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Flame, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EternalFlameGame() {
  const [flameLevel, setFlameLevel] = useState(50)
  const [isActive, setIsActive] = useState(false)
  const [devotionPoints, setDevotionPoints] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive) {
      interval = setInterval(() => {
        setFlameLevel(prev => Math.max(0, prev - 2))
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isActive])

  useEffect(() => {
    if (flameLevel >= 100) {
      setDevotionPoints(prev => prev + 10)
      setFlameLevel(80)
    }
    if (flameLevel <= 0) {
      setIsActive(false)
      setFlameLevel(50)
    }
  }, [flameLevel])

  const addFuel = () => {
    if (!isActive) setIsActive(true)
    setFlameLevel(prev => Math.min(100, prev + 15))
    setDevotionPoints(prev => prev + 1)
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-transparent relative z-10">
      <div className="max-w-4xl mx-auto">
        <Link href="/games" className="inline-flex items-center gap-2 text-[#8bd5c4] hover:text-[#f2f8fc] transition-colors mb-8 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-widest">Back to Games</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#584a97] to-[#b45e67] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  filter: [`drop-shadow(0 0 ${flameLevel/5}px rgba(180,94,103,0.8))`, `drop-shadow(0 0 ${flameLevel/3}px rgba(180,94,103,0.8))`, `drop-shadow(0 0 ${flameLevel/5}px rgba(180,94,103,0.8))`]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <Flame className="w-24 h-24 text-[#b45e67]" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight">
                Eternal Flame
              </h1>
              <p className="text-white/60 max-w-md">
                Keep our eternal flame burning with your devotion.
              </p>
            </div>

            <div className="w-full max-w-sm">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#8bd5c4]">Flame Intensity</span>
                <span className="text-white font-bold">{flameLevel}%</span>
              </div>
              <div className="h-6 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#584a97] to-[#b45e67]"
                  animate={{ width: `${flameLevel}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              </div>
            </div>

            <div className="text-[#8bd5c4] text-xl">
              Devotion Points: <span className="text-white font-bold">{devotionPoints}</span>
            </div>

            <Button 
              onClick={addFuel}
              size="lg"
              className="bg-gradient-to-r from-[#584a97] to-[#b45e67] hover:opacity-90 text-white px-12 py-6 text-lg rounded-full shadow-[0_0_30px_rgba(180,94,103,0.3)]"
            >
              <Flame className="w-5 h-5 mr-2" />
              Add Devotion
            </Button>

            <p className="text-xs text-white/40">
              {isActive ? "Keep clicking to maintain the flame!" : "Click to ignite the eternal flame"}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
