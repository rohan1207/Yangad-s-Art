import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  IoArrowForward,
  IoTicketOutline,
  IoGiftOutline,
} from "react-icons/io5";

const PromoBanner = () => {
  return (
    <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-24 h-24 bg-amber-200 rounded-full opacity-20 blur-2xl" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-32 h-32 bg-amber-300 rounded-full opacity-20 blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Section - New Arrival Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <IoGiftOutline className="w-6 h-6 text-amber-500" />
            <span className="text-lg font-medium text-amber-600">
              New Arrival
            </span>
          </motion.div>

          {/* Middle Section - Offer Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center text-center"
          >
            <div className="text-2xl md:text-3xl font-serif font-medium text-gray-900 mb-2">
              Discount up to <span className="text-amber-500">10% off</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 max-w-xl text-center">
              <IoTicketOutline className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <p>
                Buy for min of ₹1000, Get 10% off on cart up to ₹100. Code -{" "}
                <span className="font-semibold text-amber-600">NEW10</span>
              </p>
            </div>
          </motion.div>

          {/* Right Section - CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            
            <Link to="/categories">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 text-white rounded-full hover:bg-amber-400 transition-colors duration-300 shadow-md hover:shadow-lg group"
              >
                Shop Now
                <IoArrowForward className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-200 rounded-full md:hidden"
        />
      </div>

      {/* Border Accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
    </div>
  );
};

export default PromoBanner;
