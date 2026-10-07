import { SectionTitle, Reveal } from '@/components/ui';
import type { FocusAreaItem, SectionHeader } from '@/hooks/useSiteData';

export function FocusAreas({ areas, header }: { areas: FocusAreaItem[]; header: SectionHeader }) {
  return (
    <section className="py-20 md:py-28 px-4 bg-ocean-50/60">
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, i) => {
            const Icon = area.icon;
            return (
              <Reveal key={i} delay={i * 100}>
                <div className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl border border-sand-100 hover-lift transition-all h-full">
                  <div className="w-14 h-14 rounded-xl bg-ocean-100 group-hover:bg-coral-500 transition-colors flex items-center justify-center mb-5">
                    <Icon className="h-7 w-7 text-ocean-700 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-ocean-950 mb-3 leading-snug">{area.title}</h3>
                  <p className="text-sm text-ocean-600/80 leading-relaxed">{area.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
