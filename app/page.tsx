'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { NeonButton } from "@/components/NeonButton"
import { Heart, Send, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Section 1: Hero */}
      <section className="h-screen flex flex-col items-center justify-center relative px-4">
        <motion.div 
          style={{ opacity, scale, y }}
          className="text-center z-10 space-y-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              DIGITAL NEON
              <br />
              <span className="text-glow text-primary">VALENTINE</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto"
          >
            A futuristic sanctuary for eternal love letters written in code and light.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <div className="animate-bounce mt-12 text-accent/50">
              <span className="text-sm tracking-[0.3em] uppercase">Scroll to begin</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2: Narrative - The Spark */}
      <NarrativeSection 
        title="The Spark"
        subtitle="Where it all begins"
        content="In the vast digital void, a single connection creates infinite possibilities. Like particles colliding in a collider, our paths crossed and created a new universe of meaning."
        alignment="left"
        color="cyan"
      />

      {/* Section 3: Narrative - The Journey */}
      <NarrativeSection 
        title="The Journey"
        subtitle="Through time and space"
        content="We travel through nebulas of uncertainty and galaxies of joy. Every moment shared is a star added to our personal constellation, burning bright against the darkness."
        alignment="right"
        color="pink"
      />

      {/* Section 4: Send Love Interaction */}
      <section className="min-h-screen flex items-center justify-center py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-0" />
        
        <div className="w-full max-w-xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="text-accent w-5 h-5" />
                <span className="text-accent font-bold tracking-widest uppercase text-xs">Interactive Terminal</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-6 text-white">Explore the Sanctuary</h2>
              <p className="text-muted-foreground mb-8">
                Discover interactive games, love notes, and memories in our digital love sanctuary.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/games" className="flex-1">
                  <NeonButton variant="primary" className="w-full">
                    Play Games
                  </NeonButton>
                </Link>
                <Link href="/love-notes" className="flex-1">
                  <NeonButton variant="cyan" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Love Notes
                  </NeonButton>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 text-center text-muted-foreground text-sm relative z-10">
        <p>Digital Neon Sanctuary. Crafted with <Heart className="inline w-3 h-3 text-primary mx-1" /> by You.</p>
      </footer>
    </div>
  )
}

function NarrativeSection({ 
  title, 
  subtitle, 
  content, 
  alignment = "left",
  color = "cyan"
}: { 
  title: string
  subtitle: string
  content: string
  alignment?: "left" | "right"
  color?: "cyan" | "pink"
}) {
  const isRight = alignment === "right"
  const glowColor = color === "pink" ? "text-glow" : "text-glow-cyan"
  const accentColor = color === "pink" ? "text-primary" : "text-accent"

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 md:px-24 py-24 relative z-10">
      <motion.div 
        initial={{ opacity: 0, x: isRight ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`flex flex-col ${isRight ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} max-w-4xl w-full`}
      >
        <div className={`flex items-center gap-4 mb-4 ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`h-px w-24 ${color === "pink" ? "bg-primary" : "bg-accent"}`} />
          <span className={`${accentColor} font-bold tracking-widest uppercase text-sm`}>{subtitle}</span>
        </div>
        
        <h2 className={`text-5xl md:text-7xl font-bold mb-8 text-white ${glowColor}`}>
          {title}
        </h2>
        
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
          {content}
        </p>
      </motion.div>
    </section>
  )
}
