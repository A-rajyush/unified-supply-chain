import React, { useState } from 'react';
import { SUPPLIERS, PARTS, QUALITY_INSPECTIONS, PRODUCT_CATEGORIES } from '../../data/mockSupplyChain';
import { GovernedCongruenceBanner } from './GovernedCongruenceBanner';
import {
  Briefcase,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileCheck,
  Building2,
  Scale,
  Zap,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Persona } from '../../types/ontology';

interface ProcurementDashboardProps {
  onSwitchPersona: (persona: Persona) => void;
  onOpenQuery: (query: string) => void;
}

export const ProcurementDashboard: React.FC<ProcurementDashboardProps> = ({
  onSwitchPersona,
  onOpenQuery
}) => {
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('SUP-02'); // Murata

  const selectedSupplier = SUPPLIERS.find(s => s.id === selectedSupplierId) || SUPPLIERS[0];
  const supplierInspections = QUALITY_INSPECTIONS.filter(q => q.supplierId === selectedSupplierId);

  // Canonical enterprise metrics (guaranteed invariant across personas)
  const canonicalOTD = 88.6;
  const canonicalFillRate = 93.8;
  const canonicalLandedCost = 148.20;

  return (
    <div className="space-y-6">
      {/* Governed Semantic Layer Proof Banner */}
      <GovernedCongruenceBanner currentPersona="procurement" onSwitchPersona={onSwitchPersona} />

      {/* Role Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Procurement & Sourcing Command
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                Vendor SLAs & True Landed Cost (TCO)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Governed procurement view tracking supplier contract compliance, tariff/freight variances, and incoming quality yields.
            </p>
          </div>
        </div>

        {/* Quick query buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onOpenQuery('Breakdown our landed cost per unit and explain freight tariff variances')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            Analyze Landed Cost
          </button>
          <button
            onClick={() => onOpenQuery('Which suppliers caused late shipments impacting customer orders?')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Supplier SLA Penalties
          </button>
        </div>
      </div>

      {/* Primary KPI Cards (Procurement Specific Visualizations) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* KPI 1: True Landed Cost */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Canonical True Landed Cost
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  ${canonicalLandedCost.toFixed(2)}
                </span>
                <span className="text-xs font-semibold text-rose-400 flex items-center gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5" /> +7.0% vs Frozen Std
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
              Std $138.50
            </span>
          </div>

          {/* Cost Composition Breakdown */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="text-xs text-slate-400 mb-1.5 flex justify-between">
              <span>Unit Cost Stackup ($/Unit):</span>
              <span className="text-slate-300 font-mono">Total $148.20</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex mb-2">
              <div className="bg-indigo-500 h-full w-[78%]" title="FOB Invoice: $115.60" />
              <div className="bg-cyan-500 h-full w-[12%]" title="Ocean/Air Freight: $17.80" />
              <div className="bg-amber-400 h-full w-[6%]" title="Customs & Tariffs: $8.90" />
              <div className="bg-rose-500 h-full w-[4%]" title="Demurrage Surcharges: $5.90" />
            </div>
            <div className="grid grid-cols-4 text-[10px] text-slate-400">
              <span className="text-indigo-400">FOB: 78%</span>
              <span className="text-cyan-400">Freight: 12%</span>
              <span className="text-amber-400">Tariff: 6%</span>
              <span className="text-rose-400">Dwell: 4%</span>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Harmonizes EDI 810 invoice, TMS freight bills, and CBP 7501 duty entries.</span>
          </div>
        </div>

        {/* KPI 2: Supplier OTD Performance */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Supplier Delivery SLA Adherence
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  {canonicalOTD}%
                </span>
                <span className="text-xs font-semibold text-amber-400">
                  Global Rate
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Contract SLA ≥ 95%
            </span>
          </div>

          {/* Supplier Performance Comparison */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">TSMC Silicon (Tier 1)</span>
              <span className="text-emerald-400 font-mono font-bold">98.2% OTD</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[98.2%]" />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Murata Micro (Tier 2)</span>
              <span className="text-rose-400 font-mono font-bold">81.5% OTD</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full w-[81.5%]" />
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Same canonical 88.6% as planning, decomposed by vendor contract tier.</span>
          </div>
        </div>

        {/* KPI 3: Incoming Quality Yield */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Incoming Quality Inspection Yield
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">
                  96.8%
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  SAP QALS Lots
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              Target ≥ 98%
            </span>
          </div>

          {/* Quality Disposition Breakdown */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="text-xs text-slate-400 mb-1.5 flex justify-between">
              <span>Lot Disposition Status:</span>
              <span className="text-rose-400 font-mono font-bold">1 Held / 1 RMA</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-lg">
                <div className="text-[10px] text-slate-400">Accepted</div>
                <div className="text-xs font-bold text-emerald-400">4 Lots</div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg">
                <div className="text-[10px] text-slate-400">Quarantine</div>
                <div className="text-xs font-bold text-amber-400">1 Lot (Murata)</div>
              </div>
              <div className="bg-rose-500/10 border border-rose-500/30 p-2 rounded-lg">
                <div className="text-[10px] text-slate-400">Vendor RMA</div>
                <div className="text-xs font-bold text-rose-400">1 Lot (Valeo)</div>
              </div>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Defective lots automatically subtracted from PO line fill credit.</span>
          </div>
        </div>
      </div>

      {/* Interactive Supplier Scorecard & Quality Inspector */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" />
              Supplier Contract SLA & Quality Yield Audit
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select a vendor to examine SLA breach penalties, lead time variance, and inspection lot dispositions.
            </p>
          </div>

          {/* Supplier Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto">
            {SUPPLIERS.map(sup => (
              <button
                key={sup.id}
                onClick={() => setSelectedSupplierId(sup.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  selectedSupplierId === sup.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {sup.code}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Supplier Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <span className="text-xs font-semibold text-slate-400">Vendor Profile</span>
            <h4 className="text-base font-bold text-white mt-1">{selectedSupplier.name}</h4>
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono">
                {selectedSupplier.tier}
              </span>
              <span>{selectedSupplier.country} ({selectedSupplier.region})</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400">Reliability Score:</span>
                <div className={`font-bold font-mono text-sm ${
                  selectedSupplier.reliabilityScore > 90 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {selectedSupplier.reliabilityScore} / 100
                </div>
              </div>
              <div>
                <span className="text-slate-400">Lead Time Drift:</span>
                <div className="font-bold text-white font-mono text-sm">
                  +{selectedSupplier.leadTimeVarianceDays} Days
                </div>
              </div>
            </div>
          </div>

          {/* Contract SLA Status & Penalty Risk */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-400" />
              Contract SLA & Penalty Exposure
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-xs text-slate-300">Contract Risk Tier:</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                selectedSupplier.contractRisk === 'High' || selectedSupplier.contractRisk === 'Critical'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              }`}>
                {selectedSupplier.contractRisk} Risk
              </span>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Contractual SLA Target:</span>
                <span className="text-white font-mono">95.0% OTD</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Actual Delivered OTD:</span>
                <span className={`font-mono font-bold ${
                  selectedSupplier.historicalOtdRate < 90 ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {selectedSupplier.historicalOtdRate}%
                </span>
              </div>
              {selectedSupplier.id === 'SUP-02' && (
                <div className="p-2 rounded bg-rose-950/40 border border-rose-500/40 text-rose-300 text-[11px] mt-2">
                  <strong>Liquidated Damages Triggered:</strong> $42,000 penalty clause active under Section 14.2 of Master Supply Agreement.
                </div>
              )}
            </div>
          </div>

          {/* Quality Inspection Lot Findings */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              Quality Inspection Batch Audit
            </span>
            {supplierInspections.length > 0 ? (
              <div className="mt-2 space-y-2 text-xs">
                {supplierInspections.map(insp => (
                  <div key={insp.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-white font-bold">{insp.inspectionBatchNumber}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        insp.disposition === 'Accepted'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : insp.disposition === 'Quarantine Held'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {insp.disposition}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>Defects: {insp.defectCount} / {insp.sampleSize}</span>
                      <span className="font-bold text-white">Yield: {insp.yieldPct}%</span>
                    </div>
                    {insp.failureMode !== 'Passed' && (
                      <div className="text-[10px] text-rose-400 mt-1">
                        Failure Mode: <strong>{insp.failureMode}</strong>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-400 mt-4 text-center py-4">
                No recent quality lot rejections recorded for this vendor.
              </div>
            )}
          </div>
        </div>

        {/* Global Supplier Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-3">Vendor Code</th>
                <th className="p-3">Supplier Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Tier & Region</th>
                <th className="p-3 text-right">Reliability Score</th>
                <th className="p-3 text-right">Delivered OTD</th>
                <th className="p-3 text-right">Lead Time Drift</th>
                <th className="p-3 text-center">Contract Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-mono text-[11px]">
              {SUPPLIERS.map(sup => (
                <tr
                  key={sup.id}
                  onClick={() => setSelectedSupplierId(sup.id)}
                  className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                    selectedSupplierId === sup.id ? 'bg-indigo-950/30' : ''
                  }`}
                >
                  <td className="p-3 font-bold text-cyan-400">{sup.code}</td>
                  <td className="p-3 font-sans font-semibold text-white">{sup.name}</td>
                  <td className="p-3 font-sans text-slate-300">{sup.primaryCategory}</td>
                  <td className="p-3 font-sans text-slate-400">{sup.tier} • {sup.region}</td>
                  <td className={`p-3 text-right font-bold ${
                    sup.reliabilityScore > 90 ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {sup.reliabilityScore}
                  </td>
                  <td className={`p-3 text-right font-bold text-sm ${
                    sup.historicalOtdRate < 85 ? 'text-rose-400' : sup.historicalOtdRate < 95 ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {sup.historicalOtdRate}%
                  </td>
                  <td className="p-3 text-right text-slate-300">
                    +{sup.leadTimeVarianceDays}d
                  </td>
                  <td className="p-3 text-center font-sans">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      sup.contractRisk === 'High'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : sup.contractRisk === 'Medium'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {sup.contractRisk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
