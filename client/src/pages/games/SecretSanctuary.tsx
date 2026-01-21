'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { Ghost, ArrowLeft, RotateCcw, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SecretSanctuaryGame() {
  const [found, setFound] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);

  const secrets = [
    { id: 1, x: 15, y: 20, message: "First secret" },
    { id: 2, x: 45, y: 60, message: "Hidden truth" },
    { id: 3, x: 75, y: 35, message: "Deep memory" },
    { id: 4, x: 30, y: 75, message: "Lost whisper" },
    { id: 5, x: 85, y: 80, message: "Final key" },
  ];

  const handleFind = (id: number) => {
    if (!found.includes(id)) {
      setFound(prev => [...prev, id]);
    }
  };

  const resetGame = () => {
    setFound([]);
    setRevealed(false);
  };

  const allFound = found.length === secrets.length;

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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2d1e2f] to-[#4e2a4f] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <Ghost className="w-16 h-16 text-[#4e2a4f] drop-shadow-[0_0_20px_rgba(78,42,79,0.5)]" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight" style={{ fontFamily: 'Walkway, sans-serif' }}>
                Secret Sanctuary
              </h1>
              <p className="text-white/60 max-w-md">
                Navigate the sacred halls of memory. Find all hidden spirits to discover the sanctuary.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-white/60">
                Spirits Found: <span className="text-[#8bd5c4] font-bold">{found.length}</span> / {secrets.length}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setRevealed(!revealed)}
                className="text-white/40 hover:text-white"
              >
                <Eye className="w-4 h-4 mr-1" />
                {revealed ? "Hide" : "Hint"}
              </Button>
            </div>

            {/* Sanctuary map */}
            <div className="relative w-full h-80 md:h-96 rounded-2xl bg-gradient-to-b from-[#1a1020] to-[#2d1e2f] border border-white/10 overflow-hidden">
              {/* Atmospheric effects */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEwIDAgTCAwIDAgMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
              
              {/* Fog effect */}
              <motion.div
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="absolute inset-0 bg-gradient-to-t from-[#4e2a4f]/30 to-transparent"
              />

              {/* Secret spirits */}
              {secrets.map((secret) => (
                <motion.div
                  key={secret.id}
                  onClick={() => handleFind(secret.id)}
                  className="absolute cursor-pointer"
                  style={{ left: `${secret.x}%`, top: `${secret.y}%` }}
                  animate={found.includes(secret.id) ? {
                    opacity: 1,
                    scale: [1, 1.2, 1],
                  } : {
                    opacity: revealed ? 0.4 : 0.1,
                  }}
                  whileHover={{ scale: 1.3, opacity: 0.8 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Ghost 
                    className={`w-8 h-8 transition-colors ${
                      found.includes(secret.id) 
                        ? "text-[#8bd5c4] drop-shadow-[0_0_15px_rgba(139,213,196,0.6)]" 
                        : "text-white/30"
                    }`} 
                  />
                  {found.includes(secret.id) && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 text-[10px] text-[#8bd5c4] whitespace-nowrap mt-1"
                    >
                      {secret.message}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </div>

            {allFound && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#4e2a4f]/30 border border-[#8bd5c4]/30 rounded-2xl p-6"
              >
                <p className="text-[#8bd5c4] font-bold text-xl mb-2">Sanctuary Discovered!</p>
                <p className="text-white/60">You have unveiled all the secrets of our sacred space.</p>
              </motion.div>
            )}

            <Button 
              onClick={resetGame}
              variant="outline"
              className="border-white/20 text-[#f2f8fc] hover:bg-white/10 bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Exploration
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
