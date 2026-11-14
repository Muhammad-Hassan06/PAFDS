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
import { FooterSection } from './components/FooterSection';

const OBSERVED_SECTIONS = ['overview', 'platform', 'capabilities', 'security', 'technology', 'team'];

export function App() {
  const [activeSection, setActiveSection] = useState<string>('overview');

  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal">
      {/* SECTION A — NAVIGATION */}
      <Navbar activeSection={activeSection} />

      <main className="flex-1">
        {/* SECTION B — HERO SECTION & INTERACTIVE PRODUCT CONSOLE */}
        <HeroSection />

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
      </main>

      {/* SECTION M — FINAL CTA & SECTION N — FOOTER */}
      <FooterSection />
    </div>
  );
}

export default App;
