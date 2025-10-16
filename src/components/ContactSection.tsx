import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { sanitizeInput, isValidEmail, formRateLimiter } from './ui/security';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Headquarters',
    details: ['HBL House, Bhopal - 462003', 'Madhya Pradesh, India']
  },
  {
    icon: Phone,
    title: 'Phone',
    details: ['+91-755-277-0000', '+91-755-277-0001']
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@hbl.in', 'business@hbl.in']
  }
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Rate limiting check
    if (!formRateLimiter.canAttempt('contact-form')) {
      setError('Too many submissions. Please wait a minute before trying again.');
      return;
    }

    // Validate email
    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Sanitize all inputs
    const sanitizedData = {
      firstName: sanitizeInput(formData.firstName),
      lastName: sanitizeInput(formData.lastName),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message)
    };

    // Here you would send sanitizedData to your backend
    console.log('Sanitized form data:', sanitizedData);

    setIsSubmitted(true);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-[var(--muted)] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="%2300FFFF" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>')`,
          backgroundSize: '100px 100px'
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
          <span className="text-[var(--accent)] tracking-wider uppercase">Get in Touch</span>
          <h2 className="mt-4 text-4xl md:text-5xl text-[var(--primary)]">
            Let's Build the Future Together
          </h2>
          <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-lg">
            Whether you're a client, partner, or innovator, we're here to listen
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
              <h3 className="text-2xl text-[var(--primary)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Send Us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                      className="bg-gray-50 border-gray-200 focus:border-[var(--accent)]"
                      maxLength={50}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Doe"
                      className="bg-gray-50 border-gray-200 focus:border-[var(--accent)]"
                      maxLength={50}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john.doe@example.com"
                    className="bg-gray-50 border-gray-200 focus:border-[var(--accent)]"
                    maxLength={100}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="bg-gray-50 border-gray-200 focus:border-[var(--accent)]"
                    maxLength={20}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="How can we help you?"
                    className="bg-gray-50 border-gray-200 focus:border-[var(--accent)]"
                    maxLength={100}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us more about your inquiry..."
                    className="bg-gray-50 border-gray-200 focus:border-[var(--accent)] min-h-[120px]"
                    maxLength={1000}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[var(--accent)] text-[var(--primary)] hover:bg-[var(--accent)]/80 hover:shadow-xl hover:shadow-[var(--accent)]/50 transition-all"
                  size="lg"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information & Map */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[var(--accent)]/10 rounded-xl">
                      <info.icon className="w-6 h-6 text-[var(--accent)]" />
                    </div>
                    <div>
                      <h4 className="text-lg text-[var(--primary)] mb-2">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="rounded-2xl overflow-hidden shadow-2xl h-80">
              <img
                src="https://images.unsplash.com/photo-1560922604-d08a31f8f7d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDU1NTQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="HBL Engineering Headquarters"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Response Promise */}
            <div className="p-6 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-2xl text-white">
              <h4 className="text-xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Quick Response Promise
              </h4>
              <p className="text-gray-200">
                Our team typically responds to inquiries within 24 hours during business days.
                For urgent matters, please call our hotline.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
