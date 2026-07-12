import { useState } from 'react';
import { Leaf } from 'lucide-react';

interface ConnectionScreenProps {
  onConnect: (ip: string, mockMode: boolean) => void;
}

export function ConnectionScreen({ onConnect }: ConnectionScreenProps) {
  const [ip, setIp] = useState('192.168.1.100');
  const [mockMode, setMockMode] = useState(true);

  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="bg-white rounded-xl p-8 w-full max-w-[340px] border border-[rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-[#1D9E75] rounded-full flex items-center justify-center mb-3">
            <Leaf className="text-white" size={28} strokeWidth={2} />
          </div>
          <h1 className="text-[28px] font-semibold text-[#1D9E75] mb-1">FarmLens</h1>
          <p className="text-[14px] text-[#6B7280]">Edge AI Crop Monitoring</p>
        </div>

        <div className="h-px bg-[rgba(0,0,0,0.05)] my-6" />

        <div className="mb-4">
          <label className="block text-[12px] text-[#6B7280] mb-2">
            Raspberry Pi IP Address
          </label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="192.168.1.100"
            className="w-full px-4 py-3 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg focus:outline-none focus:border-[#1D9E75] transition-colors text-[14px]"
          />
        </div>

        <div className="flex items-center justify-between mb-6 py-2">
          <span className="text-[14px] text-[#1A1A1A]">Mock mode (no device needed)</span>
          <button
            onClick={() => setMockMode(!mockMode)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              mockMode ? 'bg-[#1D9E75]' : 'bg-[#cbced4]'
            }`}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                mockMode ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        <button
          onClick={() => onConnect(ip, mockMode)}
          className="w-full bg-[#1D9E75] text-white py-3.5 rounded-lg font-semibold text-[16px] hover:bg-[#178862] transition-colors"
        >
          Connect →
        </button>

        <div className="mt-6 text-center text-[10px] text-[#6B7280]">
          Suez Canal University · IC EISIS 2026
        </div>
      </div>
    </div>
  );
}
