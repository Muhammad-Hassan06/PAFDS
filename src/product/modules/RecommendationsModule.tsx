import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Building2,
  PackageCheck,
  Filter,
  Check,
  X,
  MessageSquare,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import { RecommendationItem } from '../types';

export const RecommendationsModule: React.FC = () => {
  const { recommendations, acceptRecommendation, rejectRecommendation } = useProduct();
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState<string>('');
  const [acceptedToast, setAcceptedToast] = useState<string | null>(null);

  const filteredRecs = recommendations.filter((r) => {
    if (categoryFilter === 'All') return true;
    return r.category === categoryFilter;
  });

  const handleAccept = (rec: RecommendationItem) => {
    acceptRecommendation(rec.id, 'Manager Approved & Draft PO Generated');
    setAcceptedToast(`Draft PO generated for ${rec.title}. Added to Operations queue.`);
    setTimeout(() => setAcceptedToast(null), 4000);
  };

  const handleConfirmReject = () => {
    if (rejectingId) {
      rejectRecommendation(rejectingId, rejectReason);
      setRejectingId(null);
      setRejectReason('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {acceptedToast && (
        <div className="p-3 bg-teal text-white text-xs font-semibold rounded-lg shadow-editorial flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{acceptedToast}</span>
          </div>
          <button onClick={() => setAcceptedToast(null)} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-5 bg-white border border-border rounded-lg shadow-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-teal-light text-teal">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-semibold text-navy">
              Decision Intelligence & Prescriptive Actions
            </h2>
          </div>
          <p className="text-xs text-slate mt-0.5">
            The platform synthesizes verified sales, inventory runway, and supplier reliability into concrete, human-authorized decisions.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs p-2 bg-white border border-border rounded text-navy font-semibold focus:outline-none focus:border-teal"
          >
            <option value="All">All Recommendation Types</option>
            <option value="Inventory Reorder">Inventory Reorder</option>
            <option value="Revenue Protection">Revenue Protection</option>
            <option value="Customer Retention">Customer Retention</option>
            <option value="Supplier Quality">Supplier Quality</option>
            <option value="Margin Optimization">Margin Optimization</option>
          </select>
        </div>
      </div>

      {/* Recommendation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecs.map((rec) => (
          <div
            key={rec.id}
            className={`p-5 rounded-lg border bg-white shadow-panel flex flex-col justify-between space-y-4 transition-all ${
              rec.status === 'Accepted'
                ? 'border-emerald-300 bg-emerald-50/20'
                : rec.status === 'Rejected'
                ? 'border-slate/20 opacity-60'
                : 'border-border hover:border-teal/50'
            }`}
          >
            <div className="space-y-3">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      rec.priority === 'Critical'
                        ? 'bg-rose-100 text-rose-700'
                        : rec.priority === 'High'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-teal-light text-teal'
                    }`}
                  >
                    {rec.priority} Priority
                  </span>
                  <span className="text-[10px] font-mono text-slate bg-ivory px-2 py-0.5 rounded border border-border">
                    {rec.category}
                  </span>
                </div>
                <span className="text-[10px] text-slate font-mono">{rec.createdAt}</span>
              </div>

              {/* Title & Reason */}
              <div>
                <h3 className="text-sm font-bold text-navy leading-snug">{rec.title}</h3>
                <p className="text-xs text-slate mt-1.5 leading-relaxed">{rec.reason}</p>
              </div>

              {/* Supporting Data & Benefit */}
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-ivory border border-border text-navy">
                  <span className="text-[10px] text-slate block mb-0.5">GROUNDED EVIDENCE</span>
                  {rec.supportingData}
                </div>
                <div className="p-2.5 rounded bg-teal-light/50 border border-teal/20 text-navy">
                  <span className="text-[10px] text-teal font-bold block mb-0.5">EXPECTED BENEFIT</span>
                  {rec.expectedBenefit}
                </div>
              </div>

              {/* Recommended Action */}
              <div className="text-xs">
                <span className="font-semibold text-navy">Prescribed Action: </span>
                <span className="text-slate font-medium">{rec.recommendedAction}</span>
              </div>

              {/* Feedback Note if present */}
              {rec.feedbackNote && (
                <div className="text-[11px] font-mono text-slate bg-ivory p-2 rounded border border-border">
                  Feedback Log: <strong>{rec.feedbackNote}</strong>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold text-slate">
                Status: <strong className={rec.status === 'Accepted' ? 'text-emerald-700' : 'text-navy'}>{rec.status}</strong>
              </span>

              {rec.status === 'Active' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRejectingId(rec.id)}
                    className="px-3 py-1.5 text-xs text-slate hover:text-rose-700 hover:bg-rose-50 border border-border rounded transition-colors flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => handleAccept(rec)}
                    className="px-4 py-1.5 text-xs font-semibold bg-teal hover:bg-teal-hover text-white rounded transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Authorize Action</span>
                  </button>
                </div>
              ) : rec.status === 'Accepted' ? (
                <span className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Action Dispatched
                </span>
              ) : (
                <span className="text-xs font-mono text-slate">Declined by User</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Reject Feedback Modal */}
      {rejectingId && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-editorial-lg border border-border max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h4 className="text-sm font-bold text-navy">Decline Recommendation</h4>
              <button onClick={() => setRejectingId(null)} className="text-slate hover:text-navy">
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <label className="block font-semibold text-navy">
                Optional Reason (Trains future ML recommendation thresholds):
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g., We have an alternative local vendor arriving tomorrow with stock..."
                rows={3}
                className="w-full p-2 border border-border rounded text-xs text-navy focus:outline-none focus:border-teal"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <button
                onClick={() => setRejectingId(null)}
                className="px-3 py-1.5 border border-border rounded text-xs text-slate hover:text-navy"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded"
              >
                Record Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
