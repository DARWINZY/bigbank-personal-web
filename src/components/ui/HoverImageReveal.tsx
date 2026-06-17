'use client';

import { useState, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface HoverImageRevealProps {
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
}

export default function HoverImageReveal({ children, imageSrc, imageAlt }: HoverImageRevealProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate position relative to the container
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', display: 'block', width: '100%', cursor: 'pointer' }}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              x: mousePosition.x + 20, // Offset from cursor
              y: mousePosition.y - 100, // Offset from cursor
              pointerEvents: 'none',
              zIndex: 50,
              width: '250px',
              height: '160px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            }}
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--color-accent-ultra-light) 0%, var(--color-bg-secondary) 100%)' }} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
