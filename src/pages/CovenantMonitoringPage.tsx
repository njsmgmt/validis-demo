import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CovenantData } from '../lib/types';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

export default function CovenantMonitoringPage() {
  const [covenants, setCovenants] = useState<CovenantData[]>([]);

  useEffect(() => {
    loadCovenants();
  }, []);

  async function loadCovenants() {
    const { data } = await supabase
      .from('covenant_data')
      .select('*')
      .order('measurement_date', { ascending: false });

    if (data) {
      setCovenants(data);
    }
  }

  const formatValue = (value: number, metricType: string) => {
    if (metricType === 'Cash Flow' || metricType === 'Liquidity') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(value);
    }
    return value.toFixed(2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const onTrackCount = covenants.filter(c => c.status === 'On Track').length;
  const atRiskCount = covenants.filter(c => c.status === 'At Risk').length;
  const breachedCount = covenants.filter(c => c.status === 'Breached').length;

  const groupedCovenants = covenants.reduce((acc, covenant) => {
    if (!acc[covenant.metric_type]) {
      acc[covenant.metric_type] = [];
    }
    acc[covenant.metric_type].push(covenant);
    return acc;
  }, {} as Record<string, CovenantData[]>);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Covenant Monitoring</h1>
        <p className="text-gray-600">Track compliance with financial covenants and targets</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Covenants</p>
          <p className="text-3xl font-bold text-gray-900">{covenants.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">On Track</p>
          <p className="text-3xl font-bold text-green-600">{onTrackCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">At Risk</p>
          <p className="text-3xl font-bold text-amber-600">{atRiskCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Breached</p>
          <p className="text-3xl font-bold text-red-600">{breachedCount}</p>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedCovenants).map(([metricType, metricCovenants]) => (
          <div key={metricType} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">{metricType}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Covenant Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Measurement Period</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Target Value</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actual Value</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Variance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Measurement Date</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {metricCovenants.map((covenant) => {
                    const isPositiveVariance = covenant.variance_percent >= 0;
                    const isCashOrLiquidity = covenant.metric_type === 'Cash Flow' || covenant.metric_type === 'Liquidity';
                    const showGreenForPositive = isCashOrLiquidity || covenant.covenant_name.includes('Coverage');

                    return (
                      <tr key={covenant.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{covenant.covenant_name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{covenant.measurement_period}</td>
                        <td className="px-6 py-4 text-sm text-right text-gray-900">
                          {formatValue(covenant.target_value, covenant.metric_type)}
                        </td>
                        <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">
                          {formatValue(covenant.actual_value, covenant.metric_type)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                            showGreenForPositive && isPositiveVariance
                              ? 'bg-green-50 text-green-700'
                              : showGreenForPositive && !isPositiveVariance
                              ? 'bg-red-50 text-red-700'
                              : !showGreenForPositive && isPositiveVariance
                              ? 'bg-red-50 text-red-700'
                              : 'bg-green-50 text-green-700'
                          }`}>
                            {isPositiveVariance ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {Math.abs(covenant.variance_percent)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(covenant.measurement_date)}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                            covenant.status === 'On Track'
                              ? 'bg-green-100 text-green-800'
                              : covenant.status === 'At Risk'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {covenant.status === 'At Risk' && <AlertTriangle className="w-3 h-3" />}
                            {covenant.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
