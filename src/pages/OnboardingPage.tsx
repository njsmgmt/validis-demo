import { Search, Building2, User, CheckCircle2, ArrowRight, Database, FileText, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function OnboardingPage() {
  const [journeyStep, setJourneyStep] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<{ name: string; color: string } | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [currentDataType, setCurrentDataType] = useState('');

  const steps = [
    { number: 1, label: 'Select', active: currentStep >= 1 },
    { number: 2, label: 'Share', active: currentStep >= 2 },
    { number: 3, label: 'Done', active: currentStep >= 3 },
  ];

  const accountingPackages = [
    { name: 'QuickBooks', color: 'bg-green-500' },
    { name: 'Sage50', color: 'bg-emerald-600' },
    { name: 'Xero', color: 'bg-blue-500' },
    { name: 'NetSuite', color: 'bg-orange-500' },
    { name: 'SAP', color: 'bg-blue-600' },
    { name: 'Oracle Financials', color: 'bg-red-600' },
    { name: 'Microsoft Dynamics', color: 'bg-blue-700' },
    { name: 'FreshBooks', color: 'bg-green-600' },
    { name: 'Wave', color: 'bg-teal-500' },
    { name: 'Zoho Books', color: 'bg-yellow-600' },
    { name: 'MYOB', color: 'bg-red-500' },
    { name: 'Kashoo', color: 'bg-purple-500' },
    { name: 'KashFlow', color: 'bg-pink-500' },
    { name: 'Clearbooks', color: 'bg-indigo-500' },
    { name: 'FreeAgent', color: 'bg-cyan-500' },
    { name: 'QuickFile', color: 'bg-lime-600' },
    { name: 'Pandle', color: 'bg-amber-500' },
    { name: 'Sage Business Cloud', color: 'bg-emerald-700' },
    { name: 'AccountEdge', color: 'bg-slate-600' },
    { name: 'Infor SunSystems', color: 'bg-orange-600' },
    { name: 'Odoo', color: 'bg-purple-600' },
    { name: 'Acumatica', color: 'bg-blue-800' },
    { name: 'Deltek', color: 'bg-teal-600' },
    { name: 'FinancialForce', color: 'bg-red-700' },
    { name: 'Unit4', color: 'bg-green-700' },
    { name: 'Workday Financial', color: 'bg-yellow-700' },
    { name: 'Epicor', color: 'bg-indigo-600' },
    { name: 'BlackLine', color: 'bg-gray-700' },
    { name: 'Prophix', color: 'bg-cyan-600' },
    { name: 'Adaptive Insights', color: 'bg-lime-700' },
    { name: 'Intacct', color: 'bg-orange-700' },
    { name: 'Multiview', color: 'bg-pink-600' },
    { name: 'FinancialEdge', color: 'bg-emerald-800' },
    { name: 'Abila MIP', color: 'bg-blue-900' },
    { name: 'AccuFund', color: 'bg-slate-700' },
    { name: 'PeopleSoft', color: 'bg-red-800' },
    { name: 'JD Edwards', color: 'bg-green-800' },
    { name: 'Sage Intacct', color: 'bg-emerald-900' },
    { name: 'Ramco', color: 'bg-teal-700' },
    { name: 'IFS Applications', color: 'bg-blue-500' },
    { name: 'Dynamics GP', color: 'bg-blue-600' },
    { name: 'Dynamics NAV', color: 'bg-blue-700' },
    { name: 'Dynamics AX', color: 'bg-blue-800' },
    { name: 'Dynamics 365 BC', color: 'bg-blue-900' },
    { name: 'AccountMate', color: 'bg-green-900' },
    { name: 'MoneyWorks', color: 'bg-yellow-800' },
    { name: 'BQE Core', color: 'bg-purple-700' },
    { name: 'Blackbaud', color: 'bg-slate-800' },
    { name: 'Aplos', color: 'bg-cyan-700' },
    { name: 'PowerChurch', color: 'bg-indigo-700' },
    { name: 'Shelby', color: 'bg-pink-700' },
    { name: 'ACS Technologies', color: 'bg-red-900' },
    { name: 'Cougar Mountain', color: 'bg-amber-600' },
    { name: 'Denali', color: 'bg-lime-800' },
    { name: 'Financial Edge NXT', color: 'bg-emerald-600' },
    { name: 'Realm', color: 'bg-teal-800' },
    { name: 'ParishSOFT', color: 'bg-orange-800' },
    { name: 'Church Windows', color: 'bg-sky-600' },
    { name: 'IconCMO', color: 'bg-violet-600' },
    { name: 'Araize FastFund', color: 'bg-fuchsia-600' },
  ];

  const filteredPackages = searchQuery
    ? accountingPackages.filter(pkg => pkg.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : accountingPackages;

  const dataTypes = [
    { label: 'Financial Statements', icon: FileText },
    { label: 'General Ledger', icon: Database },
    { label: 'Accounts Payable', icon: FileText },
    { label: 'Accounts Receivable', icon: FileText },
    { label: 'Bank Transactions', icon: BarChart3 },
    { label: 'Invoice Data', icon: FileText },
  ];

  useEffect(() => {
    if (isExtracting) {
      let progress = 0;
      let dataIndex = 0;

      const interval = setInterval(() => {
        progress += 2;
        setExtractionProgress(progress);

        if (progress % 17 === 0 && dataIndex < dataTypes.length) {
          setCurrentDataType(dataTypes[dataIndex].label);
          dataIndex++;
        }

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExtracting(false);
            setCurrentStep(3);
            setJourneyStep(1);
          }, 500);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isExtracting]);

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center justify-center gap-8 mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                    step.active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.number}
                  </div>
                  <span className={`text-sm font-medium ${
                    step.active ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-24 h-0.5 bg-gray-200 mx-4 mt-[-20px]"></div>
                )}
              </div>
            ))}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Setup Guide
          </h1>
          <p className="text-gray-600 text-center">
            Connect your accounting software to unlock powerful financial insights
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-8 border border-blue-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Bank-Led Journey</h2>

            <div className="flex gap-2 mb-6 flex-wrap">
              <button
                onClick={() => {
                  setJourneyStep(0);
                  setSelectedPackage(null);
                  setIsAuthenticating(false);
                  setShowAllPackages(false);
                  setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  journeyStep === 0 ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                Authenticate
              </button>
              <button
                onClick={() => setJourneyStep(1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  journeyStep === 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                Bank Benefits
              </button>
              <button
                onClick={() => setJourneyStep(2)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  journeyStep === 2 ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                Borrower Benefits
              </button>
              {selectedPackage && (
                <div className="ml-auto flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-700">Connected to {selectedPackage.name}</span>
                </div>
              )}
            </div>

            {journeyStep === 0 && (
              <div className="bg-white rounded-lg p-6 min-h-[400px]">
                {!selectedPackage ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Select Your Accounting Package</h3>
                    <p className="text-sm text-gray-600 mb-6 text-center">
                      Choose the accounting software you use to begin the authentication process.
                    </p>

                    {!showAllPackages ? (
                      <>
                        <div className="max-h-[300px] overflow-y-auto">
                          <div className="grid grid-cols-3 gap-3">
                            {accountingPackages.slice(0, 12).map((pkg) => (
                              <button
                                key={pkg.name}
                                onClick={() => setSelectedPackage(pkg)}
                                className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-center group"
                              >
                                <div className={`w-12 h-12 ${pkg.color} rounded-lg mx-auto mb-2 flex items-center justify-center`}>
                                  <span className="text-white font-bold text-sm">
                                    {pkg.name.substring(0, 2).toUpperCase()}
                                  </span>
                                </div>
                                <p className="text-xs font-medium text-gray-700 group-hover:text-blue-600">{pkg.name}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 text-center">
                          <button
                            onClick={() => setShowAllPackages(true)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Or view all {accountingPackages.length} packages
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-4">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="text"
                              placeholder="Search packages..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div className="max-h-[280px] overflow-y-auto">
                          <div className="grid grid-cols-4 gap-2">
                            {filteredPackages.map((pkg) => (
                              <button
                                key={pkg.name}
                                onClick={() => {
                                  setSelectedPackage(pkg);
                                  setShowAllPackages(false);
                                  setSearchQuery('');
                                }}
                                className="p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-center group"
                              >
                                <div className={`w-10 h-10 ${pkg.color} rounded-lg mx-auto mb-1 flex items-center justify-center`}>
                                  <span className="text-white font-bold text-xs">
                                    {pkg.name.substring(0, 2).toUpperCase()}
                                  </span>
                                </div>
                                <p className="text-xs font-medium text-gray-700 group-hover:text-blue-600 truncate">{pkg.name}</p>
                              </button>
                            ))}
                          </div>
                          {filteredPackages.length === 0 && (
                            <p className="text-center text-gray-500 text-sm py-8">No packages found</p>
                          )}
                        </div>
                        <div className="mt-4 text-center">
                          <button
                            onClick={() => {
                              setShowAllPackages(false);
                              setSearchQuery('');
                            }}
                            className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                          >
                            Show less
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : !isAuthenticating ? (
                  <div>
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-4 mb-4">
                        <div className={`w-16 h-16 ${selectedPackage.color} rounded-lg flex items-center justify-center transition-all`}>
                          <span className="text-white font-bold text-xl">
                            {selectedPackage.name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <ArrowRight className="w-6 h-6 text-gray-400" />
                        <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect {selectedPackage.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        You'll be redirected to {selectedPackage.name} to securely authenticate your account.
                      </p>
                      <button
                        onClick={() => setSelectedPackage(null)}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Change package
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">What happens next:</h4>
                      <ul className="space-y-1 text-xs text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">1.</span>
                          <span>Redirect to {selectedPackage.name} login page</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">2.</span>
                          <span>Login with your {selectedPackage.name} credentials</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">3.</span>
                          <span>Grant permission for secure data access</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">4.</span>
                          <span>Return to complete the connection</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          setIsAuthenticating(true);
                          setTimeout(() => {
                            setIsAuthenticating(false);
                            setCurrentStep(2);
                            setIsExtracting(true);
                            setExtractionProgress(0);
                          }, 2000);
                        }}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                      >
                        Continue to {selectedPackage.name}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Authenticating...</h3>
                    <p className="text-sm text-gray-600 text-center">
                      Connecting to {selectedPackage.name}. Please wait...
                    </p>
                    <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200 max-w-md">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">Secure OAuth Connection</p>
                          <p className="text-xs text-gray-600">
                            All data is encrypted and securely transmitted. We never store your {selectedPackage.name} credentials.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isExtracting && selectedPackage && (
              <div className="bg-white rounded-lg p-8 min-h-[500px] flex flex-col items-center justify-center">
                <div className="text-center max-w-2xl w-full">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Extracting & Standardizing Data</h3>
                  <p className="text-gray-600 mb-8">
                    Securely connecting to {selectedPackage.name} and processing your financial data
                  </p>

                  <div className="relative mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-14 h-14 ${selectedPackage.color} rounded-lg flex items-center justify-center`}>
                          <span className="text-white font-bold text-lg">
                            {selectedPackage.name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-900">{selectedPackage.name}</p>
                          <p className="text-xs text-gray-500">Source System</p>
                        </div>
                      </div>

                      <div className="flex-1 mx-6 relative">
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ease-out"
                            style={{ width: `${extractionProgress}%` }}
                          ></div>
                        </div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                          <div className="animate-pulse">
                            <Database className="w-8 h-8 text-blue-600" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">Validis</p>
                          <p className="text-xs text-gray-500">Standardized Format</p>
                        </div>
                        <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center mb-2">
                      <div className="bg-gray-50 rounded-full px-6 py-2 border border-gray-200">
                        <p className="text-sm font-medium text-gray-700">{extractionProgress}% Complete</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-100">
                    <div className="grid grid-cols-3 gap-4">
                      {dataTypes.map((dataType, index) => {
                        const Icon = dataType.icon;
                        const isActive = currentDataType === dataType.label;
                        const isPast = dataTypes.findIndex(dt => dt.label === currentDataType) > index;

                        return (
                          <div
                            key={dataType.label}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                              isActive
                                ? 'bg-blue-100 border-2 border-blue-400 shadow-md scale-105'
                                : isPast
                                ? 'bg-green-50 border-2 border-green-300'
                                : 'bg-white border border-gray-200 opacity-50'
                            }`}
                          >
                            <Icon className={`w-5 h-5 flex-shrink-0 ${
                              isActive
                                ? 'text-blue-600 animate-pulse'
                                : isPast
                                ? 'text-green-600'
                                : 'text-gray-400'
                            }`} />
                            <span className={`text-xs font-medium ${
                              isActive
                                ? 'text-blue-900'
                                : isPast
                                ? 'text-green-900'
                                : 'text-gray-600'
                            }`}>
                              {dataType.label}
                            </span>
                            {isPast && (
                              <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {currentDataType ? `Processing ${currentDataType}...` : 'Initializing extraction...'}
                        </p>
                        <p className="text-xs text-gray-600">
                          Converting data to standardized format and applying quality checks
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {journeyStep === 1 && !isExtracting && (
              <div className="bg-white rounded-lg p-6 min-h-[400px]">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-8 h-8 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">What the Bank Gets</h3>
                </div>
                <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">3+ years of real-time borrower financials + interim</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Invoice-level detail</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Aged receivables, Receivables ledger control, Receivables movements, Detailed aged receivables</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Key financial ratios (debt-to-equity, debt-to-assets...etc)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Deep insight into the real-time health of borrowers</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Online application reduced</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm text-gray-700">Automation potential for...</p>
                      <div className="ml-4 mt-1 space-y-1">
                        <p className="text-xs text-gray-600">○ Early warning alerts</p>
                        <p className="text-xs text-gray-600">○ Financial monitoring</p>
                        <p className="text-xs text-gray-600 ml-4">■ Covenant</p>
                        <p className="text-xs text-gray-600 ml-4">■ Operational</p>
                        <p className="text-xs text-gray-600 ml-4">■ Logistical</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Automated refreshes; Annual, Quarterly, Monthly, Bi-weekly...etc.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">No time collecting financials</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Proven average 85%+ SME connector coverage</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Proven average 7% drop-off rates</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Proven average 2% failed uploads</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Proven average 52% cost saving</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setJourneyStep(2)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                  >
                    Next: See Borrower Benefits
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {journeyStep === 2 && !isExtracting && (
              <div className="bg-white rounded-lg p-6 min-h-[400px]">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-8 h-8 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">What the Borrower Gets</h3>
                </div>
                <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Faster access to capital</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Reduced risk, more robust credit decisions</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">More timely and accurate credit line increases</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Higher line assignments</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">No time spent sending or collecting financials</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Refreshes (annual, quarterly, monthly, bi-weekly...etc.)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Business or cash flow insights</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => {
                      setJourneyStep(0);
                      setSelectedPackage(null);
                      setIsAuthenticating(false);
                      setShowAllPackages(false);
                      setSearchQuery('');
                      setCurrentStep(1);
                      setIsExtracting(false);
                      setExtractionProgress(0);
                    }}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}
