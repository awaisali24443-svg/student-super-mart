import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/mockApi';

export const Checkout: React.FC = () => {
  const { items, subtotal, tax, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    address: '', city: '', zip: '',
    cardName: '', cardNumber: '', expiry: '', cvc: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate API Call to create order
    await api.createOrder({
      customerName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      items,
      total,
      shippingAddress: `${formData.address}, ${formData.city} ${formData.zip}`
    });

    clearCart();
    setProcessing(false);
    navigate('/success');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <button onClick={() => navigate('/shop')} className="mt-4 text-emerald-600 hover:underline">Go back to shop</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Shipping */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input required name="firstName" placeholder="First Name" onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none" />
              <input required name="lastName" placeholder="Last Name" onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none" />
              <input required name="email" type="email" placeholder="Email Address" onChange={handleChange} className="col-span-2 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none" />
              <input required name="address" placeholder="Street Address / House #" onChange={handleChange} className="col-span-2 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none" />
              <input required name="city" placeholder="City (e.g., Shabqadar)" onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none" />
              <input required name="zip" placeholder="Postal Code" onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </section>

          {/* Payment Method Selection */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <button 
                type="button" 
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 border rounded-xl flex flex-col items-center gap-2 ${paymentMethod === 'cod' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold' : 'border-gray-200 text-gray-600'}`}
              >
                <i className="fa-solid fa-money-bill-wave text-2xl"></i>
                Cash on Delivery
              </button>
              <button 
                type="button" 
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border rounded-xl flex flex-col items-center gap-2 ${paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold' : 'border-gray-200 text-gray-600'}`}
              >
                <i className="fa-regular fa-credit-card text-2xl"></i>
                Card Payment
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4 animate-fadeIn">
                <input required name="cardName" placeholder="Cardholder Name" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none bg-white" />
                <div className="relative">
                   <input required name="cardNumber" placeholder="Card Number" onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none bg-white pl-10" />
                   <i className="fa-solid fa-credit-card absolute left-3 top-4 text-gray-400"></i>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input required name="expiry" placeholder="MM/YY" onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none bg-white" />
                  <input required name="cvc" placeholder="CVC" onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none bg-white" />
                </div>
              </div>
            )}
            {paymentMethod === 'cod' && (
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-emerald-800 text-sm">
                <i className="fa-solid fa-info-circle mr-2"></i>
                Pay with cash when your order arrives at your doorstep.
              </div>
            )}
          </section>

          <button 
            type="submit" 
            disabled={processing}
            className={`w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg ${processing ? 'opacity-70 cursor-wait' : ''}`}
          >
            {processing ? 'Processing Order...' : `Place Order - Rs. ${total.toFixed(0)}`}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-gray-50 p-8 rounded-2xl h-fit border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {items.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="relative">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-white" />
                  <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">Rs. {item.price.toFixed(0)} / {item.unit}</p>
                </div>
                <span className="font-medium">Rs. {(item.price * item.quantity).toFixed(0)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (0%)</span>
              <span>Rs. {tax.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `Rs. ${shipping.toFixed(0)}`}</span>
            </div>
            <div className="flex justify-between font-bold text-xl text-gray-900 pt-3 border-t border-gray-200">
              <span>Total</span>
              <span>Rs. {total.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};