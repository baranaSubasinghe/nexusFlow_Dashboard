import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FileDown, Plus, Lock, CheckCircle } from 'lucide-react';

export default function CustomReports() {
  const { hasPermission } = useAuth();
  const [reports, setReports] = useState([
    { id: 'R-091', title: 'Q2 Performance Matrix', metrics: 'Latency, Cost', scope: 'Production Cluster' },
    { id: 'R-092', title: 'Security Auditing Logs', metrics: 'Auth, Firewalls', scope: 'Global Network' },
  ]);

  const [form, setForm] = useState({ title: '', metrics: '', scope: 'Production Cluster' });
  const [successMsg, setSuccessMsg] = useState('');

  const handleCreateReport = (e) => {
    e.preventDefault();
    if (!hasPermission('Editor')) return; // Redundant enforcement guard

    const newReport = {
      id: `R-0${Math.floor(100 + Math.random() * 900)}`,
      ...form
    };

    setReports([newReport, ...reports]);
    setForm({ title: '', metrics: '', scope: 'Production Cluster' });
    setSuccessMsg('Custom report schema generated successfully.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Report Form Builder Panel */}
      <div className="xl:col-span-1 bg-slate-900 border border-slate-800 p-6 rounded-xl h-fit">
        <h3 className="text-base font-semibold text-slate-200 mb-4">Report Design Studio</h3>
        
        {!hasPermission('Editor') ? (
          <div className="bg-slate-950/60 border border-dashed border-slate-800 p-6 rounded-lg text-center space-y-3">
            <Lock className="mx-auto text-slate-600" size={32} />
            <p className="text-xs text-slate-400">Your profile's permissions are limited to read-only views. Creation access is denied.</p>
          </div>
        ) : (
          <form onSubmit={handleCreateReport} className="space-y-4">
            {successMsg && (
              <div className="bg-emerald-950/40 text-emerald-400 text-xs p-3 rounded-lg flex items-center gap-2 border border-emerald-900">
                <CheckCircle size={14} /> {successMsg}
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Report Meta Title</label>
              <input 
                type="text" required value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
                placeholder="e.g., Regional Core Drops"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Target Metrics (Comma separated)</label>
              <input 
                type="text" required value={form.metrics}
                onChange={(e) => setForm({...form, metrics: e.target.value})}
                placeholder="e.g., drops, failures, latency"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Infrastructure Segment Scope</label>
              <select 
                value={form.scope}
                onChange={(e) => setForm({...form, scope: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="Production Cluster">Production Cluster</option>
                <option value="Global Network">Global Network</option>
                <option value="Staging Environment">Staging Environment</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Plus size={16} /> Compile Report
            </button>
          </form>
        )}
      </div>

      {/* Generated Report Repositories table */}
      <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-base font-semibold text-slate-200">Active Architecture Reports</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">ID Reference</th>
                <th className="px-6 py-3">Report Details</th>
                <th className="px-6 py-3">Tracked Items</th>
                <th className="px-6 py-3">Infrastructure Focus</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-indigo-400">{report.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-200">{report.title}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">{report.metrics}</td>
                  <td className="px-6 py-4"><span className="bg-slate-950 px-2.5 py-1 rounded-full text-xs text-slate-400 border border-slate-800">{report.scope}</span></td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-indigo-400 transition-colors p-1" title="Download Schema JSON">
                      <FileDown size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}