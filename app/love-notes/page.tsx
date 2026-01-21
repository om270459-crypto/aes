'use client'

import React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { PenLine, Heart, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NeonButton } from "@/components/NeonButton"

export default function LoveNotes() {
  const [sender, setSender] = useState('')
  const [content, setContent] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [notes, setNotes] = useState([
    { id: 1, sender: "Anonymous", content: "You light up my digital world every day." },
    { id: 2, sender: "Star Lover", content: "In the vastness of cyberspace, I found you." },
    { id: 3, sender: "Dreamer", content: "Our love transcends all firewalls." },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!sender.trim() || !content.trim()) return

    setNotes([{ id: Date.now(), sender, content }, ...notes])
    setSender('')
    setContent('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <PenLine className="w-8 h-8 text-[#8bd5c4]" />
            <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight">
              Love Notes
            </h1>
          </div>
          <p className="text-white/60 max-w-md mx-auto">
            Leave your mark in our digital sanctuary. Every message becomes part of our eternal love story.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="text-accent w-5 h-5" />
                <span className="text-accent font-bold tracking-widest uppercase text-xs">Write a Note</span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20">
                    <Heart className="w-8 h-8 text-primary" fill="currentColor" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Note Saved!</h3>
                  <p className="text-muted-foreground">Your love letter is now part of the sanctuary.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <label htmlFor="sender" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      id="sender"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      className="w-full bg-background/50 border border-white/10 rounded-lg p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all duration-300"
                      placeholder="Anonymous / Your Alias"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Your Message
                    </label>
                    <textarea
                      id="content"
                      rows={4}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full bg-background/50 border border-white/10 rounded-lg p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all duration-300 resize-none"
                      placeholder="Write your love note..."
                    />
                  </div>

                  <NeonButton type="submit" className="w-full" variant="primary">
                    <Send className="w-4 h-4 mr-2" />
                    Send Note
                  </NeonButton>
                </form>
              )}
            </div>
          </motion.div>

          {/* Notes list */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-bold text-[#8bd5c4] uppercase tracking-widest">Recent Notes</h2>
            
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {notes.map((note, i) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-[#c10157]" />
                    <span className="text-sm font-medium text-[#8bd5c4]">{note.sender}</span>
                  </div>
                  <p className="text-white/80 italic">"{note.content}"</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

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
