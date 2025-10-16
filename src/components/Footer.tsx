import { motion } from 'motion/react';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const footerLinks = {
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Leadership', href: '#about' },
    { label: 'Sustainability', href: '#' },
    { label: 'Quality & Certifications', href: '#' },
  ],
  solutions: [
    { label: 'Aerospace & Defense', href: '#business' },
    { label: 'Railway Systems', href: '#business' },
    { label: 'Energy Solutions', href: '#business' },
    { label: 'Industrial Systems', href: '#business' },
  ],
  resources: [
    { label: 'Careers', href: '#careers' },
    { label: 'Investor Relations', href: '#investors' },
    { label: 'Press Releases', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  support: [
    { label: 'Contact Us', href: '#contact' },
    { label: 'Customer Support', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--accent) 2px, transparent 2px), radial-gradient(circle at 75% 75%, var(--amber) 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-6 pt-16 pb-8 relative z-10">
        {/* Newsletter Section */}
        <motion.div
          className="mb-16 pb-16 border-b border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <Mail className="w-12 h-12 text-[var(--accent)] mx-auto mb-4" />
            <h3 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Stay Updated
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Subscribe to our newsletter for the latest innovations, projects, and company updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[var(--accent)]"
              />
              <Button className="bg-[var(--accent)] text-[var(--primary)] hover:bg-[var(--accent)]/80 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              <span className="text-white">HBL</span>{' '}
              <span className="text-[var(--accent)]">Engineering</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Engineering the Future of Mission-Critical Systems. Delivering excellence in defense, railway, and energy sectors since 1960.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">HBL House, Bhopal - 462003, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--accent)]" />
                <span className="text-sm text-gray-300">+91-755-277-0000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--accent)]" />
                <span className="text-sm text-gray-300">info@hbl.in</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-lg capitalize" style={{ fontFamily: 'var(--font-heading)' }}>
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-[var(--accent)] transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="p-3 bg-white/10 rounded-full hover:bg-[var(--accent)] hover:text-[var(--primary)] transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400 text-center md:text-left">
            <p>© 2025 HBL Engineering Limited. All rights reserved.</p>
            <p className="mt-1">ISO 9001:2015 | AS9100D | IRIS Certified</p>
          </div>

          {/* Scroll to Top */}
          <Button
            onClick={scrollToTop}
            className="bg-[var(--accent)] text-[var(--primary)] hover:bg-[var(--accent)]/80 rounded-full"
            size="icon"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
