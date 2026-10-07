import { useState, useRef } from 'react';
import { UploadCloud, Loader2, X, AlertCircle } from 'lucide-react';
import { uploadApi } from '@/services/api';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
}

export default function ImageUploader({ value, onChange, label, folder }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      if (file.size > 8 * 1024 * 1024) {
        throw new Error('Image must be under 8MB.');
      }
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        try {
          const res = await uploadApi.uploadImage(base64, folder);
          onChange(res.data.url);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Upload failed');
        } finally {
          setUploading(false);
        }
      };
      reader.onerror = () => {
        setError('Failed to read file.');
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-ocean-800 mb-1.5">{label}</label>}
      {error && (
        <div className="mb-2 flex items-center gap-2 rounded-lg bg-coral-50 border border-coral-200 px-3 py-2">
          <AlertCircle className="h-4 w-4 text-coral-600 shrink-0" />
          <p className="text-xs text-coral-800">{error}</p>
        </div>
      )}
      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-sand-200">
          <img src={value} alt="Preview" className="w-full h-40 object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-coral-600 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-sand-300 rounded-lg py-10 cursor-pointer hover:border-ocean-400 hover:bg-ocean-50/30 transition-colors"
        >
          {uploading ? (
            <>
              <Loader2 className="h-8 w-8 text-ocean-500 animate-spin" />
              <p className="text-sm text-ocean-600">Uploading to Cloudinary...</p>
            </>
          ) : (
            <>
              <UploadCloud className="h-8 w-8 text-ocean-400" />
              <p className="text-sm text-ocean-600">Click or drag an image to upload</p>
              <p className="text-xs text-ocean-400">PNG, JPG, WebP — max 8MB</p>
            </>
          )}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}
