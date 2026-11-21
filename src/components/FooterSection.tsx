import React from 'react';
import { ArrowUpRight, ShieldCheck, Mail } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterSectionProps {
  onLaunchApp?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onLaunchApp }) => {
  return (
    <>
      {/* SECTION M — FINAL CTA */}
      <section className="py-20 lg:py-24 bg-navy text-ivory border-b border-border-dark bg-architectural-grid-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-navy-light border border-border-dark p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-editorial-lg">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy border border-border-dark text-amber font-mono text-xs font-semibold mb-4">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>TRUSTED DATA. CLEAR INSIGHTS. SMARTER DISTRIBUTION.</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                Better Data. Better Decisions. Better Distribution.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-ivory/80 leading-relaxed">
                Bringing data reliability, intelligent analytics and cybersecurity together for the
                next generation of wholesale distribution.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
              <button
                onClick={onLaunchApp ? onLaunchApp : () => { window.location.hash = '#/app'; }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-teal hover:bg-teal-hover text-white font-semibold text-sm sm:text-base transition-colors shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                <span>Launch Product MVP</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-navy hover:bg-navy-dark text-ivory/85 border border-border-dark font-mono text-xs transition-colors"
              >
                <span>Contact the Team</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION N — FOOTER */}
      <footer className="bg-navy-dark text-ivory/80 pt-16 pb-12 border-t border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-border-dark">
            {/* Col 1: Brand, Description & Contact Email (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <BrandLogo variant="light" size="md" showTagline />
              <p className="text-sm text-ivory/70 leading-relaxed pr-4">
                A Secure Data Intelligence, Quality Management and Decision Support Platform for
                Wholesale Distributors.
              </p>
              <p className="font-mono text-xs text-amber">
                Trusted Data. Clear Insights. Smarter Distribution.
              </p>
              <div className="pt-2">
                <a
                  href="mailto:distrisight.official@gmail.com"
                  className="inline-flex items-center gap-2 text-xs font-mono text-ivory/90 hover:text-amber transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-teal-muted" aria-hidden="true" />
                  <span>distrisight.official@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Col 2: Navigation Links (2 cols) */}
            <div className="lg:col-span-2">
              <h3 className="font-mono text-xs uppercase tracking-wider text-white font-semibold mb-4">
                Navigation
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  { label: 'Overview', href: '#overview' },
                  { label: 'Platform Layers', href: '#platform' },
                  { label: 'Capabilities', href: '#capabilities' },
                  { label: 'Security', href: '#security' },
                  { label: 'Technology Stack', href: '#technology' },
                  { label: 'Architecture', href: '#architecture' },
                  { label: 'Team', href: '#team' },
                  { label: '16-Week Roadmap', href: '#roadmap' },
                  { label: 'Contact', href: '#contact' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-ivory/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Project Domains (3 cols) */}
            <div className="lg:col-span-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-white font-semibold mb-4">
                Project Domains
              </h3>
              <ul className="space-y-2 text-sm text-ivory/70">
                <li>Artificial Intelligence &amp; Machine Learning</li>
                <li>Data Engineering</li>
                <li>Software Engineering</li>
                <li>Cybersecurity</li>
                <li>Business Intelligence &amp; Analytics</li>
              </ul>

              <h3 className="font-mono text-xs uppercase tracking-wider text-white font-semibold mt-6 mb-2">
                Technology Summary
              </h3>
              <p className="text-xs font-mono text-ivory/65 leading-relaxed">
                Python &middot; FastAPI &middot; PostgreSQL &middot; Pandas/Polars &middot;
                Pandera/Great Expectations &middot; XGBoost &middot; SQLGlot &middot; React &middot;
                Tailwind CSS &middot; Docker
              </p>
            </div>

            {/* Col 4: Engineering Team (3 cols) */}
            <div className="lg:col-span-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-white font-semibold mb-4">
                Engineering Team
              </h3>
              <ul className="space-y-3 text-xs">
                <li>
                  <span className="text-white font-semibold block text-sm">Muhammad Hassan</span>
                  <span className="text-ivory/65">
                    Project Lead &amp; AI/Natural-Language Analytics Lead
                  </span>
                </li>
                <li>
                  <span className="text-white font-semibold block text-sm">Farjad Khan</span>
                  <span className="text-ivory/65">Backend &amp; Data Infrastructure Lead</span>
                </li>
                <li>
                  <span className="text-white font-semibold block text-sm">Zain Raza</span>
                  <span className="text-ivory/65">
                    Data Quality &amp; Machine Learning Lead &middot; Finance &amp; Budget
                    Coordination
                  </span>
                </li>
                <li>
                  <span className="text-white font-semibold block text-sm">Shaji Naqvi</span>
                  <span className="text-ivory/65">Cybersecurity &amp; Frontend Lead</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Notice */}
          <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-ivory/55">
            <div>
              &copy; {new Date().getFullYear()} DistriSight Final Year Project. All rights reserved.
            </div>
            <div>
              Contact: distrisight.official@gmail.com
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
