/*
  # Populate Sample Data
  
  Populates all tables with realistic sample data matching the Validis screenshots
*/

-- Populate Dashboard Metrics
INSERT INTO dashboard_metrics (metric_name, value, change_percent, metric_type, display_order) VALUES
('Sales', 2800000, 5.8, 'overview', 1),
('Gross Profit', 1200000, 3.2, 'overview', 2),
('EBIT', 450000, -0.47, 'overview', 3),
('Net Profit', 320000, -2.1, 'overview', 4),
('Debt to Assets Ratio', 0.42, -3.2, 'credit', 1),
('Debt to Equity Ratio', 1.85, -5.4, 'credit', 2),
('Leverage Ratio', 2.73, 1.8, 'credit', 3);

-- Populate Financial Data (Balance Sheet)
INSERT INTO financial_data (category, sub_category, year_end_2021, year_end_2020, variance_percent, display_order) VALUES
('Current Assets', 'Cash and Bank Balances', 185000, 142000, 30.3, 1),
('Current Assets', 'Trade Receivables', 420000, 380000, 10.5, 2),
('Current Assets', 'Inventories', 280000, 245000, 14.3, 3),
('Current Assets', 'Other Current Assets', 95000, 88000, 8.0, 4),
('Current Assets', 'Total Current Assets', 980000, 855000, 14.6, 5),
('Non-Current Assets', 'Property, Plant & Equipment', 650000, 620000, 4.8, 6),
('Non-Current Assets', 'Intangible Assets', 120000, 125000, -4.0, 7),
('Non-Current Assets', 'Investments', 85000, 75000, 13.3, 8),
('Non-Current Assets', 'Total Non-Current Assets', 855000, 820000, 4.3, 9),
('Total', 'Total Assets', 1835000, 1675000, 9.6, 10),
('Current Liabilities', 'Trade Payables', 285000, 260000, 9.6, 11),
('Current Liabilities', 'Short-term Borrowings', 150000, 175000, -14.3, 12),
('Current Liabilities', 'Other Current Liabilities', 125000, 110000, 13.6, 13),
('Current Liabilities', 'Total Current Liabilities', 560000, 545000, 2.8, 14),
('Non-Current Liabilities', 'Long-term Borrowings', 420000, 380000, 10.5, 15),
('Non-Current Liabilities', 'Deferred Tax Liabilities', 85000, 78000, 9.0, 16),
('Non-Current Liabilities', 'Total Non-Current Liabilities', 505000, 458000, 10.3, 17),
('Total', 'Total Liabilities', 1065000, 1003000, 6.2, 18),
('Equity', 'Share Capital', 200000, 200000, 0.0, 19),
('Equity', 'Retained Earnings', 570000, 472000, 20.8, 20),
('Equity', 'Total Equity', 770000, 672000, 14.6, 21),
('Total', 'Total Liabilities and Equity', 1835000, 1675000, 9.6, 22);

-- Populate Time Series Data (Monthly from Nov 2020 to Oct 2023)
INSERT INTO time_series_data (date, bank_balance, debt_to_assets_ratio) VALUES
('2020-11-01', 142000, 0.48),
('2020-12-01', 138000, 0.47),
('2021-01-01', 145000, 0.46),
('2021-02-01', 152000, 0.45),
('2021-03-01', 148000, 0.46),
('2021-04-01', 155000, 0.45),
('2021-05-01', 162000, 0.44),
('2021-06-01', 158000, 0.45),
('2021-07-01', 165000, 0.44),
('2021-08-01', 172000, 0.43),
('2021-09-01', 168000, 0.44),
('2021-10-01', 175000, 0.43),
('2021-11-01', 182000, 0.42),
('2021-12-01', 185000, 0.42),
('2022-01-01', 188000, 0.41),
('2022-02-01', 192000, 0.40),
('2022-03-01', 195000, 0.40),
('2022-04-01', 198000, 0.39),
('2022-05-01', 202000, 0.38),
('2022-06-01', 205000, 0.38),
('2022-07-01', 208000, 0.37),
('2022-08-01', 212000, 0.37),
('2022-09-01', 215000, 0.36),
('2022-10-01', 218000, 0.36),
('2022-11-01', 222000, 0.35),
('2022-12-01', 225000, 0.35),
('2023-01-01', 228000, 0.34),
('2023-02-01', 232000, 0.34),
('2023-03-01', 235000, 0.33),
('2023-04-01', 238000, 0.33),
('2023-05-01', 242000, 0.32),
('2023-06-01', 245000, 0.32),
('2023-07-01', 248000, 0.31),
('2023-08-01', 252000, 0.31),
('2023-09-01', 255000, 0.30),
('2023-10-01', 258000, 0.30);

-- Populate Quality Score
INSERT INTO quality_score (type, test, score_2022, score_2021, score_2020, display_order) VALUES
('Ledger Reconciliations', 'Bank Reconciliation', 'Excellent', 'Good', 'Good', 1),
('Ledger Reconciliations', 'Debtors Reconciliation', 'Good', 'Good', 'Satisfactory', 2),
('Ledger Reconciliations', 'Creditors Reconciliation', 'Good', 'Satisfactory', 'Satisfactory', 3),
('Ledger Reconciliations', 'VAT Reconciliation', 'Excellent', 'Excellent', 'Good', 4),
('Month end procedures', 'Month End Close Timeline', 'Good', 'Satisfactory', 'Poor', 5),
('Month end procedures', 'Journal Entry Review', 'Good', 'Good', 'Satisfactory', 6),
('Month end procedures', 'Accruals and Prepayments', 'Excellent', 'Good', 'Good', 7),
('Bookkeeping Integrity', 'Chart of Accounts Structure', 'Excellent', 'Excellent', 'Excellent', 8),
('Bookkeeping Integrity', 'Transaction Coding Accuracy', 'Good', 'Good', 'Satisfactory', 9),
('Bookkeeping Integrity', 'Supporting Documentation', 'Good', 'Satisfactory', 'Satisfactory', 10),
('Bookkeeping Integrity', 'Audit Trail Completeness', 'Excellent', 'Good', 'Good', 11);