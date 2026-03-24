import { 
  UserPlus, 
  Mail, 
  Shield, 
  MoreVertical, 
  Search, 
  Filter,
  UserCircle,
  CheckCircle2,
  Clock,
  Lock,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import React, { useEffect, useState } from 'react';
import { TeamService } from '../services/supabaseService';

export default function Team() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await TeamService.getMembers();
        setMembers(data || []);
      } catch (err) {
        console.error('Failed to fetch team members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="font-headline text-4xl font-black uppercase tracking-tighter">Acesso de Colaboradores</h1>
          <p className="text-sm text-on-surface-variant">Gerencie permissões de equipe e níveis de acesso ao terminal.</p>
        </div>
        <button className="flex items-center gap-2 rounded bg-primary-container px-6 py-3 font-bold uppercase tracking-widest text-white transition-all hover:opacity-90 active:scale-95">
          <UserPlus size={18} /> Adicionar Colaborador
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total de Membros', value: '12' },
          { label: 'Sessões Ativas', value: '8' },
          { label: 'Convites Pendentes', value: '3' },
          { label: 'Alertas de Segurança', value: '0', color: 'text-green-500' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/5 bg-surface-container-low p-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{stat.label}</div>
            <div className={cn("font-headline text-3xl font-bold", stat.color)}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Team Table */}
      <div className="rounded-2xl border border-white/5 bg-surface-container-low overflow-hidden">
        <div className="flex flex-col justify-between gap-4 border-b border-white/5 p-6 sm:flex-row sm:items-center">
          <h3 className="font-headline text-lg font-bold uppercase">Colaboradores Ativos</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input 
                placeholder="Pesquisar membros..." 
                className="rounded border-none bg-background py-2 pl-9 pr-4 text-xs focus:ring-1 focus:ring-primary-container"
              />
            </div>
            <button className="rounded border border-white/5 bg-surface-high p-2 text-neutral-400">
              <Filter size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-black/20 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                <th className="px-6 py-4">Colaborador</th>
                <th className="px-6 py-4">Cargo</th>
                <th className="px-6 py-4">Nível de Acesso</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <Activity className="mx-auto animate-spin text-primary-container" size={24} />
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs text-on-surface-variant uppercase tracking-widest">
                    Nenhum colaborador encontrado
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="group transition-colors hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {member.avatar ? (
                          <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="h-10 w-10 rounded-full border border-white/10 object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface-high text-on-surface-variant">
                            <UserCircle size={24} />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-bold">{member.name}</div>
                          <div className="text-xs text-neutral-500">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-medium text-on-surface">{member.role}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Lock size={12} className="text-primary" />
                        <span className="text-xs font-mono uppercase tracking-tighter">{member.access}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "h-2 w-2 rounded-full",
                          member.status === 'active' ? "bg-green-500" : 
                          member.status === 'away' ? "bg-amber-500" : "bg-neutral-600"
                        )}></div>
                        <span className="text-[10px] font-bold uppercase text-on-surface-variant">{member.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="rounded p-2 text-neutral-500 hover:bg-white/5 hover:text-on-surface">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Guide */}
      <div className="rounded-2xl bg-surface-high p-8">
        <div className="mb-6 flex items-center gap-3">
          <Shield className="text-primary" />
          <h3 className="font-headline text-xl font-bold uppercase">Access Control Protocols</h3>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { title: 'Full Terminal', detail: 'Unrestricted access to all modules, security policies, and node management.' },
            { title: 'Ops Hub', detail: 'Authorized for batch registration, transport tracking, and digital sign-offs.' },
            { title: 'Read-Only Audit', detail: 'Restricted to viewing audit logs and traceability data. No write permissions.' },
          ].map((item) => (
            <div key={item.title} className="space-y-2">
              <div className="text-sm font-bold text-primary uppercase tracking-tight">{item.title}</div>
              <p className="text-xs text-on-surface-variant leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
