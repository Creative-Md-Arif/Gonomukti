import { Link } from 'react-router-dom';
import { Target, Eye, ArrowRight } from 'lucide-react';
import { PageHeader, SectionTitle, Reveal, CountUp } from '@/components/ui';
import { useSiteData } from '@/hooks/useSiteData';

export function AboutOverview() {
  const data = useSiteData();
  return (
    <>
      <PageHeader title="Overview & History" image={data.pageBanners.about} breadcrumb={[{ label: 'Home', path: '/' }, { label: 'About Us', path: '/about/overview' }, { label: 'Overview & History' }]} />
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-coral-600 mb-3">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-ocean-950 mb-8">Two Decades of Grassroots Development</h2>
            {data.historyText.map((text, i) => (
              <p key={i} className="text-lg text-ocean-700/80 leading-relaxed mb-6">{text}</p>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="py-16 md:py-20 px-4 bg-ocean-50/60">
        <div className="max-w-4xl mx-auto">
          <SectionTitle eyebrow="Journey" title="Our Timeline" />
          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-2 md:left-3 top-2 bottom-2 w-0.5 bg-ocean-200" />
            {data.timeline.map((entry, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="relative mb-10 last:mb-0">
                  <div className="absolute -left-8 md:-left-12 top-1.5 w-6 h-6 md:w-7 md:h-7 rounded-full bg-coral-500 border-4 border-sand-50" />
                  <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-sand-100">
                    <span className="text-sm font-semibold text-coral-600">{entry.year}</span>
                    <h3 className="mt-1 text-lg font-semibold text-ocean-950">{entry.title}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle eyebrow="By the Numbers" title="Milestone Cards" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.milestones.map((m, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-sand-100 text-center hover-lift transition-all">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-ocean-700"><CountUp value={m.value} suffix={m.suffix} /></div>
                  <p className="mt-3 text-sm text-ocean-600 leading-snug">{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function AboutMissionVision() {
  const data = useSiteData();
  return (
    <>
      <PageHeader title="Mission, Vision & Values" image={data.pageBanners.about} breadcrumb={[{ label: 'Home', path: '/' }, { label: 'About Us', path: '/about/overview' }, { label: 'Mission, Vision & Values' }]} />
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            <Reveal>
              <div className="bg-gradient-to-br from-ocean-600 to-ocean-800 rounded-3xl p-10 md:p-12 text-white shadow-xl h-full">
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6"><Eye className="h-7 w-7 text-white" /></div>
                <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                <p className="text-lg text-sand-100/90 leading-relaxed">{data.vision}</p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="bg-gradient-to-br from-coral-500 to-coral-700 rounded-3xl p-10 md:p-12 text-white shadow-xl h-full">
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6"><Target className="h-7 w-7 text-white" /></div>
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p className="text-lg text-sand-100/90 leading-relaxed">{data.mission}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 px-4 bg-ocean-50/60">
        <div className="max-w-6xl mx-auto">
          <SectionTitle eyebrow="Principles" title="Our Core Values" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.values.map((value, i) => {
              const Icon = value.icon;
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="bg-white rounded-2xl p-7 shadow-sm border border-sand-100 hover-lift transition-all h-full">
                    <div className="w-13 h-13 rounded-xl bg-coral-50 flex items-center justify-center mb-5 p-3"><Icon className="h-6 w-6 text-coral-600" /></div>
                    <h3 className="text-lg font-semibold text-ocean-950 mb-3 leading-snug">{value.title}</h3>
                    <p className="text-sm text-ocean-600/80 leading-relaxed">{value.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export function AboutLeadership() {
  const data = useSiteData();
  return (
    <>
      <PageHeader title="Governing Body & Leadership" image={data.pageBanners.about} breadcrumb={[{ label: 'Home', path: '/' }, { label: 'About Us', path: '/about/overview' }, { label: 'Leadership' }]} />
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <Reveal>
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-coral-600 mb-3">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-ocean-950 mb-6">Leadership</h2>
            <p className="text-lg text-ocean-700/80 leading-relaxed">{data.leadershipIntro}</p>
          </Reveal>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {data.leaders.map((leader, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-sand-100 hover:shadow-xl transition-all">
                  <div className="relative h-72 overflow-hidden">
                    <img src={leader.photo} alt={leader.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-ocean-950/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <p className="text-xs text-sand-100/90 leading-snug">{leader.specialization}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-ocean-950 leading-snug">{leader.name}</h3>
                    <p className="text-sm text-coral-600 mt-1">{leader.designation}</p>
                    <p className="text-xs text-ocean-600 mt-2 lg:hidden">{leader.specialization}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function AboutCeoSpeech() {
  const data = useSiteData();
  const d = data.directorMessage;
  return (
    <>
      <PageHeader title="CEO Speech" image={data.pageBanners.about} breadcrumb={[{ label: 'Home', path: '/' }, { label: 'About Us', path: '/about/overview' }, { label: 'CEO Speech' }]} />
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
              <div className="flex flex-col items-center md:items-start">
                <img src={d.photo} alt={d.name} className="w-36 h-36 md:w-full rounded-2xl object-cover shadow-xl aspect-square" />
                <p className="mt-4 font-serif text-lg font-semibold text-ocean-950 text-center md:text-left">{d.name}</p>
                <p className="text-sm text-ocean-600 text-center md:text-left">{d.designation}</p>
              </div>
              <div>
                <span className="inline-block text-sm font-semibold uppercase tracking-widest text-coral-600 mb-3">Editorial</span>
                <h2 className="text-2xl md:text-3xl font-semibold text-ocean-950 mb-6">{d.title}</h2>
                <p className="drop-cap text-lg text-ocean-700/90 leading-relaxed">{d.body}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-12 border-l-4 border-coral-500 pl-6 py-2">
              <p className="font-serif text-xl text-ocean-800 italic leading-relaxed">"Your contribution directly funds vital field operations — turning hardship into lasting self-reliance."</p>
              <p className="mt-3 text-sm font-semibold text-ocean-600">— {d.name}, {d.designation}</p>
            </div>
          </Reveal>
          <div className="mt-12 text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-coral-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-coral-600 transition-all hover:shadow-lg">
              Partner With Us <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
