import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionTitle, Reveal } from '@/components/ui';
import type { SiteData } from '@/hooks/useSiteData';

export function FeaturedProjects({ projects, header }: { projects: SiteData['projects']; header: SiteData['sectionHeaders']['featuredProjects'] }) {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <Reveal key={project.slug} delay={i * 80}>
                <Link to={`/projects/${project.slug}`} className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl border border-sand-100 hover-lift transition-all">
                  <div className="relative h-56 overflow-hidden">
                    <img src={project.coverImage} alt={project.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/70 to-transparent" />
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="h-6 w-6 text-ocean-700" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-ocean-950 mb-2 group-hover:text-coral-600 transition-colors leading-snug">{project.title}</h3>
                    <p className="text-sm text-ocean-600/80 leading-relaxed mb-4">{project.focus}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-coral-600">Learn More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
