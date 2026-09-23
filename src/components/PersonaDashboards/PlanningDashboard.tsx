import React, { useState } from 'react';
import { PLANTS, PARTS, WAREHOUSES, ORDERS } from '../../data/mockSupplyChain';
import { GovernedCongruenceBanner } from './GovernedCongruenceBanner';
import {
  AlertTriangle,
  Factory,
  Layers,
  Clock,
  CheckCircle2,
  TrendingDown,
  Warehouse as WarehouseIcon,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  Zap
} from 'lucide-react';
import { Persona } from '../../types/ontology';

interface PlanningDashboardProps {
  onSwitchPersona: (persona: Persona) => void;
  onOpenQuery: (query: string) => void;
}

export const PlanningDashboard: React.FC<PlanningDashboardProps> = ({
  onSwitchPersona,
  onOpenQuery
}) => {
  const [selectedPlantId, setSelectedPlantId] = useState<string>('PLANT-01'); // Austin

  const selectedPlant = PLANTS.find(p => p.id === selectedPlantId) || PLANTS[0];
  const plantParts = PARTS.filter(p => p.plantId === selectedPlantId);
  const plantWarehouse = WAREHOUSES.find(w => w.plantId === selectedPlantId);

  // Canonical metric values (guaranteed invariant across enterprise)
  const canonicalOTD = 88.6;
  const canonicalFillRate = 93.8;
  const canonicalDOI = 36.4;

  return (
    <div className="space-y-6">
      {/* Governed Semantic Layer Proof Banner */}
      <GovernedCongruenceBanner currentPersona="planning" onSwitchPersona={onSwitchPersona} />

      {/* Role Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Factory className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Supply Chain Planning Cockpit
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                Production & Runway Optimization
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Governed operational view monitoring assembly buffers, line starvation risks, and build schedule fulfillment.
            </p>
          </div>
        </div>

        {/* Quick query buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onOpenQuery('What is our days of inventory and which plants are at starvation risk?')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Query DOI Runway
          </button>
          <button
            onClick={() => onOpenQuery('Show fill rate shortfall impacting customer orders')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            Query Fill Rate Deficit
          </button>
        </div>
      </div>

      {/* Primary KPI Cards (Planning Specific Visualizations) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* KPI 1: Days of Inventory (DOI) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Enterprise Inventory Runway
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  {canonicalDOI}
                </span>
                <span className="text-sm font-semibold text-slate-400">Days of Inventory</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Target 35 - 45d
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
              <span>Runway by Plant Buffer:</span>
              <span className="text-cyan-400 font-mono">Austin: 29.3d (Critical)</span>
            </div>
            {/* Visual Runway Bar */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
              <div className="bg-rose-500 h-full w-[25%]" title="Starvation Danger Zone (<20d)" />
              <div className="bg-amber-400 h-full w-[20%]" title="Buffer Warning (20-30d)" />
              <div className="bg-emerald-500 h-full w-[55%]" title="Healthy Safety Stock (30-60d)" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0d</span>
              <span className="text-rose-400">Min Buffer 20d</span>
              <span>Target 40d</span>
              <span>60d</span>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Exact enterprise formula: Total On-Hand Val ($242.9M) ÷ Trailing Daily COGS ($6.7M/d)</span>
          </div>
        </div>

        {/* KPI 2: On-Time Delivery (OTD) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Production Schedule Adherence
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  {canonicalOTD}%
                </span>
                <span className="text-sm font-semibold text-rose-400 flex items-center gap-0.5">
                  <TrendingDown className="w-3.5 h-3.5" /> -6.4% vs SLA
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
              SLA SLA ≥ 95.0%
            </span>
          </div>

          {/* Mini Assembly Schedule Timeline */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="text-xs text-slate-400 mb-2 flex justify-between">
              <span>Factory Dispatch Status:</span>
              <span className="text-slate-300 font-mono">6 of 8 Orders On-Time</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              <div className="bg-emerald-500/20 border border-emerald-500/40 p-1.5 rounded text-center">
                <div className="text-[10px] text-slate-400">AMER Fab</div>
                <div className="text-xs font-bold text-emerald-400">75.0%</div>
              </div>
              <div className="bg-emerald-500/20 border border-emerald-500/40 p-1.5 rounded text-center">
                <div className="text-[10px] text-slate-400">EMEA Fab</div>
                <div className="text-xs font-bold text-emerald-400">100%</div>
              </div>
              <div className="bg-emerald-500/20 border border-emerald-500/40 p-1.5 rounded text-center">
                <div className="text-[10px] text-slate-400">APAC Hub</div>
                <div className="text-xs font-bold text-emerald-400">100%</div>
              </div>
              <div className="bg-rose-500/20 border border-rose-500/40 p-1.5 rounded text-center">
                <div className="text-[10px] text-rose-300">Austin Line 2</div>
                <div className="text-xs font-bold text-rose-400">DELAY</div>
              </div>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Strict zero-day grace period applied universally across all plants.</span>
          </div>
        </div>

        {/* KPI 3: Fill Rate */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Line Fill Completeness
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  {canonicalFillRate}%
                </span>
                <span className="text-xs font-semibold text-amber-400">
                  46,450 / 49,400 Units
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Target ≥ 98.5%
            </span>
          </div>

          {/* SKU Shortage Breakdown */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
              <span>Component Line Fulfillment:</span>
              <span className="text-rose-400 font-mono">Deficit: 2,950 units</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">MLCC Passives (Austin Line 2)</span>
                <span className="text-rose-400 font-mono font-bold">72.0%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full w-[72%]" />
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">Advanced 3nm SoCs</span>
                <span className="text-emerald-400 font-mono font-bold">98.5%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[98.5%]" />
              </div>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Dispatched volume strictly certified by physical SAP warehouse goods issue.</span>
          </div>
        </div>
      </div>

      {/* Interactive Plant & Buffer Simulator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Factory className="w-5 h-5 text-emerald-400" />
              Plant Inventory Runway & Component Buffer Analysis
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select a manufacturing plant to inspect part-level safety stock and starvation runways.
            </p>
          </div>

          {/* Plant Selector Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto">
            {PLANTS.map(plant => (
              <button
                key={plant.id}
                onClick={() => setSelectedPlantId(plant.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  selectedPlantId === plant.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {plant.code}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Plant Overview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <span className="text-xs font-semibold text-slate-400">Manufacturing Facility</span>
            <h4 className="text-base font-bold text-white mt-1">{selectedPlant.name}</h4>
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono">
                {selectedPlant.plantType}
              </span>
              <span>{selectedPlant.city}, {selectedPlant.country}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400">Daily COGS Burn:</span>
                <div className="font-bold text-white font-mono">
                  ${(selectedPlant.dailyCogsUSD / 1000).toFixed(0)}k / day
                </div>
              </div>
              <div>
                <span className="text-slate-400">Plant DOI Runway:</span>
                <div className={`font-bold font-mono ${
                  selectedPlant.currentInventoryValuationUSD / selectedPlant.dailyCogsUSD < 30
                    ? 'text-rose-400'
                    : 'text-emerald-400'
                }`}>
                  {(selectedPlant.currentInventoryValuationUSD / selectedPlant.dailyCogsUSD).toFixed(1)} Days
                </div>
              </div>
            </div>
          </div>

          {/* Associated Warehouse Details */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <WarehouseIcon className="w-4 h-4 text-cyan-400" />
              Primary Staging Warehouse
            </span>
            <h4 className="text-base font-bold text-white mt-1">
              {plantWarehouse?.name || 'Central Facility Depot'}
            </h4>
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-300">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-purple-300 font-mono">
                {plantWarehouse?.warehouseType}
              </span>
              <span>{plantWarehouse?.totalStorageCapacitySqFt.toLocaleString()} sq ft</span>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Cubic Utilization:</span>
                <span className="font-mono font-bold text-cyan-400">
                  {plantWarehouse?.currentCapacityUtilizationPct}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    (plantWarehouse?.currentCapacityUtilizationPct || 0) > 85 ? 'bg-amber-400' : 'bg-cyan-500'
                  }`}
                  style={{ width: `${plantWarehouse?.currentCapacityUtilizationPct || 70}%` }}
                />
              </div>
            </div>
          </div>

          {/* Plant Starvation Warning */}
          <div className={`border rounded-xl p-4 flex flex-col justify-between ${
            selectedPlant.id === 'PLANT-01'
              ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
              : 'bg-slate-950/80 border-slate-800 text-slate-300'
          }`}>
            <div>
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedPlant.id === 'PLANT-01' ? (
                  <>
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 animate-pulse" />
                    <span className="text-rose-400">CRITICAL: Starvation Alert on Line 2</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-emerald-400">Assembly Lines Operating Normally</span>
                  </>
                )}
              </div>
              <p className="text-xs mt-2 leading-relaxed">
                {selectedPlant.id === 'PLANT-01'
                  ? 'MLCC-0402 inventory is down to 4.6 days of runway due to delayed ocean shipment SHP-7021 dwelling at Port of LA. Assembly line halt estimated in 48 hours without expedited action.'
                  : 'All core subassemblies exceed minimum safety thresholds. Component burn rates are balanced with inbound cross-dock receipts.'}
              </p>
            </div>

            {selectedPlant.id === 'PLANT-01' && (
              <button
                onClick={() => onOpenQuery('Which suppliers caused late shipments impacting customer orders?')}
                className="mt-3 px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-500 hover:bg-rose-400 text-slate-950 flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <span>Run Blast Radius Trace</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Component Inventory Runway Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-3">Component SKU</th>
                <th className="p-3">Category</th>
                <th className="p-3 text-right">Daily Consumption</th>
                <th className="p-3 text-right">On-Hand Units</th>
                <th className="p-3 text-right">Safety Stock</th>
                <th className="p-3 text-right">Runway (Days)</th>
                <th className="p-3 text-center">Buffer Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-mono text-[11px]">
              {plantParts.map(part => {
                const runwayDays = part.currentInventoryUnits / part.dailyConsumptionRate;
                const isCritical = runwayDays < 10;
                const isWarning = runwayDays < 20;

                return (
                  <tr key={part.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-sans">
                      <div className="font-bold text-white">{part.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{part.sku}</div>
                    </td>
                    <td className="p-3 font-sans text-slate-300">{part.category}</td>
                    <td className="p-3 text-right text-slate-300">
                      {part.dailyConsumptionRate.toLocaleString()} / day
                    </td>
                    <td className="p-3 text-right font-bold text-white">
                      {part.currentInventoryUnits.toLocaleString()}
                    </td>
                    <td className="p-3 text-right text-slate-400">
                      {part.safetyStockUnits.toLocaleString()}
                    </td>
                    <td className={`p-3 text-right font-bold text-sm ${
                      isCritical ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {runwayDays.toFixed(1)} Days
                    </td>
                    <td className="p-3 text-center font-sans">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isCritical
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : isWarning
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {isCritical ? 'CRITICAL STOCKOUT' : isWarning ? 'BUFFER LOW' : 'OPTIMAL'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
