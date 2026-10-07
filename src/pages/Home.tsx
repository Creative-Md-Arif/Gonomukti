import { useEffect } from 'react';
import { useSiteData } from '@/hooks/useSiteData';
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
} from '@/components/home';

export default function Home() {
  const data = useSiteData();
  const h = data.sectionHeaders;

  useEffect(() => { document.title = 'Gonomukti — Empowering Coastal Communities'; }, []);

  return (
    <>
      <HeroSlider banners={data.banners} />
      <ImpactHighlights items={data.impactHighlights} />
      <BriefAbout data={data.briefAbout} header={h.briefAbout} />
      <FocusAreas areas={data.focusAreas} header={h.focusAreas} />
      <FeaturedProjects projects={data.projects} header={h.featuredProjects} />
      <SuccessStory story={data.successStory} header={h.successStory} />
      <DirectorMessage director={data.directorMessage} header={h.directorMessage} />
      <KeyMilestones milestones={data.milestones} header={h.milestones} />
      <PartnersStrip partners={data.partners} alliancesText={data.alliancesText} header={h.partners} />
      <GalleryPreview items={data.galleryItems} header={h.gallery} />
      <DonateBand donate={data.donate} />
    </>
  );
}
