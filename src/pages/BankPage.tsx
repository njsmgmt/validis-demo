import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BankTransaction } from '../lib/types';
import LineChart from '../components/LineChart';
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function BankPage() {
  const [transactions, setTransactions] = useState<BankTransaction[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [transactionsResult, timeSeriesResult] = await Promise.all([
      supabase.from('bank_transactions').select('*').order('transaction_date', { ascending: false }),
      supabase.from('time_series_data').select('*').order('date'),
    ]);

    if (transactionsResult.data) {
      setTransactions(transactionsResult.data);
    }

    if (timeSeriesResult.data) {
      setTimeSeriesData(timeSeriesResult.data);
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

  const filteredTransactions = filterStatus === 'all'
    ? transactions
    : transactions.filter(t => t.reconciliation_status === filterStatus);

  const totalDeposits = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netBalance = totalDeposits - totalWithdrawals;

  const unreconciledCount = transactions.filter(t => t.reconciliation_status === 'Unreconciled').length;

  const last30Days = transactions.filter(t => {
    const transDate = new Date(t.transaction_date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return transDate >= thirtyDaysAgo;
  });

  const deposits30Days = last30Days.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const withdrawals30Days = last30Days.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const currentBalance = timeSeriesData.length > 0 ? timeSeriesData[timeSeriesData.length - 1].bank_balance : 0;
  const previousBalance = timeSeriesData.length > 1 ? timeSeriesData[timeSeriesData.length - 2].bank_balance : 0;
  const balanceChange = previousBalance > 0 ? ((currentBalance - previousBalance) / previousBalance) * 100 : 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bank</h1>
        <p className="text-gray-600">Bank transactions and account management</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Current Balance</p>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-2">{formatCurrency(currentBalance)}</p>
          <div className="flex items-center gap-1 text-xs">
            {balanceChange >= 0 ? (
              <>
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-green-600 font-medium">{balanceChange.toFixed(1)}%</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-3 h-3 text-red-600" />
                <span className="text-red-600 font-medium">{Math.abs(balanceChange).toFixed(1)}%</span>
              </>
            )}
            <span className="text-gray-500">vs last month</span>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Deposits (30d)</p>
            <ArrowUpRight className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(deposits30Days)}</p>
          <p className="text-xs text-gray-500 mt-2">{last30Days.filter(t => t.amount > 0).length} transactions</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Withdrawals (30d)</p>
            <ArrowDownRight className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(withdrawals30Days)}</p>
          <p className="text-xs text-gray-500 mt-2">{last30Days.filter(t => t.amount < 0).length} transactions</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Unreconciled</p>
            <div className={`w-2 h-2 rounded-full ${unreconciledCount > 0 ? 'bg-amber-500' : 'bg-green-500'}`} />
          </div>
          <p className="text-2xl font-bold text-amber-600">{unreconciledCount}</p>
          <p className="text-xs text-gray-500 mt-2">require attention</p>
        </div>
      </div>

      <div className="mb-8">
        <LineChart
          data={timeSeriesData.map(d => ({
            date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            value: d.bank_balance,
          }))}
          label="Bank Balance Over Time (24 Months)"
          color="#3b82f6"
          formatValue={formatCurrency}
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Transactions</h2>
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-600">Filter by status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Transactions</option>
              <option value="Reconciled">Reconciled</option>
              <option value="Unreconciled">Unreconciled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(transaction.transaction_date)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{transaction.reference}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.transaction_type === 'Deposit'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.transaction_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.bank_account}</td>
                  <td className={`px-6 py-4 text-sm text-right font-medium ${
                    transaction.amount >= 0 ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.reconciliation_status === 'Reconciled'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {transaction.reconciliation_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
