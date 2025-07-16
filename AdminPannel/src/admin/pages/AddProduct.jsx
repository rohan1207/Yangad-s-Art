import React, { useState } from 'react';
import { Loader2, Upload, Image, Video, CheckCircle, AlertCircle } from 'lucide-react';

const AddProduct = () => {
  const categoryOptions = {
    candle: [
      'All',
      'Sports Theme Candle',
      'Jar Candles',
      'Bouquet Candles',
      'Personalised Candles',
      'Flower Candle',
    ],
    crochet: [
      'All',
      'bookmarks',
      'wall decor',
      'home accessories',
      'baby items',
      'accessories',
    ],
    resin: [
      'All',
      'NewBorn',
      'Marriage',
      'Anniversary',
      'Birthday',
      'Decorative',
      'Memorial',
    ],
    tshirt: [
      'All',
      'Customized Name',
      'Customized Photo',
      'Designed Print',
      'Couple Sets',
      'Occasion Print',
      'Sports Print',
      'Group Sets',
      'Text Print',
      'Business Print',
    ],
    jewellery: ['All', 'Necklace', 'Bracelet', 'Ring','Customized Name','Customized Photo'],
  };

  const [form, setForm] = useState({
    name: '',
    category: 'candle',
    subcategory: 'All',
    description: '',
    mrpPrice: '',
    discount: 0,
    colours: '',
    productOfWeek: false,
    featured: false,
  });
  const [mainImage, setMainImage] = useState(null);
  const [additionalMedia, setAdditionalMedia] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else if (name === 'category') {
      setForm({ ...form, category: value, subcategory: categoryOptions[value][0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };


  const showSweetAlert = (type, message) => {
    setAlertType(type);
    setMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const handleSubmit = async () => {
    setIsLoading(true);
    
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (mainImage) fd.append('mainImage', mainImage);
    additionalMedia.forEach((f) => fd.append('additionalMedia', f));
    
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd,
      });
      
      if (!res.ok) throw new Error((await res.json()).message || 'Error');
      
      showSweetAlert('success', 'Product added successfully!');
      setForm({
        name: '',
        category: 'candle',
        subcategory: 'All',
        description: '',
        mrpPrice: '',
        discount: 0,
        colours: '',
        productOfWeek: false,
        featured: false,
      });
      setMainImage(null);
      setAdditionalMedia([]);
    } catch (err) {
      showSweetAlert('error', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-slate-800 mb-2">Add Product</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-slate-400 to-slate-600 mx-auto rounded-full"></div>
        </div>

        {/* Sweet Alert */}
        {showAlert && (
          <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            alertType === 'success' 
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {alertType === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{message}</span>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8">
            <div className="space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                  required
                />
              </div>

              {/* Category & Subcategory Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white capitalize"
                    required
                  >
                    {Object.keys(categoryOptions).map((cat) => (
                      <option key={cat} value={cat} className="capitalize">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Subcategory</label>
                  <select
                    name="subcategory"
                    value={form.subcategory}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                  >
                    {categoryOptions[form.category].map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your product..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white resize-none"
                />
              </div>

              {/* Price & Discount Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">MRP Price</label>
                  <input
                    type="text"
                    name="mrpPrice"
                    value={form.mrpPrice}
                    onChange={handleChange}
                    placeholder="₹0.00"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Discount (%)</label>
                  <input
                    type="text"
                    name="discount"
                    value={form.discount}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                  />
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Available Colors</label>
                <input
                  type="text"
                  name="colours"
                  value={form.colours}
                  onChange={handleChange}
                  placeholder="Red, Blue, Green..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                />
              </div>

              {/* Flags */}
              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    name="productOfWeek"
                    checked={form.productOfWeek}
                    onChange={handleChange}
                    className="w-4 h-4 text-slate-600 rounded focus:ring-0 border-slate-300"
                  />
                  Product of the Week
                </label>
                <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="w-4 h-4 text-slate-600 rounded focus:ring-0 border-slate-300"
                  />
                  Featured Product
                </label>
              </div>

              {/* File Upload Section */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Main Image</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setMainImage(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                      <div className="text-center">
                        <Image className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                        <p className="text-sm text-slate-600">
                          {mainImage ? mainImage.name : 'Click to upload main image'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Media */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Additional Media (max 5)</label>
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={(e) => setAdditionalMedia(Array.from(e.target.files).slice(0, 5))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Image className="h-6 w-6 text-slate-400" />
                          <Video className="h-6 w-6 text-slate-400" />
                        </div>
                        <p className="text-sm text-slate-600">
                          {additionalMedia.length > 0 
                            ? `${additionalMedia.length} file(s) selected` 
                            : 'Click to upload additional media'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-200 transform ${
                    isLoading
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Adding Product...</span>
                    </div>
                  ) : (
                    'Add Product'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;