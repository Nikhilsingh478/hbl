import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { TrendingUp, FileText, Calendar, DollarSign, PieChart, Download } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';

const financialHighlights = [
  { label: 'Revenue (FY24)', value: '₹2,500 Cr', change: '+18%', icon: DollarSign },
  { label: 'EBITDA Margin', value: '24.5%', change: '+2.3%', icon: PieChart },
  { label: 'Order Book', value: '₹8,500 Cr', change: '+35%', icon: TrendingUp },
  { label: 'Market Cap', value: '₹12,000 Cr', change: '+42%', icon: TrendingUp },
];

const reports = [
  {
    category: 'Annual Reports',
    items: [
      { title: 'Annual Report FY 2023-24', date: 'June 2024', size: '4.2 MB' },
      { title: 'Annual Report FY 2022-23', date: 'June 2023', size: '3.8 MB' },
      { title: 'Annual Report FY 2021-22', date: 'June 2022', size: '3.5 MB' },
    ]
  },
  {
    category: 'Quarterly Results',
    items: [
      { title: 'Q2 FY25 Results', date: 'October 2024', size: '1.2 MB' },
      { title: 'Q1 FY25 Results', date: 'July 2024', size: '1.1 MB' },
      { title: 'Q4 FY24 Results', date: 'April 2024', size: '1.3 MB' },
    ]
  },
  {
    category: 'Investor Presentations',
    items: [
      { title: 'Corporate Presentation Q2 FY25', date: 'October 2024', size: '8.5 MB' },
      { title: 'Investor Day Presentation', date: 'September 2024', size: '12.3 MB' },
    ]
  },
  {
    category: 'Press Releases',
    items: [
      { title: 'New BESS Contract Award', date: 'October 2024', size: '0.8 MB' },
      { title: 'Vande Bharat Milestone Achievement', date: 'September 2024', size: '0.9 MB' },
      { title: 'Q2 Results Announcement', date: 'October 2024', size: '0.7 MB' },
    ]
  }
];

export function InvestorRelationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="investors" className="py-24 bg-white relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[var(--primary)]/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[var(--accent)] tracking-wider uppercase">Investor Relations</span>
          <h2 className="mt-4 text-4xl md:text-5xl text-[var(--primary)]">
            Financial Performance
          </h2>
          <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">
            Delivering consistent growth and shareholder value
          </p>
        </motion.div>

        {/* Financial Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {financialHighlights.map((item, index) => (
            <motion.div
              key={item.label}
              className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[var(--accent)]/10 rounded-xl">
                  <item.icon className="w-6 h-6 text-[var(--accent)]" />
                </div>
                <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  {item.change}
                </span>
              </div>
              <div className="text-3xl text-[var(--primary)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {item.value}
              </div>
              <div className="text-sm text-gray-600">{item.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Stock Performance Chart Placeholder */}
        <motion.div
          className="mb-16 p-8 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Stock Performance
              </h3>
              <p className="text-gray-300">HBL Engineering Ltd. (NSE: HBLENG)</p>
            </div>
            <div className="text-right">
              <div className="text-3xl text-[var(--accent)]" style={{ fontFamily: 'var(--font-heading)' }}>
                ₹1,245.50
              </div>
              <div className="text-green-400">+5.2% Today</div>
            </div>
          </div>
          
          {/* Simplified Chart Visual */}
          <div className="relative h-48 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 80 Q 50 60, 100 50 T 200 40 T 300 30 T 400 20"
                stroke="var(--accent)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 0 80 Q 50 60, 100 50 T 200 40 T 300 30 T 400 20 L 400 100 L 0 100 Z"
                fill="url(#gradient)"
              />
            </svg>
          </div>
        </motion.div>

        {/* Reports & Documents */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-2xl text-[var(--primary)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Reports & Documents
            </h3>
            
            <Accordion type="single" collapsible className="space-y-4">
              {reports.map((section, index) => (
                <AccordionItem
                  key={section.category}
                  value={`item-${index}`}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[var(--accent)]" />
                      <span className="text-[var(--primary)]">{section.category}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-3">
                      {section.items.map((item) => (
                        <div
                          key={item.title}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                        >
                          <div>
                            <div className="text-sm text-[var(--primary)] group-hover:text-[var(--accent)] transition-colors">
                              {item.title}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                              <Calendar className="w-3 h-3" />
                              {item.date}
                              <span>•</span>
                              {item.size}
                            </div>
                          </div>
                          <Download className="w-4 h-4 text-gray-400 group-hover:text-[var(--accent)] transition-colors" />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Quick Links & Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-2xl text-[var(--primary)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Investor Information
            </h3>
            
            <div className="space-y-4">
              {/* Company Details */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
                <h4 className="text-lg text-[var(--primary)] mb-4">Company Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">BSE Code</span>
                    <span className="text-[var(--primary)]">500186</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">NSE Symbol</span>
                    <span className="text-[var(--primary)]">HBLENG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ISIN</span>
                    <span className="text-[var(--primary)]">INE292A01021</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Cap</span>
                    <span className="text-[var(--accent)]">₹12,000 Cr</span>
                  </div>
                </div>
              </div>

              {/* Contact Investor Relations */}
              <div className="p-6 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-2xl text-white">
                <h4 className="text-lg mb-4">Contact Investor Relations</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-gray-300">Email</div>
                    <div className="text-[var(--accent)]">investors@hbl.in</div>
                  </div>
                  <div>
                    <div className="text-gray-300">Phone</div>
                    <div>+91-755-277-0000</div>
                  </div>
                </div>
                <Button
                  className="w-full mt-4 bg-[var(--accent)] text-[var(--primary)] hover:bg-[var(--accent)]/80"
                >
                  Schedule a Call
                </Button>
              </div>

              {/* Upcoming Events */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
                <h4 className="text-lg text-[var(--primary)] mb-4">Upcoming Events</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <div className="text-[var(--primary)]">Q3 FY25 Results</div>
                      <div className="text-gray-500">January 15, 2025</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <div className="text-[var(--primary)]">Annual General Meeting</div>
                      <div className="text-gray-500">September 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
