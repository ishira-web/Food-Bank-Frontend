import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Home, Phone, CreditCard, Wallet, Lock, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../Auth/authContext';

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    user, 
    token, 
    loading: authLoading, 
    isAuthenticated,
    isUser
  } = useContext(AuthContext);
  
  const cartItems = location.state?.cartItems || [];
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: ''
  });

  // Initialize form with user data when available
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || '',
        address: user.address || '',
        phone: user.phone || '',
        email: user.email || ''
      });
    }
  }, [user]);

  // Check authentication and role
  useEffect(() => {
    if (authLoading) return; // Wait for auth to initialize
    
    if (!isAuthenticated()) {
      toast.warning('Please login to place an order');
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (!isUser) {
      toast.warning('Please login as a customer to place an order');
      navigate('/');
    }
  }, [authLoading, isAuthenticated, isUser, navigate, location.pathname]);

  // Calculate order totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  // Card type detection
  const detectCardType = (number) => {
    const num = number.replace(/\D/g, '');
    if (/^4/.test(num)) {
      return 'Visa';
    } else if (/^5[1-5]/.test(num)) {
      return 'Mastercard';
    } else if (/^3[47]/.test(num)) {
      return 'Amex';
    }
    return '';
  };

  const cardType = detectCardType(cardNumber);

  const renderCardIcon = () => {
    switch (cardType) {
      case 'Visa':
        return <span className="text-blue-900 text-xs font-bold">VISA</span>;
      case 'Mastercard':
        return <span className="text-red-600 text-xs font-bold">MC</span>;
      case 'Amex':
        return <span className="text-blue-500 text-xs font-bold">AMEX</span>;
      default:
        return <CreditCard className="text-gray-400" size={20} />;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateCard = () => {
    if (paymentMethod !== 'card') return true;
    
    // Basic card validation
    const cleanedCard = cardNumber.replace(/\D/g, '');
    if (cleanedCard.length < 13 || cleanedCard.length > 19) {
      toast.error('Please enter a valid card number');
      return false;
    }
    
    // Expiry date validation (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      toast.error('Please enter expiry date in MM/YY format');
      return false;
    }
    
    // CVV validation
    if (!/^\d{3,4}$/.test(cvv)) {
      toast.error('Please enter a valid CVV');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCard()) return;
    
    setIsSubmitting(true);

    try {
      // Prepare order items
      const orderItems = cartItems.map(item => ({
        foodId: item._id,
        quantity: item.quantity,
        price: item.price
      }));

      const orderData = {
        orderItems,
        totalAmount: total,
        address: formData.address,
        phone: formData.phone,
        name: formData.fullName,
        email: formData.email,
        paymentMethod
      };

      const response = await axios.post(
        'http://localhost:5000/api/order/', 
        orderData,
        { 
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Order placed successfully!');
      navigate('/order-confirmation', { 
        state: { 
          order: response.data,
          cartItems: [] // Clear cart after successful order
        } 
      });
    } catch (error) {
      console.error('Order submission error:', error);
      
      if (error.response) {
        if (error.response.status === 401) {
          toast.error('Session expired. Please login again');
          navigate('/login');
        } else if (error.response.status === 403) {
          toast.error('You do not have permission to place orders');
        } else if (error.response.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Failed to place order. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading your order...</h1>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-[var(--Treasureana---Geocaching-App-9)] text-white rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen flex flex-col md:flex-row p-4 md:p-8'>
      {/* Left Column - Form */}
      <div className='w-full md:w-1/2 min-h-screen font-Funnel_Display p-4 md:p-8'>
        <h1 className='text-4xl md:text-6xl font-bold text-[var(--Treasureana---Geocaching-App-9)] mb-8'>Checkout</h1>
        
        <form className='space-y-6' onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>Personal Information</h2>
            
            <div className='mb-4'>
              <label className='text-gray-700 mb-2 flex items-center'>
                <User className='mr-2 h-5 w-5' /> Full Name
              </label>
              <input 
                type='text'
                name='fullName'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-9)]'
                placeholder='John Doe'
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className='mb-4'>
              <label className='text-gray-700 mb-2 flex items-center'>
                <Home className='mr-2 h-5 w-5' /> Address
              </label>
              <input 
                type='text'
                name='address'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-9)]'
                placeholder='123 Main St'
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className='mb-4'>
              <label className='text-gray-700 mb-2 flex items-center'>
                <Phone className='mr-2 h-5 w-5' /> Phone Number
              </label>
              <input 
                type='tel'
                name='phone'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-9)]'
                placeholder='(123) 456-7890'
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='mb-4'>
              <label className='text-gray-700 mb-2 flex items-center'>
                <Phone className='mr-2 h-5 w-5' /> Email
              </label>
              <input 
                type='email'
                name='email'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-9)]'
                placeholder='your@email.com'
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          {/* Payment Method */}
          <div className='bg-white p-6 rounded-lg shadow-sm'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>Payment Method</h2>
            
            <div className='flex space-x-4 mb-6'>
              <button
                type='button'
                className={`flex-1 py-3 px-4 rounded-lg border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-[var(--Treasureana---Geocaching-App-9)] bg-[var(--Treasureana---Geocaching-App-9)] bg-opacity-10' : 'border-gray-300'}`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard className='mr-2 h-5 w-5' /> Credit Card
              </button>
              
              <button
                type='button'
                className={`flex-1 py-3 px-4 rounded-lg border-2 flex items-center justify-center ${paymentMethod === 'cash' ? 'border-[var(--Treasureana---Geocaching-App-9)] bg-[var(--Treasureana---Geocaching-App-9)] bg-opacity-10' : 'border-gray-300'}`}
                onClick={() => setPaymentMethod('cash')}
              >
                <Wallet className='mr-2 h-5 w-5' /> Cash
              </button>
            </div>
            
            {paymentMethod === 'card' && (
              <div className='space-y-4'>
                <div>
                  <label className='block text-gray-700 mb-2'>Card Number</label>
                  <div className='relative'>
                    <input 
                      type='text'
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-9)] pl-10'
                      placeholder='1234 5678 9012 3456'
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required={paymentMethod === 'card'}
                    />
                    <div className='absolute left-3 top-3'>
                      {renderCardIcon()}
                    </div>
                  </div>
                </div>
                
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-gray-700 mb-2'>Expiry Date</label>
                    <input 
                      type='text'
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-9)]'
                      placeholder='MM/YY'
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      required={paymentMethod === 'card'}
                    />
                  </div>
                  
                  <div>
                    <label className='text-gray-700 mb-2 flex items-center'>
                      <Lock className='mr-2 h-5 w-5' /> CVV
                    </label>
                    <input 
                      type='text'
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-9)]'
                      placeholder='123'
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required={paymentMethod === 'card'}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {paymentMethod === 'cash' && (
              <div className='bg-yellow-50 p-4 rounded-lg border border-yellow-200'>
                <p className='text-yellow-800'>Please prepare exact change. Our delivery person will collect payment upon arrival.</p>
              </div>
            )}
          </div>
          
          <button
            type='submit'
            className='w-full py-3 bg-[var(--Treasureana---Geocaching-App-9)] text-white rounded-lg font-semibold hover:bg-opacity-90 transition duration-200 flex items-center justify-center disabled:opacity-50'
            disabled={isSubmitting || authLoading}
          >
            {isSubmitting ? (
              'Processing...'
            ) : (
              <>
                <ShoppingCart className='mr-2 h-5 w-5' /> Complete Order
              </>
            )}
          </button>
        </form>
      </div>
      
      {/* Right Column - Order Summary */}
      <div className='w-full md:w-1/2 p-4 font-Funnel_Display md:p-8 mt-[6rem]'>
        <div className='bg-white p-6 rounded-lg shadow-sm sticky top-8'>
          <h2 className='text-2xl font-semibold mb-6 text-gray-800'>Order Summary</h2>
          
          <div className='space-y-4 mb-6'>
            {cartItems.map((item) => (
              <div key={item._id} className='flex justify-between'>
                <div className='flex items-center'>
                  <div className='w-16 h-16 bg-gray-200 rounded-md mr-4 flex items-center justify-center'>
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.foodName} 
                        className="w-full h-full object-cover rounded-md" 
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">No image</span>
                    )}
                  </div>
                  <div>
                    <h3 className='font-medium'>{item.foodName}</h3>
                    <p className='text-gray-500 text-sm'>Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-medium'>Rs. {(item.price * item.quantity).toLocaleString()}</p>
                  <p className='text-gray-500 text-sm'>Rs. {item.price.toLocaleString()} each</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className='border-t border-gray-200 pt-4 space-y-2'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Delivery</span>
              <span className='text-green-600'>Free</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Tax (8%)</span>
              <span>Rs. {tax.toFixed(2)}</span>
            </div>
            <div className='flex justify-between font-bold text-lg mt-2'>
              <span>Total</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;