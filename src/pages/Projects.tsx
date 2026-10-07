import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { PageHeader, SectionTitle, Reveal, Lightbox } from '@/components/ui';
import { useSiteData } from '@/hooks/useSiteData';

export function ProjectsList() {
  const data = useSiteData();
  return (
    <>
      <PageHeader title="Our Projects" image={data.pageBanners.projects} breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Projects' }]} />
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle eyebrow="Field Programs" title="Building Resilience Across Coastal Khulna" subtitle="Four flagship programs addressing health, water, livelihoods, and gender equity — each driven by community participation and measurable outcomes." />
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {data.projects.map((project, i) => {
              const Icon = project.icon;
              return (
                <Reveal key={project.slug} delay={i * 100}>
                  <Link to={`/projects/${project.slug}`} className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl border border-sand-100 hover-lift transition-all">
                    <div className="relative h-64 overflow-hidden">
                      <img src={project.coverImage} alt={project.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/60 to-transparent" />
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center"><Icon className="h-6 w-6 text-ocean-700" /></div>
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
    </>
  );
}

export function ProjectDetails() {
  const { slug } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const data = useSiteData();
  const project = data.projects.find((p) => p.slug === slug);
  const otherProjects = data.projects.filter((p) => p.slug !== slug);

  if (!project) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <h1 className="text-3xl font-semibold text-ocean-950 mb-4">Project Not Found</h1>
        <Link to="/projects" className="text-coral-600 font-semibold hover:underline">Back to Projects</Link>
      </div>
    );
  }

  const galleryImages = project.gallery.map((img: string) => ({ image: img, caption: project.title }));
  const Icon = project.icon;

  return (
    <>
      <PageHeader title={project.title} image={project.coverImage} breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Projects', path: '/projects' }, { label: project.title }]} />
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="rounded-2xl bg-gradient-to-br from-ocean-600 to-ocean-800 p-8 md:p-10 text-white shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center"><Icon className="h-7 w-7 text-white" /></div>
                <span className="text-sm uppercase tracking-wider text-sand-100/70">Focus Area</span>
              </div>
              <p className="text-xl md:text-2xl font-serif leading-snug">{project.focus}</p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-ocean-950 mb-8">Key Activities</h2>
          <div className="space-y-4">
            {project.activities.map((activity: string, i: number) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm border border-sand-100 hover-lift transition-all">
                  <div className="w-10 h-10 rounded-xl bg-coral-50 flex items-center justify-center shrink-0"><CheckCircle className="h-5 w-5 text-coral-600" /></div>
                  <p className="text-ocean-700/90 leading-relaxed pt-2">{activity}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20 px-4 bg-ocean-50/60">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8"><ImageIcon className="h-6 w-6 text-ocean-600" /><h2 className="text-2xl md:text-3xl font-semibold text-ocean-950">Project Gallery</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.gallery.map((img: string, i: number) => (
              <Reveal key={i} delay={i * 60}>
                <button onClick={() => setLightboxIndex(i)} className="block w-full rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow">
                  <img src={img} alt={`${project.title} ${i + 1}`} className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {lightboxIndex !== null && <Lightbox images={galleryImages} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-ocean-950 mb-8">Other Projects</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {otherProjects.map((p) => {
              const OtherIcon = p.icon;
              return (
                <Link key={p.slug} to={`/projects/${p.slug}`} className="group block rounded-2xl overflow-hidden bg-white shadow-sm border border-sand-100 hover:shadow-lg transition-all">
                  <div className="relative h-40 overflow-hidden">
                    <img src={p.coverImage} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/50 to-transparent" />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-white/90 flex items-center justify-center"><OtherIcon className="h-5 w-5 text-ocean-700" /></div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-ocean-950 group-hover:text-coral-600 transition-colors leading-snug">{p.title}</h3>
                    <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-coral-600">Learn More <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <div className="pb-16 text-center">
        <Link to="/projects" className="inline-flex items-center gap-2 rounded-full border-2 border-ocean-600 px-6 py-3 text-sm font-semibold text-ocean-700 hover:bg-ocean-600 hover:text-white transition-all"><ArrowLeft className="h-4 w-4" />All Projects</Link>
      </div>
    </>
  );
}
