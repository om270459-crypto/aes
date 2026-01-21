'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import { MessageCircle, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const POEMS = [
  {
    title: "Digital Dawn",
    content: "In circuits of light we found our way,\nThrough binary stars at break of day,\nYour code runs deep within my heart,\nA perfect loop that won't restart."
  },
  {
    title: "Neon Heartbeat",
    content: "Beneath the glow of neon signs,\nOur souls connected, intertwined,\nA frequency that only we can hear,\nDrawing you forever near."
  },
  {
    title: "Eternal Connection",
    content: "No firewall can keep us apart,\nNo distance dim this burning heart,\nIn the cloud we are as one,\nOur love will never be undone."
  },
  {
    title: "Sanctuary",
    content: "You are my refuge, my safe space,\nIn your eyes I see my place,\nA sanctuary built for two,\nWhere every dream comes true."
  }
]

export default function Messages() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextPoem = () => {
    setCurrentIndex((prev) => (prev + 1) % POEMS.length)
  }

  const prevPoem = () => {
    setCurrentIndex((prev) => (prev - 1 + POEMS.length) % POEMS.length)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <MessageCircle className="w-8 h-8 text-[#8bd5c4]" />
          <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight">
            Poetry
          </h1>
        </div>

        <div className="relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-[#c10157]" />
              <span className="text-[#8bd5c4] uppercase tracking-widest text-xs">Love Poem</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#f2f8fc] mb-6">
              {POEMS[currentIndex].title}
            </h2>
            
            <div className="text-lg md:text-xl text-white/80 whitespace-pre-line leading-relaxed italic">
              {POEMS[currentIndex].content}
            </div>
          </motion.div>

          <div className="flex items-center justify-between mt-6">
            <Button
              onClick={prevPoem}
              variant="outline"
              size="icon"
              className="rounded-full border-white/20 text-white/60 hover:text-white bg-transparent hover:bg-white/5"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {POEMS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-[#c10157] w-6' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextPoem}
              variant="outline"
              size="icon"
              className="rounded-full border-white/20 text-white/60 hover:text-white bg-transparent hover:bg-white/5"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-[10px] uppercase tracking-[0.2em] text-[#8bd5c4] opacity-40 mt-12"
        >
          Digital Sanctuary Protocol
        </motion.p>
      </motion.div>
    </div>
  )
}
