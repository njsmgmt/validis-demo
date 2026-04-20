/*
  # Update Financial Data for Medium-Sized Clothing Retailer
  
  This migration replaces sample data with realistic figures for a medium-sized clothing retailer
  with annual revenue of approximately $10M, showing natural business patterns including:
  
  1. Dashboard Metrics
    - Annual revenue: $10.2M with seasonal variations
    - Gross profit margin: ~45% (typical for clothing retail)
    - EBIT and Net Profit showing healthy margins
    - Credit ratios appropriate for retail operations
  
  2. Time Series Data (24 months)
    - Bank balance showing realistic ups and downs
    - Seasonal patterns (higher during Q4 holiday season)
    - Natural cash flow fluctuations
    - Monthly variations reflecting retail operations
  
  3. Bank Transactions
    - Mix of customer payments, supplier payments, payroll, rent, utilities
    - Realistic amounts for medium-sized retailer
    - Mix of reconciled and unreconciled transactions
  
  4. Financial Data (Balance Sheet)
    - Assets reflecting retail inventory, receivables, property
    - Liabilities showing appropriate debt levels
    - Equity reflecting profitable operations
*/

-- Clear existing data
DELETE FROM dashboard_metrics;
DELETE FROM time_series_data;
DELETE FROM bank_transactions;
DELETE FROM financial_data;
DELETE FROM quality_score;

-- Dashboard Metrics for Clothing Retailer
INSERT INTO dashboard_metrics (metric_name, value, change_percent, metric_type, financial_period, display_order) VALUES
('Revenue', 10245000, 8.3, 'overview', 'vs Prior Year', 1),
('Gross Profit', 4610250, 6.7, 'overview', 'vs Prior Year', 2),
('EBIT', 1126900, 4.2, 'overview', 'vs Prior Year', 3),
('Net Profit', 789650, 5.8, 'overview', 'vs Prior Year', 4),
('Debt to Assets Ratio', 0.38, -4.2, 'credit', 'vs Prior Year', 1),
('Debt to Equity Ratio', 1.52, -6.1, 'credit', 'vs Prior Year', 2),
('Leverage Ratio', 2.45, 2.3, 'credit', 'vs Prior Year', 3);

-- Time Series Data with Natural Business Patterns (24 months)
-- Showing seasonal variations typical for clothing retail
INSERT INTO time_series_data (date, bank_balance, debt_to_assets_ratio) VALUES
('2022-01-01', 485000, 0.42),
('2022-02-01', 392000, 0.43),
('2022-03-01', 456000, 0.42),
('2022-04-01', 521000, 0.41),
('2022-05-01', 478000, 0.41),
('2022-06-01', 445000, 0.42),
('2022-07-01', 412000, 0.42),
('2022-08-01', 523000, 0.41),
('2022-09-01', 612000, 0.40),
('2022-10-01', 698000, 0.39),
('2022-11-01', 845000, 0.38),
('2022-12-01', 1125000, 0.36),
('2023-01-01', 892000, 0.37),
('2023-02-01', 645000, 0.39),
('2023-03-01', 578000, 0.40),
('2023-04-01', 634000, 0.39),
('2023-05-01', 712000, 0.38),
('2023-06-01', 668000, 0.39),
('2023-07-01', 545000, 0.40),
('2023-08-01', 623000, 0.39),
('2023-09-01', 734000, 0.38),
('2023-10-01', 856000, 0.37),
('2023-11-01', 978000, 0.36),
('2023-12-01', 1245000, 0.35);

-- Bank Transactions (Recent 60 days of activity)
INSERT INTO bank_transactions (transaction_date, description, reference, amount, transaction_type, bank_account, reconciliation_status) VALUES
('2023-12-07', 'Customer Payment - Fashion Boutique LLC', 'PMT-5489', 12450.00, 'Deposit', 'Main Operating - *4532', 'Reconciled'),
('2023-12-07', 'Online Sales - Shopify', 'SHOP-8821', 8925.50, 'Deposit', 'Main Operating - *4532', 'Reconciled'),
('2023-12-06', 'Supplier Payment - Textile Imports Inc', 'INV-7823', -24500.00, 'Withdrawal', 'Main Operating - *4532', 'Reconciled'),
('2023-12-06', 'Payroll - December 2023', 'PAY-1223', -48750.00, 'Withdrawal', 'Main Operating - *4532', 'Reconciled'),
('2023-12-05', 'Customer Payment - TrendSetters Co', 'PMT-5488', 15680.00, 'Deposit', 'Main Operating - *4532', 'Reconciled'),
('2023-12-05', 'Rent Payment - Warehouse', 'RENT-DEC', -8500.00, 'Withdrawal', 'Main Operating - *4532', 'Reconciled'),
('2023-12-04', 'Online Sales - Website', 'WEB-3341', 6834.25, 'Deposit', 'Main Operating - *4532', 'Unreconciled'),
('2023-12-04', 'Utilities - Electric', 'UTIL-5123', -1245.50, 'Withdrawal', 'Main Operating - *4532', 'Reconciled'),
('2023-12-03', 'Customer Payment - Style Maven Inc', 'PMT-5487', 18950.00, 'Deposit', 'Main Operating - *4532', 'Reconciled'),
('2023-12-03', 'Supplier Payment - Fashion Fabrics Ltd', 'INV-8934', -16750.00, 'Withdrawal', 'Main Operating - *4532', 'Reconciled'),
('2023-12-02', 'Customer Payment - Urban Wear Stores', 'PMT-5486', 22340.00, 'Deposit', 'Main Operating - *4532', 'Reconciled'),
('2023-12-01', 'Online Sales - Shopify', 'SHOP-8820', 11245.75, 'Deposit', 'Main Operating - *4532', 'Reconciled'),
('2023-12-01', 'Insurance - Business Policy', 'INS-Q4', -3850.00, 'Withdrawal', 'Main Operating - *4532', 'Reconciled'),
('2023-11-30', 'Customer Payment - Chic Collections', 'PMT-5485', 19875.00, 'Deposit', 'Main Operating - *4532', 'Reconciled'),
('2023-11-30', 'Supplier Payment - Import Textiles Co', 'INV-9102', -28450.00, 'Withdrawal', 'Main Operating - *4532', 'Reconciled'),
('2023-11-29', 'Online Sales - Amazon', 'AMZ-7712', 9456.30, 'Deposit', 'Main Operating - *4532', 'Unreconciled'),
('2023-11-29', 'Marketing - Social Media Ads', 'MKT-1129', -4200.00, 'Withdrawal', 'Main Operating - *4532', 'Reconciled'),
('2023-11-28', 'Customer Payment - Fashion Forward Inc', 'PMT-5484', 16720.00, 'Deposit', 'Main Operating - *4532', 'Reconciled'),
('2023-11-28', 'Equipment Maintenance', 'MAINT-234', -2150.00, 'Withdrawal', 'Main Operating - *4532', 'Reconciled'),
('2023-11-27', 'Online Sales - Website', 'WEB-3340', 7892.40, 'Deposit', 'Main Operating - *4532', 'Reconciled'),
('2023-11-27', 'Supplier Payment - Quality Garments Ltd', 'INV-6745', -19800.00, 'Withdrawal', 'Main Operating - *4532', 'Reconciled'),
('2023-11-26', 'Customer Payment - Retail Dynamics LLC', 'PMT-5483', 24560.00, 'Deposit', 'Main Operating - *4532', 'Reconciled'),
('2023-11-25', 'Online Sales - Shopify', 'SHOP-8819', 13450.80, 'Deposit', 'Main Operating - *4532', 'Reconciled'),
('2023-11-24', 'Supplier Payment - Fabric Wholesalers', 'INV-5623', -21300.00, 'Withdrawal', 'Main Operating - *4532', 'Reconciled'),
('2023-11-23', 'Customer Payment - Style Emporium', 'PMT-5482', 17890.00, 'Deposit', 'Main Operating - *4532', 'Unreconciled'),
('2023-11-23', 'Rent Payment - Retail Store', 'RENT-NOV', -6800.00, 'Withdrawal', 'Main Operating - *4532', 'Reconciled'),
('2023-11-22', 'Payroll - Mid-Month', 'PAY-1122', -48750.00, 'Withdrawal', 'Main Operating - *4532', 'Reconciled'),
('2023-11-22', 'Online Sales - Website', 'WEB-3339', 8923.15, 'Deposit', 'Main Operating - *4532', 'Reconciled'),
('2023-11-21', 'Customer Payment - Modern Trends Co', 'PMT-5481', 14670.00, 'Deposit', 'Main Operating - *4532', 'Reconciled'),
('2023-11-21', 'Utilities - Water & Gas', 'UTIL-5122', -892.30, 'Withdrawal', 'Main Operating - *4532', 'Reconciled');

-- Financial Data (Balance Sheet) for Clothing Retailer
INSERT INTO financial_data (category, sub_category, year_end_2021, year_end_2020, variance_percent, display_order) VALUES
('Current Assets', 'Cash and Bank Balances', 1245000, 892000, 39.6, 1),
('Current Assets', 'Trade Receivables', 845000, 756000, 11.8, 2),
('Current Assets', 'Inventories', 1850000, 1620000, 14.2, 3),
('Current Assets', 'Other Current Assets', 185000, 142000, 30.3, 4),
('Current Assets', 'Total Current Assets', 4125000, 3410000, 21.0, 5),
('Non-Current Assets', 'Property, Plant & Equipment', 2850000, 2920000, -2.4, 6),
('Non-Current Assets', 'Leasehold Improvements', 485000, 512000, -5.3, 7),
('Non-Current Assets', 'Intangible Assets', 245000, 268000, -8.6, 8),
('Non-Current Assets', 'Total Non-Current Assets', 3580000, 3700000, -3.2, 9),
('Total', 'Total Assets', 7705000, 7110000, 8.4, 10),
('Current Liabilities', 'Trade Payables', 1245000, 1120000, 11.2, 11),
('Current Liabilities', 'Short-term Borrowings', 485000, 620000, -21.8, 12),
('Current Liabilities', 'Accrued Expenses', 385000, 342000, 12.6, 13),
('Current Liabilities', 'Total Current Liabilities', 2115000, 2082000, 1.6, 14),
('Non-Current Liabilities', 'Long-term Borrowings', 785000, 945000, -16.9, 15),
('Non-Current Liabilities', 'Deferred Tax Liabilities', 125000, 115000, 8.7, 16),
('Non-Current Liabilities', 'Total Non-Current Liabilities', 910000, 1060000, -14.2, 17),
('Total', 'Total Liabilities', 3025000, 3142000, -3.7, 18),
('Equity', 'Share Capital', 500000, 500000, 0.0, 19),
('Equity', 'Retained Earnings', 4180000, 3468000, 20.5, 20),
('Equity', 'Total Equity', 4680000, 3968000, 17.9, 21),
('Total', 'Total Liabilities and Equity', 7705000, 7110000, 8.4, 22);

-- Quality Score Data
INSERT INTO quality_score (type, test, score_2022, score_2021, score_2020, display_order) VALUES
('Ledger Reconciliations', 'Bank Reconciliation', 'Excellent', 'Excellent', 'Good', 1),
('Ledger Reconciliations', 'Debtors Reconciliation', 'Good', 'Good', 'Satisfactory', 2),
('Ledger Reconciliations', 'Creditors Reconciliation', 'Excellent', 'Good', 'Good', 3),
('Ledger Reconciliations', 'Inventory Reconciliation', 'Good', 'Satisfactory', 'Satisfactory', 4),
('Ledger Reconciliations', 'VAT Reconciliation', 'Excellent', 'Excellent', 'Good', 5),
('Month end procedures', 'Month End Close Timeline', 'Good', 'Good', 'Satisfactory', 6),
('Month end procedures', 'Journal Entry Review', 'Excellent', 'Good', 'Good', 7),
('Month end procedures', 'Accruals and Prepayments', 'Excellent', 'Excellent', 'Good', 8),
('Month end procedures', 'Inventory Valuation', 'Good', 'Good', 'Satisfactory', 9),
('Bookkeeping Integrity', 'Chart of Accounts Structure', 'Excellent', 'Excellent', 'Excellent', 10),
('Bookkeeping Integrity', 'Transaction Coding Accuracy', 'Good', 'Good', 'Satisfactory', 11),
('Bookkeeping Integrity', 'Supporting Documentation', 'Excellent', 'Good', 'Good', 12),
('Bookkeeping Integrity', 'Audit Trail Completeness', 'Excellent', 'Excellent', 'Good', 13);
