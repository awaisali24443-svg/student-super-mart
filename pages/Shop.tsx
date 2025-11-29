import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Product } from '../types';
import { api } from '../services/mockApi';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../constants';

export const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categoryParam = queryParams.get('category');
  const searchParam = queryParams.get('q');
  
  const { addToCart } = useCart();
  
  // Filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [onlyOrganic, setOnlyOrganic] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await api.getProducts(categoryParam || undefined, searchParam || undefined);
      setProducts(data);
      setLoading(false);
    };
    fetch();
  }, [categoryParam, searchParam]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.price >= priceRange[0] && 
      p.price <= priceRange[1] && 
      (!onlyOrganic || p.isOrganic)
    );
  }, [products, priceRange, onlyOrganic]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/shop" 
                  className={`block text-sm ${!categoryParam ? 'text-emerald-600 font-bold' : 'text-gray-600 hover:text-emerald-600'}`}
                >
                  All Products
                </Link>
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <Link 
                    to={`/shop?category=${encodeURIComponent(cat)}`}
                    className={`block text-sm ${categoryParam === cat ? 'text-emerald-600 font-bold' : 'text-gray-600 hover:text-emerald-600'}`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">Filters</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={onlyOrganic} 
                  onChange={e => setOnlyOrganic(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500" 
                />
                <span className="text-sm text-gray-700">Organic Only</span>
              </label>

              <div>
                <label className="text-sm text-gray-700 mb-2 block">Max Price: Rs. {priceRange[1]}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  step="100"
                  value={priceRange[1]} 
                  onChange={e => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{categoryParam || 'All Products'}</h1>
            <p className="text-gray-500">{filteredProducts.length} items found</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="h-80 bg-gray-100 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Link key={product.id} to={`/product/${product.slug}`} className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden">
                  <div className="relative h-48 bg-gray-50 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    {product.stock < 10 && (
                      <span className="absolute bottom-2 right-2 bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                        Only {product.stock} left
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{product.name}</h3>
                      <div className="flex items-center gap-1 my-1">
                        <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
                        <span className="text-xs text-gray-500">{product.rating}</span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-2">{product.description}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-gray-900">Rs. {product.price.toFixed(0)}</p>
                        <p className="text-xs text-gray-400">per {product.unit}</p>
                      </div>
                      <button 
                        onClick={(e) => handleAddToCart(e, product)}
                        className="bg-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-emerald-700 hover:scale-105 transition-all shadow-emerald-200 shadow-md"
                        aria-label="Add to cart"
                      >
                        <i className="fa-solid fa-cart-plus"></i>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};