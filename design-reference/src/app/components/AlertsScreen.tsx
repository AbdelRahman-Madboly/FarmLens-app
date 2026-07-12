import { ScorePill } from './ScorePill';

interface Alert {
  id: number;
  detection: string;
  time: string;
  score: number;
  moisture: number;
  water: number;
}

export function AlertsScreen() {
  const alerts: Alert[] = [
    {
      id: 1,
      detection: 'Tomato — Late Blight',
      time: '14:30',
      score: 0.76,
      moisture: 18,
      water: 22,
    },
    {
      id: 2,
      detection: 'Strawberry — Leaf Scorch',
      time: '12:00',
      score: 0.68,
      moisture: 24,
      water: 31,
    },
    {
      id: 3,
      detection: 'Pepper — Bacterial Spot',
      time: '09:15',
      score: 0.71,
      moisture: 20,
      water: 18,
    },
  ];

  return (
    <div className="pb-20 overflow-y-auto h-full">
      {/* App Bar */}
      <div className="bg-white border-b border-[rgba(0,0,0,0.05)] px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <h1 className="text-[20px] font-semibold text-[#1A1A1A]">Alert Feed</h1>
          <div className="w-5 h-5 bg-[#E24B4A] text-white rounded-full flex items-center justify-center text-[11px] font-semibold">
            3
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="px-4 pt-4 space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-white rounded-xl p-4 border-l-4 border-[#E24B4A] border border-[rgba(0,0,0,0.05)] flex items-start gap-3"
          >
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-[#1A1A1A] mb-1">
                    {alert.detection}
                  </div>
                  <div className="text-[11px] text-[#6B7280]">{alert.time}</div>
                </div>
                <ScorePill score={alert.score} size="sm" />
              </div>
              <div className="text-[12px] text-[#6B7280]">
                💧 {alert.moisture}% · 🌊 {alert.water}%
              </div>
            </div>
            <div className="w-[42px] h-[32px] bg-[#F5F5F0] rounded-md flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
