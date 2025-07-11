import { useEffect, useState } from 'react';
import { fetchJson } from '../utils/api';

/**
 * Fetch all products once then filter by category on the client.
 * Returns [products, loading, error]
 */
export const useProducts = (category) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const all = await fetchJson('/products');
        if (!cancelled) {
          const filtered = all.filter((p) => p.category === category);
          setProducts(filtered);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [category]);

  return [products, loading, error];
};
