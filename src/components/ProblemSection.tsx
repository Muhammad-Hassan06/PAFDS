import React from 'react';
import { Unplug, FileWarning, Clock, TrendingDown } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Editorial Header */}
        <div className="max-w-3xl pb-12 border-b border-border">
          <span className="text-xs font-mono uppercase tracking-widest text-teal font-semibold">
            01 / THE CHALLENGE
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Business Decisions Are Only as Reliable as the Data Behind Them.
          </h2>
          <p className="mt-4 text-base text-slate leading-relaxed">
            Wholesale distributors rely on high volume and fast inventory turnover, yet daily
            decisions are hindered by four foundational data problems.
          </p>
        </div>

        {/* Four Distinct Editorial Problem Presentations */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border border-b border-border">
          {/* 1. Fragmented Business Data */}
          <div className="py-10 md:pr-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-teal font-semibold">
                <span>01 / DATA SILOS</span>
                <Unplug className="w-4 h-4 text-teal" aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-navy">
                Fragmented Business Data
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-charcoal/80 leading-relaxed">
                Sales, inventory, customer information and supplier records are scattered across
                Excel, ERP systems and separate databases.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-2 font-mono text-xs text-slate">
              <span className="px-2.5 py-1 rounded bg-ivory border border-border">
                Excel Spreadsheets
              </span>
              <span className="px-2.5 py-1 rounded bg-ivory border border-border">
                ERP CSV Exports
              </span>
              <span className="px-2.5 py-1 rounded bg-ivory border border-border">
                Disconnected Ledgers
              </span>
            </div>
          </div>

          {/* 2. Poor Data Quality */}
          <div className="py-10 md:pl-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-amber-dark font-semibold">
                <span>02 / UNVERIFIED RECORDS</span>
                <FileWarning className="w-4 h-4 text-amber-dark" aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-navy">
                Poor Data Quality
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-charcoal/80 leading-relaxed">
                Missing identifiers, duplicate invoices, inconsistent product names and invalid
                quantities make business reports unreliable.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-2 font-mono text-xs text-amber-dark">
              <span className="px-2.5 py-1 rounded bg-amber-light border border-amber/30">
                Duplicate Invoices
              </span>
              <span className="px-2.5 py-1 rounded bg-amber-light border border-amber/30">
                Missing Customer IDs
              </span>
              <span className="px-2.5 py-1 rounded bg-amber-light border border-amber/30">
                Invalid Quantities
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* 3. Limited Access to Analytics */}
          <div className="py-10 md:pr-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-teal font-semibold">
                <span>03 / TECHNICAL BOTTLENECK</span>
                <Clock className="w-4 h-4 text-teal" aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-navy">
                Limited Access to Analytics
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-charcoal/80 leading-relaxed">
                Business managers often depend on technical employees or SQL expertise to answer
                basic business questions.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border font-mono text-xs text-slate">
              Manual report assembly delays routine sales and margin answers by days.
            </div>
          </div>

          {/* 4. Reactive Decision-Making */}
          <div className="py-10 md:pl-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-navy font-semibold">
                <span>04 / DELAYED ACTION</span>
                <TrendingDown className="w-4 h-4 text-amber-dark" aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-navy">
                Reactive Decision-Making
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-charcoal/80 leading-relaxed">
                Stockouts, overstocking, declining sales and customer churn are often discovered too
                late.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border font-mono text-xs text-slate">
              Without lead-time forecasting, stockouts are only noticed after orders are lost.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
