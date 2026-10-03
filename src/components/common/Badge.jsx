import React from 'react';

/**
 * Reusable Neo-Brutalist Badge / Pill Component
 * Digunakan untuk skill tags, status chip, category tag
 */
export default function Badge({
  children,
  color = 'bg-neo-yellow',
  size = 'md',
  pill = true,
  pressable = false,
  onClick,
  icon: Icon,
  className = '',
}) {
  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs font-bold border-2 shadow-[2px_2px_0px_0px_#000000]',
    md: 'px-3.5 py-1 text-xs md:text-sm font-bold border-2 md:border-3 shadow-[2px_2px_0px_0px_#000000]',
    lg: 'px-4 py-1.5 text-sm md:text-base font-extrabold border-3 shadow-[3px_3px_0px_0px_#000000]',
  };

  const pressableStyles = pressable
    ? 'cursor-pointer hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0px_0px_#000000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0px_0px_#000000] transition-all duration-150'
    : '';

  const roundedStyle = pill ? 'rounded-full' : 'rounded-lg';

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 border-black text-black select-none ${color} ${
        sizeStyles[size] || sizeStyles.md
      } ${roundedStyle} ${pressableStyles} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[2.5]" />}
      <span>{children}</span>
    </span>
  );
}
