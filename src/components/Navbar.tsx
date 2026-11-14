import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Platform', href: '#platform' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Security', href: '#security' },
  { label: 'Technology', href: '#technology' },
  { label: 'Team', href: '#team' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
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
            className="inline-flex items-center focus:outline-none rounded shrink-0"
            aria-label="DistriSight Home"
          >
            <BrandLogo variant="dark" size="md" />
          </a>

          {/* Center / Right Desktop Navigation */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <li key={item.href} className="flex">
                    <a
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`inline-flex items-center whitespace-nowrap px-3.5 py-2 text-sm rounded-md transition-colors ${
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

            <a
              href="#platform"
              className="inline-flex items-center whitespace-nowrap gap-1.5 px-4 py-2.5 text-sm font-medium text-white bg-teal hover:bg-teal-hover active:bg-navy rounded-md transition-colors shadow-sm"
            >
              <span>Explore the Platform</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
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
          className="md:hidden bg-white border-b border-border px-4 pt-3 pb-6 shadow-editorial-lg"
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={handleNavClick}
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

          <div className="mt-4 pt-4 border-t border-border">
            <a
              href="#platform"
              onClick={handleNavClick}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-teal hover:bg-teal-hover rounded-md transition-colors"
            >
              <span>Explore the Platform</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
