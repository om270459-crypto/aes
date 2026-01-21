'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { Sun, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DawnEmbraceGame() {
  const [sunPosition, setSunPosition] = useState(0)
  const [awakened, setAwakened] = useState(false)
  const [embraceCount, setEmbraceCount] = useState(0)

  const raiseSun = () => {
    if (awakened) {
      setSunPosition(0)
      setAwakened(false)
      return
    }
    
    setSunPosition(prev => {
      const newPos = prev + 20
      if (newPos >= 100) {
        setAwakened(true)
        setEmbraceCount(c => c + 1)
        return 100
      }
      return newPos
    })
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0b5379] to-[#8bd5c4] rounded-t-3xl" />
          
          <div 
            className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
            style={{ 
              background: `linear-gradient(to top, rgba(139,213,196,${sunPosition/500}), transparent)`,
              opacity: sunPosition / 100
            }}
          />
          
          <div className="flex flex-col items-center text-center gap-8 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight">
              Dawn Embrace
            </h1>
            <p className="text-white/60 max-w-md">
              Awaken the digital sanctuary with light. Raise the sun together.
            </p>

            <div className="relative w-full h-64 border border-white/10 rounded-2xl overflow-hidden bg-gradient-to-t from-[#0b5379]/30 to-transparent">
              <motion.div
                animate={{ 
                  bottom: `${sunPosition}%`,
                  filter: awakened ? 'drop-shadow(0 0 40px rgba(139,213,196,0.8))' : 'drop-shadow(0 0 20px rgba(139,213,196,0.4))'
                }}
                transition={{ type: "spring", stiffness: 100 }}
                className="absolute left-1/2 -translate-x-1/2"
                style={{ bottom: `${sunPosition}%` }}
              >
                <Sun className={`w-16 h-16 ${awakened ? 'text-[#8bd5c4]' : 'text-[#8bd5c4]/60'}`} />
              </motion.div>
              
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0b5379] to-transparent" />
            </div>

            {awakened && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-[#8bd5c4] text-xl font-bold"
              >
                The Sanctuary Awakens!
              </motion.div>
            )}

            <div className="text-[#8bd5c4] text-sm">
              Dawn Embraces: <span className="text-white font-bold">{embraceCount}</span>
            </div>

            <Button 
              onClick={raiseSun}
              size="lg"
              className="bg-gradient-to-r from-[#0b5379] to-[#8bd5c4] hover:opacity-90 text-white px-12 py-6 text-lg rounded-full shadow-[0_0_30px_rgba(139,213,196,0.3)]"
            >
              <Sun className="w-5 h-5 mr-2" />
              {awakened ? 'New Dawn' : 'Raise the Sun'}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
