import React from 'react';
import { FinancialData } from '../lib/supabase';

interface FinancialDataTableProps {
  data: FinancialData[];
}

export default function FinancialDataTable({ data }: FinancialDataTableProps) {
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, FinancialData[]>);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Line Item
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              2023
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              2022
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Variance ($)
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Variance (%)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.entries(groupedData).map(([category, items]) => (
            <React.Fragment key={category}>
              {items.map((item) => {
                  const isTotal = item.sub_category.toLowerCase().includes('total');
                  const isBold = isTotal || category === 'Total';

                  return (
                    <tr key={item.id} className={`${isBold ? 'bg-gray-50 font-semibold' : 'hover:bg-gray-50'}`}>
                      <td className={`px-6 py-4 text-sm text-gray-900 ${isBold ? 'font-bold' : ''}`}>
                        {item.sub_category}
                      </td>
                      <td className={`px-6 py-4 text-sm text-right text-gray-700 ${isBold ? 'font-bold' : ''}`}>
                        {formatCurrency(item.year_end_2023)}
                      </td>
                      <td className={`px-6 py-4 text-sm text-right text-gray-600 ${isBold ? 'font-bold' : ''}`}>
                        {formatCurrency(item.year_end_2022)}
                      </td>
                      <td className={`px-6 py-4 text-sm text-right ${
                        item.variance_gbp >= 0 ? 'text-green-700' : 'text-red-700'
                      } ${isBold ? 'font-bold' : 'font-medium'}`}>
                        {formatCurrency(item.variance_gbp)}
                      </td>
                      <td className={`px-6 py-4 text-sm text-right ${
                        item.variance_percent >= 0 ? 'text-green-700' : 'text-red-700'
                      } ${isBold ? 'font-bold' : 'font-medium'}`}>
                        {formatPercent(item.variance_percent)}
                      </td>
                    </tr>
                  );
                })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
