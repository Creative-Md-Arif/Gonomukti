import { useEffect, useState } from 'react';
import {
  Image, FolderKanban, Users, Handshake, TrendingUp,
  GalleryHorizontalEnd, Mail, LayoutDashboard, Plus,
  Loader2, Target, BarChart3,
} from 'lucide-react';
import { adminApi } from '@/services/api';

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Plus }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-sand-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-ocean-600 mb-1">{label}</p>
          <p className="text-3xl font-serif font-bold text-ocean-950">{value}</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-ocean-50 flex items-center justify-center">
          <Icon className="h-6 w-6 text-ocean-600" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardView() {
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .getDashboard()
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-ocean-400 animate-spin" />
      </div>
    );
  }

  const cards = [
    { label: 'Banners', value: stats?.banners ?? 0, icon: Image },
    { label: 'Projects', value: stats?.projects ?? 0, icon: FolderKanban },
    { label: 'Focus Areas', value: stats?.focusAreas ?? 0, icon: Target },
    { label: 'Impact Highlights', value: stats?.impactHighlights ?? 0, icon: BarChart3 },
    { label: 'Leaders', value: stats?.leaders ?? 0, icon: Users },
    { label: 'Partners', value: stats?.partners ?? 0, icon: Handshake },
    { label: 'Milestones', value: stats?.milestones ?? 0, icon: TrendingUp },
    { label: 'Success Stories', value: stats?.stories ?? 0, icon: GalleryHorizontalEnd },
    { label: 'Gallery Items', value: stats?.gallery ?? 0, icon: Image },
    { label: 'Messages', value: stats?.messages ?? 0, icon: Mail },
    { label: 'Unread', value: stats?.unreadMessages ?? 0, icon: Mail },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <LayoutDashboard className="h-6 w-6 text-ocean-600" />
        <p className="text-ocean-600">Overview of all content on your website.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} />
        ))}
      </div>
    </div>
  );
}
