import { 
  Box, 
  MapPin, 
  ChevronRight, 
  ExternalLink, 
  Info, 
  CheckCircle2, 
  Clock,
  Truck,
  Factory,
  Droplets,
  Warehouse
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const batchProperties = [
  { label: 'Product', value: 'High-Octane AvGas' },
  { label: 'Volume', value: '42,500 L' },
  { label: 'Purity', value: '99.8%', bar: true },
  { label: 'Temp. Log', value: 'STABLE', highlight: true },
];

const timelineEvents = [
  {
    id: 1,
    date: '2023-11-24',
    time: '08:14:22 UTC',
    type: 'Extraction',
    icon: Droplets,
    detail: 'Crude Resource Harvesting',
    party: 'Borealis Energy Corp.',
    location: 'North Sea Sector 7',
    status: 'COMPLETED',
    hash: '0x44a1...d72e',
  },
  {
    id: 2,
    date: '2023-11-25',
    time: '14:30:00 UTC',
    type: 'Refining',
    icon: Factory,
    detail: 'Grade-A Fuel Distillation',
    party: 'Kinetic Refineries Ltd.',
    location: 'Antwerp Hub',
    status: 'COMPLETED',
    hash: '0x92f3...b29c',
  },
  {
    id: 3,
    date: '2023-11-26',
    time: 'IN PROGRESS',
    type: 'Transport',
    icon: Truck,
    detail: 'Inter-Terminal Transit',
    party: 'Atlas Logistics Global',
    location: 'Route: ANTW -> ROTT',
    status: 'PENDING VERIFICATION',
    hash: 'PENDING BLOCK CONFIRMATION...',
    isPending: true,
  },
  {
    id: 4,
    date: '--:--',
    time: 'EST. 2023-11-27',
    type: 'Storage',
    icon: Warehouse,
    detail: 'Secure Vaulting',
    party: 'Terminal 42 Operations',
    location: 'Rotterdam Hub',
    status: 'WAITING',
    hash: 'HASH: NOT_AVAILABLE',
    isFuture: true,
  },
];

export default function Traceability() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-2">
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-primary">Logistics Protocol v2.4</span>
          <h1 className="font-headline text-5xl font-bold tracking-tight">
            Traceability <span className="text-primary-container">Engine</span>
          </h1>
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
          <div className="font-mono text-xs text-on-surface-variant uppercase">Active Batch</div>
          <div className="rounded-lg border border-white/5 bg-surface-high px-4 py-2 font-mono text-sm text-primary">
            0x8f7c...e29b
          </div>
        </div>
      </header>

      {/* Map & Info Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Map Section */}
        <section className="relative min-h-[500px] overflow-hidden rounded-xl border border-white/5 bg-surface-low lg:col-span-8">
          <div className="absolute inset-0">
            <img 
              src="https://picsum.photos/seed/worldmap/1200/800?grayscale&blur=4" 
              alt="Transit Map" 
              className="h-full w-full object-cover opacity-30 contrast-125"
              referrerPolicy="no-referrer"
            />
            {/* SVG Path Simulation */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 800 500">
              <motion.path 
                d="M150 350 Q 250 200 400 250 T 650 150" 
                fill="none" 
                stroke="var(--color-primary-container)" 
                strokeDasharray="8 4" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <circle cx="150" cy="350" r="6" fill="var(--color-primary-container)" className="animate-pulse" />
              <circle cx="400" cy="250" r="4" fill="var(--color-primary)" />
              <circle cx="650" cy="150" r="6" fill="var(--color-primary-container)" />
            </svg>
          </div>

          {/* Map Overlays */}
          <div className="absolute top-6 left-6 w-64 rounded-lg border border-white/10 bg-surface-high/60 p-4 backdrop-blur-xl">
            <h3 className="mb-3 flex items-center gap-2 font-headline text-sm font-bold">
              <MapPin size={14} className="text-primary" />
              Live Transit Map
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant">Origin</span>
                <span className="font-bold">Port of Antwerp</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant">Destination</span>
                <span className="font-bold">Rotterdam Terminal</span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-[65%] bg-primary"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Properties Panel */}
        <section className="space-y-6 lg:col-span-4">
          <div className="rounded-xl border border-white/5 bg-surface-low p-6">
            <h3 className="mb-4 font-headline text-lg font-bold">Batch Properties</h3>
            <div className="space-y-4">
              {batchProperties.map((prop) => (
                <div key={prop.label} className="flex items-center justify-between border-b border-white/5 py-2 last:border-0">
                  <span className="text-sm text-on-surface-variant">{prop.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-sm font-bold", prop.highlight ? "text-primary" : "text-on-surface")}>
                      {prop.value}
                    </span>
                    {prop.bar && (
                      <div className="h-2 w-12 overflow-hidden rounded-full bg-white/5">
                        <div className="h-full w-full bg-primary"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-primary-container/30 bg-primary-container/20 p-4">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">Status</div>
              <div className="font-headline text-lg font-bold">EN ROUTE</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-surface-high p-4">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Integrity</div>
              <div className="font-headline text-lg font-bold">VERIFIED</div>
            </div>
          </div>
        </section>
      </div>

      {/* Timeline Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="font-headline text-3xl font-bold">
            Event <span className="text-primary">Ledger</span>
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-sm border border-white/5 bg-surface-high px-3 py-1 text-xs text-on-surface-variant">
              <div className="h-2 w-2 rounded-full bg-primary-container"></div> Completed
            </div>
            <div className="flex items-center gap-2 rounded-sm border border-white/5 bg-surface-high px-3 py-1 text-xs text-on-surface-variant">
              <div className="h-2 w-2 rounded-full bg-amber-500"></div> Pending
            </div>
          </div>
        </div>

        <div className="relative space-y-8 before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-primary-container/30 before:to-transparent">
          {timelineEvents.map((event) => (
            <div key={event.id} className="relative pl-12">
              <div className={cn(
                "absolute left-0 top-0 h-6 w-6 rounded-full border-4 border-background z-10",
                event.isPending ? "bg-amber-500" : event.isFuture ? "bg-neutral-800" : "bg-primary-container"
              )}></div>
              
              <motion.div 
                whileHover={{ x: 4 }}
                className={cn(
                  "grid grid-cols-1 gap-6 rounded-xl border p-6 transition-colors md:grid-cols-12",
                  event.isPending 
                    ? "border-primary-container/30 bg-surface-low ring-2 ring-amber-500/20" 
                    : "border-white/5 bg-surface-low hover:bg-surface-high",
                  event.isFuture && "opacity-50"
                )}
              >
                <div className="md:col-span-2">
                  <div className={cn("font-mono font-bold", event.isPending ? "text-amber-500" : "text-primary")}>
                    {event.date}
                  </div>
                  <div className="text-xs text-on-surface-variant">{event.time}</div>
                </div>

                <div className="md:col-span-3">
                  <div className="mb-1 flex items-center gap-2">
                    <event.icon size={16} className={event.isPending ? "text-amber-500" : "text-primary"} />
                    <span className="font-bold uppercase tracking-tight">{event.type}</span>
                  </div>
                  <div className="text-xs text-on-surface-variant">{event.detail}</div>
                </div>

                <div className="md:col-span-3">
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant">Responsible Party</div>
                  <div className="text-sm font-medium">{event.party}</div>
                  <div className="text-xs text-neutral-500">{event.location}</div>
                </div>

                <div className="flex flex-col items-end justify-between md:col-span-4">
                  <span className={cn(
                    "rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase",
                    event.isPending ? "bg-amber-500 text-black" : event.isFuture ? "bg-neutral-800 text-neutral-500" : "bg-primary-container text-white"
                  )}>
                    {event.status}
                  </span>
                  <div className="mt-4 flex w-full items-center justify-between rounded bg-black/20 p-2">
                    <span className="font-mono text-[10px] text-neutral-500">{event.hash}</span>
                    {!event.isFuture && (
                      <ExternalLink size={14} className={event.isPending ? "text-amber-500" : "text-primary"} />
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
