import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Award, Users, Globe2, Zap } from 'lucide-react';

const milestones = [
  { year: '1960', title: 'Foundation', description: 'HBL Engineering established' },
  { year: '1985', title: 'Defense Expansion', description: 'Entered defense aerospace sector' },
  { year: '2005', title: 'Railway Innovation', description: 'Pioneered railway signaling systems' },
  { year: '2020', title: 'Energy Solutions', description: 'Launched BESS technology' },
  { year: '2025', title: 'Global Leader', description: 'Serving 50+ countries worldwide' },
];

const stats = [
  { icon: Award, label: 'Years of Excellence', value: '65+' },
  { icon: Users, label: 'Expert Engineers', value: '5,000+' },
  { icon: Globe2, label: 'Countries Served', value: '50+' },
  { icon: Zap, label: 'Active Projects', value: '200+' },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--accent)]/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[var(--accent)] tracking-wider uppercase">About Us</span>
          <h2 className="mt-4 text-4xl md:text-5xl text-[var(--primary)]">
            Pioneering Excellence Since 1960
          </h2>
          <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">
            From humble beginnings to becoming India's premier engineering powerhouse,
            HBL Engineering has consistently delivered mission-critical solutions for
            defense, railway, and energy sectors.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <stat.icon className="w-10 h-10 mx-auto mb-4 text-[var(--accent)]" />
              <div className="text-3xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent)] to-transparent hidden md:block" />
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="inline-block px-6 py-3 bg-[var(--accent)] text-[var(--primary)] rounded-full mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {milestone.year}
                  </div>
                  <h3 className="text-2xl text-[var(--primary)] mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
                
                <div className="hidden md:block w-4 h-4 rounded-full bg-[var(--accent)] border-4 border-white shadow-lg relative z-10" />
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision Statement */}
        <motion.div
          className="mt-20 p-10 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-3xl text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Our Vision
          </h3>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            To be the global benchmark for engineering excellence, delivering innovative,
            sustainable solutions that empower nations and transform industries.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
