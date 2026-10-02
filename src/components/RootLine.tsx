import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function RootLine() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 65, damping: 24 });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <svg className="root-line no-print" viewBox="0 0 36 700" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d="M18 0C12 62 26 106 18 151S12 231 19 285 12 371 17 428 25 513 17 560 14 649 18 700"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />
      <motion.path d="M18 151C9 144 4 142 5 134c7 0 13 8 13 17M17 428c9-7 14-9 13-17-7 0-13 8-13 17" fill="none" stroke="currentColor" strokeWidth="1" style={{ opacity: progress }} />
    </svg>
  );
}