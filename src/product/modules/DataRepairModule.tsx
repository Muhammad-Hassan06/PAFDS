import React, { useState } from 'react';
import {
  Wrench,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Eye,
  Check,
  X,
  Edit3,
  Layers,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import { RepairItem } from '../types';

export const DataRepairModule: React.FC = () => {
  const { repairs, approveRepair, rejectRepair, rollbackRepair, setActiveModule } = useProduct();

  const [selectedRepairForEdit, setSelectedRepairForEdit] = useState<RepairItem | null>(null);
  const [customEditValue, setCustomEditValue] = useState<string>('');
  const [rejectionModalId, setRejectionModalId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');

  const pendingRepairs = repairs.filter((r) => r.status === 'Pending Approval');
  const completedRepairs = repairs.filter((r) => r.status === 'Applied' || r.status === 'Rejected');

  const handleOpenEdit = (repair: RepairItem) => {
    setSelectedRepairForEdit(repair);
    setCustomEditValue(repair.proposedValue);
  };

  const handleSaveCustomEdit = () => {
    if (selectedRepairForEdit) {
      approveRepair(selectedRepairForEdit.id, `Manual override: ${customEditValue}`);
      setSelectedRepairForEdit(null);
    }
  };

  const handleConfirmRejection = () => {
    if (rejectionModalId) {
      rejectRepair(rejectionModalId, rejectionReason);
      setRejectionModalId(null);
      setRejectionReason('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Explaining Safe vs Human Approval */}
      <div className="p-4 bg-white border border-border rounded-lg shadow-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-teal-light text-teal shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-navy">
              Human-in-the-Loop Data Repair Pipeline
            </h2>
            <p className="text-xs text-slate mt-0.5">
              Original data is <strong>never silently overwritten</strong>. Safe formatting fixes apply automatically; commercial & revenue changes require explicit manager approval with one-click rollback.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0 text-xs font-mono">
          <span className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded border border-amber-200">
            {pendingRepairs.length} Pending Approval
          </span>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
            {completedRepairs.length} Completed / Logged
          </span>
        </div>
      </div>

      {/* Pending Repairs: Interactive Before/After Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold text-slate uppercase tracking-wider">
            Pending Approval Queue ({pendingRepairs.length})
          </h3>
          <span className="text-xs text-slate">Action required before syncing downstream models</span>
        </div>

        {pendingRepairs.length === 0 ? (
          <div className="p-8 text-center bg-white border border-border rounded-lg shadow-panel space-y-2">
            <CheckCircle2 className="w-8 h-8 text-teal mx-auto" />
            <h4 className="text-sm font-semibold text-navy">All pending repairs reconciled!</h4>
            <p className="text-xs text-slate">
              Your sales and catalog datasets are verified. Clean downstream analytics active.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pendingRepairs.map((repair) => (
              <div
                key={repair.id}
                className="bg-white border border-border rounded-lg shadow-panel p-5 space-y-4 transition-all hover:border-teal/50"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-navy bg-ivory px-2 py-0.5 rounded border border-border">
                      {repair.id}
                    </span>
                    <span className="text-xs font-semibold text-navy">
                      {repair.dataset} &middot; {repair.recordIdentifier}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-light text-teal font-bold">
                      Confidence: {repair.confidenceScore}%
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200">
                      {repair.repairType}
                    </span>
                  </div>
                </div>

                {/* Side-by-side Before / After Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  {/* Before */}
                  <div className="p-3.5 rounded border border-rose-200 bg-rose-50/40">
                    <div className="flex items-center justify-between text-rose-700 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                      <span>Original Corrupted State</span>
                      <span className="bg-rose-100 px-1 rounded">Before</span>
                    </div>
                    <div className="text-slate text-[11px] mb-1">Field: <strong>{repair.field}</strong></div>
                    <div className="text-rose-900 font-semibold break-words">
                      {repair.originalValue}
                    </div>
                  </div>

                  {/* After */}
                  <div className="p-3.5 rounded border border-teal/30 bg-teal-light/40">
                    <div className="flex items-center justify-between text-teal text-[10px] font-bold uppercase tracking-wider mb-1.5">
                      <span>Proposed Validated State</span>
                      <span className="bg-teal text-white px-1 rounded">After</span>
                    </div>
                    <div className="text-slate text-[11px] mb-1">Field: <strong>{repair.field}</strong></div>
                    <div className="text-navy font-semibold break-words">
                      {repair.proposedValue}
                    </div>
                  </div>
                </div>

                {/* Impact & Reasoning */}
                <div className="text-xs space-y-1">
                  <p className="text-slate">
                    <strong>Rule Logic:</strong> {repair.reason}
                  </p>
                  <p className="text-teal font-medium">
                    <strong>Business Impact:</strong> {repair.impactExplanation}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                  <button
                    onClick={() => setRejectionModalId(repair.id)}
                    className="px-3 py-1.5 text-xs text-rose-700 hover:bg-rose-50 border border-rose-200 rounded transition-colors flex items-center gap-1 font-medium"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={() => handleOpenEdit(repair)}
                    className="px-3 py-1.5 text-xs text-slate hover:text-navy hover:bg-ivory border border-border rounded transition-colors flex items-center gap-1 font-medium"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Value</span>
                  </button>

                  <button
                    onClick={() => approveRepair(repair.id)}
                    className="px-4 py-1.5 text-xs font-semibold bg-teal hover:bg-teal-hover text-white rounded transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve & Apply Fix</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Complete Repair History Audit Table */}
      <div className="bg-white border border-border rounded-lg shadow-panel overflow-hidden">
        <div className="p-4 border-b border-border bg-ivory/40 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold text-slate uppercase tracking-wider">
              Repair & Remediation History
            </h3>
            <p className="text-xs text-slate mt-0.5">
              Every applied change is recorded with an immutable SHA-256 hash and rollback capabilities.
            </p>
          </div>
          <button
            onClick={() => setActiveModule('audit')}
            className="text-xs text-teal font-medium hover:underline flex items-center gap-1"
          >
            <span>View Full Audit Log</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="table-region">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-ivory/60 text-slate font-mono">
                <th className="py-2.5 px-3">Repair ID</th>
                <th className="py-2.5 px-3">Record & Dataset</th>
                <th className="py-2.5 px-3">Original Value</th>
                <th className="py-2.5 px-3">Corrected Value</th>
                <th className="py-2.5 px-3">Applied By / Date</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right">Rollback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {repairs.map((r) => (
                <tr key={r.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-semibold text-navy">{r.id}</td>
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-navy">{r.recordIdentifier}</div>
                    <div className="text-[10px] text-slate font-mono">{r.dataset}</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-rose-800 max-w-xs truncate" title={r.originalValue}>
                    {r.originalValue}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-teal max-w-xs truncate" title={r.proposedValue}>
                    {r.proposedValue}
                  </td>
                  <td className="py-2.5 px-3 text-slate">
                    <div>{r.appliedBy || 'Auto Pipeline'}</div>
                    <div className="text-[10px] font-mono">{r.appliedAt || 'Pre-seeded'}</div>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        r.status === 'Applied'
                          ? 'bg-emerald-50 text-emerald-700'
                          : r.status === 'Pending Approval'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    {r.status === 'Applied' ? (
                      <button
                        onClick={() => rollbackRepair(r.id)}
                        className="px-2 py-1 text-[11px] text-slate hover:text-rose-700 hover:bg-rose-50 border border-border rounded flex items-center gap-1 ml-auto font-mono"
                        title="Rollback this repair to original state"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Rollback</span>
                      </button>
                    ) : (
                      <span className="text-slate/40 text-[11px] font-mono">&mdash;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Value Modal */}
      {selectedRepairForEdit && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-editorial-lg border border-border max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h4 className="text-sm font-bold text-navy">
                Edit Correction Value ({selectedRepairForEdit.id})
              </h4>
              <button
                onClick={() => setSelectedRepairForEdit(null)}
                className="text-slate hover:text-navy"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <label className="block font-semibold text-navy">Target Field Correction:</label>
              <textarea
                value={customEditValue}
                onChange={(e) => setCustomEditValue(e.target.value)}
                rows={3}
                className="w-full p-2 border border-border rounded font-mono text-xs focus:outline-none focus:border-teal text-navy"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <button
                onClick={() => setSelectedRepairForEdit(null)}
                className="px-3 py-1.5 border border-border rounded text-xs text-slate hover:text-navy"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCustomEdit}
                className="px-4 py-1.5 bg-teal hover:bg-teal-hover text-white text-xs font-semibold rounded"
              >
                Apply Custom Value
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {rejectionModalId && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-editorial-lg border border-border max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h4 className="text-sm font-bold text-navy">
                Reject Proposed Correction ({rejectionModalId})
              </h4>
              <button
                onClick={() => setRejectionModalId(null)}
                className="text-slate hover:text-navy"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <label className="block font-semibold text-navy">Reason for Rejection (Optional):</label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g., Customer confirmed second invoice was an intentional separate order..."
                rows={3}
                className="w-full p-2 border border-border rounded text-xs focus:outline-none focus:border-rose-400 text-navy"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <button
                onClick={() => setRejectionModalId(null)}
                className="px-3 py-1.5 border border-border rounded text-xs text-slate hover:text-navy"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRejection}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
