'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { Camera, ArrowLeft, Heart, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const scenes = [
  { id: 1, name: "Starlit Night", bg: "from-[#0a0f1a] to-[#1a1a2e]", icon: Star },
  { id: 2, name: "Rose Garden", bg: "from-[#2d1e2f] to-[#4e2a4f]", icon: Heart },
  { id: 3, name: "Magic Hour", bg: "from-[#4a3f6b] to-[#ff6b6b]", icon: Sparkles },
  { id: 4, name: "Ocean Dreams", bg: "from-[#0b5379] to-[#8bd5c4]", icon: Star },
];

export default function CapturedMomentGame() {
  const [photos, setPhotos] = useState<{ scene: typeof scenes[0]; timestamp: number }[]>([]);
  const [flash, setFlash] = useState(false);
  const [currentScene, setCurrentScene] = useState(scenes[0]);

  const capturePhoto = () => {
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
      setPhotos(prev => [...prev, { scene: currentScene, timestamp: Date.now() }].slice(-6));
    }, 150);
  };

  const clearGallery = () => {
    setPhotos([]);
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2a3294] to-[#4ba4dc] rounded-t-3xl" />
          
          <div className="flex flex-col items-center text-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <Camera className="w-16 h-16 text-[#4ba4dc] drop-shadow-[0_0_20px_rgba(75,164,220,0.5)]" />
              <h1 className="text-4xl md:text-5xl font-bold text-[#f2f8fc] tracking-tight" style={{ fontFamily: 'Walkway, sans-serif' }}>
                Captured Moment
              </h1>
              <p className="text-white/60 max-w-md">
                Freeze a frame of our eternal now. Select a scene and capture the moment.
              </p>
            </div>

            {/* Scene selector */}
            <div className="flex gap-2 flex-wrap justify-center">
              {scenes.map((scene) => (
                <Button
                  key={scene.id}
                  onClick={() => setCurrentScene(scene)}
                  variant={currentScene.id === scene.id ? "default" : "outline"}
                  size="sm"
                  className={currentScene.id === scene.id 
                    ? "bg-gradient-to-r " + scene.bg 
                    : "border-white/20 text-[#f2f8fc]"
                  }
                >
                  <scene.icon className="w-4 h-4 mr-1" />
                  {scene.name}
                </Button>
              ))}
            </div>

            {/* Viewfinder */}
            <div className="relative">
              <motion.div 
                className={`w-64 h-48 md:w-80 md:h-60 rounded-2xl bg-gradient-to-br ${currentScene.bg} border-4 border-[#2a2a2a] relative overflow-hidden`}
              >
                {/* Viewfinder frame */}
                <div className="absolute inset-4 border-2 border-white/20 rounded-lg" />
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-white/40" />
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-white/40" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-white/40" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-white/40" />
                
                {/* Center focus */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <currentScene.icon className="w-12 h-12 text-white/60" />
                </div>

                {/* Scene name */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/60 bg-black/30 px-3 py-1 rounded-full">
                  {currentScene.name}
                </div>

                {/* Flash effect */}
                <AnimatePresence>
                  {flash && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white z-50"
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Shutter button */}
              <motion.button
                onClick={capturePhoto}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white border-4 border-[#4ba4dc] shadow-lg flex items-center justify-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#4ba4dc]" />
              </motion.button>
            </div>

            {/* Photo gallery */}
            <div className="w-full mt-8">
              <p className="text-white/60 text-sm mb-4">Gallery ({photos.length}/6)</p>
              <div className="grid grid-cols-3 gap-3">
                <AnimatePresence>
                  {photos.map((photo, i) => (
                    <motion.div
                      key={photo.timestamp}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`aspect-video rounded-lg bg-gradient-to-br ${photo.scene.bg} border border-white/10 flex items-center justify-center`}
                    >
                      <photo.scene.icon className="w-6 h-6 text-white/60" />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {[...Array(Math.max(0, 6 - photos.length))].map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-video rounded-lg bg-white/5 border border-white/10 border-dashed" />
                ))}
              </div>
            </div>

            {photos.length > 0 && (
              <Button 
                onClick={clearGallery}
                variant="outline"
                className="border-white/20 text-[#f2f8fc] hover:bg-white/10 bg-transparent"
              >
                Clear Gallery
              </Button>
            )}

            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8bd5c4] opacity-40">
              Digital Sanctuary Protocol
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
