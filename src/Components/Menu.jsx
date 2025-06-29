import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from '../Components/Cart.jsx';

function Menu() {
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMenuData();
  }, []);


  const fetchMenuData = async () => {
    try {
      const response = await fetch('https://food-bank-backend-gqeu.onrender.com/api/food/menu');
      const data = await response.json();
      setMenuData(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu data:', error);
      setLoading(false);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (id, change) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change)
    }));
  };

  const handleAddToCart = (food) => {
    const quantity = quantities[food._id] || 1;
    
    if (quantity === 0) {
      toast.error("Please select at least 1 item", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    
    const existingItem = cartItems.find(item => item._id === food._id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item._id === food._id 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
      ));
    } else {
      setCartItems([...cartItems, { 
        ...food, 
        quantity: quantity 
      }]);
    }
    
    setQuantities(prev => ({
      ...prev,
      [food._id]: 0
    }));
  };

  const updateCartQuantity = (id, change) => {
    const existingItem = cartItems.find(item => item._id === id);
    
    if (!existingItem) return;
    
    const newQuantity = existingItem.quantity + change;
    
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item._id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeCartItem = (id) => {
    setCartItems(cartItems.filter(item => item._id !== id));
  };

  if (loading) {
    return <div className="w-full min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className='w-full min-h-screen p-4 font-Funnel_Display relative '>
      <div className="fixed top-4 right-4 z-40">
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-3 bg-[var(--Treasureana---Geocaching-App-3)] text-white rounded-full shadow-lg hover:bg-opacity-90 transition-all mt-18"
        >
          <ShoppingCart/>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
      
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateCartQuantity}
        removeItem={removeCartItem}
      />

      <div className="max-w-7xl mx-auto">
        {menuData.map((category) => (
          <div key={category.categoryId} className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-[var(--Treasureana---Geocaching-App-3)] border-b-2 pb-3 border-amber-200">
              {category.categoryName}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.foods.map((food) => (
                <div 
                  key={food._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100"
                >
                  {/* Enhanced Image Section */}
                  <div className="relative h-60 bg-gray-100 flex items-center justify-center  group overflow-hidden">
                    <img 
                      src={food.image} 
                      alt={food.foodName}
                      className="w-full min-h-full  object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <h3 className="text-xl font-bold text-[var(--Treasureana---Geocaching-App-3)]">{food.foodName}</h3>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800">{food.foodName}</h3>
                      <h1 className="text-sm font-semibold text-amber-600">Rs.{food.price.toLocaleString()}</h1>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {food.description}
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-700 font-medium">Quantity:</span>
                        <div className="flex items-center">
                          <button 
                            onClick={() => handleQuantityChange(food._id, -1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-700 disabled:opacity-40"
                            disabled={!quantities[food._id]}
                          >
                            -
                          </button>
                          <span className="mx-3 w-8 text-center font-medium">
                            {quantities[food._id] || 0}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(food._id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-700"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleAddToCart(food)}
                        disabled={!(quantities[food._id] > 0)}
                        className={`w-full py-3 rounded-xl font-medium transition-colors ${
                          quantities[food._id] > 0
                            ? 'bg-[var(--Treasureana---Geocaching-App-3)] text-white hover:bg-opacity-90 hover:scale-[1.02] active:scale-[0.98]'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;