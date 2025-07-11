import { createContext, useContext, useEffect, useState } from 'react';

// Shape: { _id, name, colour, qty, price, image }
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems((prev) => {
      // merge by product id + colour (variant)
      const idx = prev.findIndex(
        (i) => i._id === item._id && i.colour === item.colour
      );
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx].qty += item.qty;
        return copy;
      }
      return [...prev, item];
    });
  };

  const updateQty = (id, colour, qty) => {
    setItems((prev) =>
      prev.map((i) =>
        i._id === id && i.colour === colour ? { ...i, qty: Math.max(1, qty) } : i
      )
    );
  };

  const removeItem = (id, colour) => {
    setItems((prev) => prev.filter((i) => !(i._id === id && i.colour === colour)));
  };

  const clear = () => setItems([]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQty, removeItem, clear, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
