'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { Camera, ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const MOMENTS = [
  { id: 1, title: "First Meeting", description: "The moment our eyes first met", color: "from-pink-500 to-rose-500" },
  { id: 2, title: "First Laugh", description: "When we shared our first genuine laugh", color: "from-cyan-500 to-blue-500" },
  { id: 3, title: "First Adventure", description: "Our first journey into the unknown", color: "from-green-500 to-teal-500" },
  { id: 4, title: "First Promise", description: "The words that bound our hearts", color: "from-purple-500 to-indigo-500" },
]

export default function CapturedMomentGame() {
  const [capturedMoments, setCapturedMoments] = useState<number[]>([])
  const [currentMoment, setCurrentMoment] = useState<typeof MOMENTS[0] | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)

  const captureMoment = (moment: typeof MOMENTS[0]) => {
    if (capturedMoments.includes(moment.id)) return
    
    setIsCapturing(true)
    setCurrentMoment(moment)
    
    setTimeout(() => {
      setCapturedMoments([...capturedMoments, moment.id])
      setIsCapturing(false)
    }, 1500)
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2a3294] to-[#4ba4dc] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <Camera className="w-16 h-16 text-[#4ba4dc] drop-shadow-[0_0_20px_rgba(75,164,220,0.5)]" />
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight">
              Captured Moment
            </h1>
            <p className="text-white/60 max-w-md">
              Freeze precious frames of our eternal love story.
            </p>

            <div className="text-[#8bd5c4]">
              Moments Captured: <span className="text-white font-bold">{capturedMoments.length}/{MOMENTS.length}</span>
            </div>

            {/* Camera viewfinder */}
            {isCapturing && currentMoment && (
              <motion.div
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/80 z-20"
              >
                <motion.div
                  animate={{ scale: [1, 0.9, 1] }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="w-32 h-32 border-4 border-white rounded-lg mb-4 flex items-center justify-center">
                    <Heart className="w-16 h-16 text-[#c10157]" fill="currentColor" />
                  </div>
                  <p className="text-white font-bold">Capturing...</p>
                </motion.div>
              </motion.div>
            )}

            {/* Moments grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              {MOMENTS.map((moment) => {
                const isCaptured = capturedMoments.includes(moment.id)
                return (
                  <motion.button
                    key={moment.id}
                    onClick={() => captureMoment(moment)}
                    disabled={isCaptured || isCapturing}
                    whileHover={{ scale: isCaptured ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-6 rounded-xl border transition-all relative overflow-hidden ${
                      isCaptured 
                        ? 'border-[#4ba4dc]/50' 
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${moment.color} ${isCaptured ? 'opacity-30' : 'opacity-10'}`} />
                    <div className="relative z-10">
                      <div className="flex items-center justify-center mb-3">
                        {isCaptured ? (
                          <Heart className="w-8 h-8 text-[#c10157]" fill="currentColor" />
                        ) : (
                          <Camera className="w-8 h-8 text-white/40" />
                        )}
                      </div>
                      <h3 className="font-bold text-white mb-1">{moment.title}</h3>
                      <p className="text-xs text-white/60">{moment.description}</p>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {capturedMoments.length === MOMENTS.length && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold text-[#8bd5c4] mb-2">All Moments Captured!</h2>
                <p className="text-white/60">Our love story is eternally preserved</p>
              </motion.div>
            )}

            <Button 
              onClick={() => setCapturedMoments([])}
              variant="outline" 
              className="border-white/20 text-white/60 bg-transparent hover:bg-white/5"
            >
              Reset Album
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
