import { createContext, useContext, useEffect, useState } from 'react';
import { fetchJson, postJson } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('userToken'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) localStorage.setItem('userToken', token);
    else localStorage.removeItem('userToken');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = async (phone, password) => {
    setLoading(true);
    try {
      const data = await postJson('/users/login', { phone, password });
      const newToken = data.token || data.accessToken || data.jwt || (data.data && data.data.token);
      if (newToken) setToken(newToken);
      // Some backends may not return the user object – fetch if missing
      if (data.user) setUser(data.user);
      else {
        try {
          const me = await fetchJson('/users/me', {
            headers: { Authorization: `Bearer ${data.token}` },
          });
          setUser(me);
        } catch (e) {
          console.error('Failed to fetch profile after login', e);
        }
      }
    } catch (e) {
      console.error('Login error:', e);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, phone, password) => {
    setLoading(true);
    try {
      const data = await postJson('/users/register', { name, phone, password });
      const newToken = data.token || data.accessToken || data.jwt || (data.data && data.data.token);
      if (newToken) setToken(newToken);
      if (data.user) setUser(data.user);
      else {
        const me = await fetchJson('/users/me', {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        setUser(me);
      }
    } catch (e) {
      console.error('Signup error:', e);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  // Auto fetch profile if token exists but user is null
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const me = await fetchJson('/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(me);
      } catch (e) {
        console.error('Failed to fetch profile', e);
        // Keep the token; backend might not have /users/me implemented yet.
        // If token is actually invalid, subsequent protected requests will return 401 and RequireAuth will redirect.
        console.warn('Keeping existing token despite profile fetch error');
      } finally {
        setLoading(false);
      }
    };
    if (token && !user) fetchProfile();
  }, [token, user]);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
