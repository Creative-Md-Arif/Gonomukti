import { useParams, Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ImageIcon,
  ZoomIn,
  ListChecks,
  Camera,
} from "lucide-react";
import { useState } from "react";
import { PageHeader, SectionTitle, Reveal, Lightbox } from "@/components/ui";
import { useSiteData } from "@/hooks/useSiteData";
import { useSeo } from "@/hooks/useSeo";

const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectsList() {
  const data = useSiteData();

  useSeo({
    title: "Our Projects",
    description:
      "Explore Gonomukti’s flagship programs in coastal Khulna, Bangladesh: public health, water and sanitation, livelihoods, and gender equity.",
    path: "/projects",
    image: data.pageBanners.projects,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Our Projects",
      isPartOf: { "@type": "WebSite", name: "Gonomukti" },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: data.projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.title,
          url: `${window.location.origin}/projects/${p.slug}`,
        })),
      },
    },
  });

  return (
    <>
      <PageHeader
        title="Our Projects"
        image={data.pageBanners.projects}
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Projects" }]}
      />
      <section className="relative py-20 md:py-28 px-4 overflow-hidden bg-gradient-to-b from-sand-50 via-white to-sand-50">
        <div
          className="pointer-events-none absolute -top-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-ocean-200/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 -left-32 w-96 h-96 rounded-full bg-coral-200/25 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto">
          <SectionTitle
            eyebrow="Field Programs"
            title="Building Resilience Across Coastal Khulna"
            subtitle="Four flagship programs addressing health, water, livelihoods, and gender equity — each driven by community participation and measurable outcomes."
          />
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-10">
            {data.projects.map((project, i) => {
              const Icon = project.icon;
              return (
                <Reveal key={project.slug} delay={i * 100}>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group relative flex h-full flex-col rounded-3xl overflow-hidden bg-white ring-1 ring-ocean-950/5 shadow-[0_10px_40px_-18px_rgba(2,44,74,0.3)] hover:shadow-[0_30px_60px_-20px_rgba(2,44,74,0.45)] hover:-translate-y-1.5 focus-visible:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral-500/40 transition-all duration-500"
                  >
                    <div className="relative h-64 sm:h-72 overflow-hidden">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        width={800}
                        height={576}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/75 via-ocean-950/10 to-transparent" />
                      <span
                        className="absolute top-5 left-5 font-serif text-5xl font-bold leading-none text-white/90 drop-shadow-lg"
                        aria-hidden="true"
                      >
                        {pad(i + 1)}
                      </span>
                      <div className="absolute top-5 right-5 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg">
                        <Icon
                          className="h-6 w-6 text-ocean-700"
                          aria-hidden="true"
                        />
                      </div>
                      <div
                        className="absolute bottom-0 left-6 right-6 h-[3px] rounded-full bg-gradient-to-r from-coral-500 via-gold-400 to-transparent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ocean-950 mb-3 group-hover:text-coral-700 transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-ocean-700 leading-relaxed mb-6 line-clamp-3">
                        {project.focus}
                      </p>
                      <span className="mt-auto flex items-center justify-between border-t border-sand-100 pt-5 text-sm font-semibold text-coral-700">
                        <span>
                          Learn More
                          <span className="sr-only">
                            {" "}
                            about {project.title}
                          </span>
                        </span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-coral-50 text-coral-700 group-hover:bg-gradient-to-br group-hover:from-coral-500 group-hover:to-coral-700 group-hover:text-white group-hover:shadow-lg group-hover:shadow-coral-500/30 transition-all duration-300">
                          <ArrowRight
                            className="h-4 w-4 group-hover:translate-x-0.5 transition-transform"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
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

  useSeo({
    title: project ? project.title : "Project Not Found",
    description: project
      ? project.focus
      : "The project you are looking for could not be found. Browse all Gonomukti projects.",
    path: `/projects/${slug ?? ""}`,
    image: project?.coverImage,
    noindex: !project,
    jsonLd: project
      ? {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              name: project.title,
              description: project.focus,
              image: project.coverImage,
              url: `${window.location.origin}/projects/${project.slug}`,
              isPartOf: { "@type": "WebSite", name: "Gonomukti" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: `${window.location.origin}/`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Projects",
                  item: `${window.location.origin}/projects`,
                },
                { "@type": "ListItem", position: 3, name: project.title },
              ],
            },
          ],
        }
      : undefined,
  });

  if (!project) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <h1 className="text-3xl font-semibold text-ocean-950 mb-4">
          Project Not Found
        </h1>
        <Link
          to="/projects"
          className="text-coral-700 font-semibold hover:underline"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  const galleryImages = project.gallery.map((img: string) => ({
    image: img,
    caption: project.title,
  }));
  const Icon = project.icon;

  return (
    <>
      <PageHeader
        title={project.title}
        image={project.coverImage}
        breadcrumb={[
          { label: "Home", path: "/" },
          { label: "Projects", path: "/projects" },
          { label: project.title },
        ]}
      />

      {/* Focus area */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ocean-600 via-ocean-700 to-ocean-900 p-8 md:p-12 text-white shadow-[0_30px_60px_-25px_rgba(2,44,74,0.6)] ring-1 ring-white/10">
              <div
                className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 rounded-full bg-coral-500/25 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-28 -left-16 w-72 h-72 rounded-full bg-ocean-400/20 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="absolute top-0 left-8 right-8 h-[3px] rounded-full bg-gradient-to-r from-transparent via-coral-400 to-transparent"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur ring-1 ring-white/20 flex items-center justify-center">
                    <Icon className="h-7 w-7 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-sand-100">
                    Focus Area
                  </span>
                </div>
                <p className="text-xl md:text-3xl font-serif leading-snug">
                  {project.focus}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-4 py-2 text-sm text-sand-100">
                    <ListChecks className="h-4 w-4" aria-hidden="true" />
                    {project.activities.length} key activities
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-4 py-2 text-sm text-sand-100">
                    <Camera className="h-4 w-4" aria-hidden="true" />
                    {project.gallery.length} photos
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Key activities */}
      <section className="py-8 md:py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-coral-700 mb-3">
              What We Do
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ocean-950">
              Key Activities
            </h2>
            <div
              className="mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-coral-500 to-gold-400"
              aria-hidden="true"
            />
          </div>
          <ul className="space-y-4 md:space-y-5">
            {project.activities.map((activity: string, i: number) => (
              <li key={i}>
                <Reveal delay={i * 80}>
                  <div className="group flex items-start gap-4 sm:gap-6 bg-white rounded-2xl p-5 sm:p-7 ring-1 ring-ocean-950/5 shadow-[0_8px_30px_-16px_rgba(2,44,74,0.3)] hover:shadow-[0_20px_44px_-18px_rgba(2,44,74,0.4)] hover:-translate-y-0.5 transition-all duration-300">
                    <span
                      className="shrink-0 font-serif text-3xl sm:text-4xl font-bold leading-none bg-gradient-to-br from-coral-500 to-gold-500 bg-clip-text text-transparent"
                      aria-hidden="true"
                    >
                      {pad(i + 1)}
                    </span>
                    <p className="text-ocean-800 leading-relaxed sm:text-lg pt-0.5 min-w-0">
                      {activity}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className="mt-12 md:mt-16 py-16 md:py-24 px-4 bg-gradient-to-b from-ocean-50/70 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-coral-700 mb-3">
                <ImageIcon className="h-4 w-4" aria-hidden="true" />
                From the Field
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ocean-950">
                Project Gallery
              </h2>
              <div
                className="mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-coral-500 to-gold-400"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[9rem] md:auto-rows-[11rem] gap-3 md:gap-4">
            {project.gallery.map((img: string, i: number) => (
              <Reveal
                key={i}
                delay={i * 60}
                className={i === 0 ? "col-span-2 row-span-2" : ""}
              >
                <button
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View ${project.title} photo ${i + 1} larger`}
                  className="group relative block h-full w-full rounded-2xl overflow-hidden ring-1 ring-ocean-950/5 shadow-md hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral-500/40 transition-shadow"
                >
                  <img
                    src={img}
                    alt={`${project.title} ${i + 1}`}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-ocean-950/0 group-hover:bg-ocean-950/35 group-focus-visible:bg-ocean-950/35 transition-colors duration-300" />
                  <span
                    className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-ocean-800 shadow-lg opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 transition-all duration-300"
                    aria-hidden="true"
                  >
                    <ZoomIn className="h-5 w-5" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}

      {/* Other projects */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-coral-700 mb-3">
              Keep Exploring
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ocean-950">
              Other Projects
            </h2>
            <div
              className="mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-coral-500 to-gold-400"
              aria-hidden="true"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {otherProjects.map((p) => {
              const OtherIcon = p.icon;
              return (
                <Link
                  key={p.slug}
                  to={`/projects/${p.slug}`}
                  className="group block rounded-2xl overflow-hidden bg-white ring-1 ring-ocean-950/5 shadow-[0_8px_30px_-16px_rgba(2,44,74,0.3)] hover:shadow-[0_24px_50px_-20px_rgba(2,44,74,0.45)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral-500/40 transition-all duration-500"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      width={600}
                      height={352}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/60 to-transparent" />
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center shadow">
                      <OtherIcon
                        className="h-5 w-5 text-ocean-700"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-ocean-950 group-hover:text-coral-700 transition-colors leading-snug">
                      {p.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-coral-700">
                      Learn More
                      <span className="sr-only"> about {p.title}</span>
                      <ArrowRight
                        className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="pb-20 text-center">
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 rounded-full border-2 border-ocean-600 px-7 py-3 text-sm font-semibold text-ocean-700 hover:bg-ocean-600 hover:text-white hover:shadow-lg hover:shadow-ocean-600/25 transition-all duration-300"
        >
          <ArrowLeft
            className="h-4 w-4 group-hover:-translate-x-1 transition-transform"
            aria-hidden="true"
          />
          All Projects
        </Link>
      </div>
    </>
  );
}
