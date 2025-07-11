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
    } = req.body;

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
    const products = await Product.find();
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
      'colours',
    ];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
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
