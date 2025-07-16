import { useEffect, useState, useRef } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJson } from "../utils/api";
import { IoArrowBackOutline } from "react-icons/io5";
import axios from "axios";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mainImg, setMainImg] = useState("");
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const { addItem } = useCart();
  const { user } = useAuth();
  const [customization, setCustomization] = useState({
    name: "",
    photoUrl: "",
    description: "",
    hasCustomization: false,
  });

  // File input ref for photo upload
  const fileInputRef = useRef(null);

  // Check if product needs customization
  useEffect(() => {
    if (product) {
      const needsCustomization =
        ["jewellery", "t-shirt"].includes(product.category.toLowerCase()) &&
        ["Customized Name", "Customized Photo"].includes(product.subcategory);
      setCustomization((prev) => ({
        ...prev,
        hasCustomization: needsCustomization,
      }));
    }
  }, [product]);

  // Fetch product on mount
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchJson(`/products/${id}`);
        setProduct(data);
        setMainImg(data.mainImage);
      } catch (e) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // Derived values calculated every render (safe before early return)
  const colourArray = product
    ? Array.isArray(product.colours)
      ? product.colours
      : (product.colours || "").split(",").map((c) => c.trim())
    : [];
  const discountedPrice = product
    ? product.mrpPrice - (product.mrpPrice * product.discount) / 100
    : 0;

  const [selectedColour, setSelectedColour] = useState("");

  useEffect(() => {
    if (colourArray.length) setSelectedColour(colourArray[0]);
  }, [colourArray]);

  // Handle photo upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "yangart_uploads");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dscbo7ibc/mainImage/upload",
        formData
      );
      setCustomization((prev) => ({
        ...prev,
        photoUrl: response.data.secure_url,
      }));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Failed to upload image. Please try again.",
      });
    }
  };

  // Validate customization before add to cart/buy
  const validateCustomization = () => {
    if (!customization.hasCustomization) return true;

    if (
      product.subcategory === "Customized Name" &&
      !customization.name.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Name Required",
        text: "Please enter the name for customization",
      });
      return false;
    }

    if (product.subcategory === "Customized Photo" && !customization.photoUrl) {
      Swal.fire({
        icon: "warning",
        title: "Photo Required",
        text: "Please upload a photo for customization",
      });
      return false;
    }

    if (!customization.description.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Description Required",
        text: "Please provide a description for your customization",
      });
      return false;
    }

    return true;
  };

  const isCustomizationFilled = () => {
    if (!customization.hasCustomization) return true;
    if (
      product.subcategory === "Customized Name" &&
      !customization.name.trim()
    ) {
      return false;
    }
    if (product.subcategory === "Customized Photo" && !customization.photoUrl) {
      return false;
    }
    if (!customization.description.trim()) {
      return false;
    }
    return true;
  };

  // Modify existing addToCart function
  const addToCart = () => {
    if (!validateCustomization()) return;

    addItem({
      _id: product._id,
      name: product.name,
      price: discountedPrice,
      qty,
      colour: selectedColour,
      customization: customization.hasCustomization
        ? {
            name: customization.name,
            photoUrl: customization.photoUrl,
            description: customization.description,
            category: product.category,
            subcategory: product.subcategory,
          }
        : undefined,
    });

    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // Modify existing buyNow function
  const buyNow = () => {
    if (!validateCustomization()) return;

    addItem({
      _id: product._id,
      name: product.name,
      price: discountedPrice,
      qty,
      colour: selectedColour,
      customization: customization.hasCustomization
        ? {
            name: customization.name,
            photoUrl: customization.photoUrl,
            description: customization.description,
            category: product.category,
            subcategory: product.subcategory,
          }
        : undefined,
    });

    navigate("/cart");
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[400px] mt-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500 mb-6"></div>
        <div className="text-2xl font-serif text-amber-600 mb-2">
          Happiness is loading...
        </div>
        <div className="text-gray-500 text-lg">
          Smile! Your art is on its way 😊
        </div>
      </div>
    );
  if (error || !product)
    return (
      <div className="text-red-500 text-center py-20">
        {error || "Product not found"}
      </div>
    );

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
        <div className="flex md:w-1/2 gap-4">
          {/* thumbnails */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible md:max-h-[400px]">
            {[product.mainImage, ...product.additionalMedia].map((img, i) => (
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
          <div className="flex-1">
            <img
              src={mainImg}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded"
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
                    showDenyButton: false,
                    denyButtonText: "Sign up",
                  });
                  if (isConfirmed) return navigate("/login");
                  if (dismiss === Swal.DenyReason.cancel)
                    return navigate("/signup");
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
    </div>
  );
};

export default ProductDetailPage;
