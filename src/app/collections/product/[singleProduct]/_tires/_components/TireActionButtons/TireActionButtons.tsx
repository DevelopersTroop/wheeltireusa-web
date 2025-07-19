'use client';

import { addToCart, TCartProduct } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/store';
// Import necessary dependencies and utilities

import { TInventoryItem } from '@/types/product';
import { triggerGaAddToCart } from '@/utils/analytics';
import { getPrice } from '@/utils/price';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { PiShoppingCartLight } from 'react-icons/pi';
import { v4 as uuidv4 } from 'uuid';
import {
  calculateTotalPrice,
  prepareCartData,
} from './utils/tireActionButtons';

const TireActionButtons = ({ product }: { product: TInventoryItem[] }) => {
  // Redux dispatch and router hooks

  const isSquare = product[1] === null; // Check if the tire set is square (all tires same size)
  const [frontTireQuantity, setFrontTireQuantity] = useState(2);
  const [rearTireQuantity, setRearTireQuantity] = useState(2);

  useEffect(() => {
    // Reset quantities if the products change
    setFrontTireQuantity(isSquare ? 4 : 2);
    setRearTireQuantity(isSquare ? 0 : 2);
  }, [product, isSquare]);

  // State for managing modal visibility
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Function to add the product to the cart
  const addProductToCart = async () => {
    // Check if the product is already in the cart
    const cartProducts = prepareCartData(
      product,
      isSquare,
      frontTireQuantity,
      rearTireQuantity
    );
    dispatch(addToCart(cartProducts));
  };

  //get price
  const splitedPrice = calculateTotalPrice(
    product,
    frontTireQuantity,
    rearTireQuantity
  );

  // State for managing the "Add to Cart" button text
  const [addToCartText, setAddToCartText] = useState('Add To Cart');

  return (
    <>
      {/* Display total price */}
      <div className="flex justify-between items-baseline self-stretch relative w-full">
        <h4 className="text-2xl ]">
          <span className=" text-2xl font-normal">Total</span>
        </h4>
        <div className="flex gap-0 items-baseline relative">
          <h4 className="text-2xl leading-[29px] text-[#210203]">
            <span className="text-[#210203] text-2xl font-bold">
              ${splitedPrice[0]}.
            </span>
          </h4>
          <small className="text-sm leading-[17px] text-[#210203]">
            <span className="text-[#210203] text-sm font-bold">
              {splitedPrice[1]}
            </span>
          </small>
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
          className="rounded-md px-3 min-[1300px]:px-6  flex gap-2 justify-center items-center flex-1 relative w-full min-h-14 bg-primary hover:bg-orange-600 hover:text-white transition duration-300 ease-in-out cursor-pointer"
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
