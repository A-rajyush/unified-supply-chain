import React, { useState } from 'react';
import {
  Sliders,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Clock,
  Truck,
  Factory,
  Building2,
  ShieldCheck,
  Send,
  Zap,
  Activity
} from 'lucide-react';
import { Persona } from '../types/ontology';

interface RemediationSimulatorProps {
  onOpenQuery: (query: string) => void;
  onSelectPersona?: (p: Persona) => void;
}

export const RemediationSimulator: React.FC<RemediationSimulatorProps> = ({
  onOpenQuery
}) => {
  // Lever States
  const [airCharterDresden, setAirCharterDresden] = useState<boolean>(true);
  const [dualSourceAllocation, setDualSourceAllocation] = useState<number>(30); // percentage to TDK
  const [portPriorityPeelPile, setPortPriorityPeelPile] = useState<boolean>(true);
  const [claimLiquidatedDamages, setClaimLiquidatedDamages] = useState<boolean>(true);
  const [resequenceLine2, setResequenceLine2] = useState<boolean>(false);
  const [dispatched, setDispatched] = useState<boolean>(false);

  // Baseline situation
  // Starvation: 48h halt, At-risk revenue: $2,295,000, Landed Cost: $148.20, Austin MLCC runway: 4.6 days

  // Dynamic calculations based on levers
  const expediteCost = airCharterDresden ? 18500 : 0;
  const portPeelPileCost = portPriorityPeelPile ? 3200 : 0;
  const dualSourceCostDelta = Math.round(dualSourceAllocation * 220); // slight unit cost premium
  const penaltiesRecovered = claimLiquidatedDamages ? 42000 : 0;

  const totalActionCost = expediteCost + portPeelPileCost + dualSourceCostDelta;
  const netFinancialImpact = penaltiesRecovered - totalActionCost;

  // Assembly Line 2 Halting avoided
  const lineHaltingAverted = airCharterDresden || (portPriorityPeelPile && dualSourceAllocation >= 40);
  const customerRevenueProtected = lineHaltingAverted ? 2295000 : Math.round(2295000 * (dualSourceAllocation / 100));
  const remainingAtRisk = 2295000 - customerRevenueProtected;

  // Projected Runway
  const projectedRunwayDays = (
    4.6 +
    (airCharterDresden ? 14.5 : 0) +
    (portPriorityPeelPile ? 8.2 : 0) +
    (dualSourceAllocation * 0.15)
  ).toFixed(1);

  // Projected Landed Cost
  const projectedLandedCost = (
    148.20 +
    (airCharterDresden ? 0.90 : 0) +
    (portPriorityPeelPile ? 0.15 : 0) -
    (claimLiquidatedDamages ? 0.70 : 0)
  ).toFixed(2);

  // Projected OTD
  const projectedOTD = lineHaltingAverted ? '96.2%' : (88.6 + dualSourceAllocation * 0.1).toFixed(1) + '%';

  const handleReset = () => {
    setAirCharterDresden(false);
    setDualSourceAllocation(0);
    setPortPriorityPeelPile(false);
    setClaimLiquidatedDamages(false);
    setResequenceLine2(false);
    setDispatched(false);
  };

  const handleApplyPreset = (preset: 'optimal' | 'conservative' | 'aggressive') => {
    if (preset === 'optimal') {
      setAirCharterDresden(true);
      setDualSourceAllocation(30);
      setPortPriorityPeelPile(true);
      setClaimLiquidatedDamages(true);
      setResequenceLine2(false);
    } else if (preset === 'conservative') {
      setAirCharterDresden(false);
      setDualSourceAllocation(50);
      setPortPriorityPeelPile(true);
      setClaimLiquidatedDamages(true);
      setResequenceLine2(true);
    } else {
      setAirCharterDresden(true);
      setDualSourceAllocation(60);
      setPortPriorityPeelPile(true);
      setClaimLiquidatedDamages(true);
      setResequenceLine2(true);
    }
    setDispatched(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  What-If Remediation Simulator & Action Orchestrator
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  Prescriptive Twin Active
                </span>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Target Incident: MLCC Stockout & Pier 400 Dwell
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Test multi-domain mitigation actions across logistics expediting, supplier re-allocation, port queue bypass, and contract SLA penalty enforcement before dispatching instructions to ERP/TMS.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center">
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Levers</span>
            </button>
            <button
              onClick={() => onOpenQuery('Which suppliers caused late shipments impacting customer orders?')}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all"
            >
              <span>View Blast Radius</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Presets Strip */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Simulated Playbooks:
          </span>
          <button
            onClick={() => handleApplyPreset('optimal')}
            className="px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all"
          >
            Recommended: Air Charter + Port Bypass + SLA Claim
          </button>
          <button
            onClick={() => handleApplyPreset('conservative')}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition-all"
          >
            Low Freight Cost: Port Bypass + 50% Dual Sourcing
          </button>
          <button
            onClick={() => handleApplyPreset('aggressive')}
            className="px-3 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-all"
          >
            Maximum Resilience: Full Air Charter + 60% Secondary + Re-sequence
          </button>
        </div>
      </div>

      {/* Main Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Action Control Levers (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                Intervention Levers & Operational Controls
              </h3>
              <span className="text-[11px] text-slate-400">Toggle or adjust each remediation lever</span>
            </div>

            <div className="space-y-4">
              {/* Lever 1: Air Charter from Dresden */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  airCharterDresden
                    ? 'bg-slate-950 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                        airCharterDresden ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">
                          Inter-Plant Emergency Air Charter (Dresden → Austin)
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                          ETA: 18h
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Transfers 50,000 units of MLCC-0402 buffer stock from European Fab (Dresden) via chartered Lufthansa Cargo Boeing 777F straight into Austin Bergstrom airport.
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[11px]">
                        <span className="text-amber-400 font-semibold font-mono">Freight Surcharge: +$18,500</span>
                        <span className="text-emerald-400 font-semibold">Solves Line 2 starvation immediately</span>
                      </div>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={airCharterDresden}
                    onChange={e => setAirCharterDresden(e.target.checked)}
                    className="h-5 w-5 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500 shrink-0 cursor-pointer mt-1"
                  />
                </div>
              </div>

              {/* Lever 2: Secondary Source Volume Allocation (TDK / Yageo) */}
              <div className="p-4 rounded-xl border bg-slate-950 border-slate-800 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 w-full">
                    <div className="h-9 w-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">
                            Secondary Source Dual Allocation (TDK / Yageo)
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                            SLA: 48h Dispatch
                          </span>
                        </div>
                        <span className="text-sm font-extrabold text-indigo-400 font-mono">
                          {dualSourceAllocation}% Allocation
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Diverts replenishment purchase orders away from Murata Kyoto (currently held in quality quarantine) to qualified second-source fab TDK Electronics.
                      </p>

                      {/* Slider */}
                      <div className="mt-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="10"
                          value={dualSourceAllocation}
                          onChange={e => setDualSourceAllocation(Number(e.target.value))}
                          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                          <span>0% (Murata Only)</span>
                          <span>30% Recommended</span>
                          <span>60% Balanced</span>
                          <span>100% Full Cutover</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-2 text-[11px]">
                        <span className="text-indigo-300 font-mono">
                          Cost Delta: +${dualSourceCostDelta.toLocaleString()}
                        </span>
                        <span className="text-slate-400">
                          Adds {Math.round(dualSourceAllocation * 0.15)} days buffer runway
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lever 3: Pier 400 Off-Dock Drayage Pull & Peel-Pile Priority */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  portPriorityPeelPile
                    ? 'bg-slate-950 border-amber-500/50 shadow-md ring-1 ring-amber-500/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                        portPriorityPeelPile ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">
                          Port Terminal Off-Dock Drayage Pull (Pier 400 LA)
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                          Dwell Drop: 94.6h → 18.0h
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Authorizes dedicated peel-pile drayage driver bypass at APM Terminals Pier 400 to extract container MSKU-8472910 immediately onto direct team-driver sleeper truck to Austin.
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[11px]">
                        <span className="text-amber-400 font-mono">Priority Chassis Surcharge: +$3,200</span>
                        <span className="text-emerald-400">Eliminates further demurrage fees</span>
                      </div>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={portPriorityPeelPile}
                    onChange={e => setPortPriorityPeelPile(e.target.checked)}
                    className="h-5 w-5 rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-amber-500 shrink-0 cursor-pointer mt-1"
                  />
                </div>
              </div>

              {/* Lever 4: Enforce Contractual SLA Liquidated Damages Claim */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  claimLiquidatedDamages
                    ? 'bg-slate-950 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                        claimLiquidatedDamages ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">
                          Enforce MSA Clause 14.2 Supplier SLA Debit Note
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          +$42,000 Liquidated Damages
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Issues formal debit invoice deduction against Murata Accounts Payable to recover full expediting and disruption penalties incurred due to QI-2026-082 quarantine.
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[11px]">
                        <span className="text-emerald-400 font-bold font-mono">Offset: -$42,000 to Landed Cost</span>
                        <span className="text-slate-400">Fully offsets emergency air freight fees</span>
                      </div>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={claimLiquidatedDamages}
                    onChange={e => setClaimLiquidatedDamages(e.target.checked)}
                    className="h-5 w-5 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500 shrink-0 cursor-pointer mt-1"
                  />
                </div>
              </div>

              {/* Lever 5: Dynamic Assembly Line 2 Re-Sequencing */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  resequenceLine2
                    ? 'bg-slate-950 border-purple-500/50 shadow-md ring-1 ring-purple-500/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                        resequenceLine2 ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Factory className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">
                          Dynamic Assembly Schedule Re-Sequencing
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                          Factory Sched
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Re-sequences Austin Line 2 to build unconstrained Model Y standard powertrain units during the 18h air-transit window, preserving technician shifts without idle time.
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[11px]">
                        <span className="text-purple-300 font-mono">Zero Line Idle Overhead</span>
                        <span className="text-slate-400">Protects manufacturing OEE</span>
                      </div>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={resequenceLine2}
                    onChange={e => setResequenceLine2(e.target.checked)}
                    className="h-5 w-5 rounded bg-slate-900 border-slate-700 text-purple-500 focus:ring-purple-500 shrink-0 cursor-pointer mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Simulated Impact Outcome & Live Dispatcher (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Real-Time Outcome Cockpit */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Projected Simulated Outcomes
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Calculated in Real-Time
              </span>
            </div>

            {/* Status Hero: Line Starvation Status */}
            <div
              className={`p-4 rounded-xl border flex items-center justify-between ${
                lineHaltingAverted
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {lineHaltingAverted ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-7 h-7 text-rose-400 shrink-0" />
                )}
                <div>
                  <div className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    Austin Line 2 Production Status
                  </div>
                  <div className="text-base font-extrabold text-white mt-0.5">
                    {lineHaltingAverted ? 'HALT AVERTED — Continuous Run' : 'CRITICAL STARVATION RISK'}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {lineHaltingAverted
                      ? 'Component delivery ETA precedes buffer exhaustion by 30 hours'
                      : 'Line 2 will run out of MLCCs in 48 hours without air charter'}
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Metric Cards Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Customer Revenue Protected:</span>
                <div className="text-lg font-bold text-emerald-400 mt-1 font-mono">
                  ${customerRevenueProtected.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Remaining At-Risk: ${remainingAtRisk.toLocaleString()}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Austin Plant Runway:</span>
                <div className="text-lg font-bold text-cyan-400 mt-1 font-mono">
                  {projectedRunwayDays} Days
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Baseline: 4.6 Days (MLCC)
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Projected OTD:</span>
                <div className="text-lg font-bold text-white mt-1 font-mono">
                  {projectedOTD}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Baseline SLA: 88.6%
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Net Financial Impact:</span>
                <div
                  className={`text-lg font-bold mt-1 font-mono ${
                    netFinancialImpact >= 0 ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {netFinancialImpact >= 0 ? '+' : ''}${netFinancialImpact.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Penalties minus Expedite Cost
                </div>
              </div>
            </div>

            {/* Projected Landed Cost Strip */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Projected True Landed Cost:</span>
                <div className="text-xs text-slate-300 mt-0.5">
                  Baseline: $148.20 → Projected: <strong>${projectedLandedCost} / unit</strong>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400">Variance</span>
                <div className="text-sm font-bold text-emerald-400 font-mono">
                  {(Number(projectedLandedCost) - 148.20) > 0 ? '+' : ''}
                  {(Number(projectedLandedCost) - 148.20).toFixed(2)} $/unit
                </div>
              </div>
            </div>

            {/* Dispatch Action Button & Automated Integration */}
            <div className="pt-2">
              {!dispatched ? (
                <button
                  onClick={() => setDispatched(true)}
                  disabled={!lineHaltingAverted && customerRevenueProtected === 0}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>Dispatch Orchestration to ERP & TMS</span>
                </button>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500 text-emerald-200 text-xs space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Orchestration Instructions Successfully Dispatched</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-300 font-mono pl-6">
                    <div>✓ SAP S/4HANA: Created STO #450098231 (Dresden → Austin)</div>
                    <div>✓ Manhattan TMS: Dispatched Air Freight Charter LH-Cargo 777F</div>
                    <div>✓ APM Terminals Pier 400: Off-dock drayage pull token assigned</div>
                    <div>✓ FICO Ledger: Posted $42,000 SLA penalty debit note against Murata</div>
                  </div>
                  <button
                    onClick={() => setDispatched(false)}
                    className="mt-2 text-[10px] text-emerald-400 hover:underline font-semibold"
                  >
                    Modify Scenario Levers
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
