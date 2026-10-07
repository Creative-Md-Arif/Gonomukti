import { useSiteData } from "@/hooks/useSiteData";
import { useSeo } from "@/hooks/useSeo";
import {
  HeroSlider,
  ImpactHighlights,
  BriefAbout,
  FocusAreas,
  FeaturedProjects,
  SuccessStory,
  DirectorMessage,
  KeyMilestones,
  PartnersStrip,
  GalleryPreview,
  DonateBand,
} from "@/components/home";

export default function Home() {
  const data = useSiteData();
  const h = data.sectionHeaders;

  const origin = window.location.origin;
  const logo = data.logoDark || data.logoLight;
  const sameAs = data.socialLinks
    .map((s) => s.url)
    .filter((u) => /^https?:\/\//.test(u));

  useSeo({
    title: "Gonomukti — Empowering Coastal Communities",
    description:
      "Gonomukti is a non-governmental development organization in coastal Khulna, Bangladesh, working on public health, climate adaptation, livelihoods, and social inclusion.",
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "NGO",
          "@id": `${origin}/#organization`,
          name: "Gonomukti",
          url: origin,
          ...(logo ? { logo } : {}),
          description: "Empowering coastal communities in Khulna, Bangladesh.",
          address: {
            "@type": "PostalAddress",
            streetAddress: data.contact.address,
            addressCountry: "BD",
          },
          telephone: data.contact.hotline,
          email: data.contact.emails[0]?.email,
          ...(sameAs.length ? { sameAs } : {}),
        },
        {
          "@type": "WebSite",
          "@id": `${origin}/#website`,
          url: origin,
          name: "Gonomukti",
          publisher: { "@id": `${origin}/#organization` },
        },
      ],
    },
  });

  return (
    <>
      <HeroSlider banners={data.banners} />
      <ImpactHighlights items={data.impactHighlights} />
      <BriefAbout data={data.briefAbout} header={h.briefAbout} />
      <FocusAreas areas={data.focusAreas} header={h.focusAreas} />
      <FeaturedProjects projects={data.projects} header={h.featuredProjects} />
      <SuccessStory story={data.successStory} header={h.successStory} />
      <DirectorMessage
        director={data.directorMessage}
        header={h.directorMessage}
      />
      <KeyMilestones milestones={data.milestones} header={h.milestones} />
      <PartnersStrip
        partners={data.partners}
        alliancesText={data.alliancesText}
        header={h.partners}
      />
      <GalleryPreview items={data.galleryItems} header={h.gallery} />
      <DonateBand donate={data.donate} />
    </>
  );
}
