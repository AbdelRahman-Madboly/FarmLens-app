import { ArrowLeft, Check } from 'lucide-react';
import { ScorePill } from './ScorePill';

interface LogDetailScreenProps {
  onBack: () => void;
}

export function LogDetailScreen({ onBack }: LogDetailScreenProps) {
  return (
    <div className="pb-20 overflow-y-auto h-full">
      {/* App Bar */}
      <div className="bg-white border-b border-[rgba(0,0,0,0.05)] px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="text-[#1D9E75]">
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>
        <h1 className="text-[20px] font-semibold text-[#1A1A1A]">Detection Details</h1>
      </div>

      {/* Image Placeholder */}
      <div className="bg-[#F5F5F0] w-full aspect-video flex items-center justify-center text-[12px] text-[#6B7280]">
        <div className="text-center">
          <div className="mb-1">📷</div>
          <div>Bounding Box Area</div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Detection Section */}
        <div>
          <h3 className="text-[11px] font-semibold text-[#6B7280] mb-3 uppercase tracking-wide">
            Detection
          </h3>
          <div className="bg-white rounded-xl p-4 border border-[rgba(0,0,0,0.05)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6B7280]">Class</span>
              <span className="text-[14px] font-semibold text-[#1A1A1A]">
                Tomato — Late Blight
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6B7280]">Confidence</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#1D9E75] text-white">
                87%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6B7280]">Combined Score</span>
              <ScorePill score={0.76} size="sm" />
            </div>
          </div>
        </div>

        {/* Sensors Section */}
        <div>
          <h3 className="text-[11px] font-semibold text-[#6B7280] mb-3 uppercase tracking-wide">
            Sensors
          </h3>
          <div className="bg-white rounded-xl p-4 border border-[rgba(0,0,0,0.05)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6B7280]">Soil Moisture</span>
              <span className="text-[14px] font-semibold text-[#E24B4A]">18%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6B7280]">Water Level</span>
              <span className="text-[14px] font-semibold text-[#BA7517]">22%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6B7280]">Sensor Score (Cs)</span>
              <ScorePill score={0.6} size="sm" />
            </div>
          </div>
        </div>

        {/* Fusion Section */}
        <div>
          <h3 className="text-[11px] font-semibold text-[#6B7280] mb-3 uppercase tracking-wide">
            Fusion
          </h3>
          <div className="bg-white rounded-xl p-4 border border-[rgba(0,0,0,0.05)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6B7280]">Visual Score (Cv)</span>
              <span className="text-[13px] text-[#1A1A1A]">0.87</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6B7280]">Sensor Score (Cs)</span>
              <span className="text-[13px] text-[#1A1A1A]">0.60</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6B7280]">Combined (Ccombined)</span>
              <ScorePill score={0.76} size="sm" />
            </div>
            <div className="h-px bg-[rgba(0,0,0,0.05)] my-2" />
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6B7280]">Alert Status</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E24B4A] text-white">
                ALERT
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#6B7280]">w1: 0.60 · w2: 0.40 · θ: 0.50</span>
            </div>
          </div>
        </div>

        {/* Traceability Section */}
        <div>
          <h3 className="text-[11px] font-semibold text-[#6B7280] mb-3 uppercase tracking-wide">
            Traceability
          </h3>
          <div className="bg-white rounded-xl p-4 border border-[rgba(0,0,0,0.05)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6B7280]">Cycle ID</span>
              <span className="text-[13px] text-[#1A1A1A] font-mono">#168</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6B7280]">Node ID</span>
              <span className="text-[13px] text-[#1A1A1A] font-mono">FL-001</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6B7280]">Timestamp</span>
              <span className="text-[13px] text-[#1A1A1A]">Apr 5, 14:30:42</span>
            </div>
            <div className="h-px bg-[rgba(0,0,0,0.05)]" />
            <div>
              <label className="block text-[12px] text-[#6B7280] mb-2">Farmer Note</label>
              <textarea
                placeholder="Add observation notes..."
                className="w-full px-3 py-2 bg-[#F5F5F0] border border-[rgba(0,0,0,0.05)] rounded-lg text-[13px] resize-none focus:outline-none focus:border-[#1D9E75] transition-colors"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* ETRACE Badge */}
        <div className="flex justify-center">
          <div className="bg-[#1D9E75] bg-opacity-10 text-[#1D9E75] px-4 py-2 rounded-full text-[12px] font-semibold flex items-center gap-2">
            <Check size={14} strokeWidth={3} />
            ETRACE Compatible
          </div>
        </div>
      </div>
    </div>
  );
}
