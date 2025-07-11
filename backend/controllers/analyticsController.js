import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const getTopProducts = async (req, res) => {
  try {
    // First, check if we have any orders
    const orderCount = await Order.countDocuments();
    console.log(`Total orders in database: ${orderCount}`);

    // Get all orders for debugging
    const allOrders = await Order.find().lean();
    console.log('Sample order structure:', JSON.stringify(allOrders[0], null, 2));

    // First, aggregate orders to find most purchased products
    const topProductsByOrders = await Order.aggregate([
      // Unwind the items array to work with individual items
      { $unwind: "$items" },
      
      // Only include completed orders
      {
        $match: {
          "orderStatus": { $in: ["confirmed", "processing", "shipped", "delivered"] }
        }
      },

      // Group by product ID and count number of orders
      {
        $group: {
          _id: "$items.product",
          orderCount: { $sum: 1 },  // Count number of orders for each product
          totalQuantity: { $sum: "$items.qty" }  // Sum total quantities ordered (using qty instead of quantity)
        }
      },

      // Debug stage to log grouped data
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "debug_product"
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

    console.log('Aggregation result:', JSON.stringify(topProductsByOrders, null, 2));

    // If we got no results from aggregation, let's check if products exist
    const productCount = await Product.countDocuments();
    console.log(`Total products in database: ${productCount}`);

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