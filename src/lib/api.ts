const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiFetch<T>(endpoint, { method: "GET", ...options }),

  post: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
    apiFetch<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    }),

  put: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
    apiFetch<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    }),

  patch: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
    apiFetch<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
      ...options,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiFetch<T>(endpoint, { method: "DELETE", ...options }),
};
