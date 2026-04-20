import { useState, useEffect } from 'react';
import { supabase, DashboardMetric, TimeSeriesData, QualityScore } from '../lib/supabase';
import { ExternalLink } from 'lucide-react';
import KPICard from '../components/KPICard';
import LineChart from '../components/LineChart';
import QualityScoreTable from '../components/QualityScoreTable';

export default function DashboardAnalytics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [overviewMetrics, setOverviewMetrics] = useState<DashboardMetric[]>([]);
  const [creditMetrics, setCreditMetrics] = useState<DashboardMetric[]>([]);
  const [liquidityMetrics, setLiquidityMetrics] = useState<DashboardMetric[]>([]);
  const [profitabilityMetrics, setProfitabilityMetrics] = useState<DashboardMetric[]>([]);
  const [efficiencyMetrics, setEfficiencyMetrics] = useState<DashboardMetric[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [qualityScores, setQualityScores] = useState<QualityScore[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [metricsResult, timeSeriesResult, qualityResult] = await Promise.all([
      supabase.from('dashboard_metrics').select('*').order('display_order'),
      supabase.from('time_series_data').select('*').order('date'),
      supabase.from('quality_score').select('*').order('display_order'),
    ]);

    if (metricsResult.data) {
      setOverviewMetrics(metricsResult.data.filter(m => m.metric_type === 'overview'));
      setCreditMetrics(metricsResult.data.filter(m => m.metric_type === 'credit'));
      setLiquidityMetrics(metricsResult.data.filter(m => m.metric_type === 'liquidity'));
      setProfitabilityMetrics(metricsResult.data.filter(m => m.metric_type === 'profitability'));
      setEfficiencyMetrics(metricsResult.data.filter(m => m.metric_type === 'efficiency'));
    }

    if (timeSeriesResult.data) {
      setTimeSeriesData(timeSeriesResult.data);
    }

    if (qualityResult.data) {
      setQualityScores(qualityResult.data);
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatRatio = (value: number) => {
    return value.toFixed(2);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'liquidity', label: 'Liquidity' },
    { id: 'profitability', label: 'Profitability' },
    { id: 'efficiency', label: 'Efficiency' },
    { id: 'credit', label: 'Credit Analysis' },
    { id: 'quality', label: 'Quality Score' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Analytics</h1>
        <p className="text-gray-600">Financial performance overview and key metrics</p>
      </div>

      <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Borrower Journey Process</h3>
            <p className="text-sm text-gray-600">View the complete Tier 1 bank loan process workflow</p>
          </div>
          <a
            href="https://www.canva.com/design/DAFR8Okn17s/gwt_opmIG9MtfDYUFJhGiA/view?utm_content=DAFR8Okn17s&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hdf36f1a906"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            View Diagram
            <ExternalLink className="w-4 h-4" />
          </a>
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

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewMetrics.map((metric) => (
              <KPICard
                key={metric.id}
                title={metric.metric_name}
                value={formatCurrency(metric.value)}
                change={metric.change_percent}
                period={metric.financial_period}
              />
            ))}
          </div>

          <LineChart
            data={timeSeriesData.map(d => ({
              date: d.date,
              value: d.bank_balance,
            }))}
            label="Bank Balance Over Time"
            color="#3b82f6"
            formatValue={formatCurrency}
          />
        </div>
      )}

      {activeTab === 'liquidity' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liquidityMetrics.map((metric) => (
              <KPICard
                key={metric.id}
                title={metric.metric_name}
                value={metric.metric_name === 'Working Capital' ? formatCurrency(metric.value) : formatRatio(metric.value)}
                change={metric.change_percent}
                period={metric.financial_period}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'profitability' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profitabilityMetrics.map((metric) => (
              <KPICard
                key={metric.id}
                title={metric.metric_name}
                value={formatRatio(metric.value)}
                change={metric.change_percent}
                period={metric.financial_period}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'efficiency' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {efficiencyMetrics.map((metric) => (
              <KPICard
                key={metric.id}
                title={metric.metric_name}
                value={metric.metric_name === 'Days Sales Outstanding' ? formatRatio(metric.value) : formatRatio(metric.value)}
                change={metric.change_percent}
                period={metric.financial_period}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'credit' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creditMetrics.map((metric) => (
              <KPICard
                key={metric.id}
                title={metric.metric_name}
                value={formatRatio(metric.value)}
                change={metric.change_percent}
                period={metric.financial_period}
              />
            ))}
          </div>

          <LineChart
            data={timeSeriesData.map(d => ({
              date: d.date,
              value: d.debt_to_assets_ratio,
            }))}
            label="Debt to Assets Ratio Over Time"
            color="#8b5cf6"
            formatValue={formatRatio}
          />
        </div>
      )}

      {activeTab === 'quality' && (
        <div>
          <QualityScoreTable data={qualityScores} />
        </div>
      )}
    </div>
  );
}
