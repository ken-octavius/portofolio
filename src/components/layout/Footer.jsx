import React from 'react';
import { ArrowUp, Github, Youtube, Mail, Terminal } from 'lucide-react';
import IconButton from '../common/IconButton';
import { content } from '../../content';

/**
 * Neo-Brutalist Footer Component
 */
export default function Footer() {
  const { footer, profile, navbar } = content;

  const scrollToTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neo-dark text-white border-t-4 border-black mt-20 pt-14 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b-3 border-neutral-800">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              {/* Logo Rounded Square Sempurna */}
              <div className="w-14 h-14 shrink-0 rounded-xl border-3 border-white shadow-[4px_4px_0px_0px_#F5CB4C] overflow-hidden isolate bg-[#0d1b1e] flex items-center justify-center">
                <img
                  src={profile.logoImage}
                  alt="Logo Ken"
                  className="w-full h-full object-cover block select-none"
                />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  {profile.name}
                </h3>
                <span className="text-xs font-mono font-bold text-neo-teal uppercase tracking-wider">
                  {profile.role}
                </span>
              </div>
            </div>

            <p className="text-gray-300 max-w-md font-medium text-sm md:text-base leading-relaxed">
              {footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-neo-yellow font-mono">
              {footer.navigationHeading}
            </span>
            <ul className="space-y-2 text-sm font-bold">
              {navbar.links.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:underline hover:text-neo-yellow text-gray-300 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-neo-yellow font-mono">
              {footer.socialHeading}
            </span>
            <div className="flex items-center gap-3">
              <IconButton
                icon={Github}
                href={profile.githubUrl}
                ariaLabel="GitHub Ken"
                color="bg-neo-purple"
              />
              <IconButton
                icon={Youtube}
                href={profile.youtubeUrl}
                ariaLabel="YouTube Ken"
                color="bg-neo-coral"
              />
              <IconButton
                icon={Mail}
                href={`mailto:${profile.email}`}
                ariaLabel="Email Ken"
                color="bg-neo-coral"
              />
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 bg-neo-yellow text-black rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#ffffff] font-extrabold text-xs hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#ffffff] active:translate-y-0.5 transition-all"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                <span>{footer.backToTopButton}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-400">
          <div className="flex items-center gap-1.5 font-mono text-gray-300">
            <Terminal className="w-4 h-4 text-neo-teal" />
            <span>&copy; {new Date().getFullYear()} {profile.name}. {footer.copyrightSuffix}</span>
          </div>
          <div className="font-mono text-xs text-gray-400 font-bold">
            {footer.bottomTagline}
          </div>
        </div>
      </div>
    </footer>
  );
}
