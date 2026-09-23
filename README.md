┌───────────────────────────────────────────────────────────────────────────┐
│                          Data Ingestion Tier                              │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐  │
│  │ SAP S/4HANA   │ │ Manhattan TMS │ │ Supplier EDI  │ │ Samsara IoT   │  │
│  │ (LIKP, VBAP,  │ │ (act_deliv_ts,│ │ (EDI 856 ASN, │ │ (GPS, Temp,   │  │
│  │  MARD, FICO)  │ │  bol_qty)     │ │  810 Invoice) │ │  Geofence)    │  │
│  └───────┬───────┘ └───────┬───────┘ └───────┬───────┘ └───────┬───────┘  │
└──────────┼─────────────────┼─────────────────┼─────────────────┼──────────┘
           ▼                 ▼                 ▼                 ▼
┌───────────────────────────────────────────────────────────────────────────┐
│              Governed Semantic Layer & Canonical Views                    │
│                                                                           │
│  • view_governed_on_time_delivery (ERP LIKP + TMS act_deliv_ts)           │
│  • view_governed_fill_rate (ERP VBAP + EDI 856 ASN LIN03)                 │
│  • view_governed_days_of_inventory (ERP MARD + FICO Daily COGS)          │
│  • view_governed_landed_cost (EDI 810 FOB + TMS Linehaul + CBP 7501)      │
│  • view_governed_supplier_risk (PO Performance + Inspection Defect PPM)   │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      ▼
┌───────────────────────────────────────────────────────────────────────────┐
│            Ontology Graph & End-to-End Data Lineage Engine                │
│                                                                           │
│  Core Entities: Supplier ──> Part ──> Plant ──> Shipment ──> Order ──> Cust│
│  Extended:      Warehouse ──  Carrier ──  Category ──  Quality Inspection │
│  Governance:    Zero-Grace Period Rule • Cryptographic Checksum Auditing  │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      ▼
┌───────────────────────────────────────────────────────────────────────────┐
│        Presentation, Dashboards & Governed Conversational AI              │
│                                                                           │
│  ┌───────────────────────┐ ┌───────────────────────┐ ┌──────────────────┐ │
│  │ Persona Dashboards    │ │ Conversational Studio │ │ Blast Radius     │ │
│  │ • Planning Cockpit    │ │ • Certified Policy    │ │   Impact Tracer  │ │
│  │ • Procurement Command │ │ • Exec Summary (LLM)  │ │ • Cascading Risk │ │
│  │ • Logistics Ops       │ │ • Generated ANSI-SQL  │ │ • Austin Line 2  │ │
│  └───────────────────────┘ └───────────────────────┘ └──────────────────┘ │
│  ┌───────────────────────┐ ┌───────────────────────┐ ┌──────────────────┐ │
│  │ What-If Simulator     │ │ Network Topology Map  │ │ Consistency      │ │
│  │ • Air Charter Bypass  │ │ • Trans-Pacific Lanes │ │   Matrix         │ │
│  │ • SLA Damages ($42k)  │ │ • IoT Telematics      │ │ • Siloed vs Gov. │ │
│  └───────────────────────┘ └───────────────────────┘ └──────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘
