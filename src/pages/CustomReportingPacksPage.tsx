import { Activity } from 'lucide-react';

export default function CustomReportingPacksPage() {
  const reports = [
    { name: 'AP Report', description: 'Accounts Payable aging and analysis', category: 'Operations' },
    { name: 'AR Report', description: 'Accounts Receivable aging and analysis', category: 'Operations' },
    { name: 'Cash Report', description: 'Cash flow and bank reconciliation', category: 'Treasury' },
    { name: 'Engagement TB', description: 'Trial Balance for engagement purposes', category: 'Audit' },
    { name: 'Engagement TB Import Data', description: 'Trial Balance import template', category: 'Audit' },
    { name: 'Engagement Trial Balance Import', description: 'Detailed trial balance import report', category: 'Audit' },
    { name: 'Equity Report', description: 'Shareholder equity and capital changes', category: 'Equity' },
    { name: 'Inventory Reports', description: 'Stock levels, valuation, and turnover', category: 'Operations' },
    { name: 'Investments Reports', description: 'Portfolio performance and valuation', category: 'Treasury' },
    { name: 'Property Reports', description: 'Fixed assets and depreciation schedules', category: 'Assets' },
    { name: 'Tax Reports', description: 'Tax provision and compliance reports', category: 'Compliance' },
    { name: 'Budget vs Actual', description: 'Variance analysis and performance tracking', category: 'Planning' },
    { name: 'Consolidation Report', description: 'Multi-entity financial consolidation', category: 'Corporate' },
    { name: 'Covenant Compliance', description: 'Loan covenant monitoring and reporting', category: 'Compliance' },
    { name: 'Management Accounts', description: 'Internal management reporting pack', category: 'Management' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Custom Reporting Packs</h1>
        <p className="text-gray-600">Specialized reports for detailed analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <div
            key={report.name}
            className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <span className="inline-block px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded mb-2">
                  {report.category}
                </span>
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {report.name}
                </h3>
              </div>
              <Activity className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{report.description}</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                Generate Report →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
