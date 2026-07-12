interface ScorePillProps {
  score: number;
  size?: 'sm' | 'md';
}

export function ScorePill({ score, size = 'md' }: ScorePillProps) {
  const getColor = (score: number) => {
    if (score < 0.4) return '#1D9E75';
    if (score < 0.65) return '#BA7517';
    return '#E24B4A';
  };

  const color = getColor(score);
  const textSize = size === 'sm' ? 'text-[11px]' : 'text-[12px]';
  const padding = size === 'sm' ? 'px-2 py-0.5' : 'px-2.5 py-1';

  return (
    <span
      className={`${padding} ${textSize} font-semibold rounded-full inline-block`}
      style={{ backgroundColor: color, color: '#FFFFFF' }}
    >
      {score.toFixed(2)}
    </span>
  );
}
