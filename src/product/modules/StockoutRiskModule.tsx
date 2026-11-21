import React, { useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  PackageCheck,
  X,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import { ProductItem } from '../types';

export const StockoutRiskModule: React.FC = () => {
  const { products, setActiveModule, acceptRecommendation } = useProduct();
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [filterRisk, setFilterRisk] = useState<'All' | 'Critical' | 'High' | 'Moderate'>('All');

  // Compute calculated risk metrics for each product
  const riskEvaluations = products.map((p) => {
    const leadTimeDemand = p.dailyDemand * p.leadTimeDays;
    const daysRemaining = Math.floor(p.currentStock / p.dailyDemand);
    const deficitUnits = Math.max(0, leadTimeDemand - p.currentStock);

    let riskLevel: 'Critical' | 'High' | 'Moderate' | 'Low' = 'Low';
    if (daysRemaining <= 5 || p.currentStock < leadTimeDemand * 0.5) {
      riskLevel = 'Critical';
    } else if (daysRemaining <= p.leadTimeDays || p.currentStock < leadTimeDemand) {
      riskLevel = 'High';
    } else if (p.currentStock <= p.reorderThreshold) {
      riskLevel = 'Moderate';
    }

    const recommendedPOQty = Math.max(120, leadTimeDemand + p.reorderThreshold - p.currentStock);

    return {
      product: p,
      leadTimeDemand,
      daysRemaining,
      deficitUnits,
      riskLevel,
      recommendedPOQty,
    };
  });

  const filtered = riskEvaluations.filter((item) => {
    if (filterRisk === 'All') return true;
    return item.riskLevel === filterRisk;
  });

  const criticalCount = riskEvaluations.filter((r) => r.riskLevel === 'Critical').length;
  const highCount = riskEvaluations.filter((r) => r.riskLevel === 'High').length;

  return (
    <div className="space-y-6">
      {/* Risk Alert Header */}
      <div className="p-5 bg-white border border-border rounded-lg shadow-panel flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-rose-50 text-rose-600">
              <AlertOctagon className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-semibold text-navy">
              Autonomous Stockout Vulnerability Engine
            </h2>
          </div>
          <p className="text-xs text-slate mt-0.5">
            Identifies inventory items where depot run-rate exceeds replenishment transit capability
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 bg-rose-50 text-rose-700 font-bold rounded border border-rose-200">
            {criticalCount} Critical
          </span>
          <span className="px-2.5 py-1 bg-amber-50 text-amber-800 font-bold rounded border border-amber-200">
            {highCount} High Risk
          </span>
        </div>
      </div>

      {/* Main Stockout Ledger Table */}
      <div className="bg-white border border-border rounded-lg shadow-panel overflow-hidden">
        <div className="p-4 border-b border-border bg-ivory/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {(['All', 'Critical', 'High', 'Moderate'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterRisk(lvl)}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                  filterRisk === lvl
                    ? 'bg-navy text-white shadow-sm'
                    : 'bg-white text-charcoal hover:bg-ivory border border-border'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
          <span className="text-xs font-mono text-slate">
            {filtered.length} SKUs evaluated
          </span>
        </div>

        <div className="table-region">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-ivory/60 text-slate font-mono">
                <th className="py-3 px-4">Product Name & SKU</th>
                <th className="py-3 px-4 text-right">Current Stock</th>
                <th className="py-3 px-4 text-right">Lead-Time Demand</th>
                <th className="py-3 px-4">Supplier Lead Time</th>
                <th className="py-3 px-4 text-center">Days Remaining</th>
                <th className="py-3 px-4 text-center">Risk Level</th>
                <th className="py-3 px-4 text-right">Replenish Qty</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) => (
                <tr
                  key={r.product.id}
                  onClick={() => setSelectedProduct(r.product)}
                  className="hover:bg-ivory/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="font-semibold text-navy">{r.product.name}</div>
                    <div className="text-[10px] text-slate font-mono">{r.product.sku} &middot; {r.product.category}</div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-navy">
                    {r.product.currentStock} {r.product.unit}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-rose-700 font-semibold">
                    {r.leadTimeDemand} {r.product.unit}
                  </td>
                  <td className="py-3 px-4 text-slate">
                    <div className="font-medium text-navy">{r.product.leadTimeDays} Days</div>
                    <div className="text-[10px] text-slate truncate max-w-[140px]">{r.product.supplierName}</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                        r.daysRemaining <= 5
                          ? 'bg-rose-100 text-rose-800'
                          : r.daysRemaining <= 10
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      ~{r.daysRemaining} Days
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        r.riskLevel === 'Critical'
                          ? 'bg-rose-600 text-white'
                          : r.riskLevel === 'High'
                          ? 'bg-amber-500 text-white'
                          : r.riskLevel === 'Moderate'
                          ? 'bg-teal-light text-teal'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {r.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-teal">
                    +{r.recommendedPOQty}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(r.product);
                      }}
                      className="px-2.5 py-1 text-[11px] text-teal hover:bg-teal-light rounded border border-teal/20 transition-colors"
                    >
                      Examine
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stockout Risk Investigation Drawer */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-editorial-lg border border-border max-w-lg w-full p-6 space-y-4 animate-fadeIn">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] font-mono text-rose-600 font-bold uppercase">
                  Stockout Risk Investigation
                </span>
                <h3 className="text-base font-bold text-navy">{selectedProduct.name}</h3>
                <span className="text-xs text-slate">{selectedProduct.sku} &middot; {selectedProduct.category}</span>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-slate hover:text-navy text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded text-rose-900 space-y-1">
                <span className="font-bold">Why is this product flagged at risk?</span>
                <p className="leading-relaxed">
                  Depot inventory is <strong>{selectedProduct.currentStock} units</strong>. Based on continuous consumption of <strong>{selectedProduct.dailyDemand} units/day</strong>, the stock will be exhausted in <strong>~{Math.floor(selectedProduct.currentStock / selectedProduct.dailyDemand)} days</strong>. Because supplier lead time is <strong>{selectedProduct.leadTimeDays} days</strong>, the warehouse will experience a stockout before a replacement shipment can arrive.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <div className="p-2.5 bg-ivory rounded border border-border">
                  <span className="text-[10px] text-slate">LEAD TIME DEMAND</span>
                  <div className="font-bold text-navy mt-0.5">
                    {selectedProduct.dailyDemand * selectedProduct.leadTimeDays} {selectedProduct.unit}
                  </div>
                </div>
                <div className="p-2.5 bg-ivory rounded border border-border">
                  <span className="text-[10px] text-slate">SAFETY BUFFER DEFICIT</span>
                  <div className="font-bold text-rose-600 mt-0.5">
                    {Math.max(0, selectedProduct.dailyDemand * selectedProduct.leadTimeDays - selectedProduct.currentStock)} {selectedProduct.unit}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-teal-light rounded border border-teal/20 text-navy space-y-1">
                <span className="font-bold text-teal">Recommended PO Quantity:</span>
                <p>
                  Order batch of <strong>{Math.max(120, selectedProduct.dailyDemand * selectedProduct.leadTimeDays + selectedProduct.reorderThreshold - selectedProduct.currentStock)} {selectedProduct.unit}</strong> to replenish inventory and restore buffer.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-border">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setActiveModule('recommendations');
                }}
                className="text-xs text-teal font-semibold hover:underline"
              >
                View in Recommendations &rarr;
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
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
