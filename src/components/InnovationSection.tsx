import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb, Rocket, Cpu, Leaf } from 'lucide-react';
import { Button } from './ui/button';

const innovations = [
  {
    icon: Rocket,
    title: 'Vande Bharat Integration',
    category: 'Railway Excellence',
    description: 'Supplying critical components for India\'s flagship high-speed train program, ensuring safety and performance.',
    impact: '50+ trains equipped',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Lightbulb,
    title: 'BESS Technology',
    category: 'Energy Innovation',
    description: 'Advanced Battery Energy Storage Systems enabling grid stability and renewable energy integration.',
    impact: '500 MWh capacity deployed',
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: Cpu,
    title: 'Smart Signaling',
    category: 'Railway Systems',
    description: 'Next-gen electronic interlocking and train control systems for enhanced safety and efficiency.',
    impact: '1000+ km coverage',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Leaf,
    title: 'Green Manufacturing',
    category: 'Sustainability',
    description: 'Carbon-neutral production facilities with zero liquid discharge and renewable energy integration.',
    impact: '60% carbon reduction',
    color: 'from-green-500 to-emerald-500'
  }
];

export function InnovationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % innovations.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + innovations.length) % innovations.length);
  };

  return (
    <section id="innovation" className="py-24 bg-[var(--primary)] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, var(--accent) 1px, transparent 1px), radial-gradient(circle at 80% 80%, var(--amber) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[var(--accent)] tracking-wider uppercase">Innovation Highlights</span>
          <h2 className="mt-4 text-4xl md:text-5xl text-white">
            Breakthrough Technologies
          </h2>
          <p className="mt-6 text-gray-300 max-w-3xl mx-auto text-lg">
            Pioneering solutions that shape the future of engineering
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {innovations.map((innovation, index) => (
                <div
                  key={innovation.title}
                  className="min-w-full px-4"
                >
                  <motion.div
                    className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      {/* Icon & Content */}
                      <div>
                        <div className={`inline-flex p-6 bg-gradient-to-br ${innovation.color} rounded-3xl shadow-2xl mb-6`}>
                          <innovation.icon className="w-16 h-16 text-white" />
                        </div>
                        
                        <div className="inline-block px-4 py-2 bg-[var(--accent)]/20 text-[var(--accent)] rounded-full mb-4">
                          {innovation.category}
                        </div>
                        
                        <h3 className="text-4xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                          {innovation.title}
                        </h3>
                        
                        <p className="text-gray-300 text-lg mb-6">
                          {innovation.description}
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <div className="px-6 py-3 bg-[var(--amber)]/20 border border-[var(--amber)]/30 rounded-full">
                            <span className="text-[var(--amber)]">Impact: {innovation.impact}</span>
                          </div>
                        </div>
                      </div>

                      {/* Visual Element */}
                      <div className="relative">
                        <div className={`aspect-square rounded-3xl bg-gradient-to-br ${innovation.color} opacity-20 blur-3xl absolute inset-0`} />
                        <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
                          <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                              <span className="text-sm text-gray-400">Performance</span>
                              <span className="text-[var(--accent)]">98.5%</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                              <span className="text-sm text-gray-400">Reliability</span>
                              <span className="text-[var(--accent)]">99.9%</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                              <span className="text-sm text-gray-400">Efficiency</span>
                              <span className="text-[var(--accent)]">95.2%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-white/20 text-white hover:bg-white/10"
              onClick={prev}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex gap-2">
              {innovations.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-[var(--accent)] w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-white/20 text-white hover:bg-white/10"
              onClick={next}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
