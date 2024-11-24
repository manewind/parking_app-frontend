// pages/payment.tsx

import React from 'react';

const PaymentPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Payment Form</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-gray-700 font-semibold mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cardHolder" className="block text-gray-700 font-semibold mb-2">
              Card Holder Name
            </label>
            <input
              type="text"
              id="cardHolder"
              name="cardHolder"
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-gray-700 font-semibold mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="cvv" className="block text-gray-700 font-semibold mb-2">
              CVV
            </label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              placeholder="123"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
