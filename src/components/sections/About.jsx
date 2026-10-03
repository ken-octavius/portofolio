import React, { useCallback, useState } from 'react';
import { Terminal, CheckCircle2, Shield, Network, Server, Route, Lock } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import Card from '../common/Card';
import FreeCanvas from '../common/FreeCanvas';
import { content } from '../../content';

export default function About() {
  const { about, profile } = content;
  const [activePillar, setActivePillar] = useState(0);

  // Assign icons to pillars by index (order matches content.about.learningPillars)
  const pillarIcons = [Network, Server, Route, Shield, Lock];
  const pillarColors = ['bg-neo-teal', 'bg-neo-coral', 'bg-neo-yellow', 'bg-neo-purple', 'bg-neo-blue'];

  const aboutLayout = useCallback((width) => {
    const gap = 24;
    // Desktop (>= 960px): Whoami kiri, 5 pilar grid 2 kolom di kanan (2+2+1)
    if (width >= 960) {
      const leftWidth = Math.floor(width * 0.46);
      const rightX = leftWidth + gap;
      const rightWidth = Math.floor((width - rightX - gap) / 2);
      const row2X = rightX + rightWidth + gap;
      const step = 170;

      return [
        { x: 0, y: 0, width: leftWidth },
        { x: rightX, y: 0, width: rightWidth },
        { x: row2X, y: 0, width: rightWidth },
        { x: rightX, y: step, width: rightWidth },
        { x: row2X, y: step, width: rightWidth },
        { x: rightX, y: step * 2, width: rightWidth },
      ];
    }

    // Ukuran Tablet / Layar Menengah (< 960px): Whoami di atas, 5 pilar grid 2 kolom di bawahnya
    const halfWidth = Math.max(220, Math.floor((width - gap) / 2));
    const pillarTop = 380;

    return [
      { x: 0, y: 0, width: width },
      { x: 0, y: pillarTop, width: halfWidth },
      { x: halfWidth + gap, y: pillarTop, width: halfWidth },
      { x: 0, y: pillarTop + 150, width: halfWidth },
      { x: halfWidth + gap, y: pillarTop + 150, width: halfWidth },
      { x: 0, y: pillarTop + 300, width: halfWidth },
      { x: halfWidth + gap, y: pillarTop + 300, width: halfWidth },
    ];
  }, []);

  return (
    <SectionWrapper
      id="about"
      badgeText={about.badge}
      badgeColor="bg-neo-teal"
      title={about.title}
      subtitle={about.subtitle}
    >
      <FreeCanvas height={660} layout={aboutLayout}>
        {/* Kartu 1: Whoami */}
        <Card bgColor="bg-white" className="p-6 md:p-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-black uppercase text-gray-700 bg-neo-yellow px-3 py-1 rounded-lg border-2 border-black w-fit">
            <Terminal className="w-4 h-4 inline mr-1 text-black" />
            <span>{about.whoamiBadge}</span>
          </div>

          <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-medium">
            {about.whoamiText}
          </p>

            <div className="pt-4 border-t-2 border-black/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {about.checklist.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-bold text-black">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Kartu 2-5: 4 Pilar Pembelajaran */}
        {about.learningPillars.map((area, idx) => {
          const Icon = pillarIcons[idx] || Shield;
          const color = pillarColors[idx] || 'bg-neo-teal';
          return (
            <div
              key={idx}
              onClick={() => setActivePillar(idx)}
              className={`scroll-reveal w-full text-left p-5 rounded-2xl border-3 border-black ${color} shadow-[4px_4px_0px_0px_#000000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000000] transition-all cursor-grab active:cursor-grabbing ${activePillar === idx ? '-translate-x-1 -translate-y-1 shadow-[7px_7px_0px_0px_#000000]' : ''}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-black stroke-[2.5]" />
                </div>
                <h3 className="font-black text-lg text-black tracking-tight leading-tight">
                  {area.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-900 leading-snug">
                {area.desc}
              </p>
            </div>
          );
        })}
      </FreeCanvas>
    </SectionWrapper>
  );
}

