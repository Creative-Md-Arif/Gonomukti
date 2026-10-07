import { useState } from "react";
import { ZoomIn, ImageOff, Camera } from "lucide-react";
import { PageHeader, Reveal, Lightbox } from "@/components/ui";
import { useSiteData } from "@/hooks/useSiteData";
import { useSeo } from "@/hooks/useSeo";

const categories = [
  { key: "all", label: "All" },
  { key: "health", label: "Health" },
  { key: "wash", label: "WASH" },
  { key: "livelihoods", label: "Livelihoods" },
  { key: "gender-youth", label: "Gender & Youth" },
] as const;

export default function Gallery() {
  const [active, setActive] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const data = useSiteData();

  const filtered =
    active === "all"
      ? data.galleryItems
      : data.galleryItems.filter((item) => item.category === active);

  const mapped = filtered.map((item) => ({
    image: item.image,
    caption: item.caption,
  }));

  const countFor = (key: string) =>
    key === "all"
      ? data.galleryItems.length
      : data.galleryItems.filter((item) => item.category === key).length;

  const labelFor = (key: string) =>
    categories.find((c) => c.key === key)?.label ?? key;

  // SEO: গ্যালারির সব ছবি (সর্বোচ্চ ২০টি) স্ট্রাকচার্ড ডেটায় যায়, ফিল্টারে বদলায় না
  useSeo({
    title: "Photo Gallery",
    description:
      "Photos from Gonomukti’s field work in coastal Khulna, Bangladesh: community health, water and sanitation, livelihoods, and gender and youth programs.",
    path: "/gallery",
    image: data.pageBanners.gallery,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: "Gonomukti Photo Gallery",
      url: `${window.location.origin}/gallery`,
      isPartOf: { "@type": "WebSite", name: "Gonomukti" },
      image: data.galleryItems.slice(0, 20).map((item) => ({
        "@type": "ImageObject",
        contentUrl: item.image,
        caption: item.caption,
      })),
    },
  });

  return (
    <>
      <PageHeader
        title="Gallery"
        image={data.pageBanners.gallery}
        breadcrumb={[{ label: "Home", path: "/" }, { label: "Gallery" }]}
      />
      <section className="relative py-14 md:py-20 px-4 overflow-hidden bg-gradient-to-b from-sand-50 via-white to-sand-50">
        <div
          className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-ocean-200/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-coral-200/25 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Intro */}
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-sand-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-coral-700 shadow-sm">
                <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                Moments from the Field
              </span>
              <h2 className="mt-5 font-serif text-3xl md:text-5xl font-semibold text-ocean-950 tracking-tight">
                Stories Told in Pictures
              </h2>
              <div
                className="mx-auto mt-5 h-[3px] w-16 rounded-full bg-gradient-to-r from-coral-500 to-gold-400"
                aria-hidden="true"
              />
              <p className="mt-5 text-base md:text-lg text-ocean-700 leading-relaxed">
                A glimpse into our work with coastal communities across health,
                water, livelihoods and youth.
              </p>
            </div>
          </Reveal>

          {/* Filter bar */}
          <div className="sticky top-20 z-30 mb-10 md:mb-12">
            <div className="relative mx-auto w-fit max-w-full">
              <div
                role="group"
                aria-label="Filter photos by category"
                className="flex gap-1.5 overflow-x-auto rounded-full bg-white/85 backdrop-blur-md border border-sand-200/80 p-1.5 shadow-[0_10px_40px_-12px_rgba(2,44,74,0.25)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {categories.map((cat) => {
                  const isActive = active === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setActive(cat.key)}
                      aria-pressed={isActive}
                      className={`shrink-0 whitespace-nowrap inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-sm font-semibold transition-all duration-300 active:scale-95 ${
                        isActive
                          ? "bg-gradient-to-r from-coral-600 to-coral-700 text-white shadow-lg shadow-coral-500/30"
                          : "text-ocean-700 hover:bg-ocean-50 hover:text-ocean-900"
                      }`}
                    >
                      {cat.label}
                      <span
                        className={`min-w-[1.5rem] rounded-full px-1.5 py-0.5 text-[11px] leading-none text-center font-bold ${
                          isActive
                            ? "bg-white/25 text-white"
                            : "bg-sand-100 text-ocean-700"
                        }`}
                      >
                        {countFor(cat.key)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            Showing {filtered.length} photos
          </p>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="mx-auto max-w-md text-center rounded-3xl bg-white border border-sand-200 shadow-sm px-8 py-14">
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ocean-50 text-ocean-600">
                <ImageOff className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="font-serif text-xl font-semibold text-ocean-950">
                No photos yet
              </h3>
              <p className="mt-2 text-sm text-ocean-700">
                There are no photos in this category right now. Please check
                back soon.
              </p>
            </div>
          ) : (
            <div key={active} className="masonry">
              {mapped.map((item, i) => (
                <Reveal key={`${active}-${i}`} delay={i * 40}>
                  <button
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`View larger: ${item.caption}`}
                    className="block w-full masonry-item group relative rounded-2xl overflow-hidden cursor-pointer bg-sand-100 ring-1 ring-ocean-950/5 shadow-[0_8px_30px_-12px_rgba(2,44,74,0.25)] hover:shadow-[0_24px_50px_-16px_rgba(2,44,74,0.45)] hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral-500/40 transition-all duration-500"
                  >
                    <img
                      src={item.image}
                      alt={item.caption}
                      loading="lazy"
                      decoding="async"
                      className="w-full transition-transform duration-700 ease-out group-hover:scale-110 group-focus-visible:scale-110"
                    />

                    {/* Category badge */}
                    <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ocean-800 shadow-sm">
                      {labelFor(filtered[i].category)}
                    </span>

                    {/* Zoom icon */}
                    <span
                      className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur text-ocean-800 shadow-sm opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 [@media(hover:none)]:opacity-100 [@media(hover:none)]:scale-100 transition-all duration-300"
                      aria-hidden="true"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </span>

                    {/* Caption overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/85 via-ocean-950/10 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100 transition-all duration-500">
                      <span
                        className="mb-2 block h-[2px] w-8 rounded-full bg-gradient-to-r from-coral-400 to-gold-400"
                        aria-hidden="true"
                      />
                      <p className="text-sm font-medium text-white text-left leading-snug">
                        {item.caption}
                      </p>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      {lightboxIndex !== null && (
        <Lightbox
          images={mapped}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
