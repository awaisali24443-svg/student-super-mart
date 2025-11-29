import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, INITIAL_PRODUCTS } from '../constants';

export const Home: React.FC = () => {
  // Select top 4 items that are on sale for the featured section
  const featured = INITIAL_PRODUCTS.filter(p => p.isOnSale).slice(0, 4);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero */}
      <section className="relative bg-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1920')] bg-center bg-cover"></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32 max-w-4xl text-center">
          <span className="bg-emerald-800/80 px-3 py-1 rounded-full text-sm font-medium text-emerald-100 mb-4 inline-block">
            Delivering in Shabqadar, Charsadda & Peshawar
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Fresh Market at Your Doorstep.
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Get fresh produce, famous Rajjar Mithai, Charsadda Gurr, and daily essentials delivered to your home.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/shop" className="bg-white text-emerald-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
              Shop Now
            </Link>
            <Link to="/shop?sale=true" className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
              View Deals
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map(cat => (
            <Link 
              key={cat} 
              to={`/shop?category=${encodeURIComponent(cat)}`}
              className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center hover:shadow-md transition-shadow hover:border-emerald-200"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                <i className={`fa-solid ${getCategoryIcon(cat)}`}></i>
              </div>
              <span className="font-medium text-gray-700 text-center">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 bg-emerald-50 rounded-3xl p-8 md:p-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Bachat Bazaar Deals</h2>
            <p className="text-gray-500 mt-2">Save big on this week's fresh picks.</p>
          </div>
          <Link to="/shop" className="text-emerald-600 font-medium hover:underline hidden md:block">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <Link key={product.id} to={`/product/${product.slug}`} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all group">
              <div className="relative overflow-hidden rounded-lg mb-4 h-48 bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {product.isOrganic && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">Organic</span>
                )}
                {product.isOnSale && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">On Sale</span>
                )}
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.unit}</p>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-lg font-bold text-emerald-700">Rs. {product.price.toFixed(0)}</span>
                    {product.isOnSale && <span className="text-xs text-gray-400 line-through">Rs. {(product.price * 1.2).toFixed(0)}</span>}
                </div>
                <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center py-8">
        <div>
          <div className="text-emerald-600 text-4xl mb-4"><i className="fa-solid fa-truck-fast"></i></div>
          <h3 className="font-bold text-lg mb-2">Fast Local Delivery</h3>
          <p className="text-gray-500 text-sm">We deliver in Shabqadar, Matta, and nearby areas rapidly.</p>
        </div>
        <div>
          <div className="text-emerald-600 text-4xl mb-4"><i className="fa-solid fa-medal"></i></div>
          <h3 className="font-bold text-lg mb-2">Pure Quality</h3>
          <p className="text-gray-500 text-sm">Direct from farms in Charsadda to your table.</p>
        </div>
        <div>
          <div className="text-emerald-600 text-4xl mb-4"><i className="fa-solid fa-hand-holding-dollar"></i></div>
          <h3 className="font-bold text-lg mb-2">Cash on Delivery</h3>
          <p className="text-gray-500 text-sm">Pay when you receive your order at your doorstep.</p>
        </div>
      </section>
    </div>
  );
};

function getCategoryIcon(cat: string) {
  switch(cat) {
    case 'Produce': return 'fa-carrot';
    case 'Dairy & Eggs': return 'fa-cow';
    case 'Bakery': return 'fa-bread-slice';
    case 'Pantry': return 'fa-jar';
    case 'Beverages': return 'fa-bottle-water';
    case 'Snacks': return 'fa-cookie-bite';
    case 'Local Specialties': return 'fa-star';
    default: return 'fa-basket-shopping';
  }
}