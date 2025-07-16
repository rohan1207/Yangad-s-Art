import { useEffect, useState, useCallback } from "react";
import { fetchJson } from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom";

const ProductsOfWeek = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Fetch products with productOfWeek: true
  useEffect(() => {
    const fetchProductsOfWeek = async () => {
      try {
        setLoading(true);
        const data = await fetchJson("/products?productOfWeek=true");
        setProducts(
          Array.isArray(data)
            ? data.filter((p) => p.productOfWeek === true)
            : []
        );
      } catch (err) {
        setError(
          "Failed to load products of the week. Please try again later."
        );
        console.error("API Error:", err.message || err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsOfWeek();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  }, [products.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  }, [products.length]);

  // Auto-advance slides
  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isMobile]);

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[500px] flex items-center justify-center text-gray-500">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  const currentProduct = products[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900">
            Most Popular Products
          </h2>
          <p className="mt-4 text-gray-500">
            Discover our customer favorites and bestsellers
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 text-gray-800 hover:bg-amber-100 transition-colors"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 text-gray-800 hover:bg-amber-100 transition-colors"
          >
            <IoChevronForward className="w-6 h-6" />
          </button>

          {/* Product Display */}
          <AnimatePresence mode="wait">
            <Link
              to={`/product/${currentProduct._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <motion.div
                key={currentProduct._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-2 gap-8 items-center cursor-pointer"
              >
                {/* Product Image */}
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src={currentProduct.mainImage}
                    alt={currentProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="text-center md:text-left space-y-6">
                  <div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-4"
                    >
                      Best Seller #{currentIndex + 1}
                    </motion.div>
                    <h3 className="text-2xl font-medium text-gray-900">
                      {currentProduct.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {currentProduct.description}
                  </p>

                  <div className="flex flex-col md:flex-row gap-4 md:items-center justify-center md:justify-start">
                    <div className="text-2xl font-medium text-amber-600">
                      ₹{currentProduct.mrpPrice}
                      {currentProduct.discount > 0 && (
                        <span className="ml-2 text-sm text-green-600">
                          {currentProduct.discount}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      className="px-8 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-500 transition-colors w-full md:w-auto"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/product/${currentProduct._id}`;
                      }}
                    >
                      View Details
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-amber-600"
                    : "bg-gray-300 hover:bg-amber-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsOfWeek;
