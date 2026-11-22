import React, { useState } from 'react';
import {
  Bell,
  Search,
  Building2,
  Calendar,
  ExternalLink,
  Shield,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  X,
  User,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import { BranchId, DateRange, ProductModuleId } from '../types';

interface ProductHeaderProps {
  sidebarCollapsed: boolean;
  onExitToWebsite: () => void;
}

const MODULE_TITLES: Record<ProductModuleId, { title: string; subtitle: string }> = {
  overview: {
    title: 'Executive Overview',
    subtitle: 'Consolidated commercial performance, data health alerts, and active stockout risks',
  },
  sources: {
    title: 'Data Ingestion & Schema Mapping',
    subtitle: 'Ingest Excel, CSV and PostgreSQL feeds into normalized wholesale distribution models',
  },
  quality: {
    title: 'Data Quality & Governance Center',
    subtitle: 'Continuous profiling: completeness, uniqueness, validity, and consistency scores',
  },
  repair: {
    title: 'Data Repair & Approval Workflow',
    subtitle: 'Inspect proposed fixes, preview before/after deltas, and approve corrections with audit rollback',
  },
  'schema-mapping': {
    title: 'Smart Schema Mapping & Normalization',
    subtitle: 'Resolve disparate headers across spreadsheets with LLM semantic and fuzzy matching, and standardize dates & units',
  },
  sales: {
    title: 'Commercial Sales Analytics',
    subtitle: 'Depot sales breakdown, product velocity, category revenue, and declining customer accounts',
  },
  inventory: {
    title: 'Inventory Intelligence & Stock',
    subtitle: 'Active SKU ledger, warehouse stock balances, reorder thresholds, and depot turnover',
  },
  forecast: {
    title: 'Demand Forecasting Engine',
    subtitle: 'Transparent moving-average & seasonal trend baseline with confidence interval bands',
  },
  'graph-studio': {
    title: 'AI Visual Trend & Graph Studio',
    subtitle: 'Conversational data visualization engine with intelligent graph type selection and statistical analysis',
  },
  recommendations: {
    title: 'Decision Intelligence & Recommendations',
    subtitle: 'Actionable suggestions with human approval loop, impact estimates, and audit trail',
  },
  assistant: {
    title: 'AI Analytics Assistant (English + Roman Urdu)',
    subtitle: 'Ask commercial questions in English or Roman Urdu; inspect grounded SQL queries and lineage',
  },
  security: {
    title: 'Enterprise Security Center & AI Query Guard',
    subtitle: 'Threat monitoring, interactive SQLGlot AST query guard workbench, and SHA-256 audit logs',
  },
};

export const ProductHeader: React.FC<ProductHeaderProps> = ({
  sidebarCollapsed,
  onExitToWebsite,
}) => {
  const {
    activeModule,
    setActiveModule,
    role,
    currentMember,
    branch,
    setBranch,
    dateRange,
    setDateRange,
    searchQuery,
    setSearchQuery,
    qualityScore,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
  } = useProduct();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const currentMeta = MODULE_TITLES[activeModule] || {
    title: 'DistributionIQ Dashboard',
    subtitle: 'Wholesale Distribution Intelligence Platform',
  };

  return (
    <header
      className={`sticky top-0 z-30 bg-white border-b border-border transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}
    >
      {/* Top Utility Bar */}
      <div className="h-14 px-4 sm:px-6 flex items-center justify-between border-b border-border/70">
        {/* Left: Breadcrumbs & Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate">
            <span className="font-semibold text-navy">DistributionIQ</span>
            <span>/</span>
            <span className="text-teal capitalize font-medium">{activeModule.replace('-', ' ')}</span>
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate" />
            <input
              type="text"
              placeholder="Search SKUs, customers, invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-ivory rounded border border-border focus:outline-none focus:border-teal text-charcoal placeholder:text-slate"
            />
          </div>
        </div>

        {/* Right: Filters & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quality Pill */}
          <button
            onClick={() => setActiveModule('quality')}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-teal-light border border-teal/20 text-xs text-teal font-medium hover:bg-teal/10 transition-colors"
            title="Click to inspect Data Quality Center"
          >
            <CheckCircle className="w-3.5 h-3.5 text-teal" />
            <span>DQ Score: <strong>{qualityScore.overall}%</strong></span>
          </button>

          {/* Branch Selector */}
          <div className="flex items-center gap-1 text-xs bg-ivory border border-border rounded px-2 py-1">
            <Building2 className="w-3.5 h-3.5 text-slate shrink-0" />
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value as BranchId)}
              className="bg-transparent text-charcoal font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value="all">All Depots (Consolidated)</option>
              <option value="karachi">Karachi Central Hub</option>
              <option value="lahore">Lahore South Depot</option>
              <option value="islamabad">Islamabad Federal</option>
              <option value="faisalabad">Faisalabad Industrial</option>
            </select>
          </div>

          {/* Date Range Selector */}
          <div className="hidden lg:flex items-center gap-1 text-xs bg-ivory border border-border rounded px-2 py-1">
            <Calendar className="w-3.5 h-3.5 text-slate shrink-0" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRange)}
              className="bg-transparent text-charcoal font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-1.5 rounded text-charcoal hover:bg-ivory border border-border transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-border shadow-editorial-lg rounded-lg z-50 overflow-hidden">
                <div className="p-3 border-b border-border flex items-center justify-between bg-ivory/50">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-navy">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded font-mono font-bold">
                        {unreadCount} New
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-teal hover:underline font-medium"
                    >
                      Mark all read
                    </button>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-slate hover:text-navy p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-border">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        markNotificationRead(item.id);
                        setActiveModule(item.targetModule);
                        setNotificationsOpen(false);
                      }}
                      className={`p-3 text-xs hover:bg-ivory cursor-pointer transition-colors ${
                        !item.read ? 'bg-teal-light/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-navy leading-tight">{item.title}</span>
                        <span className="text-[10px] text-slate font-mono shrink-0">{item.time}</span>
                      </div>
                      <p className="text-slate text-[11px] mt-1 leading-snug">{item.description}</p>
                    </div>
                  ))}
                </div>

                <div className="p-2 border-t border-border bg-ivory text-center">
                  <button
                    onClick={() => {
                      setActiveModule('security');
                      setNotificationsOpen(false);
                    }}
                    className="text-xs text-teal font-medium hover:underline inline-flex items-center gap-1"
                  >
                    View Security &amp; Audit Logs <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Exit to Website Link */}
          <button
            onClick={onExitToWebsite}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-navy bg-ivory hover:bg-ivory-dark/60 border border-border-strong rounded transition-colors"
          >
            <span>Exit to Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Module Title Bar */}
      <div className="px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div>
          <h1 className="text-lg sm:text-xl font-display font-bold text-navy leading-tight">
            {currentMeta.title}
          </h1>
          <p className="text-xs text-slate mt-0.5">{currentMeta.subtitle}</p>
        </div>

        {/* Active Member & Demo Mode Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 mt-1 sm:mt-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-ivory border border-border text-[11px] font-mono text-slate">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span>Active Member: <strong className="text-navy">{currentMember.name}</strong></span>
            <span className="text-slate/60">|</span>
            <span className="text-teal font-semibold">{currentMember.title}</span>
            <span className="text-slate/60">|</span>
            <span className="text-navy font-semibold">{role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
