import { motion } from "framer-motion";
import {
  IoHeartOutline,
  IoFlameOutline,
  IoHandRightOutline,
} from "react-icons/io5";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-20">
      {/* Hero Section */}
      <div className="relative h-[100vh] md:h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/ab.png" // Add an image of candle making or community work
            alt="Candle Making Process"
            className="w-full h-full object-cover bg-white"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-4 px-6 py-4 rounded-xl">
              Crafting Light,
              <span className="block text-amber-400 font-medium">
                Spreading Hope
              </span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900">
              Our <span className="text-amber-600">Story</span>
            </h2>
            <div className="w-24 h-0.5 bg-amber-400" />
            <p className="text-lg text-gray-600 leading-relaxed">
              We are Shreya and Shruti, two hearts united by a shared vision of
              creating beauty while making a difference. What started as a small
              home-based candle-making venture has blossomed into a
              purpose-driven mission that illuminates lives beyond just homes.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Each candle we craft is more than just a source of light—it's a
              beacon of hope for children who need it most. Every purchase
              contributes directly to supporting orphaned children, helping them
              build stronger foundations for their future.
            </p>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <IoHeartOutline className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Care with Purpose
              </h3>
              <p className="text-gray-600">
                Every product is crafted with love and intention, knowing that
                each sale supports a child's journey towards a brighter future.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <IoFlameOutline className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Quality & Impact
              </h3>
              <p className="text-gray-600">
                We believe in creating products that not only enhance your space
                but also make a meaningful difference in children's lives.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <IoHandRightOutline className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Community Support
              </h3>
              <p className="text-gray-600">
                Together with our customers, we're building a community that
                supports orphaned children physically, emotionally, and
                spiritually.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-6">
            Making a <span className="text-amber-600">Difference</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            With every candle you purchase, you're not just buying a
            product—you're investing in a child's future. Together, we can help
            them grow stronger physically, emotionally, and spiritually.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-amber-500 text-white rounded-full hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 font-medium"
          >
            Join Our Mission
          </motion.button>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-24 bg-amber-50 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          <div className="text-6xl text-amber-400 font-serif mb-6">"</div>
          <p className="text-xl md:text-2xl text-gray-800 font-light italic mb-6">
            Together, let's illuminate lives and create a brighter future for
            those who need it most.
          </p>
          <p className="text-lg text-amber-600 font-medium">
            - Shreya and Shruti
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
