'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Sparkles, ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SoulBondGame() {
  const [score, setScore] = useState(0);
  const [pulse, setPulse] = useState(1);
  const [combo, setCombo] = useState(0);
  const [lastClick, setLastClick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => p === 1 ? 1.2 : 1), 600);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    const now = Date.now();
    const timeDiff = now - lastClick;
    
    // Perfect sync window (500-700ms matches the pulse)
    if (timeDiff >= 500 && timeDiff <= 700) {
      setCombo(c => c + 1);
      setScore(s => s + (1 + combo));
    } else {
      setCombo(0);
      setScore(s => s + 1);
    }
    setLastClick(now);
  };

  const resetGame = () => {
    setScore(0);
    setCombo(0);
    setLastClick(0);
  };

  const getLevel = () => {
    if (score >= 100) return "Eternal Bond";
    if (score >= 50) return "Deep Connection";
    if (score >= 25) return "Growing Bond";
    if (score >= 10) return "First Spark";
    return "Beginning";
  };

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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2a3294] to-[#4ba4dc] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <Sparkles className="w-16 h-16 text-[#4ba4dc] drop-shadow-[0_0_20px_rgba(75,164,220,0.5)]" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight" style={{ fontFamily: 'Walkway, sans-serif' }}>
                Soul Bond
              </h1>
              <p className="text-white/60 max-w-md">
                Feel the rhythm of our synchronized hearts. Click in sync with the pulse to build your combo!
              </p>
            </div>

            <div className="flex items-center gap-8 text-white/60">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#4ba4dc]">{score}</p>
                <p className="text-xs uppercase tracking-widest">Sync Level</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#8bd5c4]">{combo}x</p>
                <p className="text-xs uppercase tracking-widest">Combo</p>
              </div>
            </div>

            <div className="py-12">
              <motion.div 
                animate={{ scale: pulse }} 
                onClick={handleClick}
                whileTap={{ scale: 0.9 }}
                className="w-40 h-40 rounded-full bg-gradient-to-br from-[#2a3294] to-[#4ba4dc] flex items-center justify-center cursor-pointer shadow-[0_0_60px_rgba(75,164,220,0.5)] hover:shadow-[0_0_80px_rgba(75,164,220,0.7)] transition-shadow"
              >
                <Sparkles className="w-20 h-20 text-white" />
              </motion.div>
              <p className="text-white/40 text-sm mt-4">Click in rhythm with the pulse</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 w-full max-w-sm">
              <p className="text-[#8bd5c4] font-bold text-lg">{getLevel()}</p>
              <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                <motion.div 
                  className="bg-gradient-to-r from-[#4ba4dc] to-[#8bd5c4] h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(score, 100)}%` }}
                />
              </div>
            </div>

            <Button 
              onClick={resetGame}
              variant="outline"
              className="border-white/20 text-[#f2f8fc] hover:bg-white/10 bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
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
