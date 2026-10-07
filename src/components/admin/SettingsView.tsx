import { useState, useEffect, type ReactNode } from "react";
import {
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Waves as WavesIcon,
  Image as ImageIcon,
  LayoutTemplate,
  Info,
  Phone,
  Heart,
  FileImage,
  Heading,
  Settings as SettingsIcon,
} from "lucide-react";
import { adminApi, publicApi } from "@/services/api";
import ImageUploader from "@/components/admin/ImageUploader";

type SettingsTab =
  | "branding"
  | "hero"
  | "about"
  | "director"
  | "contact"
  | "donate"
  | "banners"
  | "headers";

const tabConfig: {
  id: SettingsTab;
  label: string;
  hint: string;
  icon: typeof SettingsIcon;
}[] = [
  {
    id: "branding",
    label: "Logo & Branding",
    hint: "Navbar & footer logos",
    icon: ImageIcon,
  },
  {
    id: "hero",
    label: "Hero Section",
    hint: "Home page headline",
    icon: LayoutTemplate,
  },
  {
    id: "about",
    label: "About & Vision",
    hint: "Story, mission, footer",
    icon: Info,
  },
  {
    id: "director",
    label: "Director Message",
    hint: "Message and photo",
    icon: SettingsIcon,
  },
  {
    id: "contact",
    label: "Contact Info",
    hint: "Address, phone, hours",
    icon: Phone,
  },
  {
    id: "donate",
    label: "Donate Section",
    hint: "Donation call-to-action",
    icon: Heart,
  },
  {
    id: "banners",
    label: "Page Banners",
    hint: "Top image of each page",
    icon: FileImage,
  },
  {
    id: "headers",
    label: "Section Headers",
    hint: "Home section titles",
    icon: Heading,
  },
];

const inputClass =
  "w-full min-w-0 rounded-xl border border-sand-200 bg-sand-50/40 px-3.5 py-2.5 text-sm text-ocean-900 placeholder:text-ocean-300 transition-all duration-200 hover:border-ocean-200 focus:outline-none focus:bg-white focus:border-ocean-400 focus:ring-4 focus:ring-ocean-400/15";
const labelClass = "block text-[13px] font-semibold text-ocean-800 mb-1.5";
const subLabelClass = "block text-xs font-medium text-ocean-500 mb-1";
const noScrollbar = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
const panelClass =
  "min-w-0 rounded-2xl border border-sand-200 bg-sand-50/30 p-3.5 sm:p-5";

function SectionCard({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: typeof SettingsIcon;
  title: string;
  desc?: string;
  children: ReactNode;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-white rounded-2xl sm:rounded-3xl border border-sand-100 shadow-[0_8px_30px_-12px_rgba(2,44,74,0.12)]">
      <div className="h-1 bg-gradient-to-r from-coral-500 via-gold-400 to-coral-500" />
      <div className="p-4 sm:p-6 xl:p-8">
        <header className="flex items-start gap-3 mb-5 sm:mb-7 pb-5 sm:pb-6 border-b border-sand-100">
          <span className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-ocean-600 to-ocean-800 text-white flex items-center justify-center shadow-md shadow-ocean-600/25">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          <div className="min-w-0">
            <h3 className="font-serif text-lg sm:text-2xl font-semibold text-ocean-950 leading-tight">
              {title}
            </h3>
            {desc && (
              <p className="text-xs sm:text-sm text-ocean-500 mt-1 leading-relaxed">
                {desc}
              </p>
            )}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-w-0 ${className}`}>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

export default function SettingsView() {
  const [settings, setSettings] = useState<Record<string, unknown> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<SettingsTab>("branding");

  useEffect(() => {
    (async () => {
      try {
        const res = await publicApi.getSettings();
        setSettings(res.data as Record<string, unknown>);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load settings",
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      await adminApi.updateSettings(settings || {});
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const update = (path: string, value: unknown) => {
    setSettings((prev) => {
      if (!prev) return prev;
      const keys = path.split(".");
      const updated = { ...prev };
      let cursor: Record<string, unknown> = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        cursor[keys[i]] = { ...(cursor[keys[i]] as Record<string, unknown>) };
        cursor = cursor[keys[i]] as Record<string, unknown>;
      }
      cursor[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-ocean-400 animate-spin" />
      </div>
    );
  }

  const dm = settings?.directorMessage as Record<string, unknown>;
  const contact = settings?.contact as Record<string, unknown>;
  const donate = settings?.donate as Record<string, unknown>;
  const sh = settings?.sectionHeaders as Record<string, Record<string, string>>;

  return (
    <div className="w-full min-w-0">
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl bg-coral-50 border border-coral-200 px-4 py-3 mb-4"
        >
          <AlertCircle className="h-5 w-5 text-coral-600 shrink-0 mt-0.5" />
          <p className="text-sm text-coral-800 break-words min-w-0">{error}</p>
        </div>
      )}
      {success && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-2xl bg-green-50 border border-green-200 px-4 py-3 mb-4"
        >
          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
          <span className="text-sm text-green-800">
            Settings saved successfully.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[290px_minmax(0,1fr)] gap-4 lg:gap-6 items-start">
        {/* Tab navigation: horizontal scroll on small screens, vertical rail on desktop */}
        <aside className="relative min-w-0 lg:sticky lg:top-6">
          <div className="rounded-2xl bg-white border border-sand-100 shadow-sm p-1.5 lg:p-3">
            <div className="hidden lg:block px-3 pt-2 pb-3 mb-2 border-b border-sand-100">
              <p className="font-serif text-lg font-semibold text-ocean-950">
                Site Settings
              </p>
              <p className="text-xs text-ocean-500 mt-0.5">
                Manage content shown across the website.
              </p>
            </div>
            <div
              role="tablist"
              className={`flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible snap-x ${noScrollbar}`}
            >
              {tabConfig.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={(e) => {
                      setActiveTab(tab.id);
                      e.currentTarget.scrollIntoView({
                        inline: "center",
                        block: "nearest",
                        behavior: "smooth",
                      });
                    }}
                    className={`snap-center shrink-0 lg:shrink lg:w-full whitespace-nowrap flex items-center gap-3 rounded-xl px-3.5 py-2.5 lg:py-3 text-left text-[13px] lg:text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                      isActive
                        ? "bg-gradient-to-br from-ocean-600 to-ocean-800 text-white shadow-md shadow-ocean-600/25"
                        : "text-ocean-600 hover:bg-ocean-50 hover:text-ocean-800"
                    }`}
                  >
                    <span
                      className={`shrink-0 w-8 h-8 rounded-lg hidden lg:flex items-center justify-center transition-colors ${
                        isActive ? "bg-white/15" : "bg-sand-100"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <Icon className="h-4 w-4 shrink-0 lg:hidden" />
                    <span className="min-w-0 flex flex-col">
                      <span className="leading-tight">{tab.label}</span>
                      <span
                        className={`hidden lg:block text-[11px] font-normal mt-0.5 truncate ${isActive ? "text-white/70" : "text-ocean-400"}`}
                      >
                        {tab.hint}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 rounded-r-2xl bg-gradient-to-l from-white to-transparent lg:hidden" />
        </aside>

        {/* Content */}
        <div className="min-w-0 space-y-5">
          {activeTab === "branding" && (
            <SectionCard
              icon={ImageIcon}
              title="Logo & Branding"
              desc="Upload logos for the navbar and footer. If not uploaded, the default Waves icon is used."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className={panelClass}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0">
                      <label className={`${labelClass} !mb-0.5`}>
                        Light Logo
                      </label>
                      <p className="text-xs text-ocean-400">
                        Used on transparent navbar (over images)
                      </p>
                    </div>
                    {(settings?.logoLight as string) && (
                      <button
                        type="button"
                        onClick={() => update("logoLight", "")}
                        className="shrink-0 rounded-lg px-2 py-1 text-xs text-coral-600 hover:bg-coral-50 hover:text-coral-700 font-semibold transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="rounded-xl overflow-hidden border border-ocean-900 bg-gradient-to-br from-ocean-950 to-ocean-900 p-4 flex items-center justify-center min-h-[96px]">
                    {settings?.logoLight ? (
                      <img
                        src={(settings?.logoLight as string) || ""}
                        alt="Light logo"
                        className="max-h-16 max-w-full w-auto object-contain"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-sand-100/40 text-xs">
                        <WavesIcon className="h-5 w-5" />
                        <span>No logo uploaded</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 min-w-0">
                    <ImageUploader
                      value={(settings?.logoLight as string) || ""}
                      onChange={(url) => update("logoLight", url)}
                      folder="logos"
                    />
                  </div>
                </div>

                <div className={panelClass}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0">
                      <label className={`${labelClass} !mb-0.5`}>
                        Dark Logo
                      </label>
                      <p className="text-xs text-ocean-400">
                        Used on solid navbar & footer
                      </p>
                    </div>
                    {(settings?.logoDark as string) && (
                      <button
                        type="button"
                        onClick={() => update("logoDark", "")}
                        className="shrink-0 rounded-lg px-2 py-1 text-xs text-coral-600 hover:bg-coral-50 hover:text-coral-700 font-semibold transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="rounded-xl overflow-hidden border border-sand-200 bg-white p-4 flex items-center justify-center min-h-[96px]">
                    {settings?.logoDark ? (
                      <img
                        src={(settings?.logoDark as string) || ""}
                        alt="Dark logo"
                        className="max-h-16 max-w-full w-auto object-contain"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-ocean-300 text-xs">
                        <WavesIcon className="h-5 w-5" />
                        <span>No logo uploaded</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 min-w-0">
                    <ImageUploader
                      value={(settings?.logoDark as string) || ""}
                      onChange={(url) => update("logoDark", url)}
                      folder="logos"
                    />
                  </div>
                </div>
              </div>
            </SectionCard>
          )}

          {activeTab === "hero" && (
            <SectionCard
              icon={LayoutTemplate}
              title="Hero Section"
              desc="The first thing visitors see on the Home page."
            >
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                <Field label="Hero Headline">
                  <input
                    className={inputClass}
                    value={(settings?.heroHeadline as string) || ""}
                    onChange={(e) => update("heroHeadline", e.target.value)}
                  />
                </Field>
                <Field label="Hero Subheadline">
                  <textarea
                    rows={2}
                    className={inputClass}
                    value={(settings?.heroSubheadline as string) || ""}
                    onChange={(e) => update("heroSubheadline", e.target.value)}
                  />
                </Field>
              </div>
            </SectionCard>
          )}

          {activeTab === "about" && (
            <SectionCard
              icon={Info}
              title="About & Vision"
              desc="Organisation story, vision, mission and footer text."
            >
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,340px)] gap-4 sm:gap-6">
                  <div className="space-y-4 sm:space-y-6 min-w-0">
                    <Field label="Brief About">
                      <textarea
                        rows={5}
                        className={inputClass}
                        value={(settings?.briefAbout as string) || ""}
                        onChange={(e) => update("briefAbout", e.target.value)}
                      />
                    </Field>
                    <Field label="Established Year">
                      <input
                        type="number"
                        inputMode="numeric"
                        className={inputClass}
                        value={(settings?.establishedYear as number) || 2006}
                        onChange={(e) =>
                          update("establishedYear", Number(e.target.value))
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Brief About Image">
                    <ImageUploader
                      value={(settings?.briefAboutImage as string) || ""}
                      onChange={(url) => update("briefAboutImage", url)}
                      folder="about"
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Field label="Vision">
                    <textarea
                      rows={3}
                      className={inputClass}
                      value={(settings?.vision as string) || ""}
                      onChange={(e) => update("vision", e.target.value)}
                    />
                  </Field>
                  <Field label="Mission">
                    <textarea
                      rows={3}
                      className={inputClass}
                      value={(settings?.mission as string) || ""}
                      onChange={(e) => update("mission", e.target.value)}
                    />
                  </Field>
                  <Field label="Leadership Intro">
                    <textarea
                      rows={3}
                      className={inputClass}
                      value={(settings?.leadershipIntro as string) || ""}
                      onChange={(e) =>
                        update("leadershipIntro", e.target.value)
                      }
                    />
                  </Field>
                  <Field label="Alliances Text">
                    <textarea
                      rows={3}
                      className={inputClass}
                      value={(settings?.alliancesText as string) || ""}
                      onChange={(e) => update("alliancesText", e.target.value)}
                    />
                  </Field>
                </div>
                <div className="border-t border-sand-100 pt-4 sm:pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Field label="Footer About Text">
                    <textarea
                      rows={2}
                      className={inputClass}
                      value={(settings?.footerAbout as string) || ""}
                      onChange={(e) => update("footerAbout", e.target.value)}
                    />
                  </Field>
                  <Field label="Registration Text">
                    <input
                      className={inputClass}
                      value={(settings?.registrationText as string) || ""}
                      onChange={(e) =>
                        update("registrationText", e.target.value)
                      }
                    />
                  </Field>
                </div>
              </div>
            </SectionCard>
          )}

          {activeTab === "director" && (
            <SectionCard
              icon={SettingsIcon}
              title="Director Message"
              desc="Message and photo shown in the Director section."
            >
              <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,340px)] gap-4 sm:gap-6">
                <div className="space-y-4 sm:space-y-6 min-w-0">
                  <Field label="Director Message Title">
                    <input
                      className={inputClass}
                      value={(dm?.title as string) || ""}
                      onChange={(e) =>
                        update("directorMessage.title", e.target.value)
                      }
                    />
                  </Field>
                  <Field label="Director Message Body">
                    <textarea
                      rows={8}
                      className={inputClass}
                      value={(dm?.body as string) || ""}
                      onChange={(e) =>
                        update("directorMessage.body", e.target.value)
                      }
                    />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <Field label="Director Name">
                      <input
                        className={inputClass}
                        value={(dm?.name as string) || ""}
                        onChange={(e) =>
                          update("directorMessage.name", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Director Designation">
                      <input
                        className={inputClass}
                        value={(dm?.designation as string) || ""}
                        onChange={(e) =>
                          update("directorMessage.designation", e.target.value)
                        }
                      />
                    </Field>
                  </div>
                </div>
                <Field label="Director Photo">
                  <ImageUploader
                    value={(dm?.photo as string) || ""}
                    onChange={(url) => update("directorMessage.photo", url)}
                    folder="team"
                  />
                </Field>
              </div>
            </SectionCard>
          )}

          {activeTab === "contact" && (
            <SectionCard
              icon={Phone}
              title="Contact Info"
              desc="Shown on the Contact page and in the footer."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Field label="Address" className="md:col-span-2">
                  <textarea
                    rows={3}
                    className={inputClass}
                    value={(contact?.address as string) || ""}
                    onChange={(e) => update("contact.address", e.target.value)}
                  />
                </Field>
                <Field label="Hotline">
                  <input
                    className={inputClass}
                    inputMode="tel"
                    value={(contact?.hotline as string) || ""}
                    onChange={(e) => update("contact.hotline", e.target.value)}
                  />
                </Field>
                <Field label="Working Hours">
                  <input
                    className={inputClass}
                    value={(contact?.workingHours as string) || ""}
                    onChange={(e) =>
                      update("contact.workingHours", e.target.value)
                    }
                  />
                </Field>
              </div>
            </SectionCard>
          )}

          {activeTab === "donate" && (
            <SectionCard
              icon={Heart}
              title="Donate Section"
              desc="Call-to-action text for donations and partnerships."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Field label="Donate Title">
                  <input
                    className={inputClass}
                    value={(donate?.title as string) || ""}
                    onChange={(e) => update("donate.title", e.target.value)}
                  />
                </Field>
                <Field label="Donate Button Text">
                  <input
                    className={inputClass}
                    value={(donate?.buttonText as string) || ""}
                    onChange={(e) =>
                      update("donate.buttonText", e.target.value)
                    }
                  />
                </Field>
                <Field label="Donate Text" className="md:col-span-2">
                  <textarea
                    rows={3}
                    className={inputClass}
                    value={(donate?.text as string) || ""}
                    onChange={(e) => update("donate.text", e.target.value)}
                  />
                </Field>
                <Field label="Donate Sub Text" className="md:col-span-2">
                  <input
                    className={inputClass}
                    value={(donate?.subText as string) || ""}
                    onChange={(e) => update("donate.subText", e.target.value)}
                  />
                </Field>
              </div>
            </SectionCard>
          )}

          {activeTab === "banners" && (
            <SectionCard
              icon={FileImage}
              title="Page Banner Images"
              desc="Banner images for the top of each page."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {(["about", "projects", "gallery", "contact"] as const).map(
                  (page) => (
                    <div key={page} className={panelClass}>
                      <label className={labelClass}>
                        {page.charAt(0).toUpperCase() + page.slice(1)} Page
                        Banner
                      </label>
                      <ImageUploader
                        value={
                          (settings?.pageBanners as Record<string, string>)?.[
                            page
                          ] || ""
                        }
                        onChange={(url) => update(`pageBanners.${page}`, url)}
                        folder="banners"
                      />
                    </div>
                  ),
                )}
              </div>
            </SectionCard>
          )}

          {activeTab === "headers" && (
            <SectionCard
              icon={Heading}
              title="Home Page Section Headers"
              desc="Control the eyebrow, title, and subtitle text for each section on the Home page."
            >
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                {(
                  [
                    "briefAbout",
                    "focusAreas",
                    "featuredProjects",
                    "successStory",
                    "directorMessage",
                    "milestones",
                    "partners",
                    "gallery",
                  ] as const
                ).map((section) => (
                  <div key={section} className={panelClass}>
                    <p className="text-sm font-semibold text-ocean-900 capitalize mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-coral-500 to-gold-400" />
                      {section.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className={subLabelClass}>Eyebrow</label>
                        <input
                          className={inputClass}
                          value={sh?.[section]?.eyebrow || ""}
                          onChange={(e) =>
                            update(
                              `sectionHeaders.${section}.eyebrow`,
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className={subLabelClass}>Title</label>
                        <input
                          className={inputClass}
                          value={sh?.[section]?.title || ""}
                          onChange={(e) =>
                            update(
                              `sectionHeaders.${section}.title`,
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      {(
                        [
                          "focusAreas",
                          "featuredProjects",
                          "milestones",
                          "partners",
                          "gallery",
                        ] as string[]
                      ).includes(section) && (
                        <div>
                          <label className={subLabelClass}>Subtitle</label>
                          <textarea
                            rows={2}
                            className={inputClass}
                            value={sh?.[section]?.subtitle || ""}
                            onChange={(e) =>
                              update(
                                `sectionHeaders.${section}.subtitle`,
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* Sticky save bar */}
          <div className="sticky bottom-3 sm:bottom-4 z-20">
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/85 backdrop-blur-md border border-sand-200/70 p-2 pl-4 sm:pl-5 shadow-[0_10px_40px_-12px_rgba(2,44,74,0.3)]">
              <p className="hidden sm:block text-xs text-ocean-500 min-w-0">
                Changes go live across the website after you save.
              </p>
              <button
                onClick={handleSave}
                disabled={saving}
                className="group relative overflow-hidden w-full sm:w-auto sm:ml-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-coral-500 to-coral-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-coral-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-coral-500/40 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                {saving ? (
                  <Loader2 className="relative h-4 w-4 animate-spin" />
                ) : (
                  <Save className="relative h-4 w-4" />
                )}
                <span className="relative">Save Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
