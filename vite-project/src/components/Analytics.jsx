import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Cpu, HardDrive } from 'lucide-react';

export default function Analytics() {
  const [dataStream, setDataStream] = useState([]);

  // Generate real-time updates ticking every 1.5 seconds
  useEffect(() => {
    const initializeData = () => {
      const initial = [];
      for (let i = 10; i >= 0; i--) {
        initial.push({
          timestamp: new Date(Date.now() - i * 2000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          cpu: Math.floor(Math.random() * (75 - 45) + 45),
          memory: Math.floor(Math.random() * (85 - 60) + 60),
        });
      }
      setDataStream(initial);
    };

    initializeData();

    const interval = setInterval(() => {
      setDataStream((prevData) => {
        const nextData = [...prevData.slice(1)];
        nextData.push({
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          cpu: Math.floor(Math.random() * (85 - 40) + 40),
          memory: Math.floor(Math.random() * (90 - 55) + 55),
        });
        return nextData;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold tracking-tight text-slate-100">Live Infrastructure Node Streams</h3>
        <p className="text-sm text-slate-400">Monitoring resource allocations dynamically across multi-zone container pools.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time CPU usage */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="text-cyan-400" size={18} />
            <h4 className="text-sm font-semibold text-slate-200">Cluster CPU Utilization (%)</h4>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataStream}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={10} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Line type="monotone" dataKey="cpu" stroke="#06b6d4" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Memory allocation */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <HardDrive className="text-indigo-400" size={18} />
            <h4 className="text-sm font-semibold text-slate-200">Dynamic Memory Allocation (%)</h4>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataStream}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={10} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Line type="monotone" dataKey="memory" stroke="#6366f1" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}