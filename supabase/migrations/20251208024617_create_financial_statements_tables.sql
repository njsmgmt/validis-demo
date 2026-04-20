/*
  # Create Financial Statements Tables
  
  1. New Tables
    - `financial_ratios` - 20 key financial ratios for analysis
    - `income_statement` - Income statement line items
    - `cash_flow_statement` - Cash flow statement line items
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Financial Ratios
CREATE TABLE IF NOT EXISTS financial_ratios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ratio_name text NOT NULL,
  ratio_category text NOT NULL,
  current_value numeric(15,4) NOT NULL,
  prior_year_value numeric(15,4) NOT NULL,
  industry_benchmark numeric(15,4),
  variance_percent numeric(10,2),
  description text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE financial_ratios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read financial ratios"
  ON financial_ratios FOR SELECT
  TO authenticated
  USING (true);

-- Income Statement
CREATE TABLE IF NOT EXISTS income_statement (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  line_item text NOT NULL,
  category text NOT NULL,
  sub_category text,
  current_year numeric(15,2) DEFAULT 0,
  prior_year numeric(15,2) DEFAULT 0,
  variance_amount numeric(15,2) DEFAULT 0,
  variance_percent numeric(10,2) DEFAULT 0,
  is_total boolean DEFAULT false,
  is_subtotal boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE income_statement ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read income statement"
  ON income_statement FOR SELECT
  TO authenticated
  USING (true);

-- Cash Flow Statement
CREATE TABLE IF NOT EXISTS cash_flow_statement (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  line_item text NOT NULL,
  category text NOT NULL,
  sub_category text,
  current_year numeric(15,2) DEFAULT 0,
  prior_year numeric(15,2) DEFAULT 0,
  variance_amount numeric(15,2) DEFAULT 0,
  variance_percent numeric(10,2) DEFAULT 0,
  is_total boolean DEFAULT false,
  is_subtotal boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cash_flow_statement ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read cash flow statement"
  ON cash_flow_statement FOR SELECT
  TO authenticated
  USING (true);
