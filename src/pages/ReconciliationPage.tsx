import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ReconciliationItem, BankTransaction } from '../lib/types';

interface ReconciliationWithBank extends ReconciliationItem {
  bank_transaction?: BankTransaction;
}

export default function ReconciliationPage() {
  const [reconciliations, setReconciliations] = useState<ReconciliationWithBank[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadReconciliations();
  }, []);

  async function loadReconciliations() {
    const { data: reconData } = await supabase
      .from('reconciliation_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (reconData) {
      const bankTransactionIds = reconData
        .map(r => r.bank_transaction_id)
        .filter(Boolean);

      const { data: bankData } = await supabase
        .from('bank_transactions')
        .select('*')
        .in('id', bankTransactionIds);

      const bankMap = new Map(bankData?.map(b => [b.id, b]) || []);

      const enrichedData = reconData.map(recon => ({
        ...recon,
        bank_transaction: bankMap.get(recon.bank_transaction_id),
      }));

      setReconciliations(enrichedData);
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const filteredReconciliations = filterStatus === 'all'
    ? reconciliations
    : reconciliations.filter(r => r.status === filterStatus);

  const reconciledCount = reconciliations.filter(r => r.status === 'Reconciled').length;
  const pendingCount = reconciliations.filter(r => r.status === 'Pending').length;
  const totalVariance = reconciliations.reduce((sum, r) => sum + r.variance, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reconciliation</h1>
        <p className="text-gray-600">Bank reconciliation and variance management</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Items</p>
          <p className="text-3xl font-bold text-gray-900">{reconciliations.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Reconciled</p>
          <p className="text-3xl font-bold text-green-600">{reconciledCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Pending</p>
          <p className="text-3xl font-bold text-amber-600">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Variance</p>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalVariance)}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Reconciliation Items</h2>
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-600">Filter by status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Items</option>
              <option value="Reconciled">Reconciled</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bank Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bank Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ledger Reference</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Variance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reconciliation Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReconciliations.map((recon) => (
                <tr key={recon.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">
                    {recon.bank_transaction?.reference || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {recon.bank_transaction?.description || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-blue-600">{recon.ledger_reference}</td>
                  <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">
                    {recon.bank_transaction ? formatCurrency(recon.bank_transaction.amount) : '-'}
                  </td>
                  <td className={`px-6 py-4 text-sm text-right font-medium ${
                    recon.variance === 0 ? 'text-gray-900' : 'text-red-600'
                  }`}>
                    {formatCurrency(recon.variance)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(recon.reconciliation_date)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      recon.status === 'Reconciled'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {recon.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{recon.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
