import { BarChart3, FileText, Book, Settings, Users, CreditCard, Receipt, Landmark, FileStack, Package, CheckSquare, TrendingUp } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Financial Reports', icon: FileText },
    { id: 'ledger', label: 'General Ledger', icon: Book },
    { id: 'receivables', label: 'Receivable Ledger', icon: Receipt },
    { id: 'accounts', label: 'Accounts Payable', icon: CreditCard },
    { id: 'bank', label: 'Bank', icon: Landmark },
    { id: 'standard-packs', label: 'Standard Reporting Packs', icon: FileStack },
    { id: 'custom-packs', label: 'Custom Reporting Packs', icon: Package },
    { id: 'reconciliation', label: 'Reconciliation', icon: CheckSquare },
    { id: 'covenant', label: 'Covenant Monitoring', icon: TrendingUp },
    { id: 'team', label: 'Team Management', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg"></div>
          <span className="text-xl font-bold text-gray-900">Validis</span>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div>
            <p className="text-sm font-medium text-gray-900">Demo User</p>
            <p className="text-xs text-gray-500">demo@validis.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
