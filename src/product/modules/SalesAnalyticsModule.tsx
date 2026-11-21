import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Search,
  ArrowUpDown,
  Filter,
  ArrowUpRight,
  AlertTriangle,
  Building2,
  Calendar,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { useProduct } from '../context/ProductContext';
import { ProductItem, CustomerItem } from '../types';

export const SalesAnalyticsModule: React.FC = () => {
  const { products, customers, sales, metrics, branch, dateRange } = useProduct();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'products' | 'customers'>('products');
  const [inspectProduct, setInspectProduct] = useState<ProductItem | null>(null);

  // Filter products by category & search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchFilter.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchFilter]);

  // Declining customers
  const decliningCustomers = customers.filter((c) => c.spendTrend < 0);

  // Monthly revenue trend points
  const monthlyRevenueData = [
    { month: 'Jun', revenue: 38.2, orders: 1200 },
    { month: 'Jul', revenue: 41.5, orders: 1290 },
    { month: 'Aug', revenue: 43.1, orders: 1340 },
    { month: 'Sep', revenue: 44.8, orders: 1380 },
    { month: 'Oct', revenue: 46.2, orders: 1420 },
    { month: 'Nov (Verified)', revenue: Number((metrics.verifiedRevenuePKR / 1000000).toFixed(1)), orders: 1450 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Commercial KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-1">
          <span className="text-xs text-slate font-medium">Verified Commercial Revenue</span>
          <div className="text-2xl font-display font-bold text-navy">
            PKR {(metrics.verifiedRevenuePKR / 1000000).toFixed(2)}M
          </div>
          <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+8.4% growth vs prior 30-day period</span>
          </div>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-1">
          <span className="text-xs text-slate font-medium">Gross Orders Dispatched</span>
          <div className="text-2xl font-display font-bold text-navy">
            {metrics.totalOrders} Invoices
          </div>
          <div className="text-[11px] text-slate font-medium">
            Avg Order Value: <strong>PKR 34,200</strong>
          </div>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-1">
          <span className="text-xs text-slate font-medium">Wholesale Units Sold</span>
          <div className="text-2xl font-display font-bold text-navy">
            {metrics.unitsSold.toLocaleString()} Packs
          </div>
          <div className="text-[11px] text-slate font-medium">
            Across {metrics.activeSKUs} active commercial SKUs
          </div>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-1">
          <span className="text-xs text-slate font-medium">Accounts at Churn Risk</span>
          <div className="text-2xl font-display font-bold text-rose-600">
            {decliningCustomers.length} Accounts
          </div>
          <div className="text-[11px] text-rose-700 font-medium">
            Order volume decline &gt; 20% in last 30d
          </div>
        </div>
      </div>

      {/* Monthly Sales Revenue Chart */}
      <div className="p-5 bg-white border border-border rounded-lg shadow-panel space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-navy">
              6-Month Wholesale Revenue Trajectory (PKR Millions)
            </h3>
            <p className="text-xs text-slate">
              Consolidated sales performance across Karachi, Lahore, Islamabad, and Faisalabad depots
            </p>
          </div>
          <div className="text-xs font-mono text-teal bg-teal-light px-2.5 py-1 rounded">
            Clean Data Baseline Active
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#176B62" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#176B62" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E7E5" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#697681' }} />
              <YAxis tick={{ fontSize: 11, fill: '#697681' }} unit="M" />
              <Tooltip
                formatter={(val: number) => [`PKR ${val}M`, 'Revenue']}
                contentStyle={{
                  backgroundColor: '#101D2B',
                  borderRadius: '6px',
                  color: '#F5F4EF',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Gross Sales"
                stroke="#176B62"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#salesGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabs & Filter Bar */}
      <div className="bg-white border border-border rounded-lg shadow-panel overflow-hidden">
        <div className="p-4 border-b border-border bg-ivory/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeTab === 'products'
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white text-charcoal hover:bg-ivory border border-border'
              }`}
            >
              Product Performance ({filteredProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeTab === 'customers'
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white text-charcoal hover:bg-ivory border border-border'
              }`}
            >
              Customer Accounts ({customers.length})
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {activeTab === 'products' && (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs bg-white border border-border rounded px-2.5 py-1.5 text-navy font-medium focus:outline-none focus:border-teal"
              >
                <option value="All">All Categories</option>
                <option value="Beverages">Beverages</option>
                <option value="Edible Oils">Edible Oils</option>
                <option value="Dairy & UHT">Dairy & UHT</option>
                <option value="Tea & Spices">Tea & Spices</option>
                <option value="Household">Household</option>
                <option value="Personal Care">Personal Care</option>
              </select>
            )}

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate" />
              <input
                type="text"
                placeholder="Filter table..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-8 pr-3 py-1 text-xs border border-border rounded bg-white text-navy focus:outline-none focus:border-teal"
              />
            </div>
          </div>
        </div>

        {/* Tab 1: Product Performance Table */}
        {activeTab === 'products' && (
          <div className="table-region">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-ivory/60 text-slate font-mono">
                  <th className="py-2.5 px-4">Product Name & SKU</th>
                  <th className="py-2.5 px-4">Category</th>
                  <th className="py-2.5 px-4 text-right">Unit Price</th>
                  <th className="py-2.5 px-4 text-right">Gross Margin</th>
                  <th className="py-2.5 px-4 text-right">Daily Velocity</th>
                  <th className="py-2.5 px-4 text-right">30-Day Estimated Sales</th>
                  <th className="py-2.5 px-4 text-center">Status</th>
                  <th className="py-2.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.map((p) => {
                  const marginPct = Number((((p.pricePKR - p.costPKR) / p.pricePKR) * 100).toFixed(1));
                  const estimated30dSales = p.pricePKR * p.dailyDemand * 30;
                  return (
                    <tr
                      key={p.id}
                      onClick={() => setInspectProduct(p)}
                      className="hover:bg-ivory/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-semibold text-navy">{p.name}</div>
                        <div className="text-[10px] text-slate font-mono">{p.sku}</div>
                      </td>
                      <td className="py-3 px-4 text-slate">{p.category}</td>
                      <td className="py-3 px-4 text-right font-mono font-medium">
                        PKR {p.pricePKR.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                          {marginPct}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-semibold text-navy">
                        {p.dailyDemand} {p.unit}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-navy">
                        PKR {(estimated30dSales / 1000).toFixed(0)}k
                      </td>
                      <td className="py-3 px-4 text-center">
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
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setInspectProduct(p);
                          }}
                          className="px-2.5 py-1 text-[11px] text-teal hover:bg-teal-light rounded border border-teal/20 transition-colors"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Customer Accounts & Churn Detection */}
        {activeTab === 'customers' && (
          <div className="table-region">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-ivory/60 text-slate font-mono">
                  <th className="py-2.5 px-4">Account Code & Customer Name</th>
                  <th className="py-2.5 px-4">Location</th>
                  <th className="py-2.5 px-4">Channel</th>
                  <th className="py-2.5 px-4 text-right">30-Day Orders</th>
                  <th className="py-2.5 px-4 text-right">Total Spend (PKR)</th>
                  <th className="py-2.5 px-4 text-right">Order Trend</th>
                  <th className="py-2.5 px-4 text-center">Account Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-ivory/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-navy">{c.name}</div>
                      <div className="text-[10px] text-slate font-mono">{c.code}</div>
                    </td>
                    <td className="py-3 px-4 text-slate">{c.city}</td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-[10px] bg-ivory px-2 py-0.5 rounded border border-border">
                        {c.channel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-medium">
                      {c.ordersCount30d} Invoices
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-navy">
                      PKR {c.totalSpend30dPKR.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-mono">
                      <span
                        className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          c.spendTrend >= 0
                            ? 'text-emerald-700 bg-emerald-50'
                            : 'text-rose-700 bg-rose-50'
                        }`}
                      >
                        {c.spendTrend >= 0 ? '+' : ''}
                        {c.spendTrend}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          c.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {inspectProduct && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-editorial-lg border border-border max-w-lg w-full p-5 space-y-4">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] font-mono text-slate uppercase">{inspectProduct.sku}</span>
                <h3 className="text-base font-bold text-navy">{inspectProduct.name}</h3>
                <span className="text-xs text-slate">{inspectProduct.category} &middot; Supplier: {inspectProduct.supplierName}</span>
              </div>
              <button
                onClick={() => setInspectProduct(null)}
                className="text-slate hover:text-navy text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-ivory rounded border border-border">
                <span className="text-slate text-[10px]">CURRENT STOCK</span>
                <div className="text-base font-bold text-navy mt-0.5">
                  {inspectProduct.currentStock} {inspectProduct.unit}
                </div>
              </div>
              <div className="p-3 bg-ivory rounded border border-border">
                <span className="text-slate text-[10px]">DAILY VELOCITY</span>
                <div className="text-base font-bold text-navy mt-0.5">
                  {inspectProduct.dailyDemand} {inspectProduct.unit}/day
                </div>
              </div>
              <div className="p-3 bg-ivory rounded border border-border">
                <span className="text-slate text-[10px]">SUPPLIER LEAD TIME</span>
                <div className="text-base font-bold text-navy mt-0.5">
                  {inspectProduct.leadTimeDays} Days
                </div>
              </div>
              <div className="p-3 bg-ivory rounded border border-border">
                <span className="text-slate text-[10px]">REORDER POINT</span>
                <div className="text-base font-bold text-navy mt-0.5">
                  {inspectProduct.reorderThreshold} Units
                </div>
              </div>
            </div>

            <div className="p-3 bg-teal-light rounded border border-teal/20 text-xs">
              <span className="font-semibold text-teal">Replenishment Assessment:</span>
              <p className="text-navy mt-1">
                At current run-rate of {inspectProduct.dailyDemand} units/day, current stock will last approx{' '}
                <strong>{Math.floor(inspectProduct.currentStock / inspectProduct.dailyDemand)} days</strong>.
              </p>
            </div>

            <div className="flex justify-end pt-2 border-t border-border">
              <button
                onClick={() => setInspectProduct(null)}
                className="px-4 py-1.5 bg-navy text-white text-xs font-semibold rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

