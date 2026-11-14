import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const EXPECTED_IMPACTS = [
  'More trustworthy business reports.',
  'Reduced manual data-cleaning work.',
  'Faster access to business insights.',
  'Better inventory planning.',
  'Earlier identification of stockout risks.',
  'Improved visibility into suspicious activity.',
  'More secure handling of commercial data.',
];

export const ImpactSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-widest text-teal font-semibold">
              10 / PROJECT IMPACT
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Designed to Solve Real Distribution Challenges.
            </h2>
            <p className="mt-4 text-base text-slate leading-relaxed">
              Practical operational value built around data reliability, accessible analytics, and
              commercial security.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EXPECTED_IMPACTS.map((impact) => (
              <div
                key={impact}
                className="p-4 rounded-lg bg-ivory/60 border border-border flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm font-semibold text-navy">{impact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
