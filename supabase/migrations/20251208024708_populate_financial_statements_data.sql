/*
  # Populate Financial Statements Data for Clothing Retailer
  
  This migration adds realistic data for:
  
  1. Financial Ratios (20 key ratios)
    - Liquidity ratios
    - Profitability ratios
    - Efficiency ratios
    - Leverage ratios
    - Market/valuation ratios
  
  2. Income Statement
    - Revenue breakdown
    - Cost of goods sold
    - Operating expenses
    - Net income
  
  3. Cash Flow Statement
    - Operating activities
    - Investing activities
    - Financing activities
*/

-- Financial Ratios (20 Key Ratios)
INSERT INTO financial_ratios (ratio_name, ratio_category, current_value, prior_year_value, industry_benchmark, variance_percent, description, display_order) VALUES
-- Liquidity Ratios
('Current Ratio', 'Liquidity', 1.95, 1.64, 1.80, 18.90, 'Current Assets / Current Liabilities', 1),
('Quick Ratio', 'Liquidity', 1.07, 0.89, 0.90, 20.22, '(Current Assets - Inventory) / Current Liabilities', 2),
('Cash Ratio', 'Liquidity', 0.59, 0.43, 0.50, 37.21, 'Cash / Current Liabilities', 3),
('Working Capital Ratio', 'Liquidity', 0.95, 0.79, 0.85, 20.25, 'Working Capital / Total Assets', 4),

-- Profitability Ratios
('Gross Profit Margin', 'Profitability', 45.00, 44.20, 43.50, 1.81, 'Gross Profit / Revenue', 5),
('Operating Profit Margin', 'Profitability', 11.00, 10.30, 10.80, 6.80, 'Operating Income / Revenue', 6),
('Net Profit Margin', 'Profitability', 7.71, 7.28, 7.00, 5.91, 'Net Income / Revenue', 7),
('Return on Assets (ROA)', 'Profitability', 10.25, 9.15, 9.50, 12.02, 'Net Income / Total Assets', 8),
('Return on Equity (ROE)', 'Profitability', 16.88, 14.82, 15.50, 13.90, 'Net Income / Shareholders Equity', 9),

-- Efficiency Ratios
('Asset Turnover', 'Efficiency', 1.33, 1.26, 1.35, 5.56, 'Revenue / Total Assets', 10),
('Inventory Turnover', 'Efficiency', 5.82, 5.41, 5.50, 7.58, 'Cost of Goods Sold / Average Inventory', 11),
('Days Inventory Outstanding', 'Efficiency', 62.71, 67.47, 66.36, -7.06, '365 / Inventory Turnover', 12),
('Receivables Turnover', 'Efficiency', 12.12, 11.45, 11.80, 5.85, 'Revenue / Average Receivables', 13),
('Days Sales Outstanding', 'Efficiency', 30.12, 31.88, 30.93, -5.52, '365 / Receivables Turnover', 14),

-- Leverage Ratios
('Debt to Assets', 'Leverage', 0.39, 0.44, 0.42, -11.36, 'Total Debt / Total Assets', 15),
('Debt to Equity', 'Leverage', 0.65, 0.79, 0.72, -17.72, 'Total Debt / Shareholders Equity', 16),
('Interest Coverage', 'Leverage', 18.25, 15.80, 16.50, 15.51, 'EBIT / Interest Expense', 17),

-- Growth Ratios
('Revenue Growth', 'Growth', 8.37, 6.20, 7.00, 35.00, '(Current Revenue - Prior Revenue) / Prior Revenue', 18),
('Earnings Growth', 'Growth', 13.45, 8.90, 10.50, 51.12, '(Current Earnings - Prior Earnings) / Prior Earnings', 19),
('Asset Growth', 'Growth', 8.37, 5.60, 6.80, 49.46, '(Current Assets - Prior Assets) / Prior Assets', 20);

-- Income Statement (Year End December 2023 vs 2022)
INSERT INTO income_statement (line_item, category, sub_category, current_year, prior_year, variance_amount, variance_percent, is_total, is_subtotal, display_order) VALUES
-- Revenue
('Retail Sales', 'Revenue', 'Sales', 6820000.00, 6280000.00, 540000.00, 8.60, false, false, 1),
('Wholesale Sales', 'Revenue', 'Sales', 2450000.00, 2310000.00, 140000.00, 6.06, false, false, 2),
('Online Sales', 'Revenue', 'Sales', 975000.00, 860000.00, 115000.00, 13.37, false, false, 3),
('Total Revenue', 'Revenue', 'Total', 10245000.00, 9450000.00, 795000.00, 8.41, true, false, 4),

-- Cost of Goods Sold
('Cost of Clothing', 'Cost of Sales', 'COGS', 4850000.00, 4520000.00, 330000.00, 7.30, false, false, 5),
('Cost of Accessories', 'Cost of Sales', 'COGS', 520000.00, 485000.00, 35000.00, 7.22, false, false, 6),
('Freight & Shipping', 'Cost of Sales', 'COGS', 265000.00, 270000.00, -5000.00, -1.85, false, false, 7),
('Total Cost of Goods Sold', 'Cost of Sales', 'Total', 5635000.00, 5275000.00, 360000.00, 6.82, true, false, 8),

-- Gross Profit
('Gross Profit', 'Gross Profit', 'Subtotal', 4610000.00, 4175000.00, 435000.00, 10.42, false, true, 9),

-- Operating Expenses
('Salaries and Wages', 'Operating Expenses', 'Personnel', 1950000.00, 1820000.00, 130000.00, 7.14, false, false, 10),
('Payroll Taxes & Benefits', 'Operating Expenses', 'Personnel', 385000.00, 358000.00, 27000.00, 7.54, false, false, 11),
('Rent Expense', 'Operating Expenses', 'Occupancy', 420000.00, 410000.00, 10000.00, 2.44, false, false, 12),
('Utilities', 'Operating Expenses', 'Occupancy', 85000.00, 82000.00, 3000.00, 3.66, false, false, 13),
('Marketing & Advertising', 'Operating Expenses', 'Marketing', 615000.00, 580000.00, 35000.00, 6.03, false, false, 14),
('Insurance', 'Operating Expenses', 'General', 95000.00, 92000.00, 3000.00, 3.26, false, false, 15),
('Depreciation & Amortization', 'Operating Expenses', 'General', 185000.00, 195000.00, -10000.00, -5.13, false, false, 16),
('Professional Fees', 'Operating Expenses', 'General', 128000.00, 118000.00, 10000.00, 8.47, false, false, 17),
('Other Operating Expenses', 'Operating Expenses', 'General', 220000.00, 215000.00, 5000.00, 2.33, false, false, 18),
('Total Operating Expenses', 'Operating Expenses', 'Total', 4083000.00, 3870000.00, 213000.00, 5.50, true, false, 19),

-- Operating Income
('Operating Income (EBIT)', 'Operating Income', 'Subtotal', 527000.00, 305000.00, 222000.00, 72.79, false, true, 20),

-- Other Income/Expense
('Interest Expense', 'Other Income/Expense', 'Expense', -28900.00, -32500.00, 3600.00, -11.08, false, false, 21),
('Other Income', 'Other Income/Expense', 'Income', 15200.00, 12800.00, 2400.00, 18.75, false, false, 22),

-- Income Before Tax
('Income Before Tax', 'Income Before Tax', 'Subtotal', 513300.00, 285300.00, 228000.00, 79.92, false, true, 23),

-- Tax
('Income Tax Expense', 'Tax', 'Expense', 123500.00, 68500.00, 55000.00, 80.29, false, false, 24),

-- Net Income
('Net Income', 'Net Income', 'Total', 389800.00, 216800.00, 173000.00, 79.80, true, false, 25);

-- Cash Flow Statement (Year End December 2023 vs 2022)
INSERT INTO cash_flow_statement (line_item, category, sub_category, current_year, prior_year, variance_amount, variance_percent, is_total, is_subtotal, display_order) VALUES
-- Operating Activities
('Net Income', 'Operating Activities', 'Starting Point', 389800.00, 216800.00, 173000.00, 79.80, false, false, 1),
('Depreciation & Amortization', 'Operating Activities', 'Non-Cash', 185000.00, 195000.00, -10000.00, -5.13, false, false, 2),
('Changes in Accounts Receivable', 'Operating Activities', 'Working Capital', -89000.00, -62000.00, -27000.00, 43.55, false, false, 3),
('Changes in Inventory', 'Operating Activities', 'Working Capital', -230000.00, -185000.00, -45000.00, 24.32, false, false, 4),
('Changes in Accounts Payable', 'Operating Activities', 'Working Capital', 125000.00, 95000.00, 30000.00, 31.58, false, false, 5),
('Changes in Accrued Expenses', 'Operating Activities', 'Working Capital', 43000.00, 28000.00, 15000.00, 53.57, false, false, 6),
('Other Operating Activities', 'Operating Activities', 'Other', -15800.00, -8200.00, -7600.00, 92.68, false, false, 7),
('Net Cash from Operating Activities', 'Operating Activities', 'Subtotal', 408000.00, 279600.00, 128400.00, 45.92, false, true, 8),

-- Investing Activities
('Purchase of Property & Equipment', 'Investing Activities', 'Capital Expenditures', -215000.00, -185000.00, -30000.00, 16.22, false, false, 9),
('Purchase of Leasehold Improvements', 'Investing Activities', 'Capital Expenditures', -58000.00, -72000.00, 14000.00, -19.44, false, false, 10),
('Sale of Equipment', 'Investing Activities', 'Disposals', 12000.00, 8000.00, 4000.00, 50.00, false, false, 11),
('Other Investing Activities', 'Investing Activities', 'Other', -5000.00, -3000.00, -2000.00, 66.67, false, false, 12),
('Net Cash from Investing Activities', 'Investing Activities', 'Subtotal', -266000.00, -252000.00, -14000.00, 5.56, false, true, 13),

-- Financing Activities
('Proceeds from Long-term Debt', 'Financing Activities', 'Borrowing', 150000.00, 200000.00, -50000.00, -25.00, false, false, 14),
('Repayment of Long-term Debt', 'Financing Activities', 'Debt Service', -310000.00, -285000.00, -25000.00, 8.77, false, false, 15),
('Repayment of Short-term Borrowings', 'Financing Activities', 'Debt Service', -135000.00, -95000.00, -40000.00, 42.11, false, false, 16),
('Dividends Paid', 'Financing Activities', 'Distributions', -50000.00, -40000.00, -10000.00, 25.00, false, false, 17),
('Net Cash from Financing Activities', 'Financing Activities', 'Subtotal', -345000.00, -220000.00, -125000.00, 56.82, false, true, 18),

-- Net Change in Cash
('Net Change in Cash', 'Net Change', 'Total', -203000.00, -192400.00, -10600.00, 5.51, false, true, 19),
('Cash - Beginning of Year', 'Cash Balance', 'Opening', 892000.00, 1084400.00, -192400.00, -17.74, false, false, 20),
('Cash - End of Year', 'Cash Balance', 'Closing', 689000.00, 892000.00, -203000.00, -22.76, true, false, 21);
