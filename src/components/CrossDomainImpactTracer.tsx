import React, { useState } from 'react';
import {
  AlertTriangle,
  Building2,
  Package,
  Factory,
  Users,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Radio,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface CrossDomainImpactTracerProps {
  onOpenQuery: (query: string) => void;
}

export const CrossDomainImpactTracer: React.FC<CrossDomainImpactTracerProps> = ({
  onOpenQuery
}) => {
  const [selectedNode, setSelectedNode] = useState<'supplier' | 'part' | 'shipment' | 'plant' | 'customer'>('shipment');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 shadow-inner">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Cross-Domain Root Cause & Blast Radius Tracer
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Active Starvation Incident
                </span>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Multi-Echelon Propagation
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Demonstrating end-to-end traversal across siloed domains: <strong>Supplier Quality Defect → Delayed Ocean Transit → Port Pier 400 Berth Dwell → Assembly Line Starvation → Customer Order Breach ($2.29M At-Risk)</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenQuery('Which suppliers caused late shipments impacting customer orders?')}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all self-start lg:self-center"
          >
            <span>Ask Conversational Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Step-by-Step Propagation Flow */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Incident Propagation Path (Click any node to inspect domain evidence)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Node 1: Supplier */}
          <button
            onClick={() => setSelectedNode('supplier')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedNode === 'supplier'
                ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-400 text-white'
                : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>01. Root Cause</span>
              <Building2 className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-sm font-bold text-white mt-1">Murata Micro</div>
            <div className="text-[11px] text-rose-400 font-medium mt-1">
              Quality Hold & 5d Delay
            </div>
            <div className="text-[10px] text-slate-500 mt-2">Kyoto, Japan</div>
          </button>

          {/* Node 2: Part */}
          <button
            onClick={() => setSelectedNode('part')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedNode === 'part'
                ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-400 text-white'
                : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>02. Critical SKU</span>
              <Package className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-sm font-bold text-white mt-1">MLCC-0402</div>
            <div className="text-[11px] text-rose-400 font-medium mt-1">
              Runway: 4.6 Days Left
            </div>
            <div className="text-[10px] text-slate-500 mt-2">100nF High-Q Cap</div>
          </button>

          {/* Node 3: Shipment */}
          <button
            onClick={() => setSelectedNode('shipment')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedNode === 'shipment'
                ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-400 text-white'
                : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>03. Logistics Dwell</span>
              <Radio className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-sm font-bold text-white mt-1">SHP-7021 (Maersk)</div>
            <div className="text-[11px] text-rose-400 font-medium mt-1">
              Pier 400 Dwell: 94.6h
            </div>
            <div className="text-[10px] text-slate-500 mt-2">Port of Los Angeles</div>
          </button>

          {/* Node 4: Plant */}
          <button
            onClick={() => setSelectedNode('plant')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedNode === 'plant'
                ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-400 text-white'
                : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>04. Assembly Plant</span>
              <Factory className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm font-bold text-white mt-1">Austin Fab</div>
            <div className="text-[11px] text-rose-400 font-medium mt-1">
              Line 2 Starvation
            </div>
            <div className="text-[10px] text-slate-500 mt-2">Halt in 48 Hours</div>
          </button>

          {/* Node 5: Customer */}
          <button
            onClick={() => setSelectedNode('customer')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedNode === 'customer'
                ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-400 text-white'
                : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>05. Impacted Clients</span>
              <Users className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-sm font-bold text-white mt-1">Tesla & Apple</div>
            <div className="text-[11px] text-rose-400 font-medium mt-1">
              $2,295,000 At-Risk
            </div>
            <div className="text-[10px] text-slate-500 mt-2">Orders 9904 & 9908</div>
          </button>
        </div>
      </div>

      {/* Selected Node Evidence Dossier */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        {selectedNode === 'supplier' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-400" />
                Root Cause Domain: Supplier Manufacturing & Quality SLA
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                SLA Breach Confirmed
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Vendor:</span>
                <div className="font-bold text-white text-sm mt-0.5">Murata Manufacturing Co. (SUP-02)</div>
                <div className="text-slate-400 mt-1">Kyoto, Japan • Tier 2 Passive Component Supplier</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Quality Inspection Lot:</span>
                <div className="font-bold text-amber-400 text-sm mt-0.5">QI-2026-082 (Quarantine Held)</div>
                <div className="text-slate-400 mt-1">Yield 92.2% • Solderability Oxidation in Terminals</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Contract Penalty Exposure:</span>
                <div className="font-bold text-rose-400 text-sm mt-0.5">$42,000 Liquidated Damages</div>
                <div className="text-slate-400 mt-1">Clause 14.2 Master Supply Agreement Enforced</div>
              </div>
            </div>
          </div>
        )}

        {selectedNode === 'part' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-cyan-400" />
                Critical SKU Domain: Inventory Stockout Vulnerability
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                Runway Critical: 4.6 Days
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Part SKU:</span>
                <div className="font-bold text-white text-sm mt-0.5">MLCC-0402-100NF (PART-02)</div>
                <div className="text-slate-400 mt-1">Multi-Layer Ceramic Capacitor 0402 100nF</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Current Stock vs Safety Stock:</span>
                <div className="font-bold text-rose-400 text-sm mt-0.5">210,000 Units (Safety: 500,000)</div>
                <div className="text-slate-400 mt-1">Deficit: -290,000 units below minimum threshold</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Daily Consumption:</span>
                <div className="font-bold text-white text-sm mt-0.5">45,000 Units / Day</div>
                <div className="text-slate-400 mt-1">Exhaustion predicted at 2026-09-25 14:00 UTC</div>
              </div>
            </div>
          </div>
        )}

        {selectedNode === 'shipment' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-amber-400" />
                Logistics & Telematics Domain: Port Congestion Dwell
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                Dwell Exceeds Max SLA by 22.6 Hours
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Ocean Consignment:</span>
                <div className="font-bold text-white text-sm mt-0.5">SHP-7021 (Maersk Line)</div>
                <div className="text-slate-400 mt-1">BOL: MAEU-982341 • Container MSKU-8472910</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Samsara IoT Telematics:</span>
                <div className="font-bold text-amber-400 text-sm mt-0.5">UUID IOT-9901 (Port Terminal Dwell)</div>
                <div className="text-slate-400 mt-1">Location: Pier 400 Los Angeles • Dwell: 94.6 Hours</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Demurrage Penalties Incurred:</span>
                <div className="font-bold text-rose-400 text-sm mt-0.5">$2,800 Excess Port Storage</div>
                <div className="text-slate-400 mt-1">Allocated into Landed Cost Semantic Model</div>
              </div>
            </div>
          </div>
        )}

        {selectedNode === 'plant' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Factory className="w-5 h-5 text-emerald-400" />
                Manufacturing Domain: Assembly Starvation Risk
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                Austin Gigafactory Line 2
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Impacted Plant:</span>
                <div className="font-bold text-white text-sm mt-0.5">Austin Gigafactory (PLANT-01)</div>
                <div className="text-slate-400 mt-1">Central Texas Advanced Assembly Campus</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Assembly Line 2 Status:</span>
                <div className="font-bold text-rose-400 text-sm mt-0.5">Line Starvation in 48 Hours</div>
                <div className="text-slate-400 mt-1">Requires emergency internal stock transfer from Dresden</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Plant Inventory Runway:</span>
                <div className="font-bold text-amber-400 text-sm mt-0.5">29.3 Days Total Valuation</div>
                <div className="text-slate-400 mt-1">Distorted by high SoC stock, bottlenecked on passive MLCCs</div>
              </div>
            </div>
          </div>
        )}

        {selectedNode === 'customer' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-400" />
                Commercial Domain: Downstream Customer Exposure
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                $2,295,000 Revenue At-Risk
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex justify-between font-bold text-sm">
                  <span className="text-white">Tesla Motors (CUST-01)</span>
                  <span className="text-rose-400">$875,000 At-Risk</span>
                </div>
                <div className="text-slate-300 mt-2">
                  Order <strong>SO-2026-9904</strong>: 2,500 contracted units, only 1,800 fulfilled (72% fill rate). Promised delivery date 2026-09-20 breached.
                </div>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex justify-between font-bold text-sm">
                  <span className="text-white">Apple Enterprise (CUST-02)</span>
                  <span className="text-rose-400">$1,420,000 At-Risk</span>
                </div>
                <div className="text-slate-300 mt-2">
                  Order <strong>SO-2026-9908</strong>: 4,500 contracted units, 3,200 fulfilled (71% fill rate). Promised delivery date 2026-09-22 breached.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
