import {
  Supplier,
  ProductCategory,
  Part,
  QualityInspection,
  Warehouse,
  Plant,
  Carrier,
  Shipment,
  Order,
  Customer,
  IoTTelematics,
  SourceSystemMapping,
  CanonicalMetricDefinition,
  MetricLineageTrace
} from '../types/ontology';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'CAT-01',
    code: 'SEMI-CORE',
    name: 'Advanced Semiconductors',
    description: 'High-density microcontrollers, system-on-chips, and high-bandwidth memory silicon stacks.',
    targetDoiDays: 45,
    targetFillRatePct: 98.0,
    criticalityTier: 'Strategic Critical',
    regulatoryClassification: 'EAR99 / Dual-Use Controlled'
  },
  {
    id: 'CAT-02',
    code: 'PASSIVES',
    name: 'Passives & Discrete Components',
    description: 'High-temperature multilayer ceramic capacitors, thin-film precision resistors, and inductors.',
    targetDoiDays: 25,
    targetFillRatePct: 99.5,
    criticalityTier: 'Standard Subassembly',
    regulatoryClassification: 'RoHS / REACH Compliant'
  },
  {
    id: 'CAT-03',
    code: 'POWER-MOD',
    name: 'Power Semiconductor Modules',
    description: 'Silicon Carbide (SiC) and Gallium Nitride (GaN) high-voltage inverters and power distribution units.',
    targetDoiDays: 35,
    targetFillRatePct: 97.5,
    criticalityTier: 'Strategic Critical',
    regulatoryClassification: 'Automotive AEC-Q101'
  },
  {
    id: 'CAT-04',
    code: 'OPTICS-LIDAR',
    name: 'Optics & Autonomous Sensors',
    description: 'Solid-state LiDAR laser emitters, multi-spectral optical receivers, and stereo radar sensors.',
    targetDoiDays: 30,
    targetFillRatePct: 96.0,
    criticalityTier: 'Strategic Critical',
    regulatoryClassification: 'Class 1 Eye-Safe Laser'
  },
  {
    id: 'CAT-05',
    code: 'STRUCTURAL',
    name: 'Structural Enclosures & Chassis',
    description: 'Precision CNC-machined aerospace-grade aluminum unibodies and thermal dissipation chassis.',
    targetDoiDays: 20,
    targetFillRatePct: 99.0,
    criticalityTier: 'Commodity Direct',
    regulatoryClassification: 'ISO 9001 / AS9100'
  }
];

export const SUPPLIERS: Supplier[] = [
  {
    id: 'SUP-01',
    code: 'TSMC-TW',
    name: 'TSMC Advanced Silicon',
    tier: 'Tier 1',
    country: 'Taiwan',
    region: 'APAC',
    reliabilityScore: 97,
    historicalOtdRate: 98.2,
    leadTimeVarianceDays: 1.2,
    contractRisk: 'Low',
    primaryCategory: 'Semiconductor'
  },
  {
    id: 'SUP-02',
    code: 'MURATA-JP',
    name: 'Murata Micro Precision',
    tier: 'Tier 2',
    country: 'Japan',
    region: 'APAC',
    reliabilityScore: 78,
    historicalOtdRate: 81.5,
    leadTimeVarianceDays: 8.4,
    contractRisk: 'High',
    primaryCategory: 'Passives & Discrete'
  },
  {
    id: 'SUP-03',
    code: 'INFINEON-DE',
    name: 'Infineon Power Semiconductors',
    tier: 'Tier 1',
    country: 'Germany',
    region: 'EMEA',
    reliabilityScore: 94,
    historicalOtdRate: 95.1,
    leadTimeVarianceDays: 2.0,
    contractRisk: 'Low',
    primaryCategory: 'Power Systems'
  },
  {
    id: 'SUP-04',
    code: 'BOSCH-SENS',
    name: 'Bosch Connected Mobility',
    tier: 'Tier 1',
    country: 'Germany',
    region: 'EMEA',
    reliabilityScore: 91,
    historicalOtdRate: 92.4,
    leadTimeVarianceDays: 3.1,
    contractRisk: 'Low',
    primaryCategory: 'Optics & Sensors'
  },
  {
    id: 'SUP-05',
    code: 'FOXCONN-CH',
    name: 'Foxconn Precision Industrial',
    tier: 'Tier 1',
    country: 'China',
    region: 'APAC',
    reliabilityScore: 86,
    historicalOtdRate: 87.0,
    leadTimeVarianceDays: 5.5,
    contractRisk: 'Medium',
    primaryCategory: 'Structural Chassis'
  },
  {
    id: 'SUP-06',
    code: 'SAMSUNG-KR',
    name: 'Samsung Semiconductor & HBM',
    tier: 'Tier 1',
    country: 'South Korea',
    region: 'APAC',
    reliabilityScore: 93,
    historicalOtdRate: 94.8,
    leadTimeVarianceDays: 2.3,
    contractRisk: 'Low',
    primaryCategory: 'Semiconductor'
  },
  {
    id: 'SUP-07',
    code: 'VALEO-MX',
    name: 'Valeo Thermal Systems',
    tier: 'Tier 2',
    country: 'Mexico',
    region: 'AMER',
    reliabilityScore: 84,
    historicalOtdRate: 85.3,
    leadTimeVarianceDays: 4.8,
    contractRisk: 'Medium',
    primaryCategory: 'Power Systems'
  },
  {
    id: 'SUP-08',
    code: 'NXP-NL',
    name: 'NXP Automotive Processors',
    tier: 'Tier 1',
    country: 'Netherlands',
    region: 'EMEA',
    reliabilityScore: 95,
    historicalOtdRate: 96.0,
    leadTimeVarianceDays: 1.8,
    contractRisk: 'Low',
    primaryCategory: 'Semiconductor'
  }
];

export const WAREHOUSES: Warehouse[] = [
  {
    id: 'WH-01',
    code: 'WH-AUS-BUF',
    name: 'Austin Central Materials Vault & Buffer',
    plantId: 'PLANT-01',
    region: 'AMER',
    country: 'United States',
    city: 'Austin, TX',
    warehouseType: 'Raw Materials Buffer',
    totalStorageCapacitySqFt: 450000,
    currentCapacityUtilizationPct: 88.5,
    operatingCostPerSqFt: 18.20,
    hasTempControl: true,
    activeInventoryValuationUSD: 54200000,
    dockDoorsCount: 32
  },
  {
    id: 'WH-02',
    code: 'WH-DRE-CLEAN',
    name: 'Dresden European Cleanroom Logistics Depot',
    plantId: 'PLANT-02',
    region: 'EMEA',
    country: 'Germany',
    city: 'Dresden',
    warehouseType: 'Bonded Customs Warehouse',
    totalStorageCapacitySqFt: 320000,
    currentCapacityUtilizationPct: 82.0,
    operatingCostPerSqFt: 22.50,
    hasTempControl: true,
    activeInventoryValuationUSD: 46800000,
    dockDoorsCount: 24
  },
  {
    id: 'WH-03',
    code: 'WH-SHA-BOND',
    name: 'Shanghai Waigaoqiao Free Trade Logistics DC',
    plantId: 'PLANT-03',
    region: 'APAC',
    country: 'China',
    city: 'Shanghai',
    warehouseType: 'Bonded Customs Warehouse',
    totalStorageCapacitySqFt: 580000,
    currentCapacityUtilizationPct: 91.2,
    operatingCostPerSqFt: 14.80,
    hasTempControl: true,
    activeInventoryValuationUSD: 69500000,
    dockDoorsCount: 48
  },
  {
    id: 'WH-04',
    code: 'WH-GDL-DC',
    name: 'Guadalajara Component Consolidation DC',
    plantId: 'PLANT-04',
    region: 'AMER',
    country: 'Mexico',
    city: 'Guadalajara',
    warehouseType: 'Cross-Dock Transit',
    totalStorageCapacitySqFt: 210000,
    currentCapacityUtilizationPct: 76.4,
    operatingCostPerSqFt: 11.50,
    hasTempControl: false,
    activeInventoryValuationUSD: 21400000,
    dockDoorsCount: 18
  },
  {
    id: 'WH-05',
    code: 'WH-SIN-AP',
    name: 'Singapore Changi Global Air Cargo Gateway',
    plantId: 'PLANT-05',
    region: 'APAC',
    country: 'Singapore',
    city: 'Singapore',
    warehouseType: 'Cross-Dock Transit',
    totalStorageCapacitySqFt: 280000,
    currentCapacityUtilizationPct: 84.8,
    operatingCostPerSqFt: 24.10,
    hasTempControl: true,
    activeInventoryValuationUSD: 31200000,
    dockDoorsCount: 22
  },
  {
    id: 'WH-06',
    code: 'WH-DUB-FG',
    name: 'Dublin European Finished Goods DC',
    plantId: 'PLANT-06',
    region: 'EMEA',
    country: 'Ireland',
    city: 'Dublin',
    warehouseType: 'Finished Goods DC',
    totalStorageCapacitySqFt: 260000,
    currentCapacityUtilizationPct: 73.5,
    operatingCostPerSqFt: 19.40,
    hasTempControl: true,
    activeInventoryValuationUSD: 19800000,
    dockDoorsCount: 20
  }
];

export const CARRIERS: Carrier[] = [
  {
    id: 'CARR-01',
    scacCode: 'MAEU',
    name: 'Maersk Ocean Liner Worldwide',
    mode: 'Maritime Ocean',
    contractualSlaCommitmentPct: 92.0,
    actualOtdRatePct: 81.4, // Dragged down by Port of LA dwell!
    activeFleetSize: 720,
    avgPortTurnaroundHours: 86.4,
    complianceRating: 'Conditional Probation'
  },
  {
    id: 'CARR-02',
    scacCode: 'PACF',
    name: 'Pacific Rim Air Cargo Logistics',
    mode: 'Air Cargo Line',
    contractualSlaCommitmentPct: 98.0,
    actualOtdRatePct: 97.6,
    activeFleetSize: 64,
    avgPortTurnaroundHours: 14.2,
    complianceRating: 'Preferred Tier-A'
  },
  {
    id: 'CARR-03',
    scacCode: 'DBDN',
    name: 'DB Schenker European Logistics',
    mode: 'Over-the-Road Drayage',
    contractualSlaCommitmentPct: 95.0,
    actualOtdRatePct: 96.2,
    activeFleetSize: 1850,
    avgPortTurnaroundHours: 6.8,
    complianceRating: 'Preferred Tier-A'
  },
  {
    id: 'CARR-04',
    scacCode: 'FEDX',
    name: 'FedEx Freight Direct',
    mode: 'Over-the-Road Drayage',
    contractualSlaCommitmentPct: 94.0,
    actualOtdRatePct: 89.0,
    activeFleetSize: 4200,
    avgPortTurnaroundHours: 12.0,
    complianceRating: 'Approved Tier-B'
  },
  {
    id: 'CARR-05',
    scacCode: 'DHLX',
    name: 'DHL Global Forwarding Europe',
    mode: 'Air Cargo Line',
    contractualSlaCommitmentPct: 96.0,
    actualOtdRatePct: 95.8,
    activeFleetSize: 520,
    avgPortTurnaroundHours: 8.5,
    complianceRating: 'Preferred Tier-A'
  },
  {
    id: 'CARR-06',
    scacCode: 'HLCU',
    name: 'Hapag-Lloyd Ocean Express',
    mode: 'Maritime Ocean',
    contractualSlaCommitmentPct: 90.0,
    actualOtdRatePct: 88.5,
    activeFleetSize: 260,
    avgPortTurnaroundHours: 48.0,
    complianceRating: 'Approved Tier-B'
  }
];

export const PLANTS: Plant[] = [
  {
    id: 'PLANT-01',
    code: 'AUS-GIGA',
    name: 'Austin Gigafactory & Integration Plant',
    region: 'AMER',
    country: 'United States',
    city: 'Austin, TX',
    plantType: 'Fabrication & Assembly',
    dailyCogsUSD: 1850000,
    currentInventoryValuationUSD: 54200000,
    capacityUtilizationPct: 92.4,
    totalActiveOrders: 14,
    primaryWarehouseId: 'WH-01'
  },
  {
    id: 'PLANT-02',
    code: 'DRE-FAB',
    name: 'Dresden European Advanced Fab',
    region: 'EMEA',
    country: 'Germany',
    city: 'Dresden',
    plantType: 'Fabrication & Assembly',
    dailyCogsUSD: 1420000,
    currentInventoryValuationUSD: 46800000,
    capacityUtilizationPct: 88.1,
    totalActiveOrders: 11,
    primaryWarehouseId: 'WH-02'
  },
  {
    id: 'PLANT-03',
    code: 'SHA-HUB',
    name: 'Shanghai Mega Integration Hub',
    region: 'APAC',
    country: 'China',
    city: 'Shanghai',
    plantType: 'Fabrication & Assembly',
    dailyCogsUSD: 2100000,
    currentInventoryValuationUSD: 69500000,
    capacityUtilizationPct: 95.0,
    totalActiveOrders: 18,
    primaryWarehouseId: 'WH-03'
  },
  {
    id: 'PLANT-04',
    code: 'GDL-MOD',
    name: 'Guadalajara Modular Assembly',
    region: 'AMER',
    country: 'Mexico',
    city: 'Guadalajara',
    plantType: 'Component Integration',
    dailyCogsUSD: 780000,
    currentInventoryValuationUSD: 21400000,
    capacityUtilizationPct: 81.5,
    totalActiveOrders: 8,
    primaryWarehouseId: 'WH-04'
  },
  {
    id: 'PLANT-05',
    code: 'SIN-FUL',
    name: 'Singapore Southeast Asian Distribution Hub',
    region: 'APAC',
    country: 'Singapore',
    city: 'Singapore',
    plantType: 'Regional Distribution Hub',
    dailyCogsUSD: 950000,
    currentInventoryValuationUSD: 31200000,
    capacityUtilizationPct: 89.2,
    totalActiveOrders: 9,
    primaryWarehouseId: 'WH-05'
  },
  {
    id: 'PLANT-06',
    code: 'DUB-LOG',
    name: 'Dublin European Fulfillment Center',
    region: 'EMEA',
    country: 'Ireland',
    city: 'Dublin',
    plantType: 'Regional Distribution Hub',
    dailyCogsUSD: 650000,
    currentInventoryValuationUSD: 19800000,
    capacityUtilizationPct: 79.4,
    totalActiveOrders: 6,
    primaryWarehouseId: 'WH-06'
  }
];

export const PARTS: Part[] = [
  {
    id: 'PART-01',
    sku: 'SC-3NM-SOC-01',
    name: '3nm Ultra Compute Core SoC',
    categoryId: 'CAT-01',
    category: 'Semiconductor',
    supplierId: 'SUP-01',
    standardCostUSD: 145.00,
    currentInventoryUnits: 38000,
    safetyStockUnits: 25000,
    reorderPointUnits: 30000,
    dailyConsumptionRate: 1200,
    plantId: 'PLANT-01',
    warehouseId: 'WH-01',
    leadTimeDays: 28
  },
  {
    id: 'PART-02',
    sku: 'MLCC-0402-100NF',
    name: '0402 High-Temp Multi-Layer Capacitor',
    categoryId: 'CAT-02',
    category: 'Passives & Discrete',
    supplierId: 'SUP-02',
    standardCostUSD: 0.18,
    currentInventoryUnits: 210000, // CRITICALLY LOW due to Murata delay!
    safetyStockUnits: 500000,
    reorderPointUnits: 650000,
    dailyConsumptionRate: 45000,
    plantId: 'PLANT-01', // Starving Austin Plant!
    warehouseId: 'WH-01',
    leadTimeDays: 45
  },
  {
    id: 'PART-03',
    sku: 'IGBT-1200V-PW',
    name: '1200V Silicon-Carbide Power Module',
    categoryId: 'CAT-03',
    category: 'Power Systems',
    supplierId: 'SUP-03',
    standardCostUSD: 85.50,
    currentInventoryUnits: 14500,
    safetyStockUnits: 9000,
    reorderPointUnits: 11000,
    dailyConsumptionRate: 400,
    plantId: 'PLANT-02',
    warehouseId: 'WH-02',
    leadTimeDays: 21
  },
  {
    id: 'PART-04',
    sku: 'LIDAR-GEN4-SENS',
    name: 'Solid-State LiDAR Optical Transceiver',
    categoryId: 'CAT-04',
    category: 'Optics & Sensors',
    supplierId: 'SUP-04',
    standardCostUSD: 240.00,
    currentInventoryUnits: 6200,
    safetyStockUnits: 4000,
    reorderPointUnits: 5200,
    dailyConsumptionRate: 180,
    plantId: 'PLANT-02',
    warehouseId: 'WH-02',
    leadTimeDays: 35
  },
  {
    id: 'PART-05',
    sku: 'AL-UNIBODY-CH1',
    name: 'Precision CNC Extruded Aluminum Unibody',
    categoryId: 'CAT-05',
    category: 'Structural Chassis',
    supplierId: 'SUP-05',
    standardCostUSD: 62.00,
    currentInventoryUnits: 41000,
    safetyStockUnits: 20000,
    reorderPointUnits: 28000,
    dailyConsumptionRate: 1100,
    plantId: 'PLANT-03',
    warehouseId: 'WH-03',
    leadTimeDays: 14
  },
  {
    id: 'PART-06',
    sku: 'HBM3E-24GB-RAM',
    name: '24GB High Bandwidth Memory Stack (HBM3e)',
    categoryId: 'CAT-01',
    category: 'Semiconductor',
    supplierId: 'SUP-06',
    standardCostUSD: 195.00,
    currentInventoryUnits: 29000,
    safetyStockUnits: 18000,
    reorderPointUnits: 22000,
    dailyConsumptionRate: 850,
    plantId: 'PLANT-03',
    warehouseId: 'WH-03',
    leadTimeDays: 32
  },
  {
    id: 'PART-07',
    sku: 'VTH-COOL-500W',
    name: 'Dual-Phase Liquid Cooling Subassembly',
    categoryId: 'CAT-03',
    category: 'Power Systems',
    supplierId: 'SUP-07',
    standardCostUSD: 44.00,
    currentInventoryUnits: 11200,
    safetyStockUnits: 7500,
    reorderPointUnits: 9000,
    dailyConsumptionRate: 350,
    plantId: 'PLANT-04',
    warehouseId: 'WH-04',
    leadTimeDays: 18
  },
  {
    id: 'PART-08',
    sku: 'MCU-AUTO-S32K',
    name: 'Automotive Safety MCU ARM Cortex-M7',
    categoryId: 'CAT-01',
    category: 'Semiconductor',
    supplierId: 'SUP-08',
    standardCostUSD: 18.20,
    currentInventoryUnits: 55000,
    safetyStockUnits: 32000,
    reorderPointUnits: 40000,
    dailyConsumptionRate: 1400,
    plantId: 'PLANT-02',
    warehouseId: 'WH-02',
    leadTimeDays: 24
  }
];

export const QUALITY_INSPECTIONS: QualityInspection[] = [
  {
    id: 'QI-2026-081',
    inspectionBatchNumber: 'LOT-TSMC-3NM-881',
    partId: 'PART-01',
    supplierId: 'SUP-01',
    plantId: 'PLANT-01',
    warehouseId: 'WH-01',
    inspectionDate: '2026-09-08',
    sampleSize: 500,
    defectCount: 2,
    yieldPct: 99.6,
    failureMode: 'Passed',
    disposition: 'Accepted',
    certifiedInspector: 'QA-LEAD-77 (Dr. K. Vance)',
    criticalFlag: false
  },
  {
    id: 'QI-2026-082',
    inspectionBatchNumber: 'LOT-MUR-CAP-9921',
    partId: 'PART-02', // Murata MLCC
    supplierId: 'SUP-02',
    plantId: 'PLANT-01',
    warehouseId: 'WH-01',
    inspectionDate: '2026-09-12',
    sampleSize: 10000,
    defectCount: 780, // High defect rate!
    yieldPct: 92.2,
    failureMode: 'Solderability Oxidation',
    disposition: 'Quarantine Held',
    certifiedInspector: 'QA-SENIOR-12 (M. Schmidt)',
    criticalFlag: true
  },
  {
    id: 'QI-2026-083',
    inspectionBatchNumber: 'LOT-INF-IGBT-4410',
    partId: 'PART-03',
    supplierId: 'SUP-03',
    plantId: 'PLANT-02',
    warehouseId: 'WH-02',
    inspectionDate: '2026-09-13',
    sampleSize: 300,
    defectCount: 3,
    yieldPct: 99.0,
    failureMode: 'Passed',
    disposition: 'Accepted',
    certifiedInspector: 'QA-INSPECT-04 (H. Weber)',
    criticalFlag: false
  },
  {
    id: 'QI-2026-084',
    inspectionBatchNumber: 'LOT-BOS-LIDAR-119',
    partId: 'PART-04',
    supplierId: 'SUP-04',
    plantId: 'PLANT-02',
    warehouseId: 'WH-02',
    inspectionDate: '2026-09-14',
    sampleSize: 150,
    defectCount: 4,
    yieldPct: 97.3,
    failureMode: 'Tolerance Dimension Drift',
    disposition: 'Accepted',
    certifiedInspector: 'QA-OPTICS-09 (T. Lindqvist)',
    criticalFlag: false
  },
  {
    id: 'QI-2026-085',
    inspectionBatchNumber: 'LOT-SAMS-HBM-770',
    partId: 'PART-06',
    supplierId: 'SUP-06',
    plantId: 'PLANT-03',
    warehouseId: 'WH-03',
    inspectionDate: '2026-09-09',
    sampleSize: 400,
    defectCount: 1,
    yieldPct: 99.75,
    failureMode: 'Passed',
    disposition: 'Accepted',
    certifiedInspector: 'QA-SEMI-23 (L. Chen)',
    criticalFlag: false
  },
  {
    id: 'QI-2026-086',
    inspectionBatchNumber: 'LOT-VALEO-COOL-331',
    partId: 'PART-07',
    supplierId: 'SUP-07',
    plantId: 'PLANT-04',
    warehouseId: 'WH-04',
    inspectionDate: '2026-09-15',
    sampleSize: 250,
    defectCount: 18,
    yieldPct: 92.8,
    failureMode: 'Thermal Shock Outlier',
    disposition: 'RMA Returned to Vendor',
    certifiedInspector: 'QA-MECH-15 (C. Morales)',
    criticalFlag: true
  }
];

export const CUSTOMERS: Customer[] = [
  {
    id: 'CUST-01',
    name: 'Tesla Motors Global',
    code: 'TSLA-AUTO',
    tier: 'Strategic Tier 1',
    region: 'AMER',
    country: 'United States',
    slaCommitmentDays: 5,
    penaltyClausePctPerDay: 1.5
  },
  {
    id: 'CUST-02',
    name: 'Apple Enterprise Systems',
    code: 'AAPL-ENT',
    tier: 'Strategic Tier 1',
    region: 'AMER',
    country: 'United States',
    slaCommitmentDays: 3,
    penaltyClausePctPerDay: 2.0
  },
  {
    id: 'CUST-03',
    name: 'Siemens Industrial Digital Industries',
    code: 'SIEM-IND',
    tier: 'Strategic Tier 1',
    region: 'EMEA',
    country: 'Germany',
    slaCommitmentDays: 7,
    penaltyClausePctPerDay: 1.2
  },
  {
    id: 'CUST-04',
    name: 'Microsoft Cloud Hardware Infrastructure',
    code: 'MSFT-AZR',
    tier: 'Strategic Tier 1',
    region: 'AMER',
    country: 'United States',
    slaCommitmentDays: 4,
    penaltyClausePctPerDay: 1.8
  },
  {
    id: 'CUST-05',
    name: 'Sony Interactive Platforms',
    code: 'SNY-ENT',
    tier: 'Enterprise Tier 2',
    region: 'APAC',
    country: 'Japan',
    slaCommitmentDays: 6,
    penaltyClausePctPerDay: 1.0
  },
  {
    id: 'CUST-06',
    name: 'ASML Semiconductor Lithography Systems',
    code: 'ASML-NL',
    tier: 'Strategic Tier 1',
    region: 'EMEA',
    country: 'Netherlands',
    slaCommitmentDays: 5,
    penaltyClausePctPerDay: 2.5
  },
  {
    id: 'CUST-07',
    name: 'Toyota Connected Services',
    code: 'TOY-CON',
    tier: 'Enterprise Tier 2',
    region: 'APAC',
    country: 'Japan',
    slaCommitmentDays: 7,
    penaltyClausePctPerDay: 1.1
  },
  {
    id: 'CUST-08',
    name: 'Dell Infrastructure Solutions',
    code: 'DELL-SRV',
    tier: 'Commercial Tier 3',
    region: 'AMER',
    country: 'United States',
    slaCommitmentDays: 10,
    penaltyClausePctPerDay: 0.8
  }
];

export const SHIPMENTS: Shipment[] = [
  {
    id: 'SHP-7021',
    shipmentNumber: 'SHP-2026-7021',
    trackingNumber: '1Z99999997021948',
    bolNumber: 'BOL-MUR-AUS-8812',
    carrierId: 'CARR-01',
    carrierScac: 'MAEU',
    carrierName: 'Maersk Ocean Liner Worldwide',
    originType: 'Supplier',
    originId: 'SUP-02', // Murata Japan
    destinationType: 'Warehouse',
    destinationId: 'PLANT-01',
    destinationWarehouseId: 'WH-01', // Austin Central Buffer
    mode: 'Ocean Container',
    status: 'Port Dwell',
    dispatchDate: '2026-08-28',
    scheduledDeliveryDate: '2026-09-15',
    actualDeliveryDate: null,
    freightCostUSD: 14500,
    customsDutyCostUSD: 4200,
    handlingSurchargeUSD: 2800,
    totalUnitsInTransit: 250000,
    iotDeviceUuid: 'IOT-9901',
    isDelayed: true,
    delayDays: 8,
    delayReason: 'Port Congestion',
    associatedOrderIds: ['ORD-9904', 'ORD-9908']
  },
  {
    id: 'SHP-7022',
    shipmentNumber: 'SHP-2026-7022',
    trackingNumber: '1Z99999997022831',
    bolNumber: 'BOL-TSM-SHA-9144',
    carrierId: 'CARR-02',
    carrierScac: 'PACF',
    carrierName: 'Pacific Rim Air Cargo Logistics',
    originType: 'Supplier',
    originId: 'SUP-01',
    destinationType: 'Warehouse',
    destinationId: 'PLANT-03',
    destinationWarehouseId: 'WH-03',
    mode: 'Air Cargo',
    status: 'Delivered',
    dispatchDate: '2026-09-08',
    scheduledDeliveryDate: '2026-09-11',
    actualDeliveryDate: '2026-09-10',
    freightCostUSD: 22800,
    customsDutyCostUSD: 6100,
    handlingSurchargeUSD: 1100,
    totalUnitsInTransit: 15000,
    iotDeviceUuid: 'IOT-9902',
    isDelayed: false,
    delayDays: 0,
    delayReason: 'None',
    associatedOrderIds: ['ORD-9901', 'ORD-9905']
  },
  {
    id: 'SHP-7023',
    shipmentNumber: 'SHP-2026-7023',
    trackingNumber: '1Z99999997023102',
    bolNumber: 'BOL-INF-DRE-4301',
    carrierId: 'CARR-03',
    carrierScac: 'DBDN',
    carrierName: 'DB Schenker European Logistics',
    originType: 'Supplier',
    originId: 'SUP-03',
    destinationType: 'Warehouse',
    destinationId: 'PLANT-02',
    destinationWarehouseId: 'WH-02',
    mode: 'Over-the-Road Express',
    status: 'Delivered',
    dispatchDate: '2026-09-12',
    scheduledDeliveryDate: '2026-09-14',
    actualDeliveryDate: '2026-09-14',
    freightCostUSD: 5200,
    customsDutyCostUSD: 0,
    handlingSurchargeUSD: 400,
    totalUnitsInTransit: 8500,
    iotDeviceUuid: 'IOT-9903',
    isDelayed: false,
    delayDays: 0,
    delayReason: 'None',
    associatedOrderIds: ['ORD-9902']
  },
  {
    id: 'SHP-7024',
    shipmentNumber: 'SHP-2026-7024',
    trackingNumber: '1Z99999997024773',
    bolNumber: 'BOL-AUS-TSLA-3309',
    carrierId: 'CARR-04',
    carrierScac: 'FEDX',
    carrierName: 'FedEx Freight Direct',
    originType: 'Warehouse',
    originId: 'WH-01',
    destinationType: 'Customer',
    destinationId: 'CUST-01', // Tesla
    mode: 'Over-the-Road Express',
    status: 'Exception Delayed',
    dispatchDate: '2026-09-18',
    scheduledDeliveryDate: '2026-09-21',
    actualDeliveryDate: null,
    freightCostUSD: 7800,
    customsDutyCostUSD: 0,
    handlingSurchargeUSD: 600,
    totalUnitsInTransit: 1200,
    iotDeviceUuid: 'IOT-9904',
    isDelayed: true,
    delayDays: 4,
    delayReason: 'Supplier Production Delay',
    associatedOrderIds: ['ORD-9904']
  },
  {
    id: 'SHP-7025',
    shipmentNumber: 'SHP-2026-7025',
    trackingNumber: '1Z99999997025642',
    bolNumber: 'BOL-DRE-SIEM-5512',
    carrierId: 'CARR-05',
    carrierScac: 'DHLX',
    carrierName: 'DHL Global Forwarding Europe',
    originType: 'Warehouse',
    originId: 'WH-02',
    destinationType: 'Customer',
    destinationId: 'CUST-03', // Siemens
    mode: 'Over-the-Road Express',
    status: 'Delivered',
    dispatchDate: '2026-09-14',
    scheduledDeliveryDate: '2026-09-17',
    actualDeliveryDate: '2026-09-16',
    freightCostUSD: 4900,
    customsDutyCostUSD: 0,
    handlingSurchargeUSD: 350,
    totalUnitsInTransit: 850,
    iotDeviceUuid: 'IOT-9905',
    isDelayed: false,
    delayDays: 0,
    delayReason: 'None',
    associatedOrderIds: ['ORD-9903']
  },
  {
    id: 'SHP-7026',
    shipmentNumber: 'SHP-2026-7026',
    trackingNumber: '1Z99999997026219',
    bolNumber: 'BOL-SHA-MSFT-7711',
    carrierId: 'CARR-06',
    carrierScac: 'HLCU',
    carrierName: 'Hapag-Lloyd Ocean Express',
    originType: 'Warehouse',
    originId: 'WH-03',
    destinationType: 'Customer',
    destinationId: 'CUST-04', // Microsoft
    mode: 'Ocean Container',
    status: 'In-Transit',
    dispatchDate: '2026-09-05',
    scheduledDeliveryDate: '2026-09-24',
    actualDeliveryDate: null,
    freightCostUSD: 18900,
    customsDutyCostUSD: 5200,
    handlingSurchargeUSD: 1800,
    totalUnitsInTransit: 3400,
    iotDeviceUuid: 'IOT-9906',
    isDelayed: false,
    delayDays: 0,
    delayReason: 'None',
    associatedOrderIds: ['ORD-9907']
  }
];

export const ORDERS: Order[] = [
  {
    id: 'ORD-9901',
    orderNumber: 'SO-2026-9901',
    customerId: 'CUST-02', // Apple
    orderDate: '2026-08-20',
    promisedDeliveryDate: '2026-09-12',
    actualDeliveryDate: '2026-09-11',
    status: 'Delivered On-Time',
    totalOrderedUnits: 10000,
    totalFulfilledUnits: 10000,
    totalOrderValueUSD: 1950000,
    priority: 'Critical P1',
    associatedShipmentId: 'SHP-7022',
    plantId: 'PLANT-03',
    fulfillmentWarehouseId: 'WH-03',
    lineItems: [
      { partId: 'PART-06', sku: 'HBM3E-24GB-RAM', orderedUnits: 10000, fulfilledUnits: 10000, unitPriceUSD: 195.00 }
    ]
  },
  {
    id: 'ORD-9902',
    orderNumber: 'SO-2026-9902',
    customerId: 'CUST-06', // ASML
    orderDate: '2026-08-25',
    promisedDeliveryDate: '2026-09-15',
    actualDeliveryDate: '2026-09-14',
    status: 'Delivered On-Time',
    totalOrderedUnits: 4000,
    totalFulfilledUnits: 3850, // partial fulfillment: 96.25%
    totalOrderValueUSD: 960000,
    priority: 'Critical P1',
    associatedShipmentId: 'SHP-7023',
    plantId: 'PLANT-02',
    fulfillmentWarehouseId: 'WH-02',
    lineItems: [
      { partId: 'PART-04', sku: 'LIDAR-GEN4-SENS', orderedUnits: 4000, fulfilledUnits: 3850, unitPriceUSD: 240.00 }
    ]
  },
  {
    id: 'ORD-9903',
    orderNumber: 'SO-2026-9903',
    customerId: 'CUST-03', // Siemens
    orderDate: '2026-08-28',
    promisedDeliveryDate: '2026-09-18',
    actualDeliveryDate: '2026-09-17',
    status: 'Delivered On-Time',
    totalOrderedUnits: 5000,
    totalFulfilledUnits: 5000,
    totalOrderValueUSD: 427500,
    priority: 'High P2',
    associatedShipmentId: 'SHP-7025',
    plantId: 'PLANT-02',
    fulfillmentWarehouseId: 'WH-02',
    lineItems: [
      { partId: 'PART-03', sku: 'IGBT-1200V-PW', orderedUnits: 5000, fulfilledUnits: 5000, unitPriceUSD: 85.50 }
    ]
  },
  {
    id: 'ORD-9904',
    orderNumber: 'SO-2026-9904',
    customerId: 'CUST-01', // Tesla Motors
    orderDate: '2026-09-01',
    promisedDeliveryDate: '2026-09-20',
    actualDeliveryDate: null,
    status: 'At-Risk Delayed', // Impacted by Murata MLCC shortage via SHP-7021 / SHP-7024
    totalOrderedUnits: 2500,
    totalFulfilledUnits: 1800, // 72% fill rate!
    totalOrderValueUSD: 875000,
    priority: 'Critical P1',
    associatedShipmentId: 'SHP-7024',
    plantId: 'PLANT-01',
    fulfillmentWarehouseId: 'WH-01',
    lineItems: [
      { partId: 'PART-01', sku: 'SC-3NM-SOC-01', orderedUnits: 2500, fulfilledUnits: 1800, unitPriceUSD: 350.00 }
    ]
  },
  {
    id: 'ORD-9905',
    orderNumber: 'SO-2026-9905',
    customerId: 'CUST-05', // Sony
    orderDate: '2026-09-02',
    promisedDeliveryDate: '2026-09-16',
    actualDeliveryDate: '2026-09-15',
    status: 'Delivered On-Time',
    totalOrderedUnits: 8000,
    totalFulfilledUnits: 7900,
    totalOrderValueUSD: 496000,
    priority: 'High P2',
    associatedShipmentId: 'SHP-7022',
    plantId: 'PLANT-03',
    fulfillmentWarehouseId: 'WH-03',
    lineItems: [
      { partId: 'PART-05', sku: 'AL-UNIBODY-CH1', orderedUnits: 8000, fulfilledUnits: 7900, unitPriceUSD: 62.00 }
    ]
  },
  {
    id: 'ORD-9906',
    orderNumber: 'SO-2026-9906',
    customerId: 'CUST-07', // Toyota
    orderDate: '2026-09-03',
    promisedDeliveryDate: '2026-09-18',
    actualDeliveryDate: '2026-09-21', // 3 days late
    status: 'Delivered Late',
    totalOrderedUnits: 12000,
    totalFulfilledUnits: 11500,
    totalOrderValueUSD: 218400,
    priority: 'Standard P3',
    associatedShipmentId: 'SHP-7023',
    plantId: 'PLANT-02',
    fulfillmentWarehouseId: 'WH-02',
    lineItems: [
      { partId: 'PART-08', sku: 'MCU-AUTO-S32K', orderedUnits: 12000, fulfilledUnits: 11500, unitPriceUSD: 18.20 }
    ]
  },
  {
    id: 'ORD-9907',
    orderNumber: 'SO-2026-9907',
    customerId: 'CUST-04', // Microsoft Azure
    orderDate: '2026-09-04',
    promisedDeliveryDate: '2026-09-25',
    actualDeliveryDate: null,
    status: 'In-Transit On-Schedule',
    totalOrderedUnits: 3400,
    totalFulfilledUnits: 3400,
    totalOrderValueUSD: 663000,
    priority: 'Critical P1',
    associatedShipmentId: 'SHP-7026',
    plantId: 'PLANT-03',
    fulfillmentWarehouseId: 'WH-03',
    lineItems: [
      { partId: 'PART-06', sku: 'HBM3E-24GB-RAM', orderedUnits: 3400, fulfilledUnits: 3400, unitPriceUSD: 195.00 }
    ]
  },
  {
    id: 'ORD-9908',
    orderNumber: 'SO-2026-9908',
    customerId: 'CUST-02', // Apple
    orderDate: '2026-09-05',
    promisedDeliveryDate: '2026-09-22',
    actualDeliveryDate: null,
    status: 'At-Risk Delayed', // Impacted by Murata MLCC shortage
    totalOrderedUnits: 4500,
    totalFulfilledUnits: 3200,
    totalOrderValueUSD: 1420000,
    priority: 'Critical P1',
    associatedShipmentId: 'SHP-7021',
    plantId: 'PLANT-01',
    fulfillmentWarehouseId: 'WH-01',
    lineItems: [
      { partId: 'PART-01', sku: 'SC-3NM-SOC-01', orderedUnits: 4500, fulfilledUnits: 3200, unitPriceUSD: 315.55 }
    ]
  }
];

export const IOT_TELEMATICS_RECORDS: IoTTelematics[] = [
  {
    deviceUuid: 'IOT-9901',
    shipmentId: 'SHP-7021',
    lat: 33.7432,
    lon: -118.2673,
    locationName: 'Port of Los Angeles / Pier 400 Container Terminal',
    tempCelsius: 22.4,
    dwellHours: 94.6, // Extended port dwell causing line starvation!
    geofenceStatus: 'Port Terminal Dwell',
    anomalyDetected: true,
    anomalyMessage: 'Excessive port terminal dwell (>72h). Berth congestion delaying chassis pickup.',
    lastPingTimestamp: '2026-09-23T09:48:12Z'
  },
  {
    deviceUuid: 'IOT-9902',
    shipmentId: 'SHP-7022',
    lat: 31.1443,
    lon: 121.8083,
    locationName: 'Shanghai Pudong Cargo Gate B',
    tempCelsius: 19.1,
    dwellHours: 2.1,
    geofenceStatus: 'Plant Arrival Gate',
    anomalyDetected: false,
    lastPingTimestamp: '2026-09-10T14:12:00Z'
  },
  {
    deviceUuid: 'IOT-9903',
    shipmentId: 'SHP-7023',
    lat: 51.0504,
    lon: 13.7373,
    locationName: 'Dresden Silicon Saxony Industrial Park',
    tempCelsius: 16.8,
    dwellHours: 1.5,
    geofenceStatus: 'Plant Arrival Gate',
    anomalyDetected: false,
    lastPingTimestamp: '2026-09-14T08:30:00Z'
  },
  {
    deviceUuid: 'IOT-9904',
    shipmentId: 'SHP-7024',
    lat: 30.2223,
    lon: -97.6171,
    locationName: 'Austin Outbound Logistics Staging Yard',
    tempCelsius: 26.5,
    dwellHours: 42.0,
    geofenceStatus: 'Highway Corridor',
    anomalyDetected: true,
    anomalyMessage: 'Dispatched held at dock: awaiting final component integration signoff.',
    lastPingTimestamp: '2026-09-23T08:15:00Z'
  },
  {
    deviceUuid: 'IOT-9905',
    shipmentId: 'SHP-7025',
    lat: 51.1657,
    lon: 10.4515,
    locationName: 'Nuremberg Autobahn Corridor A9',
    tempCelsius: 15.2,
    dwellHours: 0.8,
    geofenceStatus: 'Plant Arrival Gate',
    anomalyDetected: false,
    lastPingTimestamp: '2026-09-16T17:45:00Z'
  },
  {
    deviceUuid: 'IOT-9906',
    shipmentId: 'SHP-7026',
    lat: 28.5123,
    lon: -152.3314,
    locationName: 'Mid-Pacific Ocean Great Circle Transit Lane',
    tempCelsius: 18.0,
    dwellHours: 0.0,
    geofenceStatus: 'Ocean Transit',
    anomalyDetected: false,
    lastPingTimestamp: '2026-09-23T10:02:40Z'
  }
];

export const CANONICAL_LINEAGE_TRACES: MetricLineageTrace[] = [
  {
    metricId: 'OTD',
    metricName: 'On-Time Delivery Rate (OTD %)',
    rawInputs: [
      {
        system: 'SAP S/4HANA ERP',
        table: 'VBAK / LIKP',
        column: 'VDATU / LFDAT',
        rawType: 'DATS (YYYYMMDD)',
        sampleValue: '20260915'
      },
      {
        system: 'Manhattan Associates TMS',
        table: 'shipment_stops',
        column: 'act_deliv_ts',
        rawType: 'TIMESTAMP WITH TIMEZONE',
        sampleValue: '2026-09-14 14:22:10 UTC'
      },
      {
        system: 'Carrier EDI 214',
        table: 'edi_shipment_status',
        column: 'pod_signature_dt',
        rawType: 'VARCHAR(14)',
        sampleValue: '20260914142210'
      }
    ],
    transformations: [
      {
        stepOrder: 1,
        ruleName: 'Timezone Standardization',
        sqlExpression: 'TO_TIMESTAMP_NTZ(CONVERT_TIMEZONE("UTC", act_deliv_ts))',
        description: 'Converts local consignee dock arrival times to enterprise standard UTC timestamp.'
      },
      {
        stepOrder: 2,
        ruleName: 'Promised SLA Commitment Lock',
        sqlExpression: 'COALESCE(contract_locked_sla_dt, TO_DATE(vbak.vdatu, "YYYYMMDD"))',
        description: 'Freezes customer delivery baseline; rejects retroactively updated sales order change-logs.'
      },
      {
        stepOrder: 3,
        ruleName: 'Zero-Grace Binary Classification',
        sqlExpression: 'CASE WHEN CAST(act_deliv_ts AS DATE) <= promised_date THEN 1 ELSE 0 END',
        description: 'Enforces strict 0-day grace period. Late by 1 minute is categorized as LATE.'
      }
    ],
    semanticView: {
      viewName: 'enterprise_semantic_layer.view_governed_on_time_delivery',
      granularity: 'Customer Tier x Manufacturing Plant x Monthly Period',
      measures: ['total_delivered_orders', 'on_time_orders', 'canonical_otd_pct'],
      dimensions: ['customer_region', 'customer_tier', 'manufacturing_plant']
    },
    governanceChecks: [
      {
        ruleCode: 'GOV-OTD-01',
        title: 'Immutable Baseline Promise Date',
        enforcementMethod: 'Validation against initial signed purchase agreement contract hash.',
        passed: true
      },
      {
        ruleCode: 'GOV-OTD-02',
        title: 'Signed POD Consignee Proof',
        enforcementMethod: 'Requires valid cryptographic carrier driver electronic signature.',
        passed: true
      }
    ],
    consumptionPersonas: [
      {
        persona: 'planning',
        interpretedMetricValue: '88.6%',
        isIdenticalAcrossAll: true,
        tailoredView: 'Production re-sequencing plan to buffer vulnerable assembly batches.'
      },
      {
        persona: 'procurement',
        interpretedMetricValue: '88.6%',
        isIdenticalAcrossAll: true,
        tailoredView: 'Supplier SLA dispute dossier and liquidated damages penalty calculation.'
      },
      {
        persona: 'logistics',
        interpretedMetricValue: '88.6%',
        isIdenticalAcrossAll: true,
        tailoredView: 'Carrier lane reliability scorecard and terminal drayage dispatch orders.'
      }
    ]
  },
  {
    metricId: 'FILL_RATE',
    metricName: 'Order & Line Fill Rate (%)',
    rawInputs: [
      {
        system: 'SAP S/4HANA ERP',
        table: 'VBAP',
        column: 'KWMENG',
        rawType: 'DECIMAL(15,3)',
        sampleValue: '10000.000'
      },
      {
        system: 'SAP S/4HANA ERP',
        table: 'VBAP / LIPS',
        column: 'LGMNG / WEMNG',
        rawType: 'DECIMAL(15,3)',
        sampleValue: '9380.000'
      },
      {
        system: 'Supplier EDI 856 ASN',
        table: 'asn_item_segments',
        column: 'shipped_qty',
        rawType: 'NUMERIC(12,2)',
        sampleValue: '9380.00'
      }
    ],
    transformations: [
      {
        stepOrder: 1,
        ruleName: 'Unit-of-Measure Harmonization',
        sqlExpression: 'CAST(ROUND(vbap.kwmeng * uom_factor) AS INTEGER)',
        description: 'Standardizes disparate supplier reels, master cartons, and pallets into integer piece counts.'
      },
      {
        stepOrder: 2,
        ruleName: 'Physical Dispatch Validation',
        sqlExpression: 'LEAST(CAST(lips.lgmng AS INT), CAST(edi_856.shipped_qty AS INT))',
        description: 'Prevents phantom fulfillment credit by cross-validating physical warehouse scan against electronic ASN.'
      },
      {
        stepOrder: 3,
        ruleName: 'First-Commit Line Ratio',
        sqlExpression: 'ROUND(100.0 * SUM(fulfilled_units) / NULLIF(SUM(contract_units), 0), 2)',
        description: 'Computes line-level ratio without allowing subsequent backorders to dilute initial shortfall.'
      }
    ],
    semanticView: {
      viewName: 'enterprise_semantic_layer.view_governed_fill_rate',
      granularity: 'Order Line Item SKU x Customer Account',
      measures: ['total_ordered_units', 'total_fulfilled_units', 'line_fill_rate_pct'],
      dimensions: ['order_number', 'customer_name', 'part_sku', 'part_category']
    },
    governanceChecks: [
      {
        ruleCode: 'GOV-FR-01',
        title: 'Zero Partial Order Masking',
        enforcementMethod: 'Rejects aggregated order status unless every line item hits 100% quantity.',
        passed: true
      },
      {
        ruleCode: 'GOV-FR-02',
        title: 'First-Pass Yield Attribution',
        enforcementMethod: 'Deducts quality quarantine holds from initial fill credit.',
        passed: true
      }
    ],
    consumptionPersonas: [
      {
        persona: 'planning',
        interpretedMetricValue: '93.8%',
        isIdenticalAcrossAll: true,
        tailoredView: 'Line-by-line part shortage table for Austin Assembly Line 2.'
      },
      {
        persona: 'procurement',
        interpretedMetricValue: '93.8%',
        isIdenticalAcrossAll: true,
        tailoredView: 'PO fulfillment shortfall reconciliation against Murata and Valeo.'
      },
      {
        persona: 'logistics',
        interpretedMetricValue: '93.8%',
        isIdenticalAcrossAll: true,
        tailoredView: 'Outbound packaging consolidation and split-shipment prevention.'
      }
    ]
  },
  {
    metricId: 'DOI',
    metricName: 'Days of Inventory (DOI / DOH)',
    rawInputs: [
      {
        system: 'SAP S/4HANA ERP',
        table: 'MARD / MBEW',
        column: 'LABST (Stock) * STPRS (Standard Price)',
        rawType: 'DECIMAL(13,2)',
        sampleValue: '54200000.00'
      },
      {
        system: 'Corporate FICO Ledger',
        table: 'cogs_ledger_daily',
        column: 'cogs_debit_usd',
        rawType: 'DECIMAL(15,2)',
        sampleValue: '1850000.00'
      },
      {
        system: 'Manhattan WMS',
        table: 'yard_inventory_valuation',
        column: 'staging_stock_usd',
        rawType: 'DECIMAL(12,2)',
        sampleValue: '3400000.00'
      }
    ],
    transformations: [
      {
        stepOrder: 1,
        ruleName: 'Standard Cost Normalization',
        sqlExpression: 'SUM(mard.labst * mbew.stprs) + SUM(in_transit.fob_usd)',
        description: 'Values on-hand and customs-cleared transit stock strictly at standard frozen cost.'
      },
      {
        stepOrder: 2,
        ruleName: 'Trailing 90-Day Moving COGS Average',
        sqlExpression: 'SUM(cogs_usd_trailing_90d) / 90.0',
        description: 'Smooths out weekend lull and end-of-month surge distortions into clean daily enterprise burn rate.'
      },
      {
        stepOrder: 3,
        ruleName: 'Inventory Velocity Quotient',
        sqlExpression: 'ROUND(total_inventory_valuation_usd / daily_cogs_usd, 1)',
        description: 'Computes exact days of operational runway before line stockout.'
      }
    ],
    semanticView: {
      viewName: 'enterprise_semantic_layer.view_governed_days_of_inventory',
      granularity: 'Plant x Primary Warehouse x SKU Category',
      measures: ['current_inventory_valuation_usd', 'daily_cogs_usd', 'days_of_inventory'],
      dimensions: ['plant_code', 'plant_name', 'plant_region', 'inventory_health_status']
    },
    governanceChecks: [
      {
        ruleCode: 'GOV-DOI-01',
        title: 'Standard Cost Inventory Baseline',
        enforcementMethod: 'Excludes spot market price volatility from balance sheet stock count.',
        passed: true
      },
      {
        ruleCode: 'GOV-DOI-02',
        title: 'Critical Buffer Floor Protection',
        enforcementMethod: 'Triggers automated enterprise warning whenever DOI drops under 20 days.',
        passed: true
      }
    ],
    consumptionPersonas: [
      {
        persona: 'planning',
        interpretedMetricValue: '36.4 Days',
        isIdenticalAcrossAll: true,
        tailoredView: 'Plant floor burn rate vs reorder points across 8 critical components.'
      },
      {
        persona: 'procurement',
        interpretedMetricValue: '36.4 Days',
        isIdenticalAcrossAll: true,
        tailoredView: 'Working capital commitment and supplier economic order quantity (EOQ).'
      },
      {
        persona: 'logistics',
        interpretedMetricValue: '36.4 Days',
        isIdenticalAcrossAll: true,
        tailoredView: 'Warehouse cubic rack utilization and cross-dock replenishment rhythm.'
      }
    ]
  },
  {
    metricId: 'LANDED_COST',
    metricName: 'True Landed Cost per Unit ($/Unit)',
    rawInputs: [
      {
        system: 'Supplier EDI 810 Invoice',
        table: 'invoice_line_items',
        column: 'IT104_unit_fob_rate',
        rawType: 'NUMERIC(10,4)',
        sampleValue: '145.0000'
      },
      {
        system: 'Manhattan TMS Freight Ledger',
        table: 'carrier_freight_bills',
        column: 'linehaul_usd + fuel_surchg_usd',
        rawType: 'NUMERIC(12,2)',
        sampleValue: '22800.00'
      },
      {
        system: 'US Customs Broker CBP 7501',
        table: 'customs_entry_summary',
        column: 'duty_and_merchandise_fee_usd',
        rawType: 'NUMERIC(10,2)',
        sampleValue: '6100.00'
      }
    ],
    transformations: [
      {
        stepOrder: 1,
        ruleName: 'Volumetric Freight Allocation',
        sqlExpression: 'freight_bill_usd * (sku_volume_cbm / total_container_cbm)',
        description: 'Allocates consolidated maritime and air freight expense down to each individual SKU.'
      },
      {
        stepOrder: 2,
        ruleName: 'HS Tariff Code Duty Attribution',
        sqlExpression: 'fob_line_usd * tariff_rate_pct + port_handling_allocated',
        description: 'Applies country-of-origin specific tariff classification and terminal handling surcharges.'
      },
      {
        stepOrder: 3,
        ruleName: 'Fully Loaded Unit Summation',
        sqlExpression: 'fob_unit_cost + allocated_freight + allocated_customs + allocated_demurrage',
        description: 'Constructs certified Total Cost of Ownership (TCO) per part.'
      }
    ],
    semanticView: {
      viewName: 'enterprise_semantic_layer.view_governed_landed_cost',
      granularity: 'Component SKU x Primary Supplier x Trade Lane',
      measures: ['raw_fob_invoice_price', 'allocated_freight_usd', 'customs_and_tariffs_usd', 'canonical_landed_cost_usd'],
      dimensions: ['sku', 'part_name', 'primary_supplier', 'supplier_country']
    },
    governanceChecks: [
      {
        ruleCode: 'GOV-LC-01',
        title: 'Full Surcharge Attribution',
        enforcementMethod: 'Bars booking port demurrage as general overhead; forces SKU allocation.',
        passed: true
      },
      {
        ruleCode: 'GOV-LC-02',
        title: 'Audited Invoice Harmonization',
        enforcementMethod: 'Reconciles 3-way match: PO vs Carrier Bill of Lading vs Customs Entry.',
        passed: true
      }
    ],
    consumptionPersonas: [
      {
        persona: 'planning',
        interpretedMetricValue: '$148.20 / Unit',
        isIdenticalAcrossAll: true,
        tailoredView: 'BOM margin protection and factory transfer pricing valuation.'
      },
      {
        persona: 'procurement',
        interpretedMetricValue: '$148.20 / Unit',
        isIdenticalAcrossAll: true,
        tailoredView: 'FOB vs True Landed Cost variance analysis for supplier contract renegotiations.'
      },
      {
        persona: 'logistics',
        interpretedMetricValue: '$148.20 / Unit',
        isIdenticalAcrossAll: true,
        tailoredView: 'Freight mode cost efficiency: Ocean container vs Air cargo expediting.'
      }
    ]
  }
];

export const SOURCE_SYSTEM_MAPPINGS: SourceSystemMapping[] = [
  // ERP Mappings
  {
    system: 'ERP (SAP S/4HANA)',
    rawField: 'VBAP.KWMENG',
    rawDataType: 'DECIMAL(15,3)',
    canonicalEntity: 'Order',
    canonicalField: 'totalOrderedUnits',
    businessSemantics: 'Original sales order item contractual committed volume',
    transformationLogic: 'CAST(VBAP.KWMENG AS INT)',
    sampleRawValue: '10000.000'
  },
  {
    system: 'ERP (SAP S/4HANA)',
    rawField: 'VBAP.LGMNG / WEMNG',
    rawDataType: 'DECIMAL(15,3)',
    canonicalEntity: 'Order',
    canonicalField: 'totalFulfilledUnits',
    businessSemantics: 'Actual goods issue / goods receipt posted units',
    transformationLogic: 'COALESCE(WEMNG, LGMNG, 0)',
    sampleRawValue: '9380.000'
  },
  {
    system: 'ERP (SAP S/4HANA)',
    rawField: 'VBAK.VDATU / LIKP.LFDAT',
    rawDataType: 'DATS (YYYYMMDD)',
    canonicalEntity: 'Order',
    canonicalField: 'promisedDeliveryDate',
    businessSemantics: 'Legally agreed customer SLA requested delivery date',
    transformationLogic: 'TO_DATE(LIKP.LFDAT, "YYYYMMDD")',
    sampleRawValue: '20260915'
  },
  {
    system: 'ERP (SAP S/4HANA)',
    rawField: 'EKPO.NETPR',
    rawDataType: 'CURR(11,2)',
    canonicalEntity: 'Part',
    canonicalField: 'standardCostUSD',
    businessSemantics: 'Standard purchase order line net unit price',
    transformationLogic: 'EKPO.NETPR * CURR_CONV(EKKO.WAERS, "USD")',
    sampleRawValue: '145.00'
  },
  // Logistics TMS Mappings
  {
    system: 'Logistics TMS (Manhattan)',
    rawField: 'trk_ship_id',
    rawDataType: 'VARCHAR(64)',
    canonicalEntity: 'Shipment',
    canonicalField: 'shipmentNumber',
    businessSemantics: 'Unique transportation management load master identifier',
    transformationLogic: 'TRIM(trk_ship_id)',
    sampleRawValue: 'SHP-2026-7021'
  },
  {
    system: 'Logistics TMS (Manhattan)',
    rawField: 'act_deliv_ts',
    rawDataType: 'TIMESTAMP WITH TIMEZONE',
    canonicalEntity: 'Shipment / Order',
    canonicalField: 'actualDeliveryDate',
    businessSemantics: 'Proof of Delivery (POD) signed carrier timestamp',
    transformationLogic: 'CAST(act_deliv_ts AS DATE)',
    sampleRawValue: '2026-09-14 14:22:10 UTC'
  },
  {
    system: 'Logistics TMS (Manhattan)',
    rawField: 'freight_accrual + fuel_surchg',
    rawDataType: 'NUMERIC(12,2)',
    canonicalEntity: 'Shipment',
    canonicalField: 'freightCostUSD',
    businessSemantics: 'Allocated linehaul freight expense + bunker fuel surcharge',
    transformationLogic: 'freight_accrual + COALESCE(fuel_surchg, 0)',
    sampleRawValue: '14500.00'
  },
  {
    system: 'Logistics TMS (Manhattan)',
    rawField: 'dock_dwell_hrs',
    rawDataType: 'DECIMAL(8,2)',
    canonicalEntity: 'Shipment',
    canonicalField: 'delayDays',
    businessSemantics: 'Staged container port terminal / cross-dock queue time',
    transformationLogic: 'ROUND(dock_dwell_hrs / 24.0, 1)',
    sampleRawValue: '94.60'
  },
  // Supplier EDI Mappings
  {
    system: 'Supplier EDI (ANSI X12)',
    rawField: '856_ASN.BSN03_date',
    rawDataType: 'STRING(8)',
    canonicalEntity: 'Shipment',
    canonicalField: 'dispatchDate',
    businessSemantics: 'Advance Ship Notice (ASN) electronic dispatch confirmation',
    transformationLogic: 'PARSE_DATE("%Y%m%d", BSN03)',
    sampleRawValue: '20260828'
  },
  {
    system: 'Supplier EDI (ANSI X12)',
    rawField: '856_ASN.LIN03_sku',
    rawDataType: 'STRING(32)',
    canonicalEntity: 'Part',
    canonicalField: 'sku',
    businessSemantics: 'Supplier partner certified manufacturer part number',
    transformationLogic: 'UPPER(TRIM(LIN03))',
    sampleRawValue: 'MLCC-0402-100NF'
  },
  {
    system: 'Supplier EDI (ANSI X12)',
    rawField: '810_INVOICE.IT104_unit_rate',
    rawDataType: 'NUMERIC(10,4)',
    canonicalEntity: 'Part',
    canonicalField: 'standardCostUSD',
    businessSemantics: 'Contractual invoiced base FOB unit price',
    transformationLogic: 'CAST(IT104 AS NUMERIC(10,2))',
    sampleRawValue: '0.1800'
  },
  // IoT Telematics Mappings
  {
    system: 'IoT Telematics (Samsara)',
    rawField: 'device_uuid',
    rawDataType: 'UUID',
    canonicalEntity: 'IoTTelematics',
    canonicalField: 'deviceUuid',
    businessSemantics: 'Global sensor beacon hardware MAC/IMEI identifier',
    transformationLogic: 'LOWER(device_uuid)',
    sampleRawValue: 'IOT-9901'
  },
  {
    system: 'IoT Telematics (Samsara)',
    rawField: 'lat_lon_fix',
    rawDataType: 'GEOGRAPHY_POINT',
    canonicalEntity: 'IoTTelematics',
    canonicalField: 'lat, lon',
    businessSemantics: 'Real-time GPS/GLONASS triangulation coordinate fix',
    transformationLogic: 'ST_Y(lat_lon_fix), ST_X(lat_lon_fix)',
    sampleRawValue: '33.7432, -118.2673'
  },
  {
    system: 'IoT Telematics (Samsara)',
    rawField: 'geofence_state',
    rawDataType: 'VARCHAR(40)',
    canonicalEntity: 'IoTTelematics',
    canonicalField: 'geofenceStatus',
    businessSemantics: 'Automated polygon geofence trigger state (Port, Yard, Highway)',
    transformationLogic: 'CASE WHEN geofence_type="PORT" THEN "Port Terminal Dwell" ... END',
    sampleRawValue: 'PORT_TERMINAL_DWELL'
  }
];

export const CANONICAL_METRIC_DEFINITIONS: CanonicalMetricDefinition[] = [
  {
    id: 'OTD',
    name: 'On-Time Delivery Rate',
    acronym: 'OTD',
    unit: '%',
    canonicalFormula: '(COUNT(Orders delivered on or before Promised Date) / COUNT(Total Delivered Orders)) * 100',
    semanticViewName: 'view_governed_on_time_delivery',
    description: 'The golden metric certifying percentage of customer orders fulfilled without missing the contractual SLA promised delivery date. Grace period is strictly 0 days enterprise-wide.',
    governanceRules: [
      'Promised delivery date is fixed at sales order contract commit (VBAK.VDATU) and cannot be retroactively updated to hide delays.',
      'Delivery timestamp must use verified carrier proof-of-delivery (POD) or consignee goods receipt (GR), never departure from warehouse dock.',
      'Applies universally across Planning, Sourcing, and Logistics with zero persona drift.'
    ],
    disparateSystemPitfalls: [
      {
        system: 'Logistics WMS (Siloed)',
        unGovernedDefinition: 'Counted when truck departed plant loading dock.',
        whyItCausesDisputes: 'Logistics claimed 99% OTD because trucks left on time, even though port congestion delayed arrival by 8 days.'
      },
      {
        system: 'Commercial Sales (Siloed)',
        unGovernedDefinition: 'Counted against customer customer requested date instead of promised SLA.',
        whyItCausesDisputes: 'Artificially deflated score to 60% due to unrealistic lead-time requests from unapproved customers.'
      }
    ]
  },
  {
    id: 'FILL_RATE',
    name: 'Order & Line Fill Rate',
    acronym: 'FR',
    unit: '%',
    canonicalFormula: '(SUM(Fulfilled Units across Order Lines) / SUM(Ordered Units across Order Lines)) * 100',
    semanticViewName: 'view_governed_fill_rate',
    description: 'The proportion of customer order demand fulfilled in complete units upon initial dispatch commitment, ensuring order integrity without hidden backorders.',
    governanceRules: [
      'Calculated strictly at the individual line item SKU level (Line Fill Rate) and aggregate order volume.',
      'Partial shipments do NOT grant 100% order fill credit; backordered or split lines reduce overall score.',
      'Consistent across Procurement (purchased line items) and Logistics (dispatch pallets).'
    ],
    disparateSystemPitfalls: [
      {
        system: 'Procurement (Siloed)',
        unGovernedDefinition: 'Counted supplier PO line confirmation as fulfilled demand.',
        whyItCausesDisputes: 'Purchasing reported 98% fill rate when factory floor only received 80% due to supplier yield scrap.'
      },
      {
        system: 'ERP Billing (Siloed)',
        unGovernedDefinition: 'Counted backorders fulfilled 60 days later as successfully filled.',
        whyItCausesDisputes: 'Masked chronic stockouts and severe customer friction.'
      }
    ]
  },
  {
    id: 'DOI',
    name: 'Days of Inventory / Days on Hand',
    acronym: 'DOI',
    unit: 'Days',
    canonicalFormula: 'Current Inventory Valuation ($) / (Trailing 90-Day COGS ($) / 90)',
    semanticViewName: 'view_governed_days_of_inventory',
    description: 'Standardized operational liquidity metric measuring how many days the active stock of raw materials, WIP, and finished goods will sustain current production burn rate without replenishment.',
    governanceRules: [
      'Valuation standard: Standard Cost (Material Master MARA/MBEW) to prevent fluctuating spot market distortion.',
      'Includes plant floor buffer stock + active inbound shipments past customs clearance.',
      'Safety stock floor of 20 days enforced for Tier-1 critical single-source semiconductors.'
    ],
    disparateSystemPitfalls: [
      {
        system: 'Plant Floor Operations',
        unGovernedDefinition: 'Counted raw parts without valuing them or accounting for daily run rate.',
        whyItCausesDisputes: 'Excess low-cost brackets masked zero-stockout status on million-dollar microcontrollers.'
      },
      {
        system: 'Financial Accounting',
        unGovernedDefinition: 'Calculated trailing 365-day annual COGS instead of dynamic 90-day demand.',
        whyItCausesDisputes: 'Failed to reflect rapid product ramp cycles and seasonal spikes.'
      }
    ]
  },
  {
    id: 'LANDED_COST',
    name: 'True Landed Cost per Unit',
    acronym: 'TLC',
    unit: '$/Unit',
    canonicalFormula: 'Unit Purchase Price (FOB) + Allocated Linehaul Freight + Customs & Tariffs + Port Demurrage & Handling',
    semanticViewName: 'view_governed_landed_cost',
    description: 'Comprehensive total cost of ownership per finished part or product, capturing hidden logistics, tariff exposure, and port congestion surcharges beyond raw supplier invoice price.',
    governanceRules: [
      'Freight allocations must use volumetric weight or unit cubic meter weighting across consolidated containers.',
      'Unforeseen port demurrage and expedited air freight charges must allocate directly to the offending SKU/supplier.',
      'Procurement KPI must benchmark on Landed Cost, not raw factory FOB invoice.'
    ],
    disparateSystemPitfalls: [
      {
        system: 'Procurement Sourcing',
        unGovernedDefinition: 'Evaluated suppliers purely on quoted FOB unit price ($0.18 vs $0.22).',
        whyItCausesDisputes: 'Selected offshore supplier whose ocean delays and air expedite surcharges made actual unit cost $1.85!'
      },
      {
        system: 'Logistics Freight Ledger',
        unGovernedDefinition: 'Booked freight as general administrative overhead (G&A) rather than SKU BOM cost.',
        whyItCausesDisputes: 'Gross margin calculations on high-volume electronics were wildly inaccurate.'
      }
    ]
  }
];
