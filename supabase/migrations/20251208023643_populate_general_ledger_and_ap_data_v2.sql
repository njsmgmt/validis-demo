/*
  # Populate General Ledger and Accounts Payable Data for Clothing Retailer
  
  This migration adds realistic data for:
  
  1. Chart of Accounts
    - Standard GL accounts for retail operations
    - Asset, Liability, Equity, Revenue, and Expense accounts
  
  2. Journal Entries
    - Recent transactions including sales, purchases, payroll, etc.
    - Proper double-entry bookkeeping
  
  3. Account Balances
    - Current period balances for all accounts
  
  4. Vendor Invoices
    - Supplier invoices for clothing inventory
    - Mix of paid, unpaid, and overdue invoices
  
  5. Vendor Ledger
    - Aging analysis by vendor
*/

-- Chart of Accounts for Clothing Retailer
INSERT INTO chart_of_accounts (account_code, account_name, account_type, category, sub_category) VALUES
-- Assets
('1000', 'Cash - Operating Account', 'Asset', 'Current Assets', 'Cash and Bank'),
('1010', 'Cash - Payroll Account', 'Asset', 'Current Assets', 'Cash and Bank'),
('1100', 'Accounts Receivable', 'Asset', 'Current Assets', 'Receivables'),
('1200', 'Inventory - Clothing', 'Asset', 'Current Assets', 'Inventory'),
('1210', 'Inventory - Accessories', 'Asset', 'Current Assets', 'Inventory'),
('1500', 'Property and Equipment', 'Asset', 'Non-Current Assets', 'Fixed Assets'),
('1510', 'Accumulated Depreciation', 'Asset', 'Non-Current Assets', 'Fixed Assets'),
('1600', 'Leasehold Improvements', 'Asset', 'Non-Current Assets', 'Fixed Assets'),

-- Liabilities
('2000', 'Accounts Payable', 'Liability', 'Current Liabilities', 'Payables'),
('2100', 'Accrued Expenses', 'Liability', 'Current Liabilities', 'Accruals'),
('2200', 'Sales Tax Payable', 'Liability', 'Current Liabilities', 'Tax'),
('2300', 'Short-term Loan', 'Liability', 'Current Liabilities', 'Borrowings'),
('2500', 'Long-term Debt', 'Liability', 'Non-Current Liabilities', 'Borrowings'),

-- Equity
('3000', 'Share Capital', 'Equity', 'Equity', 'Capital'),
('3100', 'Retained Earnings', 'Equity', 'Equity', 'Earnings'),
('3200', 'Current Year Earnings', 'Equity', 'Equity', 'Earnings'),

-- Revenue
('4000', 'Clothing Sales - Retail', 'Revenue', 'Revenue', 'Sales'),
('4010', 'Clothing Sales - Wholesale', 'Revenue', 'Revenue', 'Sales'),
('4020', 'Accessories Sales', 'Revenue', 'Revenue', 'Sales'),
('4100', 'Online Sales', 'Revenue', 'Revenue', 'Sales'),

-- Cost of Goods Sold
('5000', 'Cost of Goods Sold - Clothing', 'Expense', 'Cost of Sales', 'COGS'),
('5010', 'Cost of Goods Sold - Accessories', 'Expense', 'Cost of Sales', 'COGS'),
('5100', 'Freight and Shipping', 'Expense', 'Cost of Sales', 'COGS'),

-- Operating Expenses
('6000', 'Salaries and Wages', 'Expense', 'Operating Expenses', 'Personnel'),
('6010', 'Payroll Taxes', 'Expense', 'Operating Expenses', 'Personnel'),
('6100', 'Rent Expense', 'Expense', 'Operating Expenses', 'Occupancy'),
('6110', 'Utilities', 'Expense', 'Operating Expenses', 'Occupancy'),
('6200', 'Marketing and Advertising', 'Expense', 'Operating Expenses', 'Marketing'),
('6300', 'Insurance', 'Expense', 'Operating Expenses', 'General'),
('6400', 'Depreciation Expense', 'Expense', 'Operating Expenses', 'General'),
('6500', 'Professional Fees', 'Expense', 'Operating Expenses', 'General');

-- Journal Entries (Recent month)
INSERT INTO journal_entries (entry_number, entry_date, description, entry_type, reference, status) VALUES
('JE-2023-120', '2023-12-01', 'Monthly sales revenue', 'Sales', 'DEC-SALES', 'Posted'),
('JE-2023-121', '2023-12-01', 'Cost of goods sold - December', 'COGS', 'DEC-COGS', 'Posted'),
('JE-2023-122', '2023-12-05', 'Inventory purchase - Textile Imports Inc', 'Purchase', 'INV-7823', 'Posted'),
('JE-2023-123', '2023-12-06', 'Payroll - December 2023', 'Payroll', 'PAY-1223', 'Posted'),
('JE-2023-124', '2023-12-05', 'Rent payment - December', 'Expense', 'RENT-DEC', 'Posted'),
('JE-2023-125', '2023-12-04', 'Utilities expense', 'Expense', 'UTIL-5123', 'Posted'),
('JE-2023-126', '2023-12-03', 'Inventory purchase - Fashion Fabrics Ltd', 'Purchase', 'INV-8934', 'Posted'),
('JE-2023-127', '2023-12-01', 'Insurance payment - Q4', 'Expense', 'INS-Q4', 'Posted'),
('JE-2023-128', '2023-11-29', 'Marketing - Social Media Ads', 'Expense', 'MKT-1129', 'Posted'),
('JE-2023-129', '2023-11-30', 'Inventory purchase - Import Textiles Co', 'Purchase', 'INV-9102', 'Posted');

-- Journal Lines (Double-entry bookkeeping)
-- Entry 1: Monthly sales
INSERT INTO journal_lines (journal_entry_id, account_code, account_name, debit, credit, description) VALUES
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-120'), '1100', 'Accounts Receivable', 856420.00, 0.00, 'December sales'),
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-120'), '4000', 'Clothing Sales - Retail', 0.00, 620000.00, 'Retail sales'),
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-120'), '4010', 'Clothing Sales - Wholesale', 0.00, 186420.00, 'Wholesale sales'),
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-120'), '4020', 'Accessories Sales', 0.00, 50000.00, 'Accessories sales');

-- Entry 2: COGS
INSERT INTO journal_lines (journal_entry_id, account_code, account_name, debit, credit, description) VALUES
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-121'), '5000', 'Cost of Goods Sold - Clothing', 470000.00, 0.00, 'COGS - Clothing'),
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-121'), '1200', 'Inventory - Clothing', 0.00, 470000.00, 'Inventory reduction');

-- Entry 3: Inventory purchase
INSERT INTO journal_lines (journal_entry_id, account_code, account_name, debit, credit, description) VALUES
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-122'), '1200', 'Inventory - Clothing', 24500.00, 0.00, 'Inventory purchase'),
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-122'), '2000', 'Accounts Payable', 0.00, 24500.00, 'Textile Imports Inc');

-- Entry 4: Payroll
INSERT INTO journal_lines (journal_entry_id, account_code, account_name, debit, credit, description) VALUES
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-123'), '6000', 'Salaries and Wages', 48750.00, 0.00, 'December payroll'),
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-123'), '1000', 'Cash - Operating Account', 0.00, 48750.00, 'Payroll payment');

-- Entry 5: Rent
INSERT INTO journal_lines (journal_entry_id, account_code, account_name, debit, credit, description) VALUES
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-124'), '6100', 'Rent Expense', 8500.00, 0.00, 'Warehouse rent'),
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-124'), '1000', 'Cash - Operating Account', 0.00, 8500.00, 'Rent payment');

-- Entry 6: Utilities
INSERT INTO journal_lines (journal_entry_id, account_code, account_name, debit, credit, description) VALUES
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-125'), '6110', 'Utilities', 1245.50, 0.00, 'Electric bill'),
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-125'), '1000', 'Cash - Operating Account', 0.00, 1245.50, 'Utility payment');

-- Entry 7: Inventory purchase
INSERT INTO journal_lines (journal_entry_id, account_code, account_name, debit, credit, description) VALUES
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-126'), '1200', 'Inventory - Clothing', 16750.00, 0.00, 'Inventory purchase'),
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-126'), '2000', 'Accounts Payable', 0.00, 16750.00, 'Fashion Fabrics Ltd');

-- Entry 8: Insurance
INSERT INTO journal_lines (journal_entry_id, account_code, account_name, debit, credit, description) VALUES
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-127'), '6300', 'Insurance', 3850.00, 0.00, 'Q4 insurance premium'),
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-127'), '1000', 'Cash - Operating Account', 0.00, 3850.00, 'Insurance payment');

-- Entry 9: Marketing
INSERT INTO journal_lines (journal_entry_id, account_code, account_name, debit, credit, description) VALUES
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-128'), '6200', 'Marketing and Advertising', 4200.00, 0.00, 'Social media ads'),
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-128'), '1000', 'Cash - Operating Account', 0.00, 4200.00, 'Marketing payment');

-- Entry 10: Inventory purchase
INSERT INTO journal_lines (journal_entry_id, account_code, account_name, debit, credit, description) VALUES
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-129'), '1200', 'Inventory - Clothing', 28450.00, 0.00, 'Inventory purchase'),
((SELECT id FROM journal_entries WHERE entry_number = 'JE-2023-129'), '2000', 'Accounts Payable', 0.00, 28450.00, 'Import Textiles Co');

-- Account Balances (Current Period: Dec 2023)
INSERT INTO account_balances (account_code, account_name, account_type, opening_balance, debit_total, credit_total, closing_balance, period_start, period_end) VALUES
('1000', 'Cash - Operating Account', 'Asset', 892000.00, 425000.00, 72045.50, 1244954.50, '2023-12-01', '2023-12-31'),
('1100', 'Accounts Receivable', 'Asset', 756000.00, 856420.00, 767500.00, 844920.00, '2023-12-01', '2023-12-31'),
('1200', 'Inventory - Clothing', 'Asset', 1620000.00, 285700.00, 470000.00, 1435700.00, '2023-12-01', '2023-12-31'),
('2000', 'Accounts Payable', 'Liability', 1120000.00, 89500.00, 159200.00, 1189700.00, '2023-12-01', '2023-12-31'),
('4000', 'Clothing Sales - Retail', 'Revenue', 0.00, 0.00, 620000.00, 620000.00, '2023-12-01', '2023-12-31'),
('4010', 'Clothing Sales - Wholesale', 'Revenue', 0.00, 0.00, 186420.00, 186420.00, '2023-12-01', '2023-12-31'),
('5000', 'Cost of Goods Sold - Clothing', 'Expense', 0.00, 470000.00, 0.00, 470000.00, '2023-12-01', '2023-12-31'),
('6000', 'Salaries and Wages', 'Expense', 0.00, 48750.00, 0.00, 48750.00, '2023-12-01', '2023-12-31'),
('6100', 'Rent Expense', 'Expense', 0.00, 8500.00, 0.00, 8500.00, '2023-12-01', '2023-12-31'),
('6110', 'Utilities', 'Expense', 0.00, 1245.50, 0.00, 1245.50, '2023-12-01', '2023-12-31'),
('6200', 'Marketing and Advertising', 'Expense', 0.00, 4200.00, 0.00, 4200.00, '2023-12-01', '2023-12-31'),
('6300', 'Insurance', 'Expense', 0.00, 3850.00, 0.00, 3850.00, '2023-12-01', '2023-12-31');

-- Vendor Invoices for Clothing Suppliers
INSERT INTO vendor_invoices (invoice_number, vendor_name, vendor_id, invoice_date, due_date, amount, amount_paid, status, payment_terms, description) VALUES
-- Paid invoices
('VI-2023-045', 'Textile Imports Inc', 'VEND-001', '2023-11-05', '2023-12-05', 24500.00, 24500.00, 'Paid', '30 days', 'Cotton fabric rolls - 500 units'),
('VI-2023-046', 'Fashion Fabrics Ltd', 'VEND-002', '2023-11-03', '2023-12-03', 16750.00, 16750.00, 'Paid', '30 days', 'Designer fabrics - mixed'),
('VI-2023-047', 'Import Textiles Co', 'VEND-003', '2023-10-30', '2023-11-30', 28450.00, 28450.00, 'Paid', '30 days', 'Premium textiles bulk order'),
('VI-2023-049', 'Quality Garments Ltd', 'VEND-004', '2023-11-27', '2023-12-27', 19800.00, 19800.00, 'Paid', '30 days', 'Finished garments - 250 pieces'),

-- Current (not yet due)
('VI-2023-055', 'Fabric Wholesalers', 'VEND-005', '2023-11-24', '2023-12-24', 21300.00, 0.00, 'Outstanding', '30 days', 'Seasonal fabric collection'),
('VI-2023-056', 'Thread & Notions Co', 'VEND-006', '2023-11-28', '2023-12-28', 4850.00, 0.00, 'Outstanding', '30 days', 'Buttons, zippers, thread'),
('VI-2023-057', 'Premium Textiles Inc', 'VEND-007', '2023-12-01', '2023-12-31', 32450.00, 0.00, 'Outstanding', '30 days', 'Luxury fabric collection'),
('VI-2023-058', 'Global Fabrics Ltd', 'VEND-008', '2023-12-05', '2024-01-04', 18950.00, 0.00, 'Outstanding', '30 days', 'Denim and cotton mix'),

-- Overdue 1-30 days
('VI-2023-052', 'Fashion Supplies Co', 'VEND-009', '2023-10-28', '2023-11-27', 15680.00, 0.00, 'Overdue', '30 days', 'Sewing supplies bulk'),
('VI-2023-053', 'Textile Traders Ltd', 'VEND-010', '2023-11-02', '2023-12-02', 12340.00, 0.00, 'Overdue', '30 days', 'Synthetic fabric rolls'),

-- Overdue 31-60 days
('VI-2023-050', 'Apparel Materials Inc', 'VEND-011', '2023-09-30', '2023-10-30', 22150.00, 0.00, 'Overdue', '30 days', 'Lining materials - bulk'),

-- Overdue 61+ days
('VI-2023-042', 'Vintage Fabrics Co', 'VEND-012', '2023-08-20', '2023-09-19', 8950.00, 0.00, 'Overdue', '30 days', 'Specialty vintage fabrics'),

-- Partial payment
('VI-2023-054', 'Designer Materials Ltd', 'VEND-013', '2023-11-10', '2023-12-10', 25600.00, 15000.00, 'Partial', '30 days', 'Premium designer fabrics');

-- Vendor Ledger (Aging Analysis)
INSERT INTO vendor_ledger (vendor_id, vendor_name, current_amt, thirty_days, sixty_days, ninety_plus_days, total_outstanding, total_overdue, invoice_count, days_payable_outstanding) VALUES
('VEND-005', 'Fabric Wholesalers', 21300.00, 0.00, 0.00, 0.00, 21300.00, 0.00, 1, 13),
('VEND-006', 'Thread & Notions Co', 4850.00, 0.00, 0.00, 0.00, 4850.00, 0.00, 1, 9),
('VEND-007', 'Premium Textiles Inc', 32450.00, 0.00, 0.00, 0.00, 32450.00, 0.00, 1, 6),
('VEND-008', 'Global Fabrics Ltd', 18950.00, 0.00, 0.00, 0.00, 18950.00, 0.00, 1, 2),
('VEND-009', 'Fashion Supplies Co', 0.00, 15680.00, 0.00, 0.00, 15680.00, 15680.00, 1, 40),
('VEND-010', 'Textile Traders Ltd', 0.00, 12340.00, 0.00, 0.00, 12340.00, 12340.00, 1, 35),
('VEND-011', 'Apparel Materials Inc', 0.00, 0.00, 22150.00, 0.00, 22150.00, 22150.00, 1, 68),
('VEND-012', 'Vintage Fabrics Co', 0.00, 0.00, 0.00, 8950.00, 8950.00, 8950.00, 1, 108),
('VEND-013', 'Designer Materials Ltd', 10600.00, 0.00, 0.00, 0.00, 10600.00, 0.00, 1, 27);
