import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Briefcase, Users, TrendingUp, Heart, Award, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const jobOpenings = [
  {
    title: 'Senior Aerospace Engineer',
    department: 'Defense Systems',
    location: 'Bhopal, India',
    type: 'Full-time',
    experience: '8+ years'
  },
  {
    title: 'Railway Signaling Specialist',
    department: 'Railway Systems',
    location: 'Bengaluru, India',
    type: 'Full-time',
    experience: '5+ years'
  },
  {
    title: 'Energy Systems Engineer',
    department: 'BESS Division',
    location: 'Hyderabad, India',
    type: 'Full-time',
    experience: '3+ years'
  },
  {
    title: 'Manufacturing Lead',
    department: 'Production',
    location: 'Multiple Locations',
    type: 'Full-time',
    experience: '10+ years'
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Continuous learning and advancement opportunities'
  },
  {
    icon: Heart,
    title: 'Work-Life Balance',
    description: 'Flexible schedules and wellness programs'
  },
  {
    icon: Award,
    title: 'Recognition',
    description: 'Performance-based rewards and incentives'
  },
  {
    icon: GraduationCap,
    title: 'Learning & Development',
    description: 'World-class training and certification programs'
  }
];

export function CareersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="careers" className="py-24 bg-gradient-to-b from-[var(--muted)] to-white relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[var(--accent)] tracking-wider uppercase">Careers</span>
          <h2 className="mt-4 text-4xl md:text-5xl text-[var(--primary)]">
            Join Our Mission
          </h2>
          <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">
            Build your career with industry leaders. Shape the future of engineering excellence.
          </p>
        </motion.div>

        {/* Culture Showcase */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden h-80 sm:h-96">
            <img
              src="https://images.unsplash.com/photo-1666790676906-0295230c121d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3JrcGxhY2V8ZW58MXx8fHwxNzYwNTU1NDUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Office Culture"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/80 to-transparent flex items-end p-4 sm:p-6 md:p-8">
              <div className="text-white">
                <h3 className="text-xl sm:text-2xl md:text-3xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  Innovative Environment
                </h3>
                <p className="text-sm sm:text-base text-gray-200">
                  Where ideas meet execution and talent thrives
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="p-2 sm:p-3 bg-[var(--accent)]/10 rounded-xl inline-flex mb-3 sm:mb-4">
                  <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent)]" />
                </div>
                <h4 className="text-[var(--primary)] mb-2 text-base sm:text-lg break-words">{benefit.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600 break-words">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Job Openings */}
        <div>
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl sm:text-3xl text-[var(--primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Current Openings
            </h3>
            <Button 
              variant="outline" 
              className="border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white text-sm sm:text-base whitespace-nowrap"
            >
              View All Positions
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.title}
                className="group p-4 sm:p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-[var(--accent)] hover:shadow-xl transition-all cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-4 gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base sm:text-lg md:text-xl text-[var(--primary)] mb-2 group-hover:text-[var(--accent)] transition-colors break-words">
                      {job.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 break-words">{job.department}</p>
                  </div>
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent)] flex-shrink-0" />
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20">
                    {job.type}
                  </Badge>
                  <Badge variant="outline">
                    {job.location}
                  </Badge>
                  <Badge variant="outline">
                    {job.experience}
                  </Badge>
                </div>

                <div className="flex items-center text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm">View Details</span>
                  <span className="ml-2">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 sm:mt-16 p-6 sm:p-10 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Users className="w-12 h-12 sm:w-16 sm:h-16 text-[var(--accent)] mx-auto mb-4 sm:mb-6" />
          <h3 className="text-2xl sm:text-3xl text-white mb-3 sm:mb-4 px-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Don't See Your Role?
          </h3>
          <p className="text-gray-200 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
            We're always looking for exceptional talent. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <Button
            size="lg"
            className="bg-[var(--accent)] text-[var(--primary)] hover:bg-[var(--accent)]/80 hover:shadow-2xl hover:shadow-[var(--accent)]/50 text-base sm:text-lg px-6 sm:px-8"
          >
            Submit Resume
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
