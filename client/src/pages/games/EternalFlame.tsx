'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { Flame, ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EternalFlameGame() {
  const [lit, setLit] = useState<number[]>([]);
  const candles = [1, 2, 3, 4, 5];
  const messages = [
    "First light of hope",
    "Warmth of affection",
    "Passion ignites",
    "Eternal devotion",
    "Love everlasting"
  ];

  const handleLight = (i: number) => {
    if (!lit.includes(i)) {
      setLit(prev => [...prev, i]);
    }
  };

  const resetGame = () => {
    setLit([]);
  };

  const allLit = lit.length === candles.length;

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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#584a97] to-[#b45e67] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <Flame className="w-16 h-16 text-[#b45e67] drop-shadow-[0_0_20px_rgba(180,94,103,0.5)]" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight" style={{ fontFamily: 'Walkway, sans-serif' }}>
                Eternal Flame
              </h1>
              <p className="text-white/60 max-w-md">
                Fuel the neon flames with your devotion. Light all the candles to complete the ritual.
              </p>
            </div>

            <div className="text-white/60">
              Candles Lit: <span className="text-[#b45e67] font-bold">{lit.length}</span> / {candles.length}
            </div>

            <div className="flex gap-8 md:gap-12 py-12">
              {candles.map((i) => (
                <motion.div 
                  key={i} 
                  onClick={() => handleLight(i)} 
                  className="flex flex-col items-center gap-3 cursor-pointer group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    animate={{ 
                      opacity: lit.includes(i) ? 1 : 0.2, 
                      scale: lit.includes(i) ? [1, 1.2, 1] : 1,
                      y: lit.includes(i) ? [0, -5, 0] : 0
                    }}
                    transition={{ 
                      repeat: lit.includes(i) ? Infinity : 0, 
                      duration: 1.5 
                    }}
                    className="text-[#b45e67]"
                  >
                    <Flame className="w-12 h-12 md:w-16 md:h-16 drop-shadow-[0_0_15px_rgba(180,94,103,0.6)]" />
                  </motion.div>
                  <div className={`w-6 h-16 md:w-8 md:h-20 rounded-t-lg transition-colors ${
                    lit.includes(i) ? "bg-gradient-to-b from-[#b45e67]/50 to-white/30" : "bg-white/20"
                  }`} />
                  {lit.includes(i) && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] text-[#b45e67] max-w-16 text-center"
                    >
                      {messages[i - 1]}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </div>

            {allLit && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#b45e67]/20 border border-[#b45e67]/30 rounded-2xl p-6"
              >
                <p className="text-[#b45e67] font-bold text-xl mb-2">The Flame Burns Eternal</p>
                <p className="text-white/60">Our love illuminates the darkness</p>
              </motion.div>
            )}

            <Button 
              onClick={resetGame}
              variant="outline"
              className="border-white/20 text-[#f2f8fc] hover:bg-white/10 bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Extinguish & Restart
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
