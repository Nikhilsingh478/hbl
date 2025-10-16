import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Battery, Cpu, Car, Shield, Building2, Zap, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';

const businessUnits = [
  {
    icon: Battery,
    title: 'Batteries',
    tagline: 'Powering Critical Defense Systems',
    description: 'Specialized battery systems for defense applications, delivering unmatched reliability in mission-critical environments.',
    image: 'https://images.unsplash.com/photo-1704895336181-e28381acbf7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBiYXR0ZXJ5JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjA1NTU0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capabilities: [
      'High-density lithium-ion systems',
      'Ruggedized defense batteries',
      'Thermal management solutions',
      'Long-life power packs'
    ],
    color: 'from-blue-600 to-cyan-500'
  },
  {
    icon: Cpu,
    title: 'Electronics',
    tagline: 'Advanced Avionic Solutions',
    description: 'Cutting-edge electronic systems for aerospace, defense, and industrial applications with precision engineering.',
    image: 'https://images.unsplash.com/photo-1729843420196-1ff32bb39db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGNpcmN1aXQlMjBib2FyZHxlbnwxfHx8fDE3NjA0NzQxNTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capabilities: [
      'Control systems & avionics',
      'Power management electronics',
      'Signal processing units',
      'Communication systems'
    ],
    color: 'from-purple-600 to-pink-500'
  },
  {
    icon: Car,
    title: 'E-Mobility',
    tagline: 'Future of Sustainable Transportation',
    description: 'Innovative electric vehicle solutions and charging infrastructure for the next generation of mobility.',
    image: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHZlaGljbGUlMjBjaGFyZ2luZ3xlbnwxfHx8fDE3NjA1MzgyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capabilities: [
      'EV battery management systems',
      'Fast charging solutions',
      'Vehicle control units',
      'Energy optimization software'
    ],
    color: 'from-green-600 to-emerald-500'
  },
  {
    icon: Shield,
    title: 'Defense',
    tagline: 'Protecting National Security',
    description: 'Mission-critical aerospace components and systems for defense forces, ensuring operational excellence.',
    image: 'https://images.unsplash.com/photo-1759203977871-02585c46a9c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWZlbnNlJTIwbWlsaXRhcnklMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYwNTU1NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    capabilities: [
      'Fighter aircraft hydraulics',
      'Landing gear systems',
      'Precision-machined components',
      'Ground support equipment'
    ],
    color: 'from-red-600 to-orange-500'
  },
  {
    icon: Building2,
    title: 'Spun Concrete',
    tagline: 'Infrastructure Excellence',
    description: 'High-strength spun concrete poles and structures for utilities and infrastructure development.',
    image: 'https://images.unsplash.com/photo-1630535717142-1f8f05960ef0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jcmV0ZSUyMGluZnJhc3RydWN0dXJlfGVufDF8fHx8MTc2MDU1NTg5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    capabilities: [
      'Electric transmission poles',
      'Railway electrification structures',
      'Street lighting poles',
      'Custom infrastructure solutions'
    ],
    color: 'from-gray-600 to-slate-500'
  },
  {
    icon: Zap,
    title: 'BESS',
    tagline: 'Grid-Scale Energy Storage',
    description: 'Battery Energy Storage Systems enabling renewable energy integration and grid stability solutions.',
    image: 'https://images.unsplash.com/photo-1704895336181-e28381acbf7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBiYXR0ZXJ5JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjA1NTU0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    capabilities: [
      'Grid-scale storage systems',
      'Microgrid solutions',
      'Peak shaving technology',
      'Renewable integration'
    ],
    color: 'from-amber-600 to-yellow-500'
  }
];

export function BusinessUnitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedUnit, setSelectedUnit] = useState<typeof businessUnits[0] | null>(null);

  return (
    <section id="business" className="py-24 bg-gradient-to-b from-white to-[var(--muted)] relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="text-[var(--accent)] tracking-[0.2em] uppercase inline-block mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Business Units
          </motion.span>
          <motion.h2 
            className="text-[var(--primary)] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Diverse Expertise,
            <br />
            Unified Excellence
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Six specialized divisions delivering world-class engineering solutions across defense, energy, and infrastructure sectors
          </motion.p>
        </motion.div>

        {/* Business Units Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessUnits.map((unit, index) => (
            <motion.div
              key={unit.title}
              className="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer"
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{ 
                y: -15, 
                rotateY: 2,
                transition: { duration: 0.4 }
              }}
              onClick={() => setSelectedUnit(unit)}
            >
              {/* Image Background with Parallax */}
              <div className="relative h-72 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${unit.image}')` }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-[var(--primary)] via-[var(--primary)]/70 to-transparent`} />
                
                {/* Animated Icon */}
                <motion.div 
                  className={`absolute top-6 left-6 p-5 bg-gradient-to-br ${unit.color} rounded-2xl shadow-2xl`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { type: 'spring', stiffness: 400 }
                  }}
                >
                  <unit.icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                </motion.div>

                {/* Shimmer Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 animate-shimmer" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-[var(--primary)] mb-3">
                  {unit.title}
                </h3>
                <p className="text-[var(--accent)] mb-4 text-base">
                  {unit.tagline}
                </p>
                <p className="text-gray-600 mb-6 text-base leading-relaxed">
                  {unit.description}
                </p>
                
                <motion.div 
                  className="flex items-center text-[var(--accent)] group-hover:text-[var(--amber)] transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span className="mr-2 text-sm">Explore Division</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </div>

              {/* Accent Line */}
              <motion.div 
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${unit.color}`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Corner Decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <div className={`absolute inset-0 bg-gradient-to-br ${unit.color} rounded-bl-full`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedUnit} onOpenChange={() => setSelectedUnit(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedUnit && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 bg-gradient-to-br ${selectedUnit.color} rounded-2xl shadow-xl`}>
                    <selectedUnit.icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-[var(--primary)] mb-2">
                      {selectedUnit.title}
                    </DialogTitle>
                    <DialogDescription className="text-[var(--accent)] text-lg">
                      {selectedUnit.tagline}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-8">
                {/* Hero Image */}
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={selectedUnit.image}
                    alt={selectedUnit.title}
                    className="w-full h-80 object-cover"
                  />
                </div>
                
                {/* Description */}
                <div>
                  <h4 className="text-[var(--primary)] mb-4">Overview</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedUnit.description}
                  </p>
                </div>
                
                {/* Capabilities */}
                <div>
                  <h4 className="text-[var(--primary)] mb-6">Core Capabilities</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedUnit.capabilities.map((capability, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedUnit.color} mt-2 flex-shrink-0`} />
                        <span className="text-gray-700">{capability}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-4">
                  <Button
                    className={`flex-1 bg-gradient-to-r ${selectedUnit.color} text-white hover:shadow-xl transition-all`}
                    size="lg"
                    asChild
                  >
                    <a href="#contact">Request Consultation</a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2"
                  >
                    Download Brochure
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
