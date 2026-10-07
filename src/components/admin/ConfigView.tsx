import { useState, useEffect } from "react";
import {
  Save,
  Loader2,
  AlertCircle,
  Cloud,
  Shield,
  Globe,
  Key,
  EyeOff,
  Lock,
} from "lucide-react";
import { adminApi } from "@/services/api";

export default function ConfigView() {
  const [config, setConfig] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    adminApi
      .getConfig()
      .then((res) => setConfig(res.data))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load config"),
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-ocean-400 animate-spin" />
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-sand-200 bg-white px-3 py-2.5 text-sm text-ocean-900 focus:outline-none focus:ring-2 focus:ring-ocean-400 disabled:bg-sand-50 disabled:text-ocean-400 disabled:cursor-not-allowed";
  const labelClass = "block text-sm font-medium text-ocean-800 mb-1.5";
  const cardClass = "bg-white rounded-2xl p-6 shadow-sm border border-sand-100";

  // কোন ফিল্ডগুলো hidden/masked থাকবে
  const hiddenKeys = [
    "cloudinaryCloudName",
    "cloudinaryApiKey",
    "cloudinaryApiSecret",
  ];

  const fields = [
    {
      key: "cloudinaryCloudName",
      label: "Cloudinary Cloud Name",
      icon: Cloud,
      hint: "Your Cloudinary cloud name",
    },
    {
      key: "cloudinaryApiKey",
      label: "Cloudinary API Key",
      icon: Key,
      hint: "API key from Cloudinary dashboard",
    },
    {
      key: "cloudinaryApiSecret",
      label: "Cloudinary API Secret",
      icon: Shield,
      hint: "API secret — masked for security",
    },
    {
      key: "clientUrl",
      label: "Frontend URL",
      icon: Globe,
      hint: "Your website URL (e.g. http://localhost:5173)",
    },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      {error && (
        <div className="flex items-center gap-3 rounded-xl bg-coral-50 border border-coral-200 px-4 py-3">
          <AlertCircle className="h-5 w-5 text-coral-600 shrink-0" />
          <p className="text-sm text-coral-800">{error}</p>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 px-4 py-3">
          <span className="text-sm text-green-800">
            Configuration saved. Cloudinary credentials are now active.
          </span>
        </div>
      )}

      <div className={cardClass}>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-ocean-600" />
            <h3 className="font-serif text-lg font-semibold text-ocean-950">
              Cloudinary Configuration
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-ocean-500">
            <Lock className="h-3.5 w-3.5" />
            Read-only
          </span>
        </div>
        <p className="text-sm text-ocean-600 mb-4">
          Configure Cloudinary credentials here to enable image uploads. These
          are stored securely in the database and are only accessible to admins.
          Sensitive fields are masked.
        </p>
        <div className="space-y-4">
          {fields.map((field) => {
            const Icon = field.icon;
            const isHidden = hiddenKeys.includes(field.key);
            return (
              <div key={field.key}>
                <label className={labelClass}>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon className="h-4 w-4 text-ocean-500" />
                    {field.label}
                  </span>
                </label>
                {isHidden ? (
                  <div className="relative">
                    <input
                      type="password"
                      autoComplete="off"
                      disabled
                      className={inputClass + " pr-11"}
                      value={config?.[field.key] || ""}
                      placeholder={field.hint}
                      readOnly
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-ocean-300">
                      <EyeOff className="h-4 w-4" />
                    </span>
                  </div>
                ) : (
                  <input
                    type="text"
                    autoComplete="off"
                    disabled
                    className={inputClass}
                    value={config?.[field.key] || ""}
                    placeholder={field.hint}
                    readOnly
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="sticky bottom-4 flex justify-end">
        <button
          disabled
          className="inline-flex items-center gap-2 rounded-xl bg-coral-500 px-6 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <Save className="h-4 w-4" />
          Save Configuration
        </button>
      </div>
    </div>
  );
}
