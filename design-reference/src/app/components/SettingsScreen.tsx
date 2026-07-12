import { useState } from 'react';

export function SettingsScreen() {
  const [w1, setW1] = useState(0.6);
  const [theta, setTheta] = useState(0.5);
  const [mockMode, setMockMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState('Tomato');

  const crops = ['Tomato', 'Strawberry', 'Mango', 'Other'];

  return (
    <div className="pb-20 overflow-y-auto h-full">
      {/* App Bar */}
      <div className="bg-white border-b border-[rgba(0,0,0,0.05)] px-4 py-4 sticky top-0 z-10">
        <h1 className="text-[20px] font-semibold text-[#1A1A1A]">Settings</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Node Connection Section */}
        <div>
          <h3 className="text-[11px] font-semibold text-[#6B7280] mb-3 uppercase tracking-wide">
            Node Connection
          </h3>
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.05)] divide-y divide-[rgba(0,0,0,0.05)]">
            <div className="px-4 py-3 flex items-center justify-between">
              <div>
                <div className="text-[12px] text-[#6B7280] mb-0.5">RPi IP</div>
                <div className="text-[14px] text-[#1A1A1A]">192.168.1.100</div>
              </div>
              <button className="text-[13px] text-[#1D9E75] font-semibold">Change</button>
            </div>
            <div className="px-4 py-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#1D9E75] rounded-full" />
              <span className="text-[13px] text-[#1A1A1A]">Connected</span>
            </div>
          </div>
        </div>

        {/* Fusion Weights Section */}
        <div>
          <h3 className="text-[11px] font-semibold text-[#6B7280] mb-3 uppercase tracking-wide">
            Fusion Weights
          </h3>
          <div className="bg-white rounded-xl p-4 border border-[rgba(0,0,0,0.05)] space-y-4">
            {/* Visual Weight Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] text-[#1A1A1A]">Visual weight (w1)</span>
                <span className="text-[13px] font-semibold text-[#1D9E75]">
                  {w1.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={w1}
                onChange={(e) => setW1(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#F5F5F0] rounded-full appearance-none cursor-pointer slider-thumb-green"
                style={{
                  background: `linear-gradient(to right, #1D9E75 0%, #1D9E75 ${w1 * 100}%, #F5F5F0 ${w1 * 100}%, #F5F5F0 100%)`,
                }}
              />
            </div>

            {/* Threshold Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] text-[#1A1A1A]">Alert threshold (θ)</span>
                <span className="text-[13px] font-semibold text-[#1D9E75]">
                  {theta.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={theta}
                onChange={(e) => setTheta(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#F5F5F0] rounded-full appearance-none cursor-pointer slider-thumb-green"
                style={{
                  background: `linear-gradient(to right, #1D9E75 0%, #1D9E75 ${theta * 100}%, #F5F5F0 ${theta * 100}%, #F5F5F0 100%)`,
                }}
              />
            </div>

            {/* Auto Weight Note */}
            <div className="text-[11px] text-[#6B7280]">
              Soil weight (w2): {(1 - w1).toFixed(2)} — auto
            </div>

            {/* Crop Selector */}
            <div className="flex flex-wrap gap-2 pt-2">
              {crops.map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-colors ${
                    selectedCrop === crop
                      ? 'border-[#1D9E75] text-[#1D9E75] bg-[#1D9E75] bg-opacity-5'
                      : 'border-[#6B7280] border-opacity-30 text-[#6B7280]'
                  }`}
                >
                  {crop} {selectedCrop === crop && '✓'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* App Section */}
        <div>
          <h3 className="text-[11px] font-semibold text-[#6B7280] mb-3 uppercase tracking-wide">
            App
          </h3>
          <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.05)] divide-y divide-[rgba(0,0,0,0.05)]">
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-[14px] text-[#1A1A1A]">Mock mode</span>
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
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-[14px] text-[#1A1A1A]">Push notifications</span>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications ? 'bg-[#1D9E75]' : 'bg-[#cbced4]'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-[11px] font-semibold text-[#6B7280] mb-3 uppercase tracking-wide">
            About
          </h3>
          <div className="bg-white rounded-xl p-4 border border-[rgba(0,0,0,0.05)] text-center">
            <div className="text-[14px] font-semibold text-[#1A1A1A] mb-1">
              FarmLens v1.0.0
            </div>
            <div className="text-[12px] text-[#6B7280]">
              Suez Canal University | IC EISIS 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
