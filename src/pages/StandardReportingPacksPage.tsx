import { FileText } from 'lucide-react';

export default function StandardReportingPacksPage() {
  const reports = [
    { name: 'AP Report', description: 'Accounts Payable aging and analysis', category: 'Operations' },
    { name: 'AR Report', description: 'Accounts Receivable aging and analysis', category: 'Operations' },
    { name: 'Cash Report', description: 'Cash flow and bank reconciliation', category: 'Treasury' },
    { name: 'Financials', description: 'Complete financial statements and reports', category: 'Financial' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Standard Reporting Packs</h1>
        <p className="text-gray-600">Core financial reports and statements</p>
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
              <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
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
