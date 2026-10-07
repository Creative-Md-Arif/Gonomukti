import { useState } from "react";
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
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div
            role="group"
            aria-label="Filter photos by category"
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                aria-pressed={active === cat.key}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  active === cat.key
                    ? "bg-coral-600 text-white shadow-lg shadow-coral-500/20"
                    : "bg-white text-ocean-700 border border-sand-200 hover:border-ocean-400"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div key={active} className="masonry">
            {mapped.map((item, i) => (
              <Reveal key={`${active}-${i}`} delay={i * 40}>
                <button
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View larger: ${item.caption}`}
                  className="block w-full masonry-item group relative rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.caption}
                    loading="lazy"
                    decoding="async"
                    className="w-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" />
                  <p className="absolute bottom-3 left-3 right-3 text-xs text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity text-left">
                    {item.caption}
                  </p>
                </button>
              </Reveal>
            ))}
          </div>
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
