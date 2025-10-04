
// export const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api';

// export async function apiFetch(path, options = {}) {
//   const res = await fetch(`${API_BASE}${path}`, {
//     credentials: 'include',            // <-- cookie flows
//     headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
//     ...options,
//   });

//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     return { ok: false, status: res.status, data };
//   }
//   return { ok: true, status: res.status, data };
// }




export const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include', 
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}
