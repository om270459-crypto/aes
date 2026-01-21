'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { Gift, ArrowLeft, Heart, Star, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const gifts = [
  { id: 1, message: "You found my heart - it beats only for you.", icon: Heart, color: "#c10157" },
  { id: 2, message: "A star from our private galaxy.", icon: Star, color: "#FFD700" },
  { id: 3, message: "Infinite sparkles of our shared joy.", icon: Sparkles, color: "#8bd5c4" },
  { id: 4, message: "The key to my eternal devotion.", icon: Heart, color: "#b45e67" },
  { id: 5, message: "A piece of magic from our sanctuary.", icon: Sparkles, color: "#4ba4dc" },
];

export default function GiftOfDevotionGame() {
  const [currentGift, setCurrentGift] = useState(gifts[0]);
  const [opened, setOpened] = useState(false);
  const [unwrapping, setUnwrapping] = useState(false);

  const openGift = () => {
    if (unwrapping || opened) return;
    setUnwrapping(true);
    
    setTimeout(() => {
      setOpened(true);
      setUnwrapping(false);
    }, 1500);
  };

  const resetGame = () => {
    setOpened(false);
    setUnwrapping(false);
    setCurrentGift(gifts[Math.floor(Math.random() * gifts.length)]);
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#584a97] to-[#b45e67] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <Gift className="w-16 h-16 text-[#b45e67] drop-shadow-[0_0_20px_rgba(180,94,103,0.5)]" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight" style={{ fontFamily: 'Walkway, sans-serif' }}>
                Gift of Devotion
              </h1>
              <p className="text-white/60 max-w-md">
                Unwrap the layers of my digital heart. Each gift contains a piece of our love story.
              </p>
            </div>

            {/* Gift box */}
            <div 
              className="relative cursor-pointer py-12"
              onClick={openGift}
            >
              <AnimatePresence mode="wait">
                {!opened ? (
                  <motion.div
                    key="wrapped"
                    initial={{ scale: 1 }}
                    animate={unwrapping ? { 
                      rotateY: [0, 180, 360],
                      scale: [1, 1.2, 1],
                    } : { scale: 1 }}
                    exit={{ scale: 0, rotateY: 180 }}
                    transition={{ duration: 1.5 }}
                    className="relative"
                  >
                    {/* Gift box */}
                    <div className="w-40 h-40 bg-gradient-to-br from-[#584a97] to-[#b45e67] rounded-2xl relative shadow-[0_0_40px_rgba(180,94,103,0.3)]">
                      {/* Ribbon horizontal */}
                      <div className="absolute top-1/2 left-0 right-0 h-6 bg-[#FFD700] -translate-y-1/2" />
                      {/* Ribbon vertical */}
                      <div className="absolute top-0 bottom-0 left-1/2 w-6 bg-[#FFD700] -translate-x-1/2" />
                      {/* Bow */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                        <div className="flex gap-1">
                          <div className="w-8 h-8 bg-[#FFD700] rounded-full" />
                          <div className="w-8 h-8 bg-[#FFD700] rounded-full" />
                        </div>
                        <div className="w-4 h-4 bg-[#DAA520] rounded-full mx-auto -mt-2" />
                      </div>
                    </div>

                    {/* Sparkles around gift */}
                    {!unwrapping && (
                      <>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute -top-4 -right-4"
                        >
                          <Sparkles className="w-6 h-6 text-[#FFD700]" />
                        </motion.div>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                          className="absolute -bottom-4 -left-4"
                        >
                          <Sparkles className="w-6 h-6 text-[#8bd5c4]" />
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="opened"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-6"
                  >
                    {/* Revealed content */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="w-24 h-24 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${currentGift.color}20`,
                        boxShadow: `0 0 40px ${currentGift.color}40`
                      }}
                    >
                      <currentGift.icon 
                        className="w-12 h-12" 
                        style={{ color: currentGift.color }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-sm"
                    >
                      <p className="text-[#f2f8fc] text-lg italic">"{currentGift.message}"</p>
                    </motion.div>

                    {/* Confetti-like particles */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 1, y: 0, x: 0 }}
                        animate={{ 
                          opacity: 0,
                          y: -100 - Math.random() * 100,
                          x: (Math.random() - 0.5) * 200
                        }}
                        transition={{ duration: 2, delay: i * 0.1 }}
                        className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                        style={{ backgroundColor: currentGift.color }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {!opened && !unwrapping && (
                <p className="text-white/40 text-sm mt-6">Click to unwrap</p>
              )}
            </div>

            {opened && (
              <Button 
                onClick={resetGame}
                variant="outline"
                className="border-white/20 text-[#f2f8fc] hover:bg-white/10 bg-transparent"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Another Gift
              </Button>
            )}

            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8bd5c4] opacity-40">
              Digital Sanctuary Protocol
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
