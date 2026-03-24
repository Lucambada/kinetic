import { 
  Shield, 
  Activity, 
  Server, 
  Database, 
  Key, 
  Code, 
  Search, 
  Filter, 
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import React, { useEffect, useState } from 'react';
import { AuditService } from '../services/supabaseService';

const networkStats = [
  { label: 'Sync Progress', value: '99.98%', detail: 'Block #18.4M', icon: Activity },
  { label: 'Active Nodes', value: '2,481', detail: 'Global Cluster', icon: Server },
  { label: 'Latency', value: '12ms', detail: 'Avg. Response', icon: Database },
];

const nodes = [
  { id: 'NODE-ALPHA-01', region: 'EU-WEST', status: 'online', load: '42%', uptime: '182d' },
  { id: 'NODE-BETA-04', region: 'US-EAST', status: 'online', load: '18%', uptime: '45d' },
  { id: 'NODE-GAMMA-09', region: 'AS-SOUTH', status: 'warning', load: '89%', uptime: '12d' },
];

export default function AuditLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await AuditService.getLogs();
        setLogs(data || []);
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="font-headline text-4xl font-black uppercase tracking-tighter">Admin Terminal</h1>
          <p className="text-sm text-on-surface-variant">System-wide audit trail and network infrastructure management.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded border border-white/10 bg-surface-high px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all hover:bg-neutral-600">
            <Download size={14} /> Export Logs
          </button>
          <button className="flex items-center gap-2 rounded bg-primary-container px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90">
            <Shield size={14} /> Security Scan
          </button>
        </div>
      </div>

      {/* Network Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {networkStats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4 rounded-xl border border-white/5 bg-surface-container-low p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-primary-container/10 text-primary-container">
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{stat.label}</div>
              <div className="font-headline text-2xl font-bold">{stat.value}</div>
              <div className="text-[10px] text-neutral-500">{stat.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Audit Logs Table */}
        <section className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-white/5 bg-surface-container-low overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/5 p-6">
              <h3 className="font-headline text-lg font-bold uppercase">Immutable Audit Logs</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    placeholder="Search logs..." 
                    className="rounded border-none bg-background py-1.5 pl-9 pr-4 text-xs focus:ring-1 focus:ring-primary-container"
                  />
                </div>
                <button className="rounded border border-white/5 bg-surface-high p-1.5 text-neutral-400">
                  <Filter size={14} />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-black/20 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    <th className="px-6 py-4">Action</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center">
                        <Activity className="mx-auto animate-spin text-primary-container" size={24} />
                      </td>
                    </tr>
                  ) : logs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-xs text-on-surface-variant uppercase tracking-widest">
                        No logs recorded
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id} className="group transition-colors hover:bg-white/5">
                        <td className="px-6 py-4">
                          <div className="font-bold text-sm">{log.action}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-mono text-xs text-primary">{log.operator_name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs text-neutral-500">{new Date(log.timestamp).toLocaleTimeString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                            log.status === 'critical' || log.status === 'failure' ? "bg-red-500/20 text-red-500" : 
                            log.status === 'success' ? "bg-green-500/20 text-green-500" : 
                            "bg-blue-500/20 text-blue-500"
                          )}>
                            {log.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-neutral-500 transition-colors hover:text-primary">
                            <ChevronRight size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="border-t border-white/5 p-4 text-center">
              <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">
                View Full Archive
              </button>
            </div>
          </div>

          {/* Infrastructure Section */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-surface-container-low p-6">
              <h4 className="mb-4 flex items-center gap-2 font-headline text-sm font-bold uppercase">
                <Key size={16} className="text-primary" /> Security Policy
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded bg-background p-3">
                  <span className="text-xs font-medium">2FA Enforcement</span>
                  <div className="h-4 w-8 rounded-full bg-primary-container p-1">
                    <div className="h-2 w-2 translate-x-4 rounded-full bg-white"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded bg-background p-3">
                  <span className="text-xs font-medium">IP Whitelisting</span>
                  <div className="h-4 w-8 rounded-full bg-neutral-700 p-1">
                    <div className="h-2 w-2 rounded-full bg-neutral-400"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-surface-container-low p-6">
              <h4 className="mb-4 flex items-center gap-2 font-headline text-sm font-bold uppercase">
                <Code size={16} className="text-primary" /> API Infrastructure
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant">API Endpoint</span>
                  <span className="font-mono text-primary">api.kinetic.ledger/v1</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant">Auth Method</span>
                  <span className="font-mono">OAuth 2.0 / JWT</span>
                </div>
                <button className="mt-2 w-full rounded bg-white/5 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-white/10">
                  Manage Keys
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Network Topology Column */}
        <section className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-white/5 bg-surface-container-low p-6">
            <h3 className="mb-6 font-headline text-sm font-bold uppercase tracking-widest">Network Topology</h3>
            <div className="space-y-4">
              {nodes.map((node) => (
                <div key={node.id} className="rounded-lg border border-white/5 bg-background p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        node.status === 'online' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                      )}></div>
                      <span className="font-mono text-xs font-bold">{node.id}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase text-neutral-500">{node.region}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] uppercase text-neutral-500">Load</div>
                      <div className="text-sm font-bold">{node.load}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-neutral-500">Uptime</div>
                      <div className="text-sm font-bold">{node.uptime}</div>
                    </div>
                  </div>
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
                    <div className={cn(
                      "h-full transition-all",
                      node.status === 'online' ? "bg-primary" : "bg-amber-500"
                    )} style={{ width: node.load }}></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full rounded border border-white/10 py-3 text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-white/5">
              Node Management
            </button>
          </div>

          {/* System Health Widget */}
          <div className="rounded-2xl bg-primary-container p-6 text-white">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-headline text-sm font-bold uppercase">Global Sync Status</h4>
              <CheckCircle2 size={20} />
            </div>
            <div className="mb-6 flex items-baseline gap-2">
              <span className="font-headline text-5xl font-black">99.9%</span>
              <span className="text-xs font-bold opacity-70">STABLE</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                <span>Data Integrity</span>
                <span>100%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-black/20">
                <div className="h-full w-full bg-white"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
