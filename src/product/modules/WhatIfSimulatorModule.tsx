import React, { useState, useMemo } from 'react';
import {
  Sliders,
  RotateCcw,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  PackageCheck,
  Building2,
  Sparkles,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';

export const WhatIfSimulatorModule: React.FC = () => {
  const { products } = useProduct();

  // Simulation Sliders
  const [demandDeltaPct, setDemandDeltaPct] = useState<number>(20); // e.g. +20% demand surge
  const [leadTimeDeltaDays, setLeadTimeDeltaDays] = useState<number>(7); // e.g. +7 days transit delay
  const [safetyBufferMultiplier, setSafetyBufferMultiplier] = useState<number>(1.2); // 1.2x buffer

  const handleReset = () => {
    setDemandDeltaPct(0);
    setLeadTimeDeltaDays(0);
    setSafetyBufferMultiplier(1.0);
  };

  // Baseline vs Simulated Calculations
  const simulationResults = useMemo(() => {
    let baselineStockouts = 0;
    let simulatedStockouts = 0;
    let baselineCapitalPKR = 0;
    let simulatedCapitalPKR = 0;

    const simulatedRows = products.map((p) => {
      // Baseline calculations
      const baseDailyDemand = p.dailyDemand;
      const baseLeadTime = p.leadTimeDays;
      const baseLTDemand = baseDailyDemand * baseLeadTime;
      const isBaseStockout = p.currentStock < baseLTDemand;
      if (isBaseStockout) baselineStockouts++;
      const baseReorderQty = Math.max(0, baseLTDemand + p.reorderThreshold - p.currentStock);
      baselineCapitalPKR += baseReorderQty * p.costPKR;

      // Simulated calculations
      const simDailyDemand = Math.round(baseDailyDemand * (1 + demandDeltaPct / 100));
      const simLeadTime = Math.max(1, baseLeadTime + leadTimeDeltaDays);
      const simLTDemand = simDailyDemand * simLeadTime;
      const simBuffer = Math.round(p.reorderThreshold * safetyBufferMultiplier);
      const isSimStockout = p.currentStock < simLTDemand;
      if (isSimStockout) simulatedStockouts++;
      const simReorderQty = Math.max(0, simLTDemand + simBuffer - p.currentStock);
      simulatedCapitalPKR += simReorderQty * p.costPKR;

      const daysUntilSimDepletion = Math.floor(p.currentStock / Math.max(1, simDailyDemand));

      return {
        product: p,
        baseLTDemand,
        simLTDemand,
        simDailyDemand,
        simLeadTime,
        isSimStockout,
        simReorderQty,
        simCapitalPKR: simReorderQty * p.costPKR,
        daysUntilSimDepletion,
      };
    });

    return {
      baselineStockouts,
      simulatedStockouts,
      baselineCapitalPKR,
      simulatedCapitalPKR,
      simulatedRows,
    };
  }, [products, demandDeltaPct, leadTimeDeltaDays, safetyBufferMultiplier]);

  return (
    <div className="space-y-6">
      {/* Simulation Controller Panel */}
      <div className="p-5 bg-white border border-border rounded-lg shadow-panel space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-teal-light text-teal">
              <Sliders className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-navy">
                Wholesale Inventory Scenario Modeling
              </h2>
              <p className="text-xs text-slate">
                Simulate supply chain shocks, supplier strikes, Ramadan/Eid surges, and transit disruptions
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate hover:text-navy bg-ivory hover:bg-ivory-dark rounded border border-border transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Baseline</span>
          </button>
        </div>

        {/* 3 Interactive Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
          {/* Slider 1: Demand Change */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-navy">Demand Surge / Drop</span>
              <span
                className={`font-mono font-bold px-2 py-0.5 rounded ${
                  demandDeltaPct > 0
                    ? 'bg-rose-100 text-rose-800'
                    : demandDeltaPct < 0
                    ? 'bg-teal-light text-teal'
                    : 'bg-ivory text-slate'
                }`}
              >
                {demandDeltaPct > 0 ? '+' : ''}
                {demandDeltaPct}%
              </span>
            </div>
            <input
              type="range"
              min="-40"
              max="60"
              step="5"
              value={demandDeltaPct}
              onChange={(e) => setDemandDeltaPct(Number(e.target.value))}
              className="w-full accent-teal cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate font-mono">
              <span>-40% (Recession)</span>
              <span>0% (Baseline)</span>
              <span>+60% (Peak Season)</span>
            </div>
          </div>

          {/* Slider 2: Supplier Lead Time Shift */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-navy">Supplier Transit Delays</span>
              <span
                className={`font-mono font-bold px-2 py-0.5 rounded ${
                  leadTimeDeltaDays > 0
                    ? 'bg-amber-100 text-amber-800'
                    : leadTimeDeltaDays < 0
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-ivory text-slate'
                }`}
              >
                {leadTimeDeltaDays > 0 ? '+' : ''}
                {leadTimeDeltaDays} Days
              </span>
            </div>
            <input
              type="range"
              min="-7"
              max="21"
              step="1"
              value={leadTimeDeltaDays}
              onChange={(e) => setLeadTimeDeltaDays(Number(e.target.value))}
              className="w-full accent-teal cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate font-mono">
              <span>-7d (Fast Transit)</span>
              <span>0d (Normal)</span>
              <span>+21d (Port Jam)</span>
            </div>
          </div>

          {/* Slider 3: Safety Buffer Multiplier */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-navy">Safety Buffer Multiplier</span>
              <span className="font-mono font-bold bg-ivory px-2 py-0.5 rounded text-navy border border-border">
                {safetyBufferMultiplier}x
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={safetyBufferMultiplier}
              onChange={(e) => setSafetyBufferMultiplier(Number(e.target.value))}
              className="w-full accent-teal cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate font-mono">
              <span>0.5x (Lean)</span>
              <span>1.0x (Standard)</span>
              <span>2.5x (Heavy Buffer)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Impact Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stockout Risk Comparison */}
        <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-2">
          <span className="text-xs text-slate font-medium">Stockouts at Risk</span>
          <div className="flex items-baseline gap-3">
            <div className="text-2xl font-display font-bold text-rose-600">
              {simulationResults.simulatedStockouts} SKUs
            </div>
            <div className="text-xs font-mono text-slate">
              (vs {simulationResults.baselineStockouts} baseline)
            </div>
          </div>
          <p className="text-[11px] text-slate">
            {simulationResults.simulatedStockouts > simulationResults.baselineStockouts
              ? `⚠️ +${simulationResults.simulatedStockouts - simulationResults.baselineStockouts} additional product lines become vulnerable under this scenario.`
              : '✓ Current inventory buffer absorbs simulated shocks.'}
          </p>
        </div>

        {/* Working Capital Required */}
        <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-2">
          <span className="text-xs text-slate font-medium">Working Capital Replenishment</span>
          <div className="flex items-baseline gap-3">
            <div className="text-2xl font-display font-bold text-navy">
              PKR {(simulationResults.simulatedCapitalPKR / 1000000).toFixed(2)}M
            </div>
            <div className="text-xs font-mono text-slate">
              (vs PKR {(simulationResults.baselineCapitalPKR / 1000000).toFixed(2)}M)
            </div>
          </div>
          <p className="text-[11px] text-slate">
            Additional capital delta required:{' '}
            <strong className="text-navy">
              PKR {((simulationResults.simulatedCapitalPKR - simulationResults.baselineCapitalPKR) / 1000).toFixed(0)}k
            </strong>
          </p>
        </div>

        {/* Scenario Verdict */}
        <div className="p-4 bg-navy text-ivory rounded-lg shadow-panel flex flex-col justify-between space-y-2">
          <div>
            <span className="text-[10px] font-mono text-teal uppercase font-bold">
              Simulation Verdict
            </span>
            <div className="text-base font-bold text-white mt-1">
              {simulationResults.simulatedStockouts >= 4
                ? 'High Risk: Working Capital Injection Needed'
                : 'Manageable: Normal Safety Buffer Holds'}
            </div>
          </div>
          <p className="text-[11px] text-slate-light">
            Model projects supply chain vulnerability across {products.length} wholesale SKUs.
          </p>
        </div>
      </div>

      {/* Simulated SKU Impact Table */}
      <div className="bg-white border border-border rounded-lg shadow-panel overflow-hidden">
        <div className="p-4 border-b border-border bg-ivory/40 flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold text-slate uppercase tracking-wider">
            Simulated SKU Breakdown (Lead Time & Demand Shock)
          </h3>
          <span className="text-xs text-slate">Values recalculate dynamically in real-time</span>
        </div>

        <div className="table-region">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-ivory/60 text-slate font-mono">
                <th className="py-2.5 px-4">Product Name & SKU</th>
                <th className="py-2.5 px-4 text-right">Sim. Daily Demand</th>
                <th className="py-2.5 px-4 text-right">Sim. Lead Time</th>
                <th className="py-2.5 px-4 text-right">Current Stock</th>
                <th className="py-2.5 px-4 text-right">Sim. LT Demand</th>
                <th className="py-2.5 px-4 text-center">Days to Depletion</th>
                <th className="py-2.5 px-4 text-right">Recommended PO</th>
                <th className="py-2.5 px-4 text-center">Scenario State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {simulationResults.simulatedRows.map((r) => (
                <tr key={r.product.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-navy">{r.product.name}</div>
                    <div className="text-[10px] text-slate font-mono">{r.product.sku}</div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-navy">
                    {r.simDailyDemand} {r.product.unit}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate">
                    {r.simLeadTime} Days
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-semibold">
                    {r.product.currentStock}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-rose-700 font-semibold">
                    {r.simLTDemand}
                  </td>
                  <td className="py-3 px-4 text-center font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.daysUntilSimDepletion <= 5
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      ~{r.daysUntilSimDepletion} Days
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-teal">
                    +{r.simReorderQty} {r.product.unit}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        r.isSimStockout
                          ? 'bg-rose-600 text-white'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {r.isSimStockout ? 'Stockout Risk' : 'Adequate'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
