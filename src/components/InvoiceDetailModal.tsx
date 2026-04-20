import { X } from 'lucide-react';
import { Invoice, InvoiceLine } from '../lib/types';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface InvoiceDetailModalProps {
  invoice: Invoice;
  onClose: () => void;
}

export default function InvoiceDetailModal({ invoice, onClose }: InvoiceDetailModalProps) {
  const [lines, setLines] = useState<InvoiceLine[]>([]);

  useEffect(() => {
    loadInvoiceLines();
  }, [invoice.id]);

  async function loadInvoiceLines() {
    const { data } = await supabase
      .from('invoice_lines')
      .select('*')
      .eq('invoice_id', invoice.id);

    if (data) {
      setLines(data);
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getDaysOverdue = () => {
    if (invoice.status === 'Paid') return 0;
    const today = new Date();
    const dueDate = new Date(invoice.due_date);
    if (today > dueDate) {
      return Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const daysOverdue = getDaysOverdue();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Invoice Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-4">Invoice Information</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-700">Invoice Number</dt>
                  <dd className="text-lg font-semibold text-gray-900">{invoice.invoice_number}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Customer</dt>
                  <dd className="text-sm text-gray-900">{invoice.customer_name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Customer ID</dt>
                  <dd className="text-sm text-gray-900">{invoice.customer_id}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-4">Payment Details</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-700">Invoice Date</dt>
                  <dd className="text-sm text-gray-900">{formatDate(invoice.invoice_date)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Due Date</dt>
                  <dd className="text-sm text-gray-900">{formatDate(invoice.due_date)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Status</dt>
                  <dd>
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
                      {daysOverdue > 0 && ` (${daysOverdue} days overdue)`}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Line Items</h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lines.map((line) => (
                    <tr key={line.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{line.description}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">{line.quantity}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">{formatCurrency(line.unit_price)}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{formatCurrency(line.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(invoice.amount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-medium text-green-700">{formatCurrency(invoice.amount_paid)}</span>
                </div>
                <div className="flex justify-between text-lg border-t border-gray-200 pt-2">
                  <span className="font-semibold text-gray-900">Amount Due:</span>
                  <span className="font-bold text-gray-900">{formatCurrency(invoice.amount - invoice.amount_paid)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
