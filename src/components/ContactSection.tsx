import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Users, ArrowUpRight } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/distrisightData';

const OFFICIAL_EMAIL = 'distrisight.official@gmail.com';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [inquiryType, setInquiryType] = useState('Wholesale Pilot / Product Demo');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OFFICIAL_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard permission denied
      setCopied(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[DistriSight Inquiry] ${inquiryType} — ${senderName}`);
    const body = encodeURIComponent(
      `Name: ${senderName}\nEmail: ${senderEmail}\nOrganization / Business: ${
        organization || 'N/A'
      }\nInquiry Topic: ${inquiryType}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${OFFICIAL_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-ivory border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl pb-10 border-b border-border">
          <span className="text-xs font-mono uppercase tracking-widest text-teal font-semibold">
            11 / CONTACT &amp; TEAM DIRECTORY
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Get in Touch With the DistriSight Team.
          </h2>
          <p className="mt-3 text-base text-slate leading-relaxed">
            Reach out for academic evaluation inquiries, wholesale distributor pilot collaborations,
            or technical questions regarding the DistriSight platform.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 6 Columns: Official Email & Team Member Directory */}
          <div className="lg:col-span-6 space-y-6">
            {/* Official Email Card */}
            <div className="rounded-lg bg-navy text-ivory p-6 sm:p-7 border border-border-dark shadow-editorial">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Official Project Contact</span>
              </div>

              <h3 className="mt-2 font-display text-xl font-bold text-white">
                Direct Email Correspondence
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-ivory/75">
                All inquiries reach the DistriSight project leadership and engineering team directly:
              </p>

              <div className="mt-5 p-3.5 rounded-md bg-navy-light border border-border-dark flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${OFFICIAL_EMAIL}`}
                  className="font-mono text-sm sm:text-base font-semibold text-white hover:text-amber transition-colors break-all"
                >
                  {OFFICIAL_EMAIL}
                </a>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-navy hover:bg-navy-dark text-ivory border border-border-dark text-xs font-mono transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-muted" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-ivory/70" aria-hidden="true" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${OFFICIAL_EMAIL}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-teal hover:bg-teal-hover text-white text-xs font-mono font-medium transition-colors"
                  >
                    <span>Email Us</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            {/* Team Members Details Directory */}
            <div className="rounded-lg bg-white border border-border-strong p-6 sm:p-7 shadow-panel">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold text-navy">
                    Project Team Member Directory
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate">4 Core Leads</span>
              </div>

              <ul className="mt-4 divide-y divide-border">
                {TEAM_MEMBERS.map((member) => (
                  <li key={member.name} className="py-4 first:pt-1 last:pb-1">
                    <div className="flex items-start gap-3.5">
                      <div
                        className="w-10 h-10 rounded-md bg-navy text-ivory font-display font-bold text-xs flex items-center justify-center shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        {member.initials}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-display text-base font-bold text-navy">
                            {member.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded bg-ivory border border-border font-mono text-[11px] text-charcoal">
                            {member.domainBadge}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-semibold text-teal mt-0.5">
                          {member.primaryDesignation}
                        </p>

                        {member.secondaryResponsibility && (
                          <p className="text-xs font-mono font-semibold text-amber-dark mt-1">
                            Additional Role: {member.secondaryResponsibility}
                          </p>
                        )}

                        <p className="mt-1.5 text-xs text-slate leading-relaxed">
                          Focus: {member.responsibilities.slice(0, 4).join(' · ')}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right 6 Columns: Direct Inquiry Form */}
          <div className="lg:col-span-6 rounded-lg bg-white border border-border-strong p-6 sm:p-8 shadow-editorial">
            <h3 className="font-display text-xl font-bold text-navy">Send an Inquiry</h3>
            <p className="mt-1 text-xs sm:text-sm text-slate">
              Fill out the details below to compose a direct message to{' '}
              <span className="font-mono text-navy font-medium">{OFFICIAL_EMAIL}</span>.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono uppercase tracking-wider text-navy font-semibold mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g., Ahmad Tariq"
                  className="w-full px-3.5 py-2.5 rounded-md bg-ivory/60 border border-border text-sm text-navy placeholder:text-slate/60 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono uppercase tracking-wider text-navy font-semibold mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 rounded-md bg-ivory/60 border border-border text-sm text-navy placeholder:text-slate/60 focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-org"
                    className="block text-xs font-mono uppercase tracking-wider text-navy font-semibold mb-1.5"
                  >
                    Organization (Optional)
                  </label>
                  <input
                    id="contact-org"
                    name="organization"
                    type="text"
                    autoComplete="organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Distribution Co. / University"
                    className="w-full px-3.5 py-2.5 rounded-md bg-ivory/60 border border-border text-sm text-navy placeholder:text-slate/60 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-topic"
                  className="block text-xs font-mono uppercase tracking-wider text-navy font-semibold mb-1.5"
                >
                  Inquiry Topic
                </label>
                <select
                  id="contact-topic"
                  name="topic"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-md bg-ivory/60 border border-border text-sm text-navy focus:bg-white"
                >
                  <option value="Wholesale Pilot / Product Demo">
                    Wholesale Pilot / Product Demo
                  </option>
                  <option value="FYP Evaluation & Academic Inquiry">
                    FYP Evaluation &amp; Academic Inquiry
                  </option>
                  <option value="Data Quality & AI Architecture">
                    Data Quality &amp; AI Architecture
                  </option>
                  <option value="Cybersecurity & Audit Compliance">
                    Cybersecurity &amp; Audit Compliance
                  </option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase tracking-wider text-navy font-semibold mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your distribution workflow or question for the team..."
                  className="w-full px-3.5 py-2.5 rounded-md bg-ivory/60 border border-border text-sm text-navy placeholder:text-slate/60 focus:bg-white resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-teal hover:bg-teal-hover text-white font-semibold text-sm transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Send Message to {OFFICIAL_EMAIL}</span>
              </button>

              {submitted && (
                <p
                  role="status"
                  aria-live="polite"
                  className="text-xs font-mono text-teal bg-teal-light p-3 rounded border border-teal/30"
                >
                  Opening your email client addressed to {OFFICIAL_EMAIL}. You can also email us
                  directly anytime.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
