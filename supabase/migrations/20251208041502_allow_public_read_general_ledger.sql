/*
  # Allow Public Read Access to General Ledger Tables
  
  Updates RLS policies for general ledger tables to allow public read access.
  This ensures all general ledger data is visible without requiring authentication.
  
  1. Changes
    - Drops existing authenticated-only policies for:
      - chart_of_accounts
      - journal_entries
      - journal_lines
      - account_balances
    - Creates new public read policies for these tables
    
  2. Security
    - Maintains RLS enabled state
    - Allows public SELECT operations
    - Matches the pattern used for other financial tables
*/

-- Drop existing authenticated-only policies
DROP POLICY IF EXISTS "Allow authenticated users to read chart of accounts" ON chart_of_accounts;
DROP POLICY IF EXISTS "Allow authenticated users to read journal entries" ON journal_entries;
DROP POLICY IF EXISTS "Allow authenticated users to read journal lines" ON journal_lines;
DROP POLICY IF EXISTS "Allow authenticated users to read account balances" ON account_balances;

-- Create new public read policies
CREATE POLICY "Allow public read access to chart of accounts"
  ON chart_of_accounts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to journal entries"
  ON journal_entries
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to journal lines"
  ON journal_lines
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to account balances"
  ON account_balances
  FOR SELECT
  TO public
  USING (true);
