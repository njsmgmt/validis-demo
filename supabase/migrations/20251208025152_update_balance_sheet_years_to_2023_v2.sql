/*
  # Update Balance Sheet Years to 2023/2022
  
  Updates the balance sheet (financial_data) to use 2023/2022 fiscal years
  to maintain consistency with Income Statement and Cash Flow Statement.
  
  1. Changes
    - Updates all financial_data records to use 2023/2022 period
    - Scales values to reflect realistic growth
*/

UPDATE financial_data 
SET 
  financial_period = 'FY 2023/2024',
  year_end_2021 = ROUND(year_end_2021 * 1.33, 2),
  year_end_2020 = ROUND(year_end_2020 * 1.26, 2)
WHERE financial_period = 'FY 2021/2022';
