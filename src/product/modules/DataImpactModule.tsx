import React, { useState } from 'react';
import {
  GitFork,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  DollarSign,
  Package,
  ShieldAlert,
  CheckCircle2,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';

export const DataImpactModule: React.FC = () => {
  const { repairs, qualityIssues, metrics, setActiveModule } = useProduct();
  const [selectedCase, setSelectedCase] = useState<'dup' | 'missCust' | 'negQty'>('dup');

  const dupRepair = repairs.find((r) => r.issueId === 'ISSUE-001');
  const isDupRepaired = dupRepair?.status === 'Applied';

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="p-5 bg-white border border-border rounded-lg shadow-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-teal-light text-teal">
              <GitFork className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-semibold text-navy">
              Downstream Quality Impact Lineage
            </h2>
          </div>
          <p className="text-xs text-slate mt-1 max-w-2xl leading-relaxed">
            DistributionIQ traces how corrupted spreadsheet rows propagate into falsified commercial revenue metrics, corrupted ML time-series forecasts, and bad warehouse purchasing decisions.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setSelectedCase('dup')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedCase === 'dup'
                ? 'bg-navy text-white font-bold'
                : 'bg-ivory text-charcoal border border-border'
            }`}
          >
            Case 1: Duplicate Invoices
          </button>
          <button
            onClick={() => setSelectedCase('negQty')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedCase === 'negQty'
                ? 'bg-navy text-white font-bold'
                : 'bg-ivory text-charcoal border border-border'
            }`}
          >
            Case 2: Negative Quantities
          </button>
          <button
            onClick={() => setSelectedCase('missCust')}
            className={`px-3 py-1.5 rounded transition-colors ${
              selectedCase === 'missCust'
                ? 'bg-navy text-white font-bold'
                : 'bg-ivory text-charcoal border border-border'
            }`}
          >
            Case 3: Unlinked Customer IDs
          </button>
        </div>
      </div>

      {/* Interactive Lineage Flow Diagram (Data Issue -> Affected Records -> Affected Metrics -> Affected Decisions) */}
      {selectedCase === 'dup' && (
        <div className="space-y-6">
          <div className="p-6 bg-white border border-border rounded-lg shadow-panel space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] font-mono text-rose-600 uppercase font-bold tracking-wider">
                  Impact Lineage Case Study
                </span>
                <h3 className="text-base font-bold text-navy">
                  Duplicate Invoice Lines in Lahore Depot (Batch INV-2026-9281)
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate">Current Remediation State:</span>
                <span
                  className={`px-2 py-0.5 rounded font-bold ${
                    isDupRepaired
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isDupRepaired ? 'Repaired & Quarantined' : 'Unresolved Anomaly'}
                </span>
              </div>
            </div>

            {/* 4-Stage Connected Pipeline Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
              {/* Step 1: Data Issue */}
              <div className="p-4 rounded-lg border border-rose-200 bg-rose-50/50 space-y-2">
                <div className="text-[10px] font-mono font-bold text-rose-700 uppercase">
                  1. Data Ingestion Anomaly
                </div>
                <h4 className="text-xs font-bold text-navy">Duplicate Invoice Lines</h4>
                <p className="text-[11px] text-slate leading-normal">
                  Branch accountant uploaded Excel containing duplicate line items with identical timestamps for Gourmet Cola & Olpers.
                </p>
                <div className="p-1.5 bg-white rounded border border-rose-200 text-[10px] font-mono text-rose-800 font-semibold">
                  Affected: 7 Rows in INV-2026-9281
                </div>
              </div>

              {/* Step 2: Corrupted Metrics */}
              <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/50 space-y-2">
                <div className="text-[10px] font-mono font-bold text-amber-800 uppercase">
                  2. Distorted Commercial Metrics
                </div>
                <h4 className="text-xs font-bold text-navy">Revenue Inflation</h4>
                <p className="text-[11px] text-slate leading-normal">
                  Gross reported revenue is artificially inflated by <strong>PKR 85,000</strong>, distorting branch margin calculations.
                </p>
                <div className="p-1.5 bg-white rounded border border-amber-200 text-[10px] font-mono text-amber-900 font-semibold">
                  Revenue Skew: +PKR 85,000
                </div>
              </div>

              {/* Step 3: Skewed Predictive Models */}
              <div className="p-4 rounded-lg border border-purple-200 bg-purple-50/50 space-y-2">
                <div className="text-[10px] font-mono font-bold text-purple-700 uppercase">
                  3. Skewed Demand Forecast
                </div>
                <h4 className="text-xs font-bold text-navy">False Velocity Spike</h4>
                <p className="text-[11px] text-slate leading-normal">
                  Moving-average and time-series model registers duplicate rows as a genuine surge in demand (+14% over baseline).
                </p>
                <div className="p-1.5 bg-white rounded border border-purple-200 text-[10px] font-mono text-purple-900 font-semibold">
                  Model MAPE Error: +14.2%
                </div>
              </div>

              {/* Step 4: Bad Business Decision */}
              <div className="p-4 rounded-lg border border-navy/20 bg-ivory space-y-2">
                <div className="text-[10px] font-mono font-bold text-navy uppercase">
                  4. Erroneous Business Action
                </div>
                <h4 className="text-xs font-bold text-navy">Premature Over-Ordering</h4>
                <p className="text-[11px] text-slate leading-normal">
                  Without data cleaning, system would generate a purchase order for 240 extra cartons, tying up PKR 235k in dead working capital.
                </p>
                <div className="p-1.5 bg-white rounded border border-border text-[10px] font-mono text-navy font-semibold">
                  Working Capital Risk: PKR 235k
                </div>
              </div>
            </div>

            {/* Before vs After Impact Comparison */}
            <div className="p-4 bg-ivory/60 border border-border rounded-lg space-y-3">
              <h4 className="text-xs font-bold text-navy">
                Demonstrated Financial Metric Deltas:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded border border-border space-y-1">
                  <span className="text-[10px] text-slate font-mono uppercase">Reported Sales Revenue</span>
                  <div className="font-mono text-base font-bold text-navy">
                    {isDupRepaired ? 'PKR 48.62M (Accurate)' : 'PKR 48.70M (Inflated)'}
                  </div>
                  <p className="text-[10px] text-slate">
                    {isDupRepaired ? '✓ Duplicate PKR 85,000 isolated' : '⚠️ PKR 85,000 artificial inflation'}
                  </p>
                </div>

                <div className="p-3 bg-white rounded border border-border space-y-1">
                  <span className="text-[10px] text-slate font-mono uppercase">Forecast Daily Run-rate</span>
                  <div className="font-mono text-base font-bold text-navy">
                    {isDupRepaired ? '28 Cartons / Day' : '32 Cartons / Day'}
                  </div>
                  <p className="text-[10px] text-slate">
                    {isDupRepaired ? '✓ Grounded in verified invoices' : '⚠️ Skewed by phantom transactions'}
                  </p>
                </div>

                <div className="p-3 bg-white rounded border border-border space-y-1">
                  <span className="text-[10px] text-slate font-mono uppercase">Reorder Recommendation</span>
                  <div className="font-mono text-base font-bold text-navy">
                    {isDupRepaired ? 'PO for 240 Cartons' : 'PO for 480 Cartons (Excess)'}
                  </div>
                  <p className="text-[10px] text-slate">
                    {isDupRepaired ? '✓ Optimal lead-time replenishment' : '⚠️ High risk of warehouse congestion'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate">
                {isDupRepaired
                  ? 'Data repair has been verified. Downstream metrics are clean.'
                  : 'Action needed in Data Repair to normalize these figures.'}
              </span>
              <button
                onClick={() => setActiveModule('repair')}
                className="px-4 py-2 bg-teal hover:bg-teal-hover text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-sm"
              >
                <span>Navigate to Repair Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedCase === 'negQty' && (
        <div className="p-6 bg-white border border-border rounded-lg shadow-panel space-y-4">
          <h3 className="text-base font-bold text-navy">
            Negative Quantity Line Item in Faisalabad Depot (INV-2026-9311)
          </h3>
          <p className="text-xs text-slate leading-relaxed">
            A return of 120 Surf Excel packs was incorrectly booked as a regular sales receipt with quantity = -120 instead of a Credit Note. This distorted the weekly revenue curve by <strong>-PKR 834,000</strong> and corrupted inventory decrement logs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded">
              <span className="text-[10px] font-bold text-rose-700">RAW IMPACT:</span>
              <div className="text-rose-900 font-bold mt-1">-PKR 834,000 Sales Dip</div>
            </div>
            <div className="p-3 bg-teal-light border border-teal/30 rounded">
              <span className="text-[10px] font-bold text-teal">RECOMMENDED FIX:</span>
              <div className="text-navy font-bold mt-1">Convert to Credit Note #CR-9311</div>
            </div>
            <div className="p-3 bg-ivory border border-border rounded">
              <span className="text-[10px] font-bold text-slate">INVENTORY ADJUSTMENT:</span>
              <div className="text-navy font-bold mt-1">+120 Bales Restocked</div>
            </div>
          </div>
          <div className="pt-2">
            <button
              onClick={() => setActiveModule('repair')}
              className="px-4 py-2 bg-teal hover:bg-teal-hover text-white text-xs font-semibold rounded flex items-center gap-1.5"
            >
              <span>Inspect Repair REP-003</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {selectedCase === 'missCust' && (
        <div className="p-6 bg-white border border-border rounded-lg shadow-panel space-y-4">
          <h3 className="text-base font-bold text-navy">
            Unlinked Customer Identifiers (14 Transactions)
          </h3>
          <p className="text-xs text-slate leading-relaxed">
            14 sales transactions totaling <strong>PKR 345,000</strong> were ingested without customer account codes, making it appear that top accounts had dropped order volumes and triggering false churn alerts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded">
              <span className="text-[10px] font-bold text-amber-800">UNINTENDED CHURN ALARM:</span>
              <p className="text-amber-900 mt-1">
                Triggered false retention alert for Al-Madina Cash & Carry because transactions were floating unassigned.
              </p>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded">
              <span className="text-[10px] font-bold text-emerald-800">RESOLVED ATTRIBUTION:</span>
              <p className="text-emerald-900 mt-1">
                Fuzzy address matching restored the PKR 230,000 order to CUST-KHI-01, validating real customer spend trend (+8.5%).
              </p>
            </div>
          </div>
          <div className="pt-2">
            <button
              onClick={() => setActiveModule('repair')}
              className="px-4 py-2 bg-teal hover:bg-teal-hover text-white text-xs font-semibold rounded flex items-center gap-1.5"
            >
              <span>Inspect Repair REP-002</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
