import React from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';

function Cart({ isOpen, onClose, cartItems, updateQuantity, removeItem }) {
  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? '' : 'pointer-events-none'}`}>
      {/* Background overlay */}
      <div 
        className={`absolute inset-0 bg-black/50  transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      {/* Cart panel */}
      <div 
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Cart header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-Funnel_Display_SemiBold flex items-center  text-[var(--Treasureana---Geocaching-App-1)]">
              <ShoppingCart className="mr-2 text-[var(--Treasureana---Geocaching-App-1)]" /> Your Cart
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          {/* Cart items */}
          <div className="flex-grow overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Your cart is empty
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item._id} className="py-4">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-gray-600 ">Rs. {item.price.toLocaleString()}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item._id, -1)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, 1)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <div className="ml-4 text-right w-24">
                        <p className="font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item._id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Cart footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal:</span>
                <span className="font-bold">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <button className="w-full bg-[var(--Treasureana---Geocaching-App-3)] hover:bg-opacity-90 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;