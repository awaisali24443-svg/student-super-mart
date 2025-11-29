import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CartSidebar } from './components/CartSidebar';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/success" element={
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-3xl mb-6">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
                  <p className="text-gray-500 max-w-md mb-8">We've received your order and will begin preparing it shortly. You will receive an email confirmation.</p>
                  <a href="#/" className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-700">Continue Shopping</a>
                </div>
              } />
              <Route path="/404" element={<div>Page Not Found</div>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
          <CartSidebar />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;