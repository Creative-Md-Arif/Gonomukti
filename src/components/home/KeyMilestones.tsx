import { SectionTitle, Reveal, CountUp } from '@/components/ui';
import type { SiteData } from '@/hooks/useSiteData';

export function KeyMilestones({ milestones, header }: { milestones: SiteData['milestones']; header: SiteData['sectionHeaders']['milestones'] }) {
  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="bg-gradient-to-br from-ocean-600 to-ocean-800 rounded-2xl p-7 text-white shadow-lg hover-lift transition-all text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold"><CountUp value={m.value} suffix={m.suffix} /></div>
                <p className="mt-3 text-sm text-sand-100/80 leading-snug">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
