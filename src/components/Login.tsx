import { 
  Shield, 
  Lock, 
  Terminal, 
  ChevronRight, 
  Fingerprint,
  Cpu,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [loading, setLoading] = useState(false);
  const [operatorId, setOperatorId] = useState('');
  const [securityKey, setSecurityKey] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      if (operatorId.toLowerCase() === 'david' && securityKey === '1234') {
        onLogin();
      } else {
        setError('INVALID CREDENTIALS: ACCESS DENIED');
      }
    }, 1200);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-6">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #c00000 1px, transparent 0)', backgroundSize: '48px 48px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-container shadow-[0_0_40px_rgba(192,0,0,0.3)]">
            <Terminal size={40} className="text-white" />
          </div>
          <h1 className="font-headline text-4xl font-black uppercase tracking-tighter text-on-surface">
            KINETIC LEDGER
          </h1>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Secure Terminal Access
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-surface-container-low p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 rounded bg-red-500/10 p-3 text-[10px] font-bold uppercase tracking-widest text-red-500 border border-red-500/20">
                <Activity size={14} className="animate-pulse" />
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Operator ID</label>
              <div className="relative">
                <Terminal size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input 
                  required
                  type="text"
                  value={operatorId}
                  onChange={(e) => setOperatorId(e.target.value)}
                  placeholder="ADMIN_MTHORNE"
                  className="w-full rounded-lg border-none bg-background p-4 pl-12 font-mono text-sm text-on-surface focus:ring-2 focus:ring-primary-container"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Security Key</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input 
                  required
                  type="password"
                  value={securityKey}
                  onChange={(e) => setSecurityKey(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border-none bg-background p-4 pl-12 font-mono text-sm text-on-surface focus:ring-2 focus:ring-primary-container"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 bg-primary-container py-4 font-black uppercase tracking-widest text-white transition-all hover:bg-red-700 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <Activity className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Initialize Session</span>
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 flex items-center justify-center gap-8 opacity-40">
          <div className="flex items-center gap-2">
            <Cpu size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">AES-256 Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Quantum Resistant</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
