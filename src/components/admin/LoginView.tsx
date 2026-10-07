import { useState } from "react";
import {
  AlertCircle,
  Loader2,
  Waves,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useSiteData } from "@/hooks/useSiteData";

export default function LoginView() {
  const { login } = useAuth();
  const siteData = useSiteData();

  const logoUrl = siteData.logoDark || siteData.logoLight;

  const [email, setEmail] = useState("admin@gonomukti-bd.org");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-sand-200 bg-sand-50/50 px-4 py-3 text-sm text-ocean-900 placeholder:text-ocean-300 focus:outline-none focus:ring-2 focus:ring-ocean-400 focus:border-ocean-400 focus:bg-white transition-all duration-200";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-900 via-ocean-950 to-ocean-900 px-4 py-10 overflow-hidden">
      {/* ===== Decorative background ===== */}
   
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-ocean-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] bg-coral-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* ===== Branding ===== */}
        <div className="text-center mb-8">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Gonomukti"
              className="h-16 w-auto max-w-[220px] mx-auto mb-5 object-contain drop-shadow-lg"
            />
          ) : (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean-600 to-ocean-800 ring-1 ring-white/15 shadow-xl shadow-ocean-950/50 mb-5">
              <Waves className="h-8 w-8 text-white" />
            </div>
          )}
          <h1 className="font-serif text-3xl font-semibold text-white tracking-tight">
            Gonomukti
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-coral-400/70" />
            <p className="text-[11px] uppercase tracking-[0.25em] text-sand-100/60">
              Admin Panel
            </p>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-coral-400/70" />
          </div>
        </div>

        {/* ===== Login card ===== */}
        <form
          onSubmit={handleSubmit}
          className="relative bg-white rounded-3xl p-7 sm:p-8 shadow-2xl shadow-ocean-950/40 ring-1 ring-white/20 space-y-5 overflow-hidden"
        >
          {/* Card top accent */}
          <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r from-transparent via-coral-400 to-transparent" />

          {error && (
            <div className="flex items-center gap-3 rounded-xl bg-coral-50 border border-coral-200 px-4 py-3 animate-fade-in">
              <AlertCircle className="h-5 w-5 text-coral-600 shrink-0" />
              <p className="text-sm text-coral-800">{error}</p>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-ocean-800 mb-1.5"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="admin@gonomukti-bd.org"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-ocean-800 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass + " pr-12"}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-ocean-400 hover:text-ocean-700 hover:bg-sand-100 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                ) : (
                  <Eye className="h-[18px] w-[18px]" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative overflow-hidden w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-coral-500 to-coral-600 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-coral-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Shine sweep */}
            {!loading && (
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            )}
            {loading ? (
              <>
                <Loader2 className="relative h-4 w-4 animate-spin" />
                <span className="relative">Signing in...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="relative h-4 w-4" />
                <span className="relative">Sign In</span>
                <ArrowRight className="relative h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-ocean-400">
            Authorized personnel only. All activity is monitored.
          </p>
        </form>

        {/* ===== Back link ===== */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm text-sand-100/60 hover:text-white transition-colors"
          >
            <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
