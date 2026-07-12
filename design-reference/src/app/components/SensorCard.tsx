interface SensorCardProps {
  title: string;
  value: string;
  status: string;
  statusColor: 'red' | 'amber' | 'green';
  percentage: number;
}

export function SensorCard({ title, value, status, statusColor, percentage }: SensorCardProps) {
  const colors = {
    red: '#E24B4A',
    amber: '#BA7517',
    green: '#1D9E75',
  };

  const color = colors[statusColor];

  return (
    <div className="bg-white rounded-xl p-4 border border-[rgba(0,0,0,0.05)]">
      <div className="text-[12px] text-[#6B7280] mb-1">{title}</div>
      <div className="text-[28px] font-semibold mb-2" style={{ color }}>
        {value}
      </div>
      <div className="w-full h-1 bg-[#F5F5F0] rounded-full mb-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <span
        className="text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block"
        style={{ backgroundColor: color, color: '#FFFFFF' }}
      >
        {status}
      </span>
    </div>
  );
}
