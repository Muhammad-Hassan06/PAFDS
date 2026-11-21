import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Lock,
  FileCheck,
  CheckCircle2,
  Eye,
  Filter,
  ArrowRight,
  X,
  Code,
  Terminal,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import { SecurityThreatItem } from '../types';

export const SecurityCenterModule: React.FC = () => {
  const { securityThreats, resolveSecurityThreat, setActiveModule } = useProduct();
  const [selectedThreat, setSelectedThreat] = useState<SecurityThreatItem | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('All');

  const filteredThreats = securityThreats.filter((t) => {
    if (filterSeverity === 'All') return true;
    return t.severity === filterSeverity;
  });

  const criticalThreats = securityThreats.filter((t) => t.severity === 'Critical').length;
  const blockedThreats = securityThreats.filter((t) => t.status === 'Blocked').length;

  return (
    <div className="space-y-6">
      {/* Top Security Posture Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Guard Status */}
        <div className="p-4 bg-navy text-ivory rounded-lg shadow-panel space-y-1">
          <div className="flex items-center justify-between text-teal-light text-xs font-mono">
            <span>AI QUERY GUARD</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-xl font-display font-bold text-white mt-1">
            AST Enforced (Active)
          </div>
          <p className="text-[11px] text-slate-light">
            SQLGlot AST parser rejects non-SELECT operations &amp; table scans.
          </p>
        </div>

        {/* Upload File Security */}
        <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-1">
          <div className="flex items-center justify-between text-slate text-xs font-mono">
            <span>UPLOAD SCANNER</span>
            <span className="text-teal font-bold">ClamAV Ready</span>
          </div>
          <div className="text-xl font-display font-bold text-navy mt-1">
            CSV Formula Sanitizer
          </div>
          <p className="text-[11px] text-slate">
            Neutralizes dangerous spreadsheet formula payloads (=cmd, +, @).
          </p>
        </div>

        {/* PII Masking */}
        <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-1">
          <div className="flex items-center justify-between text-slate text-xs font-mono">
            <span>RBAC PRIVACY</span>
            <span className="text-teal font-bold">Enabled</span>
          </div>
          <div className="text-xl font-display font-bold text-navy mt-1">
            Column PII Masking
          </div>
          <p className="text-[11px] text-slate">
            Phone numbers and tax credentials masked for non-Owner roles.
          </p>
        </div>

        {/* Audit Log Integrity */}
        <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-1">
          <div className="flex items-center justify-between text-slate text-xs font-mono">
            <span>LOG INTEGRITY</span>
            <span className="text-emerald-700 bg-emerald-50 px-1 rounded font-bold">Verified</span>
          </div>
          <div className="text-xl font-display font-bold text-navy mt-1">
            SHA-256 Hash Chained
          </div>
          <p className="text-[11px] text-slate">
            Immutable log chain protects against administrative tampering.
          </p>
        </div>
      </div>

      {/* Security Threat Table */}
      <div className="bg-white border border-border rounded-lg shadow-panel overflow-hidden">
        <div className="p-4 border-b border-border bg-ivory/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <h3 className="text-xs font-mono font-bold text-slate uppercase tracking-wider">
              Threat Monitoring &amp; Intrusion Incidents ({securityThreats.length})
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveModule('guard')}
              className="px-3 py-1.5 bg-teal hover:bg-teal-hover text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-sm"
            >
              <span>Test AI Query Guard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="table-region">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-ivory/60 text-slate font-mono">
                <th className="py-3 px-4">Event &amp; Threat Signature</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Severity</th>
                <th className="py-3 px-4">Source IP &amp; Actor</th>
                <th className="py-3 px-4">Detection Time</th>
                <th className="py-3 px-4 text-center">Enforcement State</th>
                <th className="py-3 px-4 text-right">Investigation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredThreats.map((threat) => (
                <tr
                  key={threat.id}
                  onClick={() => setSelectedThreat(threat)}
                  className="hover:bg-ivory/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-semibold text-navy">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate bg-ivory px-1.5 py-0.5 rounded border border-border">
                        {threat.id}
                      </span>
                      <span>{threat.event}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate">{threat.category}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        threat.severity === 'Critical'
                          ? 'bg-rose-100 text-rose-700'
                          : threat.severity === 'High'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-teal-light text-teal'
                      }`}
                    >
                      {threat.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate">
                    <div className="font-mono text-[11px] text-navy font-medium">{threat.sourceIp}</div>
                    <div className="text-[10px] text-slate">{threat.actor}</div>
                  </td>
                  <td className="py-3 px-4 text-slate">{threat.detectedAt}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        threat.status === 'Blocked'
                          ? 'bg-rose-600 text-white'
                          : threat.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {threat.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedThreat(threat);
                      }}
                      className="px-2.5 py-1 text-[11px] text-teal hover:bg-teal-light rounded border border-teal/20 transition-colors font-medium"
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

      {/* Threat Inspection Modal */}
      {selectedThreat && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-editorial-lg border border-border max-w-xl w-full p-6 space-y-4 animate-fadeIn">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] font-mono text-rose-600 font-bold uppercase">
                  Security Incident #{selectedThreat.id}
                </span>
                <h3 className="text-base font-bold text-navy">{selectedThreat.event}</h3>
                <span className="text-xs text-slate">{selectedThreat.category} &middot; Severity: {selectedThreat.severity}</span>
              </div>
              <button
                onClick={() => setSelectedThreat(null)}
                className="text-slate hover:text-navy text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-ivory rounded border border-border">
                <span className="font-semibold text-navy">Incident Description:</span>
                <p className="text-slate mt-1 leading-relaxed">{selectedThreat.details}</p>
              </div>

              {selectedThreat.rawPayload && (
                <div className="p-3 bg-navy-dark text-ivory rounded border border-navy-light font-mono text-[11px] space-y-1">
                  <span className="text-rose-400 font-bold block text-[10px]">INTERCEPTED RAW PAYLOAD:</span>
                  <div className="text-white break-words">{selectedThreat.rawPayload}</div>
                </div>
              )}

              <div className="p-3 bg-teal-light rounded border border-teal/20 text-navy space-y-1">
                <span className="font-semibold text-teal">Defensive Mitigation Executed:</span>
                <p className="text-[11px] leading-relaxed">{selectedThreat.mitigation}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate font-mono text-[11px]">
                <div>
                  <span className="block text-[10px] text-slate/70">SOURCE ACTOR</span>
                  <span className="font-bold text-navy">{selectedThreat.actor}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate/70">SOURCE IP</span>
                  <span className="font-bold text-navy">{selectedThreat.sourceIp}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-border">
              {selectedThreat.status !== 'Resolved' ? (
                <button
                  onClick={() => {
                    resolveSecurityThreat(selectedThreat.id);
                    setSelectedThreat(null);
                  }}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded shadow-sm"
                >
                  Mark as Resolved &amp; Close
                </button>
              ) : (
                <span className="text-xs font-mono text-emerald-700 font-bold">✓ Incident Remediated</span>
              )}

              <button
                onClick={() => setSelectedThreat(null)}
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
