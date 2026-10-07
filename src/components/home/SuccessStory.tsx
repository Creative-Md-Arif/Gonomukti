import { Quote, MapPin, CheckCircle, Star } from 'lucide-react';
import { Reveal } from '@/components/ui';
import type { SiteData } from '@/hooks/useSiteData';

export function SuccessStory({ story, header }: { story: SiteData['successStory']; header: SiteData['sectionHeaders']['successStory'] }) {
  return (
    <section className="py-20 md:py-28 px-4 bg-ocean-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={story.image} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-coral-400 mb-2">{header.eyebrow}</span>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white">{header.title}</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={story.image} alt={story.title} className="w-full aspect-[4/3] object-cover" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-4 py-1.5 text-xs font-semibold text-white">
                  <Star className="h-3 w-3" />{story.label}
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div>
              <Quote className="h-10 w-10 text-coral-400 mb-4" />
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight mb-4">{story.title}</h3>
              <p className="flex items-center gap-2 text-sand-100/60 text-sm mb-6"><MapPin className="h-4 w-4" />{story.location}</p>
              <p className="text-lg text-sand-100/80 leading-relaxed mb-6">{story.body}</p>
              <div className="flex flex-wrap gap-3">
                {story.stats.map((stat, i) => (
                  <span key={i} className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-sand-100/90 border border-white/15">
                    <CheckCircle className="h-4 w-4 text-gold-400" />{stat}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
