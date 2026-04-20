/*
  # Add Invoice and Receivables Data for Clothing Retailer
  
  This migration adds realistic data for:
  
  1. Invoices
    - Customer invoices for clothing retailers (wholesale and retail clients)
    - Mix of paid, unpaid, partial, and overdue invoices
    - Various aging buckets
    - Realistic amounts for medium-sized retailer
  
  2. Receivables Movements
    - Invoice creation and payment activities
    - Timeline of customer transactions
  
  3. Receivables Ledger Control
    - Aging analysis by customer
    - DSO (Days Sales Outstanding) metrics
    - Total outstanding and overdue amounts
  
  4. Reconciliation Items
    - Bank to ledger reconciliation items
    - Variances and pending items
*/

-- Clear existing receivables data
DELETE FROM invoices;
DELETE FROM receivables_movements;
DELETE FROM receivables_ledger;
DELETE FROM reconciliation_items;

-- Insert Invoices for Clothing Retailer Customers
INSERT INTO invoices (invoice_number, customer_name, customer_id, invoice_date, due_date, amount, amount_paid, status) VALUES
-- Paid invoices
('INV-2023-001', 'Fashion Boutique LLC', 'CUST-001', '2023-10-15', '2023-11-14', 12450.00, 12450.00, 'Paid'),
('INV-2023-002', 'TrendSetters Co', 'CUST-002', '2023-10-20', '2023-11-19', 15680.00, 15680.00, 'Paid'),
('INV-2023-003', 'Style Maven Inc', 'CUST-003', '2023-10-25', '2023-11-24', 18950.00, 18950.00, 'Paid'),
('INV-2023-004', 'Urban Wear Stores', 'CUST-004', '2023-11-01', '2023-12-01', 22340.00, 22340.00, 'Paid'),
('INV-2023-005', 'Chic Collections', 'CUST-005', '2023-11-05', '2023-12-05', 19875.00, 19875.00, 'Paid'),

-- Current (not yet due)
('INV-2023-020', 'Fashion Forward Inc', 'CUST-011', '2023-11-20', '2023-12-20', 16720.00, 0.00, 'Outstanding'),
('INV-2023-021', 'Retail Dynamics LLC', 'CUST-012', '2023-11-25', '2023-12-25', 24560.00, 0.00, 'Outstanding'),
('INV-2023-022', 'Style Emporium', 'CUST-013', '2023-11-28', '2023-12-28', 17890.00, 0.00, 'Outstanding'),
('INV-2023-023', 'Modern Trends Co', 'CUST-014', '2023-12-01', '2023-12-31', 14670.00, 0.00, 'Outstanding'),
('INV-2023-024', 'Boutique Central', 'CUST-015', '2023-12-05', '2024-01-04', 21340.00, 0.00, 'Outstanding'),

-- 1-30 Days Overdue
('INV-2023-015', 'Downtown Fashion Hub', 'CUST-016', '2023-10-25', '2023-11-24', 18650.00, 0.00, 'Overdue'),
('INV-2023-016', 'Elite Wardrobe Co', 'CUST-017', '2023-11-01', '2023-12-01', 15890.00, 0.00, 'Overdue'),

-- 31-60 Days Overdue
('INV-2023-012', 'Fashion District LLC', 'CUST-021', '2023-09-28', '2023-10-28', 22400.00, 0.00, 'Overdue'),
('INV-2023-013', 'Trendy Apparel Group', 'CUST-022', '2023-10-05', '2023-11-04', 19250.00, 0.00, 'Overdue'),

-- 61-90 Days Overdue
('INV-2023-009', 'Style Solutions Inc', 'CUST-023', '2023-09-10', '2023-10-10', 16780.00, 0.00, 'Overdue'),

-- 90+ Days Overdue
('INV-2023-006', 'Vintage Threads Co', 'CUST-024', '2023-08-15', '2023-09-14', 12890.00, 0.00, 'Overdue'),
('INV-2023-007', 'Classic Wear Ltd', 'CUST-025', '2023-08-22', '2023-09-21', 14560.00, 0.00, 'Overdue'),

-- Partial payments
('INV-2023-018', 'Metropolitan Fashion', 'CUST-018', '2023-11-08', '2023-12-08', 20450.00, 10000.00, 'Partial'),
('INV-2023-019', 'Uptown Boutiques', 'CUST-019', '2023-11-12', '2023-12-12', 18920.00, 8000.00, 'Partial');

-- Receivables Movements (Recent activity)
INSERT INTO receivables_movements (movement_date, customer_id, movement_type, description, reference, amount) VALUES
('2023-12-07', 'CUST-001', 'Invoice', 'Fashion Boutique LLC - Invoice INV-2023-001', 'INV-2023-001', 12450.00),
('2023-12-07', 'CUST-001', 'Payment', 'Payment received for INV-2023-001', 'PMT-5489', -12450.00),
('2023-12-05', 'CUST-002', 'Invoice', 'TrendSetters Co - Invoice INV-2023-002', 'INV-2023-002', 15680.00),
('2023-12-05', 'CUST-002', 'Payment', 'Payment received for INV-2023-002', 'PMT-5488', -15680.00),
('2023-12-03', 'CUST-003', 'Invoice', 'Style Maven Inc - Invoice INV-2023-003', 'INV-2023-003', 18950.00),
('2023-12-03', 'CUST-003', 'Payment', 'Payment received for INV-2023-003', 'PMT-5487', -18950.00),
('2023-12-02', 'CUST-004', 'Invoice', 'Urban Wear Stores - Invoice INV-2023-004', 'INV-2023-004', 22340.00),
('2023-12-02', 'CUST-004', 'Payment', 'Payment received for INV-2023-004', 'PMT-5486', -22340.00),
('2023-11-30', 'CUST-005', 'Invoice', 'Chic Collections - Invoice INV-2023-005', 'INV-2023-005', 19875.00),
('2023-11-30', 'CUST-005', 'Payment', 'Payment received for INV-2023-005', 'PMT-5485', -19875.00),
('2023-11-28', 'CUST-018', 'Invoice', 'Metropolitan Fashion - Invoice INV-2023-018', 'INV-2023-018', 20450.00),
('2023-11-30', 'CUST-018', 'Payment', 'Partial payment for INV-2023-018', 'PMT-5401', -10000.00),
('2023-11-28', 'CUST-019', 'Invoice', 'Uptown Boutiques - Invoice INV-2023-019', 'INV-2023-019', 18920.00),
('2023-12-01', 'CUST-019', 'Payment', 'Partial payment for INV-2023-019', 'PMT-5410', -8000.00),
('2023-11-20', 'CUST-011', 'Invoice', 'Fashion Forward Inc - Invoice INV-2023-020', 'INV-2023-020', 16720.00),
('2023-11-25', 'CUST-012', 'Invoice', 'Retail Dynamics LLC - Invoice INV-2023-021', 'INV-2023-021', 24560.00),
('2023-11-28', 'CUST-013', 'Invoice', 'Style Emporium - Invoice INV-2023-022', 'INV-2023-022', 17890.00),
('2023-12-01', 'CUST-014', 'Invoice', 'Modern Trends Co - Invoice INV-2023-023', 'INV-2023-023', 14670.00),
('2023-12-05', 'CUST-015', 'Invoice', 'Boutique Central - Invoice INV-2023-024', 'INV-2023-024', 21340.00);

-- Receivables Ledger Control (Aging Analysis by Customer)
INSERT INTO receivables_ledger (customer_name, customer_id, current_amt, thirty_days, sixty_days, ninety_plus_days, total_outstanding, total_overdue, invoice_count, days_sales_outstanding) VALUES
('Fashion Forward Inc', 'CUST-011', 16720.00, 0.00, 0.00, 0.00, 16720.00, 0.00, 1, 17),
('Retail Dynamics LLC', 'CUST-012', 24560.00, 0.00, 0.00, 0.00, 24560.00, 0.00, 1, 12),
('Style Emporium', 'CUST-013', 17890.00, 0.00, 0.00, 0.00, 17890.00, 0.00, 1, 9),
('Modern Trends Co', 'CUST-014', 14670.00, 0.00, 0.00, 0.00, 14670.00, 0.00, 1, 6),
('Boutique Central', 'CUST-015', 21340.00, 0.00, 0.00, 0.00, 21340.00, 0.00, 1, 2),
('Downtown Fashion Hub', 'CUST-016', 0.00, 18650.00, 0.00, 0.00, 18650.00, 18650.00, 1, 43),
('Elite Wardrobe Co', 'CUST-017', 0.00, 15890.00, 0.00, 0.00, 15890.00, 15890.00, 1, 36),
('Fashion District LLC', 'CUST-021', 0.00, 0.00, 22400.00, 0.00, 22400.00, 22400.00, 1, 70),
('Trendy Apparel Group', 'CUST-022', 0.00, 0.00, 19250.00, 0.00, 19250.00, 19250.00, 1, 63),
('Style Solutions Inc', 'CUST-023', 0.00, 0.00, 0.00, 16780.00, 16780.00, 16780.00, 1, 88),
('Vintage Threads Co', 'CUST-024', 0.00, 0.00, 0.00, 12890.00, 12890.00, 12890.00, 1, 113),
('Classic Wear Ltd', 'CUST-025', 0.00, 0.00, 0.00, 14560.00, 14560.00, 14560.00, 1, 106),
('Metropolitan Fashion', 'CUST-018', 10450.00, 0.00, 0.00, 0.00, 10450.00, 0.00, 1, 29),
('Uptown Boutiques', 'CUST-019', 10920.00, 0.00, 0.00, 0.00, 10920.00, 0.00, 1, 25);

-- Reconciliation Items using actual bank transaction references
DO $$
DECLARE
  t1_id uuid; t2_id uuid; t3_id uuid; t4_id uuid; t5_id uuid;
  t6_id uuid; t7_id uuid; t8_id uuid; t9_id uuid; t10_id uuid;
BEGIN
  SELECT id INTO t1_id FROM bank_transactions WHERE reference = 'PMT-5489' LIMIT 1;
  SELECT id INTO t2_id FROM bank_transactions WHERE reference = 'SHOP-8821' LIMIT 1;
  SELECT id INTO t3_id FROM bank_transactions WHERE reference = 'INV-7823' LIMIT 1;
  SELECT id INTO t4_id FROM bank_transactions WHERE reference = 'PAY-1223' LIMIT 1;
  SELECT id INTO t5_id FROM bank_transactions WHERE reference = 'PMT-5488' LIMIT 1;
  SELECT id INTO t6_id FROM bank_transactions WHERE reference = 'RENT-DEC' LIMIT 1;
  SELECT id INTO t7_id FROM bank_transactions WHERE reference = 'WEB-3341' LIMIT 1;
  SELECT id INTO t8_id FROM bank_transactions WHERE reference = 'UTIL-5123' LIMIT 1;
  SELECT id INTO t9_id FROM bank_transactions WHERE reference = 'PMT-5487' LIMIT 1;
  SELECT id INTO t10_id FROM bank_transactions WHERE reference = 'INV-8934' LIMIT 1;

  IF t1_id IS NOT NULL THEN
    INSERT INTO reconciliation_items (bank_transaction_id, ledger_reference, variance, reconciliation_date, status, notes)
    VALUES (t1_id, 'INV-2023-001', 0.00, '2023-12-07', 'Reconciled', 'Perfect match');
  END IF;

  IF t2_id IS NOT NULL THEN
    INSERT INTO reconciliation_items (bank_transaction_id, ledger_reference, variance, reconciliation_date, status, notes)
    VALUES (t2_id, 'WEB-SALES-001', 0.00, '2023-12-07', 'Reconciled', 'Online sales reconciled');
  END IF;

  IF t3_id IS NOT NULL THEN
    INSERT INTO reconciliation_items (bank_transaction_id, ledger_reference, variance, reconciliation_date, status, notes)
    VALUES (t3_id, 'PO-7823', 0.00, '2023-12-06', 'Reconciled', 'Supplier payment matched');
  END IF;

  IF t4_id IS NOT NULL THEN
    INSERT INTO reconciliation_items (bank_transaction_id, ledger_reference, variance, reconciliation_date, status, notes)
    VALUES (t4_id, 'PAYROLL-DEC', 0.00, '2023-12-06', 'Reconciled', 'Payroll processed');
  END IF;

  IF t5_id IS NOT NULL THEN
    INSERT INTO reconciliation_items (bank_transaction_id, ledger_reference, variance, reconciliation_date, status, notes)
    VALUES (t5_id, 'INV-2023-002', 0.00, '2023-12-05', 'Reconciled', 'Customer payment matched');
  END IF;

  IF t6_id IS NOT NULL THEN
    INSERT INTO reconciliation_items (bank_transaction_id, ledger_reference, variance, reconciliation_date, status, notes)
    VALUES (t6_id, 'LEASE-001', 0.00, '2023-12-05', 'Reconciled', 'Rent payment confirmed');
  END IF;

  IF t7_id IS NOT NULL THEN
    INSERT INTO reconciliation_items (bank_transaction_id, ledger_reference, variance, reconciliation_date, status, notes)
    VALUES (t7_id, 'WEB-SALES-002', 125.50, NULL, 'Pending', 'Minor variance - investigating');
  END IF;

  IF t8_id IS NOT NULL THEN
    INSERT INTO reconciliation_items (bank_transaction_id, ledger_reference, variance, reconciliation_date, status, notes)
    VALUES (t8_id, 'UTIL-DEC', 0.00, '2023-12-04', 'Reconciled', 'Utility bill matched');
  END IF;

  IF t9_id IS NOT NULL THEN
    INSERT INTO reconciliation_items (bank_transaction_id, ledger_reference, variance, reconciliation_date, status, notes)
    VALUES (t9_id, 'INV-2023-003', 0.00, '2023-12-03', 'Reconciled', 'Payment received and matched');
  END IF;

  IF t10_id IS NOT NULL THEN
    INSERT INTO reconciliation_items (bank_transaction_id, ledger_reference, variance, reconciliation_date, status, notes)
    VALUES (t10_id, 'PO-8934', 0.00, '2023-12-03', 'Reconciled', 'Supplier payment confirmed');
  END IF;
END $$;
