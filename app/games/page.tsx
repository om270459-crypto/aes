'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Stars, Sparkles, Flame, Moon, Sun, Ghost, Wand2, Music, Camera, Gift, Coffee, ArrowRight } from "lucide-react"

const GAMES = [
  { id: "truth-kiss", title: "Truth Kiss", icon: Heart, color: "from-[#4e0b37] to-[#c10157]", description: "Spin the digital wheel of destiny." },
  { id: "memory-heart", title: "Memory Heart", icon: Stars, color: "from-[#0a272d] to-[#124a57]", description: "Align the fragments of our shared past." },
  { id: "soul-bond", title: "Soul Bond", icon: Sparkles, color: "from-[#2a3294] to-[#4ba4dc]", description: "Feel the rhythm of our synchronized hearts." },
  { id: "eternal-flame", title: "Eternal Flame", icon: Flame, color: "from-[#584a97] to-[#b45e67]", description: "Fuel the neon flame with your devotion." },
  { id: "midnight-whisper", title: "Midnight Whisper", icon: Moon, color: "from-[#141e30] to-[#3f5e96]", description: "Hear the secrets hidden in the void." },
  { id: "dawn-embrace", title: "Dawn Embrace", icon: Sun, color: "from-[#0b5379] to-[#8bd5c4]", description: "Awaken the digital sanctuary with light." },
  { id: "secret-sanctuary", title: "Secret Sanctuary", icon: Ghost, color: "from-[#2d1e2f] to-[#4e2a4f]", description: "Navigate the sacred halls of memory." },
  { id: "love-alchemy", title: "Love Alchemy", icon: Wand2, color: "from-[#4e0b37] to-[#c10157]", description: "Brew the perfect potion of affection." },
  { id: "melodic-love", title: "Melodic Love", icon: Music, color: "from-[#0a272d] to-[#124a57]", description: "Play the symphony of our connection." },
  { id: "captured-moment", title: "Captured Moment", icon: Camera, color: "from-[#2a3294] to-[#4ba4dc]", description: "Freeze a frame of our eternal now." },
  { id: "gift-of-devotion", title: "Gift of Devotion", icon: Gift, color: "from-[#584a97] to-[#b45e67]", description: "Unwrap the layers of my digital heart." },
  { id: "serene-sips", title: "Serene Sips", icon: Coffee, color: "from-[#141e30] to-[#3f5e96]", description: "A quiet moment in the digital cafe." },
]

export default function Games() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-transparent relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#fffff0] to-[#f2f8fc]"
        >
          Lovers Games
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center text-white/60 mb-12 max-w-md mx-auto"
        >
          Choose your adventure in our digital sanctuary
        </motion.p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {GAMES.map((game, i) => (
            <Link key={game.id} href={`/games/${game.id}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer h-full"
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl hover:border-white/20 transition-all group relative overflow-hidden h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${game.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <CardContent className="p-6 md:p-8 flex flex-col items-center justify-center text-center gap-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${game.color} bg-opacity-20`}>
                      <game.icon className="w-8 h-8 md:w-10 md:h-10 text-[#f2f8fc] group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#f2f8fc] mb-1">{game.title}</h3>
                      <p className="text-xs text-white/40 hidden md:block">{game.description}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] uppercase tracking-widest text-[#8bd5c4]">Play Now</span>
                      <ArrowRight className="w-3 h-3 text-[#8bd5c4]" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-[10px] uppercase tracking-[0.2em] text-[#8bd5c4] opacity-40 mt-12"
        >
          Digital Sanctuary Protocol
        </motion.p>
      </div>
    </div>
  )
}
