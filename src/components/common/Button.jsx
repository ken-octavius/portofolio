import React from 'react';

/**
 * Reusable Neo-Brutalist Button Component
 * Mendukung varian: primary (coral), secondary (white), accent (teal), purple, yellow, dark
 * Mendukung elemen button atau link (href)
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  target,
  rel,
  className = '',
  disabled = false,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
}) {
  // Map varian warna latar belakang
  const variantStyles = {
    primary: 'bg-neo-coral text-black hover:bg-[#eb5249]',
    secondary: 'bg-white text-black hover:bg-[#F5F5F5]',
    accent: 'bg-neo-teal text-black hover:bg-[#34b39b]',
    purple: 'bg-neo-purple text-black hover:bg-[#7a6ce6]',
    yellow: 'bg-neo-yellow text-black hover:bg-[#e6bd3e]',
    dark: 'bg-black text-white hover:bg-[#222]',
  };

  // Map ukuran tombol
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-bold rounded-lg border-2 shadow-[2px_2px_0px_0px_#000000] hover:shadow-[3px_3px_0px_0px_#000000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0px_0px_#000000]',
    md: 'px-5 py-2.5 text-sm md:text-base font-bold rounded-xl border-3 shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0.5 active:translate-x-0.5 active:shadow-[2px_2px_0px_0px_#000000]',
    lg: 'px-7 py-3.5 text-base md:text-lg font-extrabold rounded-xl border-3 md:border-4 shadow-[5px_5px_0px_0px_#000000] hover:shadow-[7px_7px_0px_0px_#000000] hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0.5 active:translate-x-0.5 active:shadow-[2px_2px_0px_0px_#000000]',
  };

  const baseStyles =
    'inline-flex items-center justify-center gap-2 border-black transition-all duration-150 select-none cursor-pointer tracking-tight focus:outline-none';

  const combinedStyles = `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${
    sizeStyles[size] || sizeStyles.md
  } ${disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" />}
    </>
  );

  // Jika memiliki link href, render sebagai tag <a>
  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={combinedStyles}>
        {content}
      </a>
    );
  }

  // Render sebagai tag <button>
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedStyles}>
      {content}
    </button>
  );
}
