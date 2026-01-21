'use client'

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import Link from "next/link"
import { Heart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TruthKissGame() {
  const wheelRef = useRef<HTMLDivElement>(null)
  const [result, setResult] = useState<string | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  
  const outcomes = [
    "Truth: What was our first date like?",
    "Kiss: A virtual embrace!",
    "Truth: When did you first know?",
    "Kiss: Infinite love!",
    "Truth: What's your favorite memory of us?",
    "Kiss: Sealed with devotion!",
    "Truth: What do you love most about us?",
    "Kiss: Forever yours!"
  ]

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setResult(null)
    const newRotation = rotation + Math.random() * 360 + 1440
    setRotation(newRotation)
    
    setTimeout(() => {
      setSpinning(false)
      setResult(outcomes[Math.floor(Math.random() * outcomes.length)])
    }, 3000)
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4e0b37] to-[#c10157] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <Heart className="w-16 h-16 text-[#c10157] drop-shadow-[0_0_20px_rgba(193,1,87,0.5)]" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight">
                Truth Kiss
              </h1>
              <p className="text-white/60 max-w-md">
                Spin the digital wheel of destiny. Let fate decide whether you share a truth or receive a kiss.
              </p>
            </div>

            <div className="py-12 flex flex-col items-center gap-8">
              <div 
                ref={wheelRef}
                style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none' }}
                className="w-48 h-48 rounded-full border-8 border-dashed border-[#c10157] flex items-center justify-center relative shadow-[0_0_40px_rgba(193,1,87,0.4)]"
              >
                <Heart className="w-20 h-20 text-[#c10157]" />
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#f2f8fc] rotate-45" />
                <div className="absolute inset-2 rounded-full border-2 border-white/10" />
              </div>

              {result && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="bg-[#c10157]/20 border border-[#c10157]/30 rounded-2xl p-6 max-w-sm"
                >
                  <p className="text-[#f2f8fc] font-medium text-lg">{result}</p>
                </motion.div>
              )}

              <Button 
                onClick={spin} 
                disabled={spinning} 
                size="lg"
                className="bg-gradient-to-r from-[#4e0b37] to-[#c10157] hover:from-[#5e1347] hover:to-[#d11167] text-white px-12 py-6 text-lg rounded-full shadow-[0_0_30px_rgba(193,1,87,0.3)]"
              >
                {spinning ? "Spinning..." : "Spin the Wheel"}
              </Button>
            </div>

            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8bd5c4] opacity-40">
              Digital Sanctuary Protocol
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
