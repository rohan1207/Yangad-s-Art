// Shared API helper for ArtGallery frontend (customer-facing site)
export const API_BASE = import.meta.env.VITE_API_URL || 'https://yangart-api.onrender.com/api';

export const fetchJson = async (endpoint, options = {}) => {
  const token = localStorage.getItem('userToken');
  const baseHeaders = { 'Content-Type': 'application/json' };
  if (token) baseHeaders['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { ...baseHeaders, ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
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
