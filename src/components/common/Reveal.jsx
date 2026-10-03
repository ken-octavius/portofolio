import React, { useEffect, useRef, useState } from 'react';

/**
 * Reusable Reveal Component
 * Memberikan animasi fade-up setiap kali elemen masuk viewport saat di-scroll (tanpa harus me-refresh halaman).
 * - Elemen yang sudah ada di viewport saat pertama load langsung tampil (anti-blank).
 * - Terus re-trigger saat di-scroll bolak-balik.
 * - Stabil saat diklik / re-render.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Cek langsung jika elemen sudah terlihat di layar saat load
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.08, rootMargin: '0px 0px -25px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-7 pointer-events-none'
      } ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
}
