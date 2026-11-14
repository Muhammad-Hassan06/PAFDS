import React from 'react';
import { Upload, ShieldCheck, Database, MessageSquare, BellRing } from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Connect Data',
    desc: 'Upload Excel, CSV or connect PostgreSQL.',
    icon: Upload,
  },
  {
    step: '02',
    title: 'Validate and Clean',
    desc: 'Detect data issues, calculate quality scores and safely repair records.',
    icon: ShieldCheck,
  },
  {
    step: '03',
    title: 'Build Trusted Analytics',
    desc: 'Store validated records in a structured PostgreSQL data layer.',
    icon: Database,
  },
  {
    step: '04',
    title: 'Ask and Predict',
    desc: 'Ask business questions in English or Roman Urdu and generate forecasts.',
    icon: MessageSquare,
  },
  {
    step: '05',
    title: 'Recommend and Monitor',
    desc: 'Receive actionable recommendations, alerts and continuous monitoring.',
    icon: BellRing,
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-teal font-semibold">
            03 / HOW IT WORKS
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            From Fragmented Records to Confident Decisions.
          </h2>
        </div>

        {/* Clean 5-Step Connected Pipeline */}
        <ol className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-4">
          {WORKFLOW_STEPS.map((item) => {
            const IconComponent = item.icon;
            return (
              <li
                key={item.step}
                className="p-5 rounded-lg bg-ivory/60 border border-border flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white text-navy border border-border">
                      STEP {item.step}
                    </span>
                    <IconComponent className="w-4 h-4 text-teal" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate leading-relaxed">{item.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
