'use client';

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { Link } from "wouter";
import { Music, ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const notes = [
  { key: "C", color: "#c10157", freq: 261.63 },
  { key: "D", color: "#b45e67", freq: 293.66 },
  { key: "E", color: "#8bd5c4", freq: 329.63 },
  { key: "F", color: "#4ba4dc", freq: 349.23 },
  { key: "G", color: "#3f5e96", freq: 392.00 },
  { key: "A", color: "#4e2a4f", freq: 440.00 },
  { key: "B", color: "#124a57", freq: 493.88 },
];

export default function MelodicLoveGame() {
  const [playedNotes, setPlayedNotes] = useState<string[]>([]);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const playNote = useCallback((note: typeof notes[0]) => {
    setActiveNote(note.key);
    setPlayedNotes(prev => [...prev.slice(-19), note.key]);
    setScore(s => s + 1);

    // Create audio context and play note
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = note.freq;
      oscillator.type = "sine";
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      // Audio not supported
    }

    setTimeout(() => setActiveNote(null), 200);
  }, []);

  const resetGame = () => {
    setPlayedNotes([]);
    setScore(0);
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0a272d] to-[#124a57] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <Music className="w-16 h-16 text-[#124a57] drop-shadow-[0_0_20px_rgba(18,74,87,0.5)]" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight" style={{ fontFamily: 'Walkway, sans-serif' }}>
                Melodic Love
              </h1>
              <p className="text-white/60 max-w-md">
                Play the symphony of our connection. Create beautiful melodies with the piano keys.
              </p>
            </div>

            <div className="text-white/60">
              Notes Played: <span className="text-[#8bd5c4] font-bold">{score}</span>
            </div>

            {/* Note visualization */}
            <div className="w-full h-24 bg-white/5 rounded-xl border border-white/10 overflow-hidden flex items-end justify-center gap-1 p-2">
              {playedNotes.map((note, i) => {
                const noteData = notes.find(n => n.key === note)!;
                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "100%", opacity: 1 - (playedNotes.length - i - 1) * 0.05 }}
                    className="w-3 rounded-t"
                    style={{ backgroundColor: noteData.color }}
                  />
                );
              })}
            </div>

            {/* Piano keyboard */}
            <div className="flex justify-center gap-1">
              {notes.map((note) => (
                <motion.button
                  key={note.key}
                  onClick={() => playNote(note)}
                  animate={activeNote === note.key ? { scale: 0.95, y: 4 } : { scale: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <div 
                    className={`w-12 md:w-16 h-32 md:h-40 rounded-b-lg transition-all ${
                      activeNote === note.key 
                        ? "bg-white/90" 
                        : "bg-gradient-to-b from-white to-gray-100"
                    }`}
                    style={{
                      boxShadow: activeNote === note.key 
                        ? `0 0 20px ${note.color}` 
                        : "0 4px 6px rgba(0,0,0,0.3)"
                    }}
                  >
                    <span 
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 font-bold text-lg"
                      style={{ color: note.color }}
                    >
                      {note.key}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Floating music notes animation */}
            <div className="flex gap-8">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                >
                  <Music className="w-6 h-6 text-[#124a57]" />
                </motion.div>
              ))}
            </div>

            <Button 
              onClick={resetGame}
              variant="outline"
              className="border-white/20 text-[#f2f8fc] hover:bg-white/10 bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear Melody
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
