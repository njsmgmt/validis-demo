import { useState } from 'react';
import { Settings, Building2, Bell, Shield, Database, HelpCircle, FileText, Info, Globe, Download, Lock, Zap } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('company');

  const tabs = [
    { id: 'company', label: 'Company Info', icon: Building2 },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'integrations', label: 'Integrations', icon: Zap },
    { id: 'legal', label: 'Legal & Compliance', icon: FileText },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Settings className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>
        <p className="text-gray-600">Manage your account, preferences, and system configuration</p>
      </div>

      <div className="flex gap-6">
        <div className="w-64 bg-white rounded-lg border border-gray-200 p-4 h-fit">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 space-y-6">
          {activeTab === 'company' && (
            <>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        defaultValue="Demo Corp Ltd"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                      <input
                        type="text"
                        defaultValue="12345678"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Retail - Clothing</option>
                        <option>Manufacturing</option>
                        <option>Technology</option>
                        <option>Professional Services</option>
                        <option>Healthcare</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fiscal Year End</label>
                      <input
                        type="text"
                        defaultValue="December 31"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                    <textarea
                      rows={3}
                      defaultValue="123 Commerce Street&#10;New York, NY 10013&#10;United States"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="pt-4">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'preferences' && (
            <>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Regional Settings</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>USD - US Dollar</option>
                        <option>GBP - British Pound</option>
                        <option>EUR - Euro</option>
                        <option>JPY - Japanese Yen</option>
                        <option>AUD - Australian Dollar</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                        <option>DD-MMM-YYYY</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>UTC-5 (Eastern Time)</option>
                        <option>UTC-8 (Pacific Time)</option>
                        <option>UTC-6 (Central Time)</option>
                        <option>UTC+0 (London)</option>
                        <option>UTC+1 (Paris)</option>
                        <option>UTC+9 (Tokyo)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number Format</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>1,234.56</option>
                        <option>1.234,56</option>
                        <option>1 234,56</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Display Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Compact View</p>
                      <p className="text-xs text-gray-500">Show more data in less space</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Dark Mode</p>
                      <p className="text-xs text-gray-500">Use dark color scheme</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Show Tooltips</p>
                      <p className="text-xs text-gray-500">Display helpful hints throughout the app</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Email Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Data Quality Alerts', desc: 'When data quality scores drop below threshold' },
                      { label: 'Covenant Breaches', desc: 'Immediate alerts for covenant violations' },
                      { label: 'Reconciliation Issues', desc: 'When reconciliation discrepancies are detected' },
                      { label: 'Weekly Summary', desc: 'Weekly digest of key financial metrics' },
                      { label: 'System Updates', desc: 'Product updates and new features' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Authentication & Security</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="pt-4">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Enhanced Security</p>
                      <p className="text-xs text-blue-700 mt-1">Enable two-factor authentication to add an extra layer of security to your account.</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">2FA Status</p>
                      <p className="text-xs text-gray-500">Currently disabled</p>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Current Session</p>
                      <p className="text-xs text-gray-500">Chrome on MacOS - New York, US</p>
                      <p className="text-xs text-gray-400 mt-1">Active now</p>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'data' && (
            <>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Export</h2>
                <p className="text-sm text-gray-600 mb-4">Download your financial data in various formats</p>
                <div className="grid grid-cols-3 gap-4">
                  <button className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <Download className="w-6 h-6 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">Export to Excel</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <Download className="w-6 h-6 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">Export to CSV</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <Download className="w-6 h-6 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">Export to PDF</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Retention</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Archive Period</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Keep all data indefinitely</option>
                      <option>7 years (recommended for financial data)</option>
                      <option>5 years</option>
                      <option>3 years</option>
                    </select>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-900">Legal Requirements</p>
                      <p className="text-xs text-amber-700 mt-1">Most jurisdictions require financial records to be retained for at least 7 years.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Backup</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Automatic Backups</p>
                      <p className="text-xs text-gray-500">Daily backups enabled</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="pt-2">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Create Backup Now
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'integrations' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Connected Integrations</h2>
              <p className="text-sm text-gray-600 mb-6">Connect your accounting software and other business tools</p>
              <div className="space-y-3">
                {[
                  { name: 'QuickBooks Online', status: 'connected', color: 'green' },
                  { name: 'Xero', status: 'not connected', color: 'gray' },
                  { name: 'Sage Intacct', status: 'not connected', color: 'gray' },
                  { name: 'NetSuite', status: 'not connected', color: 'gray' },
                  { name: 'Excel / CSV Upload', status: 'available', color: 'blue' },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{integration.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{integration.status}</p>
                      </div>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        integration.status === 'connected'
                          ? 'bg-red-50 text-red-700 hover:bg-red-100'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'legal' && (
            <>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">End User License Agreement (EULA)</h2>
                    <p className="text-sm text-gray-600">Last updated: December 8, 2023</p>
                  </div>
                </div>

                <div className="prose prose-sm max-w-none">
                  <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">1. License Grant</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Subject to your compliance with this Agreement, Validis grants you a limited, non-exclusive, non-transferable,
                      revocable license to access and use the Validis platform solely for your internal business purposes.
                    </p>

                    <h3 className="text-sm font-bold text-gray-900 mb-3">2. Restrictions</h3>
                    <p className="text-sm text-gray-700 mb-2">You agree not to:</p>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-4">
                      <li>Reverse engineer, decompile, or disassemble the software</li>
                      <li>Remove or alter any proprietary notices or labels</li>
                      <li>Use the platform to violate any applicable laws or regulations</li>
                      <li>Interfere with or disrupt the integrity or performance of the platform</li>
                      <li>Attempt to gain unauthorized access to any systems or networks</li>
                    </ul>

                    <h3 className="text-sm font-bold text-gray-900 mb-3">3. Data Ownership and Privacy</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      You retain all rights, title, and interest in your financial data. Validis will process your data in accordance
                      with our Privacy Policy and applicable data protection laws. We implement industry-standard security measures to
                      protect your data.
                    </p>

                    <h3 className="text-sm font-bold text-gray-900 mb-3">4. Service Availability</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      While we strive for 99.9% uptime, we do not guarantee uninterrupted service. We reserve the right to perform
                      scheduled maintenance and updates. We will provide reasonable notice for planned downtime.
                    </p>

                    <h3 className="text-sm font-bold text-gray-900 mb-3">5. Intellectual Property</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      The platform, including all software, content, and materials, is the exclusive property of Validis and is
                      protected by copyright, trademark, and other intellectual property laws.
                    </p>

                    <h3 className="text-sm font-bold text-gray-900 mb-3">6. Warranty Disclaimer</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. VALIDIS DISCLAIMS ALL WARRANTIES, EXPRESS OR
                      IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                    </p>

                    <h3 className="text-sm font-bold text-gray-900 mb-3">7. Limitation of Liability</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW, VALIDIS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                      CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE PLATFORM.
                    </p>

                    <h3 className="text-sm font-bold text-gray-900 mb-3">8. Termination</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Either party may terminate this Agreement at any time. Upon termination, your license to use the platform will
                      immediately cease. You may export your data within 30 days of termination.
                    </p>

                    <h3 className="text-sm font-bold text-gray-900 mb-3">9. Governing Law</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      This Agreement shall be governed by and construed in accordance with the laws of the State of New York, without
                      regard to its conflict of law provisions.
                    </p>

                    <h3 className="text-sm font-bold text-gray-900 mb-3">10. Contact Information</h3>
                    <p className="text-sm text-gray-700">
                      For questions about this EULA, please contact us at legal@validis.com
                    </p>
                  </div>

                  <div className="mt-6 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="accept-eula"
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="accept-eula" className="text-sm text-gray-700">
                      I have read and agree to the End User License Agreement
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Legal Documents</h2>
                <div className="space-y-3">
                  {[
                    { title: 'Terms of Service', desc: 'General terms and conditions for using Validis' },
                    { title: 'Privacy Policy', desc: 'How we collect, use, and protect your data' },
                    { title: 'Data Processing Agreement', desc: 'GDPR-compliant data processing terms' },
                    { title: 'Cookie Policy', desc: 'Information about cookies and tracking' },
                    { title: 'Acceptable Use Policy', desc: 'Guidelines for appropriate platform use' },
                  ].map((doc) => (
                    <div key={doc.title} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.title}</p>
                        <p className="text-xs text-gray-500">{doc.desc}</p>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance & Certifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg text-center">
                    <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">SOC 2 Type II</p>
                    <p className="text-xs text-gray-500 mt-1">Certified</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg text-center">
                    <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">GDPR Compliant</p>
                    <p className="text-xs text-gray-500 mt-1">EU Data Protection</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg text-center">
                    <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">ISO 27001</p>
                    <p className="text-xs text-gray-500 mt-1">Information Security</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg text-center">
                    <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">PCI DSS</p>
                    <p className="text-xs text-gray-500 mt-1">Payment Security</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'support' && (
            <>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Support Resources</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-start gap-3 p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
                    <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Help Center</p>
                      <p className="text-xs text-gray-500 mt-1">Browse articles and guides</p>
                    </div>
                  </button>
                  <button className="flex items-start gap-3 p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
                    <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Documentation</p>
                      <p className="text-xs text-gray-500 mt-1">Technical documentation</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="How can we help you?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your issue or question..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Send Message
                  </button>
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-2">Support Hours</p>
                  <p className="text-xs text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p className="text-xs text-gray-600">Email: support@validis.com</p>
                  <p className="text-xs text-gray-600">Phone: +1 (212) 555-0123</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">System Information</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Platform Version</span>
                    <span className="font-medium text-gray-900">v2.4.1</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Environment</span>
                    <span className="font-medium text-gray-900">Production</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Last Login</span>
                    <span className="font-medium text-gray-900">Dec 8, 2023 at 10:30 AM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Account Created</span>
                    <span className="font-medium text-gray-900">Jan 15, 2023</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">API Status</span>
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="font-medium text-gray-900">Operational</span>
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
