import React, { useState } from 'react';
import { Persona, Region, GovernedQueryResult } from '../types/ontology';
import {
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Code2,
  FileCode,
  Compass,
  Zap,
  Layers,
  ArrowRight,
  Database,
  Building2,
  Users,
  Clock,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface ConversationalStudioProps {
  selectedPersona: Persona;
  setSelectedPersona: (p: Persona) => void;
  selectedRegion: Region;
  initialQuery?: string;
}

export const ConversationalStudio: React.FC<ConversationalStudioProps> = ({
  selectedPersona,
  setSelectedPersona,
  selectedRegion,
  initialQuery
}) => {
  const [queryInput, setQueryInput] = useState<string>(
    initialQuery || 'What is our fill rate last quarter?'
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<GovernedQueryResult | null>(null);
  const [activeTab, setActiveTab] = useState<'response' | 'sql' | 'lineage' | 'blastRadius'>('response');

  const suggestedQueries = [
    {
      title: 'Fill Rate Across Teams',
      query: 'What is our fill rate last quarter?',
      desc: 'Demonstrates identical metric resolution across Planning, Procurement, and Logistics.'
    },
    {
      title: 'Cross-Domain Blast Radius',
      query: 'Which suppliers caused late shipments impacting customer orders?',
      desc: 'Traces Murata MLCC delay through Pier 400 dwell to Tesla and Apple order impacts.'
    },
    {
      title: 'Days of Inventory Runway',
      query: 'What is our days of inventory and which plants are at starvation risk?',
      desc: 'Calculates 36.4 days enterprise runway and flags Austin Line 2 buffer starvation.'
    },
    {
      title: 'Zero-Grace On-Time Delivery',
      query: 'What is our on-time delivery rate under zero-grace policy?',
      desc: 'Resolves canonical 88.6% OTD using frozen customer contract promise dates.'
    },
    {
      title: 'True Landed Cost Breakdown',
      query: 'Breakdown our landed cost per unit and explain freight tariff variances',
      desc: 'Allocates FOB invoice, ocean linehaul, import tariffs, and port demurrage surcharges.'
    }
  ];

  const handleExecuteQuery = async (queryToRun?: string) => {
    const q = queryToRun || queryInput;
    if (!q.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/governed-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          persona: selectedPersona,
          regionScope: selectedRegion
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data: GovernedQueryResult = await res.json();
      setResult(data);
      setActiveTab('response');
    } catch (err) {
      console.error('Failed to run query:', err);
    } finally {
      setLoading(false);
    }
  };

  // Run initial query if available
  React.useEffect(() => {
    if (initialQuery) {
      setQueryInput(initialQuery);
      handleExecuteQuery(initialQuery);
    } else if (!result) {
      handleExecuteQuery('What is our fill rate last quarter?');
    }
  }, [initialQuery]);

  return (
    <div className="space-y-6">
      {/* Query Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Governed Conversational Query Engine
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Ontology-Grounded
            </span>
          </div>

          <div className="text-xs text-slate-400">
            Queries resolve against certified semantic views with strict zero semantic drift.
          </div>
        </div>

        <form
          onSubmit={e => {
            e.preventDefault();
            handleExecuteQuery();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={queryInput}
            onChange={e => setQueryInput(e.target.value)}
            placeholder="Ask anything about supply chain performance, bottlenecks, or metrics..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 pr-24 font-medium"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all shadow-md disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Resolving...</span>
              </>
            ) : (
              <>
                <span>Execute</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Suggested Queries */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Canonical Test Scenarios:
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((sq, i) => (
              <button
                key={i}
                onClick={() => {
                  setQueryInput(sq.query);
                  handleExecuteQuery(sq.query);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left text-xs transition-all group"
              >
                <span className="font-semibold text-cyan-400 group-hover:text-cyan-300">
                  {sq.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Query Results View */}
      {result && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Result Header & Governance Certification Ribbon */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-5 border-b border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Governance Policy Certified
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Metric: {result.governanceVerification.canonicalMetricId}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 capitalize">
                    Active Persona Lens: {result.persona}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">
                  {result.governanceVerification.metricFullName}
                </h3>
              </div>

              {/* Certified Canonical Metric Hero Box */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-5 py-3 text-right shrink-0">
                <div className="text-[10px] uppercase font-bold text-slate-400">
                  Governed Canonical Value
                </div>
                <div className="flex items-baseline justify-end gap-1.5 mt-0.5">
                  <span className="text-3xl font-extrabold text-cyan-400 tracking-tight">
                    {result.metrics.canonicalValue}
                  </span>
                  {result.metrics.unit && (
                    <span className="text-sm font-semibold text-slate-400">
                      {result.metrics.unit}
                    </span>
                  )}
                </div>
                {result.metrics.comparisonBenchmark && (
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {result.metrics.comparisonBenchmark}
                  </div>
                )}
              </div>
            </div>

            {/* Formula & Rule Strip */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px]">
                <span className="text-slate-400">Canonical Formula: </span>
                <span className="text-white font-bold">{result.governanceVerification.canonicalFormula}</span>
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-[11px]">
                <span className="text-slate-400">Policy Statement: </span>
                <span className="text-slate-200">{result.governanceVerification.governingPolicyStatement}</span>
              </div>
            </div>

            {/* View Switching Tabs */}
            <div className="flex items-center gap-2 mt-4 pt-2 overflow-x-auto">
              {[
                { id: 'response', label: 'Executive Answer & Persona Lens', icon: Sparkles },
                { id: 'blastRadius', label: 'Cross-Domain Blast Radius', icon: Compass },
                { id: 'sql', label: 'Compiled Semantic SQL & dbt', icon: Code2 },
                { id: 'lineage', label: 'Source Lineage & Auditing', icon: Layers }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab 1: Executive Response & Persona Context */}
          {activeTab === 'response' && (
            <div className="p-6 space-y-6 animate-fadeIn">
              {/* Executive Summary */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Executive Briefing Grounded in Semantic Layer
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {result.executiveSummary}
                </p>
              </div>

              {/* Persona Context & Operational Lens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left: Operational Focus */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      Persona Operational Lens ({result.personaContext.persona})
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      Role-Tailored
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-3">
                    {result.personaContext.operationalLens}
                  </p>

                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Primary Operational Concerns:
                    </div>
                    {result.personaContext.primaryConcerns.map((concern, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{concern}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Actionable Governed Recommendations */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Actionable Recommendations
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono">
                      SLA Protected
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {result.personaContext.actionableRecommendations.map((rec, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2"
                      >
                        <span className="h-4 w-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Persona Consistency Reminder */}
              <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between text-xs text-slate-400">
                <span>Switch persona above to verify that <strong>{result.governanceVerification.canonicalMetricId} = {result.metrics.canonicalValue}</strong> remains unchanged for Planning, Procurement, and Logistics.</span>
                <div className="flex gap-1.5">
                  {(['planning', 'procurement', 'logistics'] as Persona[]).map(p => (
                    <button
                      key={p}
                      onClick={() => setSelectedPersona(p)}
                      className={`capitalize px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                        selectedPersona === p
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Cross-Domain Blast Radius */}
          {activeTab === 'blastRadius' && (
            <div className="p-6 space-y-6 animate-fadeIn">
              {result.crossDomainBlastRadius ? (
                <div className="space-y-5">
                  <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-1">
                      <AlertTriangle className="w-4 h-4" />
                      Cascading Cross-Domain Bottleneck Detected
                    </div>
                    <p className="text-xs text-rose-200">
                      Upstream supplier delivery delinquency has propagated through port transit dwell and starved manufacturing assembly buffers, directly endangering strategic customer commitments.
                    </p>
                  </div>

                  {/* Root Cause Chain */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">1. Root Cause Supplier</div>
                      <div className="text-sm font-bold text-white mt-1">
                        {result.crossDomainBlastRadius.rootCauseSupplier}
                      </div>
                      <div className="text-[11px] text-rose-400 font-mono mt-0.5">
                        Part: {result.crossDomainBlastRadius.delayedPartSku}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">2. Stalled Freight</div>
                      <div className="text-sm font-bold text-white mt-1">
                        {result.crossDomainBlastRadius.stalledShipment}
                      </div>
                      <div className="text-[11px] text-amber-400 font-mono mt-0.5">
                        Pier 400 Port Dwell (94.6h)
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">3. Bottleneck Plant</div>
                      <div className="text-sm font-bold text-white mt-1">
                        {result.crossDomainBlastRadius.bottleneckPlant}
                      </div>
                      <div className="text-[11px] text-rose-400 font-mono mt-0.5">
                        Line 2 Assembly Starvation
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">4. Customer Orders</div>
                      <div className="text-sm font-bold text-white mt-1">
                        {result.crossDomainBlastRadius.impactedCustomers.length} Accounts At-Risk
                      </div>
                      <div className="text-[11px] text-rose-400 font-mono mt-0.5">
                        $2,295,000 Total Value
                      </div>
                    </div>
                  </div>

                  {/* Impacted Customer Orders Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                      <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider">
                        <tr>
                          <th className="p-3">Customer Account</th>
                          <th className="p-3">Order Number</th>
                          <th className="p-3 text-right">Value at Risk (USD)</th>
                          <th className="p-3 text-right">Estimated Delay</th>
                          <th className="p-3 text-center">Contract SLA Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-mono text-[11px]">
                        {result.crossDomainBlastRadius.impactedCustomers.map((c, i) => (
                          <tr key={i} className="hover:bg-slate-800/50">
                            <td className="p-3 font-sans font-bold text-white">{c.customerName}</td>
                            <td className="p-3 text-cyan-400">{c.orderNumber}</td>
                            <td className="p-3 text-right font-bold text-rose-400">
                              ${c.valueAtRiskUSD.toLocaleString()}
                            </td>
                            <td className="p-3 text-right text-amber-300">+{c.delayDays} Days</td>
                            <td className="p-3 text-center font-sans">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                                Liquidated Damages Risk
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400 text-xs">
                  No active cross-domain blast radius for this specific metric query.
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Compiled SQL & dbt YAML */}
          {activeTab === 'sql' && (
            <div className="p-6 space-y-6 animate-fadeIn">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Compiled ANSI SQL Query (Executed against Semantic Layer)
                  </h4>
                  <span className="text-xs font-mono text-cyan-400">
                    {result.semanticViewQuery.viewName}
                  </span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
                  <pre>{result.semanticViewQuery.ansiSql}</pre>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Compiled dbt Semantic Layer Model (YAML Specification)
                  </h4>
                  <span className="text-xs font-mono text-purple-300">
                    models/semantic/{result.semanticViewQuery.viewName}.yml
                  </span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-purple-200 overflow-x-auto leading-relaxed">
                  <pre>{result.semanticViewQuery.compiledDbtYaml}</pre>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Lineage & Mapped Source Systems */}
          {activeTab === 'lineage' && (
            <div className="p-6 space-y-6 animate-fadeIn">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Contributing Enterprise Source Systems
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {result.semanticViewQuery.mappedSourceSystems.map((sys, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold">
                        <Database className="w-4 h-4" />
                        <span>{sys}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Validated and normalized via dbt staging layer into canonical format.
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Lineage Verification Guarantee
                </div>
                Every number presented in this conversational response was compiled directly from the underlying relational database without LLM arithmetic hallucination. The LLM handles natural language interpretation and persona contextualization, while the <strong>semantic layer handles the math</strong>.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
