import React from 'react';
import { 
  LayoutDashboard, 
  Share2, 
  Settings, 
  Users, 
  Gavel, 
  Bell, 
  Globe, 
  UserCircle,
  Plus,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

interface LayoutProps {
  onLogout: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Painel', path: '/' },
  { icon: Share2, label: 'Rastreabilidade', path: '/traceability' },
  { icon: Settings, label: 'Operações', path: '/operations' },
  { icon: Users, label: 'Equipe', path: '/team' },
  { icon: Gavel, label: 'Logs de Auditoria', path: '/audit' },
];

export default function Layout({ onLogout }: LayoutProps) {
  const location = useLocation();
  const [showGasPrices, setShowGasPrices] = React.useState(false);

  const gasPrices = [
    { name: 'Gasolina Comum', price: 'R$ 5,84' },
    { name: 'Gasolina Aditivada', price: 'R$ 6,12' },
    { name: 'Diesel S10', price: 'R$ 5,98' },
    { name: 'Diesel S500', price: 'R$ 5,82' },
    { name: 'Etanol Hidratado', price: 'R$ 3,75' },
    { name: 'GLP (13kg)', price: 'R$ 112,00' },
    { name: 'GNV', price: 'R$ 4,65/m³' },
    { name: 'Querosene de Aviação', price: 'R$ 4,20/L' },
    { name: 'Óleo Combustível', price: 'R$ 3,45/kg' },
    { name: 'Nafta Petroquímica', price: 'R$ 2,95/kg' },
  ];

  const lastUpdated = new Date().toLocaleString('pt-BR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/5 bg-neutral-950 shadow-[4px_0_24px_rgba(0,0,0,0.5)] max-md:hidden">
        <div className="p-6">
          <div className="font-headline text-xl font-black text-primary-container mb-1 tracking-tighter">
            KINETIC LEDGER
          </div>
          <div className="font-sans text-[10px] font-medium uppercase tracking-widest text-neutral-500">
            Terminal de Administração
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 font-sans text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary-container/20 text-primary-container border-r-4 border-primary-container" 
                    : "text-neutral-500 hover:bg-white/5 hover:text-neutral-200"
                )}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-4 border-t border-white/5">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container py-3 font-bold text-white transition-all hover:opacity-90 active:scale-95">
            <Plus size={18} />
            <span>Nova Transação</span>
          </button>
          
          <div className="mt-4 space-y-1">
            <button 
              onClick={onLogout}
              className="flex w-full items-center gap-3 px-4 py-2 text-xs font-medium uppercase tracking-tighter text-neutral-500 hover:text-red-500 transition-colors"
            >
              <LogOut size={14} />
              <span>Encerrar Sessão</span>
            </button>
            <Link to="/support" className="flex items-center gap-3 px-4 py-2 text-xs font-medium uppercase tracking-tighter text-neutral-500 hover:text-neutral-200 transition-colors">
              <HelpCircle size={14} />
              <span>Suporte</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Bar */}
        <header className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-neutral-950/80 px-8 backdrop-blur-xl md:left-64">
          <div className="flex items-center gap-8">
            <h1 className="font-headline text-xl font-bold tracking-tight">
              {navItems.find(i => i.path === location.pathname)?.label || 'Terminal'}
            </h1>
            <nav className="hidden items-center gap-6 md:flex">
              <a href="#" className="text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-200">Saúde do Nó</a>
              <a href="#" className="text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-200">Nós Ativos</a>
              <div className="relative">
                <button 
                  onClick={() => setShowGasPrices(!showGasPrices)}
                  className="flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-200"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                  </span>
                  Status do Gás
                </button>
                {showGasPrices && (
                  <div className="absolute top-full left-0 mt-2 w-72 rounded-xl border border-white/10 bg-surface-container-low p-5 shadow-2xl backdrop-blur-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">Preços de Derivados</h4>
                        <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      </div>
                      <span className="text-[8px] text-neutral-500 uppercase">Atualizado: {lastUpdated}</span>
                    </div>
                    <div className="space-y-2.5">
                      {gasPrices.map((gas) => (
                        <div key={gas.name} className="flex justify-between text-xs border-b border-white/5 pb-1 last:border-0">
                          <span className="text-neutral-400">{gas.name}</span>
                          <span className="font-mono font-bold text-on-surface">{gas.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 text-neutral-400 transition-all hover:bg-white/5 active:scale-95">
              <Bell size={20} />
            </button>
            <button className="rounded-full p-2 text-neutral-400 transition-all hover:bg-white/5 active:scale-95">
              <Globe size={20} />
            </button>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-neutral-400 transition-all hover:bg-red-500/10 hover:text-red-500 active:scale-95"
            >
              <LogOut size={16} />
              <span className="max-sm:hidden">Sair</span>
            </button>
          </div>
        </header>

        <main className="pt-24 pb-12 px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-white/10 bg-neutral-950/90 p-2 backdrop-blur-md md:hidden">
        {navItems.slice(0, 4).map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center rounded-sm px-3 py-1 transition-all",
                isActive ? "bg-primary-container text-white" : "text-neutral-500"
              )}
            >
              <item.icon size={18} />
              <span className="mt-1 text-[10px] font-medium uppercase tracking-widest">{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
