import React from 'react';
import SectionWrapper from '../common/SectionWrapper';
import Card from '../common/Card';
import { content } from '../../content';

export default function Certifications() {
  const { certifications } = content;

  return (
    <SectionWrapper
      id="certifications"
      badgeText={certifications.badge}
      badgeColor="bg-neo-yellow"
      title={certifications.title}
      subtitle={certifications.subtitle}
    >
      {certifications.items.length === 0 ? (
        <Card bgColor="bg-white" className="p-8 text-center">
          <p className="text-lg font-medium text-gray-700">Belum ada sertifikat.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.items.map((cert, idx) => (
            <Card
              key={idx}
              bgColor="bg-white"
              className="p-6 flex gap-4 cursor-grab active:cursor-grabbing hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000000] transition-all"
            >
              {cert.image && (
                <div className="w-24 h-24 shrink-0 rounded-xl border-3 border-black overflow-hidden bg-neo-bg">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex-grow min-w-0">
                <h3 className="text-lg font-black text-black tracking-tight mb-1">
                  {cert.name}
                </h3>

                <p className="text-sm font-bold text-gray-600 mb-1">
                  {cert.issuer}
                </p>

                <p className="text-xs font-mono text-gray-500 mb-3">
                  {cert.date}
                </p>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1.5 bg-neo-teal text-white font-bold text-xs rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000000] transition-all"
                  >
                    Lihat Sertifikat
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
