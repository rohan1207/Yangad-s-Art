import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

export const getTopProducts = async (req, res) => {
  try {
    // First try to get products with orders
    const productsWithOrders = await Product.find({
      isActive: true,
      quantity: { $gt: 0 }
    })
    .select('name description mainImage mrpPrice discount')
    .sort({ orderCount: -1, viewCount: -1 })
    .limit(5);

    if (productsWithOrders.length > 0) {
      return res.json(productsWithOrders);
    }

    // If no products with orders found, return newest products
    const newProducts = await Product.find({
      isActive: true,
      quantity: { $gt: 0 }
    })
    .select('name description mainImage mrpPrice discount')
    .sort({ createdAt: -1 })
    .limit(5);

    res.json(newProducts);
  } catch (error) {
    console.error('Error in getTopProducts:', error);
    res.status(500).json({ message: 'Failed to fetch top products' });
  }
};
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
