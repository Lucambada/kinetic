import { 
  Shield, 
  Lock, 
  Terminal, 
  ChevronRight, 
  UserPlus,
  Mail,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/supabaseService';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await AuthService.signUp(email, password, { full_name: fullName });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setError(err.message || 'FALHA NO REGISTRO: ERRO DESCONHECIDO');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await AuthService.signInWithGoogle();
    } catch (err: any) {
      setError('FALHA NA AUTENTICAÇÃO GOOGLE');
    }
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
            <UserPlus size={40} className="text-white" />
          </div>
          <h1 className="font-headline text-4xl font-black uppercase tracking-tighter text-on-surface">
            NOVO OPERADOR
          </h1>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Registro de Terminal
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-surface-container-low p-8 shadow-2xl backdrop-blur-xl">
          {success ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Activity className="text-green-500 animate-pulse" size={48} />
              </div>
              <h2 className="text-xl font-bold text-green-500 uppercase tracking-widest">Registro Concluído</h2>
              <p className="text-xs text-on-surface-variant uppercase tracking-widest">Redirecionando para o terminal...</p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 rounded bg-red-500/10 p-3 text-[10px] font-bold uppercase tracking-widest text-red-500 border border-red-500/20">
                  <Activity size={14} className="animate-pulse" />
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Nome Completo</label>
                <div className="relative">
                  <Terminal size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="MARCUS THORNE"
                    className="w-full rounded-lg border-none bg-background p-4 pl-12 font-mono text-sm text-on-surface focus:ring-2 focus:ring-primary-container"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Endereço de E-mail</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operador@kinetic.io"
                    className="w-full rounded-lg border-none bg-background p-4 pl-12 font-mono text-sm text-on-surface focus:ring-2 focus:ring-primary-container"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Chave de Segurança</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    <span>Criar Perfil de Operador</span>
                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="bg-surface-container-low px-2 text-neutral-500">Ou registrar com</span>
                </div>
              </div>

              <button 
                type="button"
                onClick={handleGoogleLogin}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 py-3 text-xs font-bold uppercase tracking-widest text-on-surface transition-all hover:bg-white/10 active:scale-95"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Google</span>
              </button>

              <div className="text-center">
                <Link to="/login" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
                  Já registrado? Voltar ao Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
