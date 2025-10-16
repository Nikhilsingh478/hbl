import { lazy, Suspense, useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { HBLLoader } from './components/HBLLoader';
import { IntroLoader } from './components/IntroLoader';

// Lazy load sections for better performance
const AboutSection = lazy(() => import('./components/AboutSection').then(m => ({ default: m.AboutSection })));
const BusinessUnitsSection = lazy(() => import('./components/BusinessUnitsSection').then(m => ({ default: m.BusinessUnitsSection })));
const InnovationSection = lazy(() => import('./components/InnovationSection').then(m => ({ default: m.InnovationSection })));
const GlobalPresenceSection = lazy(() => import('./components/GlobalPresenceSection').then(m => ({ default: m.GlobalPresenceSection })));
const CareersSection = lazy(() => import('./components/CareersSection').then(m => ({ default: m.CareersSection })));
const InvestorRelationsSection = lazy(() => import('./components/InvestorRelationsSection').then(m => ({ default: m.InvestorRelationsSection })));
const ContactSection = lazy(() => import('./components/ContactSection').then(m => ({ default: m.ContactSection })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if this is the first visit or if we should show the intro
    const hasSeenIntro = sessionStorage.getItem('hbl-intro-seen');
    
    if (hasSeenIntro === 'true') {
      // User has already seen the intro in this session
      setShowIntro(false);
      setIsReady(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('hbl-intro-seen', 'true');
    setShowIntro(false);
    setIsReady(true);
  };

  return (
    <>
      {/* Premium Intro Loader - Shows on first visit */}
      {showIntro && <IntroLoader onComplete={handleIntroComplete} minDuration={3500} useLocalStorage={false} />}
      
      {/* Main Application */}
      <div className="min-h-screen bg-background">
        <CustomCursor />
        <ScrollProgress />
        <Navigation />
        <main>
          <HeroSection />
          <Suspense fallback={<HBLLoader />}>
            <AboutSection />
          </Suspense>
          <Suspense fallback={<HBLLoader />}>
            <BusinessUnitsSection />
          </Suspense>
          <Suspense fallback={<HBLLoader />}>
            <InnovationSection />
          </Suspense>
          <Suspense fallback={<HBLLoader />}>
            <GlobalPresenceSection />
          </Suspense>
          <Suspense fallback={<HBLLoader />}>
            <CareersSection />
          </Suspense>
          <Suspense fallback={<HBLLoader />}>
            <InvestorRelationsSection />
          </Suspense>
          <Suspense fallback={<HBLLoader />}>
            <ContactSection />
          </Suspense>
        </main>
        <Suspense fallback={<HBLLoader />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}
