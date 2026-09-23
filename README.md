# Unified Supply Chain Ontology & Governed Conversational Analytics

> **Enterprise-grade governed semantic layer unifying ERP, TMS, Supplier EDI, and IoT telematics into mathematically congruent canonical metrics and conversational intelligence.**

[![React 19](https://img.shields.io/badge/React-19.0.1-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com/)
[![Google GenAI SDK](https://img.shields.io/badge/Gemini_API-2.4.0-8e7cfc.svg)](https://github.com/google-gemini/generative-ai-js)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg)](https://vitejs.dev/)

---

## 📌 Executive Summary & Problem Statement

Modern enterprise supply chains suffer from severe **data fragmentation**:
- **ERP systems (SAP S/4HANA)** record promised delivery dates based on sales document generation.
- **Logistics TMS (Manhattan Associates)** measures delivery based on physical dock timestamps.
- **Suppliers** report dispatch based on EDI 856 Advanced Shipping Notices (ASNs).
- **IoT telematics (Samsara)** captures real-time GPS coordinates and temperature alerts.

When leadership asks **"What is our fill rate last quarter?"**, different departments return contradictory numbers:
- **Planning** reports **92.1%** (evaluating scheduled build kit availability).
- **Procurement** reports **96.4%** (counting accepted supplier purchase orders).
- **Logistics** reports **87.2%** (measuring physical linehaul arrival within carrier slots).

This project implements a **Governed Semantic Layer & Supply Chain Ontology** that defines canonical, inviolable business definitions. Regardless of whether a query originates from Planning, Procurement, Logistics, or Executive personas, the underlying metrics resolve to **identical mathematical values**, while providing persona-tailored operational context and action recommendations.

---

## 🏛️ System Architecture

```
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
```

---

## 📊 Governed Canonical Metrics

The semantic layer enforces four enterprise canonical metrics guaranteed to resolve identically across all personas:

| Metric | Canonical Value | Corporate Target | Certified Business Formula | Source Systems |
| :--- | :---: | :---: | :--- | :--- |
| **On-Time Delivery (OTD)** | **88.6%** | ≥ 95.0% | `COUNT(Delivered Orders ≤ Promised Date [Grace = 0d]) / COUNT(Total Promised Orders) * 100` | SAP ERP (`LIKP.WADAT_IST`), Manhattan TMS (`act_deliv_ts`) |
| **Order Fill Rate** | **93.8%** | ≥ 98.5% | `SUM(Physically Dispatched Units [EDI 856 Verified]) / SUM(Contractual Ordered Units) * 100` | SAP ERP (`VBAP.KWMENG`), Supplier EDI 856 ASN (`LIN03`) |
| **Days of Inventory (DOI)**| **36.4 Days**| 30 – 45 Days | `Standard Cost Inventory Valuation ($242.9M) / Trailing 90D Average Daily COGS ($6.7M/day)` | SAP ERP (`MARD.LABST`), SAP FICO General Ledger |
| **True Landed Cost (TCO)** | **$148.20/unit** | $138.50 baseline | `FOB Invoice Cost + Allocated Linehaul Freight + Import Tariffs + Terminal Demurrage Fees` | EDI 810 Invoice, TMS Freight Audit, CBP Form 7501 |

---

## 🌐 Expanded Supply Chain Ontology

The ontology formalizes **10 interconnected enterprise entities** across Global, Regional, and Local hierarchies:

1. **Supplier**: Tier-1/2 component fabricators (Murata, TDK, Samsung Electro-Mechanics, Infineon).
2. **Part**: Engineering bill-of-materials components with inventory valuation and lead times.
3. **Plant**: Advanced manufacturing gigafactories (Austin Gigafactory 1, Dresden Fab 3).
4. **Shipment**: Multimodal ocean, air, and drayage consignments with carrier waybills.
5. **Order**: Customer sales contracts with delivery schedule lines and committed dates.
6. **Customer**: Global enterprise accounts (Apple, Tesla, Sony, Siemens).
7. **Warehouse**: Regional fulfillment centers and plant buffer staging depots.
8. **Carrier**: Ocean shipping lines, air freight operators, and interstate drayage carriers.
9. **Product Category**: Classification taxonomy (Passives, Silicon Semiconductors, Enclosures).
10. **Quality Inspection**: Factory gate inspections, defect PPM metrics, and ISO certifications.

### Hierarchy
- **Global**: Enterprise-wide KPI aggregation (Global Fill Rate: 93.8%, Global OTD: 88.6%).
- **Regional**: Geographical operational segmentation (AMER, EMEA, APAC).
- **Local**: Plant assembly lines, warehouse staging bays, and container tracking tags.

---

## 🚀 Key Functional Modules

### 1. Persona-Specific Dashboards
- **Planning Cockpit**: Monitors assembly buffers, buffer runway (Austin 1.8-day MLCC capacitor runway), line starvation alerts, and BOM fulfillment.
- **Procurement Command**: Evaluates supplier OTIF performance, price variance against baseline, dual-sourcing splits, and liquidated damages claims ($42,000 against Murata under MSA Clause 14.2).
- **Logistics Operations**: Real-time ocean container tracking, port dwell congestion (Pier 400 Los Angeles 94.6h dwell), cold-chain temperature telemetry, and demurrage risks.
- **Governed Congruence Banner**: Prominently demonstrates that all three dashboards display identical canonical metrics, eliminating cross-functional disputes.

### 2. End-to-End Data Lineage Tracking System (`DataLineageViewer`)
- Visualizes 4-stage pipeline: **Source Systems → Ingestion & Normalization → Governed Semantic Views → Final Consumer Layer**.
- Features an **Interactive Audit Verification Panel** where users can inspect source record counts, null checks, zero-grace period policy adherence, and SHA-256 data integrity hashes.

### 3. Governed Conversational Studio (`ConversationalStudio`)
- Natural language interface backed by a dedicated server-side endpoint (`/api/governed-query`).
- Automatically tags responses with **Governance Verification Badges** and certifies policy compliance.
- Generates transparent, executable ANSI-SQL queries against the governed semantic view.
- Uses server-side **Gemini API** (`gemini-2.5-flash`) for executive summaries and persona-tailored action items.

### 4. Cross-Domain Blast Radius Impact Tracer (`CrossDomainImpactTracer`)
- Demonstrates how an upstream supplier delay (Murata MLCC capacitor shipment `SH-2026-0881`) cascades:
  1. **Supplier**: Murata Kyoto Fab experiences a 6-day lead-time blowout.
  2. **Logistics**: Ocean container stuck in Port of Los Angeles Pier 400 congestion (94.6h dwell).
  3. **Plant**: Austin Gigafactory Line 2 faces starvation in 1.8 days.
  4. **Orders & Customers**: 2 at-risk deliveries for Tesla Motors ($1.8M) and Apple Enterprise ($495K). Total revenue at risk: **$2,295,000**.

### 5. Cross-Persona Consistency Matrix (`PersonaConsistencyMatrix`)
- Compares traditional siloed metrics against governed canonical metrics:
  - *Siloed Approach*: Planning calculates 91.2%, Procurement claims 97.4%, Logistics reports 82.5%.
  - *Governed Approach*: All teams read certified 88.6% OTD from `view_governed_on_time_delivery`.

### 6. Semantic Views & Catalog Explorer (`SemanticViewsViewer`)
- In-depth viewer for dbt-compatible models, raw column mappings, and verification business rules.

### 7. Global Network & IoT Telematics Map (`NetworkMapViewer`)
- Geospatial supply chain topology mapping the trans-pacific corridor: Kyoto Fab → Shanghai Hub → Port of Los Angeles (Pier 400) → Austin Gigafactory → Customer HQs.
- Live inspection of Samsara IoT sensor `SAMSARA-UUID-9901` with container temperature (`21.4°C`), coordinates, and drayage ETA.

### 8. What-If Incident Remediation Simulator (`RemediationSimulator`)
- Interactive simulation of mitigation levers:
  - Emergency Air Charter from European Fab (Dresden → Austin in 18 hrs).
  - TDK / Yageo Secondary Sourcing Allocation (0% to 100% reallocation slider).
  - Pier 400 Off-dock peel-pile expedited drayage pull.
  - Murata MSA Clause 14.2 liquidated damages enforcement.
- Calculates projected plant runway, protected customer revenue, and ROI in real-time.

---

## 🛠️ Tech Stack & Implementation Details

- **Frontend**:
  - React 19 SPA with TypeScript
  - Tailwind CSS v4 (with high-contrast Light/White theme and dark mode switcher)
  - Lucide React icons
  - Fully responsive, accessible layout
- **Backend & API**:
  - Node.js & Express (`server.ts`)
  - Integration with `@google/genai` using `gemini-2.5-flash`
  - Vite middleware integration in development, static build in production
  - Server endpoints:
    - `POST /api/governed-query`: Evaluates queries against ontology, resolves canonical metrics, and generates AI synthesis.
    - `GET /api/health`: Health monitoring endpoint.
- **Port Binding**: Explicitly bound to `0.0.0.0:3000` with Nginx reverse proxy compatibility on port 8080.

---

## 🏃 Getting Started & Local Development

### Prerequisites
- Node.js 20+
- npm 10+

### Installation
```bash
# 1. Clone the repository
git clone <repo-url>
cd <repo-folder>

# 2. Install dependencies
npm install

# 3. Configure environment variables (optional for AI summaries)
cp .env.example .env
# Set GEMINI_API_KEY in .env if running standalone
```

### Running Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm start
```

---

## 🧪 Validation & Testing Scenarios

1. **Test Governed Fill Rate Consistency**:
   - In **Conversational Studio**, submit: *"What is our fill rate last quarter?"*
   - Switch persona from **Planning** to **Procurement** or **Logistics**.
   - Verify: The canonical value is always **93.8%**, backed by identical SQL and source line counts.
2. **Trace Supply Chain Blast Radius**:
   - Open **Blast Radius Tracer**.
   - Trace Part `MLCC-0402-100NF` from Murata Kyoto Fab down to Tesla and Apple delayed order lines.
3. **Simulate Incident Remediation**:
   - Open **Remediation Simulator**.
   - Enable "Emergency Air Charter from European Fab" and set "TDK Secondary Source" to 40%.
   - Observe Austin assembly line runway extend from 1.8 days to 14.2 days and revenue protected increase to $2.295M.
4. **Inspect Source-to-Consumer Data Lineage**:
   - Open **Data Lineage Tracker**.
   - Select `On-Time Delivery (OTD)` and click **Audit Traceability**.
   - Verify zero-grace period rule and SHA-256 cryptographic proof.

---

## 📄 License
Apache-2.0 License. Designed for AI Studio Build Supply Chain Challenge.
