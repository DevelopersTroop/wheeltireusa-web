'use client';

// Import necessary dependencies and utilities

import { TInventoryItem } from '@/types/product';
import React from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';

const TireActionButtons = ({ product }: { product: TInventoryItem }) => {
  // Redux dispatch and router hooks

  // State for managing modal visibility

  // Function to add the product to the cart
  const addProductToCart = async () => {
    // Check if the product is already in the cart
  };

  // State for managing the "Add to Cart" button text
  const [addToCartText, setAddToCartText] = React.useState('Add To Cart');

  return (
    <>
      {/* Display total price */}
      <div className="flex justify-between items-baseline self-stretch relative w-full">
        <h4 className="text-2xl ]">
          <span className=" text-2xl font-normal">Total</span>
        </h4>
        <div>
          <h2 className="text-2xl font-semibold"> ${product?.price} </h2>
        </div>
      </div>

      {/* Quantity input and Add to Cart button */}
      <div className="flex flex-col min-[400px]:flex-row lg:flex-col xl:flex-row justify-between items-baseline self-stretch relative w-full gap-4 mt-4">
        <button
          onClick={() => {
            setAddToCartText('Adding to cart...');
            addProductToCart().then(() => {
              setAddToCartText('View Cart');
            });
          }}
          className="rounded-xl px-3 min-[1300px]:px-6  flex gap-2 justify-center items-center flex-1 relative w-full min-h-14 bg-[#1F7A8C] hover:bg-[#54919d] hover:text-white transition duration-300 ease-in-out "
        >
          <PiShoppingCartLight className="text-white text-2xl" />

          <p className=" leading-[22px] text-white">
            <span className="text-white font-semibold text-base min-[1300px]:text-lg">
              {addToCartText}
            </span>
          </p>
        </button>
      </div>
    </>
  );
};

export default TireActionButtons;
