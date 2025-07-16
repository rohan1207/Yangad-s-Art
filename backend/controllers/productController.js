import Product from '../models/Product.js';

// Create Product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      subcategory,
      description,
      mrpPrice,
      discount,
      colours,
      productOfWeek: productOfWeekRaw,
      featured: featuredRaw,
    } = req.body;

    // Convert checkbox/string values to booleans
    const productOfWeek = productOfWeekRaw === 'true' || productOfWeekRaw === 'on' || productOfWeekRaw === '1' || productOfWeekRaw === true;
    const featured = featuredRaw === 'true' || featuredRaw === 'on' || featuredRaw === '1' || featuredRaw === true;

    if (!req.files || !req.files.mainImage) {
      return res.status(400).json({ message: 'Main image is required' });
    }

    const mainImageUrl = req.files.mainImage[0].path;
    const additionalMediaUrls = req.files.additionalMedia
      ? req.files.additionalMedia.map((f) => f.path)
      : [];

    const product = new Product({
      name,
      mainImage: mainImageUrl,
      additionalMedia: additionalMediaUrls,
      category,
      subcategory,
      description,
      mrpPrice: Number(mrpPrice),
      discount: Number(discount),
      colours,
      productOfWeek,
      featured,
    });

    const created = await product.save();
    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
        const filter = {};
    if (req.query.productOfWeek !== undefined) {
      filter.productOfWeek = req.query.productOfWeek === 'true' || req.query.productOfWeek === '1';
    }
    if (req.query.featured !== undefined) {
      filter.featured = req.query.featured === 'true' || req.query.featured === '1';
    }
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // If new media uploaded, update URLs
    if (req.files && req.files.mainImage) {
      product.mainImage = req.files.mainImage[0].path;
    }
    if (req.files && req.files.additionalMedia) {
      product.additionalMedia = req.files.additionalMedia.map((f) => f.path);
    }

    // Update other fields
    const fields = [
      'name',
      'category',
      'subcategory',
      'description',
      'mrpPrice',
      'discount',
      'productOfWeek',
      'featured',
      'colours',
    ];
    
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (field === 'productOfWeek' || field === 'featured') {
          product[field] = req.body[field] === 'true' || req.body[field] === 'on' || req.body[field] === '1' || req.body[field] === true;
        } else if (field === 'mrpPrice' || field === 'discount') {
          product[field] = Number(req.body[field]);
        } else {
          product[field] = req.body[field];
        }
      }
    });

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};