import React from 'react';

/**
 * Neo-Brutalist Progress Bar Component
 * Border tebal hitam, hard shadow, dan background bergaris/warna kontras
 */
export default function ProgressBar({
  value = 0,
  max = 100,
  label = '',
  color = 'bg-neo-coral',
  showPercent = true,
  height = 'h-5',
}) {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5 text-xs md:text-sm font-extrabold text-black">
          <span>{label}</span>
          {showPercent && (
            <span className="bg-black text-white px-2 py-0.5 rounded text-[11px] font-mono">
              {percent}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full ${height} bg-white rounded-lg border-3 border-black shadow-[3px_3px_0px_0px_#000000] overflow-hidden p-0.5`}>
        <div
          className={`h-full ${color} rounded transition-all duration-500 ease-out border-r-2 border-black`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
