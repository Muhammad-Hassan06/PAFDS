import React from 'react';
import { TEAM_MEMBERS } from '../data/distrisightData';
import { Check, Wallet } from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-20 lg:py-24 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-teal font-semibold">
            08 / TEAM
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Meet the Team Behind DistriSight.
          </h2>
          <p className="mt-3 text-base text-slate leading-relaxed">
            A collaborative engineering team combining artificial intelligence, data engineering,
            machine learning, software development and cybersecurity.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <article
              key={member.name}
              className="rounded-lg bg-ivory/50 border border-border-strong p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4 pb-5 border-b border-border">
                  <div
                    className="w-12 h-12 rounded-md bg-navy text-ivory font-display font-bold text-base flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    {member.initials}
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold text-navy">{member.name}</h3>
                    <p className="mt-0.5 text-sm font-semibold text-teal">
                      {member.primaryDesignation}
                    </p>
                    {member.secondaryResponsibility && (
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-light border border-amber/40 text-xs font-mono font-semibold text-amber-dark">
                        <Wallet className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Additional Responsibility: {member.secondaryResponsibility}</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-sm text-charcoal/85 leading-relaxed">
                  {member.shortDescription}
                </p>

                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs sm:text-sm text-charcoal">
                  {member.responsibilities.map((resp) => (
                    <li key={resp} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-teal shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
