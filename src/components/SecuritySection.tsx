import React from 'react';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Link2,
  FileSearch,
  AlertOctagon,
  ArrowRight,
} from 'lucide-react';

const SECURITY_MECHANISMS = [
  {
    number: '01',
    title: 'AI Query Guard',
    icon: ShieldCheck,
    description:
      'Validates generated SQL using SQLGlot, allows only approved SELECT statements, applies query restrictions and blocks unauthorized database access.',
  },
  {
    number: '02',
    title: 'Role-Based Access Control',
    icon: Lock,
    description:
      'Different permissions for owners, branch managers, analysts and auditors.',
  },
  {
    number: '03',
    title: 'PII Masking',
    icon: EyeOff,
    description:
      'Sensitive customer information is restricted based on permissions.',
  },
  {
    number: '04',
    title: 'Tamper-Evident Audit Logs',
    icon: Link2,
    description:
      'Hash-chained records make unauthorized changes to audit history detectable.',
  },
  {
    number: '05',
    title: 'Secure File Processing',
    icon: FileSearch,
    description:
      'File validation, malware scanning and CSV/Excel formula-injection protection.',
  },
  {
    number: '06',
    title: 'Fraud and Threat Detection',
    icon: AlertOctagon,
    description:
      'Flags suspicious price modifications, unusual bulk changes, backdated invoices and other anomalies.',
  },
];

export const SecuritySection: React.FC = () => {
  return (
    <section
      id="security"
      className="py-20 lg:py-24 bg-navy text-ivory border-b border-border-dark bg-architectural-grid-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl pb-10 border-b border-border-dark">
          <span className="text-xs font-mono uppercase tracking-widest text-amber font-semibold">
            05 / CYBERSECURITY
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Intelligence Without Compromising Data Security.
          </h2>
          <p className="mt-3 text-base text-ivory/75 leading-relaxed">
            Every file upload, user session, and natural-language query is governed by six concrete
            security mechanisms.
          </p>
        </div>

        {/* 6 Security Mechanisms Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SECURITY_MECHANISMS.map((mech) => {
            const IconComponent = mech.icon;
            return (
              <div
                key={mech.number}
                className="rounded-lg bg-navy-light border border-border-dark p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-semibold text-amber">
                    {mech.number}
                  </span>
                  <IconComponent className="w-4 h-4 text-teal-muted" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">{mech.title}</h3>
                <p className="mt-2 text-sm text-ivory/75 leading-relaxed">{mech.description}</p>
              </div>
            );
          })}
        </div>

        {/* Clean Security Architecture Visualization */}
        <div className="mt-10 rounded-lg bg-navy-light border border-border-dark p-6">
          <div className="text-xs font-mono uppercase tracking-wider text-amber mb-4">
            Security Architecture Verification Flow
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-4 rounded bg-navy border border-border-dark flex items-center justify-between">
              <div>
                <span className="text-[10px] text-ivory/50 block">GATE 01</span>
                <span className="font-semibold text-white">ClamAV &amp; Formula Scan</span>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-muted hidden lg:block" aria-hidden="true" />
            </div>

            <div className="p-4 rounded bg-navy border border-border-dark flex items-center justify-between">
              <div>
                <span className="text-[10px] text-ivory/50 block">GATE 02</span>
                <span className="font-semibold text-white">RBAC &amp; PII Masking</span>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-muted hidden lg:block" aria-hidden="true" />
            </div>

            <div className="p-4 rounded bg-navy border border-border-dark flex items-center justify-between">
              <div>
                <span className="text-[10px] text-ivory/50 block">GATE 03</span>
                <span className="font-semibold text-white">SQLGlot SELECT-Only Guard</span>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-muted hidden lg:block" aria-hidden="true" />
            </div>

            <div className="p-4 rounded bg-navy border border-teal/50">
              <span className="text-[10px] text-amber block">GATE 04</span>
              <span className="font-semibold text-white">Hash-Chained Audit Log</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
