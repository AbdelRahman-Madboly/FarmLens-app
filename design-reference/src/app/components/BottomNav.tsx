import { Home, AlertTriangle, FileText, Settings } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  alertCount?: number;
}

export function BottomNav({ activeTab, onTabChange, alertCount = 0 }: BottomNavProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'log', label: 'Log', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[rgba(0,0,0,0.05)] max-w-[393px] mx-auto">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center gap-1 flex-1 relative"
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={isActive ? 'text-[#1D9E75]' : 'text-[#6B7280]'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {tab.id === 'alerts' && alertCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-[#E24B4A] text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                    {alertCount}
                  </div>
                )}
              </div>
              <span
                className={`text-[10px] ${
                  isActive ? 'text-[#1D9E75] font-semibold' : 'text-[#6B7280]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
