import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  customization: {
    name: String, // For customized name products
    photoUrl: String, // For customized photo products
    description: String, // Description for customization
    category: String, // To store the category (jewellery/t-shirt)
    subcategory: String // To store the subcategory (customized name/photo)
  }
});

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    couponApplied: { type: String },
    discountAmount: { type: Number, default: 0 },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    orderStatus: { type: String, enum: ['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'returned'], default: 'placed' },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
