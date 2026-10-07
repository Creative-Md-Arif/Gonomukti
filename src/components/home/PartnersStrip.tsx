import { CheckCircle } from 'lucide-react';
import { SectionTitle, Reveal } from '@/components/ui';
import type { SiteData } from '@/hooks/useSiteData';

export function PartnersStrip({ partners, alliancesText, header }: { partners: SiteData['partners']; alliancesText: string; header: SiteData['sectionHeaders']['partners'] }) {
  return (
    <section className="py-20 md:py-28 px-4 bg-ocean-50/60">
      <div className="max-w-5xl mx-auto">
        <SectionTitle eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
        <div className="space-y-4">
          {partners.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-6 shadow-sm border border-sand-100 hover-lift transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-ocean-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-6 w-6 text-ocean-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ocean-950 text-sm md:text-base">{p.name}</h3>
                    <p className="text-xs md:text-sm text-ocean-600">{p.role}</p>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-ocean-700 capitalize">{p.type}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300}>
          <p className="mt-8 text-center text-ocean-600/80 italic max-w-3xl mx-auto leading-relaxed">{alliancesText}</p>
        </Reveal>
      </div>
    </section>
  );
}
