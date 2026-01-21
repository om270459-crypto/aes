'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { Music, ArrowLeft, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

const NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const NOTE_COLORS = {
  'C': 'bg-red-500',
  'D': 'bg-orange-500',
  'E': 'bg-yellow-500',
  'F': 'bg-green-500',
  'G': 'bg-cyan-500',
  'B': 'bg-blue-500',
  'A': 'bg-purple-500',
}

export default function MelodicLoveGame() {
  const [melody, setMelody] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentNote, setCurrentNote] = useState<string | null>(null)
  const [melodyCount, setMelodyCount] = useState(0)

  const addNote = (note: string) => {
    if (melody.length >= 8) return
    setMelody([...melody, note])
    setCurrentNote(note)
    setTimeout(() => setCurrentNote(null), 200)
  }

  const playMelody = async () => {
    if (melody.length === 0) return
    setIsPlaying(true)
    
    for (const note of melody) {
      setCurrentNote(note)
      await new Promise(resolve => setTimeout(resolve, 400))
      setCurrentNote(null)
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    setIsPlaying(false)
    setMelodyCount(c => c + 1)
  }

  const clearMelody = () => {
    setMelody([])
    setCurrentNote(null)
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-transparent relative z-10">
      <div className="max-w-4xl mx-auto">
        <Link href="/games" className="inline-flex items-center gap-2 text-[#8bd5c4] hover:text-[#f2f8fc] transition-colors mb-8 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-widest">Back to Games</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0a272d] to-[#124a57] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <Music className="w-16 h-16 text-[#8bd5c4] drop-shadow-[0_0_20px_rgba(139,213,196,0.5)]" />
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight">
              Melodic Love
            </h1>
            <p className="text-white/60 max-w-md">
              Compose a melody that represents our love story.
            </p>

            <div className="text-[#8bd5c4]">
              Melodies Composed: <span className="text-white font-bold">{melodyCount}</span>
            </div>

            {/* Current melody display */}
            <div className="flex gap-2 min-h-[60px] items-center">
              {melody.length === 0 ? (
                <span className="text-white/40 text-sm">Click notes to compose...</span>
              ) : (
                melody.map((note, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-10 h-10 rounded-lg ${NOTE_COLORS[note as keyof typeof NOTE_COLORS]} flex items-center justify-center text-white font-bold ${
                      currentNote === note && isPlaying ? 'ring-2 ring-white scale-110' : ''
                    }`}
                  >
                    {note}
                  </motion.div>
                ))
              )}
            </div>

            {/* Piano keys */}
            <div className="flex gap-1">
              {NOTES.map((note) => (
                <motion.button
                  key={note}
                  onClick={() => addNote(note)}
                  disabled={isPlaying || melody.length >= 8}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-24 rounded-b-lg transition-all ${NOTE_COLORS[note as keyof typeof NOTE_COLORS]} ${
                    currentNote === note ? 'scale-95 brightness-125' : ''
                  } ${isPlaying ? 'opacity-50' : ''}`}
                >
                  <span className="text-white font-bold">{note}</span>
                </motion.button>
              ))}
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={playMelody}
                disabled={melody.length === 0 || isPlaying}
                className="bg-gradient-to-r from-[#0a272d] to-[#124a57] hover:opacity-90 text-white"
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? 'Playing...' : 'Play Melody'}
              </Button>
              <Button onClick={clearMelody} variant="outline" className="border-white/20 text-white/60 bg-transparent hover:bg-white/5">
                Clear
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
