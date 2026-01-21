'use client'

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Stars, ArrowLeft, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

const SYMBOLS = ['💕', '💖', '💗', '💘', '💝', '💞', '✨', '🌟']

interface Card {
  id: number
  symbol: string
  flipped: boolean
  matched: boolean
}

export default function MemoryHeartGame() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  const initializeGame = () => {
    const shuffled = [...SYMBOLS, ...SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        flipped: false,
        matched: false
      }))
    setCards(shuffled)
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
    setGameWon(false)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return
    if (cards[id].flipped || cards[id].matched) return

    const newCards = [...cards]
    newCards[id].flipped = true
    setCards(newCards)
    setFlippedCards([...flippedCards, id])
  }

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(m => m + 1)
      const [first, second] = flippedCards
      
      if (cards[first].symbol === cards[second].symbol) {
        const newCards = [...cards]
        newCards[first].matched = true
        newCards[second].matched = true
        setCards(newCards)
        setMatches(m => m + 1)
        setFlippedCards([])
        
        if (matches + 1 === SYMBOLS.length) {
          setGameWon(true)
        }
      } else {
        setTimeout(() => {
          const newCards = [...cards]
          newCards[first].flipped = false
          newCards[second].flipped = false
          setCards(newCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }, [flippedCards, cards, matches])

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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0a272d] to-[#124a57] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <Stars className="w-16 h-16 text-[#8bd5c4] drop-shadow-[0_0_20px_rgba(139,213,196,0.5)]" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight">
                Memory Heart
              </h1>
              <p className="text-white/60 max-w-md">
                Match the pairs to unlock memories of our love.
              </p>
            </div>

            <div className="flex gap-8 text-sm">
              <div className="text-[#8bd5c4]">Moves: <span className="text-white font-bold">{moves}</span></div>
              <div className="text-[#8bd5c4]">Matches: <span className="text-white font-bold">{matches}/{SYMBOLS.length}</span></div>
            </div>

            {gameWon ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center py-8"
              >
                <h2 className="text-3xl font-bold text-[#8bd5c4] mb-4">You Won!</h2>
                <p className="text-white/60 mb-6">Completed in {moves} moves</p>
                <Button onClick={initializeGame} className="bg-gradient-to-r from-[#0a272d] to-[#124a57] text-white">
                  <RotateCcw className="w-4 h-4 mr-2" /> Play Again
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-4 gap-3 md:gap-4">
                {cards.map((card) => (
                  <motion.button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-xl text-2xl md:text-3xl flex items-center justify-center transition-all duration-300 ${
                      card.flipped || card.matched
                        ? 'bg-[#124a57]/50 border-[#8bd5c4]/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    } border`}
                  >
                    {(card.flipped || card.matched) ? card.symbol : '?'}
                  </motion.button>
                ))}
              </div>
            )}

            <Button onClick={initializeGame} variant="outline" className="border-white/20 text-white/60 hover:text-white bg-transparent hover:bg-white/5">
              <RotateCcw className="w-4 h-4 mr-2" /> Reset Game
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
