'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import { ImageIcon, Heart, X } from "lucide-react"

const MEMORIES = [
  { id: 1, title: "First Digital Connection", date: "Day 1", description: "The moment our frequencies aligned", color: "from-pink-500/20 to-rose-500/20" },
  { id: 2, title: "Shared Laughter", date: "Day 7", description: "When we couldn't stop laughing at 3am", color: "from-cyan-500/20 to-blue-500/20" },
  { id: 3, title: "First Promise", date: "Day 30", description: "Words that bound our hearts forever", color: "from-purple-500/20 to-indigo-500/20" },
  { id: 4, title: "Adventure Begins", date: "Day 60", description: "Our first journey into the unknown", color: "from-green-500/20 to-teal-500/20" },
  { id: 5, title: "Difficult Times", date: "Day 90", description: "We grew stronger together", color: "from-orange-500/20 to-amber-500/20" },
  { id: 6, title: "Forever Moment", date: "Day 365", description: "When eternity felt too short", color: "from-red-500/20 to-pink-500/20" },
]

export default function Memories() {
  const [selectedMemory, setSelectedMemory] = useState<typeof MEMORIES[0] | null>(null)

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <ImageIcon className="w-8 h-8 text-[#8bd5c4]" />
            <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight">
              Memories
            </h1>
          </div>
          <p className="text-white/60 max-w-md mx-auto">
            A gallery of our most precious moments, preserved in the digital sanctuary.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {MEMORIES.map((memory, i) => (
            <motion.button
              key={memory.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedMemory(memory)}
              className={`aspect-square rounded-2xl border border-white/10 bg-gradient-to-br ${memory.color} backdrop-blur-xl overflow-hidden relative group`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <Heart className="w-10 h-10 text-white/30 mb-3 group-hover:text-[#c10157] group-hover:scale-110 transition-all" />
                <h3 className="text-lg font-bold text-white mb-1">{memory.title}</h3>
                <span className="text-xs text-[#8bd5c4]">{memory.date}</span>
              </div>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all" />
            </motion.button>
          ))}
        </div>

        {/* Modal */}
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-gradient-to-br ${selectedMemory.color} border border-white/20 rounded-3xl p-8 md:p-12 max-w-lg w-full relative`}
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                <Heart className="w-16 h-16 text-[#c10157] mx-auto mb-4" fill="currentColor" />
                <span className="text-sm text-[#8bd5c4] uppercase tracking-widest">{selectedMemory.date}</span>
                <h2 className="text-3xl font-bold text-white mt-2 mb-4">{selectedMemory.title}</h2>
                <p className="text-white/80 text-lg italic">"{selectedMemory.description}"</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-[10px] uppercase tracking-[0.2em] text-[#8bd5c4] opacity-40 mt-12"
        >
          Digital Sanctuary Protocol
        </motion.p>
      </div>
    </div>
  )
}
