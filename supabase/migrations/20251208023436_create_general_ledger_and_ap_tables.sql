/*
  # Create General Ledger and Accounts Payable Tables
  
  1. General Ledger Tables
    - `chart_of_accounts` - Master list of GL accounts
    - `journal_entries` - Journal entry headers
    - `journal_lines` - Individual debit/credit lines
    - `account_balances` - Current balance by account
  
  2. Accounts Payable Tables
    - `vendor_invoices` - Payable invoices from suppliers
    - `vendor_payments` - Payment history
    - `vendor_ledger` - Aging analysis by vendor
  
  3. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Chart of Accounts
CREATE TABLE IF NOT EXISTS chart_of_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_code text UNIQUE NOT NULL,
  account_name text NOT NULL,
  account_type text NOT NULL,
  category text NOT NULL,
  sub_category text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chart_of_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read chart of accounts"
  ON chart_of_accounts FOR SELECT
  TO authenticated
  USING (true);

-- Journal Entries
CREATE TABLE IF NOT EXISTS journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_number text UNIQUE NOT NULL,
  entry_date date NOT NULL,
  description text NOT NULL,
  entry_type text NOT NULL,
  reference text,
  status text DEFAULT 'Posted',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read journal entries"
  ON journal_entries FOR SELECT
  TO authenticated
  USING (true);

-- Journal Lines
CREATE TABLE IF NOT EXISTS journal_lines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_entry_id uuid REFERENCES journal_entries(id) ON DELETE CASCADE,
  account_code text NOT NULL,
  account_name text NOT NULL,
  debit numeric(15,2) DEFAULT 0,
  credit numeric(15,2) DEFAULT 0,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE journal_lines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read journal lines"
  ON journal_lines FOR SELECT
  TO authenticated
  USING (true);

-- Account Balances
CREATE TABLE IF NOT EXISTS account_balances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_code text NOT NULL,
  account_name text NOT NULL,
  account_type text NOT NULL,
  opening_balance numeric(15,2) DEFAULT 0,
  debit_total numeric(15,2) DEFAULT 0,
  credit_total numeric(15,2) DEFAULT 0,
  closing_balance numeric(15,2) DEFAULT 0,
  period_start date NOT NULL,
  period_end date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE account_balances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read account balances"
  ON account_balances FOR SELECT
  TO authenticated
  USING (true);

-- Vendor Invoices
CREATE TABLE IF NOT EXISTS vendor_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text UNIQUE NOT NULL,
  vendor_name text NOT NULL,
  vendor_id text NOT NULL,
  invoice_date date NOT NULL,
  due_date date NOT NULL,
  amount numeric(15,2) NOT NULL,
  amount_paid numeric(15,2) DEFAULT 0,
  status text DEFAULT 'Outstanding',
  payment_terms text,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE vendor_invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read vendor invoices"
  ON vendor_invoices FOR SELECT
  TO authenticated
  USING (true);

-- Vendor Payments
CREATE TABLE IF NOT EXISTS vendor_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_number text UNIQUE NOT NULL,
  vendor_invoice_id uuid REFERENCES vendor_invoices(id) ON DELETE SET NULL,
  vendor_id text NOT NULL,
  vendor_name text NOT NULL,
  payment_date date NOT NULL,
  amount numeric(15,2) NOT NULL,
  payment_method text NOT NULL,
  reference text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE vendor_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read vendor payments"
  ON vendor_payments FOR SELECT
  TO authenticated
  USING (true);

-- Vendor Ledger (Aging Analysis)
CREATE TABLE IF NOT EXISTS vendor_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id text UNIQUE NOT NULL,
  vendor_name text NOT NULL,
  current_amt numeric(15,2) DEFAULT 0,
  thirty_days numeric(15,2) DEFAULT 0,
  sixty_days numeric(15,2) DEFAULT 0,
  ninety_plus_days numeric(15,2) DEFAULT 0,
  total_outstanding numeric(15,2) DEFAULT 0,
  total_overdue numeric(15,2) DEFAULT 0,
  invoice_count integer DEFAULT 0,
  days_payable_outstanding integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE vendor_ledger ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read vendor ledger"
  ON vendor_ledger FOR SELECT
  TO authenticated
  USING (true);
