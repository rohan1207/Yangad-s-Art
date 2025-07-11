import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import {
  IoTrashOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoChevronForward,
  IoBagHandleOutline,
} from "react-icons/io5";
import { RiCouponLine } from "react-icons/ri";

const CartPage = () => {
  const { items: cartItems, updateQty, removeItem, subtotal } = useCart();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("online");

  const updateQuantity = (id, colour, change) => {
    const item = cartItems.find((i) => i._id === id && i.colour === colour);
    if (!item) return;
    const newQty = Math.max(1, item.qty + change);
    updateQty(id, colour, newQty);
  };

  const deliveryFee = 0; // FREE delivery

  const total = subtotal + deliveryFee;

  // Handle empty cart state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Preparing cart...
      </div>
    );
  }
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <IoBagHandleOutline className="w-24 h-24 text-amber-200 mb-6" />
            <h2 className="text-2xl font-serif font-light text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some items to start shopping
            </p>
            <Link
              to="/categories"
              className="px-8 py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {["Cart", "Address", "Payment"].map((step, index) => (
              <React.Fragment key={step}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex items-center"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0
                        ? "bg-amber-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="ml-2 font-medium text-gray-900">{step}</span>
                </motion.div>
                {index < 2 && (
                  <motion.div
                    className={`w-24 h-0.5 ${
                      index === 0 ? "bg-amber-600" : "bg-gray-200"
                    }`}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-2xl font-serif font-light text-gray-900 mb-6">
                Shopping{" "}
                <span className="text-amber-600 font-medium">Cart</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({cartItems.length} items)
                </span>
              </h2>

              {/* Cart Items */}
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <motion.div
                    key={`${item._id}-${item.colour}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:border-amber-200 hover:shadow-md transition-all duration-300"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50">
                      <img
                        src={item.mainImage}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/400?text=No+Image+Available";
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">{item.colour}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item._id, item.colour)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <IoTrashOutline className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.colour, -1)
                            }
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-600 transition-colors"
                          >
                            <IoRemoveOutline />
                          </button>
                          <span className="w-8 text-center">{item.qty}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.colour, 1)
                            }
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-600 transition-colors"
                          >
                            <IoAddOutline />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-amber-600 font-medium">
                            ₹{item.price}
                          </div>
                          {item.originalPrice && (
                            <div className="text-sm">
                              <span className="text-gray-400 line-through">
                                ₹{item.originalPrice}
                              </span>
                              <span className="text-green-500 ml-2">
                                {item.discount}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Offers & Discounts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Offers & Discounts
                  </h3>
                  {!isAuthenticated && (
                    <Link
                      to="/login"
                      className="text-amber-600 text-sm hover:text-amber-700 transition-colors"
                    >
                      Login to see more offers
                    </Link>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                    Apply
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-2 text-green-600 text-sm">
                  <RiCouponLine className="w-4 h-4" />
                  <span>2 offers available</span>
                </div>
              </motion.div>

              {/* Bill Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Bill Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Item Total</span>
                    <span className="text-gray-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="pt-3 border-t border-dashed border-gray-200">
                    <div className="flex justify-between font-medium">
                      <span className="text-gray-900">Order Total</span>
                      <span className="text-amber-600">₹{total}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Payment Method
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-amber-200 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={selectedPaymentMethod === "online"}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                    />
                    <div className="ml-3">
                      <div className="text-gray-900">Pay Online</div>
                      <div className="text-sm text-gray-500">
                        UPI, Cards, or Net Banking
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-amber-200 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={selectedPaymentMethod === "cod"}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                    />
                    <div className="ml-3">
                      <div className="text-gray-900">Cash on Delivery</div>
                      <div className="text-sm text-gray-500">
                        Pay when you receive
                      </div>
                    </div>
                  </label>
                </div>
              </motion.div>

              {/* Proceed Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  if (!isAuthenticated) {
                    const { isConfirmed, dismiss } = await Swal.fire({
                      title: "Please login",
                      text: "You need to login or signup to continue checkout",
                      confirmButtonText: "Login",
                      showDenyButton: true,
                      denyButtonText: "Sign up",
                    });
                    if (isConfirmed) return navigate("/login");
                    if (dismiss === Swal.DenyReason) return navigate("/signup");
                    return;
                  }
                  navigate("/checkout");
                }}
                className="w-full py-4 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Address
                <IoChevronForward className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
