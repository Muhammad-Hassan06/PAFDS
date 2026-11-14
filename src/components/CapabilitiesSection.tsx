import React from 'react';
import { CAPABILITIES_LIST } from '../data/distrisightData';

export const CapabilitiesSection: React.FC = () => {
  return (
    <section id="capabilities" className="py-20 lg:py-24 bg-ivory border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-border">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-teal font-semibold">
              04 / PRODUCT CAPABILITIES
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Core &amp; Planned Platform Capabilities.
            </h2>
            <p className="mt-3 text-base text-slate">
              Core features are scheduled for the primary build, while stretch features are
              planned once core modules are validated.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-border text-navy">
              <span className="w-2 h-2 rounded-full bg-teal" />
              Core Feature
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-border text-charcoal">
              <span className="w-2 h-2 rounded-full bg-amber" />
              Planned Stretch
            </span>
          </div>
        </div>

        {/* Clean 12-Item Capabilities Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES_LIST.map((cap) => {
            const isCore = cap.status === 'Core FYP Build';
            return (
              <div
                key={cap.id}
                className="rounded-lg bg-white border border-border p-5 flex flex-col justify-between shadow-panel"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-mono uppercase text-slate">
                      {cap.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        isCore
                          ? 'bg-teal-light text-teal'
                          : 'bg-amber-light text-amber-dark border border-amber/30'
                      }`}
                    >
                      {isCore ? 'Core' : 'Stretch'}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-navy">{cap.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
