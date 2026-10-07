import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Edit2, Trash2, Search, Loader2, AlertCircle,
} from 'lucide-react';
import { adminApi, type CollectionName } from '@/services/api';
import { collectionConfigs } from './adminConfig';
import EditForm from './EditForm';
import ConfirmDialog from './ConfirmDialog';

interface RecordItem {
  _id?: string;
  [key: string]: unknown;
}

export default function CrudView({ collection }: { collection: CollectionName }) {
  const [items, setItems] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<RecordItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<RecordItem | null>(null);
  const [saving, setSaving] = useState(false);

  const config = collectionConfigs[collection];

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getAll(collection);
      setItems(res.data as RecordItem[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [collection]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSave = async (data: Record<string, unknown>) => {
    setSaving(true);
    try {
      if (editing?._id) {
        await adminApi.update(collection, editing._id, data);
      } else {
        await adminApi.create(collection, data);
      }
      setEditing(null);
      setCreating(false);
      await fetchItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?._id) return;
    try {
      await adminApi.delete(collection, deleteTarget._id);
      setDeleteTarget(null);
      await fetchItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const imageFields = ['image', 'photo', 'coverImage', 'logo'];
  const boolFields = ['isActive', 'isFeatured'];

  const filtered = items.filter((item) => {
    if (!search) return true;
    const searchableText = config.displayFields
      .map((f) => String(item[f] ?? ''))
      .join(' ')
      .toLowerCase();
    return searchableText.includes(search.toLowerCase());
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ocean-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-sand-200 bg-white focus:outline-none focus:ring-2 focus:ring-ocean-400"
          />
        </div>
        <button
          onClick={() => { setCreating(true); setEditing(null); }}
          className="inline-flex items-center gap-2 rounded-lg bg-coral-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-coral-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add New
        </button>
      </div>

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
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-ocean-500">
          <p>No {config.label.toLowerCase()}s found. Click "Add New" to create one.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-sand-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-sand-50 border-b border-sand-100">
                  {config.displayFields.map((field) => (
                    <th key={field} className="text-left px-4 py-3 font-semibold text-ocean-700 capitalize">
                      {field}
                    </th>
                  ))}
                  <th className="text-right px-4 py-3 font-semibold text-ocean-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <tr key={item._id || i} className="border-b border-sand-50 hover:bg-sand-50/50 transition-colors">
                    {config.displayFields.map((field) => (
                      <td key={field} className="px-4 py-3 text-ocean-800">
                        {imageFields.includes(field) ? (
                          (item[field] as string) ? (
                            <img src={item[field] as string} alt="" className="w-12 h-12 rounded-lg object-cover" />
                          ) : (
                            <span className="text-ocean-300">—</span>
                          )
                        ) : boolFields.includes(field) ? (
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            item[field] ? 'bg-green-100 text-green-700' : 'bg-sand-100 text-ocean-500'
                          }`}>
                            {item[field] ? 'Yes' : 'No'}
                          </span>
                        ) : (
                          <span className="line-clamp-1">{String(item[field] ?? '—')}</span>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setEditing(item); setCreating(false); }}
                          className="p-2 rounded-lg text-ocean-600 hover:bg-ocean-50 transition-colors"
                          aria-label="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="p-2 rounded-lg text-coral-600 hover:bg-coral-50 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(editing || creating) && (
        <EditForm
          config={config}
          item={editing}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSave={handleSave}
          saving={saving}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Delete this ${config.label.toLowerCase()}? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
