import { useState } from 'react';
import { ConnectionScreen } from './components/ConnectionScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { AlertsScreen } from './components/AlertsScreen';
import { LogScreen } from './components/LogScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { LogDetailScreen } from './components/LogDetailScreen';
import { BottomNav } from './components/BottomNav';

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogDetail, setShowLogDetail] = useState(false);

  const handleConnect = (ip: string, mockMode: boolean) => {
    setIsConnected(true);
  };

  const handleSelectLog = (logId: number) => {
    setShowLogDetail(true);
  };

  const handleBackFromDetail = () => {
    setShowLogDetail(false);
  };

  if (!isConnected) {
    return (
      <div className="h-screen w-full bg-[#F5F5F0] flex items-center justify-center">
        <div className="w-full max-w-[393px] h-full">
          <ConnectionScreen onConnect={handleConnect} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#F5F5F0] flex items-center justify-center">
      <div className="w-full max-w-[393px] h-full bg-[#F5F5F0] relative shadow-2xl">
        {showLogDetail ? (
          <LogDetailScreen onBack={handleBackFromDetail} />
        ) : (
          <>
            {activeTab === 'dashboard' && <DashboardScreen />}
            {activeTab === 'alerts' && <AlertsScreen />}
            {activeTab === 'log' && <LogScreen onSelectLog={handleSelectLog} />}
            {activeTab === 'settings' && <SettingsScreen />}
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} alertCount={3} />
          </>
        )}
      </div>
    </div>
  );
}