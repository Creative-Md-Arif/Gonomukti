import { useEffect, useState } from "react";
import { publicApi } from "@/services/api";
import { iconMap } from "@/components/admin/adminConfig";
import {
  banners as staticBanners,
  impactHighlights as staticImpact,
  briefAbout as staticBriefAbout,
  focusAreas as staticFocusAreas,
  projects as staticProjects,
  milestones as staticMilestones,
  successStory as staticStory,
  directorMessage as staticDirector,
  historyText as staticHistory,
  timeline as staticTimeline,
  vision as staticVision,
  mission as staticMission,
  values as staticValues,
  leadershipIntro as staticLeadershipIntro,
  leaders as staticLeaders,
  partners as staticPartners,
  alliancesText as staticAlliances,
  galleryItems as staticGallery,
  donate as staticDonate,
  contact as staticContact,
  registrationText as staticReg,
  socialLinks as staticSocial,
  footerAbout as staticFooterAbout,
} from "@/data/content";
import type { LucideIcon } from "lucide-react";

interface RawItem {
  [key: string]: unknown;
}

export interface FocusAreaItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ImpactHighlightItem {
  value: number;
  suffix: string;
  label: string;
}

export interface SectionHeader {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export interface PageBanners {
  about: string;
  projects: string;
  gallery: string;
  contact: string;
}

export interface SiteData {
  banners: typeof staticBanners;
  settings: Record<string, unknown> | null;
  logoLight: string;
  logoDark: string;
  favicon: string;
  impactHighlights: ImpactHighlightItem[];
  briefAbout: typeof staticBriefAbout;
  focusAreas: FocusAreaItem[];
  projects: typeof staticProjects;
  milestones: typeof staticMilestones;
  successStory: typeof staticStory;
  directorMessage: typeof staticDirector;
  historyText: typeof staticHistory;
  timeline: typeof staticTimeline;
  vision: string;
  mission: string;
  values: typeof staticValues;
  leadershipIntro: string;
  leaders: typeof staticLeaders;
  partners: typeof staticPartners;
  alliancesText: string;
  galleryItems: typeof staticGallery;
  donate: typeof staticDonate;
  contact: typeof staticContact;
  registrationText: string;
  socialLinks: typeof staticSocial;
  footerAbout: string;
  loading: boolean;
  sectionHeaders: Record<string, SectionHeader>;
  pageBanners: PageBanners;
}

/* ====== Cache (logo/ডেটা flash ফিক্স) ====== */
const CACHE_KEY = "gonomukti_site_cache_v1";

interface CachedRaw {
  settings?: Record<string, unknown>;
  banners?: RawItem[];
  projects?: RawItem[];
  leaders?: RawItem[];
  partners?: RawItem[];
  milestones?: RawItem[];
  stories?: RawItem[];
  gallery?: RawItem[];
  focusAreas?: RawItem[];
  impactHighlights?: RawItem[];
}

function readCache(): CachedRaw | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as CachedRaw;
    return null;
  } catch {
    return null;
  }
}

function writeCache(payload: CachedRaw) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    /* quota exceeded — ignore */
  }
}

function safeStr(val: unknown, fallback: string): string {
  return typeof val === "string" && val ? val : fallback;
}

function safeNum(val: unknown, fallback: number): number {
  return typeof val === "number" && !isNaN(val) ? val : fallback;
}

function safeArr<T>(val: unknown, fallback: T[]): T[] {
  return Array.isArray(val) && val.length ? val : fallback;
}

/* ====== Pure mappers (fetch ও cache — দুই জায়গাতেই একই লজিক) ====== */
type BannerItem = (typeof staticBanners)[number];
type ProjectItem = (typeof staticProjects)[number];
type LeaderItem = (typeof staticLeaders)[number];
type PartnerItem = (typeof staticPartners)[number];
type MilestoneItem = (typeof staticMilestones)[number];
type GalleryItemType = (typeof staticGallery)[number];

function mapBanner(b: RawItem): BannerItem {
  return {
    title: safeStr(b.title, ""),
    subtitle: safeStr(b.subtitle, ""),
    image: safeStr(b.image, ""),
    ctaText: safeStr(b.ctaText, "Learn More"),
    ctaLink: safeStr(b.ctaLink, "/projects"),
    order: safeNum(b.order, 0),
  };
}

function mapProject(p: RawItem): ProjectItem {
  return {
    slug: safeStr(p.slug, ""),
    title: safeStr(p.title, ""),
    icon: iconMap[safeStr(p.icon, "Heart")] || staticProjects[0].icon,
    focus: safeStr(p.focus, ""),
    activities: safeArr(p.activities, []),
    coverImage: safeStr(p.coverImage, ""),
    gallery: safeArr(p.gallery, []),
    isFeatured: Boolean(p.isFeatured),
  };
}

function mapLeader(l: RawItem): LeaderItem {
  return {
    name: safeStr(l.name, ""),
    designation: safeStr(l.designation, ""),
    specialization: safeStr(l.specialization, ""),
    photo: safeStr(l.photo, ""),
  };
}

function mapPartner(p: RawItem): PartnerItem {
  return {
    name: safeStr(p.name, ""),
    role: safeStr(p.role, ""),
    type: safeStr(p.type, "institutional") as "institutional" | "alliance",
  };
}

function mapMilestone(m: RawItem): MilestoneItem {
  return {
    value: safeNum(m.value, 0),
    suffix: safeStr(m.suffix, "+"),
    label: safeStr(m.label, ""),
  };
}

function mapGalleryItem(g: RawItem): GalleryItemType {
  return {
    image: safeStr(g.image, ""),
    caption: safeStr(g.caption, ""),
    category: safeStr(g.category, "health") as
      | "health"
      | "wash"
      | "livelihoods"
      | "gender-youth",
  };
}

function mapFocusArea(f: RawItem): FocusAreaItem {
  return {
    title: safeStr(f.title, ""),
    description: safeStr(f.description, ""),
    icon: iconMap[safeStr(f.icon, "Heart")] || staticFocusAreas[0].icon,
  };
}

function mapHighlight(h: RawItem): ImpactHighlightItem {
  return {
    value: safeNum(h.value, 0),
    suffix: safeStr(h.suffix, "+"),
    label: safeStr(h.label, ""),
  };
}

const defaultSectionHeaders: Record<string, SectionHeader> = {
  briefAbout: {
    eyebrow: "Who We Are",
    title: "A Grassroots Movement for Coastal Bangladesh",
  },
  focusAreas: {
    eyebrow: "What We Do",
    title: "Core Focus Areas",
    subtitle:
      "Addressing the most pressing challenges facing coastal communities through integrated, community-driven solutions.",
  },
  featuredProjects: {
    eyebrow: "Our Work",
    title: "Featured Projects",
    subtitle:
      "Four flagship programs driving measurable change across health, water, livelihoods, and gender equity.",
  },
  successStory: {
    eyebrow: "Impact Story",
    title: "Transforming Lives on the Ground",
  },
  directorMessage: {
    eyebrow: "Leadership",
    title: "Message from the Executive Director",
  },
  milestones: {
    eyebrow: "Our Impact",
    title: "Key Milestones",
    subtitle:
      "Measurable outcomes from two decades of dedicated community work in coastal Bangladesh.",
  },
  partners: {
    eyebrow: "Network & Compliance",
    title: "Partners, Donors & Alliances",
    subtitle:
      "Working alongside government institutions and regional networks to maximize grassroots impact.",
  },
  gallery: {
    eyebrow: "Moments",
    title: "Gallery Preview",
    subtitle: "Glimpses from our field operations across coastal Khulna.",
  },
  impact: {
    eyebrow: "Our Reach",
    title: "Impact at a Glance",
    subtitle: "Two decades of measurable change across coastal Bangladesh.",
  },
};

const defaultPageBanners: PageBanners = {
  about:
    "https://images.pexels.com/photos/27000889/pexels-photo-27000889.jpeg?auto=compress&cs=tinysrgb&w=1920",
  projects:
    "https://images.pexels.com/photos/32863487/pexels-photo-32863487.jpeg?auto=compress&cs=tinysrgb&w=1920",
  gallery:
    "https://images.pexels.com/photos/35188819/pexels-photo-35188819.jpeg?auto=compress&cs=tinysrgb&w=1920",
  contact:
    "https://images.pexels.com/photos/37112374/pexels-photo-37112374.jpeg?auto=compress&cs=tinysrgb&w=1920",
};

export function useSiteData(): SiteData {
  // ✅ Cache-first: প্রথম render-এই শেষ জানা ডেটা — static flash নেই
  const [cached] = useState<CachedRaw | null>(readCache);

  const [settings, setSettings] = useState<Record<string, unknown> | null>(
    cached?.settings ?? null,
  );
  const [banners, setBanners] = useState<BannerItem[]>(() =>
    cached?.banners?.length ? cached.banners.map(mapBanner) : staticBanners,
  );
  const [projects, setProjects] = useState<ProjectItem[]>(() =>
    cached?.projects?.length ? cached.projects.map(mapProject) : staticProjects,
  );
  const [leaders, setLeaders] = useState<LeaderItem[]>(() =>
    cached?.leaders?.length ? cached.leaders.map(mapLeader) : staticLeaders,
  );
  const [partners, setPartners] = useState<PartnerItem[]>(() =>
    cached?.partners?.length ? cached.partners.map(mapPartner) : staticPartners,
  );
  const [milestones, setMilestones] = useState<MilestoneItem[]>(() =>
    cached?.milestones?.length
      ? cached.milestones.map(mapMilestone)
      : staticMilestones,
  );
  const [stories, setStories] = useState<RawItem[]>(cached?.stories ?? []);
  const [gallery, setGallery] = useState<GalleryItemType[]>(() =>
    cached?.gallery?.length
      ? cached.gallery.map(mapGalleryItem)
      : staticGallery,
  );
  const [focusAreas, setFocusAreas] = useState<FocusAreaItem[]>(() =>
    cached?.focusAreas?.length
      ? cached.focusAreas.map(mapFocusArea)
      : staticFocusAreas,
  );
  const [impactHighlights, setImpactHighlights] = useState<
    ImpactHighlightItem[]
  >(() =>
    cached?.impactHighlights?.length
      ? cached.impactHighlights.map(mapHighlight)
      : staticImpact,
  );
  // ✅ Cache থাকলে skeleton ছাড়াই সাথে সাথে content
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const results = await Promise.allSettled([
          publicApi.getSettings(),
          publicApi.getBanners(),
          publicApi.getProjects(),
          publicApi.getLeaders(),
          publicApi.getPartners(),
          publicApi.getImpact(),
          publicApi.getGallery(),
          publicApi.getFocusAreas(),
          publicApi.getImpactHighlights(),
        ]);

        if (!mounted) return;

        const [
          settingsRes,
          bannersRes,
          projectsRes,
          leadersRes,
          partnersRes,
          impactRes,
          galleryRes,
          focusRes,
          highlightsRes,
        ] = results;

        const payload: CachedRaw = {};

        if (settingsRes.status === "fulfilled" && settingsRes.value.data) {
          const s = settingsRes.value.data as Record<string, unknown>;
          setSettings(s);
          payload.settings = s;
        }
        if (
          bannersRes.status === "fulfilled" &&
          Array.isArray(bannersRes.value.data) &&
          (bannersRes.value.data as RawItem[]).length
        ) {
          const raw = bannersRes.value.data as RawItem[];
          setBanners(raw.map(mapBanner));
          payload.banners = raw;
        }
        if (
          projectsRes.status === "fulfilled" &&
          Array.isArray(projectsRes.value.data) &&
          (projectsRes.value.data as RawItem[]).length
        ) {
          const raw = projectsRes.value.data as RawItem[];
          setProjects(raw.map(mapProject));
          payload.projects = raw;
        }
        if (
          leadersRes.status === "fulfilled" &&
          Array.isArray(leadersRes.value.data) &&
          (leadersRes.value.data as RawItem[]).length
        ) {
          const raw = leadersRes.value.data as RawItem[];
          setLeaders(raw.map(mapLeader));
          payload.leaders = raw;
        }
        if (
          partnersRes.status === "fulfilled" &&
          Array.isArray(partnersRes.value.data) &&
          (partnersRes.value.data as RawItem[]).length
        ) {
          const raw = partnersRes.value.data as RawItem[];
          setPartners(raw.map(mapPartner));
          payload.partners = raw;
        }
        if (impactRes.status === "fulfilled" && impactRes.value.data) {
          const data = impactRes.value.data as {
            milestones: RawItem[];
            stories: RawItem[];
          };
          if (Array.isArray(data.milestones) && data.milestones.length) {
            setMilestones(data.milestones.map(mapMilestone));
            payload.milestones = data.milestones;
          }
          if (Array.isArray(data.stories)) {
            setStories(data.stories);
            payload.stories = data.stories;
          }
        }
        if (
          galleryRes.status === "fulfilled" &&
          Array.isArray(galleryRes.value.data) &&
          (galleryRes.value.data as RawItem[]).length
        ) {
          const raw = galleryRes.value.data as RawItem[];
          setGallery(raw.map(mapGalleryItem));
          payload.gallery = raw;
        }
        if (
          focusRes.status === "fulfilled" &&
          Array.isArray(focusRes.value.data) &&
          (focusRes.value.data as RawItem[]).length
        ) {
          const raw = focusRes.value.data as RawItem[];
          setFocusAreas(raw.map(mapFocusArea));
          payload.focusAreas = raw;
        }
        if (
          highlightsRes.status === "fulfilled" &&
          Array.isArray(highlightsRes.value.data) &&
          (highlightsRes.value.data as RawItem[]).length
        ) {
          const raw = highlightsRes.value.data as RawItem[];
          setImpactHighlights(raw.map(mapHighlight));
          payload.impactHighlights = raw;
        }

        // ✅ পরের refresh-এর জন্য cache-এ জমা রাখো
        writeCache(payload);
      } catch {
        // fallback to static/cache
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const s = settings || {};
  const story = stories.length
    ? {
        label: safeStr(stories[0].label, staticStory.label),
        title: safeStr(stories[0].title, staticStory.title),
        location: safeStr(stories[0].location, staticStory.location),
        body: safeStr(stories[0].body, staticStory.body),
        image: safeStr(stories[0].image, staticStory.image),
        stats: safeArr(stories[0].stats, staticStory.stats),
        isFeatured: Boolean(stories[0].isFeatured),
      }
    : staticStory;

  const director = (s.directorMessage as Record<string, unknown>) || {};
  const sContact = (s.contact as Record<string, unknown>) || {};
  const sDonate = (s.donate as Record<string, unknown>) || {};
  const sHeaders =
    (s.sectionHeaders as Record<string, Record<string, string>>) || {};
  const sBanners = (s.pageBanners as Record<string, string>) || {};

  const sectionHeaders: Record<string, SectionHeader> = {};
  for (const key of Object.keys(defaultSectionHeaders)) {
    const raw = sHeaders[key];
    sectionHeaders[key] = {
      eyebrow: safeStr(raw?.eyebrow, defaultSectionHeaders[key].eyebrow),
      title: safeStr(raw?.title, defaultSectionHeaders[key].title),
      subtitle:
        raw?.subtitle !== undefined
          ? safeStr(raw.subtitle, "")
          : defaultSectionHeaders[key].subtitle,
    };
  }

  const pageBanners: PageBanners = {
    about: safeStr(sBanners.about, defaultPageBanners.about),
    projects: safeStr(sBanners.projects, defaultPageBanners.projects),
    gallery: safeStr(sBanners.gallery, defaultPageBanners.gallery),
    contact: safeStr(sBanners.contact, defaultPageBanners.contact),
  };

  return {
    banners,
    settings,
    loading,
    logoLight: safeStr(s.logoLight, ""),
    logoDark: safeStr(s.logoDark, ""),
    favicon: safeStr(s.favicon, ""),
    impactHighlights,
    briefAbout: {
      text: safeStr(s.briefAbout, staticBriefAbout.text),
      establishedYear: safeNum(
        s.establishedYear,
        staticBriefAbout.establishedYear,
      ),
      image: safeStr(s.briefAboutImage, staticBriefAbout.image),
    },
    focusAreas,
    projects,
    milestones,
    successStory: story,
    directorMessage: {
      title: safeStr(director.title, staticDirector.title),
      body: safeStr(director.body, staticDirector.body),
      name: safeStr(director.name, staticDirector.name),
      designation: safeStr(director.designation, staticDirector.designation),
      photo: safeStr(director.photo, staticDirector.photo),
    },
    historyText:
      Array.isArray(s.historyText) && s.historyText.length
        ? (s.historyText as string[])
        : staticHistory,
    timeline:
      Array.isArray(s.timeline) && s.timeline.length
        ? (s.timeline as typeof staticTimeline)
        : staticTimeline,
    vision: safeStr(s.vision, staticVision),
    mission: safeStr(s.mission, staticMission),
    values:
      Array.isArray(s.values) && s.values.length
        ? (s.values as typeof staticValues)
        : staticValues,
    leadershipIntro: safeStr(s.leadershipIntro, staticLeadershipIntro),
    leaders,
    partners,
    alliancesText: safeStr(s.alliancesText, staticAlliances),
    galleryItems: gallery,
    donate: {
      title: safeStr(sDonate.title, staticDonate.title),
      text: safeStr(sDonate.text, staticDonate.text),
      subText: safeStr(sDonate.subText, staticDonate.subText),
      buttonText: safeStr(sDonate.buttonText, staticDonate.buttonText),
    },
    contact: {
      address: safeStr(sContact.address, staticContact.address),
      hotline: safeStr(sContact.hotline, staticContact.hotline),
      workingHours: safeStr(sContact.workingHours, staticContact.workingHours),
      emails:
        Array.isArray(sContact.emails) && sContact.emails.length
          ? (sContact.emails as typeof staticContact.emails)
          : staticContact.emails,
      mapEmbedUrl: safeStr(sContact.mapEmbedUrl, staticContact.mapEmbedUrl),
    },
    registrationText: safeStr(s.registrationText, staticReg),
    socialLinks:
      Array.isArray(s.socialLinks) && s.socialLinks.length
        ? (s.socialLinks as typeof staticSocial)
        : staticSocial,
    footerAbout: safeStr(s.footerAbout, staticFooterAbout),
    sectionHeaders,
    pageBanners,
  };
}
