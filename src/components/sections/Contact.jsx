import React, { useCallback, useState } from 'react';
import { Mail, Send, Youtube, Github, CheckCircle, Terminal, MapPin } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import Card from '../common/Card';
import Button from '../common/Button';
import IconButton from '../common/IconButton';
import FreeCanvas from '../common/FreeCanvas';
import { content } from '../../content';

/**
 * Contact Section Component
 * Form kontak neo-brutalist (Nama, Email, Pesan), direct links, dan info kontak.
 * Seluruh kartu dapat digeser bebas (draggable) seperti tab/jendela desktop.
 */
export default function Contact() {
  const { contact, profile } = content;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(null); // 'idle' | 'success' | 'error'
  const [isSending, setIsSending] = useState(false);

  const contactLayout = useCallback((width) => {
    const gap = 24;
    // Ukuran Laptop / Layar Lebar (>= 960px): 2 kolom berdampingan
    if (width >= 960) {
      const leftWidth = Math.floor(width * 0.44);
      const rightWidth = width - leftWidth - gap;
      const rightX = leftWidth + gap;

      return [
        { x: 0, y: 0, width: leftWidth },
        { x: rightX, y: 0, width: rightWidth },
      ];
    }

    // Ukuran Tablet (< 960px): Bertumpuk rapi dengan lebar penuh
    return [
      { x: 0, y: 0, width: width },
      { x: 0, y: 440, width: width },
    ];
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || isSending) return;

    setIsSending(true);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Pesan baru dari ${formData.name} (${formData.email})`,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus(null), 4500);
    }
  };

  return (
    <SectionWrapper
      id="contact"
      badgeText={contact.badge}
      badgeColor="bg-neo-coral"
      title={contact.title}
      subtitle={contact.subtitle}
    >
      <FreeCanvas height={660} layout={contactLayout}>
        {/* Kartu 1: Info Kontak & Social Icons */}
        <Card bgColor="bg-white" className="p-6 md:p-8 space-y-6">
          <div>
            <span className="text-xs font-mono font-black uppercase text-gray-700 bg-neo-yellow px-2.5 py-1 rounded border-2 border-black inline-block mb-3">
              {contact.directCard.badge}
            </span>
            <h3 className="text-2xl font-black text-black tracking-tight">
              {contact.directCard.title}
            </h3>
            <p className="mt-2 text-sm text-gray-700 font-medium leading-relaxed">
              {contact.directCard.description}
            </p>
          </div>

          {/* Quick Details Box */}
          <div className="space-y-3 pt-3 border-t-2 border-black/10">
            <div className="flex items-center gap-3 text-sm font-bold text-black">
              <div className="w-8 h-8 rounded-lg bg-neo-teal border-2 border-black flex items-center justify-center">
                <Mail className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="truncate">{profile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-black">
              <div className="w-8 h-8 rounded-lg bg-neo-yellow border-2 border-black flex items-center justify-center">
                <MapPin className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Social Links: Round Icon Buttons (sesuai spesifikasi) */}
          <div className="pt-4 border-t-2 border-black space-y-2">
            <span className="block text-xs font-mono font-black uppercase text-gray-800">
              {contact.directCard.socialHeading}
            </span>
            <div className="flex items-center gap-3">
              <IconButton
                icon={Github}
                href={profile.githubUrl}
                ariaLabel="GitHub Repositories"
                color="bg-neo-purple"
                size="lg"
              />
              <IconButton
                icon={Youtube}
                href={profile.youtubeUrl}
                ariaLabel="YouTube Channel"
                color="bg-neo-coral"
                size="lg"
              />
              <IconButton
                icon={Mail}
                href={`mailto:${profile.email}`}
                ariaLabel="Send Direct Email"
                color="bg-neo-coral"
                size="lg"
              />
            </div>
          </div>
        </Card>

        {/* Kartu 2: Form Kontak */}
        <Card bgColor="bg-white" className="p-6 md:p-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b-3 border-black">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-black stroke-[2.5]" />
              <span className="text-sm font-black font-mono">
                {contact.form.cardHeader}
              </span>
            </div>
          </div>

          {/* Alert Sukses */}
          {status === 'success' && (
            <div className="mb-6 p-4 bg-neo-teal rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#000000] flex items-center gap-3">
              <CheckCircle className="w-6 h-6 stroke-[2.5] text-black shrink-0" />
              <div>
                <h4 className="font-black text-sm text-black">{contact.form.successTitle}</h4>
                <p className="text-xs font-bold text-gray-900">
                  {contact.form.successMessage}
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-6 p-4 bg-neo-coral rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#000000]">
              <h4 className="font-black text-sm text-black">Gagal kirim.</h4>
              <p className="text-xs font-bold text-gray-900">
                Coba lagi, atau email langsung: {profile.email}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Nama */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs sm:text-sm font-black uppercase tracking-wider text-black font-mono">
                {contact.form.nameLabel}
              </label>
              <input
                type="text"
                required
                placeholder={contact.form.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-neo-bg rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#000000] text-sm font-bold placeholder-gray-500 focus:outline-none focus:shadow-[5px_5px_0px_0px_#000000] focus:-translate-y-0.5 transition-all"
              />
            </div>

            {/* Input Email */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs sm:text-sm font-black uppercase tracking-wider text-black font-mono">
                {contact.form.emailLabel}
              </label>
              <input
                type="email"
                required
                placeholder={contact.form.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-neo-bg rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#000000] text-sm font-bold placeholder-gray-500 focus:outline-none focus:shadow-[5px_5px_0px_0px_#000000] focus:-translate-y-0.5 transition-all"
              />
            </div>

            {/* Input Pesan */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs sm:text-sm font-black uppercase tracking-wider text-black font-mono">
                {contact.form.messageLabel}
              </label>
                <textarea
                  rows={4}
                  required
                  placeholder={contact.form.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-neo-bg rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#000000] text-sm font-bold placeholder-gray-500 focus:outline-none focus:shadow-[5px_5px_0px_0px_#000000] focus:-translate-y-0.5 transition-all resize-none"
                />
            </div>

            {/* Tombol Kirim */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={Send}
                disabled={isSending}
                className="w-full justify-center"
              >
                {isSending ? 'Mengirim...' : contact.form.submitButton}
              </Button>
            </div>
          </form>
        </Card>
      </FreeCanvas>
    </SectionWrapper>
  );
}
