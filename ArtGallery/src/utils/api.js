// Shared API helper for ArtGallery frontend (customer-facing site)
export const API_BASE = import.meta.env.VITE_API_URL || 'https://yangart-api.onrender.com/api';

export const fetchJson = async (endpoint, options = {}) => {
  const token = localStorage.getItem('userToken');
  const baseHeaders = { 'Content-Type': 'application/json' };
  if (token) baseHeaders['Authorization'] = `Bearer ${token}`;
  const url = `${API_BASE}${endpoint}`;
  console.log('[fetchJson] Requesting:', url, options);
  const res = await fetch(url, {
    headers: { ...baseHeaders, ...(options.headers || {}) },
    mode: 'cors',
    credentials: 'include',
    ...options,
  });
  console.log('[fetchJson] Response status:', res.status);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    console.error('[fetchJson] Error response:', err);
    throw new Error(err.message || 'Request failed');
  }
  const json = await res.json();
  console.log('[fetchJson] Response JSON:', json);
  return json;
};

export const postJson = async (endpoint, body = {}, token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return fetchJson(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
};
