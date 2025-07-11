import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { postJson } from '../utils/api';

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CheckoutPage = () => {
  const { items, subtotal, clear } = useCart();
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handlePayment = async () => {
    const ok = await loadRazorpay();
    if (!ok) return alert('Failed to load payment gateway');

    // create order on backend
    const data = await postJson('/orders/razorpay', {
      amount: subtotal * 100,
      items: items.map(item => ({
        product: item._id,
        qty: item.qty,
        price: item.price,
        customization: item.customization
      })),
      address,
    }, token);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: 'INR',
      name: 'YangArt',
      description: 'Artwork Purchase',
      order_id: data.orderId,
      prefill: {
        name: user?.name,
        contact: user?.phone,
      },
      handler: async function (response) {
        try {
          await postJson('/orders/confirm', {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            items,
            address,
          }, token);
          clear();
          navigate('/');
          alert('Payment successful!');
        } catch (e) {
          console.error(e);
          alert('Payment verification failed');
        }
      },
      theme: {
        color: '#f59e0b',
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Guard: redirect if no user or empty cart
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || items.length === 0)) {
      navigate('/cart');
    }
  }, [isAuthenticated, items.length, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">Preparing checkout...</div>
    );
  }
  if (!isAuthenticated || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">Preparing checkout...</div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50/20 pt-20 pb-12">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        {/* Steps indicator */}
        <div className="flex justify-center mb-6 gap-4">
          {['Address', 'Payment'].map((label, idx) => (
            <div
              key={label}
              className={`flex items-center gap-2 ${idx + 1 === step ? 'text-amber-600' : 'text-gray-400'}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${idx + 1 === step ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}>{idx + 1}</div>
              <span>{label}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Address Line"
              value={address.line1}
              onChange={(e) => setAddress({ ...address, line1: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                className="border px-3 py-2 rounded"
              />
            </div>
            <button
              className="mt-4 bg-amber-600 text-white w-full py-2 rounded"
              onClick={() => setStep(2)}
            >
              Continue to Payment
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Order Summary</h3>
            <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {items.map((item) => (
                <li key={item._id + item.colour} className="flex justify-between text-sm">
                  <span>{item.name} x {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-medium border-t pt-2">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
            <button
              className="mt-4 bg-amber-600 text-white w-full py-2 rounded"
              onClick={handlePayment}
            >
              Pay with Razorpay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
