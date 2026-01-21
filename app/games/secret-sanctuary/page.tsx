'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { Ghost, ArrowLeft, Lock, Unlock } from "lucide-react"
import { Button } from "@/components/ui/button"

const SECRETS = [
  { id: 1, hint: "The place we first met", answer: "love", unlocked: false },
  { id: 2, hint: "Our favorite shared activity", answer: "dance", unlocked: false },
  { id: 3, hint: "The word I think of when I see you", answer: "beautiful", unlocked: false },
  { id: 4, hint: "What makes our bond special", answer: "trust", unlocked: false },
]

export default function SecretSanctuaryGame() {
  const [secrets, setSecrets] = useState(SECRETS)
  const [currentGuess, setCurrentGuess] = useState('')
  const [selectedSecret, setSelectedSecret] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  const tryUnlock = () => {
    if (selectedSecret === null) return
    
    const secret = secrets.find(s => s.id === selectedSecret)
    if (secret && currentGuess.toLowerCase().includes(secret.answer.toLowerCase())) {
      setSecrets(secrets.map(s => 
        s.id === selectedSecret ? { ...s, unlocked: true } : s
      ))
      setMessage('Secret Unlocked!')
      setSelectedSecret(null)
      setCurrentGuess('')
    } else {
      setMessage('Not quite... try again!')
    }
    
    setTimeout(() => setMessage(''), 2000)
  }

  const unlockedCount = secrets.filter(s => s.unlocked).length

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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2d1e2f] to-[#4e2a4f] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <Ghost className="w-16 h-16 text-[#4e2a4f] drop-shadow-[0_0_20px_rgba(78,42,79,0.5)]" />
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight">
              Secret Sanctuary
            </h1>
            <p className="text-white/60 max-w-md">
              Navigate the sacred halls of memory. Unlock our secrets.
            </p>

            <div className="text-[#8bd5c4]">
              Secrets Unlocked: <span className="text-white font-bold">{unlockedCount}/{secrets.length}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              {secrets.map((secret) => (
                <motion.button
                  key={secret.id}
                  onClick={() => !secret.unlocked && setSelectedSecret(secret.id)}
                  whileHover={{ scale: secret.unlocked ? 1 : 1.05 }}
                  className={`p-4 rounded-xl border transition-all ${
                    secret.unlocked 
                      ? 'bg-[#4e2a4f]/30 border-[#4e2a4f] cursor-default' 
                      : selectedSecret === secret.id 
                        ? 'bg-[#4e2a4f]/20 border-[#4e2a4f]'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {secret.unlocked ? (
                      <Unlock className="w-5 h-5 text-[#8bd5c4]" />
                    ) : (
                      <Lock className="w-5 h-5 text-white/40" />
                    )}
                  </div>
                  <p className="text-sm text-white/60">
                    {secret.unlocked ? `Answer: ${secret.answer}` : secret.hint}
                  </p>
                </motion.button>
              ))}
            </div>

            {selectedSecret && (
              <div className="flex gap-2 w-full max-w-sm">
                <input
                  type="text"
                  value={currentGuess}
                  onChange={(e) => setCurrentGuess(e.target.value)}
                  placeholder="Enter your guess..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#4e2a4f]"
                  onKeyDown={(e) => e.key === 'Enter' && tryUnlock()}
                />
                <Button onClick={tryUnlock} className="bg-[#4e2a4f] hover:bg-[#5e3a5f]">
                  Unlock
                </Button>
              </div>
            )}

            {message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={message.includes('Unlocked') ? 'text-[#8bd5c4]' : 'text-[#c10157]'}
              >
                {message}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
