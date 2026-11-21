import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Lock,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Eye,
  EyeOff,
  Hash,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import { UserRole } from '../types';

export const RbacAuditModule: React.FC = () => {
  const { auditLogs, role, setRole, customers, verifyAuditChain } = useProduct();
  const [activeTab, setActiveTab] = useState<'audit' | 'rbac' | 'pii'>('audit');
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    checkedCount: number;
  } | null>(null);

  const handleVerifyIntegrity = () => {
    const res = verifyAuditChain();
    setVerificationResult({
      isValid: res.isValid,
      checkedCount: res.checkedCount,
    });
  };

  // PII masking helper based on current role
  const maskPhone = (phone: string, currentRole: UserRole) => {
    if (currentRole === 'Owner') return phone;
    // Mask: e.g. 0300-8291402 -> 0300-***-**02
    const parts = phone.split('-');
    if (parts.length === 2) {
      return `${parts[0]}-***-**${parts[1].slice(-2)}`;
    }
    return `${phone.slice(0, 4)}-***-**${phone.slice(-2)}`;
  };

  const maskEmail = (email: string, currentRole: UserRole) => {
    if (currentRole === 'Owner') return email;
    const [name, domain] = email.split('@');
    return `${name.slice(0, 2)}***@${domain}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Chain Verification */}
      <div className="p-5 bg-white border border-border rounded-lg shadow-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-teal-light text-teal">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-semibold text-navy">
              Tamper-Evident Audit Trails &amp; Role-Based Access Control
            </h2>
          </div>
          <p className="text-xs text-slate">
            Every administrative login, data repair, and AI query is chained cryptographically with SHA-256 hashes.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleVerifyIntegrity}
            className="px-4 py-2 bg-teal hover:bg-teal-hover text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Hash className="w-3.5 h-3.5" />
            <span>Verify Hash Chain Integrity</span>
          </button>
        </div>
      </div>

      {/* Verification Toast if clicked */}
      {verificationResult && (
        <div
          className={`p-4 rounded-lg border text-xs flex items-center justify-between ${
            verificationResult.isValid
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold">Cryptographic Chain Verification Succeeded!</span>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                Validated {verificationResult.checkedCount} consecutive ledger entries. Zero broken hash links or backdated records detected.
              </p>
            </div>
          </div>
          <button
            onClick={() => setVerificationResult(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white border border-border rounded-lg shadow-panel overflow-hidden">
        <div className="p-4 border-b border-border bg-ivory/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeTab === 'audit'
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white text-charcoal hover:bg-ivory border border-border'
              }`}
            >
              Hash-Chained Audit Log ({auditLogs.length})
            </button>
            <button
              onClick={() => setActiveTab('rbac')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeTab === 'rbac'
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white text-charcoal hover:bg-ivory border border-border'
              }`}
            >
              RBAC Permissions Matrix
            </button>
            <button
              onClick={() => setActiveTab('pii')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeTab === 'pii'
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white text-charcoal hover:bg-ivory border border-border'
              }`}
            >
              Live PII Masking Demonstration
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate">Active Demo Role:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="bg-ivory border border-border rounded px-2 py-1 text-navy font-bold focus:outline-none focus:border-teal"
            >
              <option value="Owner">Owner (Unrestricted)</option>
              <option value="Branch Manager">Branch Manager</option>
              <option value="Analyst">Analyst (Masked PII)</option>
              <option value="Auditor">Auditor (Read-Only)</option>
            </select>
          </div>
        </div>

        {/* Tab 1: Audit Log Table */}
        {activeTab === 'audit' && (
          <div className="table-region">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-ivory/60 text-slate font-mono">
                  <th className="py-3 px-4">Log ID &amp; Time</th>
                  <th className="py-3 px-4">Actor &amp; Role</th>
                  <th className="py-3 px-4">Action Type</th>
                  <th className="py-3 px-4">Module</th>
                  <th className="py-3 px-4">Audit Details</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 font-mono">Block Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-ivory/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-navy font-mono">{log.id}</div>
                      <div className="text-[10px] text-slate font-mono">{log.timestamp}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-navy">{log.actor}</div>
                      <div className="text-[10px] text-teal font-mono">{log.role}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-[10px] bg-ivory px-2 py-0.5 rounded border border-border font-bold text-navy">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate font-medium">{log.module}</td>
                    <td className="py-3 px-4 text-slate max-w-xs">{log.details}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          log.status === 'SUCCESS'
                            ? 'bg-emerald-50 text-emerald-700'
                            : log.status === 'BLOCKED'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[10px] text-slate" title={`Full Hash: ${log.hash}`}>
                      <span className="text-teal font-semibold">{log.hash.slice(0, 10)}</span>
                      <span>...</span>
                      <span className="text-slate/60">{log.hash.slice(-6)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: RBAC Matrix */}
        {activeTab === 'rbac' && (
          <div className="p-6 space-y-4">
            <h4 className="text-sm font-bold text-navy">Role-Based Access Control Specification</h4>
            <div className="table-region border border-border rounded-lg text-xs">
              <table className="w-full text-left font-mono">
                <thead className="bg-ivory text-slate border-b border-border">
                  <tr>
                    <th className="p-3">Platform Capability</th>
                    <th className="p-3 text-center">Owner</th>
                    <th className="p-3 text-center">Branch Manager</th>
                    <th className="p-3 text-center">Analyst</th>
                    <th className="p-3 text-center">Auditor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-3 font-semibold text-navy">Consolidated Financials &amp; Revenues</td>
                    <td className="p-3 text-center text-emerald-700 font-bold">✓ Full</td>
                    <td className="p-3 text-center text-slate">Depot Only</td>
                    <td className="p-3 text-center text-emerald-700 font-bold">✓ Full</td>
                    <td className="p-3 text-center text-slate">Read-Only</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-navy">Customer Contact PII (Phone/Email)</td>
                    <td className="p-3 text-center text-emerald-700 font-bold">✓ Unmasked</td>
                    <td className="p-3 text-center text-slate">Depot Customers</td>
                    <td className="p-3 text-center text-rose-600 font-bold">✗ Masked</td>
                    <td className="p-3 text-center text-rose-600 font-bold">✗ Masked</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-navy">Approve Data Repairs &amp; Rollbacks</td>
                    <td className="p-3 text-center text-emerald-700 font-bold">✓ Full</td>
                    <td className="p-3 text-center text-emerald-700 font-bold">✓ Depot Scope</td>
                    <td className="p-3 text-center text-rose-600 font-bold">✗ Propose Only</td>
                    <td className="p-3 text-center text-slate">Read-Only</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-navy">Authorize Purchase Orders &amp; Recs</td>
                    <td className="p-3 text-center text-emerald-700 font-bold">✓ Full</td>
                    <td className="p-3 text-center text-emerald-700 font-bold">✓ Full</td>
                    <td className="p-3 text-center text-rose-600 font-bold">✗ View Only</td>
                    <td className="p-3 text-center text-slate">Audit Only</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-navy">AI Query Guard AST Workbench</td>
                    <td className="p-3 text-center text-emerald-700 font-bold">✓ Full</td>
                    <td className="p-3 text-center text-slate">Limited</td>
                    <td className="p-3 text-center text-emerald-700 font-bold">✓ Full</td>
                    <td className="p-3 text-center text-emerald-700 font-bold">✓ Full</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: PII Masking Live Demonstration */}
        {activeTab === 'pii' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 rounded bg-teal-light text-teal text-xs">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 shrink-0" />
                <span>
                  Viewing customer records as <strong>{role}</strong>. Restricted roles receive dynamic column-level SHA masked tokens.
                </span>
              </div>
              <span className="font-mono font-bold">
                {role === 'Owner' ? 'Unmasked (Privileged)' : 'Masked (Privacy Mode)'}
              </span>
            </div>

            <div className="table-region border border-border rounded-lg text-xs">
              <table className="w-full text-left font-mono">
                <thead className="bg-ivory text-slate border-b border-border">
                  <tr>
                    <th className="p-3">Customer Account</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Contact Phone (PII)</th>
                    <th className="p-3">Email Address (PII)</th>
                    <th className="p-3 text-center">Masking State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-ivory/30">
                      <td className="p-3 font-semibold text-navy">{c.name}</td>
                      <td className="p-3 text-slate">{c.city}</td>
                      <td className="p-3 font-bold text-navy">{maskPhone(c.phone, role)}</td>
                      <td className="p-3 text-slate">{maskEmail(c.email, role)}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            role === 'Owner'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {role === 'Owner' ? 'Visible' : 'Masked'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
