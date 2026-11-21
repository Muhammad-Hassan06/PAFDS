import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  activeSection: string;
  onLaunchApp?: () => void;
}

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Platform', href: '#platform' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Security', href: '#security' },
  { label: 'Technology', href: '#technology' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onLaunchApp }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetHref: string) => {
    setMobileMenuOpen(false);
    // If the user opened /contact via pathname, ensure hash navigation resets pathname to '/'
    if (window.location.pathname.toLowerCase().startsWith('/contact') && targetHref !== '#contact') {
      e.preventDefault();
      window.history.pushState({}, '', `/${targetHref}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleLaunch = () => {
    setMobileMenuOpen(false);
    if (onLaunchApp) {
      onLaunchApp();
    } else {
      window.location.hash = '#/app';
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-md border-b border-border shadow-editorial'
          : 'bg-ivory border-b border-border'
      }`}
    >
      <a
        href="#main-content"
        className="visually-hidden focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-navy focus:text-ivory focus:rounded focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Logo & Wordmark */}
          <a
            href="#overview"
            onClick={(e) => handleLinkClick(e, '#overview')}
            className="inline-flex items-center focus:outline-none rounded shrink-0"
            aria-label="DistributionIQ Home"
          >
            <BrandLogo variant="dark" size="md" />
          </a>

          {/* Center / Right Desktop Navigation */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-3 lg:gap-5">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <li key={item.href} className="flex">
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`inline-flex items-center whitespace-nowrap px-3 py-2 text-sm rounded-md transition-colors ${
                        isActive
                          ? 'text-navy font-semibold bg-white border border-border shadow-sm'
                          : 'text-charcoal/80 font-medium hover:text-navy hover:bg-ivory-dark/50'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Launch Interactive Product MVP CTA */}
            <button
              onClick={handleLaunch}
              className="inline-flex items-center whitespace-nowrap gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-teal hover:bg-teal-hover active:bg-navy rounded-md transition-colors shadow-sm"
              title="Launch the Interactive Product MVP"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span>Launch Product MVP</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-200" aria-hidden="true" />
            </button>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleLaunch}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-teal text-white text-xs font-semibold shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <span>Launch MVP</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-white text-navy text-sm font-medium hover:bg-ivory-dark/40"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-navy" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4 text-navy" aria-hidden="true" />
              )}
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-menu"
          aria-label="Mobile Primary"
          className="md:hidden bg-white border-b border-border px-4 pt-3 pb-6 shadow-editorial-lg space-y-3"
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium ${
                      isActive
                        ? 'bg-teal-light text-teal font-semibold'
                        : 'text-charcoal hover:bg-ivory'
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="pt-2 border-t border-border">
            <button
              onClick={handleLaunch}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-teal hover:bg-teal-hover rounded-md transition-colors shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span>Launch Interactive Product MVP</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-200" aria-hidden="true" />
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};
