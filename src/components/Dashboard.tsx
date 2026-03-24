import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { AlertTriangle, MapPin, Zap, Activity, Server, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import React, { useEffect, useState } from 'react';
import { OperationsService } from '../services/supabaseService';

const kpiData = [
  { label: 'Total Operations', value: '1.2M', trend: '+12.4%', color: 'primary-container' },
  { label: 'Volume Tracked (L)', value: '84.2B', trend: 'YTD', color: 'neutral-500' },
  { label: 'Active Nodes', value: '2,481', trend: 'GLOBAL', color: 'primary-container' },
  { label: 'System Health', value: '99.9%', trend: 'STABLE', color: 'neutral-500' },
];

const chartData = [
  { name: 'Jan 01', production: 40, distribution: 24 },
  { name: 'Jan 04', production: 30, distribution: 13 },
  { name: 'Jan 08', production: 20, distribution: 98 },
  { name: 'Jan 12', production: 27, distribution: 39 },
  { name: 'Jan 15', production: 18, distribution: 48 },
  { name: 'Jan 19', production: 23, distribution: 38 },
  { name: 'Jan 22', production: 34, distribution: 43 },
  { name: 'Jan 25', production: 45, distribution: 55 },
  { name: 'Jan 29', production: 30, distribution: 20 },
];

const alerts = [
  { id: 1, type: 'security', title: 'Unrecognized Hash Pattern Detected', detail: 'Station ID: #RU-928 • Vol: 5,000L', time: '02:44:12 UTC', icon: ShieldCheck, color: 'text-primary-container' },
  { id: 2, type: 'variance', title: 'Geospatial Deviation Alert', detail: 'Pipeline Alpha • Segment 04', time: '01:12:05 UTC', icon: MapPin, color: 'text-primary' },
];

export default function Dashboard() {
  const [feedItems, setFeedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const data = await OperationsService.getOperations();
        setFeedItems(data || []);
      } catch (err) {
        console.error('Failed to fetch operations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="font-headline text-4xl font-bold uppercase tracking-tighter text-on-surface">
            Operations Overview
          </h1>
          <p className="mt-1 font-sans text-sm text-on-surface-variant">
            Real-time cryptographic audit of global fuel distribution.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-surface-container-low px-4 py-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary-container"></div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary-container">
            Live Network Syncing
          </span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex h-40 flex-col justify-between rounded-xl border-l-4 border-primary-container bg-surface-container-low p-6"
            style={{ borderLeftColor: kpi.color === 'primary-container' ? 'var(--color-primary-container)' : 'var(--color-surface-high)' }}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              {kpi.label}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-4xl font-black">{kpi.value}</span>
              <span className="font-mono text-xs font-bold text-primary">{kpi.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Chart Section */}
        <div className="lg:col-span-8 space-y-8">
          <div className="rounded-2xl bg-surface-container-low p-8">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <h3 className="font-headline text-xl font-bold uppercase italic tracking-tight">
                  Production vs. Distribution
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Comparative flow analysis across primary chain segments.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-primary-container"></div>
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Production</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-surface-high"></div>
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Distribution</span>
                </div>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'var(--color-on-surface-variant)', fontSize: 10, fontWeight: 'bold' }} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1b1c1c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Bar dataKey="production" fill="var(--color-primary-container)" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="distribution" fill="var(--color-surface-high)" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Alerts Section */}
          <div className="rounded-2xl bg-surface-container-low p-8">
            <div className="mb-6 flex items-center gap-3">
              <AlertTriangle className="text-primary-container" />
              <h3 className="font-headline text-xl font-bold uppercase">Security & Fraud Alerts</h3>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="group flex items-center gap-4 rounded-lg bg-background p-4 transition-colors hover:bg-surface-high">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-container/10">
                    <alert.icon className={alert.color} size={18} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold">{alert.title}</h4>
                    <p className="text-xs text-on-surface-variant">{alert.detail}</p>
                  </div>
                  <div className="text-right">
                    <span className="block font-mono text-[10px] text-on-surface-variant">{alert.time}</span>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-primary transition-all group-hover:underline">
                      Investigate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Feed & Map */}
        <div className="lg:col-span-4 space-y-8">
          {/* Live Feed */}
          <div className="rounded-2xl border border-white/5 bg-surface-container-low p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-headline text-sm font-bold uppercase tracking-widest">Live Chain Feed</h3>
              <span className="rounded bg-primary-container px-2 py-0.5 font-mono text-[10px] text-white">4.2 tps</span>
            </div>
            <div className="relative space-y-6">
              <div className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-white/10"></div>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Activity className="animate-spin text-primary-container" size={24} />
                </div>
              ) : feedItems.length === 0 ? (
                <p className="text-center text-[10px] text-on-surface-variant py-8">No live data available</p>
              ) : (
                feedItems.map((item) => (
                  <div key={item.id} className="relative pl-8">
                    <div className={cn(
                      "absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-4 border-background",
                      item.status === 'completed' ? "bg-primary-container shadow-[0_0_8px_rgba(192,0,0,0.5)]" : "bg-surface-high"
                    )}></div>
                    <div className="mb-1 font-mono text-[10px] uppercase tracking-tighter text-on-surface-variant">
                      Batch {item.batch_id}
                    </div>
                    <div className="truncate font-mono text-xs text-primary">{item.id.substring(0, 18)}...</div>
                    <p className="mt-1 text-[11px] italic text-on-surface">{item.type}: {item.volume}L • {item.location}</p>
                  </div>
                ))
              )}
            </div>
            <button className="mt-8 w-full border border-white/10 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-white/5">
              Explorer Terminal
            </button>
          </div>

          {/* Map Snippet */}
          <div className="group relative aspect-square overflow-hidden rounded-2xl">
            <img 
              src="https://picsum.photos/seed/map/800/800?grayscale&blur=2" 
              alt="Network Hubs Map" 
              className="h-full w-full object-cover brightness-50 transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h4 className="font-headline text-lg font-bold uppercase">Network Hubs</h4>
              <div className="mt-2 flex items-center gap-2">
                <MapPin size={14} className="text-primary" />
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">
                  Active nodes in 42 regions
                </span>
              </div>
            </div>
            <div className="absolute top-6 right-6">
              <span className="rounded-sm bg-primary-container px-2 py-1 text-[10px] font-bold uppercase text-white">
                Live Map
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded bg-primary-container text-white shadow-2xl transition-all hover:scale-110 active:scale-90 md:bottom-12 md:right-12">
        <Zap size={24} />
      </button>
    </div>
  );
}
