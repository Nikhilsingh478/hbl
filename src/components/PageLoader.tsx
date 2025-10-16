import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface PageLoaderProps {
  onComplete?: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExiting(true);
          setTimeout(() => {
            onComplete?.();
          }, 800);
          return 100;
        }
        // Accelerate as we get closer to 100
        const increment = prev < 30 ? 5 : prev < 60 ? 10 : prev < 90 ? 15 : 5;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-gradient-to-b from-[#F9F9F9] to-[#EDEDED] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Main Loader SVG */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Hexagonal Gear Ring */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ transformOrigin: 'center' }}
              >
                <path
                  d="M 100 20 L 140 35 L 160 70 L 160 130 L 140 165 L 100 180 L 60 165 L 40 130 L 40 70 L 60 35 Z"
                  fill="none"
                  stroke="#0A1F44"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <motion.rect
                    key={i}
                    x="97"
                    y="10"
                    width="6"
                    height="12"
                    fill="#0A1F44"
                    style={{
                      transformOrigin: '100px 100px',
                      transform: `rotate(${angle}deg)`,
                    }}
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </motion.g>

              {/* Middle Ring - Circuit */}
              <motion.g
                animate={{ rotate: -360 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ transformOrigin: 'center' }}
              >
                <circle
                  cx="100"
                  cy="100"
                  r="50"
                  fill="none"
                  stroke="#00FFFF"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  opacity="0.6"
                />
                
                {[0, 90, 180, 270].map((angle, i) => {
                  const radians = (angle * Math.PI) / 180;
                  const x = 100 + 50 * Math.cos(radians);
                  const y = 100 + 50 * Math.sin(radians);
                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3"
                      fill="#00FFFF"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: 'easeInOut',
                      }}
                    />
                  );
                })}
              </motion.g>

              {/* Circuit Path Tracing */}
              <motion.path
                d="M 100 50 Q 120 60 130 80 T 150 100 Q 140 120 120 130 T 100 150 Q 80 140 70 120 T 50 100 Q 60 80 80 70 T 100 50"
                fill="none"
                stroke="#00FFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="200"
                initial={{ strokeDashoffset: 200 }}
                animate={{ strokeDashoffset: [200, 0, -200] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{ filter: 'drop-shadow(0 0 4px #00FFFF)' }}
              />

              {/* Inner Core */}
              <motion.circle
                cx="100"
                cy="100"
                r="20"
                fill="#0A1F44"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Amber Glow */}
              <motion.circle
                cx="100"
                cy="100"
                r="15"
                fill="none"
                stroke="#FFB400"
                strokeWidth="2"
                animate={{
                  r: [15, 25, 15],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                style={{ filter: 'blur(2px)' }}
              />

              {/* HBL Logo */}
              <motion.text
                x="100"
                y="110"
                textAnchor="middle"
                fill="#00FFFF"
                fontSize="28"
                fontFamily="Space Grotesk, sans-serif"
                fontWeight="700"
                animate={{
                  opacity: progress >= 70 ? [0, 1, 1] : 0.6,
                  scale: progress >= 70 ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                }}
              >
                HBL
              </motion.text>

              {/* Energy Particles */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const radians = (angle * Math.PI) / 180;
                return (
                  <motion.circle
                    key={i}
                    cx={100 + 35 * Math.cos(radians)}
                    cy={100 + 35 * Math.sin(radians)}
                    r="2"
                    fill="#FFB400"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      r: [2, 3, 2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.25,
                      ease: 'easeInOut',
                    }}
                  />
                );
              })}

              {/* Scan Lines */}
              <motion.circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#00FFFF"
                strokeWidth="1"
                opacity="0.3"
                animate={{
                  r: [60, 75, 60],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            </svg>

            {/* Progress Ring Overlay */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="rgba(0, 255, 255, 0.1)"
                strokeWidth="2"
              />
              <motion.circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="#00FFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={534}
                initial={{ strokeDashoffset: 534 }}
                animate={{
                  strokeDashoffset: 534 - (534 * progress) / 100,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{ filter: 'drop-shadow(0 0 6px #00FFFF)' }}
              />
            </svg>
          </div>

          {/* Company Name & Tagline */}
          <motion.div
            className="mt-10 text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <h1 className="text-3xl sm:text-4xl text-[var(--primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                HBL
              </h1>
              <span className="text-3xl sm:text-4xl text-[var(--accent)]" style={{ fontFamily: 'var(--font-heading)' }}>
                Engineering
              </span>
            </div>
            
            <motion.p
              className="text-[var(--primary)] text-base sm:text-lg tracking-wider"
              style={{ fontFamily: 'var(--font-heading)' }}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Engineering the Future
            </motion.p>

            {/* Progress Percentage */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-2xl text-[var(--accent)]" style={{ fontFamily: 'var(--font-heading)' }}>
                {progress}%
              </div>
              
              {/* Progress Dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[var(--accent)]"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(#0A1F44 1px, transparent 1px), linear-gradient(90deg, #0A1F44 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
