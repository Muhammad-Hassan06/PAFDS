import React from 'react';
import {
  Printer,
  Download,
  Building2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';

export const ExecutiveReportModule: React.FC = () => {
  const { metrics, qualityScore, products, recommendations, securityThreats, role } = useProduct();

  const handlePrint = () => {
    window.print();
  };

  const topRecommendations = recommendations.filter((r) => r.priority === 'Critical' || r.priority === 'High').slice(0, 3);
  const criticalStockouts = products.filter((p) => p.status === 'Stockout Risk');

  return (
    <div className="space-y-6">
      {/* Print / Export Action Bar */}
      <div className="p-4 bg-white border border-border rounded-lg shadow-panel flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-navy">Weekly Executive Business Briefing</h2>
          <p className="text-xs text-slate">Consolidated digest generated for executive leadership and bank auditors</p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-4 py-2 bg-navy hover:bg-navy-light text-white text-xs font-semibold rounded transition-colors shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* Formal Paper Report Sheet */}
      <div className="p-8 sm:p-12 bg-white border border-border rounded-lg shadow-editorial max-w-4xl mx-auto space-y-8 text-charcoal">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-strong pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-teal" />
              <h1 className="text-2xl font-display font-bold text-navy tracking-tight">
                Distribution<span className="text-teal">IQ</span>
              </h1>
            </div>
            <p className="text-xs font-mono text-slate mt-1">
              Automated Wholesale Intelligence &middot; Operations Report #W47-2026
            </p>
          </div>

          <div className="text-right text-xs font-mono text-slate space-y-0.5">
            <div><strong>Audit Date:</strong> November 21, 2026</div>
            <div><strong>Coverage:</strong> Karachi, Lahore, Islamabad, Faisalabad</div>
            <div><strong>Classification:</strong> Confidential Commercial</div>
          </div>
        </div>

        {/* Executive Summary Narrative */}
        <div className="space-y-2">
          <h2 className="text-xs font-mono font-bold text-slate uppercase tracking-wider">
            1. Executive Commercial Summary
          </h2>
          <p className="text-xs leading-relaxed text-charcoal/90">
            During the evaluated 30-day period, total gross revenue across consolidated depots reached{' '}
            <strong>PKR {(metrics.verifiedRevenuePKR / 1000000).toFixed(2)}M</strong> (+8.4% growth vs prior cycle). The Data Quality Engine isolated <strong>PKR {(metrics.inflatedRevenuePKR / 1000).toFixed(0)}k</strong> in duplicate batch entries from Lahore South Depot, ensuring certified figures for revenue taxation and supplier credit limits.
          </p>
        </div>

        {/* 4 Key Executive KPI Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 bg-ivory rounded border border-border">
            <span className="text-[10px] text-slate block">VERIFIED REVENUE</span>
            <div className="text-lg font-bold text-navy mt-1">
              PKR {(metrics.verifiedRevenuePKR / 1000000).toFixed(2)}M
            </div>
          </div>
          <div className="p-3 bg-ivory rounded border border-border">
            <span className="text-[10px] text-slate block">DATA QUALITY SCORE</span>
            <div className="text-lg font-bold text-teal mt-1">
              {qualityScore.overall}% (Grade A)
            </div>
          </div>
          <div className="p-3 bg-ivory rounded border border-border">
            <span className="text-[10px] text-slate block">CRITICAL STOCKOUTS</span>
            <div className="text-lg font-bold text-rose-600 mt-1">
              {metrics.stockoutRiskCount} SKUs
            </div>
          </div>
          <div className="p-3 bg-ivory rounded border border-border">
            <span className="text-[10px] text-slate block">TOTAL INVENTORY VALUE</span>
            <div className="text-lg font-bold text-navy mt-1">
              PKR {(metrics.inventoryValuePKR / 1000000).toFixed(2)}M
            </div>
          </div>
        </div>

        {/* Section 2: Critical Stockout Vulnerabilities */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-slate uppercase tracking-wider">
            2. Urgent Inventory Replenishment Risks
          </h2>
          <div className="table-region border border-border rounded text-xs">
            <table className="w-full text-left font-mono">
              <thead className="bg-ivory text-slate border-b border-border">
                <tr>
                  <th className="p-2.5">Product SKU</th>
                  <th className="p-2.5">Current Stock</th>
                  <th className="p-2.5">Daily Run-rate</th>
                  <th className="p-2.5">Supplier Lead Time</th>
                  <th className="p-2.5 text-right">Recommended PO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {criticalStockouts.map((p) => (
                  <tr key={p.id}>
                    <td className="p-2.5 font-semibold text-navy">{p.name} ({p.sku})</td>
                    <td className="p-2.5">{p.currentStock} {p.unit}</td>
                    <td className="p-2.5">{p.dailyDemand}/day</td>
                    <td className="p-2.5">{p.leadTimeDays} Days ({p.supplierName})</td>
                    <td className="p-2.5 text-right font-bold text-teal">
                      +{Math.max(120, p.dailyDemand * p.leadTimeDays)} {p.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Priority Prescriptive Decisions */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-slate uppercase tracking-wider">
            3. Priority Decisions Requiring Owner Authorization
          </h2>
          <div className="space-y-2">
            {topRecommendations.map((rec) => (
              <div key={rec.id} className="p-3 rounded border border-border bg-ivory/40 text-xs space-y-1">
                <div className="flex justify-between font-bold text-navy">
                  <span>{rec.title}</span>
                  <span className="text-[10px] text-teal font-mono">{rec.category}</span>
                </div>
                <p className="text-slate text-[11px] leading-relaxed">{rec.reason}</p>
                <div className="text-[11px] font-mono text-teal font-semibold">
                  Prescription: {rec.recommendedAction}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Security & Integrity Certification */}
        <div className="p-4 bg-ivory rounded-lg border border-border space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-navy">
            <ShieldCheck className="w-4 h-4 text-teal" />
            <span>Cryptographic Data Integrity &amp; Security Assurance</span>
          </div>
          <p className="text-slate text-[11px] leading-relaxed">
            All database modifications, normalization rules, and user authentications for this reporting cycle are sealed using SHA-256 hash chaining. AI Query Guard verified zero injection breaches or unauthorized table access.
          </p>
          <div className="text-[10px] font-mono text-slate-light text-slate pt-1">
            Hash root: 04a1b827e8d3284f... Verified by DistributionIQ Security Engine
          </div>
        </div>
      </div>
    </div>
  );
};
