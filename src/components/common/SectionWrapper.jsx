import React from 'react';
import Badge from './Badge';
import Reveal from './Reveal';

/**
 * Reusable Section Wrapper Component
 * Memastikan layout konsisten dengan heading bergaya Neo Brutalism
 */
export default function SectionWrapper({
  id,
  badgeText,
  badgeColor = 'bg-neo-yellow',
  title,
  subtitle,
  children,
  className = '',
  containerClassName = 'max-w-6xl',
}) {
  return (
    <section id={id} className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className={`mx-auto ${containerClassName}`}>
        {/* Section Header sebagai Elemen Grafis */}
        {(title || badgeText) && (
          <Reveal>
            <div className="section-heading-panel mb-12 md:mb-16 pb-6 border-b-3 border-black">
              {badgeText && (
                <div className="mb-3">
                  <Badge color={badgeColor} size="md">
                    {badgeText}
                  </Badge>
                </div>
              )}
              {title && (
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-black flex flex-wrap items-center gap-3">
                  <span>{title}</span>
                  <span className="animate-block-hop w-5 h-5 bg-neo-coral inline-block border-2 border-black shadow-[2px_2px_0px_0px_#000000]" />
                  <span className="animate-block-hop animate-block-hop-delay w-4 h-4 bg-neo-teal inline-block border-2 border-black shadow-[2px_2px_0px_0px_#000000]" />
                </h2>
              )}
              {subtitle && (
                <p className="mt-3 text-base md:text-lg text-gray-700 max-w-3xl font-medium">
                  {subtitle}
                </p>
              )}
            </div>
          </Reveal>
        )}

        {/* Section Content */}
        {children}
      </div>
    </section>
  );
}
