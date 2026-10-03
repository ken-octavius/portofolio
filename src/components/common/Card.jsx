import React from 'react';

/**
 * Reusable Neo-Brutalist Card Component
 * Mendukung border hitam tebal, hard shadow, dan efek hover pressable/lift
 */
export default function Card({
  children,
  className = '',
  bgColor = 'bg-white',
  hover = true,
  borderWidth = 'border-3',
  shadow = 'shadow-[4px_4px_0px_0px_#000000]',
  rounded = 'rounded-2xl',
  onClick,
  ...props
}) {
  const hoverStyles = hover
    ? 'transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[7px_7px_0px_0px_#000000]'
    : '';

  return (
    <div
      {...props}
      onClick={onClick}
      className={`relative ${bgColor} ${borderWidth} border-black ${shadow} ${rounded} ${hoverStyles} ${className}`}
    >
      <span className="absolute top-3 right-3 flex gap-1.5 pointer-events-none" aria-hidden="true">
        <span className="w-3 h-3 rounded-full bg-neo-coral border border-black" />
        <span className="w-3 h-3 rounded-full bg-neo-yellow border border-black" />
        <span className="w-3 h-3 rounded-full bg-neo-teal border border-black" />
      </span>
      {children}
    </div>
  );
}
