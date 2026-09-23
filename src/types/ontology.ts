export type Region = 'Global' | 'AMER' | 'EMEA' | 'APAC';

export type Persona = 'planning' | 'procurement' | 'logistics' | 'executive';

export interface Supplier {
  id: string;
  code: string;
  name: string;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  country: string;
  region: 'AMER' | 'EMEA' | 'APAC';
  reliabilityScore: number; // 0-100
  historicalOtdRate: number; // %
  leadTimeVarianceDays: number;
  contractRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  primaryCategory: string;
}

export interface ProductCategory {
  id: string;
  code: string;
  name: string;
  description: string;
  targetDoiDays: number;
  targetFillRatePct: number;
  criticalityTier: 'Strategic Critical' | 'Standard Subassembly' | 'Commodity Direct';
  regulatoryClassification: string;
}

export interface Part {
  id: string;
  sku: string;
  name: string;
  categoryId: string;
  category: 'Semiconductor' | 'Passives & Discrete' | 'Optics & Sensors' | 'Power Systems' | 'Structural Chassis';
  supplierId: string;
  standardCostUSD: number;
  currentInventoryUnits: number;
  safetyStockUnits: number;
  reorderPointUnits: number;
  dailyConsumptionRate: number;
  plantId: string;
  warehouseId?: string;
  leadTimeDays: number;
}

export interface QualityInspection {
  id: string;
  inspectionBatchNumber: string;
  partId: string;
  supplierId: string;
  plantId: string;
  warehouseId: string;
  inspectionDate: string;
  sampleSize: number;
  defectCount: number;
  yieldPct: number;
  failureMode: 'Die Cracking' | 'Tolerance Dimension Drift' | 'Solderability Oxidation' | 'Thermal Shock Outlier' | 'Passed';
  disposition: 'Accepted' | 'Quarantine Held' | 'RMA Returned to Vendor' | 'Scrapped';
  certifiedInspector: string;
  criticalFlag: boolean;
}

export interface Warehouse {
  id: string;
  code: string;
  name: string;
  plantId: string;
  region: 'AMER' | 'EMEA' | 'APAC';
  country: string;
  city: string;
  warehouseType: 'Finished Goods DC' | 'Raw Materials Buffer' | 'Cross-Dock Transit' | 'Bonded Customs Warehouse';
  totalStorageCapacitySqFt: number;
  currentCapacityUtilizationPct: number;
  operatingCostPerSqFt: number;
  hasTempControl: boolean;
  activeInventoryValuationUSD: number;
  dockDoorsCount: number;
}

export interface Plant {
  id: string;
  code: string;
  name: string;
  region: 'AMER' | 'EMEA' | 'APAC';
  country: string;
  city: string;
  plantType: 'Fabrication & Assembly' | 'Component Integration' | 'Regional Distribution Hub';
  dailyCogsUSD: number;
  currentInventoryValuationUSD: number;
  capacityUtilizationPct: number;
  totalActiveOrders: number;
  primaryWarehouseId?: string;
}

export interface Carrier {
  id: string;
  scacCode: string;
  name: string;
  mode: 'Maritime Ocean' | 'Air Cargo Line' | 'Intermodal Rail' | 'Over-the-Road Drayage';
  contractualSlaCommitmentPct: number;
  actualOtdRatePct: number;
  activeFleetSize: number;
  avgPortTurnaroundHours: number;
  complianceRating: 'Preferred Tier-A' | 'Approved Tier-B' | 'Conditional Probation';
}

export interface Shipment {
  id: string;
  shipmentNumber: string;
  trackingNumber: string;
  bolNumber: string;
  carrierId: string;
  carrierScac: string;
  carrierName: string;
  originType: 'Supplier' | 'Plant' | 'Warehouse';
  originId: string;
  destinationType: 'Plant' | 'Customer' | 'Warehouse';
  destinationId: string;
  destinationWarehouseId?: string;
  mode: 'Ocean Container' | 'Air Cargo' | 'Intermodal Rail' | 'Over-the-Road Express';
  status: 'In-Transit' | 'Delivered' | 'Port Dwell' | 'Customs Hold' | 'Exception Delayed';
  dispatchDate: string;
  scheduledDeliveryDate: string;
  actualDeliveryDate: string | null;
  freightCostUSD: number;
  customsDutyCostUSD: number;
  handlingSurchargeUSD: number;
  totalUnitsInTransit: number;
  iotDeviceUuid: string;
  isDelayed: boolean;
  delayDays: number;
  delayReason: 'Port Congestion' | 'Weather Anomaly' | 'Customs Inspection Hold' | 'Supplier Production Delay' | 'None';
  associatedOrderIds: string[];
}

export interface OrderLineItem {
  partId: string;
  sku: string;
  orderedUnits: number;
  fulfilledUnits: number;
  unitPriceUSD: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  orderDate: string;
  promisedDeliveryDate: string;
  actualDeliveryDate: string | null;
  status: 'Delivered On-Time' | 'Delivered Late' | 'In-Transit On-Schedule' | 'At-Risk Delayed';
  totalOrderedUnits: number;
  totalFulfilledUnits: number;
  totalOrderValueUSD: number;
  lineItems: OrderLineItem[];
  priority: 'Critical P1' | 'High P2' | 'Standard P3';
  associatedShipmentId: string;
  plantId: string;
  fulfillmentWarehouseId?: string;
}

export interface Customer {
  id: string;
  name: string;
  code: string;
  tier: 'Strategic Tier 1' | 'Enterprise Tier 2' | 'Commercial Tier 3';
  region: 'AMER' | 'EMEA' | 'APAC';
  country: string;
  slaCommitmentDays: number;
  penaltyClausePctPerDay: number;
}

export interface IoTTelematics {
  deviceUuid: string;
  shipmentId: string;
  lat: number;
  lon: number;
  locationName: string;
  tempCelsius: number;
  dwellHours: number;
  geofenceStatus: 'Port Terminal Dwell' | 'Ocean Transit' | 'Highway Corridor' | 'Plant Arrival Gate';
  anomalyDetected: boolean;
  anomalyMessage?: string;
  lastPingTimestamp: string;
}

export interface SourceSystemMapping {
  system: 'ERP (SAP S/4HANA)' | 'Logistics TMS (Manhattan)' | 'Supplier EDI (ANSI X12)' | 'IoT Telematics (Samsara)';
  rawField: string;
  rawDataType: string;
  canonicalEntity: string;
  canonicalField: string;
  businessSemantics: string;
  transformationLogic: string;
  sampleRawValue: string;
}

export interface CanonicalMetricDefinition {
  id: 'OTD' | 'FILL_RATE' | 'DOI' | 'LANDED_COST';
  name: string;
  acronym: string;
  unit: string;
  canonicalFormula: string;
  semanticViewName: string;
  description: string;
  governanceRules: string[];
  disparateSystemPitfalls: {
    system: string;
    unGovernedDefinition: string;
    whyItCausesDisputes: string;
  }[];
}

// Data Lineage Types
export interface LineageStage {
  stageId: 'source' | 'cleansing' | 'semantic_model' | 'governance_rule' | 'conversational_output';
  stageName: string;
  systemOrLayer: string;
  description: string;
}

export interface MetricLineageTrace {
  metricId: string;
  metricName: string;
  rawInputs: {
    system: string;
    table: string;
    column: string;
    rawType: string;
    sampleValue: string;
  }[];
  transformations: {
    stepOrder: number;
    ruleName: string;
    sqlExpression: string;
    description: string;
  }[];
  semanticView: {
    viewName: string;
    granularity: string;
    measures: string[];
    dimensions: string[];
  };
  governanceChecks: {
    ruleCode: string;
    title: string;
    enforcementMethod: string;
    passed: boolean;
  }[];
  consumptionPersonas: {
    persona: Persona;
    interpretedMetricValue: string;
    isIdenticalAcrossAll: boolean;
    tailoredView: string;
  }[];
}

export interface GovernedQueryResult {
  query: string;
  persona: Persona;
  regionScope: Region;
  timestamp: string;
  governanceVerification: {
    passed: boolean;
    policyCertified: boolean;
    canonicalMetricId: string;
    metricFullName: string;
    canonicalFormula: string;
    governingPolicyStatement: string;
  };
  metrics: {
    canonicalValue: string | number;
    unit: string;
    comparisonBenchmark?: string;
    historicalTrend?: { period: string; value: number }[];
  };
  semanticViewQuery: {
    viewName: string;
    ansiSql: string;
    compiledDbtYaml: string;
    mappedSourceSystems: string[];
  };
  executiveSummary: string;
  personaContext: {
    persona: Persona;
    operationalLens: string;
    primaryConcerns: string[];
    actionableRecommendations: string[];
  };
  crossDomainBlastRadius?: {
    rootCauseSupplier: string;
    delayedPartSku: string;
    bottleneckPlant: string;
    stalledShipment: string;
    impactedCustomers: {
      customerName: string;
      orderNumber: string;
      valueAtRiskUSD: number;
      delayDays: number;
    }[];
  };
  detailedRecords?: any[];
}

