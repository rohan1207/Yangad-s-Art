import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Automatically configures using CLOUDINARY_URL env var, but we can explicitly set values if desired.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dscbo7ibc',
  api_key: process.env.CLOUDINARY_API_KEY || '931979175359265',
  api_secret: process.env.CLOUDINARY_API_SECRET || undefined, // Keep secret in .env
});

// Storage for images/videos
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'yangart/products',
      resource_type: 'auto', // auto-detect image or video
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max per file
});

export { cloudinary, upload };
