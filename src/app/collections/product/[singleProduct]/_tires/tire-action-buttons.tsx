'use client';

import { addToCart, TCartProduct } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/store';
// Import necessary dependencies and utilities

import { TInventoryItem } from '@/types/product';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';
import { v4 as uuidv4 } from 'uuid';

const TireActionButtons = ({ product }: { product: TInventoryItem }) => {
  // Redux dispatch and router hooks

  // State for managing modal visibility
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Function to add the product to the cart
  const addProductToCart = async () => {
    // Check if the product is already in the cart
    const cartPackage = uuidv4();
    const cartProducts = {
      ...product,
      cartPackage,
      quantity: 4,
    };

    dispatch(addToCart(cartProducts as TCartProduct));
  };

  // State for managing the "Add to Cart" button text
  const [addToCartText, setAddToCartText] = useState('Add To Cart');

  return (
    <>
      {/* Display total price */}
      <div className="flex justify-between items-baseline self-stretch relative w-full">
        <h4 className="text-2xl ]">
          <span className=" text-2xl font-normal">Total</span>
        </h4>
        <div>
          <h2 className="text-2xl font-semibold">
            {' '}
            ${(product?.price || 1) * 4}{' '}
          </h2>
        </div>
      </div>

      {/* Quantity input and Add to Cart button */}
      <div className="flex flex-col min-[400px]:flex-row lg:flex-col xl:flex-row justify-between items-baseline self-stretch relative w-full gap-4 mt-4">
        <button
          onClick={() => {
            if (addToCartText === 'View Cart') {
              router.push('/cart');
              return;
            }
            setAddToCartText('Adding to cart...');
            addProductToCart().then(() => {
              setAddToCartText('View Cart');
            });
          }}
          className="rounded-xl px-3 min-[1300px]:px-6  flex gap-2 justify-center items-center flex-1 relative w-full min-h-14 bg-primary hover:text-white transition duration-300 ease-in-out cursor-pointer"
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
