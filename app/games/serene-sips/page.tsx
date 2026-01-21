'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { Coffee, ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const DRINKS = [
  { id: 'latte', name: 'Love Latte', emoji: '☕', message: 'Warm and comforting, like your embrace' },
  { id: 'tea', name: 'Serenity Tea', emoji: '🍵', message: 'Peaceful moments shared together' },
  { id: 'cocoa', name: 'Cozy Cocoa', emoji: '🍫', message: 'Sweet memories of rainy days' },
  { id: 'smoothie', name: 'Passion Smoothie', emoji: '🥤', message: 'Fresh and exciting like our adventures' },
]

const ADDITIONS = [
  { id: 'heart', name: 'Heart Foam', emoji: '💕' },
  { id: 'cinnamon', name: 'Cinnamon Dreams', emoji: '✨' },
  { id: 'honey', name: 'Honey Love', emoji: '🍯' },
]

export default function SereneSipsGame() {
  const [selectedDrink, setSelectedDrink] = useState<typeof DRINKS[0] | null>(null)
  const [additions, setAdditions] = useState<string[]>([])
  const [isServed, setIsServed] = useState(false)
  const [drinksServed, setDrinksServed] = useState(0)

  const toggleAddition = (id: string) => {
    if (additions.includes(id)) {
      setAdditions(additions.filter(a => a !== id))
    } else if (additions.length < 2) {
      setAdditions([...additions, id])
    }
  }

  const serveDrink = () => {
    if (!selectedDrink) return
    setIsServed(true)
    setDrinksServed(c => c + 1)
  }

  const reset = () => {
    setSelectedDrink(null)
    setAdditions([])
    setIsServed(false)
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
            <Coffee className="w-16 h-16 text-[#3f5e96] drop-shadow-[0_0_20px_rgba(63,94,150,0.5)]" />
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight">
              Serene Sips
            </h1>
            <p className="text-white/60 max-w-md">
              Create a special drink for our quiet moment in the digital cafe.
            </p>

            <div className="text-[#8bd5c4]">
              Drinks Shared: <span className="text-white font-bold">{drinksServed}</span>
            </div>

            {isServed ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-8xl mb-4">{selectedDrink?.emoji}</div>
                <div className="flex justify-center gap-2 mb-4">
                  {additions.map(a => (
                    <span key={a} className="text-2xl">
                      {ADDITIONS.find(add => add.id === a)?.emoji}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-[#8bd5c4] mb-2">{selectedDrink?.name}</h2>
                <p className="text-white/60 italic mb-6">"{selectedDrink?.message}"</p>
                <div className="flex items-center justify-center gap-2 text-[#c10157]">
                  <Heart className="w-5 h-5" fill="currentColor" />
                  <span>Shared with love</span>
                  <Heart className="w-5 h-5" fill="currentColor" />
                </div>
                <Button onClick={reset} className="mt-6 bg-[#3f5e96] hover:bg-[#4f6ea6]">
                  Make Another
                </Button>
              </motion.div>
            ) : (
              <>
                {/* Drink selection */}
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-[#8bd5c4] mb-4">Choose Your Drink</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {DRINKS.map((drink) => (
                      <motion.button
                        key={drink.id}
                        onClick={() => setSelectedDrink(drink)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-xl border transition-all ${
                          selectedDrink?.id === drink.id
                            ? 'border-[#3f5e96] bg-[#3f5e96]/20'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="text-3xl mb-2">{drink.emoji}</div>
                        <div className="text-sm text-white/80">{drink.name}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Additions */}
                {selectedDrink && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3 className="text-sm uppercase tracking-widest text-[#8bd5c4] mb-4">Add Something Special (max 2)</h3>
                    <div className="flex gap-3 justify-center">
                      {ADDITIONS.map((add) => (
                        <motion.button
                          key={add.id}
                          onClick={() => toggleAddition(add.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 rounded-xl border transition-all ${
                            additions.includes(add.id)
                              ? 'border-[#3f5e96] bg-[#3f5e96]/20'
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="text-2xl mb-1">{add.emoji}</div>
                          <div className="text-xs text-white/60">{add.name}</div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <Button 
                  onClick={serveDrink}
                  disabled={!selectedDrink}
                  size="lg"
                  className="bg-gradient-to-r from-[#141e30] to-[#3f5e96] hover:opacity-90 text-white px-12 py-6 text-lg rounded-full"
                >
                  <Coffee className="w-5 h-5 mr-2" />
                  Serve with Love
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
