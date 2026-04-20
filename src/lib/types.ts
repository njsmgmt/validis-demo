export interface Invoice {
  id: string;
  invoice_number: string;
  customer_name: string;
  customer_id: string;
  invoice_date: string;
  due_date: string;
  amount: number;
  amount_paid: number;
  status: string;
  created_at: string;
}

export interface InvoiceLine {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
  created_at: string;
}

export interface ReceivablesMovement {
  id: string;
  invoice_id: string;
  customer_id: string;
  movement_type: string;
  amount: number;
  movement_date: string;
  description: string;
  reference: string;
  created_at: string;
}

export interface ReceivablesLedger {
  id: string;
  customer_id: string;
  customer_name: string;
  total_outstanding: number;
  total_overdue: number;
  current_amt: number;
  thirty_days: number;
  sixty_days: number;
  ninety_plus_days: number;
  invoice_count: number;
  days_sales_outstanding: number;
  created_at: string;
}

export interface BankTransaction {
  id: string;
  transaction_date: string;
  description: string;
  amount: number;
  transaction_type: string;
  reference: string;
  bank_account: string;
  reconciliation_status: string;
  created_at: string;
}

export interface ReconciliationItem {
  id: string;
  bank_transaction_id: string;
  ledger_reference: string;
  reconciliation_date: string;
  status: string;
  variance: number;
  notes: string;
  created_at: string;
}

export interface CovenantData {
  id: string;
  covenant_name: string;
  metric_type: string;
  measurement_period: string;
  target_value: number;
  actual_value: number;
  status: string;
  variance_percent: number;
  measurement_date: string;
  created_at: string;
}

export interface ChartOfAccount {
  id: string;
  account_code: string;
  account_name: string;
  account_type: string;
  category: string;
  sub_category: string;
  is_active: boolean;
  created_at: string;
}

export interface JournalEntry {
  id: string;
  entry_number: string;
  entry_date: string;
  description: string;
  entry_type: string;
  reference: string;
  status: string;
  created_at: string;
}

export interface JournalLine {
  id: string;
  journal_entry_id: string;
  account_code: string;
  account_name: string;
  debit: number;
  credit: number;
  description: string;
  created_at: string;
}

export interface AccountBalance {
  id: string;
  account_code: string;
  account_name: string;
  account_type: string;
  opening_balance: number;
  debit_total: number;
  credit_total: number;
  closing_balance: number;
  period_start: string;
  period_end: string;
  created_at: string;
}

export interface VendorInvoice {
  id: string;
  invoice_number: string;
  vendor_name: string;
  vendor_id: string;
  invoice_date: string;
  due_date: string;
  amount: number;
  amount_paid: number;
  status: string;
  payment_terms: string;
  description: string;
  created_at: string;
}

export interface VendorLedger {
  id: string;
  vendor_id: string;
  vendor_name: string;
  current_amt: number;
  thirty_days: number;
  sixty_days: number;
  ninety_plus_days: number;
  total_outstanding: number;
  total_overdue: number;
  invoice_count: number;
  days_payable_outstanding: number;
  created_at: string;
}

export interface FinancialRatio {
  id: string;
  ratio_name: string;
  ratio_category: string;
  current_value: number;
  prior_year_value: number;
  industry_benchmark: number;
  variance_percent: number;
  description: string;
  display_order: number;
  created_at: string;
}

export interface IncomeStatement {
  id: string;
  line_item: string;
  category: string;
  sub_category: string;
  current_year: number;
  prior_year: number;
  variance_amount: number;
  variance_percent: number;
  is_total: boolean;
  is_subtotal: boolean;
  display_order: number;
  created_at: string;
}

export interface CashFlowStatement {
  id: string;
  line_item: string;
  category: string;
  sub_category: string;
  current_year: number;
  prior_year: number;
  variance_amount: number;
  variance_percent: number;
  is_total: boolean;
  is_subtotal: boolean;
  display_order: number;
  created_at: string;
}
