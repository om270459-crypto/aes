'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { Sun, ArrowLeft, Cloud } from "lucide-react";

export default function DawnEmbraceGame() {
  const [val, setVal] = useState(0);

  const getMessage = () => {
    if (val >= 90) return "Full Radiance - Our love shines brightest";
    if (val >= 70) return "Golden Hour - Bathed in warmth";
    if (val >= 50) return "Breaking Dawn - Hope emerges";
    if (val >= 30) return "First Light - A new beginning";
    if (val >= 10) return "Pre-Dawn - Anticipation builds";
    return "Night - Awaiting the sunrise";
  };

  const getSkyColor = () => {
    if (val >= 80) return "from-[#87CEEB] via-[#FFD700] to-[#FFA500]";
    if (val >= 60) return "from-[#4a6fa5] via-[#ff9966] to-[#ff5e62]";
    if (val >= 40) return "from-[#1a1a2e] via-[#4a3f6b] to-[#ff6b6b]";
    if (val >= 20) return "from-[#0f0f1a] via-[#1a1a2e] to-[#2d2d44]";
    return "from-[#0a0a0f] via-[#0f0f1a] to-[#1a1a2e]";
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0b5379] to-[#8bd5c4] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <Sun className="w-16 h-16 text-[#8bd5c4] drop-shadow-[0_0_20px_rgba(139,213,196,0.5)]" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight" style={{ fontFamily: 'Walkway, sans-serif' }}>
                Dawn Embrace
              </h1>
              <p className="text-white/60 max-w-md">
                Awaken the digital sanctuary with light. Control the sunrise with your touch.
              </p>
            </div>

            {/* Sky visualization */}
            <div className={`relative w-full h-64 md:h-80 rounded-2xl bg-gradient-to-b ${getSkyColor()} border border-white/10 overflow-hidden transition-all duration-500`}>
              {/* Clouds */}
              {val > 30 && (
                <>
                  <motion.div
                    animate={{ x: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 10 }}
                    className="absolute top-8 left-1/4"
                    style={{ opacity: Math.min((val - 30) / 50, 0.6) }}
                  >
                    <Cloud className="w-16 h-16 text-white/40" />
                  </motion.div>
                  <motion.div
                    animate={{ x: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 8 }}
                    className="absolute top-16 right-1/4"
                    style={{ opacity: Math.min((val - 40) / 50, 0.5) }}
                  >
                    <Cloud className="w-12 h-12 text-white/30" />
                  </motion.div>
                </>
              )}

              {/* Sun */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                animate={{ 
                  bottom: `${val * 0.6}%`,
                  scale: 0.5 + (val / 100) * 0.8
                }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div 
                  className="w-24 h-24 rounded-full transition-all duration-500"
                  style={{
                    background: val > 50 
                      ? "radial-gradient(circle, #FFD700 0%, #FFA500 50%, #FF6B35 100%)"
                      : "radial-gradient(circle, #ff6b6b 0%, #c44d4d 50%, #8b3a3a 100%)",
                    boxShadow: `0 0 ${40 + val}px ${val > 50 ? '#FFD700' : '#ff6b6b'}`
                  }}
                />
              </motion.div>

              {/* Horizon line */}
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Message */}
            <motion.div
              key={getMessage()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 w-full max-w-sm"
            >
              <p className="text-[#8bd5c4] font-medium">{getMessage()}</p>
            </motion.div>

            {/* Slider */}
            <div className="w-full max-w-md">
              <input 
                type="range" 
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#8bd5c4]" 
                value={val} 
                onChange={e => setVal(Number(e.target.value))}
                min="0"
                max="100"
              />
              <div className="flex justify-between text-xs text-white/40 mt-2">
                <span>Night</span>
                <span>Light: {val}%</span>
                <span>Day</span>
              </div>
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
