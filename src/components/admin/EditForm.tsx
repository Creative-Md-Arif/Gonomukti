import { useState } from "react";
import { X, Save, Loader2, Pencil, Plus } from "lucide-react";
import ImageUploader from "./ImageUploader";
import MultiImageUploader from "./MultiImageUploader";
import type { CollectionConfig } from "./adminConfig";

interface RecordItem {
  _id?: string;
  [key: string]: unknown;
}

interface EditFormProps {
  config: CollectionConfig;
  item: RecordItem | null;
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => void;
  saving: boolean;
}

export default function EditForm({
  config,
  item,
  onClose,
  onSave,
  saving,
}: EditFormProps) {
  const [form, setForm] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {};
    for (const field of config.fields) {
      if (field.type === "list") {
        initial[field.name] = Array.isArray(item?.[field.name])
          ? (item![field.name] as string[]).join("\n")
          : "";
      } else if (field.type === "imageList") {
        initial[field.name] = Array.isArray(item?.[field.name])
          ? (item![field.name] as string[])
          : [];
      } else if (field.type === "boolean") {
        initial[field.name] = item?.[field.name] ?? false;
      } else if (field.type === "number") {
        initial[field.name] = item?.[field.name] ?? 0;
      } else {
        initial[field.name] = item?.[field.name] ?? "";
      }
    }
    return initial;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processed: Record<string, unknown> = {};
    for (const field of config.fields) {
      if (field.type === "list") {
        processed[field.name] = (form[field.name] as string)
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
      } else if (field.type === "imageList") {
        processed[field.name] = Array.isArray(form[field.name])
          ? (form[field.name] as string[]).filter(Boolean)
          : [];
      } else if (field.type === "number") {
        processed[field.name] = Number(form[field.name]);
      } else if (field.type === "boolean") {
        processed[field.name] = Boolean(form[field.name]);
      } else {
        processed[field.name] = form[field.name];
      }
    }
    onSave(processed);
  };

  const inputClass =
    "w-full min-w-0 rounded-xl border border-sand-200 bg-sand-50/40 px-3.5 py-2.5 text-sm text-ocean-900 placeholder:text-ocean-300 transition-all duration-200 hover:border-ocean-200 focus:outline-none focus:bg-white focus:border-ocean-400 focus:ring-4 focus:ring-ocean-400/15";
  const labelClass = "block text-[13px] font-semibold text-ocean-800 mb-1.5";
  const fullSpan = "sm:col-span-2";

  const isWide = (type: string) =>
    type === "textarea" ||
    type === "list" ||
    type === "image" ||
    type === "imageList";

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-ocean-950/60 backdrop-blur-sm animate-fade-in p-0 sm:p-4">
      <div
        className="relative flex flex-col w-full max-w-2xl max-h-[92dvh] sm:max-h-[86vh] bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-ocean-950/40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 shrink-0 bg-gradient-to-r from-coral-500 via-gold-400 to-coral-500" />

        {/* Header */}
        <div className="shrink-0 bg-white/90 backdrop-blur-md border-b border-sand-100 px-4 sm:px-5 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-ocean-600 to-ocean-800 text-white flex items-center justify-center shadow-md shadow-ocean-600/25">
              {item ? (
                <Pencil className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </span>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-serif font-semibold text-ocean-950 leading-tight truncate">
                {item ? `Edit ${config.label}` : `New ${config.label}`}
              </h2>
              <p className="text-xs text-ocean-500 mt-0.5 truncate">
                {item
                  ? "Update the details below and save."
                  : "Fill in the details to create a new entry."}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 w-9 h-9 rounded-xl border border-sand-200 flex items-center justify-center text-ocean-600 hover:bg-coral-50 hover:border-coral-200 hover:text-coral-600 active:scale-90 transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          {/* Body */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain bg-gradient-to-b from-sand-50/60 to-white px-4 sm:px-5 py-4 sm:py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {config.fields.map((field) => (
                <div
                  key={field.name}
                  className={`min-w-0 ${isWide(field.type) ? fullSpan : ""}`}
                >
                  {field.type === "image" ? (
                    <div className="rounded-2xl border border-sand-200 bg-white p-3 sm:p-4 shadow-sm">
                      <ImageUploader
                        label={field.label}
                        value={(form[field.name] as string) || ""}
                        onChange={(url) =>
                          setForm({ ...form, [field.name]: url })
                        }
                        folder={`gonomukti/${field.name}`}
                      />
                    </div>
                  ) : field.type === "imageList" ? (
                    <div className="rounded-2xl border border-sand-200 bg-white p-3 sm:p-4 shadow-sm">
                      <MultiImageUploader
                        label={field.label}
                        value={(form[field.name] as string[]) || []}
                        onChange={(urls) =>
                          setForm({ ...form, [field.name]: urls })
                        }
                        folder={`gonomukti/${field.name}`}
                      />
                    </div>
                  ) : field.type === "boolean" ? (
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-sand-200 bg-white px-4 py-3 shadow-sm h-full">
                      <label className="text-[13px] font-semibold text-ocean-800 min-w-0 break-words">
                        {field.label}
                      </label>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={Boolean(form[field.name])}
                        onClick={() =>
                          setForm({ ...form, [field.name]: !form[field.name] })
                        }
                        className={`relative shrink-0 w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-coral-500/25 ${
                          form[field.name]
                            ? "bg-gradient-to-r from-coral-500 to-coral-600"
                            : "bg-sand-200"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                            form[field.name] ? "translate-x-6" : ""
                          }`}
                        />
                      </button>
                    </div>
                  ) : (
                    <>
                      <label className={labelClass}>{field.label}</label>
                      {field.type === "textarea" ? (
                        <textarea
                          rows={4}
                          value={form[field.name] as string}
                          onChange={(e) =>
                            setForm({ ...form, [field.name]: e.target.value })
                          }
                          className={inputClass}
                          placeholder={field.placeholder}
                        />
                      ) : field.type === "list" ? (
                        <textarea
                          rows={4}
                          value={form[field.name] as string}
                          onChange={(e) =>
                            setForm({ ...form, [field.name]: e.target.value })
                          }
                          className={inputClass}
                          placeholder="One item per line"
                        />
                      ) : field.type === "select" ? (
                        <select
                          value={form[field.name] as string}
                          onChange={(e) =>
                            setForm({ ...form, [field.name]: e.target.value })
                          }
                          className={inputClass}
                        >
                          <option value="">Select...</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type === "number" ? "number" : "text"}
                          inputMode={
                            field.type === "number" ? "numeric" : undefined
                          }
                          value={form[field.name] as string | number}
                          onChange={(e) =>
                            setForm({ ...form, [field.name]: e.target.value })
                          }
                          className={inputClass}
                          placeholder={field.placeholder}
                        />
                      )}
                      {field.type === "list" && (
                        <p className="mt-1.5 text-xs text-ocean-400">
                          Each new line becomes a separate item.
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer actions */}
          <div className="shrink-0 border-t border-sand-100 bg-white/90 backdrop-blur-md px-4 sm:px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-sand-200 text-sm font-semibold text-ocean-600 hover:bg-sand-100 active:scale-[0.98] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="group relative overflow-hidden flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-coral-500 to-coral-600 shadow-lg shadow-coral-500/25 hover:shadow-xl hover:shadow-coral-500/40 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              {saving ? (
                <Loader2 className="relative h-4 w-4 animate-spin" />
              ) : (
                <Save className="relative h-4 w-4" />
              )}
              <span className="relative">Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
