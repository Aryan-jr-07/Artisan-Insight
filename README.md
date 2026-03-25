# Artisan Insight — Welfare Analytics Platform

> A production-grade, full-stack analytics platform that identifies state-wise disparities in artisan welfare scheme benefits across India and provides actionable insights for policymakers.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS v3 + Recharts |
| Backend | Node.js + Express |
| Database | MongoDB (via Mongoose) |
| Charts | Recharts |
| Icons | Lucide React |

---

## Prerequisites

- Node.js v18+
- MongoDB (running locally on port 27017)
- npm v8+

---

## Quick Start

### 1. Start MongoDB
```bash
mongod
# or on macOS with Homebrew:
brew services start mongodb-community
```

### 2. Install & Run Backend
```bash
cd backend
npm install
npm run dev
```
The server starts at **http://localhost:5001** and auto-seeds 240 sample records on first launch.

### 3. Install & Run Frontend
```bash
cd frontend
npm install
npm run dev
```
The app opens at **http://localhost:3000**

---

## Features

| Feature | Description |
|---------|-------------|
| Dashboard | State comparison bar chart, year-wise trend, top/bottom 5 states |
| ASI Rankings | Artisan Support Index scores ranked for all states |
| Insights | Auto-generated policy insights and recommendations |
| State Analysis | Deep-dive per state: trend chart, score breakdown, history table |
| Upload | CSV/Excel upload with smart column normalization |

### Artisan Support Index (ASI) Formula
```
ASI = 0.40 × Coverage Score
    + 0.40 × Growth Score  
    + 0.20 × Consistency Score
    - Zero Penalty (10 pts per year with 0 beneficiaries)
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/dashboard` | Aggregated dashboard data |
| GET | `/api/asi` | All state ASI rankings |
| GET | `/api/asi/:state` | Single state ASI detail |
| GET | `/api/insights` | Insights & recommendations |
| POST | `/api/upload` | Upload CSV/Excel file |
| GET | `/api/data` | Raw data with filters |
| POST | `/api/data/load-sample` | Load built-in sample data |
| DELETE | `/api/data` | Clear all data |

---

## CSV File Format

| Column | Required | Description |
|--------|----------|-------------|
| State | ✅ | Indian state name |
| Year | ✅ | 4-digit year (e.g. 2022) |
| Beneficiaries | ✅ | Total beneficiary count |
| Male_Beneficiaries | Optional | Male count |
| Female_Beneficiaries | Optional | Female count |
| Budget_Allocated | Optional | Budget in Lakhs INR |
| Scheme | Optional | Scheme name |

A sample file is available at: `sample_data.csv`

---

## Project Structure

```
Artisan-Insight/
├── backend/
│   ├── src/
│   │   ├── config/db.js          # MongoDB connection
│   │   ├── models/ArtisanData.js # Mongoose schema
│   │   ├── routes/               # Express route handlers
│   │   ├── utils/
│   │   │   ├── asiCalculator.js  # ASI scoring algorithm
│   │   │   └── recommendationEngine.js
│   │   ├── data/sampleData.js    # 240-record demo dataset
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/layout/    # Sidebar, Header, Layout
│   │   ├── components/charts/    # Recharts wrappers
│   │   ├── components/ui/        # Cards, Badge, Spinner
│   │   ├── pages/                # Dashboard, Upload, ASI, Insights, States
│   │   └── utils/api.js          # Axios API client
│   └── package.json
├── sample_data.csv
└── README.md
```
