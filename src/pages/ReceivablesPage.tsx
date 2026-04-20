import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Invoice, ReceivablesMovement, ReceivablesLedger } from '../lib/types';
import InvoiceDetailModal from '../components/InvoiceDetailModal';
import { ArrowRight } from 'lucide-react';

export default function ReceivablesPage() {
  const [activeTab, setActiveTab] = useState('aged');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [movements, setMovements] = useState<ReceivablesMovement[]>([]);
  const [ledgerControl, setLedgerControl] = useState<ReceivablesLedger[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [invoicesResult, movementsResult, ledgerResult] = await Promise.all([
      supabase.from('invoices').select('*').order('invoice_date', { ascending: false }),
      supabase.from('receivables_movements').select('*').order('movement_date', { ascending: false }),
      supabase.from('receivables_ledger').select('*').order('total_outstanding', { ascending: false }),
    ]);

    if (invoicesResult.data) setInvoices(invoicesResult.data);
    if (movementsResult.data) setMovements(movementsResult.data);
    if (ledgerResult.data) setLedgerControl(ledgerResult.data);
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getDaysOverdue = (invoice: Invoice) => {
    if (invoice.status === 'Paid') return 0;
    const today = new Date();
    const dueDate = new Date(invoice.due_date);
    if (today > dueDate) {
      return Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const getAgingBucket = (invoice: Invoice) => {
    const days = getDaysOverdue(invoice);
    if (invoice.status === 'Paid') return 'Paid';
    if (days === 0) return 'Current';
    if (days <= 30) return '1-30 Days';
    if (days <= 60) return '31-60 Days';
    if (days <= 90) return '61-90 Days';
    return '90+ Days';
  };

  const tabs = [
    { id: 'aged', label: 'Aged Receivables' },
    { id: 'movements', label: 'Receivables Movements' },
    { id: 'control', label: 'Receivables Ledger Control' },
  ];

  const totalOutstanding = invoices
    .filter(inv => inv.status !== 'Paid')
    .reduce((sum, inv) => sum + (inv.amount - inv.amount_paid), 0);

  const totalOverdue = invoices
    .filter(inv => getDaysOverdue(inv) > 0)
    .reduce((sum, inv) => sum + (inv.amount - inv.amount_paid), 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Receivable Ledger</h1>
        <p className="text-gray-600">Manage customer invoices and receivables</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Outstanding</p>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalOutstanding)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Overdue</p>
          <p className="text-3xl font-bold text-red-600">{formatCurrency(totalOverdue)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Active Invoices</p>
          <p className="text-3xl font-bold text-gray-900">{invoices.filter(inv => inv.status !== 'Paid').length}</p>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-8">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'aged' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Outstanding</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aging Bucket</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((invoice) => {
                  const daysOverdue = getDaysOverdue(invoice);
                  const agingBucket = getAgingBucket(invoice);
                  const outstanding = invoice.amount - invoice.amount_paid;

                  return (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-blue-600">
                        {invoice.invoice_number}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{invoice.customer_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(invoice.invoice_date)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(invoice.due_date)}</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(invoice.amount)}</td>
                      <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">{formatCurrency(outstanding)}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          agingBucket === 'Paid'
                            ? 'bg-gray-100 text-gray-700'
                            : agingBucket === 'Current'
                            ? 'bg-green-100 text-green-800'
                            : agingBucket === '1-30 Days'
                            ? 'bg-blue-100 text-blue-800'
                            : agingBucket === '31-60 Days'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {agingBucket}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          invoice.status === 'Paid'
                            ? 'bg-green-100 text-green-800'
                            : invoice.status === 'Partial'
                            ? 'bg-amber-100 text-amber-800'
                            : daysOverdue > 0
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedInvoice(invoice)}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View <ArrowRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'movements' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {movements.map((movement) => (
                  <tr key={movement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(movement.movement_date)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{movement.customer_id}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        movement.movement_type === 'Invoice'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {movement.movement_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{movement.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{movement.reference}</td>
                    <td className={`px-6 py-4 text-sm text-right font-medium ${
                      movement.amount >= 0 ? 'text-blue-700' : 'text-green-700'
                    }`}>
                      {formatCurrency(movement.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'control' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Current</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">30 Days</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">60 Days</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">90+ Days</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Outstanding</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Overdue</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Invoice Count</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">DSO</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ledgerControl.map((ledger) => (
                  <tr key={ledger.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{ledger.customer_name}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(ledger.current_amt)}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(ledger.thirty_days)}</td>
                    <td className="px-6 py-4 text-sm text-right text-amber-700">{formatCurrency(ledger.sixty_days)}</td>
                    <td className="px-6 py-4 text-sm text-right text-red-700">{formatCurrency(ledger.ninety_plus_days)}</td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">{formatCurrency(ledger.total_outstanding)}</td>
                    <td className="px-6 py-4 text-sm text-right font-medium text-red-700">{formatCurrency(ledger.total_overdue)}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-900">{ledger.invoice_count}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-900">{ledger.days_sales_outstanding} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedInvoice && (
        <InvoiceDetailModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
}
