import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { SecuritySection } from './components/SecuritySection';
import { TechStackSection } from './components/TechStackSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { TeamSection } from './components/TeamSection';
import { RoadmapSection } from './components/RoadmapSection';
import { ImpactSection } from './components/ImpactSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { ProductApp } from './product/ProductApp';

const OBSERVED_SECTIONS = [
  'overview',
  'platform',
  'capabilities',
  'security',
  'technology',
  'team',
  'contact',
];

function checkIsContactRoute(): boolean {
  if (typeof window === 'undefined') return false;
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  return (
    hash === '#contact' ||
    hash === '#/contact' ||
    path === '/contact' ||
    path === '/contact/'
  );
}

function checkIsProductAppRoute(): boolean {
  if (typeof window === 'undefined') return false;
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  const search = window.location.search.toLowerCase();
  return (
    hash.startsWith('#app') ||
    hash.startsWith('#/app') ||
    hash.startsWith('#dashboard') ||
    hash.startsWith('#/dashboard') ||
    path.startsWith('/app') ||
    path.startsWith('/dashboard') ||
    search.includes('view=app')
  );
}

export function App() {
  const [isProductPage, setIsProductPage] = useState<boolean>(() => checkIsProductAppRoute());
  const [isContactPage, setIsContactPage] = useState<boolean>(() => checkIsContactRoute());
  const [activeSection, setActiveSection] = useState<string>(() =>
    checkIsContactRoute() ? 'contact' : 'overview'
  );

  useEffect(() => {
    const syncRoute = () => {
      const productRouteActive = checkIsProductAppRoute();
      const contactRouteActive = checkIsContactRoute();

      setIsProductPage(productRouteActive);
      setIsContactPage(!productRouteActive && contactRouteActive);

      if (productRouteActive) {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        return;
      }

      if (contactRouteActive) {
        setActiveSection('contact');
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        return;
      }

      // If there's another hash (e.g., #platform, #team), scroll to that element once rendered
      const rawHash = window.location.hash.replace('#', '');
      if (rawHash && !rawHash.startsWith('/')) {
        requestAnimationFrame(() => {
          const targetEl = document.getElementById(rawHash);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(rawHash);
          }
        });
      }
    };

    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  useEffect(() => {
    if (isProductPage || isContactPage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const sectionId of OBSERVED_SECTIONS) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProductPage, isContactPage]);

  const handleBackToHome = () => {
    if (
      window.location.pathname.toLowerCase().startsWith('/contact') ||
      window.location.pathname.toLowerCase().startsWith('/app') ||
      window.location.pathname.toLowerCase().startsWith('/dashboard')
    ) {
      window.history.pushState({}, '', '/#overview');
    } else {
      window.location.hash = '#overview';
    }
    setIsProductPage(false);
    setIsContactPage(false);
    setActiveSection('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchProductApp = () => {
    window.location.hash = '#/app';
    setIsProductPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user requested the Product App (/app or #/app), render the full interactive Product MVP!
  if (isProductPage) {
    return <ProductApp onExitToWebsite={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal">
      {/* SECTION A — NAVIGATION */}
      <Navbar
        activeSection={isContactPage ? 'contact' : activeSection}
        onLaunchApp={handleLaunchProductApp}
      />

      {isContactPage ? (
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {/* DEDICATED CONTACT PAGE VIEW */}
          <ContactSection isStandalonePage onBackToHome={handleBackToHome} />
        </main>
      ) : (
        <main className="flex-1">
          {/* SECTION B — HERO SECTION & INTERACTIVE PRODUCT CONSOLE */}
          <HeroSection onLaunchApp={handleLaunchProductApp} />

          {/* SECTION C — THE PROBLEM */}
          <ProblemSection />

          {/* SECTION D — THE SOLUTION (FOUR INTELLIGENCE LAYERS) */}
          <SolutionSection />

          {/* SECTION E — HOW IT WORKS (5-STAGE PIPELINE) */}
          <HowItWorksSection />

          {/* SECTION F — PRODUCT CAPABILITIES */}
          <CapabilitiesSection />

          {/* SECTION G — SECURITY */}
          <SecuritySection />

          {/* SECTION H — TECHNOLOGY STACK */}
          <TechStackSection />

          {/* SECTION I — SYSTEM ARCHITECTURE */}
          <ArchitectureSection />

          {/* SECTION J — TEAM */}
          <TeamSection />

          {/* SECTION K — PROJECT ROADMAP */}
          <RoadmapSection />

          {/* SECTION L — PROJECT IMPACT */}
          <ImpactSection />

          {/* SECTION M — CONTACT & TEAM DIRECTORY */}
          <ContactSection />
        </main>
      )}

      {/* SECTION N — FINAL CTA & FOOTER */}
      <FooterSection onLaunchApp={handleLaunchProductApp} />
    </div>
  );
}

export default App;
