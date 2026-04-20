/*
  # Add Additional Dashboard Metrics with Values

  1. New Data
    - Add Operating Margin metric (overview category)
    - Add Net Profit Margin metric (overview category)
    - Add Current Ratio metric (liquidity category)
    - Add Quick Ratio metric (liquidity category)
    - Add Working Capital metric (liquidity category)
    - Add Return on Assets (ROA) metric (profitability category)
    - Add Return on Equity (ROE) metric (profitability category)
    - Add Asset Turnover Ratio metric (efficiency category)
    - Add Inventory Turnover Ratio metric (efficiency category)
    - Add Days Sales Outstanding (DSO) metric (efficiency category)
    
  2. Notes
    - All metrics include demo values and percentage changes for display
    - Organized by metric type: overview, liquidity, profitability, efficiency
    - Display order controls ordering within each category
*/

INSERT INTO dashboard_metrics (metric_name, value, change_percent, financial_period, metric_type, display_order) VALUES
  ('Operating Margin', 18.50, 2.30, 'Year End Dec 2021', 'overview', 5),
  ('Net Profit Margin', 12.80, 1.50, 'Year End Dec 2021', 'overview', 6),
  ('Current Ratio', 1.85, 0.15, 'Year End Dec 2021', 'liquidity', 1),
  ('Quick Ratio', 1.42, 0.08, 'Year End Dec 2021', 'liquidity', 2),
  ('Working Capital', 2850000.00, 4.50, 'Year End Dec 2021', 'liquidity', 3),
  ('Return on Assets', 14.20, 1.80, 'Year End Dec 2021', 'profitability', 1),
  ('Return on Equity', 28.50, 3.20, 'Year End Dec 2021', 'profitability', 2),
  ('Asset Turnover Ratio', 2.15, 0.25, 'Year End Dec 2021', 'efficiency', 1),
  ('Inventory Turnover Ratio', 6.80, 0.50, 'Year End Dec 2021', 'efficiency', 2),
  ('Days Sales Outstanding', 32.00, -2.00, 'Year End Dec 2021', 'efficiency', 3)
ON CONFLICT DO NOTHING;