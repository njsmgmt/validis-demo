import { useState, useEffect } from 'react';
import { supabase, FinancialData } from '../lib/supabase';
import { FinancialRatio, IncomeStatement, CashFlowStatement } from '../lib/types';
import FinancialDataTable from '../components/FinancialDataTable';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function FinancialReports() {
  const [activeTab, setActiveTab] = useState('balance-sheet');
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [financialRatios, setFinancialRatios] = useState<FinancialRatio[]>([]);
  const [incomeStatement, setIncomeStatement] = useState<IncomeStatement[]>([]);
  const [cashFlowStatement, setCashFlowStatement] = useState<CashFlowStatement[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [balanceSheetResult, ratiosResult, incomeResult, cashFlowResult] = await Promise.all([
      supabase.from('financial_data').select('*').order('display_order'),
      supabase.from('financial_ratios').select('*').order('display_order'),
      supabase.from('income_statement').select('*').order('display_order'),
      supabase.from('cash_flow_statement').select('*').order('display_order'),
    ]);

    if (balanceSheetResult.data) setFinancialData(balanceSheetResult.data);
    if (ratiosResult.data) setFinancialRatios(ratiosResult.data);
    if (incomeResult.data) setIncomeStatement(incomeResult.data);
    if (cashFlowResult.data) setCashFlowStatement(cashFlowResult.data);
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatRatio = (value: number, decimals: number = 2) => {
    return value.toFixed(decimals);
  };

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const tabs = [
    { id: 'snapshot', label: 'Financial Snapshot' },
    { id: 'income', label: 'Income Statement (standard)' },
    { id: 'balance-sheet', label: 'Balance Sheet (standard)' },
    { id: 'cashflow', label: 'Cash Flow Statement' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Reports</h1>
        <p className="text-gray-600">Detailed financial statements and analysis</p>
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

      {activeTab === 'balance-sheet' && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Balance Sheet</h2>
              <p className="text-sm text-gray-600 mt-1">Comparative analysis for Year End December 2023 vs 2022</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Export Report
            </button>
          </div>
          <FinancialDataTable data={financialData} />
        </div>
      )}

      {activeTab === 'snapshot' && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Financial Snapshot</h2>
              <p className="text-sm text-gray-600 mt-1">20 Key Financial Ratios - Year End December 2023</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Export Report
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {financialRatios.map((ratio) => {
              const vsIndustry = ratio.current_value - ratio.industry_benchmark;
              const isGoodVsIndustry = ratio.ratio_category === 'Leverage' ? vsIndustry < 0 : vsIndustry > 0;

              return (
                <div key={ratio.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                        {ratio.ratio_category}
                      </h3>
                      <p className="text-xs text-gray-400">{ratio.ratio_name}</p>
                    </div>
                    {ratio.variance_percent >= 0 ? (
                      <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-900">
                      {ratio.ratio_name.includes('%') || ratio.ratio_name.includes('Margin')
                        ? `${formatRatio(ratio.current_value, 2)}%`
                        : formatRatio(ratio.current_value, 2)}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-sm font-semibold ${
                        ratio.variance_percent >= 0 ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {formatPercent(ratio.variance_percent)}
                      </span>
                      <span className="text-xs text-gray-500">vs prior year</span>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-gray-100 pt-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">2022</span>
                      <span className="text-gray-700 font-medium">
                        {ratio.ratio_name.includes('%') || ratio.ratio_name.includes('Margin')
                          ? `${formatRatio(ratio.prior_year_value, 2)}%`
                          : formatRatio(ratio.prior_year_value, 2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Industry Avg</span>
                      <span className="text-gray-700 font-medium">
                        {ratio.ratio_name.includes('%') || ratio.ratio_name.includes('Margin')
                          ? `${formatRatio(ratio.industry_benchmark, 2)}%`
                          : formatRatio(ratio.industry_benchmark, 2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className={`inline-flex w-full justify-center px-2 py-1 text-xs font-medium rounded ${
                      isGoodVsIndustry
                        ? 'bg-green-50 text-green-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {isGoodVsIndustry ? 'Above Average' : 'Below Average'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'income' && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Income Statement</h2>
              <p className="text-sm text-gray-600 mt-1">Comparative analysis for Year End December 2023 vs 2022</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Export Report
            </button>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Line Item</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">2023</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">2022</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Variance ($)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Variance (%)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {incomeStatement.map((line) => (
                  <tr
                    key={line.id}
                    className={`${
                      line.is_total ? 'bg-blue-50 font-bold' :
                      line.is_subtotal ? 'bg-gray-50 font-semibold' :
                      'hover:bg-gray-50'
                    }`}
                  >
                    <td className={`px-6 py-4 text-sm ${
                      line.is_total || line.is_subtotal ? 'font-bold text-gray-900' :
                      line.sub_category ? 'pl-12 text-gray-700' : 'text-gray-900'
                    }`}>
                      {line.line_item}
                    </td>
                    <td className={`px-6 py-4 text-sm text-right ${
                      line.is_total || line.is_subtotal ? 'font-bold text-gray-900' : 'text-gray-700'
                    }`}>
                      {formatCurrency(line.current_year)}
                    </td>
                    <td className={`px-6 py-4 text-sm text-right ${
                      line.is_total || line.is_subtotal ? 'font-bold text-gray-900' : 'text-gray-600'
                    }`}>
                      {formatCurrency(line.prior_year)}
                    </td>
                    <td className={`px-6 py-4 text-sm text-right ${
                      line.variance_amount >= 0 ? 'text-green-700' : 'text-red-700'
                    } ${line.is_total || line.is_subtotal ? 'font-bold' : 'font-medium'}`}>
                      {formatCurrency(line.variance_amount)}
                    </td>
                    <td className={`px-6 py-4 text-sm text-right ${
                      line.variance_percent >= 0 ? 'text-green-700' : 'text-red-700'
                    } ${line.is_total || line.is_subtotal ? 'font-bold' : 'font-medium'}`}>
                      {formatPercent(line.variance_percent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'cashflow' && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Cash Flow Statement</h2>
              <p className="text-sm text-gray-600 mt-1">Comparative analysis for Year End December 2023 vs 2022</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Export Report
            </button>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Line Item</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">2023</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">2022</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Variance ($)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Variance (%)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cashFlowStatement.map((line) => (
                  <tr
                    key={line.id}
                    className={`${
                      line.is_total ? 'bg-blue-50 font-bold' :
                      line.is_subtotal ? 'bg-gray-50 font-semibold' :
                      'hover:bg-gray-50'
                    }`}
                  >
                    <td className={`px-6 py-4 text-sm ${
                      line.is_total || line.is_subtotal ? 'font-bold text-gray-900' :
                      line.sub_category ? 'pl-12 text-gray-700' : 'text-gray-900'
                    }`}>
                      {line.line_item}
                    </td>
                    <td className={`px-6 py-4 text-sm text-right ${
                      line.current_year >= 0 ? 'text-gray-700' : 'text-red-700'
                    } ${line.is_total || line.is_subtotal ? 'font-bold' : ''}`}>
                      {formatCurrency(line.current_year)}
                    </td>
                    <td className={`px-6 py-4 text-sm text-right ${
                      line.prior_year >= 0 ? 'text-gray-600' : 'text-red-600'
                    } ${line.is_total || line.is_subtotal ? 'font-bold' : ''}`}>
                      {formatCurrency(line.prior_year)}
                    </td>
                    <td className={`px-6 py-4 text-sm text-right ${
                      line.variance_amount >= 0 ? 'text-green-700' : 'text-red-700'
                    } ${line.is_total || line.is_subtotal ? 'font-bold' : 'font-medium'}`}>
                      {formatCurrency(line.variance_amount)}
                    </td>
                    <td className={`px-6 py-4 text-sm text-right ${
                      line.variance_percent >= 0 ? 'text-green-700' : 'text-red-700'
                    } ${line.is_total || line.is_subtotal ? 'font-bold' : 'font-medium'}`}>
                      {line.variance_percent !== 0 ? formatPercent(line.variance_percent) : '-'}
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
