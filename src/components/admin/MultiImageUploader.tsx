import { useState, useRef } from "react";
import {
  UploadCloud,
  Loader2,
  X,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { uploadApi } from "@/services/api";

interface MultiImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  folder?: string;
  max?: number;
}

export default function MultiImageUploader({
  value,
  onChange,
  label,
  folder,
  max = 12,
}: MultiImageUploaderProps) {
  const [uploadingTotal, setUploadingTotal] = useState(0);
  const [uploadingDone, setUploadingDone] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64 = reader.result as string;
          const res = await uploadApi.uploadImage(base64, folder);
          resolve(res.data.url);
        } catch (err) {
          reject(err instanceof Error ? err : new Error("Upload failed"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsDataURL(file);
    });

  const handleFiles = async (files: FileList) => {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!list.length) return;

    const remaining = max - value.length;
    if (remaining <= 0) {
      setError(`Maximum ${max} images allowed.`);
      return;
    }

    const toUpload = list.slice(0, remaining);
    if (list.length > remaining) {
      setError(
        `Limit reached — only ${remaining} more image(s) added (max ${max}).`,
      );
    }

    setUploadingTotal(toUpload.length);
    setUploadingDone(0);
    const uploaded: string[] = [];

    for (let i = 0; i < toUpload.length; i++) {
      const file = toUpload[i];
      if (file.size > 8 * 1024 * 1024) {
        setError(`${file.name} is over 8MB — skipped.`);
      } else {
        try {
          const url = await uploadFile(file);
          uploaded.push(url);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Upload failed");
        }
      }
      setUploadingDone(i + 1);
    }

    setUploadingTotal(0);
    if (uploaded.length) {
      onChange([...value, ...uploaded]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  };

  const removeAt = (i: number) => {
    onChange(value.filter((_, idx) => idx !== i));
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-ocean-800 mb-1.5">
          {label}
        </label>
      )}
      {error && (
        <div className="mb-2 flex items-center gap-2 rounded-lg bg-coral-50 border border-coral-200 px-3 py-2">
          <AlertCircle className="h-4 w-4 text-coral-600 shrink-0" />
          <p className="text-xs text-coral-800">{error}</p>
        </div>
      )}

      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
          {value.map((url, i) => (
            <div
              key={`${url}-${i}`}
              className="relative group rounded-lg overflow-hidden border border-sand-200"
            >
              <img
                src={url}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-24 object-cover"
              />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-white/90 text-coral-600 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove image ${i + 1}`}
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-1.5 left-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="p-1 rounded-lg bg-white/90 text-ocean-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Move left"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === value.length - 1}
                  className="p-1 rounded-lg bg-white/90 text-ocean-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Move right"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <span className="absolute bottom-1.5 right-1.5 text-[10px] font-medium px-1.5 py-0.5 rounded bg-ocean-950/70 text-white">
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-sand-300 rounded-lg py-7 cursor-pointer hover:border-ocean-400 hover:bg-ocean-50/30 transition-colors"
      >
        {uploadingTotal > 0 ? (
          <>
            <Loader2 className="h-7 w-7 text-ocean-500 animate-spin" />
            <p className="text-sm text-ocean-600">
              Uploading {uploadingDone + 1} of {uploadingTotal}...
            </p>
          </>
        ) : (
          <>
            <UploadCloud className="h-7 w-7 text-ocean-400" />
            <p className="text-sm text-ocean-600">
              Click or drag images to upload
            </p>
            <p className="text-xs text-ocean-400">
              Multiple images allowed — max 8MB each
            </p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
