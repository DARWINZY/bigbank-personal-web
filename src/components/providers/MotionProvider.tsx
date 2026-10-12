'use client';

import { MotionConfig } from 'framer-motion';

/** framer-motion skips movement (keeps fades) when the visitor asks for reduced motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
