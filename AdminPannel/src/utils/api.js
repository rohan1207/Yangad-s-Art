// Simple helper around fetch to include JWT token if present
export const API_BASE = import.meta.env.VITE_API_URL || 'https://yangart-api.onrender.com';

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('adminToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const url = new URL(endpoint.startsWith('/') ? endpoint : `/${endpoint}`, API_BASE);
  const res = await fetch(url.href, { ...options, headers });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || 'Request failed');
  }
  return res.json();
};
