import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'cyan' | 'ghost';
  isLoading?: boolean;
}

export function NeonButton({ 
  children, 
  className, 
  variant = 'primary', 
  isLoading,
  disabled,
  ...props 
}: NeonButtonProps) {
  
  const variants = {
    primary: "border-primary text-primary hover:bg-primary/10 shadow-[0_0_15px_rgba(255,0,85,0.3)] hover:shadow-[0_0_25px_rgba(255,0,85,0.6)]",
    cyan: "border-accent text-accent hover:bg-accent/10 shadow-[0_0_15px_rgba(23,186,206,0.3)] hover:shadow-[0_0_25px_rgba(23,186,206,0.6)]",
    ghost: "border-transparent text-muted-foreground hover:text-foreground hover:bg-white/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={disabled || isLoading}
      className={cn(
        "relative px-8 py-3 rounded-full border font-display font-bold tracking-wider uppercase text-sm transition-all duration-300 flex items-center justify-center gap-2",
        variants[variant],
        (disabled || isLoading) && "opacity-50 cursor-not-allowed hover:shadow-none hover:bg-transparent",
        className
      )}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
      {/* Scanline effect overlay */}
      {!disabled && !isLoading && variant !== 'ghost' && (
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      )}
    </motion.button>
  );
}
