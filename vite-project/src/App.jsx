import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import CustomReports from './components/CustomReports';
import Settings from './components/Settings';
import { LayoutDashboard, BarChart3, FilePieChart, Settings as SettingsIcon, ShieldAlert, Layers } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { currentUser, switchUser } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Real-Time Streams', icon: BarChart3 },
    { id: 'reports', label: 'Custom Reports', icon: FilePieChart },
    { id: 'settings', label: 'System Settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between">
        <div>
          <div className="p-6 flex items-center gap-3 border-b border-slate-800">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Layers size={20} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              NexusFlow
            </span>
          </div>
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer & RBAC Switcher */}
        <div className="p-4 border-t border-slate-800 space-y-4">
          <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Test RBAC Role:</label>
            <select 
              onChange={(e) => switchUser(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="admin">Admin (Full Access)</option>
              <option value="editor">Editor (No Settings)</option>
              <option value="viewer">Viewer (Read-Only)</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-sm text-white">
              {currentUser.avatar}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold truncate text-slate-200">{currentUser.name}</h4>
              <span className="inline-block px-2 py-0.5 mt-0.5 text-[10px] font-bold uppercase rounded bg-slate-800 text-indigo-400 border border-indigo-900">
                {currentUser.role}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Window */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-slate-950">
        <header className="h-16 border-b border-slate-800 px-8 flex items-center justify-between bg-slate-900/50 backdrop-blur">
          <h2 className="text-lg font-semibold capitalize text-slate-200">{activeTab.replace('-', ' ')} Window</h2>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Pipeline Connected
            </span>
          </div>
        </header>

        <div className="p-8 flex-1">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'reports' && <CustomReports />}
          {activeTab === 'settings' && <Settings />}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}