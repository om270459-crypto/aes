'use client'

import { motion } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Sparkles, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SoulBondGame() {
  const [sequence, setSequence] = useState<number[]>([])
  const [playerSequence, setPlayerSequence] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [showingSequence, setShowingSequence] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [activeButton, setActiveButton] = useState<number | null>(null)

  const colors = [
    { bg: 'bg-[#c10157]', glow: 'shadow-[0_0_30px_rgba(193,1,87,0.6)]' },
    { bg: 'bg-[#17bace]', glow: 'shadow-[0_0_30px_rgba(23,186,206,0.6)]' },
    { bg: 'bg-[#8bd5c4]', glow: 'shadow-[0_0_30px_rgba(139,213,196,0.6)]' },
    { bg: 'bg-[#4ba4dc]', glow: 'shadow-[0_0_30px_rgba(75,164,220,0.6)]' },
  ]

  const startGame = () => {
    setSequence([])
    setPlayerSequence([])
    setScore(0)
    setGameOver(false)
    setIsPlaying(true)
    addToSequence([])
  }

  const addToSequence = useCallback((currentSequence: number[]) => {
    const newNumber = Math.floor(Math.random() * 4)
    const newSequence = [...currentSequence, newNumber]
    setSequence(newSequence)
    playSequence(newSequence)
  }, [])

  const playSequence = async (seq: number[]) => {
    setShowingSequence(true)
    setPlayerSequence([])
    
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600))
      setActiveButton(seq[i])
      await new Promise(resolve => setTimeout(resolve, 400))
      setActiveButton(null)
    }
    
    setShowingSequence(false)
  }

  const handleButtonClick = (index: number) => {
    if (showingSequence || !isPlaying || gameOver) return

    setActiveButton(index)
    setTimeout(() => setActiveButton(null), 200)

    const newPlayerSequence = [...playerSequence, index]
    setPlayerSequence(newPlayerSequence)

    const currentIndex = newPlayerSequence.length - 1
    if (newPlayerSequence[currentIndex] !== sequence[currentIndex]) {
      setGameOver(true)
      setIsPlaying(false)
      return
    }

    if (newPlayerSequence.length === sequence.length) {
      setScore(s => s + 1)
      setTimeout(() => addToSequence(sequence), 1000)
    }
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2a3294] to-[#4ba4dc] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <Sparkles className="w-16 h-16 text-[#4ba4dc] drop-shadow-[0_0_20px_rgba(75,164,220,0.5)]" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight">
                Soul Bond
              </h1>
              <p className="text-white/60 max-w-md">
                Follow the rhythm of our synchronized hearts. Repeat the pattern to strengthen our bond.
              </p>
            </div>

            <div className="text-[#8bd5c4] text-xl">
              Score: <span className="text-white font-bold">{score}</span>
            </div>

            {gameOver && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold text-[#c10157] mb-2">Bond Broken!</h2>
                <p className="text-white/60">Your final score: {score}</p>
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {colors.map((color, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleButtonClick(index)}
                  disabled={showingSequence || !isPlaying}
                  whileTap={{ scale: 0.95 }}
                  className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl transition-all duration-200 ${color.bg} ${
                    activeButton === index ? `${color.glow} scale-110` : 'opacity-60'
                  } ${!isPlaying ? 'opacity-30' : ''}`}
                />
              ))}
            </div>

            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-[#2a3294] to-[#4ba4dc] hover:opacity-90 text-white px-12 py-6 text-lg rounded-full"
            >
              {isPlaying ? 'Restart' : gameOver ? 'Try Again' : 'Start Game'}
            </Button>

            {showingSequence && (
              <p className="text-[#8bd5c4] animate-pulse">Watch the pattern...</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
