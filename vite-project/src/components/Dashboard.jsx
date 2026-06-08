import React from 'react';
import { Users, Activity, ShieldCheck, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { time: '00:00', requests: 2400 },
  { time: '04:00', requests: 1398 },
  { time: '08:00', requests: 9800 },
  { time: '12:00', requests: 12080 },
  { time: '16:00', requests: 14000 },
  { time: '20:00', requests: 8900 },
];

export default function Dashboard() {
  const stats = [
    { label: 'Active Enterprise Nodes', value: '1,284', change: '+12.3%', icon: Users, color: 'text-indigo-400' },
    { label: 'System Throughput', value: '42.8k op/s', change: '+4.1%', icon: Activity, color: 'text-cyan-400' },
    { label: 'Ingestion Security Status', value: '99.99%', change: 'Nominal', icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Avg Data Latency', value: '14ms', change: '-2.4%', icon: Zap, color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-400">{stat.label}</span>
                <Icon className={stat.color} size={22} />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-slate-100">{stat.value}</span>
                <span className={`text-xs font-semibold ${stat.change.startsWith('+') || stat.change === 'Nominal' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Area Spline Graphic */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <h3 className="text-base font-semibold text-slate-200 mb-6">Global Application Network Load</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
              <Area type="monotone" dataKey="requests" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorReq)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}