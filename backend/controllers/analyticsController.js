import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const getTopProducts = async (req, res) => {
  try {
    // First, aggregate orders to find most purchased products
    const topProductsByOrders = await Order.aggregate([
      // Unwind the items array to work with individual items
      { $unwind: "$items" },
      
      // Group by product ID and count number of orders
      {
        $group: {
          _id: "$items.product",
          orderCount: { $sum: 1 },  // Count number of orders for each product
          totalQuantity: { $sum: "$items.quantity" }  // Sum total quantities ordered
        }
      },
      
      // Sort by order count (number of times ordered) in descending order
      { $sort: { orderCount: -1 } },
      
      // Limit to top 5 products
      { $limit: 5 },
      
      // Lookup product details
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      
      // Unwind the productDetails array
      { $unwind: "$productDetails" },
      
      // Only get products that are active and in stock
      {
        $match: {
          "productDetails.isActive": true,
          "productDetails.quantity": { $gt: 0 }
        }
      },
      
      // Project only needed fields
      {
        $project: {
          _id: "$productDetails._id",
          name: "$productDetails.name",
          description: "$productDetails.description",
          mainImage: "$productDetails.mainImage",
          mrpPrice: "$productDetails.mrpPrice",
          discount: "$productDetails.discount",
          orderCount: 1,
          totalQuantity: 1
        }
      }
    ]);

    console.log('Top products by orders:', topProductsByOrders);

    if (topProductsByOrders.length > 0) {
      return res.json(topProductsByOrders);
    }

    // If no products with orders found, return newest products
    const newProducts = await Product.find({
      isActive: true,
      quantity: { $gt: 0 }
    })
    .select('_id name description mainImage mrpPrice discount')
    .sort({ createdAt: -1 })
    .limit(5);

    console.log('Sending new products:', newProducts);
    res.json(newProducts);
  } catch (error) {
    console.error('Error in getTopProducts:', error);
    res.status(500).json({ 
      message: 'Failed to fetch top products',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};