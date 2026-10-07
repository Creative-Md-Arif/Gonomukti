import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui';
import type { SiteData } from '@/hooks/useSiteData';

export function DonateBand({ donate }: { donate: SiteData['donate'] }) {
  return (
    <section className="px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-coral-600 via-coral-500 to-coral-700 p-10 md:p-16 text-center shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4 leading-tight">{donate.title}</h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-4">{donate.text}</p>
              <p className="text-sm text-white/75 max-w-xl mx-auto mb-8">{donate.subText}</p>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-coral-600 hover:bg-sand-50 transition-all hover:shadow-xl">
                {donate.buttonText} <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
