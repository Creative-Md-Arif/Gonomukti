import { Reveal, CountUp } from '@/components/ui';
import type { ImpactHighlightItem } from '@/hooks/useSiteData';

export function ImpactHighlights({ items }: { items: ImpactHighlightItem[] }) {
  return (
    <section className="relative z-30 -mt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass-solid rounded-2xl shadow-2xl p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-ocean-700">
                  <CountUp value={item.value} suffix={item.suffix} />
                </div>
                <p className="mt-2 text-xs md:text-sm text-ocean-600 leading-snug">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
