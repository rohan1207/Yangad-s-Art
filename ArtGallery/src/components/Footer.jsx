import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <footer className="bg-gradient-to-b from-amber-50 to-white">
      {/* Top Border Accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section - Full width on mobile */}
          <motion.div {...fadeInUp} className="col-span-1 space-y-4">
            <h3 className="text-2xl font-serif text-gray-800">YangArt</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Discover unique handcrafted treasures that tell stories and bring
              joy to your everyday life.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors duration-300"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors duration-300"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors duration-300"
              >
                <FaPinterestP className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links & Categories Grid - Side by side on mobile */}
          <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-8 lg:gap-12">
            {/* Quick Links */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-medium text-gray-800">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "About Us", "Products", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      to={
                        item === "Home"
                          ? "/"
                          : `/${item.toLowerCase().replace(" ", "")}`
                      }
                      className="text-gray-600 hover:text-amber-600 transition-colors duration-300 text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Categories */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-medium text-gray-800">Categories</h4>
              <ul className="space-y-2">
                {[
                  "Gift Candles",
                  "Custom Jewelry",
                  "Crochet Products",
                  "Resin Art",
                  "T-Shirt Prints",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/category/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-600 hover:text-amber-600 transition-colors duration-300 text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info - Full width on mobile */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="col-span-1 space-y-4"
          >
            <h4 className="text-lg font-medium text-gray-800">Contact Us</h4>
            <div className="space-y-2">
              <p className="text-gray-600 text-sm">
                Email:{" "}
                <a
                  href="mailto:contact@yangart.com"
                  className="hover:text-amber-600 transition-colors duration-300"
                >
                  contact@yangart.com
                </a>
              </p>
              <p className="text-gray-600 text-sm">
                Phone:{" "}
                <a
                  href="tel:+1234567890"
                  className="hover:text-amber-600 transition-colors duration-300"
                >
                  +123 456 7890
                </a>
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Location: Mumbai, Maharashtra, India
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-amber-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} YangArt. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-gray-600 hover:text-amber-600 transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-600 hover:text-amber-600 transition-colors duration-300 text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
