import React from 'react';
import { Persona, Region } from '../types/ontology';
import {
  ShieldCheck,
  Layers,
  Database,
  Users,
  Compass,
  GitMerge,
  Cpu,
  Radio,
  FileCode,
  Sparkles,
  LayoutDashboard,
  GitCommit,
  Scale,
  Globe,
  Sliders,
  Sun,
  Moon
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedPersona: Persona;
  setSelectedPersona: (persona: Persona) => void;
  selectedRegion: Region;
  setSelectedRegion: (region: Region) => void;
  theme?: 'light' | 'dark';
  setTheme?: (theme: 'light' | 'dark') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedPersona,
  setSelectedPersona,
  selectedRegion,
  setSelectedRegion,
  theme = 'light',
  setTheme
}) => {
  const tabs = [
    { id: 'dashboards', label: 'Persona Dashboards', icon: LayoutDashboard },
    { id: 'map', label: 'Global Network & Telematics', icon: Globe },
    { id: 'simulator', label: 'Remediation Simulator', icon: Sliders },
    { id: 'lineage', label: 'Data Lineage Tracker', icon: GitCommit },
    { id: 'chat', label: 'Conversational Studio', icon: Sparkles },
    { id: 'ontology', label: 'Ontology Graph', icon: GitMerge },
    { id: 'impact-tracer', label: 'Blast Radius Tracer', icon: Compass },
    { id: 'persona-matrix', label: 'Consistency Matrix', icon: Scale },
    { id: 'semantic-views', label: 'Semantic Views & Catalog', icon: FileCode }
  ];

  const personaConfig: Record<Persona, { title: string; color: string; desc: string }> = {
    planning: {
      title: 'Supply Chain Planning',
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      desc: 'Focus: DOI, Plant Buffers & Assembly Flow'
    },
    procurement: {
      title: 'Procurement & Sourcing',
      color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      desc: 'Focus: Landed Cost & Supplier Contracts'
    },
    logistics: {
      title: 'Logistics & Transportation',
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      desc: 'Focus: Port Dwell, Carrier OTD & IoT Telematics'
    },
    executive: {
      title: 'Executive Cross-Domain',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      desc: 'Focus: Enterprise SLA & Revenue Protection'
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-md sticky top-0 z-40">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3.5 pb-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-white/10">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">
                  Unified Supply Chain Ontology
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Governed Semantic Layer
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  <Cpu className="w-3 h-3 text-slate-400" />
                  ERP • TMS • EDI • IoT
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Canonical business definitions ensuring mathematically congruent answers across personas
              </p>
            </div>
          </div>

          {/* Persona & Region Selectors */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Persona Selector */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1">
              <span className="text-[11px] font-medium text-slate-400 px-2 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                Persona:
              </span>
              {(['planning', 'procurement', 'logistics', 'executive'] as Persona[]).map(p => {
                const isSelected = selectedPersona === p;
                return (
                  <button
                    key={p}
                    onClick={() => setSelectedPersona(p)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all capitalize ${
                      isSelected
                        ? `${personaConfig[p].color} border shadow-sm`
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            {/* Region Selector */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1">
              <span className="text-[11px] font-medium text-slate-400 px-2 flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-cyan-400" />
                Region:
              </span>
              {(['Global', 'AMER', 'EMEA', 'APAC'] as Region[]).map(r => {
                const isSelected = selectedRegion === r;
                return (
                  <button
                    key={r}
                    onClick={() => setSelectedRegion(r)}
                    className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>

            {/* White / Dark Mode Toggle */}
            {setTheme && (
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to White Background'}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700/80 bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-all shadow-sm"
              >
                {theme === 'light' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>White Theme</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Dark Theme</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto pt-3 mt-1 scrollbar-none border-t border-slate-800/80">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 font-semibold border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
