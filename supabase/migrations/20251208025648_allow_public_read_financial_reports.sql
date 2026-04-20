/*
  # Allow Public Read Access to Financial Reports
  
  Updates RLS policies for financial reports tables to allow public read access.
  This ensures all financial reports data is visible without requiring authentication.
  
  1. Changes
    - Drops existing authenticated-only policies for financial_ratios, income_statement, and cash_flow_statement
    - Creates new public read policies for these tables
    
  2. Security
    - Maintains RLS enabled state
    - Allows public SELECT operations
    - This matches the pattern used for financial_data table
*/

DROP POLICY IF EXISTS "Allow authenticated users to read financial ratios" ON financial_ratios;
DROP POLICY IF EXISTS "Allow authenticated users to read income statement" ON income_statement;
DROP POLICY IF EXISTS "Allow authenticated users to read cash flow statement" ON cash_flow_statement;

CREATE POLICY "Allow public read access to financial ratios"
  ON financial_ratios
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to income statement"
  ON income_statement
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to cash flow statement"
  ON cash_flow_statement
  FOR SELECT
  TO public
  USING (true);
