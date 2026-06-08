import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import CustomReports from './components/CustomReports';
import Settings from './components/Settings';
import { LayoutDashboard, BarChart3, FilePieChart, Settings as SettingsIcon, Layers, Menu, X } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, switchUser } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Real-Time Streams', icon: BarChart3 },
    { id: 'reports', label: 'Custom Reports', icon: FilePieChart },
    { id: 'settings', label: 'System Settings', icon: SettingsIcon },
  ];

  // Fixed Sidebar Content Component Helper
  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between bg-slate-900 text-slate-100">
      <div>
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Layers size={20} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              NexusFlow
            </span>
          </div>
          {/* Close button - only visible on mobile overlay */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false); // Auto-close drawer on mobile selection
                }}
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

      {/* User Profile & RBAC Switcher Footer */}
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
          <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-sm text-white shrink-0">
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
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden relative">
      
      {/* 1. DESKTOP SIDEBAR (Visible only on medium screens and up) */}
      <aside className="hidden md:flex md:w-64 border-r border-slate-800 flex-col justify-between shrink-0 bg-slate-900">
        <SidebarContent />
      </aside>

      {/* 2. MOBILE OVERLAY DRAWER (Slides out from left on mobile screens) */}
      <div className={`fixed inset-0 z-50 transform md:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Semi-transparent dark background layer */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="absolute inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800">
          <SidebarContent />
        </div>
      </div>

      {/* 3. MAIN WINDOW INTERFACE */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-slate-950 w-full">
        {/* Dynamic Header Block */}
        <header className="h-16 border-b border-slate-800 px-4 md:px-8 flex items-center justify-between bg-slate-900/50 backdrop-blur sticky top-0 z-40">
          <div className="flex items-center gap-3">
            {/* Hamburger button icon only visible on mobile screen limits */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-slate-400 hover:text-white md:hidden rounded-lg hover:bg-slate-800"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-base md:text-lg font-semibold capitalize text-slate-200">
              {activeTab.replace('-', ' ')} Window
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs md:text-sm text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Pipeline Connected
            </span>
          </div>
        </header>

        {/* Content Box with dynamic fluid padding */}
        <div className="p-4 md:p-8 flex-1 w-full max-w-7xl mx-auto">
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