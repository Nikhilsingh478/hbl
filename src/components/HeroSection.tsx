import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 100);
      mouseY.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581089780002-02ddf16f57e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJvc3BhY2UlMjBlbmdpbmVlcmluZyUyMGFpcmNyYWZ0fGVufDF8fHx8MTc2MDU1NTQ0OXww&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/90 via-[var(--primary)]/75 to-[var(--primary)]/90" />
      </motion.div>

      {/* Cursor Glow Effect - Enhanced (Desktop Only) */}
      <motion.div
        className="hidden md:block absolute pointer-events-none z-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, var(--accent) 0%, transparent 70%)`,
          left: useTransform(smoothMouseX, (x) => `${x}%`),
          top: useTransform(smoothMouseY, (y) => `${y}%`),
          opacity: 0.3,
        }}
      />

      {/* Secondary Glow (Desktop Only) */}
      <motion.div
        className="hidden md:block absolute pointer-events-none z-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, var(--amber) 0%, transparent 70%)`,
          left: useTransform(smoothMouseX, (x) => `${100 - x}%`),
          top: useTransform(smoothMouseY, (y) => `${100 - y}%`),
          opacity: 0.2,
        }}
      />

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 z-10 opacity-10 pointer-events-none">
        <motion.div 
          className="h-full w-full" 
          style={{
            backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Floating Particles (Desktop Only) */}
      <div className="hidden md:block">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[var(--accent)] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content - Properly spaced below navbar */}
      <motion.div
        className="relative z-20 text-center px-4 sm:px-6 max-w-6xl mx-auto w-full pt-24 sm:pt-28 md:pt-32"
        style={{ opacity }}
      >
        {/* Badge - Engineering the Future */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <motion.span 
            className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full border-2 border-[var(--accent)]/30 backdrop-blur-md text-sm sm:text-base"
            whileHover={{ scale: 1.05, borderColor: 'var(--accent)' }}
          >
            Engineering the Future
          </motion.span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="mb-6 sm:mb-8 text-white tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, type: 'spring' }}
        >
          <motion.span
            className="block mb-2"
            animate={{ 
              textShadow: [
                '0 0 20px rgba(0,255,255,0.3)',
                '0 0 40px rgba(0,255,255,0.5)',
                '0 0 20px rgba(0,255,255,0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Mission-Critical
          </motion.span>
          <span className="text-[var(--accent)] block">
            Systems Excellence
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mb-8 sm:mb-12 text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Leading India's defense and railway infrastructure with cutting-edge
          aerospace engineering, energy solutions, and mission-critical systems
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[var(--accent)] text-[var(--primary)] hover:bg-[var(--accent)]/90 hover:shadow-2xl hover:shadow-[var(--accent)]/50 transition-all text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-6 relative overflow-hidden group"
              asChild
            >
              <a href="#business">
                <span className="relative z-10">Explore Solutions</span>
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ opacity: 0.1 }}
                />
              </a>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-[var(--primary)] text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-6 backdrop-blur-sm bg-white/5 transition-all"
              asChild
            >
              <a href="#about">Our Story</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-20 max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { value: '65+', label: 'Years of Excellence' },
            { value: '50+', label: 'Countries Served' },
            { value: '5000+', label: 'Expert Engineers' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              className="text-center p-3 sm:p-6 bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10"
              whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl text-[var(--accent)] mb-1 sm:mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-30"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white text-xs sm:text-sm tracking-wider">SCROLL</span>
          <ChevronDown className="text-[var(--accent)]" size={28} />
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}
