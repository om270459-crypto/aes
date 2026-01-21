import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MEMORIES = [
  { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2000", title: "Eternal Glow" },
  { url: "https://images.unsplash.com/photo-1516589174184-c685266e430c?q=80&w=2000", title: "Midnight Whispers" },
  { url: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=2000", title: "Digital Bloom" },
  { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000", title: "Neon Sanctuary" },
];

export default function Memories() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % MEMORIES.length);
  const prev = () => setIndex((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent relative z-10 overflow-hidden">
      <div className="relative w-full max-w-5xl aspect-[16/10] px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
            className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <img 
              src={MEMORIES[index].url} 
              alt={MEMORIES[index].title}
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#100c08] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-12 left-12">
              <h3 className="text-4xl md:text-6xl font-bold text-[#f2f8fc] mb-2" style={{ fontFamily: 'Walkway, sans-serif' }}>
                {MEMORIES[index].title}
              </h3>
            </div>
          </motion.div>
        </AnimatePresence>

        <button 
          onClick={prev}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-[#f2f8fc] flex items-center justify-center hover:bg-black/60 transition-colors z-20"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button 
          onClick={next}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-[#f2f8fc] flex items-center justify-center hover:bg-black/60 transition-colors z-20"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
