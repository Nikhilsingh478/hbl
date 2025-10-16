import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { MapPin, Building2, Factory, Globe } from 'lucide-react';

const regions = [
  {
    name: 'Asia Pacific',
    countries: 15,
    facilities: 8,
    employees: '3,500+',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Middle East',
    countries: 12,
    facilities: 4,
    employees: '800+',
    color: 'from-amber-500 to-orange-500'
  },
  {
    name: 'Europe',
    countries: 18,
    facilities: 3,
    employees: '500+',
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Americas',
    countries: 8,
    facilities: 2,
    employees: '200+',
    color: 'from-green-500 to-emerald-500'
  }
];

const locations = [
  { name: 'Bhopal, India', type: 'Headquarters', lat: 23, lng: 77 },
  { name: 'Bengaluru, India', type: 'R&D Center', lat: 13, lng: 77 },
  { name: 'Hyderabad, India', type: 'Manufacturing', lat: 17, lng: 78 },
  { name: 'Dubai, UAE', type: 'Regional Office', lat: 25, lng: 55 },
  { name: 'London, UK', type: 'Regional Office', lat: 51, lng: 0 },
];

export function GlobalPresenceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  return (
    <section id="global" className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%2300FFFF" fill-opacity="1"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>')`,
          backgroundSize: '60px 60px'
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
          <span className="text-[var(--accent)] tracking-wider uppercase">Global Presence</span>
          <h2 className="mt-4 text-4xl md:text-5xl text-[var(--primary)]">
            Engineering Across Continents
          </h2>
          <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">
            With operations spanning 50+ countries, we deliver world-class engineering solutions globally
          </p>
        </motion.div>

        {/* World Map Visualization */}
        <motion.div
          className="relative mb-16 rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="relative h-[500px] bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-3xl p-8">
            {/* Map Background */}
            <img
              src="https://images.unsplash.com/photo-1727610542348-9636c3b65d2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBidXNpbmVzcyUyMHdvcmxkfGVufDF8fHx8MTc2MDU1NTQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Global Presence"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            
            {/* Location Pins */}
            <div className="relative h-full">
              {locations.map((location, index) => (
                <motion.div
                  key={location.name}
                  className="absolute group cursor-pointer"
                  style={{
                    left: `${(location.lng + 180) / 360 * 100}%`,
                    top: `${(90 - location.lat) / 180 * 100}%`
                  }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredLocation(location.name)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  {/* Pin */}
                  <div className="relative">
                    <motion.div
                      className="w-4 h-4 bg-[var(--accent)] rounded-full shadow-lg"
                      animate={{
                        scale: hoveredLocation === location.name ? 1.5 : 1,
                      }}
                    />
                    <div className="absolute top-0 left-0 w-4 h-4 bg-[var(--accent)] rounded-full animate-ping opacity-75" />
                  </div>
                  
                  {/* Tooltip */}
                  {hoveredLocation === location.name && (
                    <motion.div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-white rounded-lg shadow-xl whitespace-nowrap"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="text-sm text-[var(--primary)]">{location.name}</div>
                      <div className="text-xs text-[var(--accent)]">{location.type}</div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Stats Overlay */}
            <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-4 justify-center">
              {[
                { icon: Globe, label: 'Countries', value: '50+' },
                { icon: Building2, label: 'Offices', value: '17' },
                { icon: Factory, label: 'Facilities', value: '23' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <stat.icon className="w-5 h-5 text-[var(--accent)]" />
                  <div>
                    <div className="text-white text-sm">{stat.value}</div>
                    <div className="text-gray-300 text-xs">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Regional Breakdown */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`inline-flex p-3 bg-gradient-to-br ${region.color} rounded-xl mb-4`}>
                <MapPin className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl text-[var(--primary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {region.name}
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Countries</span>
                  <span className="text-[var(--primary)]">{region.countries}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Facilities</span>
                  <span className="text-[var(--primary)]">{region.facilities}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employees</span>
                  <span className="text-[var(--accent)]">{region.employees}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
