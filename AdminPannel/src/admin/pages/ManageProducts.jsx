import React, { useEffect, useState } from 'react';
import { apiFetch, API_BASE } from '../../utils/api';

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <img 
          src={product.mainImage} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400?text=No+Image+Available';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-500">{product.category}</span>
          {product.subcategory && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500">{product.subcategory}</span>
            </>
          )}
        </div>
        {product.colours && product.colours.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.colours.map((color, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {color}
              </span>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-lg font-semibold">₹{product.mrpPrice}</span>
            {product.discount > 0 && (
              <span className="text-xs text-green-600">-{product.discount}% off</span>
            )}
          </div>
          <button 
            onClick={() => onDelete(product._id)}
            className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/products');
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete product?')) return;
    try {
      await apiFetch(`/products/${id}`, { method: 'DELETE' });
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  if (error) return (
    <div className="p-4 text-red-500 bg-red-50 rounded-lg">
      <p className="text-center">{error}</p>
    </div>
  );

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
        <span className="text-sm text-gray-500">{products.length} products</span>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Products loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
