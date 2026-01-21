'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { Moon, ArrowLeft, Star } from "lucide-react";

export default function MidnightWhisperGame() {
  const whispers = [
    "You are my star in the endless night.",
    "Love is infinite, like the cosmos.",
    "In you, I found my sanctuary.",
    "Our bond transcends time itself.",
    "Every moment with you is magic.",
    "You are the dream I never want to wake from.",
    "In your eyes, I see forever.",
    "Our love writes itself across the stars."
  ];
  const [messages, setMessages] = useState<string[]>([]);
  const [stars] = useState(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 2
    }))
  );

  const handleStarClick = () => {
    const newWhisper = whispers[Math.floor(Math.random() * whispers.length)];
    setMessages(prev => [newWhisper, ...prev.slice(0, 4)]);
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#141e30] to-[#3f5e96] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <Moon className="w-16 h-16 text-[#3f5e96] drop-shadow-[0_0_20px_rgba(63,94,150,0.5)]" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight" style={{ fontFamily: 'Walkway, sans-serif' }}>
                Midnight Whisper
              </h1>
              <p className="text-white/60 max-w-md">
                Hear the secrets hidden in the void. Click the stars to reveal whispers from the night.
              </p>
            </div>

            {/* Star field */}
            <div className="relative w-full h-64 md:h-80 rounded-2xl bg-gradient-to-b from-[#0a0f1a] to-[#141e30] border border-white/10 overflow-hidden">
              {stars.map((star) => (
                <motion.div
                  key={star.id}
                  onClick={handleStarClick}
                  className="absolute cursor-pointer"
                  style={{ left: `${star.x}%`, top: `${star.y}%` }}
                  animate={{ 
                    opacity: [0.4, 1, 0.4],
                    scale: [star.size, star.size * 1.3, star.size]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    delay: star.delay
                  }}
                  whileHover={{ scale: star.size * 2 }}
                  whileTap={{ scale: star.size * 0.5 }}
                >
                  <Star className="w-4 h-4 text-[#8bd5c4] fill-current" />
                </motion.div>
              ))}

              {/* Central moon */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3f5e96] to-[#1a2a4a] shadow-[0_0_40px_rgba(63,94,150,0.5)]" />
              </motion.div>
            </div>

            {/* Whispers display */}
            <div className="w-full max-w-md space-y-3 min-h-40">
              <AnimatePresence mode="popLayout">
                {messages.map((msg, i) => (
                  <motion.div
                    key={msg + i}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1 - i * 0.2, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <p className="text-[#f2f8fc] italic text-sm">{msg}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
              {messages.length === 0 && (
                <p className="text-white/40 text-sm">Click the stars to reveal whispers...</p>
              )}
            </div>

            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8bd5c4] opacity-40">
              Digital Sanctuary Protocol
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
