import React from 'react';

/**
 * Reusable Round Neo-Brutalist Icon Button
 * Sesuai spesifikasi: "icon button bulat" dengan border tebal dan hard drop shadow
 */
export default function IconButton({
  icon: Icon,
  href,
  onClick,
  target = '_blank',
  rel = 'noopener noreferrer',
  ariaLabel,
  color = 'bg-white',
  size = 'md',
  className = '',
}) {
  const sizeStyles = {
    sm: 'w-9 h-9 border-2 shadow-[2px_2px_0px_0px_#000000]',
    md: 'w-11 h-11 border-3 shadow-[3px_3px_0px_0px_#000000]',
    lg: 'w-13 h-13 md:w-14 md:h-14 border-3 md:border-4 shadow-[4px_4px_0px_0px_#000000]',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const baseStyles =
    'inline-flex items-center justify-center rounded-full border-black text-black transition-all duration-150 select-none cursor-pointer hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[5px_5px_0px_0px_#000000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0px_0px_#000000]';

  const combinedStyles = `${baseStyles} ${color} ${sizeStyles[size] || sizeStyles.md} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} aria-label={ariaLabel} className={combinedStyles}>
        {Icon && <Icon className={`${iconSizes[size] || iconSizes.md} stroke-[2.5]`} />}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={combinedStyles}>
      {Icon && <Icon className={`${iconSizes[size] || iconSizes.md} stroke-[2.5]`} />}
    </button>
  );
}
