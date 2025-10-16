import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Business Units', href: '#business' },
  { label: 'Innovation', href: '#innovation' },
  { label: 'Global Presence', href: '#global' },
  { label: 'Careers', href: '#careers' },
  { label: 'Investors', href: '#investors' },
  { label: 'Contact', href: '#contact' },
];

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.3);
      y.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      className="relative text-sm transition-colors group"
      style={{ x: xSpring, y: ySpring }}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--amber)] transition-all group-hover:w-full" />
    </motion.a>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/10'
          : 'bg-[var(--primary)]/60 backdrop-blur-lg'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="relative z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-xl flex items-center justify-center transition-all ${
                isScrolled ? 'shadow-lg' : 'shadow-xl shadow-[var(--accent)]/20'
              }`}>
                <span className="text-white text-base sm:text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                  H
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-heading)' }} className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className={`text-lg sm:text-xl transition-colors ${
                    isScrolled ? 'text-[var(--primary)]' : 'text-white'
                  }`}>HBL</span>
                  <span className="text-[var(--accent)] text-lg sm:text-xl">Engineering</span>
                </div>
                <div className={`text-xs tracking-wider transition-colors ${
                  isScrolled ? 'text-gray-500' : 'text-gray-300'
                }`}>SINCE 1960</div>
              </div>
            </motion.div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={isScrolled ? 'text-gray-700 hover:text-[var(--accent)]' : 'text-white hover:text-[var(--accent)]'}
              >
                <MagneticButton href={item.href}>
                  {item.label}
                </MagneticButton>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/80 text-[var(--primary)] hover:shadow-xl hover:shadow-[var(--accent)]/30 transition-all relative overflow-hidden group"
                asChild
              >
                <a href="#contact">
                  <span className="relative z-10">Get in Touch</span>
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ opacity: 0.2 }}
                  />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-[var(--primary)]' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden pt-6 pb-8 space-y-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className={`block transition-colors py-2 text-lg ${
                  isScrolled ? 'text-gray-700 hover:text-[var(--accent)]' : 'text-white hover:text-[var(--accent)]'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {item.label}
              </motion.a>
            ))}
            <Button
              className="w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/80 text-[var(--primary)] hover:shadow-xl"
              size="lg"
              asChild
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </motion.div>
        )}
      </div>

      {/* Nav Shadow Animation */}
      {isScrolled && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.nav>
  );
}
