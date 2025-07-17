import { useEffect, useState, useRef } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJson } from "../utils/api";
import { IoArrowBackOutline } from "react-icons/io5";
import axios from "axios";




function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming you have an auth context
  const fileInputRef = useRef(null);

  // Product state
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI state
  const [mainImg, setMainImg] = useState('');
  const [qty, setQty] = useState(1);
  const [selectedColour, setSelectedColour] = useState('');
  const [pincode, setPincode] = useState('');
  
  // Customization state
  const [customization, setCustomization] = useState({
    hasCustomization: false,
    name: '',
    photoUrl: '',
    description: ''
  });

  // Related products state
  const [related, setRelated] = useState([]);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await fetchJson(`/products/${id}`);
        setProduct(productData);
        setMainImg(productData.mainImage);
        
        // Check if product has customization
        if (productData.subcategory === "Customized Name" || 
            productData.subcategory === "Customized Photo") {
          setCustomization(prev => ({ ...prev, hasCustomization: true }));
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Fetch related products when product is loaded
  useEffect(() => {
    const fetchRelated = async () => {
      if (!product || !product.category) return;
      try {
        const all = await fetchJson(`/products`);
        // Filter by same category, exclude current product
        const rel = all.filter(
          (p) => p.category === product.category && p._id !== product._id
        ).slice(0, 4);
        setRelated(rel);
      } catch (err) {
        console.error('Error fetching related products:', err);
      }
    };

    fetchRelated();
  }, [product]);

  // Handle photo upload for customization
  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // Assuming you have an upload utility
      const photoUrl = await uploadImage(file);
      setCustomization(prev => ({
        ...prev,
        photoUrl: photoUrl
      }));
    } catch (err) {
      console.error('Error uploading photo:', err);
      Swal.fire('Error', 'Failed to upload photo', 'error');
    }
  };

  // Validate customization fields
  const isCustomizationFilled = () => {
    if (!customization.hasCustomization) return true;
    
    if (product.subcategory === "Customized Name") {
      return customization.name.trim() !== '';
    }
    
    if (product.subcategory === "Customized Photo") {
      return customization.photoUrl !== '';
    }
    
    return true;
  };

  const validateCustomization = () => {
    if (!customization.hasCustomization) return true;
    
    if (!isCustomizationFilled()) {
      Swal.fire('Error', 'Please fill in all customization details', 'error');
      return false;
    }
    
    return true;
  };

  // Add to cart function (client-side cart)
  const { addItem } = useCart();
  const addToCart = () => {
    if (!validateCustomization()) return;

    addItem({
      _id: product._id,
      name: product.name,
      price: discountedPrice,
      qty,
      colour: selectedColour,
      mainImage: product.mainImage,
      customization: customization.hasCustomization
        ? {
            name: customization.name,
            photoUrl: customization.photoUrl,
            description: customization.description,
          }
        : undefined,
    });

    Swal.fire('Hurray!', 'Item added to cart!', 'success');
  };

  // Buy now function
  const buyNow = async () => {
    if (!validateCustomization()) return;

    try {
      const orderItem = {
        productId: product._id,
        quantity: qty,
        colour: selectedColour,
        customization: customization.hasCustomization ? {
          name: customization.name,
          photoUrl: customization.photoUrl,
          description: customization.description
        } : null
      };

      // Navigate to checkout or create order
      navigate('/checkout', { state: { items: [orderItem] } });
    } catch (err) {
      console.error('Error processing buy now:', err);
      Swal.fire('Error', 'Failed to process order', 'error');
    }
  };

  // Loading state
   if (loading){
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[400px] mt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500 mb-6"></div>
        <div className="text-2xl font-serif text-amber-600 mb-2">
          Happiness is loading...
        </div>
        <div className="text-gray-500 text-lg">
          Smile! Your art is on its way 😊
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">{error || 'Product not found'}</div>
        </div>
      </div>
    );
  }

  // Calculate discounted price
  const discountedPrice = product.mrpPrice - (product.mrpPrice * (product.discount || 0) / 100);
  
  // Parse colours from product (handle both array and string)
  const colourArray = Array.isArray(product.colours)
    ? product.colours
    : (product.colours || '').split(',').map(c => c.trim()).filter(Boolean);

  // Set default colour if not selected (fix: use useEffect to avoid infinite re-render)
  useEffect(() => {
    if (colourArray.length > 0 && !selectedColour) {
      setSelectedColour(colourArray[0]);
    }
    // eslint-disable-next-line
  }, [colourArray, selectedColour]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 mb-6 text-amber-600"
      >
        <IoArrowBackOutline /> Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Images */}
        <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-4">
          {/* thumbnails */}
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible md:min-h-[400px]">
            {[product.mainImage, ...(product.additionalMedia || [])].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={product.name}
                onClick={() => setMainImg(img)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  mainImg === img ? "border-amber-500" : "border-transparent"
                }`}
              />
            ))}
          </div>
          {/* main image */}
          <div className="w-full md:flex-1 mt-4 md:mt-0 flex items-center justify-center">
            <img
              src={mainImg}
              alt={product.name}
              className="w-full max-w-xs h-80 md:h-[400px] object-cover rounded"
            />
          </div>
        </div>

        {/* Details */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-gray-700 whitespace-pre-line">
            {product.description}
          </p>

          {/* Price */}
          <div className="space-x-2 text-lg">
            <span className="text-amber-600 font-medium">
              ₹{discountedPrice.toFixed(0)}
            </span>
            {product.discount > 0 && (
              <>
                <span className="line-through text-gray-500 text-sm">
                  ₹{product.mrpPrice}
                </span>
                <span className="text-green-600 text-sm">
                  {product.discount}% Off
                </span>
              </>
            )}
          </div>

          {/* Colours */}
          {colourArray.length > 0 && (
            <div>
              <h4 className="font-medium mb-1">Colours</h4>
              <div className="flex gap-2 flex-wrap">
                {colourArray.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColour(c)}
                    className={`px-2 py-1 rounded-full text-sm ${
                      selectedColour === c
                        ? "bg-amber-500 text-white"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <label htmlFor="qty" className="font-medium">
              Quantity
            </label>
            <input
              id="qty"
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-20 border rounded px-2 py-1"
            />
          </div>

          {/* Customization fields */}
          {customization.hasCustomization && (
            <div className="mb-6 space-y-4 border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-900">
                Customization Details
              </h3>

              {product.subcategory === "Customized Name" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Name for Customization
                  </label>
                  <input
                    type="text"
                    value={customization.name}
                    onChange={(e) =>
                      setCustomization((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                    placeholder="Enter name to be customized"
                  />
                </div>
              )}

              {product.subcategory === "Customized Photo" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Photo for Customization
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    {customization.photoUrl ? "Change Photo" : "Upload Photo"}
                  </button>
                  {customization.photoUrl && (
                    <div className="mt-2">
                      <img
                        src={customization.photoUrl}
                        alt="Uploaded"
                        className="h-20 w-20 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customization Description
                </label>
                <textarea
                  value={customization.description}
                  onChange={(e) =>
                    setCustomization((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Provide any specific details or requirements for your customization"
                  rows="3"
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              className="flex-1 bg-amber-500 text-white py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={
                customization.hasCustomization && !isCustomizationFilled()
              }
              onClick={addToCart}
            >
              Add to Cart
            </button>
            <button
              className="flex-1 border border-amber-500 text-amber-600 py-2 rounded disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={
                customization.hasCustomization && !isCustomizationFilled()
              }
              onClick={async () => {
                if (!validateCustomization()) return;

                if (!user) {
                  const { isConfirmed, dismiss } = await Swal.fire({
                    title: "Please login",
                    text: "You need to login or signup to continue checkout",
                    confirmButtonText: "Login",
                    showDenyButton: true,
                    denyButtonText: "Sign up",
                  });
                  if (isConfirmed) return navigate("/login");
                  if (dismiss === Swal.DismissReason.deny) return navigate("/signup");
                  return;
                }
                buyNow();
              }}
            >
              Buy Now
            </button>
          </div>

          {/* Pincode */}
          <div className="mt-4 space-y-1">
            <label htmlFor="pin" className="font-medium">
              Enter Pincode to check availability
            </label>
            <div className="flex gap-2">
              <input
                id="pin"
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="border rounded px-2 py-1 flex-1"
              />
              <button className="bg-amber-500 text-white px-4 rounded">
                Check
              </button>
            </div>
            {pincode && (
              <p className="text-green-600 text-sm">
                Delivered in 3-5 Days • Free Delivery over ₹799
              </p>
            )}
          </div>

          {/* Info */}
          <div className="mt-6 text-sm text-gray-700 space-y-2">
            <div>
              <h4 className="font-medium">Product Description</h4>
              <p>{product.description}</p>
            </div>
            <div>
              <h4 className="font-medium">Return Policy</h4>
              <p>
                You can avail hassle free return within 7 days of delivery.
                Return fee of ₹100 applicable.
              </p>
              <p>How can I return my order?</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-amber-600">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
                onClick={() => navigate(`/product/${p._id}`)}
              >
                <img
                  src={p.mainImage}
                  alt={p.name}
                  className="w-full h-40 object-cover object-center"
                />
                <div className="p-4">
                  <div className="font-medium text-gray-900 line-clamp-1">{p.name}</div>
                  <div className="text-amber-600 font-semibold mt-1">₹{p.mrpPrice}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;