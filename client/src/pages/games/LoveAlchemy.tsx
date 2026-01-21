'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { Wand2, ArrowLeft, RotateCcw, Heart, Star, Sparkles, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const ingredients = [
  { id: "heart", icon: Heart, color: "#c10157", name: "Love Essence" },
  { id: "star", icon: Star, color: "#FFD700", name: "Starlight" },
  { id: "sparkle", icon: Sparkles, color: "#8bd5c4", name: "Magic Dust" },
  { id: "flame", icon: Flame, color: "#b45e67", name: "Passion Fire" },
];

const recipes: Record<string, { name: string; description: string }> = {
  "heart-heart-heart": { name: "Pure Love Elixir", description: "Concentrated essence of devotion" },
  "star-star-star": { name: "Celestial Nectar", description: "Bottled starlight dreams" },
  "heart-star-sparkle": { name: "Enchanted Romance", description: "The perfect blend of love and magic" },
  "flame-flame-flame": { name: "Eternal Passion", description: "Burns forever bright" },
  "heart-flame-sparkle": { name: "Magical Desire", description: "Love ignited by wonder" },
};

export default function LoveAlchemyGame() {
  const [cauldron, setCauldron] = useState<string[]>([]);
  const [result, setResult] = useState<{ name: string; description: string } | null>(null);
  const [brewing, setBrewing] = useState(false);

  const addIngredient = (id: string) => {
    if (cauldron.length < 3 && !brewing) {
      setCauldron(prev => [...prev, id]);
    }
  };

  const brew = () => {
    if (cauldron.length < 3) return;
    setBrewing(true);
    
    setTimeout(() => {
      const key = cauldron.sort().join("-");
      const potion = recipes[key] || { 
        name: "Mystery Potion", 
        description: "An unknown concoction with unpredictable effects" 
      };
      setResult(potion);
      setBrewing(false);
    }, 2000);
  };

  const resetGame = () => {
    setCauldron([]);
    setResult(null);
    setBrewing(false);
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4e0b37] to-[#c10157] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <Wand2 className="w-16 h-16 text-[#c10157] drop-shadow-[0_0_20px_rgba(193,1,87,0.5)]" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight" style={{ fontFamily: 'Walkway, sans-serif' }}>
                Love Alchemy
              </h1>
              <p className="text-white/60 max-w-md">
                Brew the perfect potion of affection. Combine three ingredients to create magical elixirs.
              </p>
            </div>

            {/* Ingredients */}
            <div className="flex gap-4 flex-wrap justify-center">
              {ingredients.map((ing) => (
                <motion.button
                  key={ing.id}
                  onClick={() => addIngredient(ing.id)}
                  disabled={cauldron.length >= 3 || brewing}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ing.icon className="w-8 h-8" style={{ color: ing.color }} />
                  <span className="text-xs text-white/60">{ing.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Cauldron */}
            <div className="relative">
              <motion.div 
                animate={brewing ? { scale: [1, 1.05, 1] } : {}}
                transition={{ repeat: brewing ? Infinity : 0, duration: 0.5 }}
                className="w-40 h-32 rounded-b-full bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] border-4 border-[#3a3a3a] relative overflow-hidden"
              >
                {/* Liquid */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#c10157]/60 to-[#4e0b37]/40"
                  animate={{ height: `${(cauldron.length / 3) * 80}%` }}
                />
                
                {/* Bubbles */}
                <AnimatePresence>
                  {brewing && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ y: 100, opacity: 0 }}
                          animate={{ y: -20, opacity: [0, 1, 0] }}
                          exit={{ opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                          className="absolute w-3 h-3 rounded-full bg-white/30"
                          style={{ left: `${20 + i * 15}%` }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Ingredients in cauldron */}
                <div className="absolute inset-0 flex items-center justify-center gap-1 flex-wrap p-4">
                  {cauldron.map((id, i) => {
                    const ing = ingredients.find(x => x.id === id)!;
                    return (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                      >
                        <ing.icon className="w-6 h-6" style={{ color: ing.color }} />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
              
              {/* Cauldron base */}
              <div className="w-44 h-4 bg-[#2a2a2a] rounded-b-lg mx-auto" />
            </div>

            {/* Status */}
            <p className="text-white/60 text-sm">
              {brewing ? "Brewing..." : `Ingredients: ${cauldron.length}/3`}
            </p>

            {/* Result */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#c10157]/20 border border-[#c10157]/30 rounded-2xl p-6 max-w-sm"
                >
                  <p className="text-[#c10157] font-bold text-xl mb-2">{result.name}</p>
                  <p className="text-white/60">{result.description}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex gap-4">
              <Button 
                onClick={brew}
                disabled={cauldron.length < 3 || brewing}
                className="bg-gradient-to-r from-[#4e0b37] to-[#c10157]"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Brew Potion
              </Button>
              <Button 
                onClick={resetGame}
                variant="outline"
                className="border-white/20 text-[#f2f8fc] hover:bg-white/10 bg-transparent"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
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
