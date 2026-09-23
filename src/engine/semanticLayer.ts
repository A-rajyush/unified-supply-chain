import {
  Region,
  Persona,
  GovernedQueryResult,
  Supplier,
  Part,
  Plant,
  Shipment,
  Order,
  Customer
} from '../types/ontology';
import {
  SUPPLIERS,
  PARTS,
  PLANTS,
  SHIPMENTS,
  ORDERS,
  CUSTOMERS,
  IOT_TELEMATICS_RECORDS,
  CANONICAL_METRIC_DEFINITIONS
} from '../data/mockSupplyChain';

export interface CalculatedMetrics {
  overallOtdPct: number;
  totalDeliveredOrders: number;
  onTimeDeliveredOrders: number;
  overallFillRatePct: number;
  totalOrderedUnits: number;
  totalFulfilledUnits: number;
  averageDoiDays: number;
  totalInventoryValuationUSD: number;
  dailyEnterpriseCogsUSD: number;
  averageLandedCostUSD: number;
  regionalOtd: Record<Region, number>;
  regionalFillRate: Record<Region, number>;
  regionalDoi: Record<Region, number>;
}

export function calculateCanonicalMetrics(filterRegion: Region = 'Global'): CalculatedMetrics {
  // Filter orders by customer region
  const filteredOrders = ORDERS.filter(o => {
    if (filterRegion === 'Global') return true;
    const customer = CUSTOMERS.find(c => c.id === o.customerId);
    return customer?.region === filterRegion;
  });

  // 1. OTD Calculation (Canonical: Delivered On-Time / Total Delivered)
  const deliveredOrders = filteredOrders.filter(
    o => o.actualDeliveryDate !== null || o.status === 'Delivered On-Time' || o.status === 'Delivered Late'
  );
  const onTimeOrders = deliveredOrders.filter(o => o.status === 'Delivered On-Time');
  const otdPct = deliveredOrders.length > 0 
    ? Math.round((onTimeOrders.length / deliveredOrders.length) * 1000) / 10 
    : 88.6;

  // 2. Fill Rate (Canonical: Fulfilled Units / Ordered Units)
  const totalOrdered = filteredOrders.reduce((sum, o) => sum + o.totalOrderedUnits, 0);
  const totalFulfilled = filteredOrders.reduce((sum, o) => sum + o.totalFulfilledUnits, 0);
  const fillRatePct = totalOrdered > 0 
    ? Math.round((totalFulfilled / totalOrdered) * 1000) / 10 
    : 93.8;

  // 3. DOI Calculation (Canonical: Inventory Valuation / Daily COGS)
  const filteredPlants = PLANTS.filter(p => filterRegion === 'Global' || p.region === filterRegion);
  const totalValuation = filteredPlants.reduce((sum, p) => sum + p.currentInventoryValuationUSD, 0);
  const totalDailyCogs = filteredPlants.reduce((sum, p) => sum + p.dailyCogsUSD, 0);
  const doiDays = totalDailyCogs > 0 
    ? Math.round((totalValuation / totalDailyCogs) * 10) / 10 
    : 36.4;

  // 4. Landed Cost Calculation (Average weighted landed cost)
  const baseParts = PARTS;
  const avgCost = baseParts.reduce((sum, p) => sum + p.standardCostUSD, 0) / baseParts.length;
  // Standard freight & duty allocation overhead is approx 18.5%
  const landedCostAvg = Math.round(avgCost * 1.185 * 100) / 100;

  // Regional breakdowns
  const regionalOtd: Record<Region, number> = {
    Global: 88.6,
    AMER: 84.2, // Pulled down by Austin port delays
    EMEA: 94.0, // Stable European logistics
    APAC: 91.5  // Reliable regional supply
  };

  const regionalFillRate: Record<Region, number> = {
    Global: 93.8,
    AMER: 90.4,
    EMEA: 96.2,
    APAC: 95.8
  };

  const regionalDoi: Record<Region, number> = {
    Global: 36.4,
    AMER: 34.2,
    EMEA: 38.5,
    APAC: 37.1
  };

  return {
    overallOtdPct: otdPct,
    totalDeliveredOrders: deliveredOrders.length,
    onTimeDeliveredOrders: onTimeOrders.length,
    overallFillRatePct: fillRatePct,
    totalOrderedUnits: totalOrdered,
    totalFulfilledUnits: totalFulfilled,
    averageDoiDays: doiDays,
    totalInventoryValuationUSD: totalValuation,
    dailyEnterpriseCogsUSD: totalDailyCogs,
    averageLandedCostUSD: landedCostAvg,
    regionalOtd,
    regionalFillRate,
    regionalDoi
  };
}

export interface DisparateComparison {
  metric: string;
  question: string;
  siloedResults: {
    system: string;
    personaFavored: string;
    reportedValue: string;
    underlyingFormula: string;
    dataFlaw: string;
  }[];
  governedResult: {
    canonicalValue: string;
    governedFormula: string;
    semanticView: string;
    reconciliationReason: string;
  };
}

export const DISPARATE_VS_GOVERNED_BENCHMARKS: DisparateComparison[] = [
  {
    metric: 'Fill Rate (Q3 Active)',
    question: 'What is our fill rate across customer accounts?',
    siloedResults: [
      {
        system: 'Procurement Sourcing Portal',
        personaFavored: 'Procurement Manager',
        reportedValue: '98.5%',
        underlyingFormula: 'Supplier PO Confirmation Units / PO Requisition Units',
        dataFlaw: 'Assumes suppliers will deliver what they confirmed on paper; ignores 12% scrap rate and port stockouts.'
      },
      {
        system: 'Logistics WMS Gate Check',
        personaFavored: 'Warehouse Lead',
        reportedValue: '96.8%',
        underlyingFormula: 'Dock Staged Pallets / Planned Outbound Pallets',
        dataFlaw: 'Counts split shipments as fulfilled; hides missing critical parts inside pallets.'
      },
      {
        system: 'ERP Billing Ledger (SAP)',
        personaFavored: 'Billing Accounting',
        reportedValue: '86.2%',
        underlyingFormula: 'Final Invoiced Value / Original Sales Order Value',
        dataFlaw: 'Includes delayed credit notes and tax timing adjustments rather than physical inventory flow.'
      }
    ],
    governedResult: {
      canonicalValue: '93.8%',
      governedFormula: 'SUM(Fulfilled Units across all line items) / SUM(Contractual Ordered Units) * 100',
      semanticView: 'view_governed_fill_rate',
      reconciliationReason: 'Single source of truth binding physical scan POD to original contractual sales commitment. Prevents gaming metric by shipping incomplete assemblies.'
    }
  },
  {
    metric: 'On-Time Delivery (OTD)',
    question: 'What is our current on-time delivery rate?',
    siloedResults: [
      {
        system: 'Logistics TMS (Manhattan)',
        personaFavored: 'Logistics Dispatcher',
        reportedValue: '97.2%',
        underlyingFormula: 'Loads Dispatched On-Schedule from Dock / Total Dispatches',
        dataFlaw: 'Considers load "on-time" the moment it leaves the plant gate, ignoring 8-day port terminal dwell at Long Beach.'
      },
      {
        system: 'Customer CRM (Salesforce)',
        personaFavored: 'Account Sales Rep',
        reportedValue: '72.0%',
        underlyingFormula: 'Delivered vs Customer Unrealistic Requested Date',
        dataFlaw: 'Penalizes operations for unconfirmed customer requests made 24 hours before delivery.'
      }
    ],
    governedResult: {
      canonicalValue: '88.6%',
      governedFormula: 'COUNT(Orders delivered on/before Promised Date) / COUNT(Total Delivered Orders) * 100',
      semanticView: 'view_governed_on_time_delivery',
      reconciliationReason: 'Strict 0-day grace period against mutual legally locked contractual commit date (VBAK.VDATU) validated by Proof of Delivery signed timestamp.'
    }
  },
  {
    metric: 'Days of Inventory (DOI)',
    question: 'How many days of inventory do we hold?',
    siloedResults: [
      {
        system: 'Plant Floor ERP (SAP MM)',
        personaFavored: 'Plant Material Planner',
        reportedValue: '26.4 Days',
        underlyingFormula: 'Floor Stock Units / Daily Production Run Units',
        dataFlaw: 'Excludes $14M of inbound buffer stock in customs transit and ocean lanes.'
      },
      {
        system: 'Financial Balance Sheet',
        personaFavored: 'Corporate Finance',
        reportedValue: '48.1 Days',
        underlyingFormula: 'Gross Inventory Asset / (Trailing 365 Days COGS / 365)',
        dataFlaw: 'Uses obsolete annual cost history that ignores 40% growth in current quarterly production rate.'
      }
    ],
    governedResult: {
      canonicalValue: '36.4 Days',
      governedFormula: 'Current Inventory Valuation ($) / (Trailing 90-Day Enterprise COGS / 90)',
      semanticView: 'view_governed_days_of_inventory',
      reconciliationReason: 'Governed valuation at standard BOM cost with active in-transit inventory, normalized to active trailing 90-day production run rate.'
    }
  }
];

export const SEMANTIC_VIEWS_SPEC = [
  {
    viewName: 'view_governed_on_time_delivery',
    targetEntity: 'Order',
    canonicalMetric: 'On-Time Delivery (OTD %)',
    description: 'Computes SLA adherence strictly on legally promised customer commitment using verified proof-of-delivery timestamps.',
    dbtSemanticModelYaml: `semantic_models:
  - name: governed_orders
    model: ref('stg_sap_orders_reconciled')
    entities:
      - name: order_id
        type: primary
      - name: customer_id
        type: foreign
      - name: plant_id
        type: foreign
    dimensions:
      - name: promised_delivery_date
        type: time
        type_params:
          time_granularity: day
      - name: actual_delivery_date
        type: time
        type_params:
          time_granularity: day
      - name: is_delivered_on_time
        type: categorical
        expr: CASE WHEN actual_delivery_date <= promised_delivery_date THEN 'ON_TIME' ELSE 'LATE' END
    measures:
      - name: total_delivered_orders
        expr: 1
        agg: sum
        filter: actual_delivery_date IS NOT NULL
      - name: on_time_orders
        expr: CASE WHEN actual_delivery_date <= promised_delivery_date THEN 1 ELSE 0 END
        agg: sum
metrics:
  - name: on_time_delivery_rate
    type: ratio
    numerator: on_time_orders
    denominator: total_delivered_orders
    label: "Canonical On-Time Delivery Rate (%)"`,
    ansiSql: `CREATE OR REPLACE VIEW enterprise_semantic_layer.view_governed_on_time_delivery AS
SELECT
  c.region AS customer_region,
  c.tier AS customer_tier,
  p.name AS manufacturing_plant,
  COUNT(o.id) AS total_orders,
  COUNT(CASE WHEN o.actual_delivery_date IS NOT NULL THEN 1 END) AS delivered_orders_count,
  COUNT(CASE WHEN o.actual_delivery_date IS NOT NULL AND o.actual_delivery_date <= o.promised_delivery_date THEN 1 END) AS on_time_orders_count,
  ROUND(
    100.0 * COUNT(CASE WHEN o.actual_delivery_date IS NOT NULL AND o.actual_delivery_date <= o.promised_delivery_date THEN 1 END)
    / NULLIF(COUNT(CASE WHEN o.actual_delivery_date IS NOT NULL THEN 1 END), 0),
    2
  ) AS canonical_otd_pct
FROM raw_sap_erp.vbak_orders o
INNER JOIN raw_sap_erp.kna1_customers c ON o.customer_id = c.id
INNER JOIN raw_tms_manhattan.shipments s ON o.associated_shipment_id = s.id
INNER JOIN raw_enterprise.plants p ON o.plant_id = p.id
GROUP BY 1, 2, 3;`
  },
  {
    viewName: 'view_governed_fill_rate',
    targetEntity: 'OrderLineItem',
    canonicalMetric: 'Fill Rate (%)',
    description: 'Computes line-level and total unit fulfillment without masking partial deliveries or backorders.',
    dbtSemanticModelYaml: `semantic_models:
  - name: governed_order_lines
    model: ref('stg_sap_vbap_order_items')
    entities:
      - name: line_item_id
        type: primary
      - name: order_id
        type: foreign
      - name: part_sku
        type: foreign
    measures:
      - name: ordered_units
        expr: vbap_kwmeng
        agg: sum
      - name: fulfilled_units
        expr: COALESCE(wemng_received, lgmng_issued, 0)
        agg: sum
metrics:
  - name: line_fill_rate
    type: ratio
    numerator: fulfilled_units
    denominator: ordered_units
    label: "Canonical Line Fill Rate (%)"`,
    ansiSql: `CREATE OR REPLACE VIEW enterprise_semantic_layer.view_governed_fill_rate AS
SELECT
  o.order_number,
  c.name AS customer_name,
  c.region AS customer_region,
  prt.sku AS part_sku,
  prt.category AS part_category,
  SUM(li.ordered_units) AS total_ordered_units,
  SUM(li.fulfilled_units) AS total_fulfilled_units,
  ROUND(100.0 * SUM(li.fulfilled_units) / NULLIF(SUM(li.ordered_units), 0), 2) AS line_fill_rate_pct,
  CASE 
    WHEN SUM(li.fulfilled_units) = SUM(li.ordered_units) THEN '100% Complete'
    WHEN SUM(li.fulfilled_units) > 0 THEN 'Partial Shortage'
    ELSE 'Zero Fulfillment'
  END AS fulfillment_status
FROM raw_sap_erp.vbap_order_lines li
INNER JOIN raw_sap_erp.vbak_orders o ON li.order_id = o.id
INNER JOIN raw_sap_erp.kna1_customers c ON o.customer_id = c.id
INNER JOIN raw_sap_erp.mara_parts prt ON li.part_id = prt.id
GROUP BY 1, 2, 3, 4, 5;`
  },
  {
    viewName: 'view_governed_days_of_inventory',
    targetEntity: 'Plant / Inventory',
    canonicalMetric: 'Days of Inventory (DOI)',
    description: 'Computes plant and part level stock sustainability against 90-day average daily cost of goods sold.',
    dbtSemanticModelYaml: `semantic_models:
  - name: governed_inventory_sustainability
    model: ref('stg_plant_inventory_cogs')
    entities:
      - name: plant_id
        type: primary
    measures:
      - name: inventory_valuation_usd
        expr: current_valuation_usd
        agg: sum
      - name: daily_cogs_usd
        expr: trailing_90d_cogs / 90.0
        agg: sum
metrics:
  - name: days_of_inventory
    type: ratio
    numerator: inventory_valuation_usd
    denominator: daily_cogs_usd
    label: "Canonical Days of Inventory (Days)"`,
    ansiSql: `CREATE OR REPLACE VIEW enterprise_semantic_layer.view_governed_days_of_inventory AS
SELECT
  p.code AS plant_code,
  p.name AS plant_name,
  p.region AS plant_region,
  p.current_inventory_valuation_usd,
  p.daily_cogs_usd,
  ROUND(p.current_inventory_valuation_usd / NULLIF(p.daily_cogs_usd, 0), 1) AS days_of_inventory,
  CASE
    WHEN (p.current_inventory_valuation_usd / NULLIF(p.daily_cogs_usd, 0)) < 25 THEN 'CRITICAL_BUFFER_DEFICIT'
    WHEN (p.current_inventory_valuation_usd / NULLIF(p.daily_cogs_usd, 0)) > 60 THEN 'WORKING_CAPITAL_EXCESS'
    ELSE 'HEALTHY_BUFFER'
  END AS inventory_health_status
FROM raw_enterprise.plants p;`
  },
  {
    viewName: 'view_governed_landed_cost',
    targetEntity: 'Part / Shipment',
    canonicalMetric: 'True Landed Cost ($/Unit)',
    description: 'Allocates linehaul freight, customs tariffs, and port handling surcharges down to individual SKUs.',
    dbtSemanticModelYaml: `semantic_models:
  - name: governed_sku_landed_cost
    model: ref('stg_sku_landed_cost_allocation')
    entities:
      - name: part_id
        type: primary
    dimensions:
      - name: sku
        type: categorical
      - name: category
        type: categorical
    measures:
      - name: unit_fob_cost
        expr: invoice_unit_cost
        agg: average
      - name: allocated_freight_per_unit
        expr: freight_pool / total_units
        agg: average
      - name: landed_cost_total
        expr: invoice_unit_cost + (freight_pool / total_units) + (customs_duty / total_units) + (handling_demurrage / total_units)
        agg: average`,
    ansiSql: `CREATE OR REPLACE VIEW enterprise_semantic_layer.view_governed_landed_cost AS
SELECT
  prt.sku,
  prt.name AS part_name,
  sup.name AS primary_supplier,
  sup.country AS supplier_country,
  prt.standard_cost_usd AS raw_fob_invoice_price,
  ROUND(AVG(s.freight_cost_usd / NULLIF(s.total_units_in_transit, 0)), 2) AS allocated_freight_usd,
  ROUND(AVG(s.customs_duty_cost_usd / NULLIF(s.total_units_in_transit, 0)), 2) AS customs_and_tariffs_usd,
  ROUND(AVG(s.handling_surcharge_usd / NULLIF(s.total_units_in_transit, 0)), 2) AS port_dwell_handling_usd,
  ROUND(
    prt.standard_cost_usd + 
    AVG((s.freight_cost_usd + s.customs_duty_cost_usd + s.handling_surcharge_usd) / NULLIF(s.total_units_in_transit, 0)),
    2
  ) AS canonical_landed_cost_usd
FROM raw_sap_erp.mara_parts prt
INNER JOIN raw_sap_erp.lfa1_suppliers sup ON prt.supplier_id = sup.id
LEFT JOIN raw_tms_manhattan.shipments s ON s.origin_id = sup.id
GROUP BY 1, 2, 3, 4, 5;`
  },
  {
    viewName: 'view_cross_domain_supplier_to_customer_lineage',
    targetEntity: 'End-to-End Lineage',
    canonicalMetric: 'Cross-Domain Impact Blast Radius',
    description: 'Traces upstream supplier manufacturing anomalies down through carrier logistics, plant assembly lines, and customer order delivery dates.',
    dbtSemanticModelYaml: `semantic_models:
  - name: cross_domain_supply_chain_dag
    model: ref('stg_end_to_end_traceability')
    entities:
      - name: lineage_id
        type: primary`,
    ansiSql: `CREATE OR REPLACE VIEW enterprise_semantic_layer.view_cross_domain_supplier_to_customer_lineage AS
SELECT
  sup.code AS supplier_code,
  sup.name AS supplier_name,
  prt.sku AS component_sku,
  prt.name AS component_name,
  s.shipment_number,
  s.carrier_name,
  s.delay_days AS inbound_delay_days,
  s.delay_reason AS root_cause_delay,
  iot.location_name AS current_telematics_location,
  iot.dwell_hours AS port_dwell_hours,
  p.name AS assembly_plant,
  o.order_number,
  c.name AS impacted_customer,
  c.tier AS customer_tier,
  o.total_order_value_usd,
  o.status AS customer_order_status
FROM raw_sap_erp.lfa1_suppliers sup
INNER JOIN raw_sap_erp.mara_parts prt ON prt.supplier_id = sup.id
INNER JOIN raw_tms_manhattan.shipments s ON s.origin_id = sup.id
LEFT JOIN raw_iot_samsara.telematics iot ON s.iot_device_uuid = iot.device_uuid
INNER JOIN raw_enterprise.plants p ON s.destination_id = p.id
INNER JOIN raw_sap_erp.vbak_orders o ON o.plant_id = p.id
INNER JOIN raw_sap_erp.kna1_customers c ON o.customer_id = c.id
WHERE s.is_delayed = TRUE OR o.status IN ('At-Risk Delayed', 'Delivered Late');`
  }
];

export function resolveGovernedNaturalLanguageQuery(
  userQuery: string,
  persona: Persona = 'planning',
  filterRegion: Region = 'Global'
): GovernedQueryResult {
  const q = userQuery.toLowerCase();
  const metrics = calculateCanonicalMetrics(filterRegion);

  // Intent 1: Fill Rate
  if (q.includes('fill rate') || q.includes('fulfillment') || q.includes('service level') || q.includes('shortage')) {
    const val = metrics.regionalFillRate[filterRegion] || metrics.overallFillRatePct;
    return {
      query: userQuery,
      persona,
      regionScope: filterRegion,
      timestamp: new Date().toISOString(),
      governanceVerification: {
        passed: true,
        policyCertified: true,
        canonicalMetricId: 'FILL_RATE',
        metricFullName: 'Canonical Line & Order Fill Rate',
        canonicalFormula: 'SUM(Fulfilled Units) / SUM(Contractual Ordered Units) * 100',
        governingPolicyStatement: 'Enterprise Policy SEC-04: Strict physical scan POD validation against locked sales commit. Zero artificial credit for split shipments or backorders.'
      },
      metrics: {
        canonicalValue: `${val}%`,
        unit: '%',
        comparisonBenchmark: 'Quarterly Corporate SLA Target: 95.0%',
        historicalTrend: [
          { period: 'May 2026', value: 96.4 },
          { period: 'Jun 2026', value: 95.8 },
          { period: 'Jul 2026', value: 94.2 },
          { period: 'Aug 2026', value: 93.1 },
          { period: 'Sep 2026', value: val }
        ]
      },
      semanticViewQuery: {
        viewName: 'view_governed_fill_rate',
        ansiSql: `SELECT
  c.region,
  SUM(li.fulfilled_units) / SUM(li.ordered_units) * 100.0 AS canonical_fill_rate_pct
FROM enterprise_semantic_layer.view_governed_fill_rate li
JOIN raw_sap_erp.kna1_customers c ON li.customer_name = c.name
WHERE ('${filterRegion}' = 'Global' OR c.region = '${filterRegion}')
GROUP BY 1;`,
        compiledDbtYaml: `ref('governed_order_lines') -> measure: fulfilled_units / ordered_units`,
        mappedSourceSystems: [
          'SAP S/4HANA (VBAP.KWMENG, LGMNG, WEMNG)',
          'Manhattan Associates TMS (act_deliv_ts, bol_qty)',
          'Supplier EDI 856 ASN (BSN03, LIN03)'
        ]
      },
      executiveSummary: `The governed enterprise fill rate is ${val}% for the ${filterRegion} theatre. While European and Asian assembly hubs achieved 95%+ fulfillment, the Austin Gigafactory faced a 72% fill rate on orders ORD-9904 and ORD-9908 due to upstream capacitor shortages. Regardless of department or persona, this exact metric is certifiably consistent across ERP, Logistics, and Sourcing systems.`,
      personaContext: getPersonaSpecificLens('FILL_RATE', persona, val),
      detailedRecords: ORDERS.map(o => {
        const cust = CUSTOMERS.find(c => c.id === o.customerId);
        return {
          orderNumber: o.orderNumber,
          customer: cust?.name,
          region: cust?.region,
          orderedUnits: o.totalOrderedUnits,
          fulfilledUnits: o.totalFulfilledUnits,
          fillRatePct: Math.round((o.totalFulfilledUnits / o.totalOrderedUnits) * 1000) / 10,
          status: o.status
        };
      })
    };
  }

  // Intent 2: Cross-domain query ("Which suppliers caused late shipments impacting customer orders?")
  if (
    q.includes('supplier') &&
    (q.includes('late') || q.includes('delay') || q.includes('impact') || q.includes('customer') || q.includes('root cause') || q.includes('caused'))
  ) {
    return {
      query: userQuery,
      persona,
      regionScope: filterRegion,
      timestamp: new Date().toISOString(),
      governanceVerification: {
        passed: true,
        policyCertified: true,
        canonicalMetricId: 'CROSS_DOMAIN_LINEAGE',
        metricFullName: 'Multi-Tier Supplier-to-Customer Delay Blast Radius',
        canonicalFormula: 'Graph Trace: Supplier(anomalies) -> Part(inventory burn) -> Plant(starvation) -> Shipment(dwell) -> Order(revenue at risk)',
        governingPolicyStatement: 'Enterprise Policy SEC-09: End-to-end multi-tier lineage certification traversing SAP ERP, Manhattan TMS, and Samsara IoT.'
      },
      metrics: {
        canonicalValue: '$2,295,000 USD at Risk',
        unit: 'USD',
        comparisonBenchmark: 'Affected Tier-1 Customers: Tesla Motors, Apple Enterprise'
      },
      semanticViewQuery: {
        viewName: 'view_cross_domain_supplier_to_customer_lineage',
        ansiSql: `SELECT
  sup.name AS root_cause_supplier,
  prt.sku AS bottleneck_part,
  s.shipment_number,
  s.carrier_name,
  iot.location_name,
  iot.dwell_hours,
  p.name AS impacted_plant,
  c.name AS impacted_customer,
  o.order_number,
  o.total_order_value_usd
FROM enterprise_semantic_layer.view_cross_domain_supplier_to_customer_lineage
WHERE root_cause_delay != 'None';`,
        compiledDbtYaml: `ref('cross_domain_supply_chain_dag') -> joins(Supplier -> Part -> Plant -> Shipment -> Order -> Customer)`,
        mappedSourceSystems: [
          'SAP S/4HANA (LFA1, MARA, EKPO, VBAK)',
          'Manhattan TMS (trk_ship_id, dock_dwell_hrs, act_deliv_ts)',
          'Samsara IoT (device_uuid, lat_lon_fix, geofence_state)'
        ]
      },
      executiveSummary: `The primary bottleneck originates at Murata Micro Precision (Kyoto, Japan) with component MLCC-0402-100NF. Shipment SHP-7021 aboard Maersk Ocean Line suffered 94.6 hours of port dwell at Port of Los Angeles (Pier 400). This starved assembly Line 2 at the Austin Gigafactory, directly delaying shipment SHP-7024 and putting $2,295,000 across Tesla Motors (ORD-9904) and Apple Enterprise (ORD-9908) at contractual SLA delay penalty risk.`,
      personaContext: getPersonaSpecificLens('CROSS_DOMAIN_LINEAGE', persona, '$2.295M'),
      crossDomainBlastRadius: {
        rootCauseSupplier: 'Murata Micro Precision (Tier 2, Kyoto Japan)',
        delayedPartSku: 'MLCC-0402-100NF (0402 High-Temp Multi-Layer Capacitor)',
        bottleneckPlant: 'Austin Gigafactory & Integration Plant (Austin, TX)',
        stalledShipment: 'SHP-2026-7021 (Maersk Ocean Line, Port Dwell 94.6 hrs)',
        impactedCustomers: [
          {
            customerName: 'Tesla Motors Global',
            orderNumber: 'SO-2026-9904',
            valueAtRiskUSD: 875000,
            delayDays: 4
          },
          {
            customerName: 'Apple Enterprise Systems',
            orderNumber: 'SO-2026-9908',
            valueAtRiskUSD: 1420000,
            delayDays: 8
          }
        ]
      }
    };
  }

  // Intent 3: Days of Inventory (DOI)
  if (q.includes('inventory') || q.includes('doi') || q.includes('days of') || q.includes('stock') || q.includes('doh')) {
    const val = metrics.regionalDoi[filterRegion] || metrics.averageDoiDays;
    return {
      query: userQuery,
      persona,
      regionScope: filterRegion,
      timestamp: new Date().toISOString(),
      governanceVerification: {
        passed: true,
        policyCertified: true,
        canonicalMetricId: 'DOI',
        metricFullName: 'Canonical Days of Inventory (DOI / DOH)',
        canonicalFormula: 'Current Inventory Valuation ($) / (Trailing 90-Day Enterprise COGS / 90)',
        governingPolicyStatement: 'Enterprise Policy SEC-02: Valuation based on Standard Cost (MBEW) plus active customs-cleared in-transit stock. Daily burn rate calibrated to active 90-day COGS.'
      },
      metrics: {
        canonicalValue: `${val} Days`,
        unit: 'Days',
        comparisonBenchmark: 'Enterprise Target Buffer: 35 - 45 Days',
        historicalTrend: [
          { period: 'May 2026', value: 41.2 },
          { period: 'Jun 2026', value: 39.5 },
          { period: 'Jul 2026', value: 38.0 },
          { period: 'Aug 2026', value: 37.1 },
          { period: 'Sep 2026', value: val }
        ]
      },
      semanticViewQuery: {
        viewName: 'view_governed_days_of_inventory',
        ansiSql: `SELECT
  p.region,
  p.name AS plant_name,
  p.current_inventory_valuation_usd,
  p.daily_cogs_usd,
  ROUND(p.current_inventory_valuation_usd / p.daily_cogs_usd, 1) AS canonical_doi_days
FROM enterprise_semantic_layer.view_governed_days_of_inventory p
WHERE ('${filterRegion}' = 'Global' OR p.region = '${filterRegion}');`,
        compiledDbtYaml: `ref('governed_inventory_sustainability') -> measure: current_valuation_usd / daily_cogs_usd`,
        mappedSourceSystems: [
          'SAP S/4HANA (MARA, MARD, MBEW Standard Cost)',
          'Enterprise Financial Ledger (FICO COGS trailing 90-day run rate)',
          'Manhattan WMS (In-plant staging buffer valuation)'
        ]
      },
      executiveSummary: `The enterprise currently maintains ${val} days of inventory across active plants. While European and Asian facilities are operating comfortably in the 37-38.5 day band, Austin Gigafactory has dipped into critical territory on passive passives (MLCC capacitor inventory is down to 4.6 days of supply against a 15-day safety threshold).`,
      personaContext: getPersonaSpecificLens('DOI', persona, val),
      detailedRecords: PLANTS.map(p => ({
        plantName: p.name,
        region: p.region,
        currentValuationUSD: `$${(p.currentInventoryValuationUSD / 1000000).toFixed(1)}M`,
        dailyCogsUSD: `$${(p.dailyCogsUSD / 1000).toFixed(0)}k/day`,
        doiDays: Math.round((p.currentInventoryValuationUSD / p.dailyCogsUSD) * 10) / 10,
        status: (p.currentInventoryValuationUSD / p.dailyCogsUSD) < 30 ? 'Near Critical Floor' : 'Optimal Operating Buffer'
      }))
    };
  }

  // Intent 4: Landed Cost
  if (q.includes('landed cost') || q.includes('freight') || q.includes('cost variance') || q.includes('tariff')) {
    const val = metrics.averageLandedCostUSD;
    return {
      query: userQuery,
      persona,
      regionScope: filterRegion,
      timestamp: new Date().toISOString(),
      governanceVerification: {
        passed: true,
        policyCertified: true,
        canonicalMetricId: 'LANDED_COST',
        metricFullName: 'Canonical True Landed Cost per Unit',
        canonicalFormula: 'Unit Purchase Price (FOB) + Allocated Linehaul Freight + Customs/Tariffs + Demurrage/Handling Surcharges',
        governingPolicyStatement: 'Enterprise Policy SEC-05: Strict volumetric freight allocation and penalty surcharge attribution directly to causative SKU and vendor.'
      },
      metrics: {
        canonicalValue: `$${val} / Unit`,
        unit: 'USD',
        comparisonBenchmark: 'Quoted FOB Base Unit Cost: $125.10 (18.5% landed cost variance)',
        historicalTrend: [
          { period: 'May 2026', value: 135.2 },
          { period: 'Jun 2026', value: 139.0 },
          { period: 'Jul 2026', value: 141.4 },
          { period: 'Aug 2026', value: 145.8 },
          { period: 'Sep 2026', value: val }
        ]
      },
      semanticViewQuery: {
        viewName: 'view_governed_landed_cost',
        ansiSql: `SELECT
  prt.sku,
  sup.name AS supplier,
  prt.standard_cost_usd AS fob_purchase_cost,
  allocated_freight_usd,
  customs_and_tariffs_usd,
  port_dwell_handling_usd,
  canonical_landed_cost_usd
FROM enterprise_semantic_layer.view_governed_landed_cost prt
ORDER BY canonical_landed_cost_usd DESC;`,
        compiledDbtYaml: `ref('governed_sku_landed_cost') -> measures: fob + freight + duties + demurrage`,
        mappedSourceSystems: [
          'Supplier EDI 810 Invoice (IT104 Unit FOB Price)',
          'Manhattan TMS Freight Bill (freight_accrual + fuel_surchg)',
          'Customs Broker Automated Interface (CBP 7501 Duties)',
          'Terminal Demurrage Ledger (Pier 400 Dwell Invoices)'
        ]
      },
      executiveSummary: `The average canonical landed cost across all key BOM components is $${val} per unit, representing an 18.5% delta over initial supplier factory gate FOB pricing. The highest variance is observed on ocean imports from APAC through West Coast ports, where maritime demurrage and terminal dwell surcharges added $2,800 per container.`,
      personaContext: getPersonaSpecificLens('LANDED_COST', persona, val),
      detailedRecords: PARTS.map(p => {
        const sup = SUPPLIERS.find(s => s.id === p.supplierId);
        const freightPct = 0.12;
        const dutiesPct = sup?.country === 'China' ? 0.08 : (sup?.country === 'Taiwan' ? 0.02 : 0.0);
        const landed = Math.round(p.standardCostUSD * (1 + freightPct + dutiesPct) * 100) / 100;
        return {
          sku: p.sku,
          partName: p.name,
          supplier: sup?.name,
          fobPriceUSD: `$${p.standardCostUSD.toFixed(2)}`,
          landedCostUSD: `$${landed.toFixed(2)}`,
          costVariancePct: `+${Math.round((landed / p.standardCostUSD - 1) * 100)}%`
        };
      })
    };
  }

  // Intent 5: Default / On-Time Delivery (OTD)
  const otdVal = metrics.regionalOtd[filterRegion] || metrics.overallOtdPct;
  return {
    query: userQuery,
    persona,
    regionScope: filterRegion,
    timestamp: new Date().toISOString(),
    governanceVerification: {
      passed: true,
      policyCertified: true,
      canonicalMetricId: 'OTD',
      metricFullName: 'Canonical On-Time Delivery Rate (OTD)',
      canonicalFormula: '(COUNT(Delivered Orders on/before Promised Date) / COUNT(Total Delivered Orders)) * 100',
      governingPolicyStatement: 'Enterprise Policy SEC-01: SLA promised delivery date (VBAK.VDATU) is locked at contract confirmation. Grace period is strictly 0 days. POD verified delivery.'
    },
    metrics: {
      canonicalValue: `${otdVal}%`,
      unit: '%',
      comparisonBenchmark: 'Executive Corporate Target: 95.0%',
      historicalTrend: [
        { period: 'May 2026', value: 92.4 },
        { period: 'Jun 2026', value: 91.0 },
        { period: 'Jul 2026', value: 89.8 },
        { period: 'Aug 2026', value: 89.2 },
        { period: 'Sep 2026', value: otdVal }
      ]
    },
    semanticViewQuery: {
      viewName: 'view_governed_on_time_delivery',
      ansiSql: `SELECT
  c.region,
  COUNT(o.id) AS total_orders,
  COUNT(CASE WHEN o.actual_delivery_date <= o.promised_delivery_date THEN 1 END) AS on_time_orders,
  ROUND(100.0 * COUNT(CASE WHEN o.actual_delivery_date <= o.promised_delivery_date THEN 1 END) / COUNT(o.id), 2) AS canonical_otd_pct
FROM enterprise_semantic_layer.view_governed_on_time_delivery o
JOIN raw_sap_erp.kna1_customers c ON o.customer_tier = c.tier
WHERE ('${filterRegion}' = 'Global' OR c.region = '${filterRegion}')
GROUP BY 1;`,
      compiledDbtYaml: `ref('governed_orders') -> ratio: on_time_orders / total_delivered_orders`,
      mappedSourceSystems: [
        'SAP S/4HANA (VBAK.VDATU Contractual Promised Date)',
        'Manhattan Associates TMS (act_deliv_ts Signed POD)',
        'Carrier Electronic POD Feed (EDI 214 Shipment Status Message)'
      ]
    },
    executiveSummary: `The governed enterprise On-Time Delivery (OTD) rate is ${otdVal}% across all customer accounts for the ${filterRegion} theatre. While EMEA operates at 94.0% and APAC at 91.5%, AMER performance is dampened to 84.2% primarily driven by delayed delivery on ORD-9904 (Tesla) and ORD-9906 (Toyota). This exact number resolves identically across Planning, Procurement, and Logistics.`,
    personaContext: getPersonaSpecificLens('OTD', persona, otdVal),
    detailedRecords: ORDERS.map(o => {
      const cust = CUSTOMERS.find(c => c.id === o.customerId);
      const plant = PLANTS.find(p => p.id === o.plantId);
      return {
        orderNumber: o.orderNumber,
        customer: cust?.name,
        tier: cust?.tier,
        plant: plant?.name,
        promisedDate: o.promisedDeliveryDate,
        actualDate: o.actualDeliveryDate || 'In Transit / Delayed',
        status: o.status,
        orderValueUSD: `$${(o.totalOrderValueUSD / 1000).toLocaleString()}k`
      };
    })
  };
}

function getPersonaSpecificLens(metricId: string, persona: Persona, canonicalValue: string | number) {
  if (persona === 'planning') {
    return {
      persona: 'planning' as Persona,
      operationalLens: 'Production Continuity & Safety Stock Buffer Management',
      primaryConcerns: [
        'Preventing starved factory assembly lines at Austin and Dresden plants',
        'Rebalancing safety stock buffers for single-source semiconductor components',
        'Calibrating Material Requirements Planning (MRP) run parameters against realistic lead times'
      ],
      actionableRecommendations: [
        'Trigger emergency MRP safety stock uplift from 25,000 to 45,000 units on SKU MLCC-0402-100NF.',
        'Re-sequence Austin Assembly Line 2 to build unconstrained chassis subassemblies while awaiting capacitor clearance.',
        'Adjust lead time buffer in SAP PP/DS from 14 to 22 calendar days for West Coast maritime lanes.'
      ]
    };
  }

  if (persona === 'procurement') {
    return {
      persona: 'procurement' as Persona,
      operationalLens: 'Supplier Contract SLA Enforcement & Total Cost of Ownership',
      primaryConcerns: [
        'Holding Murata Micro Precision accountable under Master Service Agreement (MSA) penalty clauses',
        'Validating true Landed Cost vs initial quoted FOB invoice pricing',
        'Evaluating dual-sourcing options in North America and EMEA for passives and power modules'
      ],
      actionableRecommendations: [
        'Issue formal SLA Breach Notification to Murata Japan citing 8.4-day lead time variance and claim demurrage recovery.',
        'Accelerate vendor qualification of secondary source (KEMET / TDK) for 0402 automotive-grade capacitors.',
        'Audit supplier freight chargeback invoices to ensure expedited air cargo is billed to supplier expense account.'
      ]
    };
  }

  if (persona === 'logistics') {
    return {
      persona: 'logistics' as Persona,
      operationalLens: 'Freight Lane Velocity, Port Congestion & Carrier Performance',
      primaryConcerns: [
        'Minimizing container terminal dwell time at Port of Los Angeles and Long Beach',
        'Carrier SLA compliance on proof-of-delivery (POD) turnarounds',
        'Expediting air-freight hot-shot transfers to bypass stalled maritime ports'
      ],
      actionableRecommendations: [
        'Deploy dedicated chassis drayage carrier to Pier 400 to extract container SHP-7021 immediately.',
        'Reroute upcoming APAC shipments via Pacific Northwest (Seattle/Tacoma) or direct Air Cargo charter.',
        'Enforce EDI 214 real-time tracking integration with Samsara IoT telematics beacons across all contracted carriers.'
      ]
    };
  }

  // Executive / All
  return {
    persona: 'executive' as Persona,
    operationalLens: 'Holistic Enterprise Governance & Revenue at Risk',
    primaryConcerns: [
      'Protecting $2.295M in strategic customer revenue with Tesla Motors and Apple Enterprise',
      'Eliminating conflicting department spreadsheets via the certified semantic layer',
      'Preserving quarterly gross margin against unanticipated freight and demurrage surcharges'
    ],
    actionableRecommendations: [
      'Maintain unified governance policy: refuse all manual spreadsheet overrides in executive QBR meetings.',
      'Authorize executive customer outreach to Tesla and Apple providing certified delivery transparency.',
      'Sponsor enterprise roll-out of semantic views across regional ERP, TMS, and EDI data pipelines.'
    ]
  };
}
