import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/mockApi';
import { Order, Product } from '../types';

export const Admin: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<Product[]>([]);

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/login');
      return;
    }
    
    // Fetch data
    const loadData = async () => {
      const ords = await api.getOrders();
      setOrders(ords);
      const prods = await api.getProducts();
      setInventory(prods);
    };
    loadData();
  }, [user, isAdmin, navigate]);

  const handleStatusUpdate = async (id: string, newStatus: any) => {
    await api.updateOrderStatus(id, newStatus);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handleStockUpdate = async (id: string, newStock: number) => {
    await api.updateProductStock(id, newStock);
    setInventory(prev => prev.map(p => p.id === id ? { ...p, stock: newStock } : p));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-medium text-sm">
          Logged in as Admin
        </div>
      </div>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('orders')}
          className={`pb-4 px-4 font-medium transition-colors ${activeTab === 'orders' ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Recent Orders
        </button>
        <button 
          onClick={() => setActiveTab('inventory')}
          className={`pb-4 px-4 font-medium transition-colors ${activeTab === 'inventory' ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Inventory Management
        </button>
      </div>

      {activeTab === 'orders' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
              <tr>
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-4 font-mono text-sm text-gray-600">{order.id}</td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-xs text-gray-500">{order.email}</div>
                  </td>
                  <td className="p-4 font-bold text-gray-900">Rs. {order.total.toFixed(0)}</td>
                  <td className="p-4 text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm bg-white outline-none focus:border-emerald-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="preparing">Preparing</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
              <tr>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium text-right">Price</th>
                <th className="p-4 font-medium text-center">Stock Level</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inventory.map(prod => (
                <tr key={prod.id}>
                  <td className="p-4 flex items-center gap-3">
                    <img src={prod.image} alt="" className="w-10 h-10 rounded object-cover bg-gray-100" />
                    <span className="font-medium text-gray-900">{prod.name}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{prod.category}</td>
                  <td className="p-4 text-right font-mono">Rs. {prod.price.toFixed(0)}</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleStockUpdate(prod.id, Math.max(0, prod.stock - 1))}
                        className="text-gray-400 hover:text-emerald-600"
                      >
                        <i className="fa-solid fa-minus-circle"></i>
                      </button>
                      <span className={`w-8 text-center font-bold ${prod.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>{prod.stock}</span>
                      <button 
                        onClick={() => handleStockUpdate(prod.id, prod.stock + 1)}
                        className="text-gray-400 hover:text-emerald-600"
                      >
                        <i className="fa-solid fa-plus-circle"></i>
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    {prod.stock < 5 ? (
                      <span className="text-xs text-red-600 font-bold flex items-center gap-1">
                        <i className="fa-solid fa-triangle-exclamation"></i> Low Stock
                      </span>
                    ) : (
                      <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                        <i className="fa-solid fa-check"></i> OK
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};