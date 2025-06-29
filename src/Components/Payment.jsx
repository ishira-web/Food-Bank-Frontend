import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Stripe Card Form Component
const StripeCardForm = () => {
  return (
    <div className="mt-4">
      <label className="block text-gray-700 mb-2">Card Details</label>
      <div className="p-3 border border-gray-300 rounded-lg bg-white">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
                backgroundColor: 'white',
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Test using 4242 4242 4242 4242 for card number, any future date, and any 3 digits for CVC
      </p>
    </div>
  );
};

// Payment Component
function Payment() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [country, setCountry] = useState('LK');
  const [stripeError, setStripeError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Initialize Stripe
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_51P4kQrKp9Bk6d4V5KvZ5m0YxZ6Xb9J4y8d7W1j8e7q1s3v6D8a');
  
  // Calculate values
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = 250;
  const total = subtotal + deliveryFee;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setStripeError(null);
    
    try {
      // For card payments
      if (paymentMethod === 'card') {
        const stripe = await stripePromise;
        const elements = stripe.elements();
        const cardElement = elements.getElement(CardElement);
        
        // Create payment method
        const { error: createError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: cardholderName,
            email: email,
            address: {
              country: country,
            }
          }
        });
        
        if (createError) {
          throw new Error(createError.message);
        }
        
        // Create payment intent on backend
        const response = await fetch('https://food-bank-backend-gqeu.onrender.com/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: total * 100, // Amount in cents
            currency: 'lkr',
            paymentMethodId: paymentMethod.id,
            cartItems,
            customer: {
              name: cardholderName,
              email: email,
              address: country
            }
          }),
        });
        
        const paymentResult = await response.json();
        
        if (paymentResult.error) {
          throw new Error(paymentResult.error);
        }
        
        // Confirm payment
        const { error: confirmError } = await stripe.confirmCardPayment(
          paymentResult.clientSecret
        );
        
        if (confirmError) {
          throw new Error(confirmError.message);
        }
      }
      
      // For both payment methods
      setIsSuccess(true);
      console.log('Order placed successfully!');
      
    } catch (error) {
      setStripeError(error.message);
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset form on payment method change
  useEffect(() => {
    if (paymentMethod !== 'card') {
      setCardholderName('');
      setEmail('');
      setStripeError(null);
    }
  }, [paymentMethod]);

  if (isSuccess) {
    return (
      <div className="w-full min-h-screen bg-[var(--Treasureana---Geocaching-App-6)] py-20 px-4 flex items-center justify-center">
        <div className="max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. We'll send a confirmation email shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-lg font-semibold">Order Total: Rs. {total.toLocaleString()}</p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full py-3 bg-[var(--Treasureana---Geocaching-App-3)] text-white rounded-lg font-bold text-lg hover:bg-opacity-90 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen bg-[var(--Treasureana---Geocaching-App-6)] py-10 px-4 md:px-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl md:text-4xl font-Funnel_Display_SemiBold text-center mb-10 text-[var(--Treasureana---Geocaching-App-3)]'>
          Complete Your Order
        </h1>
        
        <Elements stripe={stripePromise}>
          <div className='flex flex-col lg:flex-row gap-8 font-Funnel_Display'>
            {/* Customer Information Form */}
            <div className='bg-white rounded-xl shadow-lg p-6 flex-1'>
              <h2 className='text-2xl font-bold mb-6 text-gray-800'>Payment Details</h2>
              
              <form onSubmit={handleSubmit} id="payment-form">
                <div className='space-y-4'>
                  {/* Payment Method */}
                  <div className='pt-4'>
                    <h3 className='text-xl font-semibold mb-4'>Payment Method *</h3>
                    
                    <div className='space-y-3'>
                      {/* Cash on Delivery */}
                      <div className='flex items-center'>
                        <input
                          type='radio'
                          id='cash'
                          name='payment'
                          value='cash'
                          checked={paymentMethod === 'cash'}
                          onChange={() => setPaymentMethod('cash')}
                          className='h-5 w-5 text-[var(--Treasureana---Geocaching-App-3)] focus:ring-[var(--Treasureana---Geocaching-App-3)]'
                        />
                        <label htmlFor='cash' className='ml-3 block text-gray-700'>
                          <span className='font-medium'>Cash on Delivery</span>
                          <p className='text-sm text-gray-500'>Pay when you receive your order</p>
                        </label>
                      </div>
                      
                      {/* Card Payment */}
                      <div className='flex items-center'>
                        <input
                          type='radio'
                          id='card'
                          name='payment'
                          value='card'
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className='h-5 w-5 text-[var(--Treasureana---Geocaching-App-3)] focus:ring-[var(--Treasureana---Geocaching-App-3)]'
                        />
                        <label htmlFor='card' className='ml-3 block text-gray-700'>
                          <span className='font-medium'>Credit/Debit Card</span>
                          <p className='text-sm text-gray-500'>Pay securely with your card</p>
                        </label>
                      </div>
                      
                      {/* Stripe Card Form */}
                      {paymentMethod === 'card' && (
                        <StripeCardForm 
                          cardholderName={cardholderName}
                          setCardholderName={setCardholderName}
                          email={email}
                          setEmail={setEmail}
                          country={country}
                          setCountry={setCountry}
                        />
                      )}
                    </div>
                  </div>
                  
                  {/* Error Message */}
                  {stripeError && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <X className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{stripeError}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className='bg-white rounded-xl shadow-lg p-6 lg:w-96'>
              <h2 className='text-2xl font-bold mb-6 text-gray-800'>Order Summary</h2>
              
              <div className='mb-6'>
                <h3 className='text-lg font-semibold mb-4'>Your Items</h3>
                
                <div className='space-y-4 max-h-60 overflow-y-auto pr-2'>
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <div key={item._id} className='flex justify-between items-center border-b pb-4'>
                        <div className="flex-1">
                          <h4 className='font-medium'>{item.name}</h4>
                          <p className='text-gray-600 text-sm'>Rs. {item.price.toLocaleString()} × {item.quantity}</p>
                        </div>
                        <p className='font-medium'>Rs. {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 py-4 text-center">No items in cart</p>
                  )}
                </div>
              </div>
              
              <div className='space-y-3 mb-6'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Subtotal</span>
                  <span className='font-medium'>Rs. {subtotal.toLocaleString()}</span>
                </div>
                
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Delivery Fee</span>
                  <span className='font-medium'>Rs. {deliveryFee.toLocaleString()}</span>
                </div>
                
                <div className='flex justify-between pt-4 border-t border-gray-200'>
                  <span className='text-lg font-semibold'>Total</span>
                  <span className='text-lg font-bold text-[var(--Treasureana---Geocaching-App-3)]'>
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <button
                type='submit'
                form="payment-form"
                disabled={isProcessing || (paymentMethod === 'card' && (!cardholderName || !email || !country))}
                className={`w-full py-3 bg-[var(--Treasureana---Geocaching-App-3)] text-white rounded-lg font-bold text-lg transition-colors ${
                  isProcessing || (paymentMethod === 'card' && (!cardholderName || !email || !country)) 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'hover:bg-opacity-90'
                }`}
              >
                {isProcessing ? 'Processing Payment...' : 'Pay Rs. ' + total.toLocaleString()}
              </button>
              
              <div className="mt-6 text-center text-xs text-gray-500">
                <p className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                  Payments securely processed by Stripe
                </p>
                <div className="flex justify-center space-x-4 mt-2">
                  <a href="#" className="hover:underline">Terms</a>
                  <a href="#" className="hover:underline">Privacy</a>
                </div>
              </div>
            </div>
          </div>
        </Elements>
      </div>
    </div>
  );
}

export default Payment;