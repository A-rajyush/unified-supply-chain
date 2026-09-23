import React, { useState } from 'react';
import {
  Globe,
  Radio,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Compass,
  Ship,
  Plane,
  Truck,
  Building2,
  Factory,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { IOT_TELEMATICS_RECORDS } from '../data/mockSupplyChain';

interface NetworkNode {
  id: string;
  name: string;
  category: 'supplier' | 'plant' | 'port' | 'customer' | 'warehouse';
  region: 'APAC' | 'AMER' | 'EMEA';
  x: number; // percentage coordinates 0-100 on map
  y: number;
  status: 'critical' | 'warning' | 'nominal';
  subtitle: string;
  details: {
    title: string;
    metrics: { label: string; value: string; color?: string }[];
    description: string;
  };
}

export const NetworkMapViewer: React.FC<{ onOpenQuery: (query: string) => void }> = ({
  onOpenQuery
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('port_la');
  const [activeLayer, setActiveLayer] = useState<'all' | 'ocean' | 'air' | 'road'>('all');
  const [selectedTelematics, setSelectedTelematics] = useState<string>('IOT-9901');

  const nodes: NetworkNode[] = [
    {
      id: 'murata_kyoto',
      name: 'Murata Kyoto Fab',
      category: 'supplier',
      region: 'APAC',
      x: 82,
      y: 42,
      status: 'critical',
      subtitle: 'Supplier • Passive Components',
      details: {
        title: 'Murata Manufacturing Co. (SUP-02)',
        metrics: [
          { label: 'Quality Lot', value: 'QI-2026-082 (Quarantine)', color: 'text-rose-400' },
          { label: 'Yield Rate', value: '92.2% (Target: ≥99.5%)', color: 'text-amber-400' },
          { label: 'SLA Delay', value: '+5 Days Hold', color: 'text-rose-400' }
        ],
        description: 'Manufacturer of MLCC-0402 ceramic capacitors. Batch held in quarantine due to terminal oxidation defects.'
      }
    },
    {
      id: 'shanghai_hub',
      name: 'Shanghai Logistics Hub',
      category: 'warehouse',
      region: 'APAC',
      x: 77,
      y: 46,
      status: 'warning',
      subtitle: 'Regional Distribution Center',
      details: {
        title: 'Shanghai Central Logistics Depot (WH-02)',
        metrics: [
          { label: 'Storage Utilization', value: '91.2% (High Dwell)', color: 'text-amber-400' },
          { label: 'Export Consignments', value: '14 Containers Queued' },
          { label: 'Throughput', value: '12,400 Units / Day' }
        ],
        description: 'Consolidation point for APAC semiconductor exports heading to North American assembly plants.'
      }
    },
    {
      id: 'port_la',
      name: 'Port of Los Angeles (Pier 400)',
      category: 'port',
      region: 'AMER',
      x: 21,
      y: 44,
      status: 'critical',
      subtitle: 'APM Terminals • Marine Berth',
      details: {
        title: 'APM Terminals Pier 400 Los Angeles',
        metrics: [
          { label: 'Vessel Container Dwell', value: '94.6 Hours (SLA: 72h)', color: 'text-rose-400' },
          { label: 'Impacted Consignment', value: 'SHP-7021 (Maersk Line)' },
          { label: 'Demurrage Accrual', value: '$2,800 Surcharge', color: 'text-rose-400' }
        ],
        description: 'Critical bottleneck: Marine terminal berth congestion delayed chassis release by 22.6 hours over contract SLA.'
      }
    },
    {
      id: 'austin_fab',
      name: 'Austin Gigafactory',
      category: 'plant',
      region: 'AMER',
      x: 29,
      y: 48,
      status: 'critical',
      subtitle: 'Main Assembly Plant • Texas',
      details: {
        title: 'Austin Gigafactory Advanced Assembly (PLANT-01)',
        metrics: [
          { label: 'Line 2 Starvation', value: 'Halt in 48 Hours', color: 'text-rose-400' },
          { label: 'MLCC Component Stock', value: '210,000 Units (4.6d)', color: 'text-rose-400' },
          { label: 'Consumption Rate', value: '45,000 Units / Day' }
        ],
        description: 'Assembly Line 2 produces powertrain controllers for Tesla and Apple commercial fleets. Starvation imminent without expedited buffer.'
      }
    },
    {
      id: 'fremont_tesla',
      name: 'Tesla Fremont Hub',
      category: 'customer',
      region: 'AMER',
      x: 20,
      y: 41,
      status: 'warning',
      subtitle: 'Tier-1 Customer • California',
      details: {
        title: 'Tesla Motors Fleet Assembly (CUST-01)',
        metrics: [
          { label: 'Impacted Order', value: 'SO-2026-9904' },
          { label: 'Contracted Quantity', value: '2,500 Units' },
          { label: 'Revenue At-Risk', value: '$875,000 Exposure', color: 'text-rose-400' }
        ],
        description: 'Delivery commitment breached due to Austin line delay. Delivery window rescheduled.'
      }
    },
    {
      id: 'cupertino_apple',
      name: 'Apple Enterprise Operations',
      category: 'customer',
      region: 'AMER',
      x: 19,
      y: 43,
      status: 'warning',
      subtitle: 'Tier-1 Customer • California',
      details: {
        title: 'Apple Enterprise Systems (CUST-02)',
        metrics: [
          { label: 'Impacted Order', value: 'SO-2026-9908' },
          { label: 'Contracted Quantity', value: '4,500 Units' },
          { label: 'Revenue At-Risk', value: '$1,420,000 Exposure', color: 'text-rose-400' }
        ],
        description: 'Custom server controller order delayed; customer escalated delivery SLA breach notice.'
      }
    },
    {
      id: 'dresden_fab',
      name: 'Dresden Semiconductor Fab',
      category: 'plant',
      region: 'EMEA',
      x: 52,
      y: 33,
      status: 'nominal',
      subtitle: 'European Fab • Germany',
      details: {
        title: 'Dresden Silicon Campus (PLANT-02)',
        metrics: [
          { label: 'Passive Buffer Runway', value: '48.2 Days (High Stock)', color: 'text-emerald-400' },
          { label: 'Available Transfer', value: '50,000 Units Reservable' },
          { label: 'Air Transit to Austin', value: '18h Charter Window' }
        ],
        description: 'Healthy inventory buffer. Primary candidate for emergency stock transport order (STO) to resolve Austin starvation.'
      }
    },
    {
      id: 'guadalajara_dc',
      name: 'Guadalajara Overflow Hub',
      category: 'warehouse',
      region: 'AMER',
      x: 27,
      y: 53,
      status: 'nominal',
      subtitle: 'Nearshore Buffer Depot • Mexico',
      details: {
        title: 'Guadalajara Depot (WH-06)',
        metrics: [
          { label: 'Storage Utilization', value: '71.5% Capacity', color: 'text-emerald-400' },
          { label: 'Transit Time to Austin', value: '14 Hours via Bonded Drayage' },
          { label: 'Cross-Border Clearance', value: 'USMCA Fast-Track Pre-Approved' }
        ],
        description: 'Secondary buffer staging warehouse for sub-assemblies and harness components.'
      }
    }
  ];

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[2];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Global Supply Chain Topology & Telematics Map
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <Radio className="w-3.5 h-3.5 text-cyan-400" />
                  Live Samsara IoT Ingestion
                </span>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Trans-Pacific Multi-Echelon Corridor
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Geospatial visualization of multi-tier supply networks, real-time ocean vessel transit, port terminal dwell bottlenecks, and inter-plant buffer balancing corridors.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center">
            {/* Layer Filters */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveLayer('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeLayer === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Lanes
              </button>
              <button
                onClick={() => setActiveLayer('ocean')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                  activeLayer === 'ocean' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Ship className="w-3 h-3" />
                <span>Ocean</span>
              </button>
              <button
                onClick={() => setActiveLayer('air')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                  activeLayer === 'air' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Plane className="w-3 h-3" />
                <span>Air</span>
              </button>
              <button
                onClick={() => setActiveLayer('road')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                  activeLayer === 'road' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Truck className="w-3 h-3" />
                <span>Drayage</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map Canvas & Telemetry Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Canvas (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              Active Corridors & Real-Time Vessel Trajectory
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-rose-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                Pier 400 Bottleneck
              </span>
              <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Air Charter Option
              </span>
            </div>
          </div>

          {/* SVG Map Canvas with World Outline and Dynamic Connectors */}
          <div className="relative w-full h-[420px] bg-slate-950 rounded-xl border border-slate-800/80 overflow-hidden flex items-center justify-center">
            {/* World Grid Lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Stylized Simplified Continents Representation */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
            >
              {/* North America */}
              <path
                d="M 150 120 Q 200 100, 320 110 T 360 220 T 300 300 T 200 240 T 150 180 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1.5"
              />
              {/* South America */}
              <path
                d="M 280 320 Q 330 340, 360 410 T 310 490 T 260 430 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1.5"
              />
              {/* Eurasia */}
              <path
                d="M 480 100 Q 650 90, 850 120 T 920 250 T 780 290 T 560 220 T 470 140 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1.5"
              />
              {/* Africa */}
              <path
                d="M 470 240 Q 560 240, 580 330 T 520 440 T 460 370 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1.5"
              />
              {/* Australia */}
              <path
                d="M 780 360 Q 860 350, 890 410 T 820 460 T 760 400 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="1.5"
              />
            </svg>

            {/* Route Lines (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* 1. Trans-Pacific Ocean Route (Kyoto/Yokohama -> LA Pier 400) */}
              {(activeLayer === 'all' || activeLayer === 'ocean') && (
                <g>
                  {/* Curving Pacific line wrapping across the ocean */}
                  <path
                    d="M 82 42 Q 95 30, 99 32"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="1.5"
                    strokeDasharray="2,2"
                    className="opacity-70 animate-pulse"
                  />
                  <path
                    d="M 1 32 Q 10 35, 21 44"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="1.8"
                    strokeDasharray="2,2"
                    className="opacity-80"
                  />
                  {/* Vessel icon pulse at LA port entrance */}
                  <circle cx="21" cy="44" r="2.5" fill="#f43f5e" className="animate-ping opacity-75" />
                </g>
              )}

              {/* 2. Drayage Highway Route (Pier 400 LA -> Austin Gigafactory) */}
              {(activeLayer === 'all' || activeLayer === 'road') && (
                <path
                  d="M 21 44 Q 25 46, 29 48"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.8"
                  strokeDasharray="1.5,1.5"
                  className="opacity-90"
                />
              )}

              {/* 3. Customer Delivery Routes (Austin -> Fremont & Cupertino) */}
              {(activeLayer === 'all' || activeLayer === 'road') && (
                <g>
                  <path
                    d="M 29 48 Q 24 43, 20 41"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="1.2"
                    strokeDasharray="1.5,1.5"
                    className="opacity-70"
                  />
                  <path
                    d="M 29 48 Q 23 44, 19 43"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="1.2"
                    strokeDasharray="1.5,1.5"
                    className="opacity-70"
                  />
                </g>
              )}

              {/* 4. Emergency Air Freight Corridor (Dresden -> Austin) */}
              {(activeLayer === 'all' || activeLayer === 'air') && (
                <path
                  d="M 52 33 Q 40 18, 29 48"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeDasharray="2,2"
                  className="opacity-85 animate-pulse"
                />
              )}
            </svg>

            {/* Interactive Pins / Nodes on Map */}
            {nodes.map(node => {
              const isSelected = selectedNodeId === node.id;
              let pinBg = 'bg-emerald-500';
              let ringColor = 'ring-emerald-400';
              if (node.status === 'critical') {
                pinBg = 'bg-rose-500';
                ringColor = 'ring-rose-400';
              } else if (node.status === 'warning') {
                pinBg = 'bg-amber-500';
                ringColor = 'ring-amber-400';
              }

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none transition-all ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full ${pinBg} ring-4 ${ringColor} ${
                      isSelected ? 'ring-offset-2 ring-offset-slate-950 ring-cyan-300' : 'ring-opacity-40'
                    } flex items-center justify-center text-white shadow-lg`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  {/* Pin Hover Label */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded shadow-xl whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-[10px] font-bold text-white block">{node.name}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Legend */}
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                Critical Bottleneck
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                At-Risk Customer / Dwell
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Nominal / Buffer Stock
              </span>
            </div>
            <div className="text-[11px] font-mono text-cyan-400">
              Click any pin on the map to inspect telemetry
            </div>
          </div>
        </div>

        {/* Node Telematics Dossier (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Location Telemetry
                </h3>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  selectedNode.status === 'critical'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : selectedNode.status === 'warning'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {selectedNode.status}
              </span>
            </div>

            {/* Selected Node Details */}
            <div>
              <div className="text-base font-extrabold text-white">{selectedNode.details.title}</div>
              <div className="text-xs text-cyan-400 font-medium mt-0.5">{selectedNode.subtitle}</div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {selectedNode.details.description}
              </p>
            </div>

            {/* Metrics List */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              {selectedNode.details.metrics.map((m, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <span className="text-slate-400">{m.label}</span>
                  <span className={`font-mono font-bold ${m.color || 'text-white'}`}>
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Live Samsara Telematics Feed Snippet */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-cyan-400" />
                  Associated IoT Sensor
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Streaming Live
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Device ID:</span>
                  <span className="text-cyan-400 font-bold">SAMSARA-UUID-9901</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Geofence:</span>
                  <span className="text-amber-400">Pier 400 APM Berth #4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Temperature:</span>
                  <span>21.4°C (Safe Passives Range)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last Fix:</span>
                  <span>33.7432° N, 118.2673° W</span>
                </div>
              </div>
            </div>

            {/* Contextual Action */}
            <button
              onClick={() => onOpenQuery(`What is our days of inventory and which plants are at starvation risk?`)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <span>Ask Conversational Engine About This Node</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
