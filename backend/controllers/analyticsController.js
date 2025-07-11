import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const getTopProducts = async (req, res) => {
  try {
    // Aggregate orders to get product counts
    const topProducts = await Order.aggregate([
      // Unwind the items array to work with individual items
      { $unwind: '$items' },
      
      // Group by product ID and sum quantities
      {
        $group: {
          _id: '$items.product',
          totalOrders: { $sum: '$items.qty' }
        }
      },
      
      // Sort by total orders in descending order
      { $sort: { totalOrders: -1 } },
      
      // Limit to top 7 products
      { $limit: 7 },
      
      // Lookup product details
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      
      // Unwind the productDetails array
      { $unwind: '$productDetails' },
      
      // Project only needed fields
      {
        $project: {
          _id: '$productDetails._id',
          name: '$productDetails.name',
          description: '$productDetails.description',
          mainImage: '$productDetails.mainImage',
          category: '$productDetails.category',
          mrpPrice: '$productDetails.mrpPrice',
          discount: '$productDetails.discount',
          totalOrders: 1
        }
      }
    ]);

    res.json(topProducts);
  } catch (error) {
    console.error('Error fetching top products:', error);
    res.status(500).json({ message: 'Failed to fetch top products' });
  }
};
