import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { VendorInvoice, VendorLedger } from '../lib/types';
import { CreditCard, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function AccountsPayablePage() {
  const [activeTab, setActiveTab] = useState('aged');
  const [vendorInvoices, setVendorInvoices] = useState<VendorInvoice[]>([]);
  const [vendorLedger, setVendorLedger] = useState<VendorLedger[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [invoicesResult, ledgerResult] = await Promise.all([
      supabase.from('vendor_invoices').select('*').order('invoice_date', { ascending: false }),
      supabase.from('vendor_ledger').select('*').order('total_outstanding', { ascending: false }),
    ]);

    if (invoicesResult.data) setVendorInvoices(invoicesResult.data);
    if (ledgerResult.data) setVendorLedger(ledgerResult.data);
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

  const getDaysOverdue = (invoice: VendorInvoice) => {
    if (invoice.status === 'Paid') return 0;
    const today = new Date();
    const dueDate = new Date(invoice.due_date);
    if (today > dueDate) {
      return Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const getAgingBucket = (invoice: VendorInvoice) => {
    const days = getDaysOverdue(invoice);
    if (invoice.status === 'Paid') return 'Paid';
    if (days === 0) return 'Current';
    if (days <= 30) return '1-30 Days';
    if (days <= 60) return '31-60 Days';
    if (days <= 90) return '61-90 Days';
    return '90+ Days';
  };

  const tabs = [
    { id: 'aged', label: 'Aged Payables' },
    { id: 'control', label: 'Vendor Ledger Control' },
  ];

  const totalOutstanding = vendorInvoices
    .filter(inv => inv.status !== 'Paid')
    .reduce((sum, inv) => sum + (inv.amount - inv.amount_paid), 0);

  const totalOverdue = vendorInvoices
    .filter(inv => getDaysOverdue(inv) > 0)
    .reduce((sum, inv) => sum + (inv.amount - inv.amount_paid), 0);

  const activeInvoices = vendorInvoices.filter(inv => inv.status !== 'Paid').length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <CreditCard className="w-8 h-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900">Accounts Payable</h1>
        </div>
        <p className="text-gray-600">Manage vendor invoices and payment obligations</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Total Outstanding</p>
            <AlertCircle className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalOutstanding)}</p>
          <p className="text-xs text-gray-500 mt-2">{activeInvoices} active invoices</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Total Overdue</p>
            <Clock className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(totalOverdue)}</p>
          <p className="text-xs text-gray-500 mt-2">Requires immediate attention</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Paid This Month</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(vendorInvoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0))}
          </p>
          <p className="text-xs text-gray-500 mt-2">{vendorInvoices.filter(inv => inv.status === 'Paid').length} invoices</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Active Vendors</p>
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{vendorLedger.length}</p>
          <p className="text-xs text-gray-500 mt-2">With outstanding balance</p>
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
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Aged Payables</h2>
            <p className="text-sm text-gray-600 mt-1">Vendor invoices by aging bucket</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Outstanding</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aging Bucket</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vendorInvoices.map((invoice) => {
                  const daysOverdue = getDaysOverdue(invoice);
                  const agingBucket = getAgingBucket(invoice);
                  const outstanding = invoice.amount - invoice.amount_paid;

                  return (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-blue-600">
                        {invoice.invoice_number}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{invoice.vendor_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{invoice.description}</td>
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'control' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Vendor Ledger Control</h2>
            <p className="text-sm text-gray-600 mt-1">Aging analysis by vendor</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Current</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">30 Days</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">60 Days</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">90+ Days</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Outstanding</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Overdue</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Invoice Count</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">DPO</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vendorLedger.map((ledger) => (
                  <tr key={ledger.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{ledger.vendor_name}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(ledger.current_amt)}</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(ledger.thirty_days)}</td>
                    <td className="px-6 py-4 text-sm text-right text-amber-700">{formatCurrency(ledger.sixty_days)}</td>
                    <td className="px-6 py-4 text-sm text-right text-red-700">{formatCurrency(ledger.ninety_plus_days)}</td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">{formatCurrency(ledger.total_outstanding)}</td>
                    <td className="px-6 py-4 text-sm text-right font-medium text-red-700">{formatCurrency(ledger.total_overdue)}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-900">{ledger.invoice_count}</td>
                    <td className="px-6 py-4 text-sm text-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        ledger.days_payable_outstanding <= 30
                          ? 'bg-green-100 text-green-800'
                          : ledger.days_payable_outstanding <= 60
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {ledger.days_payable_outstanding} days
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
