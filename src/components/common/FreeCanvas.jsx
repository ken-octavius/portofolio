import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  getNavbarBottom,
  isPointerInsidePlayArea,
  isPointerOverNavbar,
} from '../../utils/dragContainment';

/**
 * FreeCanvas Component
 * Wadah kartu neo-brutalist interaktif (draggable) dengan animasi fade-up scroll berulang.
 * - Beradaptasi responsif di laptop (>= 1024px), tablet (700px - 1023px), dan ponsel (< 768px).
 * - Animasi fade-up aktif berulang setiap kali di-scroll bolak-balik tanpa perlu refresh halaman.
 * - Drag super halus (144 FPS) langsung di layer GPU tanpa lag/freeze.
 */
export default function FreeCanvas({
  children,
  className = '',
  height = 620,
  columns = 3,
  rowGap = 280,
  gapX = 24,
  layout, // opsional: (width, height) => [{ x, y, width }, ...]
}) {
  const canvasRef = useRef(null);

  const childArray = React.Children.toArray(children);
  const childCount = childArray.length;

  const [positions, setPositions] = useState([]);
  const [zIndices, setZIndices] = useState(() => Array(childCount).fill(1));
  const [topZ, setTopZ] = useState(10);
  const [activeDragIndex, setActiveDragIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  ));
  const [canvasHeight, setCanvasHeight] = useState(height);
  const [isRevealed, setIsRevealed] = useState(false);

  // Pantau ukuran layar untuk mode mobile vs desktop
  useEffect(() => {
    const handleWinResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleWinResize);
    return () => window.removeEventListener('resize', handleWinResize);
  }, []);

  // Animasi fade-up scroll: aktif berulang setiap kali elemen masuk/keluar layar saat di-scroll
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    // Cek langsung jika elemen sudah terlihat di layar saat pertama kali render
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsRevealed(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsRevealed(entry.isIntersecting);
      },
      { threshold: 0.06, rootMargin: '0px 0px -25px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Fungsi murni menghitung koordinat layout
  const computeLayout = useCallback((containerWidth) => {
    if (typeof layout === 'function') {
      return layout(containerWidth, height);
    }

    const effectiveColumns = containerWidth >= 1024 ? columns : (containerWidth >= 700 ? Math.min(2, columns) : 1);
    const gap = effectiveColumns === 1 ? 0 : gapX;
    const cardW = Math.max(
      180,
      Math.floor((containerWidth - (effectiveColumns - 1) * gap) / effectiveColumns)
    );

    return childArray.map((_, index) => {
      const col = index % effectiveColumns;
      const row = Math.floor(index / effectiveColumns);
      return {
        x: col * (cardW + gap),
        y: row * rowGap,
        width: cardW,
      };
    });
  }, [layout, height, columns, gapX, rowGap, childArray]);

  // Hitung posisi awal dan tinggi canvas di dalam effect saat resize
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const handleResize = () => {
      const width = el.getBoundingClientRect().width;
      if (!width) return;

      const fresh = computeLayout(width);

      let maxY = 0;
      fresh.forEach((p) => {
        if (p.y > maxY) maxY = p.y;
      });
      setCanvasHeight(Math.max(height, maxY + 240));

      setPositions((prev) => {
        if (prev.length === childCount && prev.some((p) => p._userMoved)) {
          return prev.map((p, idx) => ({
            ...p,
            width: fresh[idx]?.width || p.width,
          }));
        }
        return fresh;
      });
    };

    handleResize();

    const ro = new ResizeObserver(handleResize);
    ro.observe(el);
    return () => ro.disconnect();
  }, [childCount, computeLayout, height]);

  const bringToFront = (index) => {
    setTopZ((z) => {
      const next = Math.min(35, z + 1);
      setZIndices((prev) => {
        const copy = [...prev];
        copy[index] = next;
        return copy;
      });
      return next;
    });
  };

  const startDrag = (event, index) => {
    if (isMobile) return;

    const targetTag = event.target.tagName?.toLowerCase();
    if (['input', 'textarea', 'select', 'option'].includes(targetTag)) {
      return;
    }

    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const pos = positions[index] || { x: 0, y: 0, width: 300 };
    const cardEl = event.currentTarget;

    bringToFront(index);

    const startX = event.clientX;
    const startY = event.clientY;
    const startPosX = pos.x;
    const startPosY = pos.y;
    const cardW = pos.width || cardEl.offsetWidth || 300;
    let currentX = pos.x;
    let currentY = pos.y;
    let hasMoved = false;

    cardEl.style.transition = 'none';
    cardEl.style.willChange = 'transform';
    document.body.style.userSelect = 'none';

    setActiveDragIndex(index);

    const stopDrag = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopDrag);
      window.removeEventListener('pointercancel', stopDrag);
      document.body.style.userSelect = '';

      cardEl.style.willChange = 'auto';
      cardEl.style.transition = 'box-shadow 0.15s ease';

      if (hasMoved) {
        setPositions((prev) => prev.map((p, idx) => (
          idx === index ? { ...p, x: currentX, y: currentY, _userMoved: true } : p
        )));
      }

      setTimeout(() => {
        setActiveDragIndex(null);
      }, 40);
    };

    const handlePointerMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      if (!hasMoved && (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2)) {
        hasMoved = true;
      }

      const canvasRect = canvasEl.getBoundingClientRect();
      const maxX = Math.max(0, canvasRect.width - cardW);
      const maxY = Math.max(0, canvasHeight - 90);
      const minY = Math.max(0, getNavbarBottom() - canvasRect.top);

      currentX = Math.max(0, Math.min(maxX, startPosX + deltaX));
      currentY = Math.max(minY, Math.min(maxY, startPosY + deltaY));

      cardEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopDrag);
    window.addEventListener('pointercancel', stopDrag);
  };

  return (
    <div
      ref={canvasRef}
      className={`grid grid-cols-1 gap-6 md:block md:relative select-none ${className}`}
      style={{
        '--canvas-height': `${canvasHeight}px`,
        minHeight: !isMobile ? `${canvasHeight}px` : undefined,
      }}
    >
      {childArray.map((child, index) => {
        const pos = positions[index] || { x: 0, y: 0, width: 300 };
        const isDragging = activeDragIndex === index;

        // Pada mobile: tampilkan sebagai block alami
        if (isMobile) {
          return (
            <div
              key={child.key ?? index}
              className={`w-full transition-all duration-700 ease-out ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
              }`}
              style={{
                transitionDelay: isRevealed ? `${index * 75}ms` : '0ms',
              }}
            >
              {child}
            </div>
          );
        }

        // Pada Desktop / Tablet: Draggable FreeCanvas GPU translate3d dengan animasi fade-up scroll
        return (
          <div
            key={child.key ?? index}
            onPointerDown={(event) => startDrag(event, index)}
            className={`md:absolute touch-none select-none ${
              isDragging ? 'cursor-grabbing z-50 scale-[1.01]' : 'cursor-grab'
            }`}
            style={{
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
              width: pos.width ? `${pos.width}px` : 'auto',
              zIndex: isDragging ? 40 : (zIndices[index] || 1),
              opacity: isRevealed ? 1 : 0,
              // Only transition opacity for the reveal animation; never transition transform (that's drag)
              transition: isDragging
                ? 'none'
                : `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${index * 75}ms, box-shadow 0.15s ease`,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
