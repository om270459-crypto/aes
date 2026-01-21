'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, MessageCircle, Gamepad2, Timer, ImageIcon, PenLine, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

const NAV_ITEMS = [
  { href: "/", label: "Sanctuary", icon: Heart },
  { href: "/games", label: "Games", icon: Gamepad2 },
  { href: "/messages", label: "Poetry", icon: MessageCircle },
  { href: "/countdown", label: "Time", icon: Timer },
  { href: "/memories", label: "Memories", icon: ImageIcon },
  { href: "/love-notes", label: "Notes", icon: PenLine },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  if (isMobile) {
    return (
      <>
        <nav className="fixed top-6 right-6 z-[110]">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-[#f2f8fc] shadow-2xl hover:bg-white/20 transition-all"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[100] bg-[#05141f]/95 backdrop-blur-2xl flex flex-col p-12"
            >
              <div className="flex flex-col gap-8 mt-12">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#8bd5c4] uppercase tracking-[0.3em] text-xs font-bold mb-4"
                >
                  Sanctuary Menu
                </motion.span>
                {NAV_ITEMS.map((item, i) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link href={item.href} className="flex items-center gap-6 group">
                        <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                          isActive 
                            ? "bg-[#c10157]/20 border-[#c10157] shadow-[0_0_20px_rgba(193,1,87,0.3)]" 
                            : "bg-white/5 border-white/10 group-hover:bg-white/10"
                        }`}>
                          <item.icon className={`w-6 h-6 ${isActive ? "text-[#c10157]" : "text-[#f2f8fc]/60"}`} />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-2xl font-bold tracking-tight transition-colors ${
                            isActive ? "text-[#f2f8fc]" : "text-[#f2f8fc]/40"
                          }`}>
                            {item.label}
                          </span>
                          <span className="text-[10px] uppercase tracking-widest text-[#8bd5c4] opacity-40">
                            {item.href === "/" ? "Heart of the Sanctuary" : `Digital ${item.label}`}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-auto pt-12 border-t border-white/10"
              >
                <p className="text-[#f2f8fc]/40 text-sm italic">
                  "Our love is the only frequency that matters."
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-2xl">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href} className="relative group px-3 py-2 flex flex-col items-center gap-1">
              <item.icon 
                className={`w-5 h-5 transition-colors duration-300 ${
                  isActive ? "text-[#c10157]" : "text-[#f2f8fc]/60 group-hover:text-[#f2f8fc]"
                }`} 
              />
              <span className={`text-[10px] uppercase tracking-widest transition-colors duration-300 ${
                isActive ? "text-[#f2f8fc]" : "text-[#f2f8fc]/40 group-hover:text-[#f2f8fc]/80"
              }`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-white/5 rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
