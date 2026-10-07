const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getToken(): string | null {
  return localStorage.getItem("gonomukti_admin_token");
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<{ success: boolean; data: T; message?: string }> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };
  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  try {
    const res = await fetch(`${API_URL}${path}`, { ...options, headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Request failed" }));
      throw new Error(err.message || `HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error("Cannot connect to server. Is the backend running?");
    }
    throw err;
  }
}

/* ====== Auth ====== */
export const authApi = {
  login: (email: string, password: string) =>
    request<{
      token: string;
      user: { id: string; name: string; email: string; role: string };
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  me: () => request<{ id: string; name: string; email: string }>("/auth/me"),
};

/* ====== Public content ====== */
export const publicApi = {
  getBanners: () => request<unknown[]>("/banners"),
  getProjects: () => request<unknown[]>("/projects"),
  getProjectBySlug: (slug: string) => request<unknown>(`/projects/${slug}`),
  getLeaders: () => request<unknown[]>("/leaders"),
  getPartners: () => request<unknown[]>("/partners"),
  getImpact: () =>
    request<{ milestones: unknown[]; stories: unknown[] }>("/impact"),
  getGallery: (category?: string) =>
    request<unknown[]>(`/gallery${category ? `?category=${category}` : ""}`),
  getSettings: () => request<unknown>("/settings"),
  getFocusAreas: () => request<unknown[]>("/focus-areas"),
  getImpactHighlights: () => request<unknown[]>("/impact-highlights"),
  submitContact: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) =>
    request<unknown>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

/* ====== Upload ====== */
export const uploadApi = {
  uploadImage: (base64Data: string, folder?: string) =>
    request<{ url: string; publicId: string; width: number; height: number }>(
      "/upload",
      { method: "POST", body: JSON.stringify({ image: base64Data, folder }) },
    ),
};

/* ====== Admin CRUD ====== */
export type CollectionName =
  | "banners"
  | "projects"
  | "leaders"
  | "partners"
  | "milestones"
  | "stories"
  | "gallery"
  | "messages"
  | "focusAreas"
  | "impactHighlights";

export const adminApi = {
  getAll: (collection: CollectionName) =>
    request<unknown[]>(`/admin/${collection}`),
  create: (collection: CollectionName, data: Record<string, unknown>) =>
    request<unknown>(`/admin/${collection}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (
    collection: CollectionName,
    id: string,
    data: Record<string, unknown>,
  ) =>
    request<unknown>(`/admin/${collection}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (collection: CollectionName, id: string) =>
    request<null>(`/admin/${collection}/${id}`, { method: "DELETE" }),
  getDashboard: () => request<Record<string, number>>("/admin/dashboard"),
  getMessages: () => request<unknown[]>("/admin/messages"),
  patchMessage: (id: string, isRead: boolean) =>
    request<unknown>(`/admin/messages/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isRead }),
    }),
  deleteMessage: (id: string) =>
    request<null>(`/admin/messages/${id}`, { method: "DELETE" }),
  updateSettings: (data: Record<string, unknown>) =>
    request<unknown>("/admin/settings", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  getConfig: () => request<Record<string, string>>("/config"),
  updateConfig: (data: Record<string, string>) =>
    request<Record<string, string>>("/config", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};
