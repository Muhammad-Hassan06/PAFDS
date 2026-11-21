import React from 'react';
import {
  LayoutDashboard,
  Database,
  CheckCircle2,
  Wrench,
  GitFork,
  BarChart3,
  Boxes,
  TrendingUp,
  LineChart,
  Sparkles,
  MessageSquareText,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCheck,
  Users,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import { ProductModuleId, UserRole, TEAM_MEMBERS, TeamMember } from '../types';

interface ProductSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onExitToWebsite: () => void;
}

export const ProductSidebar: React.FC<ProductSidebarProps> = ({
  collapsed,
  onToggleCollapse,
  onExitToWebsite,
}) => {
  const {
    activeModule,
    setActiveModule,
    role,
    setRole,
    currentMember,
    setCurrentMember,
    repairs,
    products,
    securityThreats,
    recommendations,
  } = useProduct();

  // Counts for sidebar badges
  const pendingRepairs = repairs.filter((r) => r.status === 'Pending Approval').length;
  const stockoutRisks = products.filter((p) => p.status === 'Stockout Risk').length;
  const activeThreats = securityThreats.filter((t) => t.status === 'Investigating' || t.status === 'Blocked').length;
  const activeRecs = recommendations.filter((r) => r.status === 'Active').length;

  // The 12 Most Important Core Platform Modules
  const NAV_SECTIONS: Array<{
    title: string;
    items: Array<{
      id: ProductModuleId;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      badge?: number;
      badgeColor?: string;
    }>;
  }> = [
    {
      title: 'DATA & QUALITY INTELLIGENCE',
      items: [
        { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
        { id: 'sources', label: 'Data Sources & Ingestion', icon: Database },
        { id: 'quality', label: 'Data Quality Center', icon: CheckCircle2 },
        {
          id: 'repair',
          label: 'Data Repair & Approval',
          icon: Wrench,
          badge: pendingRepairs,
          badgeColor: 'bg-amber text-navy',
        },
        { id: 'impact', label: 'Quality Impact Analysis', icon: GitFork },
      ],
    },
    {
      title: 'COMMERCIAL & PREDICTIVE',
      items: [
        { id: 'sales', label: 'Commercial Sales Analytics', icon: BarChart3 },
        { id: 'inventory', label: 'Inventory Intelligence', icon: Boxes },
        { id: 'forecast', label: 'Demand Forecasting Engine', icon: TrendingUp },
        {
          id: 'graph-studio',
          label: 'AI Graph & Trend Studio',
          icon: LineChart,
        },
      ],
    },
    {
      title: 'DECISION & SECURITY',
      items: [
        {
          id: 'recommendations',
          label: 'Recommendations Center',
          icon: Sparkles,
          badge: activeRecs,
          badgeColor: 'bg-teal text-white',
        },
        { id: 'assistant', label: 'AI Assistant (Urdu/Eng)', icon: MessageSquareText },
        {
          id: 'security',
          label: 'Security Center & Guard',
          icon: ShieldAlert,
          badge: activeThreats,
          badgeColor: 'bg-rose-600 text-white',
        },
      ],
    },
  ];

  const handleMemberChange = (memberId: string) => {
    const selected = TEAM_MEMBERS.find((m) => m.id === memberId);
    if (selected) {
      setCurrentMember(selected);
    }
  };

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 bg-navy text-ivory flex flex-col border-r border-navy-light transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-3.5 border-b border-navy-light shrink-0">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center shrink-0 shadow-sm">
            <span className="font-display font-bold text-white text-base">D</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight truncate">
              <span className="font-display font-bold text-white text-base tracking-tight">
                Distribution<span className="text-teal-muted">IQ</span>
              </span>
              <span className="text-[10px] font-mono text-slate-light uppercase tracking-wider">
                Product MVP &middot; 12 Core Modules
              </span>
            </div>
          )}
        </div>
        <button
          onClick={onToggleCollapse}
          className="p-1 rounded text-slate-light hover:text-white hover:bg-navy-light transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List: Exactly 12 Core Modules */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 scrollbar-thin">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <div className="px-2 mb-1.5 text-[10px] font-mono font-semibold tracking-wider text-slate uppercase">
                {section.title}
              </div>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveModule(item.id)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-teal text-white shadow-sm font-semibold'
                          : 'text-slate-light hover:text-white hover:bg-navy-light'
                      } ${collapsed ? 'justify-center px-0' : ''}`}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {!collapsed && (
                        <span className="truncate flex-1 text-left">{item.label}</span>
                      )}
                      {!collapsed && item.badge !== undefined && item.badge > 0 && (
                        <span
                          className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full leading-none shrink-0 ${
                            item.badgeColor || 'bg-teal text-white'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Card: 4-Member Team Selector & Role Switcher */}
      <div className="p-2 border-t border-navy-light bg-navy-dark shrink-0 space-y-2">
        {!collapsed && (
          <div className="px-1 py-1 space-y-2">
            {/* Team Member Switcher */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-light mb-1">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-teal" /> Active Member
                </span>
                <span className="text-[10px] text-teal-light font-bold">Team Profile</span>
              </div>
              <select
                value={currentMember.id}
                onChange={(e) => handleMemberChange(e.target.value)}
                className="w-full bg-navy border border-navy-light text-white text-xs rounded px-2 py-1.5 focus:outline-none focus:border-teal font-medium"
              >
                {TEAM_MEMBERS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.title})
                  </option>
                ))}
              </select>
            </div>

            {/* Role / RBAC selector */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-light mb-1">
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-teal" /> RBAC Permission
                </span>
                <span className="text-[10px] text-teal">Enforced</span>
              </div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full bg-navy border border-navy-light text-white text-xs rounded px-2 py-1 focus:outline-none focus:border-teal"
              >
                <option value="Owner">Owner (Full Privileges)</option>
                <option value="Branch Manager">Branch Manager (Depot Scope)</option>
                <option value="Analyst">Analyst (Query &amp; ML)</option>
                <option value="Auditor">Auditor (Read-Only Logs)</option>
              </select>
            </div>
          </div>
        )}

        {/* Selected Member Profile Card */}
        <div className="flex items-center justify-between p-1 bg-navy/60 rounded border border-navy-light">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-teal flex items-center justify-center text-xs font-bold text-white shrink-0">
              {currentMember.initials}
            </div>
            {!collapsed && (
              <div className="truncate">
                <div className="text-xs font-semibold text-white truncate">{currentMember.name}</div>
                <div className="text-[10px] text-slate-light font-mono truncate">
                  {currentMember.title} &middot; {role}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={onExitToWebsite}
            className="p-1.5 text-slate-light hover:text-rose-400 hover:bg-navy rounded transition-colors"
            title="Exit to Marketing Website"
            aria-label="Exit to Marketing Website"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
