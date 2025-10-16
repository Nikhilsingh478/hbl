import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

/**
 * IntroLoader - Premium first-load experience
 * Shows once on initial page visit, then smooth reveal
 * Optional: Can be disabled for returning users via localStorage
 */

interface IntroLoaderProps {
  onComplete?: () => void;
  minDuration?: number; // Minimum display time in ms
  useLocalStorage?: boolean; // Skip for returning users
}

export function IntroLoader({ 
  onComplete, 
  minDuration = 3000,
  useLocalStorage = true 
}: IntroLoaderProps) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user has seen intro before (using sessionStorage by default for better UX)
    if (useLocalStorage) {
      const hasSeenIntro = sessionStorage.getItem('hbl-intro-seen');
      if (hasSeenIntro) {
        setShow(false);
        onComplete?.();
        return;
      }
    }

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, minDuration / 50);

    // Minimum display timer
    const timer = setTimeout(() => {
      setShow(false);
      if (useLocalStorage) {
        sessionStorage.setItem('hbl-intro-seen', 'true');
      }
      setTimeout(() => {
        onComplete?.();
      }, 800);
    }, minDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete, minDuration, useLocalStorage]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[var(--primary)] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)'
          }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Animated Grid Background */}
          <motion.div
            className="absolute inset-0 opacity-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
                backgroundSize: '80px 80px',
              }}
              animate={{
                backgroundPosition: ['0px 0px', '80px 80px'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.div>

          {/* Main Logo Animation */}
          <div className="relative z-10">
            {/* HBL Text - Cinematic Reveal */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {['H', 'B', 'L'].map((letter, i) => (
                <motion.div
                  key={letter}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.2,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                >
                  <motion.span
                    className="text-7xl sm:text-8xl md:text-9xl text-[var(--accent)]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(0,255,255,0.5)',
                        '0 0 40px rgba(0,255,255,0.8)',
                        '0 0 20px rgba(0,255,255,0.5)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  >
                    {letter}
                  </motion.span>
                </motion.div>
              ))}
            </div>

            {/* Engineering Text */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.p
                className="text-2xl sm:text-3xl text-white tracking-[0.3em]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                ENGINEERING
              </motion.p>
              <motion.div
                className="h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mt-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-center text-gray-300 text-lg sm:text-xl tracking-wider"
              style={{ fontFamily: 'var(--font-body)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Engineering the Future of Mission-Critical Systems
            </motion.p>

            {/* Loader Bar */}
            <motion.div
              className="mt-12 w-80 max-w-[90vw] mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--amber)]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ boxShadow: '0 0 10px var(--accent)' }}
                />
              </div>
              
              {/* Since 1960 */}
              <motion.div
                className="flex items-center justify-between mt-3 text-xs text-gray-400 tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                <span>SINCE 1960</span>
                <span>{progress}%</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Corner Decorations */}
          {[
            { top: '2rem', left: '2rem', rotate: 0 },
            { top: '2rem', right: '2rem', rotate: 90 },
            { bottom: '2rem', left: '2rem', rotate: 270 },
            { bottom: '2rem', right: '2rem', rotate: 180 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-12 border-l-2 border-t-2 border-[var(--accent)]/30"
              style={{ ...pos }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.5 + i * 0.1,
                duration: 0.5,
              }}
            />
          ))}

          {/* Floating Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[var(--accent)] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
