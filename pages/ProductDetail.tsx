import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { api } from '../services/mockApi';
import { useCart } from '../context/CartContext';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (slug) {
      api.getProductBySlug(slug).then(p => {
        if (p) setProduct(p);
        else navigate('/404');
      });
    }
  }, [slug, navigate]);

  if (!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-sm">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover max-h-[500px]" />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <span className="text-emerald-600 font-bold text-sm uppercase tracking-wide">{product.category}</span>
            <h1 className="text-4xl font-bold text-gray-900 mt-2">{product.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex text-yellow-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fa-solid fa-star ${i < Math.floor(product.rating) ? '' : 'text-gray-300'}`}></i>
                ))}
              </div>
              <span className="text-gray-500 text-sm">124 reviews</span>
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

          <div className="flex flex-wrap gap-2">
            {product.isOrganic && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Organic</span>
            )}
            {product.isOnSale && (
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">On Sale</span>
            )}
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">In Stock: {product.stock}</span>
          </div>

          <div className="border-t border-b border-gray-100 py-6">
            <div className="flex items-end gap-2 mb-6">
              <span className="text-4xl font-bold text-gray-900">Rs. {product.price.toFixed(0)}</span>
              <span className="text-gray-500 mb-1">/ {product.unit}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-3 hover:bg-gray-100 text-gray-600"
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span className="w-12 text-center font-bold text-lg">{qty}</span>
                <button 
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="px-4 py-3 hover:bg-gray-100 text-gray-600"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>

              <button 
                onClick={() => addToCart(product, qty)}
                className="flex-1 bg-emerald-600 text-white font-bold rounded-lg px-8 py-3 hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all active:scale-95"
              >
                Add to Cart - Rs. {(product.price * qty).toFixed(0)}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Nutrition Facts (Per 100g)</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Calories</div>
                <div className="font-bold text-gray-900">89</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Carbs</div>
                <div className="font-bold text-gray-900">23g</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Protein</div>
                <div className="font-bold text-gray-900">1.1g</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Fat</div>
                <div className="font-bold text-gray-900">0.3g</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};