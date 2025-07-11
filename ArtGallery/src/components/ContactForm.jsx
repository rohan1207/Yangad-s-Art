import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [isWhatsApp, setIsWhatsApp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderType: "regular", // regular or bulk
    message: "",
  });

  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\\-\\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Order Type: ${formData.orderType === "bulk" ? "Bulk Order" : "Regular Order"}

Message:
${formData.message}
    `.trim();

    const mailtoLink = `mailto:yanhad@gmail.com?subject=${encodeURIComponent(
      `\${formData.orderType === 'bulk' ? 'Bulk' : 'Regular'} Order Inquiry from \${formData.name}`
    )}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;
    setStatus("Opening email app...");
  };

  const sendToWhatsapp = () => {
    if (!validateForm()) return;

    const formattedMessage =
      `*${
        formData.orderType === "bulk" ? "Bulk" : "Regular"
      } Order Inquiry*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Order Type:* ${
        formData.orderType === "bulk" ? "Bulk Order" : "Regular Order"
      }\n\n` +
      `*Message:*\n${formData.message}`;

    const phoneNumber = "917559330901";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      formattedMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6 sm:p-8"
    >
      <h2 className="text-2xl font-serif font-light text-gray-900 mb-6">
        Get in <span className="text-amber-600 font-medium">Touch</span>
      </h2>

      {/* Communication Method Toggle */}
      <div className="flex gap-4 mb-6">
        <button
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
            !isWhatsApp
              ? "bg-amber-500 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setIsWhatsApp(false)}
        >
          Send Email
        </button>
        <button
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
            isWhatsApp
              ? "bg-amber-500 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setIsWhatsApp(true)}
        >
          WhatsApp
        </button>
      </div>

      <form
        onSubmit={isWhatsApp ? (e) => e.preventDefault() : handleSubmit}
        className="space-y-4"
      >
        {/* Order Type Selection */}
        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="orderType"
              value="regular"
              checked={formData.orderType === "regular"}
              onChange={handleChange}
              className="w-4 h-4 text-amber-500 border-gray-300 focus:ring-amber-500"
            />
            <span className="ml-2 text-sm text-gray-600">Regular Order</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="orderType"
              value="bulk"
              checked={formData.orderType === "bulk"}
              onChange={handleChange}
              className="w-4 h-4 text-amber-500 border-gray-300 focus:ring-amber-500"
            />
            <span className="ml-2 text-sm text-gray-600">Bulk Order</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.name ? "border-red-500" : "border-gray-200"
              } rounded-lg text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.phone ? "border-red-500" : "border-gray-200"
              } rounded-lg text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.email ? "border-red-500" : "border-gray-200"
            } rounded-lg text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <textarea
            name="message"
            placeholder={
              formData.orderType === "bulk"
                ? "Please provide details about your bulk order requirements (quantity, specific items, timeline, etc.) *"
                : "Your Message... *"
            }
            value={formData.message}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.message ? "border-red-500" : "border-gray-200"
            } rounded-lg h-32 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none`}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type={isWhatsApp ? "button" : "submit"}
          onClick={isWhatsApp ? sendToWhatsapp : undefined}
          className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 ${
            isWhatsApp
              ? "bg-amber-500 hover:bg-amber-600"
              : "bg-amber-500 hover:bg-amber-600"
          }`}
        >
          {isWhatsApp ? "Send via WhatsApp" : "Send Email"}
        </motion.button>
      </form>

      {status && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-sm text-gray-600"
        >
          {status}
        </motion.p>
      )}
    </motion.div>
  );
}
