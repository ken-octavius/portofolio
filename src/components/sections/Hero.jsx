import { useEffect, useRef, useState, useCallback } from 'react';
import { Layers, Mail } from 'lucide-react';
import Button from '../common/Button';
import { content } from '../../content';

export default function Hero() {
  const { profile, hero } = content;

  // Gimmick: nama ter-scramble lalu decode saat hover.
  // Anti-glitch: animasi berjalan = terkunci, tidak bisa re-trigger.
  const [displayName, setDisplayName] = useState(profile.name);
  const scrRafRef = useRef(0);
  const scrLockRef = useRef(false);

  const scrambleName = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (scrLockRef.current) return;
    scrLockRef.current = true;
    const target = profile.name;
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*/<>';
    // Lock time naik dari kiri ke kanan (dengan sedikit jitter),
    // semua huruf sempat ngacak di awal lalu ter-decode bertahap kiri->kanan
    const n = target.length;
    const lockAt = Array.from(target, (_, i) => (i / n) * 0.8 + Math.random() * 0.15);
    const start = performance.now();
    const dur = 950;
    let lastGlyphSwap = 0;
    let scrambled = target;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      // Ganti glyph tiap ~60ms
      if (now - lastGlyphSwap > 60) {
        lastGlyphSwap = now;
        scrambled = target
          .split('')
          .map((ch, i) => (ch === ' ' || p >= lockAt[i] ? ch : glyphs[Math.floor(Math.random() * glyphs.length)]))
          .join('');
      }
      setDisplayName(scrambled);
      if (p < 1) {
        scrRafRef.current = requestAnimationFrame(tick);
      } else {
        scrLockRef.current = false;
      }
    };
    scrRafRef.current = requestAnimationFrame(tick);
  }, [profile.name]);

  const resolveName = useCallback(() => {
    if (scrLockRef.current) {
      cancelAnimationFrame(scrRafRef.current);
      scrLockRef.current = false;
    }
    setDisplayName(profile.name);
  }, [profile.name]);

  useEffect(
    () => () => {
      cancelAnimationFrame(scrRafRef.current);
      scrLockRef.current = false;
    },
    []
  );

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-x-clip">
      <div className="max-w-3xl mx-auto">
        <div className="signal-card flex flex-col items-center space-y-5 sm:space-y-6 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-neo-yellow rounded-full border-3 border-black shadow-[3px_3px_0px_0px_#000000]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-black animate-pulse" />
            <span className="text-xs sm:text-sm font-extrabold tracking-wide text-black font-mono">
              {hero.statusBadge}
            </span>
          </div>

          <h1
            onMouseEnter={scrambleName}
            onMouseLeave={resolveName}
            className="animate-name-shimmer text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-black tracking-wide leading-[1.05] font-orbitron uppercase transition-all hover:scale-[1.02] hover:tracking-wider duration-300 select-none"
          >
            {displayName}
          </h1>

          <div className="animate-card-float w-full max-w-lg p-5 bg-white rounded-2xl border-3 border-black shadow-[5px_5px_0px_0px_#000000] transition-all duration-300 hover:-translate-y-1.5 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_#000000]">
            <p className="text-lg sm:text-xl md:text-2xl font-black text-black">{hero.headline}
              <span className="animate-cursor-blink inline-block w-3 h-5 sm:h-6 md:h-7 bg-neo-coral border-2 border-black ml-2 align-[-3px]" />
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button href="#skills" variant="primary" size="lg" icon={Layers}>{hero.primaryButton}</Button>
            <Button href="#contact" variant="secondary" size="lg" icon={Mail}>{hero.secondaryButton}</Button>
          </div>
        </div>

        <div className="mt-12 md:mt-16 flex items-end justify-center gap-4 sm:gap-8" aria-hidden="true">
          <div className="animate-block-hop w-12 h-12 sm:w-16 sm:h-16 bg-neo-coral border-3 border-black shadow-[4px_4px_0px_0px_#000000] rotate-[-3deg] hover:rotate-[6deg] hover:scale-110 transition-transform duration-200" />
          <div className="animate-block-hop animate-block-hop-delay w-16 h-16 sm:w-20 sm:h-20 bg-neo-teal border-3 border-black shadow-[4px_4px_0px_0px_#000000] rotate-[4deg] hover:rotate-[-6deg] hover:scale-110 transition-transform duration-200" />
          <div className="animate-block-hop w-10 h-10 sm:w-14 sm:h-14 bg-neo-purple border-3 border-black shadow-[4px_4px_0px_0px_#000000] rotate-[8deg] hover:rotate-[-4deg] hover:scale-110 transition-transform duration-200" />
          <span className="animate-bob mb-3 font-mono text-xs sm:text-sm font-black tracking-wider">{hero.bottomTagline}</span>
        </div>
      </div>
    </section>
  );
}
