import React, { useState } from 'react';
import { SOURCE_SYSTEM_MAPPINGS, CANONICAL_METRIC_DEFINITIONS } from '../data/mockSupplyChain';
import {
  FileCode,
  Database,
  Code2,
  Table,
  CheckCircle2,
  ShieldCheck,
  Search,
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';

export const SemanticViewsViewer: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMetricView, setSelectedMetricView] = useState<string>('OTD');

  const filteredMappings = SOURCE_SYSTEM_MAPPINGS.filter(m => {
    const matchesSystem = selectedSystem === 'All' || m.system.includes(selectedSystem);
    const matchesSearch =
      searchQuery === '' ||
      m.rawField.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.canonicalField.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.businessSemantics.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSystem && matchesSearch;
  });

  const activeMetric =
    CANONICAL_METRIC_DEFINITIONS.find(m => m.id === selectedMetricView) ||
    CANONICAL_METRIC_DEFINITIONS[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Governed Semantic Layer & Canonical Views
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Standardized Semantic Schema
                </span>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  ANSI SQL • dbt Semantic Models
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Maps fragmented physical database columns (SAP S/4HANA ERP, Manhattan TMS, EDI ANSI X12, Samsara IoT) to business meaning and enterprise canonical metrics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Views Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Core Enterprise Semantic Models
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {CANONICAL_METRIC_DEFINITIONS.map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedMetricView(m.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  selectedMetricView === m.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Metric Schema Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{activeMetric.name}</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                  {activeMetric.semanticViewName}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{activeMetric.description}</p>
            </div>

            <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Unit / Acronym</span>
              <div className="text-lg font-extrabold text-emerald-400 font-mono">
                {activeMetric.acronym} ({activeMetric.unit})
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Certified Canonical Formula
              </span>
              <div className="mt-1.5 bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300">
                {activeMetric.canonicalFormula}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Certified Governance Rules
              </span>
              <div className="mt-1.5 space-y-1">
                {activeMetric.governanceRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Raw-to-Semantic Mapping Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Table className="w-5 h-5 text-blue-400" />
              Raw Source Column to Canonical Semantic Mapping Catalog
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Exact SQL transformations and business meanings mapping ERP/TMS/EDI fields to canonical entities.
            </p>
          </div>

          {/* System Filters */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {['All', 'ERP', 'TMS', 'EDI', 'IoT'].map(sys => (
                <button
                  key={sys}
                  onClick={() => setSelectedSystem(sys)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                    selectedSystem === sys
                      ? 'bg-blue-500 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sys}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mappings Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-3">Source System</th>
                <th className="p-3">Raw Physical Field</th>
                <th className="p-3">Canonical Entity & Field</th>
                <th className="p-3">Business Semantics</th>
                <th className="p-3">dbt Transformation Logic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-mono text-[11px]">
              {filteredMappings.map((m, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 font-sans font-semibold text-slate-200">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-cyan-400">
                      {m.system}
                    </span>
                  </td>
                  <td className="p-3 text-amber-300 font-bold">{m.rawField}</td>
                  <td className="p-3 font-sans">
                    <div className="font-bold text-white">{m.canonicalField}</div>
                    <div className="text-[10px] text-slate-400">{m.canonicalEntity}</div>
                  </td>
                  <td className="p-3 font-sans text-slate-300 max-w-xs">{m.businessSemantics}</td>
                  <td className="p-3 text-cyan-400 max-w-xs truncate" title={m.transformationLogic}>
                    {m.transformationLogic}
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
