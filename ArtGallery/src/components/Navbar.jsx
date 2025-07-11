import { useState } from "react";
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  IoSearchOutline,
  IoCartOutline,
  IoPersonOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoLocationOutline,
} from "react-icons/io5";

// IconButton component
const IconButton = ({ children, className = "", onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`relative p-3 rounded-full hover:bg-amber-50 text-gray-600 hover:text-amber-600 transition-colors ${className}`}
  >
    {children}
  </motion.button>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  const cartCount = items.length;
  const { isAuthenticated } = useAuth();

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const overlayVariants = {
    open: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-2">
            <IconButton>
              <IoSearchOutline className="w-6 h-6" />
            </IconButton>
            <IconButton>
              <IoLocationOutline className="w-6 h-6" />
            </IconButton>

            <Link to="/cart">
              <IconButton>
                <IoCartOutline className="w-6 h-6" />
                {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              </IconButton>
            </Link>

            <Link to="/account">
              <IconButton>
                <IoPersonOutline className="w-6 h-6" />
              </IconButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <IconButton onClick={() => setIsOpen(true)}>
              <IoMenuOutline className="w-6 h-6" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              className="fixed inset-0 bg-black/20 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 left-0 bottom-0 right-0 bg-white md:hidden z-50"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <IoCloseOutline className="w-7 h-7 text-gray-600" />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 py-8">
                  <nav className="px-6 space-y-2">
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="block px-6 py-4 text-xl text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors font-medium"
                    >
                      Home
                    </Link>
                    <Link
                      to="/categories"
                      onClick={() => setIsOpen(false)}
                      className="block px-6 py-4 text-xl text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors font-medium"
                    >
                      Categories
                    </Link>
                    <Link
                      to="/about"
                      onClick={() => setIsOpen(false)}
                      className="block px-6 py-4 text-xl text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors font-medium"
                    >
                      About Us
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className="block px-6 py-4 text-xl text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors font-medium"
                    >
                      Contact Us
                    </Link>
                  </nav>
                </div>

                {/* Bottom Actions */}
                <div className="p-6 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      to="/search"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center px-6 py-4 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                    >
                      <IoSearchOutline className="w-6 h-6 mr-3" />
                      Search
                    </Link>
                    <Link
                      to="/locations"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center px-6 py-4 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                    >
                      <IoLocationOutline className="w-6 h-6 mr-3" />
                      Locations
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Link
                      to="/cart"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center px-6 py-4 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors relative"
                    >
                      <IoCartOutline className="w-6 h-6 mr-3" />
                      Cart
                      {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                        {cartCount}
                      </span>
                    )}
                    </Link>
                    <Link
                      to="/account"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center px-6 py-4 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                    >
                      <IoPersonOutline className="w-6 h-6 mr-3" />
                      Account
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
