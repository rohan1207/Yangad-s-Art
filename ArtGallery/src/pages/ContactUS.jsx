import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactUs() {
  const [isMapLoading, setIsMapLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white pt-24 pb-16"
    >
      {/* Map Section */}
      <div className="relative w-full h-[400px] mb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full relative"
        >
          {isMapLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 font-medium">Loading map...</p>
              </div>
            </div>
          )}
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30169.95814492947!2d75.33714519654813!3d19.870767651290777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb9815a369bc63%3A0x712d538b29a2a73e!2sChhatrapati%20Sambhaji%20Nagar%2C%20Maharashtra%20431001!5e0!3m2!1sen!2sin!4v1688395427159!5m2!1sen!2sin"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsMapLoading(false)}
          ></iframe>

          {/* Contact Info Overlay */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-24 w-[95%] max-w-5xl">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <ContactInfo />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Intro Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4">
              Let's Start a{" "}
              <span className="text-amber-600 font-medium">Conversation</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're interested in a bulk order, custom design, or just
              want to say hello, we'd love to hear from you. Choose your
              preferred way to connect with us.
            </p>
          </motion.div>

          {/* Contact Form */}
          <ContactForm />

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <h2 className="text-xl font-serif font-light text-gray-900 mb-3">
              Business <span className="text-amber-600 font-medium">Hours</span>
            </h2>
            <p className="text-gray-600">
              Monday - Saturday: 10:00 AM - 7:00 PM
              <br />
              Sunday: Closed
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
