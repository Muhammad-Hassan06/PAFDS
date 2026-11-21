import React, { useState, useMemo } from 'react';
import {
  Boxes,
  AlertOctagon,
  CheckCircle2,
  AlertTriangle,
  Search,
  ArrowUpDown,
  Filter,
  ArrowRight,
  TrendingUp,
  Package,
  Layers,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { useProduct } from '../context/ProductContext';
import { ProductItem } from '../types';

export const InventoryModule: React.FC = () => {
  const { products, metrics, setActiveModule } = useProduct();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Status counts
  const stockoutCount = products.filter((p) => p.status === 'Stockout Risk').length;
  const lowStockCount = products.filter((p) => p.status === 'Low Stock').length;
  const healthyCount = products.filter((p) => p.status === 'Healthy').length;
  const overstockCount = products.filter((p) => p.status === 'Overstock').length;

  const totalInventoryUnits = products.reduce((acc, p) => acc + p.currentStock, 0);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [products, statusFilter, searchQuery]);

  // Chart data for selected product demand history
  const demandHistoryData = selectedProduct?.historicalDemand.map((qty, idx) => ({
    week: `W${idx + 1}`,
    demand: qty,
  })) || [];

  return (
    <div className="space-y-6">
      {/* Top Inventory Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-1">
          <span className="text-xs text-slate font-medium">Warehouse Inventory Value</span>
          <div className="text-2xl font-display font-bold text-navy">
            PKR {(metrics.inventoryValuePKR / 1000000).toFixed(2)}M
          </div>
          <div className="text-[11px] text-slate">
            {totalInventoryUnits.toLocaleString()} wholesale units on hand
          </div>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-1">
          <span className="text-xs text-slate font-medium">Critical Stockout Risk</span>
          <div className="text-2xl font-display font-bold text-rose-600">
            {stockoutCount} SKUs
          </div>
          <div className="text-[11px] text-rose-700 font-medium">
            Projected depletion &lt; supplier lead time
          </div>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-1">
          <span className="text-xs text-slate font-medium">Low Stock Warning</span>
          <div className="text-2xl font-display font-bold text-amber-600">
            {lowStockCount} SKUs
          </div>
          <div className="text-[11px] text-amber-800">
            Approaching reorder threshold
          </div>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-1">
          <span className="text-xs text-slate font-medium">Overstock / Dead Capital</span>
          <div className="text-2xl font-display font-bold text-navy">
            {overstockCount} SKUs
          </div>
          <div className="text-[11px] text-slate">
            &gt; 60 days of forward supply holding
          </div>
        </div>
      </div>

      {/* Main Inventory Ledger */}
      <div className="bg-white border border-border rounded-lg shadow-panel overflow-hidden">
        {/* Table Filters & Search */}
        <div className="p-4 border-b border-border bg-ivory/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {['All', 'Stockout Risk', 'Low Stock', 'Healthy', 'Overstock'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  statusFilter === status
                    ? 'bg-navy text-white font-semibold shadow-sm'
                    : 'bg-white text-charcoal hover:bg-ivory border border-border'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate" />
              <input
                type="text"
                placeholder="Search SKU or product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 text-xs border border-border rounded bg-white text-navy focus:outline-none focus:border-teal"
              />
            </div>
            <button
              onClick={() => setActiveModule('stockout')}
              className="px-3 py-1 bg-teal hover:bg-teal-hover text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-sm"
            >
              <span>Stockout Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="table-region">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-ivory/60 text-slate font-mono">
                <th className="py-3 px-4">SKU & Item Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Current Stock</th>
                <th className="py-3 px-4 text-right">Daily Run-rate</th>
                <th className="py-3 px-4 text-right">Reorder Threshold</th>
                <th className="py-3 px-4">Supplier Lead Time</th>
                <th className="py-3 px-4 text-center">Health Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className="hover:bg-ivory/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="font-semibold text-navy">{p.name}</div>
                    <div className="text-[10px] text-slate font-mono">{p.sku}</div>
                  </td>
                  <td className="py-3 px-4 text-slate">{p.category}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-navy">
                    {p.currentStock} {p.unit}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-medium">
                    {p.dailyDemand} / day
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate">
                    {p.reorderThreshold} {p.unit}
                  </td>
                  <td className="py-3 px-4 text-slate">
                    <div className="font-medium text-navy">{p.leadTimeDays} Days</div>
                    <div className="text-[10px] text-slate truncate max-w-[140px]">{p.supplierName}</div>
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
                        setSelectedProduct(p);
                      }}
                      className="px-2.5 py-1 text-[11px] font-medium text-teal hover:bg-teal-light rounded border border-teal/20 transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Detail Drawer Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-editorial-lg border border-border max-w-2xl w-full p-6 space-y-5 animate-fadeIn">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] font-mono text-slate uppercase">
                  {selectedProduct.sku} &middot; {selectedProduct.category}
                </span>
                <h3 className="text-base font-bold text-navy">{selectedProduct.name}</h3>
                <p className="text-xs text-slate mt-0.5">
                  Supplier: <strong>{selectedProduct.supplierName}</strong> (Lead Time: {selectedProduct.leadTimeDays} days)
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-slate hover:text-navy p-1 text-sm"
              >
                ✕
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 bg-ivory rounded border border-border">
                <span className="text-slate text-[10px]">CURRENT STOCK</span>
                <div className="text-base font-bold text-navy mt-1">
                  {selectedProduct.currentStock} {selectedProduct.unit}
                </div>
              </div>
              <div className="p-3 bg-ivory rounded border border-border">
                <span className="text-slate text-[10px]">DAYS OF SUPPLY</span>
                <div className="text-base font-bold text-rose-600 mt-1">
                  ~{Math.floor(selectedProduct.currentStock / selectedProduct.dailyDemand)} Days
                </div>
              </div>
              <div className="p-3 bg-ivory rounded border border-border">
                <span className="text-slate text-[10px]">DEPLETION RUN-RATE</span>
                <div className="text-base font-bold text-navy mt-1">
                  {selectedProduct.dailyDemand} / day
                </div>
              </div>
              <div className="p-3 bg-ivory rounded border border-border">
                <span className="text-slate text-[10px]">REORDER POINT</span>
                <div className="text-base font-bold text-navy mt-1">
                  {selectedProduct.reorderThreshold} Units
                </div>
              </div>
            </div>

            {/* Historical Demand Chart */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-navy">12-Week Historical Demand Velocity</span>
                <span className="text-slate font-mono text-[11px]">Units / Week</span>
              </div>
              <div className="h-44 w-full bg-ivory/30 border border-border rounded p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={demandHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E4E7E5" />
                    <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#697681' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#697681' }} />
                    <Tooltip
                      formatter={(val: number) => [`${val} Units`, 'Weekly Demand']}
                      contentStyle={{
                        backgroundColor: '#101D2B',
                        borderRadius: '4px',
                        color: '#F5F4EF',
                        fontSize: '11px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="demand"
                      stroke="#176B62"
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#176B62' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Replenishment Recommendation Card */}
            <div className="p-3.5 bg-teal-light rounded-lg border border-teal/20 text-xs space-y-1">
              <span className="font-bold text-teal flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Intelligent Reorder Calculation:
              </span>
              <p className="text-navy text-[11px] leading-relaxed">
                Lead-time demand is {selectedProduct.dailyDemand * selectedProduct.leadTimeDays} units ({selectedProduct.dailyDemand} x {selectedProduct.leadTimeDays}d). With safety buffer of {selectedProduct.reorderThreshold} units, recommended replenishment batch is{' '}
                <strong>{Math.max(120, selectedProduct.dailyDemand * selectedProduct.leadTimeDays * 1.2)} units</strong>.
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-2 border-t border-border">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setActiveModule('forecast');
                }}
                className="text-xs text-teal hover:underline font-medium"
              >
                Open Demand Forecasting &rarr;
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-1.5 bg-navy text-white text-xs font-semibold rounded"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
