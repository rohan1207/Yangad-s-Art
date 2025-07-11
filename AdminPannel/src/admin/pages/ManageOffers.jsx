import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';

const ManageOffers = () => {
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState({ couponName: '', discount: '', minimumPurchase: '' });
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const data = await apiFetch('/offers');
      setOffers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleToggle = async (id, active) => {
    try {
      await apiFetch(`/offers/${id}`, { method: 'PUT', body: JSON.stringify({ active: !active }) });
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/offers', { method: 'POST', body: JSON.stringify(form) });
      setForm({ couponName: '', discount: '', minimumPurchase: '' });
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Offers</h1>
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        {['couponName', 'discount', 'minimumPurchase'].map((f) => (
          <input
            key={f}
            placeholder={f}
            value={form[f]}
            onChange={(e) => setForm({ ...form, [f]: e.target.value })}
            className="border p-2 rounded"
            required
          />
        ))}
        <button className="bg-blue-600 text-white px-4 rounded">Add</button>
      </form>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Coupon</th>
            <th>Discount</th>
            <th>Min Purchase</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {offers.map((o) => (
            <tr key={o._id} className="border-b">
              <td>{o.couponName}</td>
              <td>{o.discount}</td>
              <td>{o.minimumPurchase}</td>
              <td>{o.active ? 'Active' : 'Inactive'}</td>
              <td>
                <button className="text-blue-600" onClick={() => handleToggle(o._id, o.active)}>
                  Toggle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOffers;
