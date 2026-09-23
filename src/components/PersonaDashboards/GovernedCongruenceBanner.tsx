import React, { useState } from 'react';
import { Persona } from '../../types/ontology';
import { ShieldCheck, Info, CheckCircle2, ArrowRight, Sparkles, Scale } from 'lucide-react';

interface GovernedCongruenceBannerProps {
  currentPersona: Persona;
  onSwitchPersona: (persona: Persona) => void;
}

export const GovernedCongruenceBanner: React.FC<GovernedCongruenceBannerProps> = ({
  currentPersona,
  onSwitchPersona
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const canonicalTruths = [
    {
      metric: 'On-Time Delivery (OTD)',
      value: '88.6%',
      target: '≥ 95.0%',
      formula: 'COUNT(Delivered Orders ≤ Promised Date [Grace = 0d]) / COUNT(Total Promised Orders)',
      sourceOfTruth: 'view_governed_on_time_delivery (ERP LIKP + TMS act_deliv_ts)',
      planningLens: 'Indicates assembly reschedule needed for Austin Line 2',
      procurementLens: 'Triggers liquidated damages claim against Murata ($42k penalty)',
      logisticsLens: 'Identifies carrier MAEU ocean port congestion at Pier 400'
    },
    {
      metric: 'Order Fill Rate',
      value: '93.8%',
      target: '≥ 98.5%',
      formula: 'SUM(Physically Dispatched Units [EDI 856 Verified]) / SUM(Contracted Ordered Units)',
      sourceOfTruth: 'view_governed_fill_rate (ERP VBAP + EDI 856 ASN)',
      planningLens: '1,900 units missing in Austin inventory buffer',
      procurementLens: 'Vendor PO fulfillment gap of 6.2% on passive capacitors',
      logisticsLens: 'Prevents split-shipment dispatch to avoid excess freight surcharges'
    },
    {
      metric: 'Days of Inventory (DOI)',
      value: '36.4 Days',
      target: '30 - 45 Days',
      formula: 'Current Standard Cost Inventory Valuation ($242.9M) / Trailing 90D Daily COGS ($6.7M/day)',
      sourceOfTruth: 'view_governed_days_of_inventory (ERP MARD + FICO Ledger)',
      planningLens: 'Austin plant inventory runway critical at 29.3 days',
      procurementLens: 'Working capital commitment locked in European fabs',
      logisticsLens: 'Warehouse capacity utilization across 6 regional depots'
    },
    {
      metric: 'True Landed Cost (TCO)',
      value: '$148.20 / Unit',
      target: 'Benchmark: $138.50',
      formula: 'FOB Invoice Cost + Allocated Container Linehaul + Tariffs + Demurrage Penalties',
      sourceOfTruth: 'view_governed_landed_cost (EDI 810 + TMS Freight + CBP 7501)',
      planningLens: 'Impacts final BOM margin on next quarter vehicle release',
      procurementLens: '7.0% variance over frozen standard baseline cost',
      logisticsLens: 'Ocean vs Air cargo tradeoff analysis on emergency transfers'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 rounded-2xl p-5 mb-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">
        <div className="flex items-start gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 shadow-inner">
            <Scale className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-white tracking-tight">
                Governed Semantic Consistency Enforcement
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Zero Semantic Drift Certified
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Active Persona: <span className="capitalize text-cyan-400 font-semibold">{currentPersona}</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Every department views their operational drilldowns through this dashboard, but the underlying <strong>canonical metrics resolve identically</strong> across Planning, Procurement, and Logistics. No disparate spreadsheets, no conflicting definition disputes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all shadow-sm"
          >
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            {showDetails ? 'Hide Congruence Matrix' : 'Inspect Semantic Proof'}
          </button>
        </div>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800/80">
        {canonicalTruths.map(item => (
          <div
            key={item.metric}
            className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 hover:border-cyan-500/40 transition-all"
          >
            <div className="text-[11px] font-medium text-slate-400 truncate">{item.metric}</div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-lg font-extrabold text-white tracking-tight">{item.value}</span>
              <span className="text-[10px] text-slate-400">Target {item.target}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-1 text-[10px] font-medium text-emerald-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>Exact across all personas</span>
            </div>
          </div>
        ))}
      </div>

      {/* Expandable Congruence Proof Matrix */}
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 animate-fadeIn">
          <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Semantic Invariance Proof: Identical Calculation vs Diverse Operational Lenses
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-2.5">Canonical Metric</th>
                  <th className="p-2.5">Certified Value</th>
                  <th className="p-2.5">Mathematical Governance Rule</th>
                  <th className="p-2.5 text-emerald-400">Planning Lens</th>
                  <th className="p-2.5 text-indigo-400">Procurement Lens</th>
                  <th className="p-2.5 text-amber-400">Logistics Lens</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-mono text-[11px]">
                {canonicalTruths.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-2.5 font-bold text-white font-sans whitespace-nowrap">{row.metric}</td>
                    <td className="p-2.5 font-bold text-cyan-400 whitespace-nowrap">{row.value}</td>
                    <td className="p-2.5 text-slate-300 max-w-xs truncate" title={row.formula}>
                      {row.formula}
                    </td>
                    <td className="p-2.5 text-emerald-300 font-sans">{row.planningLens}</td>
                    <td className="p-2.5 text-indigo-300 font-sans">{row.procurementLens}</td>
                    <td className="p-2.5 text-amber-300 font-sans">{row.logisticsLens}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
            <span>Want to test how the dashboard alters its operational perspective?</span>
            <div className="flex gap-2">
              {(['planning', 'procurement', 'logistics'] as Persona[]).map(p => (
                <button
                  key={p}
                  onClick={() => onSwitchPersona(p)}
                  className={`capitalize px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                    currentPersona === p
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  View as {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
