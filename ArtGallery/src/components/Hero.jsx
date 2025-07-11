import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative max-h-[100vh] w-full overflow-hidden ">
      {/* Full-screen background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="./hero1.png"
          alt="Background"
          className="w-full h-full object-cover object-center opacity-100 "
        />
        <div className="" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="flex flex-col justify-center min-h-[calc(100vh-10rem)]">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl space-y-6 md:space-y-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 backdrop-blur-sm text-amber-900 text-sm font-medium border border-amber-200"
            >
              ✨ Handcrafted with Love
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-light text-gray-900 leading-tight">
              Create Your
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="block font-medium text-amber-600 mt-2"
              >
                Perfect Gift
              </motion.span>
            </h1>

            <p className="text-lg sm:text-xl text-black max-w-xl leading-relaxed">
              Discover our exquisite collection of artisanal candles,
              personalized lockets, and handcrafted crochet pieces. Each piece
              is thoughtfully created to bring joy and elegance to your special
              moments.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-amber-500 text-white rounded-full hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 font-medium"
              >
                Explore Collection
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-amber-400 text-amber-600 rounded-full hover:bg-amber-50 transition-all duration-300 font-medium"
              >
                Custom Orders
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex space-x-8 pt-8 pb-4 md:pb-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">500+</div>
                <div className="text-sm text-white">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">100%</div>
                <div className="text-sm text-white">Handmade</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">50+</div>
                <div className="text-sm text-white">Unique Designs</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      
    </div>
  );
};

export default Hero;
