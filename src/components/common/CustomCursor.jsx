import React, { useEffect, useRef, useState } from 'react';

/**
 * Neo-Brutalist Custom Cursor
 * Pointer interaktif desktop GPU-accelerated:
 * - 0ms latensi: Posisi container terkunci 1:1 pada koordinat kursor (tidak pernah melayang/menjauh).
 * - Animasi partikel ledakan kotak (sparks burst) saat klik.
 * - Animasi klik tekan (teal scale-90 -rotate-6).
 * - Animasi hover interaktif (kuning rotate-12 scale-110).
 * - Animasi select teks / text-target (vertikal yellow bar).
 * - Tidak terblokir oleh layar sentuh laptop.
 */
export default function CustomCursor() {
  const containerRef = useRef(null);
  const [clickSparks, setClickSparks] = useState([]);
  const [cursorMode, setCursorMode] = useState('default'); // 'default' | 'interactive' | 'text' | 'clicked'
  const modeRef = useRef('default');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isDown = false;
    let hasShown = false;

    const isFinePointer = (e) => e.pointerType !== 'touch';

    const interactiveSel =
      'button, a, input, textarea, select, label, [role="button"], .cursor-pointer, .cursor-grab, .cursor-grabbing';

    const computeMode = (target) => {
      if (isDown) return;

      const interactive = Boolean(target && target.closest(interactiveSel));

      const hasTextSelection = window.getSelection && window.getSelection().toString().length > 0;
      const isTextTarget = Boolean(
        target && target.closest('p, h1, h2, h3, h4, span, code, pre') && !interactive
      );

      let nextMode = 'default';
      if (interactive) {
        nextMode = 'interactive';
      } else if (hasTextSelection || isTextTarget) {
        nextMode = 'text';
      }

      if (nextMode !== modeRef.current) {
        modeRef.current = nextMode;
        setCursorMode(nextMode);
      }
    };

    // Hanya menulis posisi: murah, tanpa reflow
    const onPointerMove = (e) => {
      if (!isFinePointer(e) || !containerRef.current) return;

      if (!hasShown) {
        hasShown = true;
        containerRef.current.style.opacity = '1';
      }
      containerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    // Deteksi mode hanya saat elemen yang di-hover berganti
    const onPointerOver = (e) => {
      if (!isFinePointer(e)) return;
      computeMode(e.target);
    };

    const onPointerDown = (e) => {
      if (!isFinePointer(e)) return;

      isDown = true;
      modeRef.current = 'clicked';
      setCursorMode('clicked');

      const newSpark = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setClickSparks((prev) => [...prev.slice(-3), newSpark]);

      setTimeout(() => {
        setClickSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
      }, 450);
    };

    const onPointerUp = (e) => {
      if (!isFinePointer(e)) return;

      isDown = false;
      computeMode(e.target);
    };

    const onPointerLeave = () => {
      hasShown = false;
      if (containerRef.current) {
        containerRef.current.style.opacity = '0';
      }
    };

    const onSelectionChange = () => {
      if (isDown) return;
      const hasTextSelection = window.getSelection && window.getSelection().toString().length > 0;
      if (hasTextSelection && modeRef.current !== 'text') {
        modeRef.current = 'text';
        setCursorMode('text');
      } else if (!hasTextSelection && modeRef.current === 'text') {
        modeRef.current = 'default';
        setCursorMode('default');
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true, capture: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    document.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('blur', onPointerLeave);
    document.addEventListener('selectionchange', onSelectionChange);

    return () => {
      window.removeEventListener('pointermove', onPointerMove, { capture: true });
      window.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      document.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('blur', onPointerLeave);
      document.removeEventListener('selectionchange', onSelectionChange);
    };
  }, []);

  // Variasi offset untuk partikel ledakan klik
  const sparkAngles = [
    { dx: -24, dy: -24, color: 'bg-neo-coral', rot: 'rotate-45' },
    { dx: 24, dy: -22, color: 'bg-neo-yellow', rot: '-rotate-12' },
    { dx: -22, dy: 24, color: 'bg-neo-teal', rot: 'rotate-12' },
    { dx: 26, dy: 26, color: 'bg-neo-purple', rot: 'rotate-90' },
  ];

  return (
    <div className="hidden md:block pointer-events-none select-none">
      {/* Click Particles Burst */}
      {clickSparks.map((spark) => (
        <div key={spark.id} className="pointer-events-none fixed top-0 left-0 z-[999998]">
          {sparkAngles.map((p, pIdx) => (
            <div
              key={pIdx}
              className={`absolute w-3 h-3 rounded border border-black ${p.color} shadow-[1px_1px_0px_0px_#000] ${p.rot} animate-ping`}
              style={{
                left: `${spark.x + p.dx}px`,
                top: `${spark.y + p.dy}px`,
                animationDuration: '450ms',
                animationIterationCount: 1,
              }}
            />
          ))}
        </div>
      ))}

      {/* Main Cursor Container (terkunci presisi 1:1 di koordinat mouse) */}
      <div
        ref={containerRef}
        className="pointer-events-none fixed top-0 left-0 z-[999999] will-change-transform opacity-0"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        {/* Neo-brutalist box: Berpusat simetris di tengah (-translate-x-1/2 -translate-y-1/2) sehingga tidak pernah melenceng */}
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-black transition-all duration-100 ease-out ${
            cursorMode === 'interactive'
              ? 'w-10 h-10 bg-neo-yellow shadow-[4px_4px_0px_0px_#000000] rotate-12 scale-110'
              : cursorMode === 'clicked'
              ? 'w-5 h-5 bg-neo-teal shadow-[1px_1px_0px_0px_#000000] scale-90 -rotate-6'
              : cursorMode === 'text'
              ? 'w-2 h-7 bg-neo-yellow shadow-[2px_2px_0px_0px_#000000] rotate-0 scale-100 rounded-sm'
              : 'w-6 h-6 bg-neo-coral shadow-[2px_2px_0px_0px_#000000] rotate-0 scale-100'
          }`}
        />

        {/* Center focus dot */}
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full transition-opacity duration-100 ${
            cursorMode === 'text' ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  );
}
