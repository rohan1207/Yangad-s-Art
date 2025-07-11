import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

export const getTopProducts = async (req, res) => {
  try {
    // Try to get top products based on order count and view count
    const topProducts = await Product.find({
      isActive: true,
      quantity: { $gt: 0 }
    })
    .select('_id name description mainImage mrpPrice discount')
    .sort({ orderCount: -1, viewCount: -1 })
    .limit(5);

    if (topProducts.length > 0) {
      return res.json(topProducts);
    }

    // If no products with orders/views found, return newest products
    const newProducts = await Product.find({
      isActive: true,
      quantity: { $gt: 0 }
    })
    .select('_id name description mainImage mrpPrice discount')
    .sort({ createdAt: -1 })
    .limit(5);

    // If still no products found, return empty array
    if (!newProducts.length) {
      return res.json([]);
    }

    res.json(newProducts);
  } catch (error) {
    console.error('Error in getTopProducts:', error);
    res.status(500).json({ 
      message: 'Failed to fetch top products',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
