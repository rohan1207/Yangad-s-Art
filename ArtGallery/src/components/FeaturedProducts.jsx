import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchJson } from "../utils/api";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(4); // Changed to show 4 products by default (2x2 grid)
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  // Fetch featured products once on mount
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const data = await fetchJson("/products?featured=true");
        setProducts(data.filter((p) => p.featured === true));
      } catch (err) {
        setError("Failed to load featured products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // Handle window resize to adjust mobile/desktop layout
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 640;
      setIsMobile(mobile);
      // Reset visible products when switching between mobile and desktop
      setVisibleProducts(mobile ? 4 : 6);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate discounted price
  const calculateDiscountedPrice = (mrpPrice, discount) => {
    return mrpPrice - (mrpPrice * discount) / 100;
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleViewMore = () => {
    // Add 2 products at a time (1 row) on mobile, 2 products on desktop
    setVisibleProducts((prev) =>
      Math.min(prev + (isMobile ? 2 : 3), filteredProducts.length)
    );
  };

  return (
    <div className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4"
          >
            Featured{" "}
            <span className="text-amber-600 font-medium">Collections</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-24 h-0.5 bg-amber-400 mx-auto mb-8"
          />

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleProducts(4); // Reset to 4 for mobile view
                }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-amber-500 text-white shadow-lg"
                    : "bg-amber-50 text-amber-600 hover:bg-amber-100"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8"
        >
          <AnimatePresence>
            {filteredProducts.slice(0, visibleProducts).map((product) => (
              <Link
                key={product._id || product.id}
                to={`/product/${product._id || product.id}`}
              >
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="relative h-40 sm:h-64 overflow-hidden">
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Tag */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                      <span className="px-2 sm:px-3 py-1 bg-white/90 text-amber-600 text-[10px] sm:text-xs font-medium rounded-full">
                        {product.category}
                      </span>
                    </div>

                    {/* Discount Badge */}
                    {product.discount > 0 && (
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                        <span className="px-2 sm:px-3 py-1 bg-red-500 text-white text-[10px] sm:text-xs font-medium rounded-full">
                          {product.discount}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-3 sm:p-6">
                    <h3 className="text-sm sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-sm sm:text-lg font-medium text-amber-600">
                          ₹
                          {calculateDiscountedPrice(
                            product.mrpPrice,
                            product.discount
                          )}
                        </span>
                        {product.discount > 0 && (
                          <span className="text-xs sm:text-sm text-gray-500 line-through">
                            ₹{product.mrpPrice}
                          </span>
                        )}
                      </div>
                      <Link
                        to={`/product/${product._id || product.id}`}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-50 text-amber-600 rounded-full text-xs sm:text-sm hover:bg-amber-100 transition-colors duration-300 flex items-center justify-center"
                        style={{ textDecoration: "none" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        {visibleProducts < filteredProducts.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 sm:mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewMore}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-2 sm:py-3 bg-amber-500 text-white rounded-full hover:bg-amber-400 transition-colors duration-300 shadow-md hover:shadow-lg group text-sm sm:text-base"
            >
              View More
              <IoArrowForward className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
