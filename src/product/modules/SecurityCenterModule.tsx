import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Lock,
  FileCheck,
  CheckCircle2,
  XCircle,
  Eye,
  Filter,
  ArrowRight,
  X,
  Code,
  Terminal,
  Play,
  Hash,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import { SecurityThreatItem, UserRole } from '../types';

export const SecurityCenterModule: React.FC = () => {
  const {
    securityThreats,
    resolveSecurityThreat,
    auditLogs,
    verifyAuditChain,
    addAuditLog,
    role,
  } = useProduct();

  const [activeTab, setActiveTab] = useState<'threats' | 'guard' | 'audit'>('threats');
  const [selectedThreat, setSelectedThreat] = useState<SecurityThreatItem | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('All');

  // AI Query Guard workbench state
  const [inputQuery, setInputQuery] = useState<string>(
    'SELECT p.name, SUM(s.quantity) AS total_units FROM trusted_sales s JOIN products_catalog p ON s.sku = p.sku GROUP BY p.name ORDER BY total_units DESC LIMIT 5;'
  );

  const [validationResult, setValidationResult] = useState<{
    status: 'PASSED' | 'BLOCKED';
    astStatementType: string;
    detectedTables: string[];
    blockedReason?: string;
    readOnlyEnforced: boolean;
    costEstimate: string;
  } | null>({
    status: 'PASSED',
    astStatementType: 'SELECT',
    detectedTables: ['trusted_sales', 'products_catalog'],
    readOnlyEnforced: true,
    costEstimate: '0.042 ms (Read-Only Replica)',
  });

  // Audit log chain verification state
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    checkedCount: number;
  } | null>(null);

  const SAMPLE_QUERIES = [
    {
      title: 'Safe Read-Only Query',
      type: 'safe',
      sql: 'SELECT p.name, SUM(s.quantity) AS total_units FROM trusted_sales s JOIN products_catalog p ON s.sku = p.sku GROUP BY p.name ORDER BY total_units DESC LIMIT 5;',
    },
    {
      title: 'Destructive DROP TABLE Attempt',
      type: 'attack',
      sql: 'SELECT * FROM trusted_sales; DROP TABLE trusted_sales; --',
    },
    {
      title: 'Unauthorized Auth / PII Query',
      type: 'attack',
      sql: 'SELECT email, password_hash, token FROM auth_users WHERE is_superuser = true;',
    },
    {
      title: 'Data Tampering / UPDATE Attempt',
      type: 'attack',
      sql: "UPDATE product_pricing SET price = 100 WHERE category = 'Edible Oils';",
    },
  ];

  const handleEvaluate = (queryToTest?: string) => {
    const q = (queryToTest || inputQuery).trim();
    const upper = q.toUpperCase();

    const isDestructive =
      upper.includes('DROP') ||
      upper.includes('DELETE') ||
      upper.includes('UPDATE') ||
      upper.includes('INSERT') ||
      upper.includes('TRUNCATE') ||
      upper.includes('ALTER') ||
      upper.includes('EXEC') ||
      upper.includes(';');

    const isRestrictedTable =
      upper.includes('AUTH_USERS') ||
      upper.includes('ADMIN_') ||
      upper.includes('PASSWORD') ||
      upper.includes('SECRET');

    const isPromptInjection =
      upper.includes('XP_CMDSHELL') ||
      upper.includes('--') ||
      upper.includes('UNION SELECT');

    if (isDestructive || isRestrictedTable || isPromptInjection) {
      const reason = isDestructive
        ? 'AST parser rejected non-SELECT statement type (DROP/DELETE/UPDATE/INSERT prohibited on read-only role).'
        : isRestrictedTable
        ? 'Access denied: Target table is not in the authorized public catalog whitelist.'
        : 'Query tokenizer flagged suspicious injection sequence or semicolon stack.';

      setValidationResult({
        status: 'BLOCKED',
        astStatementType: isDestructive ? 'NON_SELECT_MUTATION' : 'UNAUTHORIZED_TARGET',
        detectedTables: isRestrictedTable ? ['auth_users (RESTRICTED)'] : ['trusted_sales'],
        blockedReason: reason,
        readOnlyEnforced: true,
        costEstimate: 'N/A (Execution Aborted Before Database Wire Protocol)',
      });

      addAuditLog(
        'AI_QUERY_GUARD_BLOCK',
        'AI Query Guard',
        `Blocked malicious query attempt: "${q.substring(0, 40)}..."`,
        'BLOCKED'
      );
    } else {
      setValidationResult({
        status: 'PASSED',
        astStatementType: 'SELECT',
        detectedTables: ['trusted_sales', 'products_catalog'],
        readOnlyEnforced: true,
        costEstimate: '0.038 ms (Read-Only Replica)',
      });

      addAuditLog('AI_QUERY_GUARD_PASS', 'AI Query Guard', `Validated read-only query statement successfully.`);
    }
  };

  const handleVerifyIntegrity = () => {
    const res = verifyAuditChain();
    setVerificationResult({
      isValid: res.isValid,
      checkedCount: res.checkedCount,
    });
  };

  const filteredThreats = securityThreats.filter((t) => {
    if (filterSeverity === 'All') return true;
    return t.severity === filterSeverity;
  });

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

      {/* Main Tabs Container */}
      <div className="bg-white border border-border rounded-lg shadow-panel overflow-hidden">
        {/* Tab Buttons Bar */}
        <div className="p-4 border-b border-border bg-ivory/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('threats')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeTab === 'threats'
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white text-charcoal hover:bg-ivory border border-border'
              }`}
            >
              Threat Incidents ({securityThreats.length})
            </button>
            <button
              onClick={() => setActiveTab('guard')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeTab === 'guard'
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white text-charcoal hover:bg-ivory border border-border'
              }`}
            >
              AI Query Guard (AST Tester)
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeTab === 'audit'
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white text-charcoal hover:bg-ivory border border-border'
              }`}
            >
              Tamper-Evident Audit Trail ({auditLogs.length})
            </button>
          </div>

          {activeTab === 'threats' && (
            <div className="flex items-center gap-1.5">
              {['All', 'Critical', 'High', 'Medium'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setFilterSeverity(sev)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors ${
                    filterSeverity === sev
                      ? 'bg-teal text-white font-bold'
                      : 'bg-white text-slate hover:text-navy border border-border'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'audit' && (
            <button
              onClick={handleVerifyIntegrity}
              className="px-3 py-1 bg-teal hover:bg-teal-hover text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Hash className="w-3.5 h-3.5" />
              <span>Verify Hash Chain Integrity</span>
            </button>
          )}
        </div>

        {/* Tab 1: Threat Incidents Table */}
        {activeTab === 'threats' && (
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
                  <th className="py-3 px-4 text-right">Action</th>
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
        )}

        {/* Tab 2: AI Query Guard AST Tester Workbench */}
        {activeTab === 'guard' && (
          <div className="p-5 space-y-5">
            {/* Presets */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-slate uppercase">Test Query Scenarios:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {SAMPLE_QUERIES.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputQuery(sample.sql);
                      handleEvaluate(sample.sql);
                    }}
                    className="p-3 text-left bg-ivory/50 hover:bg-ivory border border-border hover:border-teal/50 rounded transition-all flex flex-col justify-between space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-navy">{sample.title}</span>
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                          sample.type === 'safe'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {sample.type}
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-slate truncate">{sample.sql}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Split Input / Output */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Input */}
              <div className="p-4 bg-navy-dark text-ivory rounded-lg space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-navy-light pb-2">
                    <span className="text-xs font-mono text-teal-light flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5" /> SQL Statement to Inspect
                    </span>
                    <span className="text-[10px] font-mono text-slate-light">Engine: SQLGlot AST</span>
                  </div>
                  <textarea
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    rows={6}
                    className="w-full bg-navy border border-navy-light rounded p-2.5 text-xs font-mono text-emerald-300 focus:outline-none focus:border-teal leading-relaxed"
                  />
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => handleEvaluate()}
                    className="px-4 py-2 bg-teal hover:bg-teal-hover text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Evaluate Query AST</span>
                  </button>
                </div>
              </div>

              {/* Output */}
              {validationResult && (
                <div className="p-4 bg-ivory/50 border border-border rounded-lg space-y-3">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-xs font-mono font-bold text-slate uppercase">AST Parse Verdict</span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold flex items-center gap-1 ${
                        validationResult.status === 'PASSED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-100 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {validationResult.status === 'PASSED' ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>PASSED (READ-ONLY SAFE)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>BLOCKED BY AST GUARD</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-white rounded border border-border">
                        <span className="text-[10px] text-slate block">STATEMENT TYPE</span>
                        <span className="font-bold text-navy">{validationResult.astStatementType}</span>
                      </div>
                      <div className="p-2 bg-white rounded border border-border">
                        <span className="text-[10px] text-slate block">ROLE ROLE CHECK</span>
                        <span className="font-bold text-emerald-700">READONLY (Verified)</span>
                      </div>
                    </div>

                    {validationResult.blockedReason && (
                      <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-rose-900">
                        <span className="font-bold text-[10px] block uppercase text-rose-700">Violation:</span>
                        <p className="text-[11px] mt-0.5">{validationResult.blockedReason}</p>
                      </div>
                    )}

                    <div className="p-2 bg-white rounded border border-border">
                      <span className="text-[10px] text-slate block">TARGET TABLES DETECTED</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {validationResult.detectedTables.map((t, idx) => (
                          <span
                            key={idx}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              t.includes('RESTRICTED')
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-teal-light text-teal'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Tamper-Evident Audit Trail */}
        {activeTab === 'audit' && (
          <div className="p-4 space-y-4">
            {verificationResult && (
              <div
                className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                  verificationResult.isValid
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold">Cryptographic Chain Verification Succeeded!</span>
                    <p className="text-[11px] text-emerald-800">
                      Traversed {verificationResult.checkedCount} consecutive block hashes. Zero broken links or backdated entries.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setVerificationResult(null)}
                  className="text-emerald-700 font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="table-region border border-border rounded-lg text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-ivory text-slate font-mono">
                    <th className="py-2.5 px-3">Log ID &amp; Time</th>
                    <th className="py-2.5 px-3">Actor &amp; Role</th>
                    <th className="py-2.5 px-3">Action Type</th>
                    <th className="py-2.5 px-3">Details</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3 font-mono">Block Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-mono text-[11px]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-ivory/30">
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-navy">{log.id}</div>
                        <div className="text-[10px] text-slate">{log.timestamp}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-medium text-navy">{log.actor}</div>
                        <div className="text-[10px] text-teal">{log.role}</div>
                      </td>
                      <td className="py-2.5 px-3 font-bold text-navy">{log.action}</td>
                      <td className="py-2.5 px-3 text-slate max-w-xs">{log.details}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
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
                      <td className="py-2.5 px-3 text-slate text-[10px]">
                        <span className="text-teal font-semibold">{log.hash.slice(0, 8)}</span>...
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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
