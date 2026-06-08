# 🌌 NexusFlow — Enterprise Real-Time Analytics Platform

NexusFlow is a high-performance, enterprise-grade real-time analytics engine designed to provide mission control over massive application ecosystems. It translates complex, fast-moving system telemetry into live, actionable visual data streams while strictly enforcing corporate security roles.

---

## 💡 What NexusFlow Does (In Simple Terms)

When millions of users interact with an enterprise application, vast amounts of invisible background data are generated. Servers process requests, data streams back and forth, and infrastructure strains under heavy load. **NexusFlow is the central dashboard that visualizes this chaos in real time.**

* **Monitors System Vital Signs:** Tracks incoming data traffic, operation throughput, and system latency dynamically.
* **Engine Room Visibility:** Provides live, flashing metrics (updating every 1.5 seconds) on cluster CPU performance and memory load to catch crashes before they happen.
* **Digital Keycard System (RBAC):** Restricts interface capabilities automatically based on who is logged in (Admin, Editor, or Viewer).
* **Custom Report Builder:** Allows authorized engineering managers to bundle custom server data profiles into instantly downloadable assets.

---

## 🛠️ Tech Stack & Architecture

NexusFlow is built using modern, lightning-fast web technologies optimized for high-frequency data rendering:

* **Frontend Library:** React 19 (Functional Hooks & Context API)
* **Build Tool:** Vite (Native Module Bundling)
* **Styling Engine:** Tailwind CSS v4 (Via native `@tailwindcss/vite` compiler)
* **Component Icons:** Lucide React
* **Data Visualization Engine:** Recharts (SVG-driven responsive charting)

---

## 🔐 Enterprise Role-Based Access Control (RBAC) Matrix

The application handles permissions dynamically through a React state context layer. You can instantly test these roles using the **Test RBAC Role** selector in the bottom-left sidebar:

| Role | Dashboard View | Live Streams | Create Custom Reports | System Settings Page |
| :--- | :---: | :---: | :---: | :---: |
| 👑 **Admin** | ✅ Full Access | ✅ Full Access | ✅ Allowed | ✅ Full Control |
| 📝 **Editor** | ✅ Full Access | ✅ Full Access | ✅ Allowed | ❌ Access Denied |
| 👁️ **Viewer** | ✅ Full Access | ✅ Full Access | ❌ Read-Only Only | ❌ Access Denied |

---

## 🚀 Getting Started & Installation

Follow these steps to run NexusFlow locally on your machine.

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher recommended) installed.

### 2. Clone and Setup Project Folder
```bash
# Navigate to your project directory
cd nexusFlow_Dashboard/vite-project