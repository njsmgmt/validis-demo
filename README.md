# Financial Analytics Platform

A comprehensive financial analytics and reporting application built with React, TypeScript, and Supabase. This platform replicates the Validis financial analytics interface with dashboard analytics, financial reports, and quality scoring.

## Features

### Dashboard Analytics
- **Overview Tab**: Sales, Gross Profit, EBIT, Net Profit KPIs with trend indicators and bank balance chart
- **Credit Analysis Tab**: Debt ratios with historical trend analysis
- **Quality Score Tab**: Multi-period quality assessment with color-coded scores

### Financial Reports
- **Balance Sheet**: Comparative year-over-year analysis with variance calculations
- Professional financial statement formatting with grouped categories

### Onboarding
- Accounting package selection interface
- Step-by-step setup guide
- Integration instructions

## Setup Instructions

### 1. Configure Supabase

Update the `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

The database migrations have already been applied with the following tables:
- `financial_data` - Balance sheet data with year-over-year comparisons
- `dashboard_metrics` - KPI metrics with change percentages
- `time_series_data` - Monthly time series for charts
- `quality_score` - Quality assessment scores by category

Sample data has been pre-populated for demonstration purposes.

### 4. Run the Application

```bash
npm run dev
```

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Application Structure

```
src/
├── components/
│   ├── Sidebar.tsx              # Navigation sidebar
│   ├── KPICard.tsx              # Metric cards with trends
│   ├── LineChart.tsx            # Custom canvas chart
│   ├── QualityScoreTable.tsx    # Quality scores with badges
│   └── FinancialDataTable.tsx   # Financial statement table
├── pages/
│   ├── DashboardAnalytics.tsx   # Main dashboard with tabs
│   ├── FinancialReports.tsx     # Financial statements
│   └── OnboardingPage.tsx       # Setup wizard
├── lib/
│   └── supabase.ts              # Database client and types
└── App.tsx                      # Main application component
```

## Features Highlights

- Conditional formatting for positive/negative values
- Grouped data tables with category headers
- Interactive line charts for time series data
- Color-coded quality scores with icons
- Responsive design with clean navigation
- Professional financial statement formatting

## Database Schema

### financial_data
- Balance sheet items with yearly comparisons
- Automatic variance calculations
- Category-based grouping

### dashboard_metrics
- Key performance indicators
- Percentage change tracking
- Metric type classification

### time_series_data
- Monthly historical data
- Bank balance tracking
- Financial ratio trends

### quality_score
- Multi-period assessments
- Category-based grouping
- Score ratings (Excellent, Good, Satisfactory, Poor)
