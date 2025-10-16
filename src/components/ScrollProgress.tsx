import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollPercentage(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--amber)] to-[var(--accent)] origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Percentage indicator */}
      <motion.div
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-[var(--primary)] shadow-2xl flex items-center justify-center z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: scrollPercentage > 5 ? 1 : 0, scale: scrollPercentage > 5 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={283}
            style={{
              strokeDashoffset: 283 - (283 * scrollPercentage) / 100,
            }}
          />
        </svg>
        <span className="absolute text-white text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
          {scrollPercentage}%
        </span>
      </motion.div>
    </>
  );
}
