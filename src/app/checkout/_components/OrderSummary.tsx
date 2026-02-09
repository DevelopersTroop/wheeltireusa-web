'use client';

import { useCheckout } from '@/context/checkoutContext';
import React from 'react';

// OrderSummary Component
const OrderSummary: React.FC = () => {
  // Destructure values from the checkout context
  const {
    cartType, // Type of cart (e.g., CENTER_CAP_ONLY)
    subTotalCost, // Subtotal cost of items in the cart
    discount, // Discount applied to the order
    salesTax, // Sales tax for the order
    totalCost, // Total cost of the order
    validatedZipCode, // Validated ZIP code for delivery
    setIsValidZipCode, // Function to update ZIP code validation state
  } = useCheckout();

  return (
    <div className="bg-white">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Delivery & Installation
      </h2>
      {/* ZIP Code Information */}
      <p className="text-sm text-gray-600 mb-4">
        You are viewing the best delivery and installation options for{' '}
        <span className="underline font-semibold font-mono text-primary">
          {validatedZipCode}
        </span>{' '}
        ZIP Code.
      </p>
      {/* Option to Change ZIP Code */}
      <p
        className="underline cursor-pointer font-semibold text-primary"
        onClick={() => setIsValidZipCode(false)}
      >
        Change ZIP Code
      </p>
      <div className="space-y-2">
        {/* Subtotal */}
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Item(s) Total:</span>
          <span className="font-medium">${subTotalCost.toFixed(2)}</span>
        </div>

        {/* Discount (if applicable) */}
        {discount ? (
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Discount:</span>
            <span className="text-red-600">-${discount}</span>
          </div>
        ) : (
          ''
        )}

        {/* Delivery Charge (if cart type is CENTER_CAP_ONLY) */}
        {cartType === 'CENTER_CAP_ONLY' && (
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Delivery Charge:</span>
            <span className="text-red-600">$14.99</span>
          </div>
        )}

        {/* <div className="flex justify-between py-2">
          <span className="text-gray-600">Sales Tax:</span>
          <span className="font-medium">${salesTax}</span>
        </div> */}
        {/* Total Cost */}
        <div className="flex justify-between font-bold mt-4 pt-4 border-t border-gray-200">
          <span>TOTAL:</span>
          <span>${totalCost.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
