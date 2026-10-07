import { AlertCircle } from "lucide-react";

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ocean-950/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3 mb-5">
          <AlertCircle className="h-6 w-6 text-coral-500 shrink-0 mt-0.5" />
          <p className="text-ocean-800">{message}</p>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-medium text-ocean-600 hover:bg-sand-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-coral-500 hover:bg-coral-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
