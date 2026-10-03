import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Mail, Terminal } from 'lucide-react';
import Button from '../common/Button';
import { content } from '../../content';

export default function Navbar() {
  const { profile, navbar } = content;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const progressRef = useRef(null);
  const progressCapRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    let max = 1;
    let trackW = 0;

    const update = () => {
      ticking = false;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`;
      }
      if (progressCapRef.current) {
        progressCapRef.current.style.transform = `translate3d(${(p * trackW).toFixed(1)}px, 0, 0)`;
      }
    };
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
      trackW = progressCapRef.current?.parentElement?.clientWidth || 0;
      update();
    };

    measure();
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    // reflow (baca scrollHeight) cuma saat ukuran dokumen berubah, bukan tiap frame scroll
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const current = entries.find((entry) => entry.isIntersecting);
      if (current) setActiveSection(current.target.id);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });

    navbar.links.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [navbar.links]);

  return (
    <header className="signal-nav sticky top-0 z-[1000] border-b-3 text-black">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 group"
            aria-label="Beranda"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#000000] overflow-hidden isolate bg-white flex items-center justify-center group-hover:-translate-y-0.5 group-hover:rotate-[-8deg] group-hover:shadow-[5px_5px_0px_0px_#000] transition-all">
              <img
                src={profile.logoImage}
                alt={`Logo ${profile.shortName}`}
                className="w-full h-full object-cover block select-none"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerText = profile.initials;
                }}
              />
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <span className="block font-black text-base text-black tracking-tight">
                {profile.name}
              </span>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navbar.links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm font-bold text-black rounded-lg border-2 transition-all ${activeSection === link.href.slice(1) ? 'bg-neo-yellow border-black shadow-[2px_2px_0px_0px_#000000]' : 'border-transparent hover:border-black hover:bg-white hover:shadow-[2px_2px_0px_0px_#000000]'}`}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <Button
              href="#contact"
              variant="accent"
              size="sm"
              icon={Mail}
              className="hidden sm:inline-flex"
            >
              {navbar.contactButton}
            </Button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden w-11 h-11 bg-white rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#000000] flex items-center justify-center text-black hover:bg-neo-coral active:translate-y-0.5 transition-all"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 stroke-[2.5]" /> : <Menu className="w-6 h-6 stroke-[2.5]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll progress bar neo-brutal: polos + garis hitam di ujung */}
      <div className="absolute left-0 right-0 bottom-0 h-[6px] border-t-2 border-black bg-black/10 overflow-hidden" aria-hidden="true">
        <div ref={progressRef} className="absolute inset-0 bg-neo-coral origin-left" style={{ transform: 'scaleX(0)' }} />
        <div
          ref={progressCapRef}
          className="absolute top-0 bottom-0 left-0 w-[3px] bg-black"
        />
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-neo-yellow border-t-3 border-black px-4 pt-3 pb-6 space-y-2">
          <div className="flex items-center gap-2 p-2 bg-white rounded-lg border-2 border-black mb-3">
            <Terminal className="w-4 h-4 text-black" />
            <span className="text-xs font-mono font-bold text-black">
              {profile.headerSubtitle}
            </span>
          </div>
          {navbar.links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-2.5 text-base font-black text-black rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000000] active:translate-y-0.5 transition-all ${activeSection === link.href.slice(1) ? 'bg-neo-yellow' : 'bg-white hover:bg-neo-coral'}`}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <Button
              href="#contact"
              variant="accent"
              size="md"
              icon={Mail}
              className="w-full justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {navbar.contactButton}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
