import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const API_BASE =
        import.meta.env.VITE_API_URL || "https://yangart-api.onrender.com/api";
      const res = await fetch(`${API_BASE}/orders`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ message: res.statusText }));
        throw new Error(errorData.message || "Failed to fetch orders");
      }

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
    } else {
      loadOrders();
    }
  }, [navigate]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await apiFetch(`/orders/${orderId}/status`, {
        method: "PUT",
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (err) {
      setError(`Failed to update status for order ${orderId}: ${err.message}`);
    }
  };

  if (loading) {
    return <div className="p-4">Loading orders...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Orders Management
      </h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {order.customerName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.customerPhone}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {order.shippingAddress}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="mb-3 pb-3 border-b last:border-b-0 last:mb-0 last:pb-0"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.product.mainImage}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Qty: {item.qty} | Price: ₹{item.price}
                          </div>
                        </div>
                      </div>
                      {item.customization && (
                        <div className="mt-2 p-2 bg-gray-50 rounded-md">
                          <h4 className="text-xs font-bold text-gray-600">
                            Customization:
                          </h4>
                          {item.customization.name && (
                            <p className="text-sm text-gray-800">
                              Name: {item.customization.name}
                            </p>
                          )}
                          {item.customization.photoUrl && (
                            <div>
                              <p className="text-sm text-gray-800">Photo:</p>
                              <img
                                src={item.customization.photoUrl}
                                alt="Customization"
                                className="w-20 h-20 object-cover rounded-md mt-1"
                              />
                            </div>
                          )}
                          {item.customization.description && (
                            <p className="text-sm text-gray-800 mt-1">
                              Desc: {item.customization.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ₹{order.totalPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    {[
                      "placed",
                      "confirmed",
                      "processing",
                      "shipped",
                      "delivered",
                      "returned",
                    ].map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
