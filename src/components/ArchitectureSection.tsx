import React from 'react';
import { ArrowDown, Lock } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section
      id="architecture"
      className="py-20 lg:py-24 bg-ivory border-b border-border bg-architectural-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-teal font-semibold">
            07 / SYSTEM ARCHITECTURE
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            End-to-End System Architecture.
          </h2>
        </div>

        <div className="mt-10 rounded-lg bg-white border border-border-strong shadow-editorial p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Main Pipeline (9 columns) */}
            <div className="lg:col-span-9 flex flex-col justify-between space-y-1.5 text-center">
              <div className="p-4 rounded bg-ivory border border-border">
                <h3 className="font-display text-base font-bold text-navy">Data Sources</h3>
                <p className="text-xs font-mono text-slate mt-1">
                  Excel &middot; CSV &middot; PostgreSQL &middot; ERP Exports
                </p>
              </div>

              <div className="flex justify-center" aria-hidden="true">
                <ArrowDown className="w-4 h-4 text-teal" />
              </div>

              <div className="p-4 rounded bg-white border border-border-strong">
                <h3 className="font-display text-base font-bold text-navy">
                  Ingestion and Schema Mapping
                </h3>
                <p className="text-xs text-slate mt-0.5">
                  File validation, column alignment &amp; format normalization
                </p>
              </div>

              <div className="flex justify-center" aria-hidden="true">
                <ArrowDown className="w-4 h-4 text-teal" />
              </div>

              <div className="p-4 rounded bg-white border border-border-strong">
                <h3 className="font-display text-base font-bold text-navy">
                  Data Quality and Monitoring
                </h3>
                <p className="text-xs text-slate mt-0.5">
                  Quality scoring, duplicate detection &amp; schema-drift alerts
                </p>
              </div>

              <div className="flex justify-center" aria-hidden="true">
                <ArrowDown className="w-4 h-4 text-teal" />
              </div>

              <div className="p-4 rounded bg-white border border-border-strong">
                <h3 className="font-display text-base font-bold text-navy">
                  Repair and Approval Workflow
                </h3>
                <p className="text-xs text-slate mt-0.5">
                  Auto-fix safe errors, quarantine uncertain records &amp; rollback support
                </p>
              </div>

              <div className="flex justify-center" aria-hidden="true">
                <ArrowDown className="w-4 h-4 text-teal" />
              </div>

              <div className="p-4 rounded bg-navy text-ivory">
                <h3 className="font-display text-base font-bold text-white">
                  Trusted PostgreSQL Analytics Layer
                </h3>
                <p className="text-xs text-ivory/75 mt-0.5">
                  Verified warehouse tables, business metrics &amp; data lineage
                </p>
              </div>

              <div className="grid grid-cols-2" aria-hidden="true">
                <div className="flex justify-center">
                  <ArrowDown className="w-4 h-4 text-teal" />
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="w-4 h-4 text-teal" />
                </div>
              </div>

              {/* Parallel Intelligence Modules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded bg-teal-light/60 border border-teal/40">
                  <h3 className="font-display text-base font-bold text-navy">
                    Conversational Analytics
                  </h3>
                  <p className="text-xs text-charcoal/80 mt-0.5">
                    English &amp; Roman Urdu to validated SQL, charts &amp; explanations
                  </p>
                </div>

                <div className="p-4 rounded bg-teal-light/60 border border-teal/40">
                  <h3 className="font-display text-base font-bold text-navy">
                    Predictive Intelligence
                  </h3>
                  <p className="text-xs text-charcoal/80 mt-0.5">
                    Demand forecasting, stockout risk &amp; overstock detection
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2" aria-hidden="true">
                <div className="flex justify-center">
                  <ArrowDown className="w-4 h-4 text-teal" />
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="w-4 h-4 text-teal" />
                </div>
              </div>

              <div className="p-4 rounded bg-ivory border border-border-strong">
                <h3 className="font-display text-base font-bold text-navy">
                  Recommendations, Reports and Alerts
                </h3>
                <p className="text-xs text-slate mt-0.5">
                  Reorder suggestions, risk alerts &amp; feedback loop
                </p>
              </div>
            </div>

            {/* Cross-Cutting Cybersecurity Layer (3 columns) */}
            <div className="lg:col-span-3 rounded-lg bg-navy text-ivory border border-border-dark p-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber text-navy font-mono text-[11px] font-bold uppercase">
                  <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                  Cross-Cutting Layer
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  Cybersecurity Protection
                </h3>
                <p className="mt-1.5 text-xs text-ivory/70">
                  Covers the complete system across all stages:
                </p>

                <ul className="mt-5 space-y-2.5 font-mono text-xs">
                  {[
                    'Role-Based Access Control',
                    'AI Query Guard (SQLGlot)',
                    'Prompt-Injection Defence',
                    'PII Masking',
                    'Tamper-Evident Audit Logs',
                    'Secure File Processing',
                    'Fraud & Threat Detection',
                  ].map((item) => (
                    <li
                      key={item}
                      className="p-2.5 rounded bg-navy-light border border-border-dark text-ivory/90"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
