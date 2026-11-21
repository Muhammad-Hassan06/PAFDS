import React from 'react';
import {
  TrendingUp,
  Package,
  AlertTriangle,
  CheckCircle,
  FileSpreadsheet,
  ArrowRight,
  ShieldAlert,
  Boxes,
  Users,
  Clock,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useProduct } from '../context/ProductContext';

export const OverviewDashboard: React.FC = () => {
  const {
    metrics,
    qualityScore,
    products,
    customers,
    repairs,
    securityThreats,
    setActiveModule,
    dateRange,
    branch,
  } = useProduct();

  // Weekly trend data reflecting verified vs raw inflated sales
  const trendData = [
    { week: 'W1 Oct', verified: 10.4, unverified: 11.2, forecast: 10.5 },
    { week: 'W2 Oct', verified: 11.1, unverified: 11.8, forecast: 11.0 },
    { week: 'W3 Oct', verified: 11.8, unverified: 12.9, forecast: 11.7 },
    { week: 'W4 Oct', verified: 12.2, unverified: 12.6, forecast: 12.3 },
    { week: 'W1 Nov', verified: 12.9, unverified: 13.7, forecast: 13.0 },
    {
      week: 'W2 Nov',
      verified: Number((metrics.verifiedRevenuePKR / 1000000).toFixed(1)),
      unverified: Number((metrics.totalRevenuePKR / 1000000).toFixed(1)),
      forecast: 13.8,
    },
  ];

  // Category revenue breakdown
  const categoryData = [
    { name: 'Beverages', revenueM: 14.8, skus: 3 },
    { name: 'Edible Oils', revenueM: 12.4, skus: 2 },
    { name: 'Dairy & UHT', revenueM: 10.9, skus: 2 },
    { name: 'Tea & Spices', revenueM: 6.2, skus: 2 },
    { name: 'Household', revenueM: 4.3, skus: 1 },
  ];

  // Top 5 selling products
  const topProducts = [...products].sort((a, b) => b.pricePKR * b.dailyDemand - a.pricePKR * a.dailyDemand).slice(0, 5);

  const pendingRepairsCount = repairs.filter((r) => r.status === 'Pending Approval').length;
  const criticalThreatCount = securityThreats.filter((t) => t.severity === 'Critical' && t.status !== 'Resolved').length;

  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="p-4 bg-white border border-border rounded-lg shadow-panel flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate text-xs font-medium">
            <span>Verified Revenue</span>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              +8.4% vs 30d
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-display font-bold text-navy">
              PKR {(metrics.verifiedRevenuePKR / 1000000).toFixed(2)}M
            </div>
            {metrics.inflatedRevenuePKR > 0 ? (
              <div className="text-[11px] text-amber-700 font-medium mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                <span>PKR {(metrics.inflatedRevenuePKR / 1000).toFixed(0)}k duplicate inflation held</span>
              </div>
            ) : (
              <div className="text-[11px] text-teal font-medium mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>100% Reconciled against duplicates</span>
              </div>
            )}
          </div>
        </div>

        {/* Data Quality Score */}
        <div
          onClick={() => setActiveModule('quality')}
          className="p-4 bg-white border border-border rounded-lg shadow-panel flex flex-col justify-between cursor-pointer hover:border-teal transition-colors"
        >
          <div className="flex items-center justify-between text-slate text-xs font-medium">
            <span>Data Quality Health</span>
            <span className="text-[11px] font-mono text-teal bg-teal-light px-1.5 py-0.5 rounded font-semibold">
              Grade A
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-display font-bold text-navy">
              {qualityScore.overall}%
            </div>
            <div className="text-[11px] text-slate mt-1 flex items-center justify-between">
              <span>{pendingRepairsCount} fixes pending approval</span>
              <span className="text-teal font-medium flex items-center gap-0.5">
                Inspect <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Stockout Risk */}
        <div
          onClick={() => setActiveModule('inventory')}
          className="p-4 bg-white border border-border rounded-lg shadow-panel flex flex-col justify-between cursor-pointer hover:border-rose-400 transition-colors"
        >
          <div className="flex items-center justify-between text-slate text-xs font-medium">
            <span>Products at Stockout Risk</span>
            <span className="text-[11px] font-mono text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded font-semibold">
              Action Req.
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-display font-bold text-rose-600">
              {metrics.stockoutRiskCount} SKUs
            </div>
            <div className="text-[11px] text-slate mt-1 flex items-center justify-between">
              <span>2 SKUs critically low (&lt; 5 days)</span>
              <span className="text-rose-600 font-medium flex items-center gap-0.5">
                Review <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Total Inventory Value */}
        <div
          onClick={() => setActiveModule('inventory')}
          className="p-4 bg-white border border-border rounded-lg shadow-panel flex flex-col justify-between cursor-pointer hover:border-teal transition-colors"
        >
          <div className="flex items-center justify-between text-slate text-xs font-medium">
            <span>Warehouse Stock Value</span>
            <span className="text-[11px] font-mono text-slate bg-ivory px-1.5 py-0.5 rounded">
              {products.length} SKUs Active
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-display font-bold text-navy">
              PKR {(metrics.inventoryValuePKR / 1000000).toFixed(2)}M
            </div>
            <div className="text-[11px] text-slate mt-1 flex items-center justify-between">
              <span>Turnover: 4.8x annualized</span>
              <span className="text-teal font-medium flex items-center gap-0.5">
                Ledger <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart (2 columns) */}
        <div className="lg:col-span-2 p-5 bg-white border border-border rounded-lg shadow-panel space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-navy">
                Depot Revenue Trend (PKR Millions)
              </h2>
              <p className="text-xs text-slate">
                Comparison of Verified Clean Sales vs Raw Uncleaned Sales vs Forecast
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-navy">
                <span className="w-3 h-3 rounded-sm bg-teal" /> Verified
              </span>
              <span className="flex items-center gap-1.5 text-amber-700">
                <span className="w-3 h-3 rounded-sm bg-amber-400" /> Raw + Duplicates
              </span>
              <span className="flex items-center gap-1.5 text-slate">
                <span className="w-3 h-3 rounded-sm bg-slate/40" /> Forecast
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#176B62" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#176B62" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D9A441" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#D9A441" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7E5" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#697681' }} />
                <YAxis tick={{ fontSize: 11, fill: '#697681' }} unit="M" />
                <Tooltip
                  formatter={(val: number) => [`PKR ${val}M`, '']}
                  contentStyle={{
                    backgroundColor: '#101D2B',
                    borderRadius: '6px',
                    color: '#F5F4EF',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="unverified"
                  name="Raw Unverified"
                  stroke="#D9A441"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#amberGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="verified"
                  name="Verified Clean"
                  stroke="#176B62"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#tealGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Revenue Breakdown (1 column) */}
        <div className="p-5 bg-white border border-border rounded-lg shadow-panel space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-navy">Category Revenue</h2>
            <p className="text-xs text-slate">Wholesale gross volume by vertical</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                layout="vertical"
                margin={{ top: 5, right: 15, left: 15, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7E5" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#697681' }} unit="M" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#202A32' }} width={80} />
                <Tooltip
                  formatter={(val: number) => [`PKR ${val}M`, 'Revenue']}
                  contentStyle={{
                    backgroundColor: '#101D2B',
                    borderRadius: '6px',
                    color: '#F5F4EF',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="revenueM" fill="#176B62" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Insights Requiring Attention */}
      <div className="p-5 bg-white border border-border rounded-lg shadow-panel space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-rose-50 border border-rose-200">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-navy">Insights Requiring Immediate Attention</h2>
              <p className="text-xs text-slate">
                Grounded anomalies and operational risks identified by the Intelligence Engine
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate">4 Active Alerts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: Stockout */}
          <div
            onClick={() => setActiveModule('inventory')}
            className="p-3.5 rounded border border-rose-200 bg-rose-50/40 hover:bg-rose-50 hover:border-rose-300 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono font-bold text-rose-700 uppercase tracking-wider">
                Critical Stockout Risk
              </span>
              <p className="text-xs font-medium text-navy mt-1">
                Gourmet Cola 1.5L will deplete in ~4 days at current run-rate (28 cartons/day).
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-rose-700 font-semibold">
              <span>View Run-rate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Duplicate Invoices */}
          <div
            onClick={() => setActiveModule('repair')}
            className="p-3.5 rounded border border-amber-200 bg-amber-50/40 hover:bg-amber-50 hover:border-amber-300 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider">
                Data Quality Inflation
              </span>
              <p className="text-xs font-medium text-navy mt-1">
                7 duplicate lines in batch INV-2026-9281 inflate depot revenue by PKR 85,000.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-amber-800 font-semibold">
              <span>Inspect & Repair</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Declining Customer */}
          <div
            onClick={() => setActiveModule('recommendations')}
            className="p-3.5 rounded border border-border bg-ivory/50 hover:bg-ivory hover:border-border-strong cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono font-bold text-slate uppercase tracking-wider">
                Customer Churn Signal
              </span>
              <p className="text-xs font-medium text-navy mt-1">
                Bismillah Mart (Lahore) order volume fell 24.2% with zero dairy orders in 12 days.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-teal font-semibold">
              <span>Dispatch Retention</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Supplier SLA Delay */}
          <div
            onClick={() => setActiveModule('recommendations')}
            className="p-3.5 rounded border border-border bg-ivory/50 hover:bg-ivory hover:border-border-strong cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono font-bold text-slate uppercase tracking-wider">
                Supplier Delivery SLA
              </span>
              <p className="text-xs font-medium text-navy mt-1">
                Gourmet Beverages on-time delivery dropped to 78.5% with avg 4.2 days shipment delay.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-teal font-semibold">
              <span>Review Lead Times</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Bottom: Top Products & Quick Decision Trigger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products Table (2 columns) */}
        <div className="lg:col-span-2 p-5 bg-white border border-border rounded-lg shadow-panel space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-navy">Top Wholesale SKU Velocity</h2>
              <p className="text-xs text-slate">Sorted by daily gross run-rate and stock coverage</p>
            </div>
            <button
              onClick={() => setActiveModule('sales')}
              className="text-xs text-teal font-medium hover:underline inline-flex items-center gap-1"
            >
              Full Sales Module <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="table-region">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-ivory/60 text-slate font-mono">
                  <th className="py-2.5 px-3">SKU & Product Name</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3 text-right">Wholesale Price</th>
                  <th className="py-2.5 px-3 text-right">Daily Demand</th>
                  <th className="py-2.5 px-3 text-right">Current Stock</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {topProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-ivory/40 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-navy">{p.name}</div>
                      <div className="text-[10px] text-slate font-mono">{p.sku}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate">{p.category}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium">
                      PKR {p.pricePKR.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-navy font-semibold">
                      {p.dailyDemand} {p.unit}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold">
                      {p.currentStock}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          p.status === 'Healthy'
                            ? 'bg-emerald-50 text-emerald-700'
                            : p.status === 'Stockout Risk'
                            ? 'bg-rose-100 text-rose-700'
                            : p.status === 'Low Stock'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate/10 text-slate'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI & Quick Action Hub (1 column) */}
        <div className="p-5 bg-navy text-ivory rounded-lg shadow-panel flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-teal/30 border border-teal/40 text-teal-light text-[11px] font-mono">
              <Sparkles className="w-3.5 h-3.5 text-teal-muted" />
              <span>Grounded AI Analytics</span>
            </div>
            <h3 className="text-base font-display font-bold text-white">
              Ask Business Questions in Roman Urdu or English
            </h3>
            <p className="text-xs text-slate-light leading-relaxed">
              DistributionIQ maps conversational queries directly to validated, read-only SQL execution with data lineage and audit verification.
            </p>

            <div className="bg-navy-light/90 border border-navy-light p-3 rounded text-xs space-y-1.5 font-mono text-slate-light">
              <div className="text-teal text-[11px]">Example query:</div>
              <div className="text-white italic">"Pichlay 30 din mein sab se zyada sales kis product ki hui?"</div>
            </div>
          </div>

          <button
            onClick={() => setActiveModule('assistant')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-teal hover:bg-teal-hover active:bg-navy-dark text-white text-xs font-semibold rounded transition-colors shadow-sm"
          >
            <span>Open AI Assistant Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

