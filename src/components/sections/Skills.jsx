import React, { useState } from 'react';
import SectionWrapper from '../common/SectionWrapper';
import Card from '../common/Card';
import FreeCanvas from '../common/FreeCanvas';
import { content } from '../../content';

export default function Skills() {
  const { techStack } = content;
  const [selectedSkill, setSelectedSkill] = useState(null);
  const badgeColors = ['bg-neo-purple', 'bg-neo-coral', 'bg-neo-teal', 'bg-neo-yellow', 'bg-neo-pink', 'bg-neo-blue', 'bg-neo-orange'];
  return (
    <SectionWrapper
      id="skills"
      badgeText={techStack.badge}
      badgeColor="bg-neo-purple"
      title={techStack.title}
      subtitle={techStack.subtitle}
    >
      <FreeCanvas className="free-canvas" height={620} columns={3} rowGap={280}>
        {techStack.items.map((skill, idx) => (
          <Card
            key={idx}
            bgColor="bg-white"
            onClick={() => setSelectedSkill(selectedSkill === idx ? null : idx)}
            className={`p-6 flex flex-col justify-between cursor-grab active:cursor-grabbing ${selectedSkill === idx ? 'bg-neo-yellow -translate-x-1 -translate-y-1 shadow-[7px_7px_0px_0px_#000000]' : ''}`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span
                  className={`w-9 h-9 rounded-xl border-2 border-black ${badgeColors[idx % badgeColors.length]} font-mono font-black text-xs flex items-center justify-center shadow-[2px_2px_0px_0px_#000000]`}
                >
                  #{idx + 1}
                </span>
              </div>

              <h3 className="text-xl font-black text-black tracking-tight mb-2">
                {skill.name}
              </h3>

              <p className="text-sm text-gray-700 font-medium leading-relaxed mb-4">
                {skill.description}
              </p>
            </div>

            <div className="pt-3 border-t-2 border-black/10 flex flex-wrap gap-1.5">
              {skill.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-0.5 bg-neo-bg rounded-md border border-black text-xs font-bold text-black"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </FreeCanvas>
    </SectionWrapper>
  );
}
