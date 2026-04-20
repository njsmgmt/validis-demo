import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { JournalEntry, JournalLine, AccountBalance, ChartOfAccount } from '../lib/types';
import { Book, FileText, List, TrendingUp, TrendingDown } from 'lucide-react';

interface JournalEntryWithLines extends JournalEntry {
  lines?: JournalLine[];
}

export default function GeneralLedgerPage() {
  const [activeTab, setActiveTab] = useState('journal');
  const [journalEntries, setJournalEntries] = useState<JournalEntryWithLines[]>([]);
  const [accountBalances, setAccountBalances] = useState<AccountBalance[]>([]);
  const [chartOfAccounts, setChartOfAccounts] = useState<ChartOfAccount[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [journalLines, setJournalLines] = useState<JournalLine[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [journalResult, balancesResult, chartResult, linesResult] = await Promise.all([
      supabase.from('journal_entries').select('*').order('entry_date', { ascending: false }),
      supabase.from('account_balances').select('*').order('account_code'),
      supabase.from('chart_of_accounts').select('*').order('account_code'),
      supabase.from('journal_lines').select('*'),
    ]);

    if (journalResult.data) setJournalEntries(journalResult.data);
    if (balancesResult.data) setAccountBalances(balancesResult.data);
    if (chartResult.data) setChartOfAccounts(chartResult.data);
    if (linesResult.data) setJournalLines(linesResult.data);
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

  const totalDebits = accountBalances.reduce((sum, acc) => sum + acc.debit_total, 0);
  const totalCredits = accountBalances.reduce((sum, acc) => sum + acc.credit_total, 0);
  const netMovement = totalDebits - totalCredits;

  const tabs = [
    { id: 'journal', label: 'Journal Entries', icon: FileText },
    { id: 'balances', label: 'Account Balances', icon: TrendingUp },
    { id: 'chart', label: 'Chart of Accounts', icon: List },
  ];

  const getEntryLines = (entryId: string) => {
    return journalLines.filter(line => line.journal_entry_id === entryId);
  };

  const toggleEntry = (entryId: string) => {
    setSelectedEntry(selectedEntry === entryId ? null : entryId);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Book className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">General Ledger</h1>
        </div>
        <p className="text-gray-600">Complete accounting records and journal entries</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Total Debits</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalDebits)}</p>
          <p className="text-xs text-gray-500 mt-2">Current period</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Total Credits</p>
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCredits)}</p>
          <p className="text-xs text-gray-500 mt-2">Current period</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">Active Accounts</p>
            <Book className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{chartOfAccounts.filter(a => a.is_active).length}</p>
          <p className="text-xs text-gray-500 mt-2">In chart of accounts</p>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-8">
        <nav className="flex gap-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {activeTab === 'journal' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Journal Entries</h2>
            <p className="text-sm text-gray-600 mt-1">Recent accounting transactions</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entry #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {journalEntries.map((entry) => {
                  const lines = getEntryLines(entry.id);
                  const isExpanded = selectedEntry === entry.id;

                  return (
                    <>
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-blue-600">{entry.entry_number}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(entry.entry_date)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{entry.description}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            entry.entry_type === 'Sales'
                              ? 'bg-green-100 text-green-800'
                              : entry.entry_type === 'Purchase'
                              ? 'bg-blue-100 text-blue-800'
                              : entry.entry_type === 'Payroll'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {entry.entry_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">{entry.reference}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            {entry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => toggleEntry(entry.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            {isExpanded ? 'Hide' : 'View'} Lines
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr>
                          <td colSpan={7} className="px-6 py-4 bg-gray-50">
                            <div className="space-y-2">
                              <p className="text-sm font-semibold text-gray-700 mb-3">Journal Lines:</p>
                              <table className="w-full text-sm">
                                <thead className="bg-white border-b border-gray-200">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Account Code</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Account Name</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Debit</th>
                                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Credit</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {lines.map((line) => (
                                    <tr key={line.id} className="bg-white">
                                      <td className="px-4 py-2 text-gray-900 font-mono">{line.account_code}</td>
                                      <td className="px-4 py-2 text-gray-900">{line.account_name}</td>
                                      <td className="px-4 py-2 text-gray-600">{line.description}</td>
                                      <td className="px-4 py-2 text-right font-medium text-green-700">
                                        {line.debit > 0 ? formatCurrency(line.debit) : '-'}
                                      </td>
                                      <td className="px-4 py-2 text-right font-medium text-red-700">
                                        {line.credit > 0 ? formatCurrency(line.credit) : '-'}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'balances' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Account Balances</h2>
            <p className="text-sm text-gray-600 mt-1">Current period: December 2023</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Opening</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Debits</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Credits</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Closing</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accountBalances.map((balance) => (
                  <tr key={balance.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono font-medium text-gray-900">{balance.account_code}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{balance.account_name}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        balance.account_type === 'Asset'
                          ? 'bg-blue-100 text-blue-800'
                          : balance.account_type === 'Liability'
                          ? 'bg-red-100 text-red-800'
                          : balance.account_type === 'Equity'
                          ? 'bg-purple-100 text-purple-800'
                          : balance.account_type === 'Revenue'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {balance.account_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(balance.opening_balance)}</td>
                    <td className="px-6 py-4 text-sm text-right font-medium text-green-700">{formatCurrency(balance.debit_total)}</td>
                    <td className="px-6 py-4 text-sm text-right font-medium text-red-700">{formatCurrency(balance.credit_total)}</td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">{formatCurrency(balance.closing_balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'chart' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Chart of Accounts</h2>
            <p className="text-sm text-gray-600 mt-1">Master list of all GL accounts</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sub-Category</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {chartOfAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono font-bold text-gray-900">{account.account_code}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{account.account_name}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        account.account_type === 'Asset'
                          ? 'bg-blue-100 text-blue-800'
                          : account.account_type === 'Liability'
                          ? 'bg-red-100 text-red-800'
                          : account.account_type === 'Equity'
                          ? 'bg-purple-100 text-purple-800'
                          : account.account_type === 'Revenue'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {account.account_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{account.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{account.sub_category || '-'}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        account.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {account.is_active ? 'Active' : 'Inactive'}
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
