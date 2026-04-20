import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardAnalytics from './pages/DashboardAnalytics';
import FinancialReports from './pages/FinancialReports';
import OnboardingPage from './pages/OnboardingPage';
import ReceivablesPage from './pages/ReceivablesPage';
import BankPage from './pages/BankPage';
import ReconciliationPage from './pages/ReconciliationPage';
import CovenantMonitoringPage from './pages/CovenantMonitoringPage';
import GeneralLedgerPage from './pages/GeneralLedgerPage';
import AccountsPayablePage from './pages/AccountsPayablePage';
import StandardReportingPacksPage from './pages/StandardReportingPacksPage';
import CustomReportingPacksPage from './pages/CustomReportingPacksPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardAnalytics />;
      case 'reports':
        return <FinancialReports />;
      case 'ledger':
        return <GeneralLedgerPage />;
      case 'receivables':
        return <ReceivablesPage />;
      case 'accounts':
        return <AccountsPayablePage />;
      case 'bank':
        return <BankPage />;
      case 'standard-packs':
        return <StandardReportingPacksPage />;
      case 'custom-packs':
        return <CustomReportingPacksPage />;
      case 'reconciliation':
        return <ReconciliationPage />;
      case 'covenant':
        return <CovenantMonitoringPage />;
      case 'settings':
        return <SettingsPage />;
      case 'onboarding':
        return <OnboardingPage />;
      default:
        return (
          <div className="p-8">
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
              <p className="text-gray-600">This section is under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 ml-64">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-600">
                Company: <span className="font-medium text-gray-900">Demo Corp Ltd</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentPage('onboarding')}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Setup Guide
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Connect Data
              </button>
            </div>
          </div>
        </header>
        <main className="min-h-[calc(100vh-73px)] bg-gray-50">{renderPage()}</main>
      </div>
    </div>
  );
}

export default App;
