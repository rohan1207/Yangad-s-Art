import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start p-4 sm:p-6 gap-6 sm:gap-8 w-full max-w-4xl mx-auto z-10">
      {/* Address */}
      <div className="flex items-start gap-3 w-full sm:w-1/3">
        <div className="w-10 h-10 sm:w-9 sm:h-9 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex justify-center items-center shrink-0">
          <FaMapMarkerAlt className="text-white text-lg sm:text-base" />
        </div>
        <div className="text-left">
          <div className="flex items-center">
            <h3 className="font-semibold text-base sm:text-lg">
              Visit Our Store
            </h3>
          </div>
          <a
            href="https://maps.app.goo.gl/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 text-sm leading-tight mt-1 hover:text-amber-500 transition-colors duration-200 block"
          >
            Chhatrapati Sambhaji Nagar,
            <br />
            Maharashtra, 431001
          </a>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start gap-3 w-full sm:w-1/3">
        <div className="w-10 h-10 sm:w-9 sm:h-9 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex justify-center items-center shrink-0">
          <FaPhoneAlt className="text-white text-lg sm:text-base" />
        </div>
        <div className="text-left">
          <div className="flex items-center">
            <h3 className="font-semibold text-base sm:text-lg">Call Us</h3>
          </div>
          <p className="text-gray-600 text-sm leading-tight mt-1">
            <a
              href="tel:+917559330901"
              className="hover:text-amber-500 transition-colors duration-200"
            >
              +91 7559330901
            </a>
            <br />
            <span className="text-xs text-gray-500">
              Available 10 AM - 7 PM
            </span>
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start gap-3 w-full sm:w-1/3">
        <div className="w-10 h-10 sm:w-9 sm:h-9 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex justify-center items-center shrink-0">
          <FaEnvelope className="text-white text-lg sm:text-base" />
        </div>
        <div className="text-left">
          <div className="flex items-center">
            <h3 className="font-semibold text-base sm:text-lg">Email Us</h3>
          </div>
          <p className="text-gray-600 text-sm leading-tight mt-1">
            <a
              href="mailto:yanhad@gmail.com"
              className="hover:text-amber-500 transition-colors duration-200"
            >
              yanhad@gmail.com
            </a>
            <br />
            <span className="text-xs text-gray-500">
              For orders & inquiries
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
