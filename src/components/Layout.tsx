import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Waves,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useSiteData } from "@/hooks/useSiteData";

type NavItem = {
  label: string;
  path: string;
  dropdown?: { label: string; path: string }[];
};

const staticNavLinks = [
  { label: "Home", path: "/" },
  {
    label: "About Us",
    path: "/about/overview",
    dropdown: [
      { label: "Overview & History", path: "/about/overview" },
      { label: "Mission, Vision & Values", path: "/about/mission-vision" },
      { label: "Governing Body & Leadership", path: "/about/leadership" },
      { label: "CEO Speech", path: "/about/ceo-speech" },
    ],
  },
  {
    label: "Projects",
    path: "/projects",
    dropdown: [] as { label: string; path: string }[],
  },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact Us", path: "/contact" },
];

function Logo({
  logoUrl,
  scrolled,
  variant,
}: {
  logoUrl: string;
  scrolled: boolean;
  variant: "light" | "dark";
}) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt="Gonomukti"
        className="h-11 w-auto md:h-12 object-contain transition-all duration-300 drop-shadow-sm"
      />
    );
  }
  return (
    <div className="flex items-center gap-3 shrink-0">
      <div
        className={`relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          variant === "dark"
            ? "bg-gradient-to-br from-ocean-600 to-ocean-800 text-white shadow-lg shadow-ocean-600/25"
            : "bg-white/10 text-white backdrop-blur-md ring-1 ring-white/25"
        } ${scrolled ? "shadow-md" : ""}`}
      >
        <Waves className="h-5 w-5" />
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-coral-500" />
      </div>
      <div className="flex flex-col leading-tight">
        <span
          className={`font-serif text-xl font-semibold tracking-tight ${
            variant === "dark" ? "text-ocean-950" : "text-white"
          } text-shadow-sm transition-colors duration-300`}
        >
          Gonomukti
        </span>
        <span
          className={`text-[9px] uppercase tracking-[0.22em] font-medium ${
            variant === "dark" ? "text-ocean-500" : "text-sand-100/70"
          }`}
        >
          Empowering Coastal Communities
        </span>
      </div>
    </div>
  );
}

function MobileSidebar({
  open,
  onClose,
  navLinks,
  logoUrl,
}: {
  open: boolean;
  onClose: () => void;
  navLinks: NavItem[];
  logoUrl: string;
}) {
  const location = useLocation();
  const data = useSiteData();
  const [expanded, setExpanded] = useState<string | null>(null);

  // Open the section that contains the current page whenever the sidebar opens
  useEffect(() => {
    if (!open) return;
    const active = navLinks.find(
      (l) =>
        l.dropdown &&
        l.dropdown.length > 0 &&
        (location.pathname.startsWith(l.path) ||
          l.dropdown.some((d) => location.pathname.startsWith(d.path))),
    );
    setExpanded(active ? active.label : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Lock body scroll + close on Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={`lg:hidden fixed inset-0 z-[60] ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ocean-950/60 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sidebar panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute top-0 left-0 h-full w-[86%] max-w-[360px] flex flex-col overflow-hidden bg-gradient-to-b from-ocean-950 via-ocean-900 to-ocean-950 shadow-[20px_0_60px_-10px_rgba(2,20,40,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* decorative */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-coral-500/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 -left-24 w-64 h-64 rounded-full bg-ocean-600/25 blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-coral-500 via-gold-400 to-coral-500" />

        {/* Header */}
        <div className="relative flex items-center justify-between gap-3 px-5 pt-6 pb-5 border-b border-white/10">
          <Link to="/" onClick={onClose} className="shrink-0">
            <Logo logoUrl={logoUrl} scrolled={false} variant="light" />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/90 hover:bg-coral-500 hover:border-coral-500 active:scale-90 transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="relative flex-1 overflow-y-auto overscroll-contain px-4 py-5">
          <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-sand-100/40">
            Menu
          </p>
          <ul className="space-y-1.5">
            {navLinks.map((link, i) => {
              const hasSub = !!link.dropdown && link.dropdown.length > 0;
              const isOpen = expanded === link.label;
              return (
                <li
                  key={link.label}
                  style={{
                    transitionDelay: open ? `${120 + i * 55}ms` : "0ms",
                  }}
                  className={`transition-all duration-500 ${
                    open
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-6"
                  }`}
                >
                  <div className="flex items-stretch gap-1.5">
                    <NavLink
                      to={link.path}
                      end={link.path === "/"}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group relative flex-1 flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-coral-500/20 to-transparent text-coral-300"
                            : "text-white/85 hover:bg-white/5 hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full bg-gradient-to-b from-coral-400 to-gold-400 transition-all duration-300 ${
                              isActive ? "h-6 opacity-100" : "h-0 opacity-0"
                            }`}
                          />
                          <span className="font-serif tracking-tight">
                            {link.label}
                          </span>
                        </>
                      )}
                    </NavLink>
                    {hasSub && (
                      <button
                        onClick={() => setExpanded(isOpen ? null : link.label)}
                        aria-label={`Toggle ${link.label}`}
                        aria-expanded={isOpen}
                        className={`w-12 shrink-0 rounded-xl flex items-center justify-center border transition-all duration-200 active:scale-95 ${
                          isOpen
                            ? "bg-coral-500/15 border-coral-500/30 text-coral-300"
                            : "bg-white/5 border-white/10 text-white/70 hover:text-white"
                        }`}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {hasSub && (
                    <div
                      className={`grid transition-all duration-400 ease-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 mt-1.5"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <ul className="overflow-hidden ml-6 border-l border-white/10 space-y-0.5">
                        {link.dropdown!.map((item) => (
                          <li key={item.path}>
                            <NavLink
                              to={item.path}
                              onClick={onClose}
                              className={({ isActive }) =>
                                `flex items-center gap-2.5 pl-4 pr-3 py-2.5 ml-1 text-sm rounded-lg transition-colors ${
                                  isActive
                                    ? "text-coral-300 font-semibold bg-white/5"
                                    : "text-sand-100/70 hover:text-white hover:bg-white/5"
                                }`
                              }
                            >
                              <span className="w-1 h-1 rounded-full bg-coral-400/80 shrink-0" />
                              <span className="leading-snug">{item.label}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer: CTA + contact */}
        <div
          style={{ transitionDelay: open ? "420ms" : "0ms" }}
          className={`relative px-5 pt-5 pb-6 border-t border-white/10 bg-ocean-950/60 backdrop-blur-md transition-all duration-500 ${
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            to="/contact"
            onClick={onClose}
            className="group relative overflow-hidden flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-coral-500/25 hover:shadow-xl hover:shadow-coral-500/40 transition-all duration-300"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <span className="relative">Donate / Partner With Us</span>
            <ArrowRight className="relative h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

          <div className="mt-4 space-y-2.5 text-xs text-sand-100/65">
            {data.contact.hotline && (
              <a
                href={`tel:${data.contact.hotline}`}
                className="flex items-center gap-2.5 hover:text-coral-400 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-coral-400 shrink-0" />
                {data.contact.hotline}
              </a>
            )}
            {data.contact.emails.length > 0 && (
              <a
                href={`mailto:${data.contact.emails[0].email}`}
                className="flex items-center gap-2.5 hover:text-coral-400 transition-colors break-all"
              >
                <Mail className="h-3.5 w-3.5 text-coral-400 shrink-0" />
                {data.contact.emails[0].email}
              </a>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();
  const data = useSiteData();

  const navLinks = staticNavLinks.map((link) => {
    if (link.label === "Projects" && data.projects.length) {
      return {
        ...link,
        dropdown: data.projects.map((p) => ({
          label: p.title,
          path: `/projects/${p.slug}`,
        })),
      };
    }
    return link;
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
  }, [location.pathname]);

  const logoUrl = scrolled ? data.logoDark || data.logoLight : data.logoLight;
  // The sidebar has a dark background, so prefer the light logo there
  const sidebarLogoUrl = data.logoLight || data.logoDark;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-solid shadow-[0_10px_40px_-15px_rgba(2,44,74,0.25)] py-2"
            : "bg-gradient-to-b from-ocean-950/60 via-ocean-950/25 to-transparent py-4"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
          <Link to="/" className="shrink-0">
            <Logo
              logoUrl={logoUrl}
              scrolled={scrolled}
              variant={scrolled ? "dark" : "light"}
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-2.5">
            {navLinks.map((link) => (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.dropdown &&
                  link.dropdown.length &&
                  setDropdownOpen(link.label)
                }
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `peer relative px-3 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] rounded-lg transition-all duration-200 ${
                      scrolled
                        ? isActive
                          ? "text-coral-600"
                          : "text-ocean-800 hover:text-coral-600"
                        : isActive
                          ? "text-coral-300"
                          : "text-white/90 hover:text-white text-shadow-sm"
                    }`
                  }
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.dropdown && link.dropdown.length > 0 && (
                      <ChevronDown
                        className={`h-3 w-3 transition-transform duration-300 ${
                          dropdownOpen === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </span>
                </NavLink>

                <span
                  className={`pointer-events-none absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-coral-500 to-gold-400 origin-center scale-x-0 transition-transform duration-300 peer-hover:scale-x-100 peer-aria-current:scale-x-100 ${
                    dropdownOpen === link.label ? "scale-x-100" : ""
                  }`}
                />

                {link.dropdown &&
                  link.dropdown.length > 0 &&
                  dropdownOpen === link.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 animate-slide-down z-50">
                      <div className="relative glass-solid rounded-2xl shadow-2xl shadow-ocean-950/10 py-2.5 min-w-[280px] border border-sand-200/60 overflow-hidden">
                        <div className="absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-coral-500 via-gold-400 to-coral-500" />
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="group/item flex items-center gap-3 px-5 py-2.5 text-sm text-ocean-700 hover:text-coral-600 hover:bg-coral-50/60 transition-all duration-200 hover:translate-x-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-coral-400 opacity-0 group-hover/item:opacity-100 transition-all duration-200" />
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="group relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-coral-500/35 hover:scale-[1.03]"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span className="relative">Donate / Partner With Us</span>
              <ArrowRight className="relative h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 active:scale-90 ${
              scrolled
                ? "text-ocean-900 hover:bg-sand-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Rendered outside <header> so backdrop-filter on the header
          can't break position: fixed */}
      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        logoUrl={sidebarLogoUrl}
      />
    </>
  );
}

function Footer() {
  const data = useSiteData();

  return (
    <footer className="relative bg-ocean-950 text-sand-100/80 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-coral-500 via-gold-400 to-coral-500" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-ocean-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              {data.logoDark ? (
                <img
                  src={data.logoDark}
                  alt="Gonomukti"
                  className="h-14 w-auto object-contain"
                />
              ) : (
                <>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean-600 to-ocean-800 flex items-center justify-center shadow-lg">
                    <Waves className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="font-serif text-2xl font-semibold text-white">
                      Gonomukti
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-sand-100/60">
                      Empowering Coastal Communities
                    </span>
                  </div>
                </>
              )}
            </div>
            <p className="text-sm leading-relaxed text-sand-100/70 max-w-sm">
              {data.footerAbout}
            </p>
            <div className="flex gap-3 mt-6">
              {data.socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-coral-500 hover:border-coral-500 flex items-center justify-center text-xs font-medium text-sand-100/70 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-coral-500/30"
                  aria-label={s.name}
                >
                  {s.name[0]}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-serif text-base font-semibold text-white mb-5 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-coral-500">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about/overview" },
                { label: "Projects", path: "/projects" },
                { label: "Gallery", path: "/gallery" },
                { label: "Contact Us", path: "/contact" },
              ].map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="text-sand-100/70 hover:text-coral-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-serif text-base font-semibold text-white mb-5 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-coral-500">
              Our Projects
            </h3>
            <ul className="space-y-3 text-sm">
              {data.projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/projects/${p.slug}`}
                    className="text-sand-100/70 hover:text-coral-400 transition-colors duration-200"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-serif text-base font-semibold text-white mb-5 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-coral-500">
              Get in Touch
            </h3>
            <ul className="space-y-4 text-sm text-sand-100/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-coral-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{data.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-coral-400 shrink-0" />
                <a
                  href={`tel:${data.contact.hotline}`}
                  className="hover:text-coral-400 transition-colors"
                >
                  {data.contact.hotline}
                </a>
              </li>
              {data.contact.emails.length > 0 && (
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-coral-400 shrink-0" />
                  <a
                    href={`mailto:${data.contact.emails[0].email}`}
                    className="hover:text-coral-400 transition-colors break-all"
                  >
                    {data.contact.emails[0].email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 pb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-sand-100/50">{data.registrationText}</p>
          <p className="text-xs text-sand-100/50">
            &copy; 2026 Gonomukti. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
