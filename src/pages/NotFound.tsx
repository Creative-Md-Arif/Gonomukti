import { Link } from 'react-router-dom';
import { Home, Search, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-50 px-4">
      <div className="text-center max-w-lg">
        <div className="relative mb-8">
          <h1 className="text-[120px] md:text-[180px] font-serif font-bold text-ocean-100 leading-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Compass className="h-16 w-16 text-coral-400 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-ocean-950 mb-4">
          Page Not Found
        </h2>
        <p className="text-ocean-600 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ocean-600 px-6 py-3 text-sm font-semibold text-white hover:bg-ocean-700 transition-all"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ocean-600 px-6 py-3 text-sm font-semibold text-ocean-700 hover:bg-ocean-600 hover:text-white transition-all"
          >
            <Search className="h-4 w-4" />
            Explore Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
