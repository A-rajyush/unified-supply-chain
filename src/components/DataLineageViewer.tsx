import React, { useState } from 'react';
import { CANONICAL_LINEAGE_TRACES } from '../data/mockSupplyChain';
import { MetricLineageTrace, Persona } from '../types/ontology';
import {
  GitCommit,
  ArrowRight,
  Database,
  Layers,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  FileCode,
  Users,
  Search,
  ExternalLink,
  Code2,
  Lock,
  Cpu,
  RefreshCw,
  Clock
} from 'lucide-react';

interface DataLineageViewerProps {
  onRunConversationalQuery?: (query: string) => void;
}

export const DataLineageViewer: React.FC<DataLineageViewerProps> = ({
  onRunConversationalQuery
}) => {
  const [selectedMetricId, setSelectedMetricId] = useState<string>('OTD');
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);

  const activeTrace: MetricLineageTrace =
    CANONICAL_LINEAGE_TRACES.find(t => t.metricId === selectedMetricId) ||
    CANONICAL_LINEAGE_TRACES[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
              <GitCommit className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  End-to-End Data Lineage & Provenance Tracker
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Full Auditability Certified
                </span>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Zero Black-Box Drift
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Trace any canonical metric from <strong>Source Systems of Record (ERP, TMS, EDI, IoT)</strong> through dbt staging transformations and <strong>Governed Semantic Views</strong> to the final <strong>Conversational Analytics Output</strong>.
              </p>
            </div>
          </div>

          {/* Metric Selector Pills */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start lg:self-center overflow-x-auto">
            {CANONICAL_LINEAGE_TRACES.map(trace => (
              <button
                key={trace.metricId}
                onClick={() => {
                  setSelectedMetricId(trace.metricId);
                  setSelectedStepIndex(null);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  selectedMetricId === trace.metricId
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {trace.metricId}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Focus & Canonical Definition Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Currently Selected Lineage Pipeline
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">{activeTrace.metricName}</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Semantic Model:</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-purple-300">
              {activeTrace.semanticView.viewName}
            </span>
          </div>
        </div>

        {/* 5-Stage Lineage Flow DAG Visualizer */}
        <div className="mt-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Complete Lineage Graph & Transformation Pipeline
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {/* Stage 1: Raw Ingestion */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between hover:border-cyan-500/40 transition-all">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  <Database className="w-3.5 h-3.5" />
                  1. Raw Sources
                </div>
                <div className="space-y-1.5">
                  {activeTrace.rawInputs.map((raw, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-900/90 border border-slate-800/80 text-[11px]">
                      <div className="font-bold text-slate-200">{raw.system}</div>
                      <div className="text-slate-400 font-mono text-[10px] truncate">{raw.table}.{raw.column}</div>
                      <div className="text-cyan-400 font-mono text-[9px] mt-0.5">Sample: {raw.sampleValue}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
                ERP + TMS + EDI + IoT
              </div>
            </div>

            {/* Stage 2: Transformations */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between hover:border-cyan-500/40 transition-all">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-2">
                  <Code2 className="w-3.5 h-3.5" />
                  2. dbt Staging
                </div>
                <div className="space-y-1.5">
                  {activeTrace.transformations.map((tf, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedStepIndex(idx)}
                      className={`w-full text-left p-2 rounded border text-[11px] transition-all ${
                        selectedStepIndex === idx
                          ? 'bg-indigo-950/40 border-indigo-500/50 text-indigo-200 shadow-sm'
                          : 'bg-slate-900/90 border-slate-800/80 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>Step {tf.stepOrder}: {tf.ruleName}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                        {tf.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-3 text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
                Type cast • Timezone • Null safe
              </div>
            </div>

            {/* Stage 3: Governed Semantic Views */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between hover:border-cyan-500/40 transition-all">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-2">
                  <FileCode className="w-3.5 h-3.5" />
                  3. Semantic Views
                </div>
                <div className="p-2.5 rounded bg-slate-900/90 border border-slate-800/80 text-[11px] space-y-2">
                  <div>
                    <span className="text-[10px] text-slate-400">Granularity:</span>
                    <div className="font-medium text-slate-200 mt-0.5">{activeTrace.semanticView.granularity}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Measures:</span>
                    <div className="font-mono text-[10px] text-purple-300 mt-0.5 space-y-0.5">
                      {activeTrace.semanticView.measures.map((m, i) => (
                        <div key={i}>• {m}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
                Single Metric Definition Layer
              </div>
            </div>

            {/* Stage 4: Governance Verification */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between hover:border-cyan-500/40 transition-all">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  <Lock className="w-3.5 h-3.5" />
                  4. Governance Rules
                </div>
                <div className="space-y-1.5">
                  {activeTrace.governanceChecks.map((chk, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-900/90 border border-slate-800/80 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-emerald-400 font-bold">{chk.ruleCode}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="font-semibold text-slate-200 mt-0.5">{chk.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{chk.enforcementMethod}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
                Cryptographic Policy Enforcement
              </div>
            </div>

            {/* Stage 5: Conversational Output */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between hover:border-cyan-500/40 transition-all">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  5. Conversational Output
                </div>
                <div className="space-y-1.5">
                  {activeTrace.consumptionPersonas.map((cp, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-900/90 border border-slate-800/80 text-[11px]">
                      <div className="flex items-center justify-between capitalize">
                        <span className="font-bold text-cyan-300">{cp.persona}</span>
                        <span className="font-mono font-bold text-emerald-400">{cp.interpretedMetricValue}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
                        {cp.tailoredView}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 text-[10px] text-emerald-400 font-semibold pt-2 border-t border-slate-800/60 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>100% Identical Metric Value</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep-Dive SQL Transformation Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Transformation Step Inspection */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              dbt SQL Transformation & Ingestion Logic
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
              Audited SQL
            </span>
          </div>

          <div className="space-y-3">
            {activeTrace.transformations.map((tf, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border transition-all ${
                  selectedStepIndex === index
                    ? 'bg-slate-950 border-cyan-500/50 shadow-md'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-[10px] font-bold flex items-center justify-center">
                      {tf.stepOrder}
                    </span>
                    <span className="text-xs font-bold text-white">{tf.ruleName}</span>
                  </div>
                  <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Governed
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {tf.description}
                </p>

                <div className="mt-3 bg-slate-900 p-3 rounded-lg border border-slate-800/80 font-mono text-xs text-cyan-300 overflow-x-auto">
                  <code>{tf.sqlExpression}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Governance Verification & Policy Ledger */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Governance Enforcement & Invariance Verification
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                Policy Active
              </span>
            </div>

            <div className="space-y-4">
              {activeTrace.governanceChecks.map((gov, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white">{gov.title}</span>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 font-bold">{gov.ruleCode}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {gov.enforcementMethod}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Cryptographic check verified across all persona endpoints</span>
                  </div>
                </div>
              ))}

              {/* Conversational Integration Box */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 to-cyan-950/30 border border-cyan-500/30">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  How Conversational Analytics Uses This Lineage
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  When any user asks <em>"What is our {activeTrace.metricName}?"</em>, the natural language semantic engine executes the certified ANSI SQL view <code>{activeTrace.semanticView.viewName}</code> directly. It guarantees that the mathematical numerator and denominator never drift between Planning, Procurement, and Logistics.
                </p>

                {onRunConversationalQuery && (
                  <button
                    onClick={() => onRunConversationalQuery(`What is our ${activeTrace.metricName} and what is the data lineage?`)}
                    className="mt-3 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-md font-bold"
                  >
                    <span>Test in Conversational Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Audit Trail Source: Immutable Hash Chain</span>
            <span className="font-mono text-cyan-400">HASH: 0x9a8f...3e12</span>
          </div>
        </div>
      </div>
    </div>
  );
};
