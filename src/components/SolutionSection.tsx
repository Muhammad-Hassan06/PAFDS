import React from 'react';
import {
  Database,
  MessageSquareCode,
  TrendingUp,
  ShieldAlert,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const SolutionSection: React.FC = () => {
  return (
    <section id="platform" className="py-20 lg:py-24 bg-ivory border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-teal font-semibold">
            02 / THE PLATFORM
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            One Platform. Four Connected Intelligence Layers.
          </h2>
          <p className="mt-4 text-base text-charcoal/80 leading-relaxed">
            DistriSight checks and repairs data first, enables bilingual conversational analytics
            second, and powers predictive replenishment third—protected by a dedicated security
            layer.
          </p>
        </div>

        {/* 4 Modules Grid */}
        <div className="mt-12 space-y-8">
          {/* MODULE 01 — Data Integration & Quality */}
          <div className="rounded-lg bg-white border border-border-strong p-6 sm:p-8 shadow-editorial grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-teal-light text-teal font-mono text-xs font-semibold">
                <Database className="w-3.5 h-3.5" aria-hidden="true" />
                <span>01 — DATA INTEGRATION &amp; QUALITY</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold text-navy">
                Automated Data Profiling, Scoring &amp; Safe Repair
              </h3>
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-charcoal">
                {[
                  'Excel, CSV and PostgreSQL ingestion.',
                  'Schema mapping and normalization.',
                  'Missing value and duplicate detection.',
                  'Data quality scoring.',
                  'Automated and human-approved repairs.',
                  'Continuous monitoring and schema-drift alerts.',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <CheckCircle2
                      className="w-4 h-4 text-teal shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 p-5 rounded-lg bg-ivory border border-border">
              <div className="text-xs font-mono uppercase text-slate mb-3">
                Two-Level Remediation Workflow
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded bg-white border border-border">
                  <span className="font-mono font-semibold text-teal uppercase block">
                    Automatic Repair
                  </span>
                  <p className="mt-1 text-slate">
                    Standardizes unambiguous dates, units, and product naming variants on load.
                  </p>
                </div>
                <div className="p-3.5 rounded bg-white border border-border">
                  <span className="font-mono font-semibold text-amber-dark uppercase block">
                    Human Approval
                  </span>
                  <p className="mt-1 text-slate">
                    Quarantines suspected duplicate invoices and invalid quantities for manager
                    sign-off.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MODULE 02 — Conversational Analytics */}
          <div className="rounded-lg bg-white border border-border-strong p-6 sm:p-8 shadow-editorial grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-teal-light text-teal font-mono text-xs font-semibold">
                <MessageSquareCode className="w-3.5 h-3.5" aria-hidden="true" />
                <span>02 — CONVERSATIONAL ANALYTICS</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold text-navy">
                English &amp; Roman Urdu Natural-Language Analytics
              </h3>
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-charcoal">
                {[
                  'Natural-language business queries.',
                  'English and Roman Urdu support.',
                  'Validated SQL generation.',
                  'Read-only query execution.',
                  'Tables, charts and explanations.',
                  'Traceable answers linked to source data and SQL.',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <CheckCircle2
                      className="w-4 h-4 text-teal shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 p-5 rounded-lg bg-navy text-ivory border border-border-dark">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber block">
                Example Query (Roman Urdu + English)
              </span>
              <p className="mt-2 font-mono text-sm text-white" lang="ur-Latn">
                &ldquo;Which products ki sales pichle 60 din mein sab se zyada decrease hui
                hain?&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-border-dark flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-ivory/75">
                <span>SQLGlot AST Validated (SELECT-only)</span>
                <span className="text-teal-light">Linked to verified source tables</span>
              </div>
            </div>
          </div>

          {/* MODULE 03 & MODULE 04 — Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* MODULE 03 — Predictive Intelligence */}
            <div className="rounded-lg bg-white border border-border-strong p-6 sm:p-8 shadow-editorial flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-teal-light text-teal font-mono text-xs font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>03 — PREDICTIVE INTELLIGENCE</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-navy">
                  Demand Forecasting &amp; Stockout Prevention
                </h3>
                <ul className="mt-5 space-y-2.5 text-sm text-charcoal">
                  {[
                    'Product demand forecasting.',
                    'Stockout-risk prediction.',
                    'Overstock detection.',
                    'Replenishment recommendations.',
                    'Customer purchasing trend analysis.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 text-teal shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 p-4 rounded bg-ivory border border-border grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div>
                  <span className="text-[10px] text-slate block">In Stock</span>
                  <span className="font-bold text-navy">120 units</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate block">3-Wk Forecast</span>
                  <span className="font-bold text-amber-dark">300 units</span>
                </div>
                <div>
                  <span className="text-[10px] text-teal block">Suggested Order</span>
                  <span className="font-bold text-teal">+240 units</span>
                </div>
              </div>
            </div>

            {/* MODULE 04 — Security & Data Protection */}
            <div className="rounded-lg bg-white border border-border-strong p-6 sm:p-8 shadow-editorial flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-light text-amber-dark border border-amber/30 font-mono text-xs font-semibold">
                  <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>04 — SECURITY &amp; DATA PROTECTION</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-navy">
                  Built-In Governance &amp; Threat Protection
                </h3>
                <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-charcoal">
                  {[
                    'AI Query Guard.',
                    'Prompt-injection defence.',
                    'Role-Based Access Control.',
                    'PII masking.',
                    'Tamper-evident audit logs.',
                    'Secure file uploads.',
                    'Fraud and suspicious activity detection.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Lock className="w-3.5 h-3.5 text-teal shrink-0 mt-1" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 p-4 rounded bg-ivory border border-border text-xs font-mono text-slate flex items-center justify-between">
                <span>Roles: Owner &middot; Branch Manager &middot; Analyst &middot; Auditor</span>
                <span className="text-navy font-semibold">Least-Privilege Enforced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
