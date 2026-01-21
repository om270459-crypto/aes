'use client';

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Coffee, ArrowLeft, RotateCcw, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const messages = [
  "Warmth fills your soul",
  "Love brews in every sip",
  "Comfort in a cup",
  "Serenity achieved",
  "Hearts intertwined",
];

export default function SereneSipsGame() {
  const [fill, setFill] = useState(0);
  const [pouring, setPouring] = useState(false);
  const [message, setMessage] = useState("");
  const [steam, setSteam] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (fill >= 100 && !message) {
      setSteam(true);
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
  }, [fill, message]);

  const startPouring = () => {
    if (fill >= 100) return;
    setPouring(true);
    intervalRef.current = setInterval(() => {
      setFill(f => {
        if (f >= 100) {
          stopPouring();
          return 100;
        }
        return f + 2;
      });
    }, 50);
  };

  const stopPouring = () => {
    setPouring(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetGame = () => {
    setFill(0);
    setMessage("");
    setSteam(false);
    setPouring(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const getCupColor = () => {
    if (fill >= 80) return "from-[#3f2818] to-[#2a1a0f]";
    if (fill >= 50) return "from-[#5a3d2a] to-[#3f2818]";
    if (fill >= 20) return "from-[#7a5a42] to-[#5a3d2a]";
    return "from-[#9a7a62] to-[#7a5a42]";
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
              <Coffee className="w-16 h-16 text-[#3f5e96] drop-shadow-[0_0_20px_rgba(63,94,150,0.5)]" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight" style={{ fontFamily: 'Walkway, sans-serif' }}>
                Serene Sips
              </h1>
              <p className="text-white/60 max-w-md">
                A quiet moment in the digital cafe. Pour love into your cup and find peace.
              </p>
            </div>

            {/* Cup visualization */}
            <div className="relative py-8">
              {/* Steam */}
              {steam && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [-10, -30],
                        opacity: [0.6, 0],
                        scale: [1, 1.5]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        delay: i * 0.3
                      }}
                      className="w-4 h-8 bg-white/20 rounded-full blur-sm"
                    />
                  ))}
                </div>
              )}

              {/* Pour stream */}
              {pouring && fill < 100 && (
                <motion.div
                  animate={{ scaleY: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 0.2 }}
                  className="absolute -top-20 left-1/2 -translate-x-1/2 w-3 h-20 bg-gradient-to-b from-[#3f2818] to-transparent rounded-full"
                />
              )}

              {/* Cup */}
              <div className="relative">
                {/* Cup body */}
                <div className="w-32 h-40 bg-gradient-to-b from-white to-gray-200 rounded-b-3xl relative overflow-hidden shadow-lg">
                  {/* Liquid */}
                  <motion.div 
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${getCupColor()}`}
                    animate={{ height: `${fill}%` }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    {/* Ripple effect */}
                    {pouring && (
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-white/20 rounded-full"
                      />
                    )}
                  </motion.div>

                  {/* Cup shine */}
                  <div className="absolute top-0 left-2 bottom-0 w-4 bg-gradient-to-r from-white/30 to-transparent" />

                  {/* Heart latte art when full */}
                  {fill >= 100 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 left-1/2 -translate-x-1/2"
                    >
                      <Heart className="w-8 h-8 text-white/60 fill-white/40" />
                    </motion.div>
                  )}
                </div>

                {/* Cup handle */}
                <div className="absolute top-8 -right-6 w-8 h-16 border-4 border-gray-200 rounded-r-full" />

                {/* Saucer */}
                <div className="w-40 h-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full mx-auto -mt-1 shadow-md" />
              </div>
            </div>

            {/* Fill indicator */}
            <div className="w-full max-w-xs">
              <div className="flex justify-between text-sm text-white/60 mb-2">
                <span>Empty</span>
                <span className="text-[#8bd5c4] font-bold">{fill}%</span>
                <span>Full</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#3f5e96] to-[#8bd5c4]"
                  animate={{ width: `${fill}%` }}
                />
              </div>
            </div>

            {/* Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#3f5e96]/20 border border-[#3f5e96]/30 rounded-2xl p-6"
              >
                <p className="text-[#8bd5c4] font-bold text-lg">{message}</p>
              </motion.div>
            )}

            {/* Pour button */}
            <Button
              onMouseDown={startPouring}
              onMouseUp={stopPouring}
              onMouseLeave={stopPouring}
              onTouchStart={startPouring}
              onTouchEnd={stopPouring}
              disabled={fill >= 100}
              className="bg-gradient-to-r from-[#3f5e96] to-[#8bd5c4] hover:from-[#4f6ea6] hover:to-[#9be5d4] text-white px-12 py-6 text-lg rounded-full"
            >
              {fill >= 100 ? "Cup Full" : pouring ? "Pouring..." : "Hold to Pour"}
            </Button>

            {fill > 0 && (
              <Button 
                onClick={resetGame}
                variant="outline"
                className="border-white/20 text-[#f2f8fc] hover:bg-white/10 bg-transparent"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                New Cup
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
