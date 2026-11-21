import React, { useState } from 'react';
import {
  Cpu,
  RefreshCw,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Layers,
  ArrowRight,
  Database,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';

export const SyntheticGeneratorModule: React.FC = () => {
  const { regenerateData, qualityScore, metrics, setActiveModule } = useProduct();
  const [selectedPreset, setSelectedPreset] = useState<'clean' | 'realistic' | 'stress'>('realistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleApplyPreset = () => {
    setIsGenerating(true);
    setTimeout(() => {
      regenerateData(selectedPreset);
      setIsGenerating(false);
      setSuccessMessage(
        `Workspace updated with "${selectedPreset.toUpperCase()}" dataset preset. All dashboards, charts, and data quality scores are synchronized.`
      );
      setTimeout(() => setSuccessMessage(null), 5000);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {successMessage && (
        <div className="p-4 bg-teal text-white text-xs font-semibold rounded-lg shadow-editorial flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="p-5 bg-white border border-border rounded-lg shadow-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-teal-light text-teal">
              <Cpu className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-semibold text-navy">
              Synthetic Wholesale Data &amp; Anomaly Injection Generator
            </h2>
          </div>
          <p className="text-xs text-slate mt-0.5">
            Designed for FYP evaluators: Generate realistic Pakistani distributor transactions with controlled ground-truth error labels to validate the cleaning engine.
          </p>
        </div>

        <button
          onClick={handleApplyPreset}
          disabled={isGenerating}
          className="px-5 py-2 bg-teal hover:bg-teal-hover text-white text-xs font-semibold rounded flex items-center gap-2 shadow-sm transition-colors self-start md:self-auto disabled:opacity-60"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Generating Workspace...' : 'Regenerate Workspace Data'}</span>
        </button>
      </div>

      {/* 3 Preset Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Preset 1: Cleaned Golden Baseline */}
        <div
          onClick={() => setSelectedPreset('clean')}
          className={`p-5 rounded-lg border bg-white shadow-panel cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
            selectedPreset === 'clean'
              ? 'border-teal ring-2 ring-teal/20'
              : 'border-border hover:border-teal/50'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Golden Baseline
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-sm font-bold text-navy">Clean Distributor Dataset</h3>
            <p className="text-xs text-slate leading-relaxed">
              100% reconciled invoice rows. No duplicate lines, zero unassigned customer IDs, uniform ISO date formats.
            </p>
          </div>
          <div className="pt-2 border-t border-border text-[11px] font-mono text-slate flex justify-between">
            <span>Quality Score:</span>
            <strong className="text-emerald-700">99.2% Composite</strong>
          </div>
        </div>

        {/* Preset 2: Realistic Messy Distributor Data (Default) */}
        <div
          onClick={() => setSelectedPreset('realistic')}
          className={`p-5 rounded-lg border bg-white shadow-panel cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
            selectedPreset === 'realistic'
              ? 'border-teal ring-2 ring-teal/20'
              : 'border-border hover:border-teal/50'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                Recommended for Demo
              </span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className="text-sm font-bold text-navy">Realistic Pakistani Wholesale Data</h3>
            <p className="text-xs text-slate leading-relaxed">
              Injected with controlled errors: 7 duplicate invoices (+PKR 85k), negative quantity (-120 units), 14 missing customer IDs, and catalog naming drift.
            </p>
          </div>
          <div className="pt-2 border-t border-border text-[11px] font-mono text-slate flex justify-between">
            <span>Quality Score:</span>
            <strong className="text-amber-700">94.2% (6 Flagged Issues)</strong>
          </div>
        </div>

        {/* Preset 3: Stress-Test */}
        <div
          onClick={() => setSelectedPreset('stress')}
          className={`p-5 rounded-lg border bg-white shadow-panel cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
            selectedPreset === 'stress'
              ? 'border-teal ring-2 ring-teal/20'
              : 'border-border hover:border-teal/50'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                Extreme Anomaly Load
              </span>
              <Flame className="w-4 h-4 text-rose-600" />
            </div>
            <h3 className="text-sm font-bold text-navy">Stress-Test &amp; Anomaly Storm</h3>
            <p className="text-xs text-slate leading-relaxed">
              Injects 45 outlier price distortions (+300%), cross-depot SKU collisions, and high noise to test the automated data repair algorithms.
            </p>
          </div>
          <div className="pt-2 border-t border-border text-[11px] font-mono text-slate flex justify-between">
            <span>Quality Score:</span>
            <strong className="text-rose-700">76.8% (Remediation Required)</strong>
          </div>
        </div>
      </div>

      {/* Ground Truth Validation Matrix */}
      <div className="p-5 bg-white border border-border rounded-lg shadow-panel space-y-4">
        <h3 className="text-xs font-mono font-bold text-slate uppercase tracking-wider">
          Ground-Truth Evaluation Parameters (Pakistani FMCG Distribution Context)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 bg-ivory rounded border border-border">
            <span className="text-[10px] text-slate block">TARGET CURRENCY</span>
            <span className="font-bold text-navy">PKR (Pakistani Rupee)</span>
          </div>
          <div className="p-3 bg-ivory rounded border border-border">
            <span className="text-[10px] text-slate block">DEPOT HUBS</span>
            <span className="font-bold text-navy">Karachi, Lahore, Islamabad, Faisalabad</span>
          </div>
          <div className="p-3 bg-ivory rounded border border-border">
            <span className="text-[10px] text-slate block">FMCG CATEGORIES</span>
            <span className="font-bold text-navy">Beverages, Oils, Dairy, Tea &amp; Spices</span>
          </div>
          <div className="p-3 bg-ivory rounded border border-border">
            <span className="text-[10px] text-slate block">ANOMALY TAXONOMY</span>
            <span className="font-bold text-navy">Duplicate, Negative, Drift, Unlinked</span>
          </div>
        </div>
      </div>
    </div>
  );
};
