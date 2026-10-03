import React, { useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/common/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ anchors: true, duration: 1.1 });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return (
    <div className="site-shell min-h-screen text-black selection:bg-neo-yellow selection:text-black font-sans">
      {/* Custom Neo-Brutalist Cursor */}
      <CustomCursor />

      {/* 1. Navbar dengan Logo Ken */}
      <Navbar />

      <main>
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. About Section */}
        <About />

        <Skills />

        <Experience />

        <Projects />

        <Certifications />

        {/* 6. Kontak */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
