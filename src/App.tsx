import React, { useState } from 'react';
import { Persona, Region } from './types/ontology';
import { Header } from './components/Header';
import { PlanningDashboard } from './components/PersonaDashboards/PlanningDashboard';
import { ProcurementDashboard } from './components/PersonaDashboards/ProcurementDashboard';
import { LogisticsDashboard } from './components/PersonaDashboards/LogisticsDashboard';
import { DataLineageViewer } from './components/DataLineageViewer';
import { ConversationalStudio } from './components/ConversationalStudio';
import { OntologyGraphViewer } from './components/OntologyGraphViewer';
import { CrossDomainImpactTracer } from './components/CrossDomainImpactTracer';
import { PersonaConsistencyMatrix } from './components/PersonaConsistencyMatrix';
import { SemanticViewsViewer } from './components/SemanticViewsViewer';
import { NetworkMapViewer } from './components/NetworkMapViewer';
import { RemediationSimulator } from './components/RemediationSimulator';
import {
  Factory,
  Briefcase,
  Truck,
  ShieldCheck,
  Scale,
  Sparkles,
  GitCommit,
  Layers,
  Database
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboards');
  const [selectedPersona, setSelectedPersona] = useState<Persona>('planning');
  const [selectedRegion, setSelectedRegion] = useState<Region>('Global');
  const [activeQuery, setActiveQuery] = useState<string>('What is our fill rate last quarter?');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Keep body class synced with theme
  React.useEffect(() => {
    document.body.className =
      theme === 'light'
        ? 'theme-light bg-white text-slate-900 antialiased selection:bg-cyan-500/20 selection:text-cyan-900'
        : 'theme-dark bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200';
  }, [theme]);

  const handleOpenQuery = (query: string) => {
    setActiveQuery(query);
    setActiveTab('chat');
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'light'
          ? 'theme-light bg-slate-50 text-slate-900'
          : 'bg-slate-950 text-slate-100'
      } flex flex-col font-sans transition-colors duration-200`}
    >
      {/* Top Navigation & Persona/Region Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedPersona={selectedPersona}
        setSelectedPersona={setSelectedPersona}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 1: Persona-Specific Dashboards */}
        {activeTab === 'dashboards' && (
          <div className="space-y-6">
            {/* Dashboard Sub-Switcher Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-1.5 overflow-x-auto p-1">
                <button
                  onClick={() => setSelectedPersona('planning')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedPersona === 'planning'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Factory className="w-4 h-4" />
                  <span>Planning Cockpit</span>
                </button>
                <button
                  onClick={() => setSelectedPersona('procurement')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedPersona === 'procurement'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Procurement Command</span>
                </button>
                <button
                  onClick={() => setSelectedPersona('logistics')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedPersona === 'logistics'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Logistics Operations</span>
                </button>
              </div>

              <div className="flex items-center gap-2 px-3 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Underlying Canonical Metrics Guaranteed 100% Congruent</span>
              </div>
            </div>

            {/* Render Persona Dashboard */}
            {selectedPersona === 'planning' && (
              <PlanningDashboard
                onSwitchPersona={setSelectedPersona}
                onOpenQuery={handleOpenQuery}
              />
            )}
            {selectedPersona === 'procurement' && (
              <ProcurementDashboard
                onSwitchPersona={setSelectedPersona}
                onOpenQuery={handleOpenQuery}
              />
            )}
            {selectedPersona === 'logistics' && (
              <LogisticsDashboard
                onSwitchPersona={setSelectedPersona}
                onOpenQuery={handleOpenQuery}
              />
            )}
            {selectedPersona === 'executive' && (
              <PlanningDashboard
                onSwitchPersona={setSelectedPersona}
                onOpenQuery={handleOpenQuery}
              />
            )}
          </div>
        )}

        {/* Tab 2: Global Supply Chain Network & IoT Telematics Map */}
        {activeTab === 'map' && (
          <NetworkMapViewer onOpenQuery={handleOpenQuery} />
        )}

        {/* Tab 3: What-If Remediation Simulator & Action Orchestrator */}
        {activeTab === 'simulator' && (
          <RemediationSimulator
            onOpenQuery={handleOpenQuery}
            onSelectPersona={setSelectedPersona}
          />
        )}

        {/* Tab 4: End-to-End Data Lineage Tracking System */}
        {activeTab === 'lineage' && (
          <DataLineageViewer onRunConversationalQuery={handleOpenQuery} />
        )}

        {/* Tab 3: Governed Conversational Studio */}
        {activeTab === 'chat' && (
          <ConversationalStudio
            selectedPersona={selectedPersona}
            setSelectedPersona={setSelectedPersona}
            selectedRegion={selectedRegion}
            initialQuery={activeQuery}
          />
        )}

        {/* Tab 4: Expanded Supply Chain Ontology Graph */}
        {activeTab === 'ontology' && <OntologyGraphViewer />}

        {/* Tab 5: Cross-Domain Blast Radius Impact Tracer */}
        {activeTab === 'impact-tracer' && (
          <CrossDomainImpactTracer onOpenQuery={handleOpenQuery} />
        )}

        {/* Tab 6: Cross-Persona Consistency Matrix */}
        {activeTab === 'persona-matrix' && (
          <PersonaConsistencyMatrix
            onSelectPersona={setSelectedPersona}
            onOpenQuery={handleOpenQuery}
          />
        )}

        {/* Tab 7: Semantic Views Catalog & Mappings */}
        {activeTab === 'semantic-views' && <SemanticViewsViewer />}
      </main>

      {/* Footer */}
      <footer
        className={`border-t ${
          theme === 'light'
            ? 'border-slate-200 bg-white text-slate-600'
            : 'border-slate-900 bg-slate-950 text-slate-500'
        } py-4 px-4 sm:px-6 lg:px-8 text-center text-xs transition-colors`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={theme === 'light' ? 'text-slate-800 font-semibold' : 'text-slate-300'}>
              Governed Supply Chain Semantic Layer Active
            </span>
          </div>
          <div>
            Canonical Metrics: On-Time Delivery (88.6%) • Fill Rate (93.8%) • Days of Inventory (36.4d) • Landed Cost ($148.20)
          </div>
        </div>
      </footer>
    </div>
  );
}
