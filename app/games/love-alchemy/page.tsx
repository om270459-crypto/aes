'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { Wand2, ArrowLeft, Plus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const INGREDIENTS = [
  { id: 'trust', name: 'Trust', emoji: '🤝', color: 'bg-blue-500/20' },
  { id: 'passion', name: 'Passion', emoji: '🔥', color: 'bg-red-500/20' },
  { id: 'kindness', name: 'Kindness', emoji: '💝', color: 'bg-pink-500/20' },
  { id: 'laughter', name: 'Laughter', emoji: '😄', color: 'bg-yellow-500/20' },
  { id: 'patience', name: 'Patience', emoji: '⏳', color: 'bg-purple-500/20' },
  { id: 'adventure', name: 'Adventure', emoji: '✨', color: 'bg-cyan-500/20' },
]

const RECIPES: Record<string, { result: string, message: string }> = {
  'trust+passion': { result: '💕 Deep Connection', message: 'Trust and passion create an unbreakable bond!' },
  'kindness+laughter': { result: '🌈 Pure Joy', message: 'Kindness and laughter light up every day!' },
  'patience+passion': { result: '🔥 Eternal Flame', message: 'Patience fuels passion into eternity!' },
  'trust+kindness': { result: '💖 True Love', message: 'The foundation of all great love stories!' },
  'adventure+laughter': { result: '🎉 Endless Fun', message: 'Life is an adventure when we laugh together!' },
  'patience+kindness': { result: '🕊️ Peace', message: 'Serenity in our sanctuary!' },
}

export default function LoveAlchemyGame() {
  const [cauldron, setCauldron] = useState<string[]>([])
  const [result, setResult] = useState<{ result: string, message: string } | null>(null)
  const [potionCount, setPotionCount] = useState(0)

  const addIngredient = (id: string) => {
    if (cauldron.length >= 2) return
    if (cauldron.includes(id)) return
    setCauldron([...cauldron, id])
  }

  const brew = () => {
    if (cauldron.length !== 2) return
    
    const key1 = `${cauldron[0]}+${cauldron[1]}`
    const key2 = `${cauldron[1]}+${cauldron[0]}`
    
    const recipe = RECIPES[key1] || RECIPES[key2]
    
    if (recipe) {
      setResult(recipe)
      setPotionCount(c => c + 1)
    } else {
      setResult({ result: '💫 Mystery Potion', message: 'An unexpected but beautiful combination!' })
      setPotionCount(c => c + 1)
    }
  }

  const reset = () => {
    setCauldron([])
    setResult(null)
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
            <Wand2 className="w-16 h-16 text-[#c10157] drop-shadow-[0_0_20px_rgba(193,1,87,0.5)]" />
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight">
              Love Alchemy
            </h1>
            <p className="text-white/60 max-w-md">
              Combine ingredients to brew the perfect potion of affection.
            </p>

            <div className="text-[#8bd5c4]">
              Potions Brewed: <span className="text-white font-bold">{potionCount}</span>
            </div>

            {/* Ingredients */}
            <div className="grid grid-cols-3 gap-3">
              {INGREDIENTS.map((ing) => (
                <motion.button
                  key={ing.id}
                  onClick={() => addIngredient(ing.id)}
                  disabled={cauldron.includes(ing.id) || cauldron.length >= 2}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-xl border transition-all ${ing.color} ${
                    cauldron.includes(ing.id) 
                      ? 'border-[#c10157] opacity-50' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="text-2xl mb-1">{ing.emoji}</div>
                  <div className="text-xs text-white/80">{ing.name}</div>
                </motion.button>
              ))}
            </div>

            {/* Cauldron */}
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center text-2xl ${cauldron[0] ? 'border-[#c10157] bg-[#c10157]/10' : 'border-white/20'}`}>
                {cauldron[0] && INGREDIENTS.find(i => i.id === cauldron[0])?.emoji}
              </div>
              <Plus className="w-6 h-6 text-white/40" />
              <div className={`w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center text-2xl ${cauldron[1] ? 'border-[#c10157] bg-[#c10157]/10' : 'border-white/20'}`}>
                {cauldron[1] && INGREDIENTS.find(i => i.id === cauldron[1])?.emoji}
              </div>
            </div>

            {result && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-[#c10157]/20 border border-[#c10157]/30 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-2">{result.result}</div>
                <p className="text-white/80">{result.message}</p>
              </motion.div>
            )}

            <div className="flex gap-4">
              <Button 
                onClick={brew}
                disabled={cauldron.length !== 2}
                className="bg-gradient-to-r from-[#4e0b37] to-[#c10157] hover:opacity-90 text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Brew Potion
              </Button>
              <Button onClick={reset} variant="outline" className="border-white/20 text-white/60 bg-transparent hover:bg-white/5">
                Reset
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
