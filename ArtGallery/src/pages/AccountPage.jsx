import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchJson } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define the order steps
  const steps = ["pending", "confirmed", "processing", "shipped", "delivered"];

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchJson("/orders/my");
        setOrders(data);
      } catch (e) {
        console.error("Failed to load orders", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (!user) return null; // Should be wrapped in RequireAuth

  return (
    <div className="min-h-screen bg-gray-50 pb-20 mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl sm:text-2xl font-bold text-white shadow-lg">
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {user.name}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">{user.phone}</p>
            </div>
          </div>
        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
          <Link
            to="#orders"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col items-center justify-center hover:shadow-md hover:bg-amber-50 transition-all duration-200 min-h-[100px] sm:min-h-[120px]"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2 sm:mb-3">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
              </svg>
            </div>
            <span className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
              Orders
            </span>
            <span className="text-xs sm:text-sm text-gray-500">
              {orders.length} orders
            </span>
          </Link>

          <Link
            to="#wallet"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col items-center justify-center hover:shadow-md hover:bg-amber-50 transition-all duration-200 min-h-[100px] sm:min-h-[120px]"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center mb-2 sm:mb-3">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V18H21ZM20 4H4C2.9 4 2 4.9 2 6V17H22V6C22 4.9 21.1 4 20 4ZM20 8H4V6H20V8Z" />
              </svg>
            </div>
            <span className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
              Wallet
            </span>
            <span className="text-xs sm:text-sm text-gray-500">
              Coming soon
            </span>
          </Link>

          <a
            href="mailto:support@yangart.com"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col items-center justify-center hover:shadow-md hover:bg-amber-50 transition-all duration-200 min-h-[100px] sm:min-h-[120px]"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2 sm:mb-3">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4V6L21 9ZM1 9V7L7 4V6L1 9ZM12 8C13.1 8 14 8.9 14 10V22H10V10C10 8.9 10.9 8 12 8Z" />
              </svg>
            </div>
            <span className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
              Help
            </span>
            <span className="text-xs sm:text-sm text-gray-500 text-center">
              Contact us
            </span>
          </a>

          <button
            onClick={() => navigate("/orders")}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col items-center justify-center hover:shadow-md hover:bg-amber-50 transition-all duration-200 min-h-[100px] sm:min-h-[120px]"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2 sm:mb-3">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L13.09 6.26L18 7L13.09 7.74L12 12L10.91 7.74L6 7L10.91 6.26L12 2ZM12 15L13.09 19.26L18 20L13.09 20.74L12 25L10.91 20.74L6 20L10.91 19.26L12 15Z" />
              </svg>
            </div>
            <span className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
              Track
            </span>
            <span className="text-xs sm:text-sm text-gray-500 text-center">
              Order status
            </span>
          </button>

          <button
            onClick={logout}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col items-center justify-center hover:shadow-md hover:bg-red-50 transition-all duration-200 min-h-[100px] sm:min-h-[120px] col-span-2 sm:col-span-1"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center mb-2 sm:mb-3">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-red-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17 7L15.59 5.59L12 9.17L8.41 5.59L7 7L10.59 10.59L7 14.17L8.41 15.59L12 12L15.59 15.59L17 14.17L13.41 10.59L17 7Z" />
              </svg>
            </div>
            <span className="text-sm sm:text-base font-semibold text-red-600 mb-1">
              Logout
            </span>
          </button>
        </div>

        {/* Order history */}
        <div id="orders" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Order History
            </h2>
            {orders.length > 0 && (
              <span className="text-sm text-gray-500">
                {orders.length} orders
              </span>
            )}
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-500 mb-4">
                You haven't placed any orders yet. Start shopping to see your
                orders here.
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const currentStep = Math.max(
                  0,
                  steps.indexOf(order.orderStatus)
                );
                return (
                  <div
                    key={order._id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                        {/* Order Image */}
                        {order.items[0]?.product ? (
                          <Link
                            to={`/product/${order.items[0].product._id}`}
                            className="flex-shrink-0 mx-auto sm:mx-0"
                          >
                            <img
                              src={
                                order.items[0].product.mainImage ||
                                "/placeholder-product.jpg"
                              }
                              alt={
                                order.items[0].product.name || "Product Image"
                              }
                              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shadow-sm"
                            />
                          </Link>
                        ) : (
                          <div className="flex-shrink-0 mx-auto sm:mx-0 w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                            <svg
                              className="w-8 h-8 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}

                        {/* Order Details */}
                        <div className="flex-1 min-w-0 text-center sm:text-left">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                Order #{order._id.slice(-6)}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString()}{" "}
                                • {order.items.length} items
                              </p>
                            </div>
                            <div className="mt-2 sm:mt-0 sm:text-right">
                              <p className="text-lg font-bold text-gray-900">
                                ₹{order.totalPrice}
                              </p>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                  order.orderStatus === "delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.orderStatus === "shipped"
                                    ? "bg-blue-100 text-blue-800"
                                    : order.orderStatus === "processing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {order.orderStatus}
                              </span>
                            </div>
                          </div>

                          {/* Delivery Address */}
                          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Deliver to:</span>{" "}
                              {order.deliveryAddress?.name || user.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {order.deliveryAddress?.addressLine || "Address"}{" "}
                              • {order.deliveryAddress?.phone || user.phone}
                            </p>
                          </div>

                          {/* Items List */}
                          <div className="space-y-2 mb-4">
                            {order.items.map((item) => (
                              <div
                                key={item._id}
                                className="flex items-center justify-between text-sm"
                              >
                                {item.product ? (
                                  <Link
                                    to={`/product/${item.product._id}`}
                                    className="text-amber-600 hover:text-amber-700 font-medium truncate pr-2 flex-1"
                                  >
                                    {item.product.name}
                                  </Link>
                                ) : (
                                  <span className="text-gray-600 font-medium truncate pr-2 flex-1">
                                    Product no longer available
                                  </span>
                                )}
                                <span className="text-gray-700 font-medium flex-shrink-0">
                                  x{item.qty} • ₹{item.price * item.qty}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Progress Indicator */}
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <div
                          className="flex items-center justify-between overflow-x-auto pb-2"
                          aria-label="Order progress"
                        >
                          {steps.map((step, idx) => (
                            <div key={step} className="flex items-center">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                    idx <= currentStep
                                      ? "bg-amber-500 text-white"
                                      : "bg-gray-200 text-gray-500"
                                  }`}
                                >
                                  {idx + 1}
                                </div>
                                <span
                                  className={`text-xs mt-1 capitalize ${
                                    idx <= currentStep
                                      ? "text-amber-600 font-medium"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {step}
                                </span>
                              </div>
                              {idx !== steps.length - 1 && (
                                <div
                                  className={`w-12 sm:w-16 h-0.5 mx-2 transition-colors ${
                                    idx < currentStep
                                      ? "bg-amber-500"
                                      : "bg-gray-200"
                                  }`}
                                ></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
