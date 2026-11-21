import React, { useState } from 'react';
import {
  Activity,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Terminal,
  FileCode,
  Layers,
  Sparkles,
  ArrowRight,
  X,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import { PipelineItem } from '../types';

export const PipelineMonitoringModule: React.FC = () => {
  const { pipelines, runPipeline, role } = useProduct();
  const [runningPipelineId, setRunningPipelineId] = useState<string | null>(null);
  const [selectedPipelineForLogs, setSelectedPipelineForLogs] = useState<PipelineItem | null>(null);

  const handleTriggerRun = async (pipeline: PipelineItem) => {
    setRunningPipelineId(pipeline.id);
    await runPipeline(pipeline.id);
    setRunningPipelineId(null);
  };

  const healthyCount = pipelines.filter((p) => p.status === 'Healthy').length;
  const warningCount = pipelines.filter((p) => p.status === 'Warning' || p.status === 'Delayed').length;

  return (
    <div className="space-y-6">
      {/* Top Health Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-1">
          <span className="text-xs text-slate font-medium">Orchestrated Pipelines</span>
          <div className="text-2xl font-display font-bold text-navy">
            {pipelines.length} Active Feeds
          </div>
          <div className="text-[11px] text-slate">
            Managed via Prefect / Airflow compatible schedules
          </div>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-1">
          <span className="text-xs text-slate font-medium">Healthy Feeds</span>
          <div className="text-2xl font-display font-bold text-emerald-700">
            {healthyCount} Operational
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">
            Zero schema drift detected on primary syncs
          </div>
        </div>

        <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-1">
          <span className="text-xs text-slate font-medium">Attention Required</span>
          <div className="text-2xl font-display font-bold text-amber-600">
            {warningCount} Warnings
          </div>
          <div className="text-[11px] text-amber-800">
            Duplicate quarantine &amp; SFTP connection timeout
          </div>
        </div>
      </div>

      {/* Main Pipelines Table */}
      <div className="bg-white border border-border rounded-lg shadow-panel overflow-hidden">
        <div className="p-4 border-b border-border bg-ivory/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal" />
            <h3 className="text-xs font-mono font-bold text-slate uppercase tracking-wider">
              Ingestion & Sync Pipeline Registry
            </h3>
          </div>
          <span className="text-xs font-mono text-slate">Cron Scheduler: Active</span>
        </div>

        <div className="table-region">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-ivory/60 text-slate font-mono">
                <th className="py-3 px-4">Pipeline Name</th>
                <th className="py-3 px-4">Pattern Type</th>
                <th className="py-3 px-4">Data Source &rarr; Target</th>
                <th className="py-3 px-4">Last Ingestion</th>
                <th className="py-3 px-4 text-right">Processed Records</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Trigger Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pipelines.map((pipe) => {
                const isRunning = runningPipelineId === pipe.id;
                return (
                  <tr key={pipe.id} className="hover:bg-ivory/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-navy">{pipe.name}</div>
                      <div className="text-[10px] text-slate font-mono">{pipe.id}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-[10px] bg-ivory px-2 py-0.5 rounded border border-border">
                        {pipe.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate text-[11px]">
                      <div>{pipe.source}</div>
                      <div className="text-teal font-semibold">&rarr; {pipe.target}</div>
                    </td>
                    <td className="py-3 px-4 text-slate">
                      <div>{pipe.lastRun}</div>
                      <div className="text-[10px] font-mono text-slate/70">Next: {pipe.nextScheduled}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-navy">
                      {pipe.recordsProcessed.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded font-mono font-bold text-[10px] ${
                          pipe.status === 'Healthy'
                            ? 'bg-emerald-50 text-emerald-700'
                            : pipe.status === 'Delayed'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {pipe.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedPipelineForLogs(pipe)}
                          className="px-2.5 py-1 text-[11px] text-slate hover:text-navy hover:bg-ivory rounded border border-border transition-colors font-mono"
                          title="View Execution Logs"
                        >
                          Logs
                        </button>
                        <button
                          onClick={() => handleTriggerRun(pipe)}
                          disabled={isRunning}
                          className="px-3 py-1 text-[11px] font-semibold bg-teal hover:bg-teal-hover text-white rounded transition-colors flex items-center gap-1 shadow-sm disabled:opacity-50"
                        >
                          {isRunning ? (
                            <RotateCcw className="w-3 h-3 animate-spin" />
                          ) : (
                            <Play className="w-3 h-3 fill-current" />
                          )}
                          <span>{isRunning ? 'Running' : 'Run Now'}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Execution Logs Drawer Modal */}
      {selectedPipelineForLogs && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-dark text-ivory rounded-lg shadow-editorial-lg border border-navy-light max-w-2xl w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-navy-light pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-teal" />
                <h4 className="text-sm font-bold text-white">
                  Execution Trace: {selectedPipelineForLogs.name}
                </h4>
              </div>
              <button
                onClick={() => setSelectedPipelineForLogs(null)}
                className="text-slate-light hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-navy rounded border border-navy-light max-h-72 overflow-y-auto space-y-1.5 font-mono text-[11px]">
              {selectedPipelineForLogs.logs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-slate shrink-0">[{log.timestamp}]</span>
                  <span
                    className={`font-bold shrink-0 ${
                      log.level === 'INFO'
                        ? 'text-teal'
                        : log.level === 'WARN'
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {log.level}:
                  </span>
                  <span className="text-slate-light">{log.message}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-navy-light text-xs font-mono text-slate-light">
              <span>Status: <strong className="text-emerald-400">Ready</strong></span>
              <button
                onClick={() => setSelectedPipelineForLogs(null)}
                className="px-4 py-1.5 bg-navy border border-navy-light hover:bg-navy-light text-white text-xs font-semibold rounded"
              >
                Close Logs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
