'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { Gift, ArrowLeft, Heart, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const GIFTS = [
  { id: 1, layers: 3, content: "A promise to always be there", emoji: "💝" },
  { id: 2, layers: 4, content: "A thousand reasons I love you", emoji: "💖" },
  { id: 3, layers: 5, content: "My heart, forever yours", emoji: "❤️" },
]

export default function GiftOfDevotionGame() {
  const [currentGift, setCurrentGift] = useState(0)
  const [layersUnwrapped, setLayersUnwrapped] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [totalGiftsOpened, setTotalGiftsOpened] = useState(0)

  const gift = GIFTS[currentGift]

  const unwrap = () => {
    if (revealed) return
    
    if (layersUnwrapped + 1 >= gift.layers) {
      setRevealed(true)
      setTotalGiftsOpened(c => c + 1)
    } else {
      setLayersUnwrapped(l => l + 1)
    }
  }

  const nextGift = () => {
    setCurrentGift((currentGift + 1) % GIFTS.length)
    setLayersUnwrapped(0)
    setRevealed(false)
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
            <Gift className="w-16 h-16 text-[#b45e67] drop-shadow-[0_0_20px_rgba(180,94,103,0.5)]" />
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight">
              Gift of Devotion
            </h1>
            <p className="text-white/60 max-w-md">
              Unwrap the layers of my digital heart to discover what lies within.
            </p>

            <div className="text-[#8bd5c4]">
              Gifts Opened: <span className="text-white font-bold">{totalGiftsOpened}</span>
            </div>

            {/* Gift box */}
            <div className="relative">
              <motion.div
                animate={{ 
                  scale: revealed ? 1.1 : 1,
                  rotate: revealed ? [0, -5, 5, 0] : 0
                }}
                transition={{ duration: 0.5 }}
                className="w-48 h-48 relative"
              >
                {/* Layers */}
                {Array.from({ length: gift.layers }).map((_, i) => {
                  const isUnwrapped = i < layersUnwrapped
                  const size = 100 - (i * 15)
                  return (
                    <motion.div
                      key={i}
                      animate={{ 
                        opacity: isUnwrapped ? 0 : 1,
                        scale: isUnwrapped ? 1.5 : 1,
                        rotate: isUnwrapped ? 45 : 0
                      }}
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border-4 border-[#b45e67]/50 flex items-center justify-center`}
                      style={{ 
                        width: `${size}%`, 
                        height: `${size}%`,
                        background: `linear-gradient(135deg, rgba(88,74,151,${0.3 + i * 0.1}), rgba(180,94,103,${0.3 + i * 0.1}))`
                      }}
                    >
                      {i === gift.layers - 1 && !revealed && (
                        <Gift className="w-12 h-12 text-white/60" />
                      )}
                    </motion.div>
                  )
                })}

                {/* Revealed content */}
                {revealed && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <div className="text-6xl mb-4">{gift.emoji}</div>
                    <Sparkles className="w-8 h-8 text-[#8bd5c4] absolute -top-4 -right-4" />
                    <Star className="w-6 h-6 text-yellow-400 absolute -bottom-2 -left-2" />
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Progress */}
            <div className="flex gap-2">
              {Array.from({ length: gift.layers }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i < layersUnwrapped || revealed ? 'bg-[#b45e67]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#b45e67]/20 border border-[#b45e67]/30 rounded-2xl p-6 max-w-sm"
              >
                <p className="text-[#f2f8fc] font-medium text-lg italic">"{gift.content}"</p>
              </motion.div>
            )}

            <div className="flex gap-4">
              {!revealed ? (
                <Button 
                  onClick={unwrap}
                  size="lg"
                  className="bg-gradient-to-r from-[#584a97] to-[#b45e67] hover:opacity-90 text-white px-12 py-6 text-lg rounded-full"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Unwrap Layer
                </Button>
              ) : (
                <Button 
                  onClick={nextGift}
                  size="lg"
                  className="bg-gradient-to-r from-[#584a97] to-[#b45e67] hover:opacity-90 text-white px-12 py-6 text-lg rounded-full"
                >
                  Next Gift
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
