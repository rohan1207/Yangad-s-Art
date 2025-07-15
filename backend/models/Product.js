import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mainImage: {
      type: String, 
      required: true,
    },
    additionalMedia: {
      type: [String], // URLs from Cloudinary (image or video)
      validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
    },
    description: {
      type: String,
    },
    mrpPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    productOfWeek: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    colours: {
      type: [String],
      default: [],
      set: (v) => (Array.isArray(v) ? v : v.split(',').map((c) => c.trim())),
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 5;
}

const Product = mongoose.model('Product', productSchema);
export default Product;
