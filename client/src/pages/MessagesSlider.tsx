import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const MESSAGES = [
  {
    id: 1,
    text: "In the digital void, our love is the only frequency that matters. A resonance that transcends circuits and code.",
    author: "Eternal Resonance"
  },
  {
    id: 2,
    text: "You are my sanctuary in a world of static. A quiet glow amidst the neon chaos of the future.",
    author: "Silent Glow"
  },
  {
    id: 3,
    text: "Every byte of my being yearns for your interface. A connection forged in the heart of a dying star.",
    author: "Stellar Sync"
  },
  {
    id: 4,
    text: "Across the infinite sprawl of the datascape, I would find you. Our love is the ultimate algorithm.",
    author: "Infinite Loop"
  }
];

export default function MessageSlider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % MESSAGES.length);
  const prev = () => setIndex((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent relative z-10">
      <div className="max-w-4xl w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 300 }}
            className="bg-white/5 border-white/10 backdrop-blur-2xl p-12 md:p-20 rounded-3xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4e0b37] via-[#c10157] to-[#4e0b37]" />
            <Heart className="w-16 h-16 text-[#c10157] mx-auto mb-8 animate-pulse" />
            <p className="text-2xl md:text-4xl text-[#f2f8fc] leading-relaxed mb-8 italic" style={{ fontFamily: 'Walkway, sans-serif' }}>
              "{MESSAGES[index].text}"
            </p>
            <span className="text-xl text-[#8bd5c4] font-medium">— {MESSAGES[index].author}</span>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-8 mt-12">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={prev}
            className="w-16 h-16 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[#f2f8fc]"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={next}
            className="w-16 h-16 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[#f2f8fc]"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </div>
  );
}
