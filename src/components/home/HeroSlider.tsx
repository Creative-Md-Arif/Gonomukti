import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import type { SiteData } from '@/hooks/useSiteData';

export function HeroSlider({ banners }: { banners: SiteData['banners'] }) {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((c) => (c + 1) % banners.length), [banners.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + banners.length) % banners.length), [banners.length]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  if (!banners.length) return null;

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {banners.map((banner, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <img src={banner.image} alt={banner.title} className={`h-full w-full object-cover ${i === current ? 'animate-slow-zoom' : ''}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/50 via-ocean-950/40 to-ocean-950/70" />
        </div>
      ))}
      <div className="relative z-20 flex h-full items-center justify-center px-4">
        <div className="max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-sand-100/90 mb-6 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-gold-400" />
            Coastal Khulna, Bangladesh &middot; Est. 2006
          </span>
          <h1 key={`title-${current}`} className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white text-shadow-lg leading-tight animate-fade-up">
            {banners[current].title}
          </h1>
          <p key={`sub-${current}`} className="mt-6 text-lg md:text-xl text-sand-100/90 text-shadow-sm max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '200ms' }}>
            {banners[current].subtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '400ms' }}>
            <Link to={banners[current].ctaLink} className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-coral-600 transition-all hover:shadow-xl hover:shadow-coral-500/30">
              {banners[current].ctaText}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/30 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/20 transition-all">
              Support Us
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {banners.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-coral-400' : 'w-2 bg-white/40 hover:bg-white/60'}`} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 backdrop-blur-md p-2.5 text-white hover:bg-white/20 transition-colors hidden md:block" aria-label="Previous">
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 backdrop-blur-md p-2.5 text-white hover:bg-white/20 transition-colors hidden md:block" aria-label="Next">
        <ArrowRight className="h-5 w-5" />
      </button>
    </section>
  );
}
