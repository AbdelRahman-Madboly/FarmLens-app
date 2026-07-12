import { ScorePill } from './ScorePill';

interface LogEntry {
  id: number;
  date: string;
  time: string;
  detection: string;
  score: number;
  isAlert: boolean;
}

interface LogScreenProps {
  onSelectLog?: (logId: number) => void;
}

export function LogScreen({ onSelectLog }: LogScreenProps) {
  const logs: LogEntry[] = [
    {
      id: 1,
      date: 'Apr 5',
      time: '14:30',
      detection: 'Tomato — Late Blight',
      score: 0.76,
      isAlert: true,
    },
    {
      id: 2,
      date: 'Apr 5',
      time: '14:00',
      detection: 'No Detection',
      score: 0.12,
      isAlert: false,
    },
    {
      id: 3,
      date: 'Apr 5',
      time: '13:30',
      detection: 'Tomato — Healthy',
      score: 0.08,
      isAlert: false,
    },
    {
      id: 4,
      date: 'Apr 5',
      time: '13:00',
      detection: 'Strawberry — Leaf Scorch',
      score: 0.68,
      isAlert: true,
    },
    {
      id: 5,
      date: 'Apr 5',
      time: '12:30',
      detection: 'No Detection',
      score: 0.09,
      isAlert: false,
    },
  ];

  return (
    <div className="pb-20 overflow-y-auto h-full">
      {/* App Bar */}
      <div className="bg-white border-b border-[rgba(0,0,0,0.05)] px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-[20px] font-semibold text-[#1A1A1A]">Traceability Log</h1>
        <button className="text-[14px] text-[#1D9E75] font-semibold">Export</button>
      </div>

      {/* Summary Strip */}
      <div className="bg-[#1D9E75] bg-opacity-10 mx-4 mt-4 px-4 py-3 rounded-lg text-[12px] text-[#1D9E75] font-semibold">
        168 cycles · 3 alerts · Last 2m ago
      </div>

      {/* Log List */}
      <div className="mt-4">
        {logs.map((log) => (
          <button
            key={log.id}
            onClick={() => onSelectLog?.(log.id)}
            className="w-full px-4 py-3 border-b border-[rgba(0,0,0,0.05)] hover:bg-[#F5F5F0] transition-colors flex items-center gap-3 text-left"
          >
            <div className="w-16 text-[11px] text-[#6B7280]">
              <div>{log.date}</div>
              <div>{log.time}</div>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <span className="text-[13px] text-[#1A1A1A]">{log.detection}</span>
              {log.isAlert && <div className="w-1.5 h-1.5 bg-[#E24B4A] rounded-full" />}
            </div>
            <ScorePill score={log.score} size="sm" />
          </button>
        ))}
      </div>
    </div>
  );
}
