import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Image,
  FolderKanban,
  Users,
  Handshake,
  TrendingUp,
  GalleryHorizontalEnd,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  Waves,
  Cloud,
  Target,
  BarChart3,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useSiteData } from "@/hooks/useSiteData";
import type { CollectionName } from "@/services/api";

export type AdminTab =
  | "dashboard"
  | "banners"
  | "projects"
  | "focusAreas"
  | "impactHighlights"
  | "leaders"
  | "partners"
  | "milestones"
  | "stories"
  | "gallery"
  | "messages"
  | "settings"
  | "config";

interface AdminLayoutProps {
  active: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  children: ReactNode;
}

const tabs: {
  id: AdminTab;
  label: string;
  icon: typeof LayoutDashboard;
  collection?: CollectionName;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "banners", label: "Banners", icon: Image, collection: "banners" },
  {
    id: "projects",
    label: "Projects",
    icon: FolderKanban,
    collection: "projects",
  },
  {
    id: "focusAreas",
    label: "Focus Areas",
    icon: Target,
    collection: "focusAreas",
  },
  {
    id: "impactHighlights",
    label: "Impact Highlights",
    icon: BarChart3,
    collection: "impactHighlights",
  },
  { id: "leaders", label: "Leaders", icon: Users, collection: "leaders" },
  {
    id: "partners",
    label: "Partners",
    icon: Handshake,
    collection: "partners",
  },
  {
    id: "milestones",
    label: "Milestones",
    icon: TrendingUp,
    collection: "milestones",
  },
  {
    id: "stories",
    label: "Stories",
    icon: GalleryHorizontalEnd,
    collection: "stories",
  },
  { id: "gallery", label: "Gallery", icon: Image, collection: "gallery" },
  { id: "messages", label: "Messages", icon: Mail },
  { id: "settings", label: "Site Settings", icon: Settings },
  { id: "config", label: "Configuration", icon: Cloud },
];

export default function AdminLayout({
  active,
  onTabChange,
  children,
}: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const siteData = useSiteData();

  // Sidebar ডার্ক ব্যাকগ্রাউন্ড — তাই logoDark আগে, না থাকলে logoLight
  const logoUrl = siteData.logoDark || siteData.logoLight;

  return (
    <div className="min-h-screen bg-sand-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-ocean-950 text-sand-100 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-2.5 p-5 border-b border-white/10">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Gonomukti Admin"
              className="h-10 w-auto max-w-[180px] object-contain"
            />
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-ocean-600 flex items-center justify-center">
                <Waves className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-serif text-lg font-semibold text-white">
                  Gonomukti
                </p>
                <p className="text-[10px] uppercase tracking-wider text-sand-100/60">
                  Admin Panel
                </p>
              </div>
            </>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-coral-500 text-white"
                    : "text-sand-100/70 hover:bg-white/8 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-sand-100/50 mb-2">
            Logged in as
            <br />
            <span className="text-sand-100/80">{user?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex-1 text-center text-xs rounded-lg bg-white/8 hover:bg-white/15 py-2 text-sand-100/80 transition-colors"
            >
              View Site
            </Link>
            <button
              onClick={logout}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs rounded-lg bg-coral-600/20 hover:bg-coral-600 py-2 text-coral-300 hover:text-white transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 bg-white border-b border-sand-200 px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-sand-100"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            <h1 className="text-xl font-serif font-semibold text-ocean-950 capitalize">
              {active === "config"
                ? "Configuration"
                : active === "dashboard"
                  ? "Dashboard"
                  : active}
            </h1>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
