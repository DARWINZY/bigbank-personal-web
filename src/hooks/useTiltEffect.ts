import { useRef, useEffect } from 'react';

export function useTiltEffect(options = { max: 10, scale: 1.02, speed: 400 }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Only apply on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -options.max;
      const rotateY = ((x - centerX) / centerX) * options.max;

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${options.scale}, ${options.scale}, ${options.scale})`;
      
      // Update shine effect position if a shine element exists
      const shine = element.querySelector('.tilt-shine') as HTMLElement;
      if (shine) {
        const shineX = (x / rect.width) * 100;
        const shineY = (y / rect.height) * 100;
        shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.2) 0%, transparent 50%)`;
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      
      const shine = element.querySelector('.tilt-shine') as HTMLElement;
      if (shine) {
        shine.style.background = 'transparent';
      }
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Initial setup for smooth transition
    element.style.transition = `transform ${options.speed}ms cubic-bezier(.03,.98,.52,.99)`;

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [options.max, options.scale, options.speed]);

  return ref;
}
