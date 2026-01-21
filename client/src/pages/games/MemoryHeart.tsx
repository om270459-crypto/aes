'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { Stars, Heart, Sparkles, Flame, Moon, Sun, ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MemoryHeartGame() {
  const icons = [Heart, Stars, Sparkles, Flame, Moon, Sun];
  const [cards, setCards] = useState(() => [...icons, ...icons].sort(() => Math.random() - 0.5));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const handleFlip = (i: number) => {
    if (flipped.length === 2 || matched.includes(i) || flipped.includes(i)) return;
    const newFlipped = [...flipped, i];
    setFlipped(newFlipped);
    setMoves(m => m + 1);
    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched([...matched, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const resetGame = () => {
    setCards([...icons, ...icons].sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const isComplete = matched.length === cards.length;

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-transparent relative z-10">
      <div className="max-w-4xl mx-auto">
        <Link href="/games">
          <a className="inline-flex items-center gap-2 text-[#8bd5c4] hover:text-[#f2f8fc] transition-colors mb-8 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm uppercase tracking-widest">Back to Games</span>
          </a>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0a272d] to-[#124a57] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <Stars className="w-16 h-16 text-[#124a57] drop-shadow-[0_0_20px_rgba(18,74,87,0.5)]" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight" style={{ fontFamily: 'Walkway, sans-serif' }}>
                Memory Heart
              </h1>
              <p className="text-white/60 max-w-md">
                Align the fragments of our shared past. Match the pairs to complete the memory.
              </p>
            </div>

            <div className="flex items-center gap-8 text-white/60">
              <span>Moves: <span className="text-[#8bd5c4] font-bold">{moves}</span></span>
              <span>Matched: <span className="text-[#8bd5c4] font-bold">{matched.length / 2}</span> / {icons.length}</span>
            </div>

            <div className="grid grid-cols-4 gap-4 py-8">
              {cards.map((Icon, i) => (
                <motion.div
                  key={i}
                  onClick={() => handleFlip(i)}
                  whileHover={{ scale: flipped.includes(i) || matched.includes(i) ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    flipped.includes(i) || matched.includes(i) 
                      ? "bg-[#124a57] border-2 border-[#8bd5c4]/50 shadow-[0_0_20px_rgba(139,213,196,0.3)]" 
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {(flipped.includes(i) || matched.includes(i)) ? (
                    <Icon className="w-8 h-8 text-[#f2f8fc]" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                  )}
                </motion.div>
              ))}
            </div>

            {isComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#124a57]/20 border border-[#8bd5c4]/30 rounded-2xl p-6"
              >
                <p className="text-[#8bd5c4] font-bold text-xl mb-2">Memory Complete!</p>
                <p className="text-white/60">You completed it in {moves} moves</p>
              </motion.div>
            )}

            <Button 
              onClick={resetGame}
              variant="outline"
              className="border-white/20 text-[#f2f8fc] hover:bg-white/10 bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Game
            </Button>

            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8bd5c4] opacity-40">
              Digital Sanctuary Protocol
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
