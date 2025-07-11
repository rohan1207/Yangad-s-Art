import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const products = [
  {
    id: 1,
    name: "Hold me still",
    description:
      "Hand-poured soy wax candle with calming lavender essence. Each candle is carefully crafted to provide a serene and relaxing ambiance, perfect for your sacred space.",
    price: "$24.99",
    image: "/hold_me_still.jpg",
    tag: "Best Seller",
    details: [
      "100% Natural Soy Wax",
      "40+ Hours Burn Time",
      "Handcrafted in Small Batches",
    ],
  },
  {
    id: 2,
    name: "Sunflower Candle",
    description:
      "Hand-poured soy wax candle infused with the bright and cheerful scent of sunflowers. Each candle is designed to uplift your spirits and bring warmth to your space.",
    price: "$49.99",
    image: "/sunflower_candle.jpg",
    tag: "New Arrival",
    details: [
      "925 Sterling Silver",
      "Crystal Accent",
      "Customizable Engraving",
    ],
  },
  {
    id: 3,
    name: "Oh! Rose",
    description:
      "Hand-crocheted merino wool shawl in ivory. Each stitch is carefully crafted with love, creating a luxurious wrap that provides both warmth and elegance.",
    price: "$79.99",
    image: "/rose_candle.jpg",
    tag: "Limited Edition",
    details: ["100% Merino Wool", "Hand-Crocheted", "One-of-a-Kind Design"],
  },
  {
    id: 4,
    name: "Name and Photo Engraved unisex necklace.",
    description:
      "Personalized unisex necklace featuring your name and photo. A unique piece that adds a personal touch to any outfit.",
    price: "$29.99",
    image: "/jewellery.webp",
    tag: "Featured",
    details: [
      "Premium Coconut Blend",
      "50+ Hours Burn Time",
      "Reusable Glass Vessel",
    ],
  },
];

const ProductsOfWeek = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentProduct = products[currentIndex];

  return (
    <div className="w-full bg-gradient-to-b from-amber-50 to-white py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4"
          >
            Product of the{" "}
            <span className="text-amber-600 font-medium">Week</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-24 h-0.5 bg-amber-400 mx-auto"
          />
        </div>

        {/* Product Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
              <motion.div
                key={currentProduct.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row"
              >
                {/* Image Section */}
                <motion.div
                  className="md:w-1/2 relative h-[300px] md:h-[600px] overflow-hidden"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0">
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                  </div>

                  {/* Product Tag */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-6 left-6"
                  >
                    <div className="bg-amber-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                      {currentProduct.tag}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                  className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.h3
                    className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {currentProduct.name}
                  </motion.h3>

                  <motion.p
                    className="text-gray-600 text-lg mb-8 leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {currentProduct.description}
                  </motion.p>

                  {/* Product Details */}
                  <motion.div
                    className="space-y-3 mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {currentProduct.details.map((detail, index) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-600"
                      >
                        <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                        {detail}
                      </div>
                    ))}
                  </motion.div>

                  <motion.div
                    className="flex flex-col sm:flex-row items-center gap-4 mt-auto"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="text-2xl font-light text-amber-600">
                      {currentProduct.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-400 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-amber-200"
                    >
                      Add to Cart
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Navigation Arrows */}
              <div className="absolute top-[50%] -translate-y-1/2 left-0 right-0">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevSlide}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-amber-600 hover:bg-amber-50 transition-all transform -translate-x-6"
                  >
                    <IoChevronBackOutline className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextSlide}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-amber-600 hover:bg-amber-50 transition-all transform translate-x-6"
                  >
                    <IoChevronForwardOutline className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
            </div>
          </AnimatePresence>

          {/* Progress Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {products.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`h-2 transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 bg-amber-400"
                    : "w-2 bg-amber-200 hover:bg-amber-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsOfWeek;
