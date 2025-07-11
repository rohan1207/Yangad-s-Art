import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Artisanal Candles",
    description: "Handcrafted candles that illuminate your space with elegance",
    image: "/Red_Heart_Candles.webp",
    path: "/candles",
    gradient: "from-amber-100/80 to-amber-50/50",
    
  },
  {
    id: 2,
    name: "Crochet Artwork",
    description: "Intricately woven pieces that bring warmth to your home",
    image: "/crochet9.png",
    path: "/crochet",
    gradient: "from-rose-100/80 to-rose-50/50",
    icon: "🧶",
  },
  {
    id: 3,
    name: "Resin Art",
    description: "Stunning resin creations that capture moments in time",
    image: "/resin_art4.png",
    path: "/resin-art",
    gradient: "from-blue-100/80 to-blue-50/50",
    icon: "🎨",
  },
  {
    id: 4,
    name: "Engraved Jewellery",
    description: "Personalized jewelry pieces that tell your unique story",
    image: "/jewellery.webp",
    path: "/jewellery",
    gradient: "from-purple-100/80 to-purple-50/50",
    icon: "💎",
  },
  {
    id: 5,
    name: "T-Shirt Printing",
    description: "Custom printed apparel that expresses your personality",
    image: "/better_together.png",
    path: "/tshirts",
    gradient: "from-green-100/80 to-green-50/50",
    icon: "👕",
  },
];

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4"
          >
            Our <span className="text-amber-600 font-medium">Collections</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Explore our curated categories of handcrafted treasures, each
            telling a unique story of artistry and dedication.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={category.path} className="block group h-full">
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`h-full rounded-2xl overflow-hidden bg-gradient-to-b ${category.gradient} shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8`}
                >
                  <div className="aspect-[4/3] mb-6 relative overflow-hidden rounded-xl bg-white/90 flex items-center justify-center">
                    <span className="text-4xl md:text-5xl filter drop-shadow-md transition-transform duration-300 group-hover:scale-110">
                  
                    </span>
                  
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center text-amber-600 text-sm font-medium">
                    <span className="group-hover:underline">
                      Explore Collection
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
