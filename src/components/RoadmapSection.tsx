import React from 'react';
import { ROADMAP_PHASES } from '../data/distrisightData';

export const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-20 lg:py-24 bg-ivory border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-10 border-b border-border">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-teal font-semibold">
              09 / PROJECT ROADMAP
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              Our Development Roadmap.
            </h2>
          </div>

          <span className="inline-flex items-center px-3 py-1.5 rounded bg-amber-light border border-amber/40 text-xs font-mono font-medium text-amber-dark self-start lg:self-auto">
            Proposed 16-Week Development Roadmap
          </span>
        </div>

        {/* Clean 8-Phase Timeline Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROADMAP_PHASES.map((phase) => {
            const isSecurity = phase.track === 'security';
            return (
              <div
                key={phase.phaseNumber}
                className="rounded-lg bg-white border border-border p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span
                      className={`px-2 py-0.5 rounded font-semibold ${
                        isSecurity
                          ? 'bg-amber-light text-amber-dark border border-amber/30'
                          : 'bg-teal-light text-teal'
                      }`}
                    >
                      {phase.weeks}
                    </span>
                    <span className="text-slate">{phase.phaseNumber}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-navy leading-snug">
                    {phase.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-border">
                  <div className="w-full bg-ivory h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isSecurity ? 'bg-amber' : 'bg-teal'}`}
                      style={{
                        marginLeft: `${((phase.startWeek - 1) / 16) * 100}%`,
                        width: `${((phase.endWeek - phase.startWeek + 1) / 16) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
