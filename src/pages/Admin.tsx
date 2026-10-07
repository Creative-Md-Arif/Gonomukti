import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AdminLayout from "@/components/AdminLayout";
import type { AdminTab } from "@/components/AdminLayout";
import type { CollectionName } from "@/services/api";
import DashboardView from "@/components/admin/DashboardView";
import CrudView from "@/components/admin/CrudView";
import MessagesView from "@/components/admin/MessagesView";
import SettingsView from "@/components/admin/SettingsView";
import ConfigView from "@/components/admin/ConfigView";
import LoginView from "@/components/admin/LoginView";

const crudTabs: AdminTab[] = [
  "banners",
  "projects",
  "focusAreas",
  "impactHighlights",
  "leaders",
  "partners",
  "milestones",
  "stories",
  "gallery",
];

const validTabs: AdminTab[] = [
  "dashboard",
  ...crudTabs,
  "messages",
  "settings",
  "config",
];

export default function Admin() {
  const { user, loading } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get("tab") as AdminTab | null;
  const activeTab: AdminTab =
    tabParam && validTabs.includes(tabParam) ? tabParam : "dashboard";

  const handleTabChange = (tab: AdminTab) => {
    setSearchParams({ tab });
  };

  useEffect(() => {
    document.title = "Gonomukti Admin Panel";
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ocean-950">
        <Loader2 className="h-8 w-8 text-white animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginView />;
  }

  return (
    <AdminLayout active={activeTab} onTabChange={handleTabChange}>
      {activeTab === "dashboard" && <DashboardView />}
      {activeTab === "messages" && <MessagesView />}
      {activeTab === "settings" && <SettingsView />}
      {activeTab === "config" && <ConfigView />}
      {crudTabs.includes(activeTab) && (
        <CrudView collection={activeTab as CollectionName} />
      )}
    </AdminLayout>
  );
}
