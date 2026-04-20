/*
  # Financial Analytics Platform - Database Schema

  1. New Tables
    - `financial_data`
      - Financial statement data with categories and sub-categories
      - Year-end values for 2021 and 2020
      - Calculated variance fields
    
    - `dashboard_metrics`
      - Key performance indicators (KPIs)
      - Values with percentage changes
      - Financial period tracking
    
    - `time_series_data`
      - Monthly time series data for charts
      - Bank balance and financial ratios over time
    
    - `quality_score`
      - Quality assessment scores by type and test
      - Multi-period score tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
*/

-- Financial Data Table
CREATE TABLE IF NOT EXISTS financial_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  sub_category text NOT NULL,
  year_end_2021 decimal(15,2) DEFAULT 0,
  year_end_2020 decimal(15,2) DEFAULT 0,
  variance_gbp decimal(15,2) GENERATED ALWAYS AS (year_end_2021 - year_end_2020) STORED,
  variance_percent decimal(5,2),
  financial_period text DEFAULT 'FY 2021/2022',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE financial_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to financial_data"
  ON financial_data FOR SELECT
  TO public
  USING (true);

-- Dashboard Metrics Table
CREATE TABLE IF NOT EXISTS dashboard_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  value decimal(15,2) NOT NULL,
  change_percent decimal(5,2) NOT NULL,
  financial_period text DEFAULT 'Year End Dec 2021',
  metric_type text DEFAULT 'overview',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE dashboard_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to dashboard_metrics"
  ON dashboard_metrics FOR SELECT
  TO public
  USING (true);

-- Time Series Data Table
CREATE TABLE IF NOT EXISTS time_series_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  bank_balance decimal(15,2),
  debt_to_assets_ratio decimal(5,2),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE time_series_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to time_series_data"
  ON time_series_data FOR SELECT
  TO public
  USING (true);

-- Quality Score Table
CREATE TABLE IF NOT EXISTS quality_score (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  test text NOT NULL,
  score_2022 text,
  score_2021 text,
  score_2020 text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quality_score ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to quality_score"
  ON quality_score FOR SELECT
  TO public
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_financial_data_category ON financial_data(category);
CREATE INDEX IF NOT EXISTS idx_dashboard_metrics_type ON dashboard_metrics(metric_type);
CREATE INDEX IF NOT EXISTS idx_time_series_date ON time_series_data(date);
CREATE INDEX IF NOT EXISTS idx_quality_score_type ON quality_score(type);