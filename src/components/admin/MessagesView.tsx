import { useState, useEffect, useCallback } from 'react';
import { Trash2, Loader2, AlertCircle } from 'lucide-react';
import { adminApi } from '@/services/api';
import ConfirmDialog from './ConfirmDialog';

interface RecordItem {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  [key: string]: unknown;
}

export default function MessagesView() {
  const [messages, setMessages] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RecordItem | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getMessages();
      setMessages(res.data as RecordItem[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const toggleRead = async (msg: RecordItem) => {
    if (!msg._id) return;
    try {
      await adminApi.patchMessage(msg._id, !msg.isRead);
      await fetchMessages();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?._id) return;
    try {
      await adminApi.deleteMessage(deleteTarget._id);
      setDeleteTarget(null);
      await fetchMessages();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-coral-50 border border-coral-200 px-4 py-3">
          <AlertCircle className="h-5 w-5 text-coral-600 shrink-0" />
          <p className="text-sm text-coral-800">{error}</p>
        </div>
      )}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-ocean-400 animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 text-ocean-500">
          <p>No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`bg-white rounded-2xl p-5 shadow-sm border transition-colors ${
                msg.isRead ? 'border-sand-100' : 'border-coral-200 bg-coral-50/30'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-ocean-950">{msg.name}</span>
                    {!msg.isRead && (
                      <span className="inline-flex items-center rounded-full bg-coral-100 px-2 py-0.5 text-xs font-medium text-coral-700">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ocean-600 mb-1">{msg.email} {msg.phone ? `· ${msg.phone}` : ''}</p>
                  <p className="text-sm font-medium text-ocean-800 mt-2">{msg.subject}</p>
                  <p className="text-sm text-ocean-600 mt-1">{msg.message}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleRead(msg)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-ocean-600 hover:bg-ocean-50 transition-colors"
                  >
                    Mark {msg.isRead ? 'Unread' : 'Read'}
                  </button>
                  <button
                    onClick={() => setDeleteTarget(msg)}
                    className="p-2 rounded-lg text-coral-600 hover:bg-coral-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {deleteTarget && (
        <ConfirmDialog
          message="Delete this message?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
