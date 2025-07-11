import express from 'express';
import { getTopProducts } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/top-products', getTopProducts);

export default router;
