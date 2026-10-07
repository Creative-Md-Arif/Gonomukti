import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionTitle, Reveal } from '@/components/ui';
import type { SiteData } from '@/hooks/useSiteData';

export function GalleryPreview({ items, header }: { items: SiteData['galleryItems']; header: SiteData['sectionHeaders']['gallery'] }) {
  const preview = items.slice(0, 6);
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
        <Reveal>
          <div className="masonry">
            {preview.map((item, i) => (
              <div key={i} className="masonry-item group relative rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow">
                <img src={item.image} alt={item.caption} className="w-full group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="absolute bottom-3 left-3 right-3 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">{item.caption}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="text-center mt-10">
          <Link to="/gallery" className="inline-flex items-center gap-2 rounded-full border-2 border-ocean-600 px-6 py-3 text-sm font-semibold text-ocean-700 hover:bg-ocean-600 hover:text-white transition-all">
            View Full Gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
