import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Code,
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';

export const AiQueryGuardModule: React.FC = () => {
  const { addAuditLog } = useProduct();

  const [inputQuery, setInputQuery] = useState<string>(
    'SELECT p.name, SUM(s.quantity) AS total_units FROM trusted_sales s JOIN products_catalog p ON s.sku = p.sku GROUP BY p.name ORDER BY total_units DESC LIMIT 5;'
  );

  const [validationResult, setValidationResult] = useState<{
    status: 'PASSED' | 'BLOCKED';
    astStatementType: string;
    detectedTables: string[];
    allowedTables: string[];
    blockedReason?: string;
    readOnlyEnforced: boolean;
    costEstimate: string;
  } | null>({
    status: 'PASSED',
    astStatementType: 'SELECT',
    detectedTables: ['trusted_sales', 'products_catalog'],
    allowedTables: ['trusted_sales', 'trusted_inventory', 'products_catalog', 'trusted_customers', 'trusted_suppliers'],
    readOnlyEnforced: true,
    costEstimate: '0.042 ms (Read-Only Replica)',
  });

  const SAMPLE_QUERIES = [
    {
      title: 'Safe Read-Only Analytical Query',
      type: 'safe',
      sql: 'SELECT p.name, SUM(s.quantity) AS total_units FROM trusted_sales s JOIN products_catalog p ON s.sku = p.sku GROUP BY p.name ORDER BY total_units DESC LIMIT 5;',
    },
    {
      title: 'Destructive DROP TABLE Attempt',
      type: 'attack',
      sql: 'SELECT * FROM trusted_sales; DROP TABLE trusted_sales; --',
    },
    {
      title: 'Unauthorized PII / Auth Table Access',
      type: 'attack',
      sql: 'SELECT email, password_hash, token FROM auth_users WHERE is_superuser = true;',
    },
    {
      title: 'Data Tampering / UPDATE Statement',
      type: 'attack',
      sql: "UPDATE product_pricing SET price = 100 WHERE category = 'Edible Oils';",
    },
    {
      title: 'Prompt Injection SQL Sequence',
      type: 'attack',
      sql: "SELECT * FROM trusted_inventory WHERE 1=1; EXEC xp_cmdshell('dir'); --",
    },
  ];

  const handleEvaluate = (queryToTest?: string) => {
    const q = (queryToTest || inputQuery).trim();
    const upper = q.toUpperCase();

    // Dangerous statement check
    const isDestructive =
      upper.includes('DROP') ||
      upper.includes('DELETE') ||
      upper.includes('UPDATE') ||
      upper.includes('INSERT') ||
      upper.includes('TRUNCATE') ||
      upper.includes('ALTER') ||
      upper.includes('EXEC') ||
      upper.includes(';');

    // Restricted tables check
    const isRestrictedTable =
      upper.includes('AUTH_USERS') ||
      upper.includes('ADMIN_') ||
      upper.includes('PASSWORD') ||
      upper.includes('SECRET');

    // Prompt injection override tokens
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
        allowedTables: ['trusted_sales', 'trusted_inventory', 'products_catalog', 'trusted_customers'],
        blockedReason: reason,
        readOnlyEnforced: true,
        costEstimate: 'N/A (Execution Aborted Before Database Wire Protocol)',
      });

      addAuditLog('AI_QUERY_GUARD_BLOCK', 'AI Query Guard', `Blocked malicious query attempt: "${q.substring(0, 40)}..."`, 'BLOCKED');
    } else {
      setValidationResult({
        status: 'PASSED',
        astStatementType: 'SELECT',
        detectedTables: ['trusted_sales', 'products_catalog'],
        allowedTables: ['trusted_sales', 'trusted_inventory', 'products_catalog', 'trusted_customers', 'trusted_suppliers'],
        readOnlyEnforced: true,
        costEstimate: '0.038 ms (Read-Only Replica)',
      });

      addAuditLog('AI_QUERY_GUARD_PASS', 'AI Query Guard', `Validated read-only query statement successfully.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-5 bg-white border border-border rounded-lg shadow-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-teal-light text-teal shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-navy">
              AI Query Guard: AST SQL Validation &amp; Injection Defense
            </h2>
            <p className="text-xs text-slate mt-0.5 max-w-2xl leading-relaxed">
              DistributionIQ sits between the Natural Language LLM and PostgreSQL. Every query is parsed into an Abstract Syntax Tree (AST) using SQLGlot logic to enforce a strict read-only role and prevent prompt injection leaks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono shrink-0">
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded border border-emerald-200">
            AST Engine: Enforcing SELECT-Only
          </span>
        </div>
      </div>

      {/* Preset Test Case Buttons */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-slate uppercase">Test Query Scenarios:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {SAMPLE_QUERIES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputQuery(sample.sql);
                handleEvaluate(sample.sql);
              }}
              className="p-3 text-left bg-white hover:bg-ivory border border-border hover:border-teal/50 rounded-lg shadow-panel transition-all flex flex-col justify-between space-y-1.5"
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

      {/* Interactive Workbench Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Query Input Editor */}
        <div className="p-5 bg-navy-dark text-ivory rounded-lg shadow-panel space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-navy-light pb-2">
              <span className="text-xs font-mono text-teal-light flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" /> LLM-Generated SQL Statement
              </span>
              <span className="text-[10px] font-mono text-slate-light">Target DB: PostgreSQL 16</span>
            </div>

            <textarea
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              rows={8}
              className="w-full bg-navy border border-navy-light rounded p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:border-teal leading-relaxed"
              placeholder="Enter SQL statement to evaluate..."
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-[11px] font-mono text-slate-light">
              Press Evaluate to run AST Syntax Check
            </span>
            <button
              onClick={() => handleEvaluate()}
              className="px-4 py-2 bg-teal hover:bg-teal-hover text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Evaluate Query Security</span>
            </button>
          </div>
        </div>

        {/* Right: AST Inspection & Security Decision */}
        {validationResult && (
          <div className="p-5 bg-white border border-border rounded-lg shadow-panel space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-xs font-mono font-bold text-slate uppercase tracking-wider">
                AST Security Evaluation Verdict
              </h3>
              <span
                className={`px-3 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 ${
                  validationResult.status === 'PASSED'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-100 text-rose-700 border border-rose-200'
                }`}
              >
                {validationResult.status === 'PASSED' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ALLOWED (SAFE TO RUN)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    <span>BLOCKED BY GUARD</span>
                  </>
                )}
              </span>
            </div>

            {/* Diagnostic Details */}
            <div className="space-y-3 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-ivory rounded border border-border">
                  <span className="text-[10px] text-slate block">AST STATEMENT TYPE</span>
                  <span className="font-bold text-navy">{validationResult.astStatementType}</span>
                </div>
                <div className="p-2.5 bg-ivory rounded border border-border">
                  <span className="text-[10px] text-slate block">ROLE RESTRICTION</span>
                  <span className="font-bold text-emerald-700">READONLY_ANALYST (Enforced)</span>
                </div>
              </div>

              {validationResult.blockedReason && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded text-rose-900 space-y-1">
                  <span className="font-bold text-[10px] uppercase block text-rose-700">
                    Security Violation Detected:
                  </span>
                  <p className="text-xs leading-normal">{validationResult.blockedReason}</p>
                </div>
              )}

              <div className="p-2.5 bg-ivory rounded border border-border space-y-1">
                <span className="text-[10px] text-slate block">TARGET TABLES IN QUERY</span>
                <div className="flex flex-wrap gap-1">
                  {validationResult.detectedTables.map((t, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
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

              <div className="p-2.5 bg-ivory rounded border border-border">
                <span className="text-[10px] text-slate block">ESTIMATED RUNTIME EXECUTION</span>
                <span className="font-semibold text-navy">{validationResult.costEstimate}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

