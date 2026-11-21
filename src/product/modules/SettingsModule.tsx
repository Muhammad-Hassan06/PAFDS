import React, { useState } from 'react';
import {
  Settings,
  Building2,
  User,
  Globe,
  Bell,
  Lock,
  Save,
  CheckCircle2,
  Shield,
  Layers,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';

export const SettingsModule: React.FC = () => {
  const { role, setRole } = useProduct();
  const [currency, setCurrency] = useState('PKR');
  const [defaultLanguage, setDefaultLanguage] = useState<'English' | 'Roman Urdu'>('Roman Urdu');
  const [autoQuarantineDuplicates, setAutoQuarantineDuplicates] = useState(true);
  const [emailAlertsOnStockout, setEmailAlertsOnStockout] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Toast */}
      {savedToast && (
        <div className="p-3 bg-teal text-white text-xs font-semibold rounded-lg shadow-editorial flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Workspace preferences saved successfully.</span>
          </div>
          <button onClick={() => setSavedToast(false)} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Settings Grid */}
      <div className="space-y-6">
        {/* Workspace Card */}
        <div className="p-5 bg-white border border-border rounded-lg shadow-panel space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Building2 className="w-4 h-4 text-teal" />
            <h3 className="text-sm font-bold text-navy">Wholesale Workspace Profile</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate font-medium mb-1">Company / Organization Name</label>
              <input
                type="text"
                defaultValue="DistributionIQ Pilot Hub (Consolidated Depots)"
                className="w-full p-2 border border-border rounded bg-ivory text-navy font-semibold focus:outline-none focus:border-teal"
              />
            </div>
            <div>
              <label className="block text-slate font-medium mb-1">Operating Jurisdiction &amp; Base Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-2 border border-border rounded bg-white text-navy font-semibold focus:outline-none focus:border-teal"
              >
                <option value="PKR">PKR (Pakistani Rupee - Rs.)</option>
                <option value="USD">USD ($)</option>
                <option value="AED">AED (Dirhams)</option>
              </select>
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="p-5 bg-white border border-border rounded-lg shadow-panel space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <User className="w-4 h-4 text-teal" />
            <h3 className="text-sm font-bold text-navy">User Identity &amp; Demo Credentials</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate font-medium mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="Muhammad Hassan"
                className="w-full p-2 border border-border rounded bg-ivory text-navy font-semibold"
                readOnly
              />
            </div>
            <div>
              <label className="block text-slate font-medium mb-1">Email Address</label>
              <input
                type="email"
                defaultValue="hassan@distrisight.pk"
                className="w-full p-2 border border-border rounded bg-ivory text-navy font-semibold"
                readOnly
              />
            </div>
            <div>
              <label className="block text-slate font-medium mb-1">Assigned Demo Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full p-2 border border-border rounded bg-white text-navy font-semibold focus:outline-none focus:border-teal"
              >
                <option value="Owner">Owner (Full Privileges)</option>
                <option value="Branch Manager">Branch Manager (Depot Scope)</option>
                <option value="Analyst">Analyst (Query &amp; ML)</option>
                <option value="Auditor">Auditor (Read-Only Logs)</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI & Localization Card */}
        <div className="p-5 bg-white border border-border rounded-lg shadow-panel space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Globe className="w-4 h-4 text-teal" />
            <h3 className="text-sm font-bold text-navy">AI Assistant Localization &amp; Guardrails</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate font-medium mb-1">Primary Assistant Mode</label>
              <select
                value={defaultLanguage}
                onChange={(e) => setDefaultLanguage(e.target.value as any)}
                className="w-full p-2 border border-border rounded bg-white text-navy font-semibold focus:outline-none focus:border-teal"
              >
                <option value="Roman Urdu">Roman Urdu (Urdu in Latin Alphabet) &amp; English</option>
                <option value="English">English Strict Mode</option>
              </select>
              <span className="text-[10px] text-slate mt-1 block">
                Permits distributor managers to ask "Pichlay 30 din ki sales dikhao".
              </span>
            </div>

            <div className="space-y-3 pt-1">
              <label className="flex items-center gap-2 text-navy cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoQuarantineDuplicates}
                  onChange={(e) => setAutoQuarantineDuplicates(e.target.checked)}
                  className="accent-teal rounded"
                />
                <span className="font-medium">Auto-quarantine suspected duplicate invoice lines</span>
              </label>

              <label className="flex items-center gap-2 text-navy cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailAlertsOnStockout}
                  onChange={(e) => setEmailAlertsOnStockout(e.target.checked)}
                  className="accent-teal rounded"
                />
                <span className="font-medium">Trigger notification when stock reaches &lt; 5 days runway</span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-teal hover:bg-teal-hover text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};

