import Order from '../models/Order.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

export const getTopProducts = async (req, res) => {
  try {
    // First, check if we have any orders
    const orderCount = await Order.countDocuments();
    console.log(`Total orders in database: ${orderCount}`);

    // Get all orders for debugging
    const allOrders = await Order.find().lean();
    console.log('Sample order structure:', JSON.stringify(allOrders[0], null, 2));

    // Log the names of all collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    // First, aggregate orders to find most purchased products
    const topProductsByOrders = await Order.aggregate([
      // First match only confirmed/completed orders
      {
        $match: {
          orderStatus: { $in: ["confirmed", "processing", "shipped", "delivered"] }
        }
      },

      // Unwind the items array to work with individual items
      { $unwind: "$items" },
      
      // Group by product ID and count number of orders
      {
        $group: {
          _id: "$items.product",
          orderCount: { $sum: 1 },  // Count number of orders for each product
          totalQuantity: { $sum: "$items.qty" }  // Sum total quantities ordered
        }
      },

      // Log intermediate results for debugging
      {
        $project: {
          _id: 1,
          orderCount: 1,
          totalQuantity: 1,
          debug: "After grouping"
        }
      },
      
      // Sort by order count (number of times ordered) in descending order
      { $sort: { orderCount: -1 } },
      
      // Limit to top 5 products
      { $limit: 5 },
      
      // Log the grouped results before lookup
      {
        $project: {
          _id: 1,
          orderCount: 1,
          totalQuantity: 1,
          debug: "Before product lookup"
        }
      },

      // Lookup product details
      {
        $lookup: {
          from: "products", // This should match your actual collection name
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },

      // Log the results after lookup
      {
        $project: {
          _id: 1,
          orderCount: 1,
          totalQuantity: 1,
          productArray: "$product",
          debug: "After product lookup"
        }
      },
      
      // Unwind the product array
      { $unwind: "$product" },
      
      // Only get products that are active and in stock
      {
        $match: {
          "product.isActive": true,
          "product.quantity": { $gt: 0 }
        }
      },
      
      // Project only needed fields
      {
        $project: {
          _id: "$product._id",
          name: "$product.name",
          description: "$product.description",
          mainImage: "$product.mainImage",
          mrpPrice: "$product.mrpPrice",
          discount: "$product.discount",
          orderCount: 1,
          totalQuantity: 1
        }
      }
    ]);

    console.log('Aggregation result:', JSON.stringify(topProductsByOrders, null, 2));

    // Debug: Check collection names and document counts
    const orderCollection = mongoose.model('Order').collection.collectionName;
    const productCollection = mongoose.model('Product').collection.collectionName;
    console.log('Collection names:', {
      orderCollection,
      productCollection
    });

    // Debug: Check a sample order's items structure
    const sampleOrder = await Order.findOne({ orderStatus: "confirmed" });
    console.log('Sample confirmed order:', JSON.stringify(sampleOrder, null, 2));

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