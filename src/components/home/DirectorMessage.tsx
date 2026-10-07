import { SectionTitle, Reveal } from '@/components/ui';
import type { SiteData } from '@/hooks/useSiteData';

export function DirectorMessage({ director, header }: { director: SiteData['directorMessage']; header: SiteData['sectionHeaders']['directorMessage'] }) {
  return (
    <section className="py-20 md:py-32 px-4 bg-sand-100/60">
      <div className="max-w-5xl mx-auto">
        <SectionTitle eyebrow={header.eyebrow} title={director.title} />
        <Reveal>
          <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-start">
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative">
                <img src={director.photo} alt={director.name} className="w-48 h-48 lg:w-full lg:h-auto rounded-2xl object-cover shadow-xl aspect-square" />
                <div className="absolute -bottom-3 -right-3 bg-ocean-600 text-white rounded-xl px-4 py-2 shadow-lg">
                  <span className="text-xs font-medium">Reg. No. 2067</span>
                </div>
              </div>
              <div className="mt-5 text-center lg:text-left">
                <p className="font-serif text-lg font-semibold text-ocean-950">{director.name}</p>
                <p className="text-sm text-ocean-600">{director.designation}</p>
              </div>
            </div>
            <div>
              <blockquote className="text-lg text-ocean-700/90 leading-relaxed italic">
                <span className="text-5xl text-coral-300 font-serif leading-none align-top">&ldquo;</span>
                {director.body}
              </blockquote>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
