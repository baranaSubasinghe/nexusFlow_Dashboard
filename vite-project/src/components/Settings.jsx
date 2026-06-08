import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Save, Server, Radio, Database } from 'lucide-react';

export default function Settings() {
  const { hasPermission } = useAuth();

  if (!hasPermission('Admin')) {
    return (
      <div className="max-w-md mx-auto text-center mt-12 p-8 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center">
          <ShieldAlert size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-200">Access Privileges Revoked</h3>
        <p className="text-sm text-slate-400">
          The System Settings zone requires strict administrative rights. Your assigned enterprise scope does not grant entry here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-200 mb-1">Platform Administrative Override</h3>
        <p className="text-xs text-slate-400">Manage low-level Kafka connection pools and encryption key rotation cycles.</p>
      </div>
      
      <div className="space-y-4 divide-y divide-slate-800">
        <div className="pt-4 flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <Server className="text-slate-400" size={20} />
            <div>
              <h4 className="text-sm font-semibold text-slate-300">Data Sampling Rates</h4>
              <p className="text-xs text-slate-500">Throttles streaming fidelity to save warehouse processing load</p>
            </div>
          </div>
          <select className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 text-sm text-slate-300">
            <option>100% (Raw Telemetry)</option>
            <option>50% (Balanced Sampling)</option>
            <option>10% (Minimal Compute)</option>
          </select>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <Radio className="text-slate-400" size={20} />
            <div>
              <h4 className="text-sm font-semibold text-slate-300">Kafka Buffer Threshold</h4>
              <p className="text-xs text-slate-500">Maximum queue depth capacity allocation limits</p>
            </div>
          </div>
          <input type="text" defaultValue="2048 MB" className="w-32 bg-slate-950 border border-slate-800 text-right rounded-lg px-3 py-1 text-sm text-slate-300 focus:outline-none focus:border-indigo-500"/>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <Database className="text-slate-400" size={20} />
            <div>
              <h4 className="text-sm font-semibold text-slate-300">Automated Hot Storage Purge</h4>
              <p className="text-xs text-slate-500">How long data stays in real-time caches before cold storage migration</p>
            </div>
          </div>
          <select className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 text-sm text-slate-300">
            <option>After 7 Days</option>
            <option>After 30 Days</option>
            <option>After 90 Days</option>
          </select>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-2 px-5 rounded-lg flex items-center gap-2 transition-colors">
          <Save size={16} /> Save Active Architecture Configurations
        </button>
      </div>
    </div>
  );
}