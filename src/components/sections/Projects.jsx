import React from 'react';
import SectionWrapper from '../common/SectionWrapper';
import Card from '../common/Card';
import { content } from '../../content';

export default function Projects() {
  const { projects } = content;

  return (
    <SectionWrapper
      id="projects"
      badgeText={projects.badge}
      badgeColor="bg-neo-coral"
      title={projects.title}
      subtitle={projects.subtitle}
    >
      {projects.items.length === 0 ? (
        <Card bgColor="bg-white" className="p-8 text-center">
          <p className="text-lg font-medium text-gray-700">Belum ada project.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.items.map((project, idx) => (
            <Card
              key={idx}
              bgColor="bg-white"
              className="p-6 flex flex-col cursor-grab active:cursor-grabbing hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000000] transition-all"
            >
              {project.image && (
                <div className="aspect-video rounded-xl border-3 border-black overflow-hidden mb-4 bg-neo-bg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <h3 className="text-xl font-black text-black tracking-tight mb-2">
                {project.title}
              </h3>

              <p className="text-sm text-gray-700 font-medium leading-relaxed mb-4 flex-grow">
                {project.description}
              </p>

              {project.tags && project.tags.length > 0 && (
                <div className="pt-3 border-t-2 border-black/10 flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 bg-neo-bg rounded-md border border-black text-xs font-bold text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-3 mt-auto">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-neo-purple text-white font-bold text-sm rounded-lg border-3 border-black shadow-[3px_3px_0px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000000] transition-all text-center"
                  >
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-neo-coral text-white font-bold text-sm rounded-lg border-3 border-black shadow-[3px_3px_0px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000000] transition-all text-center"
                  >
                    Live
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
