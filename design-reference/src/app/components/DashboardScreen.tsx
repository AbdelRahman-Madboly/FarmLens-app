import { GaugeChart } from './GaugeChart';
import { SensorCard } from './SensorCard';
import { ScorePill } from './ScorePill';

export function DashboardScreen() {
  return (
    <div className="pb-20 overflow-y-auto h-full">
      {/* App Bar */}
      <div className="bg-white border-b border-[rgba(0,0,0,0.05)] px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-[20px] font-semibold text-[#1A1A1A]">FarmLens</h1>
        <div className="bg-[#1D9E75] bg-opacity-10 text-[#1D9E75] px-3 py-1 rounded-full text-[12px] font-semibold">
          FL-001
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-white border-b border-[rgba(0,0,0,0.05)] px-4 py-2 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#1D9E75] rounded-full" />
          <span className="text-[#1A1A1A]">Connected · 147ms</span>
        </div>
        <span className="text-[#6B7280]">2s ago</span>
      </div>

      {/* Alert Banner */}
      <div className="bg-[#FEF2F2] border-l-4 border-[#E24B4A] mx-4 mt-4 p-3 rounded-r-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[14px]">⚠</span>
          <span className="text-[13px] text-[#1A1A1A] font-semibold">
            Disease Alert — Tomato Late Blight
          </span>
        </div>
        <ScorePill score={0.76} size="sm" />
      </div>

      {/* Gauge Chart */}
      <div className="px-4 mt-4">
        <GaugeChart value={0.76} cv={0.87} cs={0.60} />
      </div>

      {/* Sensor Cards */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-3">
        <SensorCard
          title="Soil Moisture"
          value="18%"
          status="STRESS"
          statusColor="red"
          percentage={18}
        />
        <SensorCard
          title="Water Level"
          value="22%"
          status="LOW"
          statusColor="amber"
          percentage={22}
        />
      </div>

      {/* Latest Detection */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl p-4 border border-[rgba(0,0,0,0.05)]">
          <div className="text-[12px] text-[#6B7280] mb-2">Latest Detection</div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[16px] font-semibold text-[#1A1A1A]">
              Tomato — Late Blight
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#1D9E75] text-white">
              87%
            </span>
          </div>
          <div className="text-[11px] text-[#6B7280]">2 min ago</div>
        </div>
      </div>
    </div>
  );
}
