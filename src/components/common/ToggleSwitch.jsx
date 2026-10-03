import React from 'react';

/**
 * Neo-Brutalist Toggle Switch Component
 * Bergaya tombol saklar tebal dengan hard shadow
 */
export default function ToggleSwitch({
  checked = false,
  onChange,
  label = '',
  colorActive = 'bg-neo-teal',
  colorInactive = 'bg-gray-200',
  size = 'md',
}) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange && onChange(e.target.checked)}
        />
        {/* Track switch */}
        <div
          className={`w-14 h-8 rounded-full border-3 border-black shadow-[3px_3px_0px_0px_#000000] transition-colors duration-200 ${
            checked ? colorActive : colorInactive
          }`}
        />
        {/* Thumb knob switch */}
        <div
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full border-2 border-black shadow-[1px_1px_0px_0px_#000000] transition-transform duration-200 ${
            checked ? 'translate-x-6 bg-neo-yellow' : 'translate-x-0'
          }`}
        />
      </div>
      {label && <span className="text-sm font-bold text-black">{label}</span>}
    </label>
  );
}
