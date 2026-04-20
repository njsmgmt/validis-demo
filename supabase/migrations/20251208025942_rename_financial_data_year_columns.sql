/*
  # Rename Financial Data Year Columns
  
  Updates the financial_data table to use year_end_2023 and year_end_2022 column names
  instead of year_end_2021 and year_end_2020 to better reflect the actual data periods.
  
  1. Changes
    - Renames year_end_2021 to year_end_2023
    - Renames year_end_2020 to year_end_2022
    - Updates variance calculation to use new column names
    
  2. Security
    - Maintains existing RLS policies
    - No data loss - only column renaming
*/

-- Rename the columns
ALTER TABLE financial_data 
  RENAME COLUMN year_end_2021 TO year_end_2023;

ALTER TABLE financial_data 
  RENAME COLUMN year_end_2020 TO year_end_2022;

-- Drop and recreate the variance_gbp computed column with updated formula
ALTER TABLE financial_data 
  DROP COLUMN IF EXISTS variance_gbp;

ALTER TABLE financial_data 
  ADD COLUMN variance_gbp numeric GENERATED ALWAYS AS (year_end_2023 - year_end_2022) STORED;
