import { motion } from "framer-motion";
import { Background3D } from "@/components/Background3D";
import { useMessages } from "@/hooks/use-messages";
import { Loader2, Quote, User } from "lucide-react";
import { format } from "date-fns";
import { NeonButton } from "@/components/NeonButton";
import { Link } from "wouter";

export default function Messages() {
  const { data: messages, isLoading, error } = useMessages();

  // Sort messages by newest first
  const sortedMessages = messages?.sort((a, b) => {
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });

  return (
    <div className="min-h-screen relative pt-32 pb-24 px-4 overflow-hidden">
      <Background3D />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-200 text-glow-cyan"
          >
            LOVE ARCHIVE
          </motion.h1>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Digital echoes of affection preserved for eternity.
          </motion.p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
            <Loader2 className="w-12 h-12 text-accent animate-spin" />
            <p className="text-accent animate-pulse">Decrypting signals...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 p-8 glass-panel rounded-xl">
            <p>Connection interrupted. Unable to retrieve archive.</p>
          </div>
        ) : sortedMessages?.length === 0 ? (
          <div className="text-center py-24 glass-panel rounded-2xl max-w-2xl mx-auto">
            <p className="text-2xl text-muted-foreground mb-8">The archive is empty.</p>
            <Link href="/">
              <NeonButton variant="primary">Be the First</NeonButton>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMessages?.map((msg, idx) => (
              <MessageCard key={msg.id} message={msg} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MessageCard({ message, index }: { message: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-panel p-6 rounded-xl flex flex-col h-full group hover:border-accent/30 transition-colors"
    >
      <div className="mb-4 text-primary/40 group-hover:text-primary transition-colors">
        <Quote className="w-8 h-8 rotate-180" />
      </div>
      
      <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light mb-8 flex-grow">
        {message.content}
      </p>
      
      <div className="mt-auto border-t border-white/5 pt-4 flex justify-between items-end">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
            <User className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="text-sm font-bold text-white font-display uppercase tracking-wider">{message.sender}</p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(message.createdAt || new Date()), "MMM d, yyyy")}
            </p>
          </div>
        </div>
        
        {/* Decorative ID number */}
        <span className="text-[10px] font-mono text-white/10 group-hover:text-accent/30 transition-colors">
          MSG_ID_{message.id.toString().padStart(4, '0')}
        </span>
      </div>
    </motion.div>
  );
}
