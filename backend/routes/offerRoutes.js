import express from 'express';
import { getOffers, createOffer, updateOffer, deleteOffer } from '../controllers/offerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getOffers)
  .post(protect, createOffer);

router.route('/:id')
  .put(protect, updateOffer)
  .delete(protect, deleteOffer);

export default router;
