import { motion } from 'motion/react';

export function HBLLoader() {
  return (
    <div className="w-full min-h-[24rem] flex flex-col items-center justify-center bg-gradient-to-b from-[#F9F9F9] to-[#EDEDED] py-16">
      <div className="relative w-40 h-40 sm:w-48 sm:h-48">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Hexagonal Gear Ring - Rotating Clockwise */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ transformOrigin: 'center' }}
          >
            {/* Hexagon with gear teeth */}
            <path
              d="M 100 20 L 140 35 L 160 70 L 160 130 L 140 165 L 100 180 L 60 165 L 40 130 L 40 70 L 60 35 Z"
              fill="none"
              stroke="#0A1F44"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Gear teeth around hexagon */}
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

          {/* Middle Ring - Counter-rotating with circuit traces */}
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
            
            {/* Circuit connection nodes */}
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

          {/* Inner Core - Pulsing Energy */}
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

          {/* Amber Glow Pulse */}
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

          {/* Center Logo Mark - H */}
          <motion.text
            x="100"
            y="110"
            textAnchor="middle"
            fill="#00FFFF"
            fontSize="28"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="700"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            H
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

          {/* Outer Scan Lines */}
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
              delay: 1.5,
              ease: 'easeOut',
            }}
          />
        </svg>
      </div>

      {/* Loading Text */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.p
          className="text-[var(--primary)] text-lg tracking-wider"
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
    </div>
  );
}
