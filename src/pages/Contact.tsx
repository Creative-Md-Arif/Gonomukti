import { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { PageHeader, Reveal } from '@/components/ui';
import { useSiteData } from '@/hooks/useSiteData';
import { publicApi } from '@/services/api';

export default function Contact() {
  const data = useSiteData();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      await publicApi.submitContact(form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-ocean-900 placeholder-ocean-400/50 transition-colors focus:outline-none focus:ring-2 focus:ring-coral-400 ${errors[field] ? 'border-coral-400' : 'border-sand-200'}`;

  return (
    <>
      <PageHeader title="Contact Us" image={data.pageBanners.contact} breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Contact Us' }]} />
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-10">
          <div className="space-y-6">
            <Reveal>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-sand-100 hover-lift transition-all">
                <div className="w-12 h-12 rounded-xl bg-ocean-100 flex items-center justify-center mb-4"><MapPin className="h-6 w-6 text-ocean-700" /></div>
                <h3 className="font-serif text-lg font-semibold text-ocean-950 mb-2">Address</h3>
                <p className="text-sm text-ocean-600 leading-relaxed">{data.contact.address}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-sand-100 hover-lift transition-all">
                <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center mb-4"><Phone className="h-6 w-6 text-coral-600" /></div>
                <h3 className="font-serif text-lg font-semibold text-ocean-950 mb-2">Hotline</h3>
                <a href={`tel:${data.contact.hotline}`} className="text-lg font-semibold text-ocean-700 hover:text-coral-600 transition-colors">{data.contact.hotline}</a>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-sand-100 hover-lift transition-all">
                <div className="w-12 h-12 rounded-xl bg-gold-400/20 flex items-center justify-center mb-4"><Clock className="h-6 w-6 text-gold-600" /></div>
                <h3 className="font-serif text-lg font-semibold text-ocean-950 mb-2">Working Hours</h3>
                <p className="text-sm text-ocean-600 leading-relaxed">{data.contact.workingHours}</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-sand-100">
              <h2 className="text-2xl font-serif font-semibold text-ocean-950 mb-2">Send a Message</h2>
              <p className="text-sm text-ocean-600 mb-6">We'd love to hear from you. Fill out the form below and we'll get back to you soon.</p>
              {status === 'success' && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 px-4 py-3 animate-fade-in">
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                  <p className="text-sm text-green-800">Thank you! Your message has been sent successfully.</p>
                </div>
              )}
              {status === 'error' && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-coral-50 border border-coral-200 px-4 py-3">
                  <AlertCircle className="h-5 w-5 text-coral-600 shrink-0" />
                  <p className="text-sm text-coral-800">Something went wrong. Please try again.</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-ocean-800 mb-1.5">Name *</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass('name')} placeholder="Your full name" />
                    {errors.name && <p className="mt-1 text-xs text-coral-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ocean-800 mb-1.5">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass('email')} placeholder="you@example.com" />
                    {errors.email && <p className="mt-1 text-xs text-coral-600">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-ocean-800 mb-1.5">Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass('phone')} placeholder="+880 ..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ocean-800 mb-1.5">Subject *</label>
                    <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputClass('subject')} placeholder="What is this about?" />
                    {errors.subject && <p className="mt-1 text-xs text-coral-600">{errors.subject}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ocean-800 mb-1.5">Message *</label>
                  <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass('message')} placeholder="Tell us more..." />
                  {errors.message && <p className="mt-1 text-xs text-coral-600">{errors.message}</p>}
                </div>
                <button type="submit" disabled={status === 'loading'} className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-7 py-3.5 text-sm font-semibold text-white hover:bg-coral-600 transition-all hover:shadow-lg hover:shadow-coral-500/30 disabled:opacity-50">
                  {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}Send Message
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-sand-200 h-[400px]">
              <iframe title="Gonomukti Location - Rupsha, Khulna" src={data.contact.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </Reveal>
        </div>
      </section>
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.contact.emails.map((emailItem, i) => (
              <Reveal key={i} delay={i * 80}>
                <a href={`mailto:${emailItem.email}`} className="group block bg-white rounded-2xl p-6 shadow-sm border border-sand-100 hover:shadow-lg transition-all text-center hover-lift">
                  <div className="w-12 h-12 rounded-xl bg-ocean-100 group-hover:bg-coral-500 flex items-center justify-center mx-auto mb-4 transition-colors"><Mail className="h-6 w-6 text-ocean-700 group-hover:text-white transition-colors" /></div>
                  <p className="text-xs uppercase tracking-wider text-ocean-600 mb-2">{emailItem.label}</p>
                  <p className="text-sm font-medium text-ocean-950 group-hover:text-coral-600 transition-colors break-all">{emailItem.email}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
