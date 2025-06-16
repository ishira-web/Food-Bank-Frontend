import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { X } from 'lucide-react';

// Stripe Card Form Component
const StripeCardForm = ({ cardholderName, setCardholderName, email, setEmail, country, setCountry }) => {
  return (
    <div className="mt-4 space-y-4">
      {/* Email */}
      <div>
        <label className="block text-gray-700 mb-2">Email *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-3)]"
          placeholder="you@example.com"
          required
        />
      </div>
      
      {/* Card Details */}
      <div>
        <label className="block text-gray-700 mb-2">Card Information *</label>
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
      </div>
      
      {/* Cardholder Name */}
      <div>
        <label className="block text-gray-700 mb-2">Cardholder Name *</label>
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-3)]"
          placeholder="Full name on card"
          required
        />
      </div>
      
      {/* Country */}
      <div>
        <label className="block text-gray-700 mb-2">Country or Region *</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--Treasureana---Geocaching-App-3)]"
          required
        >
          <option value="">Select country</option>
          <option value="LK">Sri Lanka</option>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="IN">India</option>
          <option value="AU">Australia</option>
          <option value="CA">Canada</option>
        </select>
      </div>
      
      {/* Test Mode Notice */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Test mode:</strong> Use card number <span className="font-mono">4242 4242 4242 4242</span>, 
              any future expiry date, and any 3-digit CVC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeCardForm;