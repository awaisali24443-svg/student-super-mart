import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { itemCount, setIsCartOpen } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
  ];

  if (isAdmin) {
    navLinks.push({ name: 'Admin Dashboard', path: '/admin' });
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-emerald-600">
              <i className="fa-solid fa-leaf"></i>
              <span>FreshMarket</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`text-sm font-medium transition-colors hover:text-emerald-600 ${location.pathname === link.path ? 'text-emerald-600' : 'text-gray-600'}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium hidden md:block">{user.name}</span>
                  <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 text-sm">
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-emerald-600">
                  Login
                </Link>
              )}

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                aria-label="Open cart"
              >
                <i className="fa-solid fa-cart-shopping text-xl"></i>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-gray-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg absolute w-full left-0">
            <nav className="flex flex-col space-y-3">
              {navLinks.map(link => (
                <Link 
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 font-medium py-2 hover:text-emerald-600"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
              <i className="fa-solid fa-leaf text-emerald-500"></i>
              <span>FreshMarket</span>
            </div>
            <p className="text-sm text-gray-400">
              Fresh groceries delivered to your doorstep. Local produce, organic options, and everyday essentials.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-emerald-500">All Products</Link></li>
              <li><Link to="/shop?category=Produce" className="hover:text-emerald-500">Produce</Link></li>
              <li><Link to="/shop?category=Dairy%20%26%20Eggs" className="hover:text-emerald-500">Dairy & Eggs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-emerald-500">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-emerald-500">Careers</Link></li>
              <li><Link to="/privacy" className="hover:text-emerald-500">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Newsletter</h3>
            <p className="text-xs text-gray-400 mb-2">Get weekly recipes and deals.</p>
            <div className="flex">
              <input type="email" placeholder="Email address" className="bg-gray-800 text-white px-3 py-2 rounded-l w-full focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-r hover:bg-emerald-700">Join</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};