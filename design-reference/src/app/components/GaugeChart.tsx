interface GaugeChartProps {
  value: number;
  cv: number;
  cs: number;
}

export function GaugeChart({ value, cv, cs }: GaugeChartProps) {
  const getColor = (score: number) => {
    if (score < 0.4) return '#1D9E75';
    if (score < 0.65) return '#BA7517';
    return '#E24B4A';
  };

  const color = getColor(value);
  const percentage = value * 100;
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.05)] flex flex-col items-center">
      <div className="relative w-[180px] h-[100px] mb-2">
        <svg width="180" height="100" className="overflow-visible">
          <path
            d={`M ${strokeWidth / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${180 - strokeWidth / 2} ${radius}`}
            fill="none"
            stroke="#F5F5F0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <path
            d={`M ${strokeWidth / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${180 - strokeWidth / 2} ${radius}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={-strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-[42px] font-semibold" style={{ color }}>
            {value.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="text-[14px] font-semibold text-[#1A1A1A] mb-1">Combined Score</div>
      <div className="text-[12px] text-[#6B7280]">
        Cv {cv.toFixed(2)} · Cs {cs.toFixed(2)}
      </div>
    </div>
  );
}
