import { useState } from 'react';
import { AlertCircle, Loader2, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function LoginView() {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@gonomukti-bd.org');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-900 via-ocean-800 to-ocean-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
            <Waves className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-white">Gonomukti</h1>
          <p className="text-sm text-sand-100/60 mt-1">Admin Panel Login</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl space-y-5">
          {error && (
            <div className="flex items-center gap-3 rounded-xl bg-coral-50 border border-coral-200 px-4 py-3">
              <AlertCircle className="h-5 w-5 text-coral-600 shrink-0" />
              <p className="text-sm text-coral-800">{error}</p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-ocean-800 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-sand-200 bg-white px-4 py-3 text-sm text-ocean-900 focus:outline-none focus:ring-2 focus:ring-ocean-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ocean-800 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-sand-200 bg-white px-4 py-3 text-sm text-ocean-900 focus:outline-none focus:ring-2 focus:ring-ocean-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-coral-500 px-5 py-3 text-sm font-semibold text-white hover:bg-coral-600 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Login
          </button>
          <p className="text-xs text-ocean-400 text-center">
            Default: admin@gonomukti-bd.org / password from ADMIN_PASSWORD in server/.env
          </p>
        </form>
        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-sand-100/60 hover:text-white transition-colors">
            &larr; Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
