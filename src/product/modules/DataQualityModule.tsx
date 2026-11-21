import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Info,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Check,
  X,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import { QualityIssue } from '../types';

export const DataQualityModule: React.FC = () => {
  const { qualityScore, qualityIssues, setActiveModule, metrics } = useProduct();
  const [severityFilter, setSeverityFilter] = useState<'All' | 'Critical' | 'High' | 'Medium' | 'Resolved'>('All');
  const [selectedIssue, setSelectedIssue] = useState<QualityIssue | null>(null);

  const filteredIssues = qualityIssues.filter((item) => {
    if (severityFilter === 'All') return true;
    if (severityFilter === 'Resolved') return item.status === 'Repaired';
    return item.severity === severityFilter && item.status !== 'Repaired';
  });

  return (
    <div className="space-y-6">
      {/* Quality Score Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Main Overall Score */}
        <div className="md:col-span-1 p-5 bg-navy text-ivory rounded-lg shadow-panel flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono text-teal-light uppercase tracking-wider">
              Composite Quality
            </span>
            <div className="text-4xl font-display font-bold text-white mt-2">
              {qualityScore.overall}%
            </div>
            <p className="text-[11px] text-slate-light mt-1">
              {qualityScore.overall >= 90 ? 'Certified Commercial Grade' : 'Remediation Required'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-navy-light text-[11px] text-slate-light font-mono">
            {metrics.pendingRepairsCount} fixes pending approval
          </div>
        </div>

        {/* Completeness */}
        <div className="p-4 bg-white border border-border rounded-lg shadow-panel flex flex-col justify-between">
          <div className="text-xs font-semibold text-slate flex items-center justify-between">
            <span>Completeness</span>
            <span className="text-[10px] font-mono text-teal font-bold">{qualityScore.completeness}%</span>
          </div>
          <div className="my-2">
            <div className="w-full bg-ivory rounded-full h-2 overflow-hidden border border-border">
              <div
                className="bg-teal h-full transition-all duration-500"
                style={{ width: `${qualityScore.completeness}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-slate">
            Mandatory customer IDs, prices, and line units presence check.
          </p>
        </div>

        {/* Uniqueness */}
        <div className="p-4 bg-white border border-border rounded-lg shadow-panel flex flex-col justify-between">
          <div className="text-xs font-semibold text-slate flex items-center justify-between">
            <span>Uniqueness</span>
            <span className={`text-[10px] font-mono font-bold ${qualityScore.uniqueness < 95 ? 'text-amber-600' : 'text-teal'}`}>
              {qualityScore.uniqueness}%
            </span>
          </div>
          <div className="my-2">
            <div className="w-full bg-ivory rounded-full h-2 overflow-hidden border border-border">
              <div
                className={`h-full transition-all duration-500 ${
                  qualityScore.uniqueness < 95 ? 'bg-amber-500' : 'bg-teal'
                }`}
                style={{ width: `${qualityScore.uniqueness}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-slate">
            Duplicate invoice line quarantine & primary key uniqueness.
          </p>
        </div>

        {/* Validity */}
        <div className="p-4 bg-white border border-border rounded-lg shadow-panel flex flex-col justify-between">
          <div className="text-xs font-semibold text-slate flex items-center justify-between">
            <span>Validity</span>
            <span className="text-[10px] font-mono text-teal font-bold">{qualityScore.validity}%</span>
          </div>
          <div className="my-2">
            <div className="w-full bg-ivory rounded-full h-2 overflow-hidden border border-border">
              <div
                className="bg-teal h-full transition-all duration-500"
                style={{ width: `${qualityScore.validity}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-slate">
            Positive sales quantities and valid SKU format conforming to standard.
          </p>
        </div>

        {/* Consistency */}
        <div className="p-4 bg-white border border-border rounded-lg shadow-panel flex flex-col justify-between">
          <div className="text-xs font-semibold text-slate flex items-center justify-between">
            <span>Consistency</span>
            <span className="text-[10px] font-mono text-teal font-bold">{qualityScore.consistency}%</span>
          </div>
          <div className="my-2">
            <div className="w-full bg-ivory rounded-full h-2 overflow-hidden border border-border">
              <div
                className="bg-teal h-full transition-all duration-500"
                style={{ width: `${qualityScore.consistency}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-slate">
            Cross-depot naming alignment and ISO date format conformance.
          </p>
        </div>
      </div>

      {/* Quality Issues Section */}
      <div className="bg-white border border-border rounded-lg shadow-panel overflow-hidden">
        {/* Table Filters & Toolbar */}
        <div className="p-4 border-b border-border bg-ivory/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {(['All', 'Critical', 'High', 'Medium', 'Resolved'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  severityFilter === sev
                    ? 'bg-navy text-white font-semibold shadow-sm'
                    : 'bg-white text-charcoal hover:bg-ivory border border-border'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveModule('repair')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal hover:bg-teal-hover text-white text-xs font-semibold rounded transition-colors shadow-sm"
            >
              <span>Open Data Repair Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Issues Data Table */}
        <div className="table-region">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-ivory/60 text-slate font-mono">
                <th className="py-3 px-4">Issue Type</th>
                <th className="py-3 px-4">Target Dataset</th>
                <th className="py-3 px-4 text-center">Severity</th>
                <th className="py-3 px-4 text-right">Affected Records</th>
                <th className="py-3 px-4 text-right">Revenue Impact</th>
                <th className="py-3 px-4">Detected Timestamp</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredIssues.map((issue) => (
                <tr
                  key={issue.id}
                  onClick={() => setSelectedIssue(issue)}
                  className="hover:bg-ivory/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-semibold text-navy">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate bg-ivory px-1.5 py-0.5 rounded border border-border">
                        {issue.id}
                      </span>
                      <span>{issue.type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate">{issue.dataset}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        issue.severity === 'Critical'
                          ? 'bg-rose-100 text-rose-700'
                          : issue.severity === 'High'
                          ? 'bg-amber-100 text-amber-800'
                          : issue.severity === 'Medium'
                          ? 'bg-teal-light text-teal'
                          : 'bg-slate/10 text-slate'
                      }`}
                    >
                      {issue.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-semibold">
                    {issue.affectedRecordsCount} rows
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-navy font-semibold">
                    {issue.financialImpactPKR > 0
                      ? `PKR ${issue.financialImpactPKR.toLocaleString()}`
                      : 'N/A (Schema)'}
                  </td>
                  <td className="py-3 px-4 text-slate">{issue.detectedAt}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        issue.status === 'Repaired'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIssue(issue);
                      }}
                      className="px-2.5 py-1 text-[11px] font-medium text-teal hover:bg-teal-light rounded border border-teal/20 transition-colors"
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-in Investigation Drawer Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-editorial-lg border border-border max-w-xl w-full overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-border bg-ivory/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate uppercase">
                  Anomaly Investigation #{selectedIssue.id}
                </span>
                <h3 className="text-sm font-bold text-navy">{selectedIssue.type}</h3>
              </div>
              <button
                onClick={() => setSelectedIssue(null)}
                className="text-slate hover:text-navy p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-ivory rounded border border-border">
                <span className="font-semibold text-navy">Detection Diagnostic:</span>
                <p className="text-slate mt-1 leading-relaxed">{selectedIssue.description}</p>
              </div>

              <div className="space-y-2 font-mono">
                <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded">
                  <span className="text-[10px] font-bold text-rose-700 uppercase">
                    Sample Corrupted Value:
                  </span>
                  <div className="text-rose-900 mt-1 font-semibold">
                    {selectedIssue.sampleDetails.foundValue}
                  </div>
                </div>

                <div className="p-2.5 bg-teal-light/50 border border-teal/20 rounded">
                  <span className="text-[10px] font-bold text-teal uppercase">
                    Expected Normalization Pattern:
                  </span>
                  <div className="text-navy mt-1">
                    {selectedIssue.sampleDetails.expectedPattern}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate font-mono text-[11px]">
                <div>
                  <span className="block text-[10px] text-slate/70">AFFECTED DATASET</span>
                  <span className="font-bold text-navy">{selectedIssue.dataset}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate/70">FINANCIAL SKEW</span>
                  <span className="font-bold text-rose-600">
                    {selectedIssue.financialImpactPKR > 0
                      ? `PKR ${selectedIssue.financialImpactPKR.toLocaleString()}`
                      : 'None (structural drift)'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-border">
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="px-3 py-1.5 border border-border rounded text-slate hover:text-navy"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedIssue(null);
                    setActiveModule('repair');
                  }}
                  className="px-4 py-1.5 bg-teal hover:bg-teal-hover text-white font-semibold rounded flex items-center gap-1.5 shadow-sm"
                >
                  <span>Go to Repair Workflow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

