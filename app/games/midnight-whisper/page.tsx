'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { Moon, ArrowLeft, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const WHISPERS = [
  "You are my moonlight in the darkest night...",
  "Every star I see reminds me of your eyes...",
  "In the silence of midnight, I hear your heartbeat...",
  "Our souls dance together in the cosmic void...",
  "You are the dream I never want to wake from...",
  "Time stops when I think of you...",
  "My love for you transcends dimensions...",
  "In the digital realm, our hearts are forever linked..."
]

export default function MidnightWhisperGame() {
  const [currentWhisper, setCurrentWhisper] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [whisperCount, setWhisperCount] = useState(0)

  const revealWhisper = () => {
    setRevealed(false)
    const randomWhisper = WHISPERS[Math.floor(Math.random() * WHISPERS.length)]
    setCurrentWhisper(randomWhisper)
    setWhisperCount(prev => prev + 1)
    
    setTimeout(() => setRevealed(true), 500)
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#141e30] to-[#3f5e96] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <motion.div
              animate={{ 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Moon className="w-20 h-20 text-[#3f5e96] drop-shadow-[0_0_30px_rgba(63,94,150,0.5)]" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight">
              Midnight Whisper
            </h1>
            <p className="text-white/60 max-w-md">
              Hear the secrets hidden in the void. Each whisper carries a piece of my heart.
            </p>

            <div className="min-h-[120px] flex items-center justify-center">
              {currentWhisper && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }}
                  className="bg-[#3f5e96]/20 border border-[#3f5e96]/30 rounded-2xl p-6 max-w-md"
                >
                  <p className="text-[#f2f8fc] italic text-lg">"{currentWhisper}"</p>
                </motion.div>
              )}
            </div>

            <div className="text-[#8bd5c4] text-sm">
              Whispers Received: <span className="text-white font-bold">{whisperCount}</span>
            </div>

            <Button 
              onClick={revealWhisper}
              size="lg"
              className="bg-gradient-to-r from-[#141e30] to-[#3f5e96] hover:opacity-90 text-white px-12 py-6 text-lg rounded-full shadow-[0_0_30px_rgba(63,94,150,0.3)]"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Receive Whisper
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
