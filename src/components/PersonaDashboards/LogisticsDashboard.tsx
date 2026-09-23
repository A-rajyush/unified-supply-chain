import React, { useState } from 'react';
import { CARRIERS, SHIPMENTS, WAREHOUSES, IOT_TELEMATICS_RECORDS } from '../../data/mockSupplyChain';
import { GovernedCongruenceBanner } from './GovernedCongruenceBanner';
import {
  Truck,
  Ship,
  Radio,
  MapPin,
  Clock,
  Warehouse as WarehouseIcon,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Navigation,
  Thermometer,
  Zap
} from 'lucide-react';
import { Persona } from '../../types/ontology';

interface LogisticsDashboardProps {
  onSwitchPersona: (persona: Persona) => void;
  onOpenQuery: (query: string) => void;
}

export const LogisticsDashboard: React.FC<LogisticsDashboardProps> = ({
  onSwitchPersona,
  onOpenQuery
}) => {
  const [selectedCarrierId, setSelectedCarrierId] = useState<string>('CARR-01'); // Maersk

  const selectedCarrier = CARRIERS.find(c => c.id === selectedCarrierId) || CARRIERS[0];
  const carrierShipments = SHIPMENTS.filter(s => s.carrierId === selectedCarrierId);

  // Canonical enterprise metrics (guaranteed invariant across personas)
  const canonicalOTD = 88.6;
  const canonicalFillRate = 93.8;
  const canonicalDOI = 36.4;

  return (
    <div className="space-y-6">
      {/* Governed Semantic Layer Proof Banner */}
      <GovernedCongruenceBanner currentPersona="logistics" onSwitchPersona={onSwitchPersona} />

      {/* Role Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Logistics & Transportation Operations
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                Carrier Lanes • Port Dwell • IoT Telematics
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Governed logistics view tracking carrier transit reliability, ocean berth congestion, and warehouse capacity utilization.
            </p>
          </div>
        </div>

        {/* Quick query buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onOpenQuery('Which carriers are delayed in port dwell and what is the demurrage cost?')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Check Port Dwell
          </button>
          <button
            onClick={() => onOpenQuery('Show carrier on-time delivery scorecard and lane performance')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Carrier OTD Scorecard
          </button>
        </div>
      </div>

      {/* Primary KPI Cards (Logistics Specific Visualizations) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* KPI 1: Carrier On-Time Delivery */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Fleet & Carrier OTD Rate
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  {canonicalOTD}%
                </span>
                <span className="text-xs font-semibold text-amber-400">
                  Global Delivered Consignments
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              SLA Commit ≥ 92%
            </span>
          </div>

          {/* Carrier Mode Comparison */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Ship className="w-3.5 h-3.5 text-cyan-400" /> Ocean Freight (Maersk)
              </span>
              <span className="text-rose-400 font-mono font-bold">81.4% (Pier Dwell)</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full w-[81.4%]" />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-400" /> Air Cargo (Pacific Rim)
              </span>
              <span className="text-emerald-400 font-mono font-bold">97.6% (Fast lane)</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[97.6%]" />
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Harmonizes Manhattan TMS dispatch stamps with EDI 214 proof of delivery.</span>
          </div>
        </div>

        {/* KPI 2: Port Terminal Dwell & Demurrage */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Port Congestion Dwell Time
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-rose-400 tracking-tight">
                  94.6 hrs
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Pier 400 Los Angeles
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
              Limit &lt; 72.0 hrs
            </span>
          </div>

          {/* Demurrage Gauge */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>Demurrage Risk Exposure:</span>
              <span className="text-rose-400 font-mono font-bold">$2,800 Surcharge</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full w-[50%]" title="Allowed Free Time (0-48h)" />
              <div className="bg-amber-400 h-full w-[25%]" title="Warning Window (48-72h)" />
              <div className="bg-rose-500 h-full w-[25%]" title="Demurrage Penalty Incurred (>72h)" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0h</span>
              <span>48h (Free)</span>
              <span className="text-rose-400">72h (Penalty)</span>
              <span className="text-rose-400 font-bold">94.6h</span>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Verified in real-time via Samsara IoT geofence telemetry UUID IOT-9901.</span>
          </div>
        </div>

        {/* KPI 3: Regional Warehouse Capacity Utilization */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Network Warehouse Utilization
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  82.7%
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  2.1M sq ft network
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Optimal 75 - 85%
            </span>
          </div>

          {/* Capacity by Hub */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>Top Staged Hub:</span>
              <span className="text-cyan-400 font-mono">Shanghai DC: 91.2%</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">Austin Central Materials Buffer</span>
                <span className="text-amber-400 font-mono font-bold">88.5%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-[88.5%]" />
              </div>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Directly mapped to Days of Inventory: 36.4 days of stock across 6 warehouses.</span>
          </div>
        </div>
      </div>

      {/* Real-Time IoT Telematics & Carrier Lane Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Carrier Scorecards (Col 1 & 2) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-400" />
                Carrier SLA Performance & Compliance Matrix
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Standardized carrier on-time delivery across Ocean, Air, Rail, and Road transport modes.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto">
              {CARRIERS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCarrierId(c.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                    selectedCarrierId === c.id
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {c.scacCode}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Carrier Deep-Dive */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 mb-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">{selectedCarrier.name}</h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono">
                    SCAC: {selectedCarrier.scacCode}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Mode: <strong className="text-slate-200">{selectedCarrier.mode}</strong> • Active Fleet: {selectedCarrier.activeFleetSize.toLocaleString()} units
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                selectedCarrier.complianceRating === 'Preferred Tier-A'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : selectedCarrier.complianceRating === 'Approved Tier-B'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {selectedCarrier.complianceRating}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400">Contract SLA:</span>
                <div className="font-bold text-white font-mono text-sm">
                  {selectedCarrier.contractualSlaCommitmentPct}%
                </div>
              </div>
              <div>
                <span className="text-slate-400">Actual OTD:</span>
                <div className={`font-bold font-mono text-sm ${
                  selectedCarrier.actualOtdRatePct < selectedCarrier.contractualSlaCommitmentPct
                    ? 'text-rose-400'
                    : 'text-emerald-400'
                }`}>
                  {selectedCarrier.actualOtdRatePct}%
                </div>
              </div>
              <div>
                <span className="text-slate-400">Avg Port Turnaround:</span>
                <div className="font-bold text-white font-mono text-sm">
                  {selectedCarrier.avgPortTurnaroundHours} hrs
                </div>
              </div>
            </div>
          </div>

          {/* Active Carrier Shipments */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-3">Shipment No.</th>
                  <th className="p-3">BOL Number</th>
                  <th className="p-3">Mode</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Units</th>
                  <th className="p-3 text-right">Freight Cost</th>
                  <th className="p-3 text-center">Delay Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-mono text-[11px]">
                {carrierShipments.map(s => (
                  <tr key={s.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 font-bold text-cyan-400">{s.shipmentNumber}</td>
                    <td className="p-3 text-slate-300">{s.bolNumber}</td>
                    <td className="p-3 font-sans text-slate-300">{s.mode}</td>
                    <td className="p-3 font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.status === 'Delivered'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : s.status === 'Port Dwell'
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-cyan-500/20 text-cyan-400'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="p-3 text-right text-white font-bold">
                      {s.totalUnitsInTransit.toLocaleString()}
                    </td>
                    <td className="p-3 text-right text-slate-300">
                      ${s.freightCostUSD.toLocaleString()}
                    </td>
                    <td className="p-3 text-center font-sans">
                      {s.isDelayed ? (
                        <span className="text-rose-400 font-bold flex items-center justify-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                          +{s.delayDays}d ({s.delayReason})
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-medium">On Schedule</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Samsara IoT Telematics Feed (Col 3) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
                Live IoT Telematics Feed
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Samsara API Live
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Real-time temperature, dwell time, and geofence status streaming directly from active freight containers.
            </p>

            <div className="space-y-3">
              {IOT_TELEMATICS_RECORDS.slice(0, 4).map(iot => (
                <div
                  key={iot.deviceUuid}
                  className={`p-3 rounded-xl border text-xs ${
                    iot.anomalyDetected
                      ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-white">{iot.deviceUuid}</span>
                    <span className="text-[10px] text-slate-400">{iot.geofenceStatus}</span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{iot.locationName}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                      <span>{iot.tempCelsius}°C</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 justify-end">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Dwell: {iot.dwellHours}h</span>
                    </div>
                  </div>

                  {iot.anomalyDetected && (
                    <div className="mt-2 text-[10px] text-rose-400 font-sans font-medium flex items-start gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{iot.anomalyMessage}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <button
              onClick={() => onOpenQuery('Which shipments have IoT anomalies and exceed port dwell limits?')}
              className="w-full py-2 px-3 text-xs font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
            >
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>Diagnose Active IoT Alerts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
