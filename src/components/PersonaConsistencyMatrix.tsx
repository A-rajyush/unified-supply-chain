import React from 'react';
import { Persona } from '../types/ontology';
import { Scale, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Building2, Factory, Truck } from 'lucide-react';

interface PersonaConsistencyMatrixProps {
  onSelectPersona: (p: Persona) => void;
  onOpenQuery: (query: string) => void;
}

export const PersonaConsistencyMatrix: React.FC<PersonaConsistencyMatrixProps> = ({
  onSelectPersona,
  onOpenQuery
}) => {
  const comparisonData = [
    {
      metric: 'On-Time Delivery (OTD)',
      canonicalValue: '88.6%',
      target: '≥ 95.0%',
      formula: 'COUNT(Delivered Orders ≤ Promised Date [Grace = 0d]) / COUNT(Total Promised Orders)',
      governanceRule: 'Zero-day grace period strictly enforced against frozen contract SLA dates.',
      planning: {
        focus: 'Assembly Schedule Realignment',
        interpretation: '6 of 8 customer build schedules met. Austin Line 2 delayed due to MLCC shortage.',
        action: 'Re-sequence assembly run; expedite buffer replenishment from European hub.'
      },
      procurement: {
        focus: 'Supplier Contract SLA Enforcement',
        interpretation: 'Murata delivered only 81.5% OTD, breaching the 95% contractual threshold.',
        action: 'Issue formal SLA violation notice; file liquidated damages claim ($42k penalty).'
      },
      logistics: {
        focus: 'Carrier Port Congestion & Transit Dwell',
        interpretation: 'Maersk ocean linehaul hit by 94.6h port dwell at Pier 400 Los Angeles terminal.',
        action: 'Authorize emergency drayage carrier bypass; reroute next container to Oakland.'
      }
    },
    {
      metric: 'Order Fill Rate',
      canonicalValue: '93.8%',
      target: '≥ 98.5%',
      formula: 'SUM(Physically Dispatched Units [EDI 856 ASN]) / SUM(Contracted Ordered Units)',
      governanceRule: 'Dispatched volume verified exclusively by physical warehouse goods issue.',
      planning: {
        focus: 'BOM Line Item Completeness',
        interpretation: '46,450 of 49,400 units fulfilled. Missing 2,950 units concentrated on Tesla & Apple orders.',
        action: 'Throttle final assembly output to match capacitor allocation; alert sales teams.'
      },
      procurement: {
        focus: 'Vendor Purchase Order Compliance',
        interpretation: 'Passive component category PO fulfillment at 72.0% due to supplier yield fallout.',
        action: 'Enforce second-source allocation with TDK/Yageo; audit supplier test logs.'
      },
      logistics: {
        focus: 'Shipping Consolidation & Container Utilization',
        interpretation: 'Partial shipment dispatches increase LCL freight cost by $18.50/cbm.',
        action: 'Consolidate backorders into dedicated air-freight charter to eliminate split consignments.'
      }
    },
    {
      metric: 'Days of Inventory (DOI)',
      canonicalValue: '36.4 Days',
      target: '35 - 45 Days',
      formula: 'Current Standard Cost Inventory Valuation ($242.9M) / Trailing 90D Daily COGS ($6.7M/day)',
      governanceRule: 'Evaluated exclusively using frozen standard cost FICO ledger valuation.',
      planning: {
        focus: 'Assembly Line Runway & Starvation',
        interpretation: 'Austin Gigafactory buffer is at 29.3 days, with MLCC passive runway at 4.6 days.',
        action: 'Trigger emergency stock rebalancing from Dresden plant to avert 48-hour line halt.'
      },
      procurement: {
        focus: 'Working Capital & Vendor Lead Times',
        interpretation: 'Total inventory commitment of $242.9M locks up working capital in Tier-1 fabs.',
        action: 'Transition high-volume standard passives to Vendor-Managed Inventory (VMI) terms.'
      },
      logistics: {
        focus: 'Warehouse Cubic Utilization',
        interpretation: '6 regional warehouses operating at 82.7% capacity utilization (Austin at 88.5%).',
        action: 'Reposition slow-moving buffer to Guadalajara overflow depot to free up central staging.'
      }
    },
    {
      metric: 'True Landed Cost (TCO)',
      canonicalValue: '$148.20 / Unit',
      target: 'Std $138.50',
      formula: 'FOB Invoice Cost + Allocated Linehaul Freight + Customs Duties + Demurrage Surcharges',
      governanceRule: '3-way automated matching of EDI 810 invoices, TMS freight bills, and CBP 7501 duties.',
      planning: {
        focus: 'Product Gross Margin & Bill of Materials',
        interpretation: 'Gross margin compressed by 2.4% due to expedited freight and demurrage surcharges.',
        action: 'Update target cost models for upcoming vehicle build cycle.'
      },
      procurement: {
        focus: 'Purchase Price Variance (PPV)',
        interpretation: '7.0% variance over frozen baseline cost driven by ocean carrier surcharges.',
        action: 'Re-negotiate annual container freight rate contracts with fixed bunker clauses.'
      },
      logistics: {
        focus: 'Demurrage Penalties & Mode Tradeoffs',
        interpretation: '$5.90/unit added by Pier 400 container demurrage and emergency air cargo.',
        action: 'Contract dedicated chassis pools to eliminate container dwell at marine terminals.'
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Cross-Persona Semantic Invariance Matrix
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Identical Resolution Verified
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Proof that regardless of whether Planning, Procurement, or Logistics asks the question, the <strong>canonical numbers never change</strong>. Only the contextual operational interpretation and action recommendations are tailored to that role.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="space-y-5">
        {comparisonData.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden"
          >
            {/* Top Bar: Metric, Value, Formula */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{item.metric}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                    Target: {item.target}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  Formula: {item.formula}
                </div>
              </div>

              {/* Shared Canonical Value Ribbon */}
              <div className="bg-slate-950 px-5 py-2.5 rounded-xl border border-cyan-500/30 flex items-center gap-3 shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    Enterprise Truth
                  </div>
                  <div className="text-2xl font-extrabold text-cyan-400 font-mono">
                    {item.canonicalValue}
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Personas Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {/* Planning Lens */}
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Factory className="w-4 h-4" />
                      Planning Persona
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Value: {item.canonicalValue}</span>
                  </div>
                  <div className="text-xs font-semibold text-white mb-1.5">{item.planning.focus}</div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {item.planning.interpretation}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-1">Recommended Action:</div>
                  <div className="text-slate-200">{item.planning.action}</div>
                </div>
              </div>

              {/* Procurement Lens */}
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-indigo-500/40 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" />
                      Procurement Persona
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Value: {item.canonicalValue}</span>
                  </div>
                  <div className="text-xs font-semibold text-white mb-1.5">{item.procurement.focus}</div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {item.procurement.interpretation}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider mb-1">Recommended Action:</div>
                  <div className="text-slate-200">{item.procurement.action}</div>
                </div>
              </div>

              {/* Logistics Lens */}
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Truck className="w-4 h-4" />
                      Logistics Persona
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Value: {item.canonicalValue}</span>
                  </div>
                  <div className="text-xs font-semibold text-white mb-1.5">{item.logistics.focus}</div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {item.logistics.interpretation}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-1">Recommended Action:</div>
                  <div className="text-slate-200">{item.logistics.action}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
