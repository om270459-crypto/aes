import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Background3D } from "@/components/Background3D";
import { NeonButton } from "@/components/NeonButton";
import { Heart, Send, Sparkles } from "lucide-react";
import { useCreateMessage } from "@/hooks/use-messages";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema } from "@shared/schema";
import { Link } from "wouter";

// Extended schema for form validation
const formSchema = insertMessageSchema.extend({
  sender: z.string().min(2, "Name must be at least 2 characters").max(50),
  content: z.string().min(5, "Message must be at least 5 characters").max(500),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background3D />
      
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
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
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
            {/* Decorative Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-accent/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="text-accent w-5 h-5" />
                <span className="text-accent font-display font-bold tracking-widest uppercase text-xs">Interactive Terminal</span>
              </div>
              
              <h2 className="text-4xl font-display font-bold mb-6 text-white">Leave a Signal</h2>
              <p className="text-muted-foreground mb-8">
                Broadcast your affection into the digital ether. Your message will become a permanent part of this sanctuary.
              </p>

              <MessageForm />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 text-center text-muted-foreground text-sm relative z-10">
        <p>© 2025 Digital Neon Sanctuary. Crafted with <Heart className="inline w-3 h-3 text-primary mx-1" /> by You.</p>
      </footer>
    </div>
  );
}

function NarrativeSection({ 
  title, 
  subtitle, 
  content, 
  alignment = "left",
  color = "cyan"
}: { 
  title: string, 
  subtitle: string, 
  content: string, 
  alignment?: "left" | "right",
  color?: "cyan" | "pink"
}) {
  const isRight = alignment === "right";
  const glowColor = color === "pink" ? "text-glow" : "text-glow-cyan";
  const accentColor = color === "pink" ? "text-primary" : "text-accent";

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
          <span className={`${accentColor} font-display font-bold tracking-widest uppercase text-sm`}>{subtitle}</span>
        </div>
        
        <h2 className={`text-5xl md:text-7xl font-display font-bold mb-8 text-white ${glowColor}`}>
          {title}
        </h2>
        
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
          {content}
        </p>
      </motion.div>
    </section>
  );
}

function MessageForm() {
  const { toast } = useToast();
  const createMessage = useCreateMessage();
  const [submitted, setSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createMessage.mutateAsync(data);
      setSubmitted(true);
      toast({
        title: "Signal Broadcasted",
        description: "Your message is now floating in the digital sanctuary.",
        className: "bg-background border-accent text-accent",
      });
      reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Transmission Failed",
        description: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 space-y-6"
      >
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20 shadow-[0_0_30px_rgba(255,0,85,0.2)]">
          <Heart className="w-10 h-10 text-primary animate-pulse" fill="currentColor" />
        </div>
        <h3 className="text-2xl font-display font-bold text-white">Signal Received</h3>
        <p className="text-muted-foreground">Your love letter has been digitized.</p>
        <div className="flex justify-center gap-4 pt-4">
          <NeonButton variant="ghost" onClick={() => setSubmitted(false)}>
            Write Another
          </NeonButton>
          <Link href="/messages">
            <NeonButton variant="cyan">
              View All Signals
            </NeonButton>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="sender" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Identify Yourself
        </label>
        <input
          {...register("sender")}
          id="sender"
          className="w-full bg-background/50 border border-white/10 rounded-lg p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all duration-300"
          placeholder="Your Name / Alias"
        />
        {errors.sender && <p className="text-primary text-xs mt-1">{errors.sender.message}</p>}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Your Message
        </label>
        <textarea
          {...register("content")}
          id="content"
          rows={4}
          className="w-full bg-background/50 border border-white/10 rounded-lg p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all duration-300 resize-none"
          placeholder="Write your digital love letter here..."
        />
        {errors.content && <p className="text-primary text-xs mt-1">{errors.content.message}</p>}
      </div>
      
      <div className="pt-4">
        <NeonButton 
          type="submit" 
          className="w-full" 
          variant="primary"
          isLoading={createMessage.isPending}
        >
          <Send className="w-4 h-4 mr-2" />
          Broadcast Signal
        </NeonButton>
      </div>
    </form>
  );
}
