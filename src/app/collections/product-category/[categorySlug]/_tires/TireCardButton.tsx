'use client';
import { addToCart, TCartProduct } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/store';
import { TInventoryItem } from '@/types/product';
import { triggerGaAddToCart } from '@/utils/analytics';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TireCardButton = ({
  products,
  frontTireQuantity,
  rearTireQuantity,
}: {
  products: TInventoryItem[];
  wheelInfo: {
    frontForging: string;
    rearForging: string;
    hasDually: boolean;
    hasOffRoad: boolean;
  };
  frontTireQuantity: number;
  rearTireQuantity: number;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleAddToCart = async () => {
    const cartPackage = uuidv4();
    const cartProducts = products.map((p, id) => {
      triggerGaAddToCart(p, frontTireQuantity + rearTireQuantity);
      return {
        ...p,
        cartPackage,
        quantity: id === 0 ? frontTireQuantity : rearTireQuantity,
      };
    });

    dispatch(addToCart(cartProducts as TCartProduct[]));
  };

  // State for managing the "Add to Cart" button text
  const [addToCartText, setAddToCartText] = useState('Add To Cart');

  return (
    <button
      onClick={() => {
        if (addToCartText === 'View Cart') {
          router.push('/cart');
          return;
        }
        setAddToCartText('Adding to cart...');
        handleAddToCart().then(() => {
          setAddToCartText('View Cart');
        });
      }} // Attach the onClick handler to the button
      className="rounded-md px-6 flex gap-2 justify-center items-center relative w-[204px] h-14 bg-[#F6511D] hover:bg-[#f6501df3] hover:text-white transition duration-300 ease-in-out"
    >
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.3648 2.407C2.03734 2.29784 1.68339 2.47482 1.57423 2.80228C1.46508 3.12975 1.64205 3.4837 1.96952 3.59285L2.19028 3.66644C2.75395 3.85433 3.12662 3.97955 3.40116 4.10726C3.66113 4.2282 3.77352 4.32553 3.84554 4.42545C3.91756 4.52537 3.97435 4.66277 4.00687 4.94765C4.04122 5.24849 4.04216 5.64163 4.04216 6.23579L4.04216 8.46232C4.04214 9.60198 4.04213 10.5206 4.13926 11.2431C4.24011 11.9931 4.45586 12.6247 4.95745 13.1263C5.45905 13.6279 6.09061 13.8436 6.8407 13.9445C7.56317 14.0416 8.48177 14.0416 9.62142 14.0416H15.5005C15.8457 14.0416 16.1255 13.7618 16.1255 13.4166C16.1255 13.0714 15.8457 12.7916 15.5005 12.7916H9.66716C8.47098 12.7916 7.63672 12.7903 7.00726 12.7056C6.39578 12.6234 6.07197 12.4731 5.84134 12.2424C5.64535 12.0464 5.50732 11.7832 5.41983 11.3333H13.8522C14.6517 11.3333 15.0515 11.3333 15.3645 11.1268C15.6776 10.9204 15.8351 10.5529 16.1501 9.81806L16.5072 8.98472C17.1818 7.41071 17.5191 6.6237 17.1486 6.06181C16.7781 5.49993 15.9218 5.49993 14.2093 5.49993H5.28804C5.28312 5.24352 5.27236 5.01218 5.2488 4.80586C5.20268 4.40184 5.10217 4.03112 4.85959 3.69456C4.61701 3.358 4.2971 3.14542 3.9284 2.9739C3.58154 2.81254 3.14044 2.66552 2.61846 2.49155L2.3648 2.407Z"
          fill="white"
        />
        <path
          d="M6.75033 15.5C7.44068 15.5 8.00033 16.0596 8.00033 16.75C8.00033 17.4403 7.44068 18 6.75033 18C6.05997 18 5.50033 17.4403 5.50033 16.75C5.50033 16.0596 6.05997 15.5 6.75033 15.5Z"
          fill="white"
        />
        <path
          d="M14.2503 15.5C14.9407 15.5 15.5003 16.0597 15.5003 16.75C15.5003 17.4404 14.9407 18 14.2503 18C13.56 18 13.0003 17.4404 13.0003 16.75C13.0003 16.0597 13.56 15.5 14.2503 15.5Z"
          fill="white"
        />
      </svg>

      <p className="text-lg leading-[22px] text-white">
        <span className="text-white text-lg font-semibold">
          {addToCartText}
        </span>
      </p>
    </button>
  );
};

export default TireCardButton;
