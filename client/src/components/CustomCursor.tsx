import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[9999] mix-blend-screen hidden md:block"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(23, 186, 206, 0.1)' : 'transparent',
        borderColor: isHovering ? 'rgba(23, 186, 206, 0.5)' : 'rgba(23, 186, 206, 0.8)',
      }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 400,
        mass: 0.5
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_var(--primary)]" />
      </div>
    </motion.div>
  );
}
