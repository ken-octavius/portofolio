import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import Card from '../common/Card';
import Reveal from '../common/Reveal';
import { content } from '../../content';

export default function Experience() {
  const { education } = content;
  const [isOpen, setIsOpen] = useState(true);
  return (
    <SectionWrapper
      id="timeline"
      badgeText={education.badge}
      badgeColor="bg-neo-orange"
      title={education.title}
      subtitle={education.subtitle}
    >
      <div className="relative pl-6 md:pl-10 space-y-8 before:content-[''] before:absolute before:left-2 md:before:left-3 before:top-3 before:bottom-3 before:w-1 before:bg-black">
        {education.items.map((exp, idx) => (
          <Reveal key={idx} delay={idx * 80}>
            <div className="relative group">
              {/* Timeline Marker Pin */}
              <div
                className="absolute -left-6 md:-left-10 top-1 w-5 h-5 rounded-full border-3 border-black bg-neo-teal shadow-[2px_2px_0px_0px_#000000] -translate-x-1/2 group-hover:scale-125 transition-transform"
              />

              {/* Timeline Card */}
              <Card onClick={() => setIsOpen(!isOpen)} bgColor="bg-white" className="p-6 md:p-7 cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <span
                    className="px-3 py-1 rounded-full border-2 border-black bg-neo-teal text-xs font-black shadow-[2px_2px_0px_0px_#000000] inline-block w-fit"
                  >
                    {exp.organization}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-gray-700 bg-neo-bg px-2.5 py-1 rounded border border-black w-fit">
                    <Calendar className="w-3.5 h-3.5 text-black" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-2">
                  {exp.role}
                </h3>

                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  {exp.description}
                </p>
              </Card>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
