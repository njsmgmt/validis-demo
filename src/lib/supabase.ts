import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface FinancialData {
  id: string;
  category: string;
  sub_category: string;
  year_end_2023: number;
  year_end_2022: number;
  variance_gbp: number;
  variance_percent: number;
  financial_period: string;
  display_order: number;
}

export interface DashboardMetric {
  id: string;
  metric_name: string;
  value: number;
  change_percent: number;
  financial_period: string;
  metric_type: string;
  display_order: number;
}

export interface TimeSeriesData {
  id: string;
  date: string;
  bank_balance: number;
  debt_to_assets_ratio: number;
}

export interface QualityScore {
  id: string;
  type: string;
  test: string;
  score_2022: string;
  score_2021: string;
  score_2020: string;
  display_order: number;
}
