import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  PackageCheck,
  Clock,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { BRANCH_SAMPLES } from '../data/distrisightData';

interface HeroSectionProps {
  onLaunchApp?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLaunchApp }) => {
  const data = BRANCH_SAMPLES.all;

  return (
    <section
      id="overview"
      className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-border bg-architectural-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-border mb-6">
            <span className="w-2 h-2 rounded-full bg-teal" aria-hidden="true" />
            <span className="text-xs font-mono font-semibold tracking-wider uppercase text-navy">
              INTELLIGENCE FOR WHOLESALE DISTRIBUTION
            </span>
          </div>

          <h1
            id="main-content"
            tabIndex={-1}
            className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-navy tracking-tight leading-[1.1] focus:outline-none"
          >
            Make Your Business Data Worth Trusting.
          </h1>

          <p className="mt-5 text-lg text-charcoal/85 leading-relaxed">
            DistriSight transforms fragmented distributor data into reliable business intelligence
            through automated data quality management, conversational analytics, predictive insights
            and security-first architecture.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onLaunchApp ? onLaunchApp : () => { window.location.hash = '#/app'; }}
              className="inline-flex items-center gap-2.5 px-6 py-3 text-sm sm:text-base font-semibold text-white bg-teal hover:bg-teal-hover rounded-md transition-colors shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span>Launch Product MVP</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <a
              href="#platform"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold text-navy bg-white hover:bg-ivory-dark/50 border border-border-strong rounded-md transition-colors"
            >
              <span>Explore Architecture</span>
            </a>
          </div>

          {/* Subtle Trust Statement */}
          <p className="mt-7 text-xs sm:text-sm font-medium text-slate">
            Data Reliability &middot; Business Intelligence &middot; Predictive Analytics &middot;
            Security
          </p>
        </div>

        {/* Clean, Focused Product Interface Mockup */}
        <div className="mt-12 lg:mt-14">
          <div className="rounded-lg border border-border-strong bg-white shadow-editorial-lg overflow-hidden">
            {/* Window Top Bar */}
            <div className="bg-navy text-ivory px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2 border-b border-border-dark">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-ivory/25" />
                  <span className="w-2.5 h-2.5 rounded-full bg-ivory/25" />
                  <span className="w-2.5 h-2.5 rounded-full bg-ivory/25" />
                </div>
                <span className="font-mono text-xs text-ivory/90">
                  DistriSight — Distributor Intelligence Console
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-amber/20 text-amber border border-amber/30">
                Sample Demonstration Data
              </span>
            </div>

            {/* 4 Key KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border border-b border-border bg-white">
              <div className="p-5">
                <div className="flex items-center justify-between text-xs font-mono text-slate uppercase">
                  <span>Data Quality Score</span>
                  <ShieldCheck className="w-4 h-4 text-teal" aria-hidden="true" />
                </div>
                <div className="mt-2 font-display text-2xl sm:text-3xl font-bold text-navy">
                  {data.qualityScore}%
                </div>
                <p className="mt-1 text-xs text-teal font-medium">Verified across 3 depots</p>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-xs font-mono text-slate uppercase">
                  <span>Total Sales (30d)</span>
                  <TrendingUp className="w-4 h-4 text-teal" aria-hidden="true" />
                </div>
                <div className="mt-2 font-display text-2xl sm:text-3xl font-bold text-navy">
                  {data.totalSalesPKR}
                </div>
                <p className="mt-1 text-xs text-slate">{data.salesDelta}</p>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-xs font-mono text-slate uppercase">
                  <span>Inventory Status</span>
                  <PackageCheck className="w-4 h-4 text-teal" aria-hidden="true" />
                </div>
                <div className="mt-2 font-display text-2xl sm:text-3xl font-bold text-navy">
                  {data.healthyStockPct}% Healthy
                </div>
                <p className="mt-1 text-xs text-slate">{data.activeSKUs.toLocaleString()} active SKUs</p>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-xs font-mono text-slate uppercase">
                  <span>Stockout Risk</span>
                  <AlertTriangle className="w-4 h-4 text-amber-dark" aria-hidden="true" />
                </div>
                <div className="mt-2 font-display text-2xl sm:text-3xl font-bold text-navy">
                  {data.stockoutRiskCount} Products
                </div>
                <p className="mt-1 text-xs text-amber-dark font-medium">
                  Within 14-day supplier lead time
                </p>
              </div>
            </div>

            {/* Dashboard Main Body: Left (Sales Trend + Stockout Risk) | Right (Quality Alerts + Activity) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border">
              {/* Left 7 Columns */}
              <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-display font-bold text-navy">
                        Weekly Verified Sales Trend (PKR Millions)
                      </h2>
                      <p className="text-xs text-slate">
                        Cleaned warehouse records vs. raw spreadsheet exports
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="inline-flex items-center gap-1.5 text-navy">
                        <span className="w-2.5 h-2.5 rounded-sm bg-teal" />
                        Verified
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-slate">
                        <span className="w-2.5 h-2.5 rounded-sm bg-amber" />
                        Raw Excel
                      </span>
                    </div>
                  </div>

                  <div className="h-52 w-full" aria-label="Sales trend chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={data.salesTrend}
                        margin={{ top: 6, right: 10, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="tealVerified" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#176B62" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#176B62" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E4E7E5" />
                        <XAxis
                          dataKey="week"
                          tick={{ fontSize: 11, fill: '#697681' }}
                          axisLine={{ stroke: '#E4E7E5' }}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: '#697681' }}
                          axisLine={false}
                          tickLine={false}
                          unit="M"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#101D2B',
                            borderColor: '#233446',
                            borderRadius: '6px',
                            color: '#F5F4EF',
                            fontSize: '12px',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="rawUnverifiedSales"
                          name="Raw Excel (PKR M)"
                          stroke="#D9A441"
                          strokeWidth={1.8}
                          strokeDasharray="4 4"
                          fillOpacity={0}
                        />
                        <Area
                          type="monotone"
                          dataKey="verifiedSales"
                          name="Verified Sales (PKR M)"
                          stroke="#176B62"
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#tealVerified)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Concise Products at Stockout Risk */}
                <div className="mt-6 pt-5 border-t border-border">
                  <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-navy mb-3">
                    Products at Stockout Risk
                  </h3>
                  <div className="space-y-2">
                    {data.stockoutRisks.slice(0, 3).map((item) => (
                      <div
                        key={item.sku}
                        className="p-3 rounded bg-ivory/60 border border-border flex flex-wrap items-center justify-between gap-2 text-xs"
                      >
                        <div>
                          <span className="font-semibold text-navy">{item.product}</span>
                          <span className="text-slate font-mono ml-2">
                            Stock: {item.currentStock} &middot; 3-Wk Forecast: {item.forecast3Wk}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded font-mono text-[11px] font-medium bg-teal-light text-teal">
                          Reorder +{item.suggestedReorder} units
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Data Quality Alerts & Recent System Activity */}
              <div className="lg:col-span-5 p-5 sm:p-6 bg-ivory/40 flex flex-col justify-between gap-6">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-navy mb-3">
                    Data Quality Alerts
                  </h3>
                  <ul className="space-y-2.5">
                    {data.qualityAlerts.slice(0, 3).map((alert) => (
                      <li
                        key={alert.id}
                        className="p-3 rounded bg-white border border-border text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-navy">{alert.type}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                              alert.action === 'Auto-Repaired'
                                ? 'bg-teal-light text-teal'
                                : 'bg-amber-light text-amber-dark'
                            }`}
                          >
                            {alert.action}
                          </span>
                        </div>
                        <p className="mt-1 text-slate leading-snug">{alert.detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-navy mb-3">
                    Recent System Activity
                  </h3>
                  <ul className="space-y-2">
                    {data.recentActivity.slice(0, 3).map((act, idx) => (
                      <li
                        key={idx}
                        className="p-2.5 rounded bg-white border border-border text-xs flex items-start gap-2.5"
                      >
                        <Clock className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <span className="font-mono text-[11px] text-slate block">{act.time}</span>
                          <span className="text-charcoal">{act.event}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
