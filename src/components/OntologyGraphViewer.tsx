import React, { useState } from 'react';
import {
  SUPPLIERS,
  PARTS,
  PRODUCT_CATEGORIES,
  QUALITY_INSPECTIONS,
  PLANTS,
  WAREHOUSES,
  CARRIERS,
  SHIPMENTS,
  ORDERS,
  CUSTOMERS,
  IOT_TELEMATICS_RECORDS
} from '../data/mockSupplyChain';
import {
  GitMerge,
  Database,
  Building2,
  Cpu,
  Layers,
  FileCheck,
  Factory,
  Warehouse as WarehouseIcon,
  Truck,
  Package,
  Radio,
  ShoppingCart,
  Users,
  Info,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const OntologyGraphViewer: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<string>('Part');
  const [selectedItem, setSelectedItem] = useState<any>(PARTS[1]); // Default to Murata MLCC

  const entityTypes = [
    { id: 'Supplier', name: 'Supplier', count: SUPPLIERS.length, icon: Building2, color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' },
    { id: 'ProductCategory', name: 'Product Category', count: PRODUCT_CATEGORIES.length, icon: Layers, color: 'text-pink-400 border-pink-500/30 bg-pink-500/10' },
    { id: 'Part', name: 'Part / SKU', count: PARTS.length, icon: Cpu, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
    { id: 'QualityInspection', name: 'Quality Inspection', count: QUALITY_INSPECTIONS.length, icon: FileCheck, color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' },
    { id: 'Plant', name: 'Plant', count: PLANTS.length, icon: Factory, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { id: 'Warehouse', name: 'Warehouse', count: WAREHOUSES.length, icon: WarehouseIcon, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
    { id: 'Carrier', name: 'Carrier', count: CARRIERS.length, icon: Truck, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { id: 'Shipment', name: 'Shipment', count: SHIPMENTS.length, icon: Package, color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
    { id: 'IoTTelematics', name: 'IoT Telematics', count: IOT_TELEMATICS_RECORDS.length, icon: Radio, color: 'text-teal-400 border-teal-500/30 bg-teal-500/10' },
    { id: 'Order', name: 'Customer Order', count: ORDERS.length, icon: ShoppingCart, color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' },
    { id: 'Customer', name: 'Customer', count: CUSTOMERS.length, icon: Users, color: 'text-lime-400 border-lime-500/30 bg-lime-500/10' }
  ];

  const getEntityItems = () => {
    switch (selectedEntity) {
      case 'Supplier': return SUPPLIERS;
      case 'ProductCategory': return PRODUCT_CATEGORIES;
      case 'Part': return PARTS;
      case 'QualityInspection': return QUALITY_INSPECTIONS;
      case 'Plant': return PLANTS;
      case 'Warehouse': return WAREHOUSES;
      case 'Carrier': return CARRIERS;
      case 'Shipment': return SHIPMENTS;
      case 'IoTTelematics': return IOT_TELEMATICS_RECORDS;
      case 'Order': return ORDERS;
      case 'Customer': return CUSTOMERS;
      default: return PARTS;
    }
  };

  const handleSelectEntity = (entityId: string) => {
    setSelectedEntity(entityId);
    let items: any[] = [];
    switch (entityId) {
      case 'Supplier': items = SUPPLIERS; break;
      case 'ProductCategory': items = PRODUCT_CATEGORIES; break;
      case 'Part': items = PARTS; break;
      case 'QualityInspection': items = QUALITY_INSPECTIONS; break;
      case 'Plant': items = PLANTS; break;
      case 'Warehouse': items = WAREHOUSES; break;
      case 'Carrier': items = CARRIERS; break;
      case 'Shipment': items = SHIPMENTS; break;
      case 'IoTTelematics': items = IOT_TELEMATICS_RECORDS; break;
      case 'Order': items = ORDERS; break;
      case 'Customer': items = CUSTOMERS; break;
    }
    setSelectedItem(items[0]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 shadow-inner">
              <GitMerge className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Unified Supply Chain Enterprise Ontology
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Canonical Semantic Schema
                </span>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  11 Core Entities • Linked Relational Graph
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Seamless conceptual model linking <strong>Suppliers, Parts, Product Categories, Quality Inspections, Plants, Warehouses, Carriers, Shipments, IoT Telematics, Orders, and Customers</strong> into a unified semantic web.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Supply Chain Relationship Pipeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          End-to-End Enterprise Relationship DAG (Directed Acyclic Graph)
        </div>

        {/* Pipeline Nodes */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin">
          {[
            { id: 'Supplier', label: 'Supplier', sub: 'Vendor Tier 1-3', color: 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300' },
            { id: 'Part', label: 'Part / SKU', sub: 'BOM Component', color: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300' },
            { id: 'QualityInspection', label: 'Quality Inspection', sub: 'SAP QALS Lot', color: 'border-rose-500/40 bg-rose-950/40 text-rose-300' },
            { id: 'Warehouse', label: 'Warehouse', sub: 'Buffer & DC', color: 'border-purple-500/40 bg-purple-950/40 text-purple-300' },
            { id: 'Plant', label: 'Plant', sub: 'Assembly Fab', color: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300' },
            { id: 'Carrier', label: 'Carrier', sub: 'Transport SCAC', color: 'border-amber-500/40 bg-amber-950/40 text-amber-300' },
            { id: 'Shipment', label: 'Shipment', sub: 'BOL Transit', color: 'border-blue-500/40 bg-blue-950/40 text-blue-300' },
            { id: 'IoTTelematics', label: 'IoT Telematics', sub: 'Samsara Sensor', color: 'border-teal-500/40 bg-teal-950/40 text-teal-300' },
            { id: 'Order', label: 'Customer Order', sub: 'SAP Sales Order', color: 'border-orange-500/40 bg-orange-950/40 text-orange-300' },
            { id: 'Customer', label: 'Customer', sub: 'Enterprise SLA', color: 'border-lime-500/40 bg-lime-950/40 text-lime-300' }
          ].map((step, idx, arr) => (
            <React.Fragment key={step.id}>
              <button
                onClick={() => handleSelectEntity(step.id)}
                className={`p-3 rounded-xl border min-w-[130px] text-left transition-all shrink-0 ${
                  selectedEntity === step.id
                    ? 'ring-2 ring-cyan-400 bg-slate-800 shadow-lg scale-105'
                    : step.color
                }`}
              >
                <div className="text-[10px] text-slate-400 font-mono">Stage 0{idx + 1}</div>
                <div className="text-xs font-bold text-white mt-0.5">{step.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{step.sub}</div>
              </button>
              {idx < arr.length - 1 && (
                <div className="text-slate-600 font-bold shrink-0">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Interactive Entity Explorer & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Entity Types & List */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              1. Select Ontology Entity Class
            </div>
            <div className="grid grid-cols-2 gap-2">
              {entityTypes.map(e => {
                const Icon = e.icon;
                const isSelected = selectedEntity === e.id;
                return (
                  <button
                    key={e.id}
                    onClick={() => handleSelectEntity(e.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-slate-800 border-cyan-500 text-white shadow-md'
                        : `${e.color} hover:bg-slate-800/80`
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <div className="truncate">
                      <div className="text-xs font-bold leading-tight truncate">{e.name}</div>
                      <div className="text-[10px] text-slate-400">{e.count} instances</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              2. Select Instance Record ({selectedEntity})
            </div>
            <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
              {getEntityItems().map((item: any) => {
                const isSelected = selectedItem?.id === item.id || selectedItem?.deviceUuid === item.deviceUuid;
                const label = item.name || item.sku || item.orderNumber || item.shipmentNumber || item.inspectionBatchNumber || item.deviceUuid || item.code;
                const sub = item.code || item.category || item.status || item.primaryCategory || item.mode;

                return (
                  <button
                    key={item.id || item.deviceUuid}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500 text-white shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{label}</div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">{sub}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Middle & Right Column: Deep Schema Inspector & Graph Connections */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Entity Schema & Attribute Inspector
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-purple-300">
                  Entity: {selectedEntity}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Primary Key: {selectedItem?.id || selectedItem?.deviceUuid || 'ID'}
              </span>
            </div>

            {/* Selected Instance Title */}
            <div className="mt-4">
              <h3 className="text-xl font-bold text-white">
                {selectedItem?.name || selectedItem?.sku || selectedItem?.orderNumber || selectedItem?.shipmentNumber || selectedItem?.inspectionBatchNumber || selectedItem?.deviceUuid}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {selectedItem?.description || selectedItem?.businessSemantics || `Canonical ${selectedEntity} instance linked across unified ERP and TMS views.`}
              </p>
            </div>

            {/* Attributes Grid */}
            <div className="mt-5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Canonical Attributes & Raw Schema Types
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {selectedItem &&
                  Object.entries(selectedItem)
                    .filter(([k]) => k !== 'lineItems' && k !== 'associatedOrderIds')
                    .map(([key, val]) => (
                      <div key={key} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                        <div className="text-[10px] text-slate-400 font-mono">{key}</div>
                        <div className="text-xs font-bold text-white truncate mt-0.5">
                          {typeof val === 'boolean'
                            ? val ? 'true (Active)' : 'false'
                            : typeof val === 'number'
                            ? val.toLocaleString()
                            : String(val)}
                        </div>
                      </div>
                    ))}
              </div>
            </div>

            {/* Foreign Key & Relational Graph Links */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                Relational Foreign Keys & Upstream / Downstream Linkages
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {selectedEntity === 'Part' && (
                  <>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400">Supplier Relationship (FK):</span>
                      <div className="font-bold text-indigo-400 mt-0.5">
                        {SUPPLIERS.find(s => s.id === selectedItem?.supplierId)?.name || selectedItem?.supplierId}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400">Target Plant Destination (FK):</span>
                      <div className="font-bold text-emerald-400 mt-0.5">
                        {PLANTS.find(p => p.id === selectedItem?.plantId)?.name || selectedItem?.plantId}
                      </div>
                    </div>
                  </>
                )}

                {selectedEntity === 'QualityInspection' && (
                  <>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400">Inspected SKU (FK):</span>
                      <div className="font-bold text-cyan-400 mt-0.5">
                        {PARTS.find(p => p.id === selectedItem?.partId)?.name || selectedItem?.partId}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400">Associated Supplier (FK):</span>
                      <div className="font-bold text-indigo-400 mt-0.5">
                        {SUPPLIERS.find(s => s.id === selectedItem?.supplierId)?.name || selectedItem?.supplierId}
                      </div>
                    </div>
                  </>
                )}

                {selectedEntity === 'Warehouse' && (
                  <>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400">Primary Manufacturing Plant (FK):</span>
                      <div className="font-bold text-emerald-400 mt-0.5">
                        {PLANTS.find(p => p.id === selectedItem?.plantId)?.name || selectedItem?.plantId}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400">Warehouse Storage Type:</span>
                      <div className="font-bold text-purple-400 mt-0.5">
                        {selectedItem?.warehouseType}
                      </div>
                    </div>
                  </>
                )}

                {selectedEntity === 'Carrier' && (
                  <>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400">Active Shipments Handled:</span>
                      <div className="font-bold text-cyan-400 mt-0.5">
                        {SHIPMENTS.filter(s => s.carrierId === selectedItem?.id).length} Active Shipments
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400">Compliance SLA Target:</span>
                      <div className="font-bold text-amber-400 mt-0.5">
                        {selectedItem?.contractualSlaCommitmentPct}% On-Time Delivery
                      </div>
                    </div>
                  </>
                )}

                {selectedEntity === 'Shipment' && (
                  <>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400">Transport Carrier (FK):</span>
                      <div className="font-bold text-amber-400 mt-0.5">
                        {CARRIERS.find(c => c.id === selectedItem?.carrierId)?.name || selectedItem?.carrierName}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400">IoT Device Telematics UUID:</span>
                      <div className="font-mono font-bold text-teal-400 mt-0.5">
                        {selectedItem?.iotDeviceUuid}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Canonical Enterprise Semantics Certified</span>
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Synchronized with Semantic Layer Views
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
