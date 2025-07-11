import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

// Upload config: mainImage (single), additionalMedia (array up to 5 files)
const uploadFields = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'additionalMedia', maxCount: 5 },
]);

router.route('/').get(getProducts).post(uploadFields, createProduct);
router
  .route('/:id')
  .get(getProductById)
  .put(uploadFields, updateProduct)
  .delete(deleteProduct);

export default router;
