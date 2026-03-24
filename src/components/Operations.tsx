import { 
  Factory, 
  Truck, 
  Lock, 
  MapPin, 
  Maximize2, 
  Droplets, 
  ShieldCheck, 
  AlertCircle,
  Trash2,
  PenTool,
  Zap,
  Warehouse
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Operations() {
  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Header */}
      <div className="col-span-12 mb-4">
        <h1 className="font-headline text-5xl font-black tracking-tighter text-on-surface uppercase">
          Operations Hub
        </h1>
        <p className="text-xs font-medium uppercase tracking-widest text-on-surface-variant opacity-70">
          Batch Management & Real-time Chain Verification
        </p>
      </div>

      {/* Left Column */}
      <div className="col-span-12 space-y-8 lg:col-span-7">
        {/* New Batch Form */}
        <section className="relative overflow-hidden rounded-lg bg-surface-container-low p-8">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Factory size={72} />
          </div>
          <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-primary">
            <Factory size={20} /> NEW BATCH REGISTRATION
          </h2>
          <form className="grid grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="col-span-2 md:col-span-1">
              <label className="mb-2 block text-xs font-bold uppercase tracking-tighter text-on-surface-variant">
                Batch ID (Auto-Hash)
              </label>
              <input 
                className="w-full cursor-not-allowed rounded-md border-none bg-background p-4 font-mono text-on-surface opacity-50 focus:ring-2 focus:ring-primary-container" 
                disabled 
                value="0x8FA7...D24" 
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="mb-2 block text-xs font-bold uppercase tracking-tighter text-on-surface-variant">
                Fuel Type
              </label>
              <select className="w-full rounded-md border-none bg-background p-4 text-on-surface focus:ring-2 focus:ring-primary-container">
                <option>Aviation Kerosene (K-40)</option>
                <option>Marine Diesel (M-80)</option>
                <option>Industrial Lubricant (L-12)</option>
              </select>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="mb-2 block text-xs font-bold uppercase tracking-tighter text-on-surface-variant">
                Origin Refinery
              </label>
              <input 
                className="w-full rounded-md border-none bg-background p-4 text-on-surface focus:ring-2 focus:ring-primary-container" 
                placeholder="Terminal 7 - North Coast" 
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="mb-2 block text-xs font-bold uppercase tracking-tighter text-on-surface-variant">
                Volume (Metric Tons)
              </label>
              <div className="relative">
                <input 
                  className="w-full rounded-md border-none bg-background p-4 text-on-surface focus:ring-2 focus:ring-primary-container" 
                  placeholder="4500" 
                  type="number" 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-primary">MT</span>
              </div>
            </div>
            <div className="col-span-2 pt-4">
              <button className="flex w-full items-center justify-center gap-3 bg-primary-container py-4 font-black uppercase tracking-widest text-white transition-all hover:bg-red-700 active:scale-[0.98]">
                <Lock size={18} /> EXECUTE LEDGER ENTRY
              </button>
            </div>
          </form>
        </section>

        {/* Active Transport Tracking */}
        <section className="overflow-hidden rounded-lg border border-white/5 bg-surface-container-low">
          <div className="flex items-end justify-between border-b border-white/5 p-6">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-tight text-on-surface">Active Transport</h2>
              <p className="text-xs text-on-surface-variant">Live Satellite Telemetry • Batch #A722-X</p>
            </div>
            <div className="flex items-center gap-2 font-mono text-sm text-primary">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
              </span>
              CONNECTED
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden bg-neutral-900">
            <img 
              src="https://picsum.photos/seed/satellite/1200/600?grayscale&blur=1" 
              alt="Satellite Map" 
              className="h-full w-full object-cover brightness-50 contrast-125 opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6">
              <div className="flex justify-between">
                <div className="pointer-events-auto rounded-lg border border-white/10 bg-black/60 p-3 backdrop-blur-md">
                  <div className="mb-1 text-[10px] font-bold uppercase text-neutral-400">Current Coordinates</div>
                  <div className="font-mono text-sm text-primary">51.9225° N, 4.4792° E</div>
                </div>
                <div className="pointer-events-auto rounded-lg border border-white/10 bg-black/60 p-3 backdrop-blur-md">
                  <div className="mb-1 text-[10px] font-bold uppercase text-neutral-400">Estimated Arrival</div>
                  <div className="font-mono text-sm text-on-surface">14:22 UTC</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="pointer-events-auto flex-1 rounded-lg border border-primary/20 bg-black/80 p-4 backdrop-blur-xl">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Vehicle ID: TANKER_SIGMA_7</span>
                    <span className="font-mono text-xs text-on-surface-variant">42.2 kts</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-[72%] bg-primary"></div>
                  </div>
                </div>
                <button className="pointer-events-auto rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-md transition-all hover:bg-white/20">
                  <Maximize2 size={20} />
                </button>
              </div>
            </div>
            {/* Pulsing Marker */}
            <div className="pointer-events-none absolute top-[45%] left-[60%] -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-8 w-8 animate-pulse items-center justify-center rounded-full border border-primary bg-primary/20">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Right Column */}
      <div className="col-span-12 space-y-8 lg:col-span-5">
        {/* Command Center */}
        <section className="rounded-lg bg-surface-container-low p-8">
          <h2 className="mb-6 text-xl font-bold uppercase tracking-tight text-on-surface">Status Command Center</h2>
          <div className="space-y-4">
            <label className="mb-4 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Select Target Batch</label>
            <div className="space-y-3">
              <div className="cursor-pointer border-l-4 border-primary/40 bg-surface-high p-4 transition-all hover:border-primary">
                <div className="mb-2 flex items-start justify-between">
                  <div className="font-bold text-on-surface">#B7219-DELTA</div>
                  <span className="bg-primary-container px-2 py-0.5 font-mono text-[10px] text-white uppercase">In Transit</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                  <Droplets size={14} /> 2,800 MT • Aviation Fuel
                </div>
              </div>
              <div className="cursor-pointer border-l-4 border-transparent bg-background p-4 opacity-60 transition-all hover:border-white/20">
                <div className="mb-2 flex items-start justify-between">
                  <div className="font-bold text-on-surface">#C9024-OMEGA</div>
                  <span className="bg-neutral-800 px-2 py-0.5 font-mono text-[10px] text-neutral-400 uppercase">Staged</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                  <Droplets size={14} /> 1,150 MT • Marine Diesel
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-6">
              {[
                { icon: Truck, label: 'Move to Transport' },
                { icon: Warehouse, label: 'Arrived at Storage' },
                { icon: ShieldCheck, label: 'Quality Approved' },
                { icon: AlertCircle, label: 'Log Incident' },
              ].map((btn) => (
                <button key={btn.label} className="flex items-center gap-2 rounded-md border border-white/5 bg-surface-high px-4 py-3 text-sm font-bold text-on-surface transition-all hover:bg-neutral-600">
                  <btn.icon size={18} />
                  <span className="uppercase tracking-tight text-[10px]">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Digital Sign-off */}
        <section className="relative overflow-hidden rounded-lg bg-primary-container p-8 text-white">
          <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold uppercase tracking-tighter">
            <ShieldCheck size={20} /> DIGITAL SIGN-OFF
          </h2>
          <p className="mb-6 text-sm font-medium opacity-80">
            Verify batch #B7219-DELTA transfer completion and commit cryptographic signature to the ledger.
          </p>
          <div className="group relative mb-6 flex h-40 cursor-crosshair flex-col items-center justify-center rounded border border-white/10 bg-black/20">
            <PenTool size={36} className="opacity-30 transition-opacity group-hover:opacity-60" />
            <div className="mt-2 text-[10px] font-bold uppercase tracking-widest opacity-40">Draw Operator Signature Here</div>
            <div className="absolute bottom-6 left-12 right-12 border-b border-white/20"></div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex-1 bg-white py-4 font-black uppercase tracking-widest text-primary-container transition-all hover:bg-neutral-100 active:scale-95">
              SIGN & COMMIT
            </button>
            <button className="rounded bg-black/20 p-4 text-white transition-all hover:bg-black/30">
              <Trash2 size={20} />
            </button>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <img 
              src="https://picsum.photos/seed/operator/100/100" 
              alt="Operator" 
              className="h-10 w-10 rounded-full border-2 border-white/20 object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="text-xs font-bold uppercase tracking-tight">Operator: Marcus Thorne</div>
              <div className="text-[10px] opacity-70">Certification ID: #IE-4492-X</div>
            </div>
          </div>
        </section>

        {/* Stats Summary */}
        <section className="grid grid-cols-2 gap-4 rounded-lg border border-white/5 bg-surface-high p-6">
          <div className="rounded bg-surface-low p-4">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Global Load</div>
            <div className="font-headline text-2xl font-bold text-on-surface">84.2%</div>
            <div className="mt-2 h-1 w-full bg-white/5">
              <div className="h-full w-[84%] bg-primary"></div>
            </div>
          </div>
          <div className="rounded bg-surface-low p-4">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Fleet Active</div>
            <div className="font-headline text-2xl font-bold text-on-surface">12 / 14</div>
            <div className="mt-2 font-mono text-[10px] text-primary">+2 Synchronizing</div>
          </div>
        </section>
      </div>
    </div>
  );
}
