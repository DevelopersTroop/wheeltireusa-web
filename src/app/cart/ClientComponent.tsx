'use client';

import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import { useGroupedProducts } from '@/hooks/useGroupedProducts';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import CartSubtotal from './_components/cart-subtotal';
import CartSummary from './_components/cart-summary';
import CartYMM from './_components/cart-ymm';
import TiresCard from './_components/tires-card';

// Main Cart component
const Cart = () => {
  //   const searchParams = useSearchParams(); // Get cart products from Redux
  const cart = useSelector((state: RootState) => state.persisted.cart);

  const groupedProducts = useGroupedProducts(cart?.products || []);

  console.log('Grouped Products:', groupedProducts);

  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/collections/product-category/tires`}>
                Collection
              </Item>
              <Item href={`/cart`} isEnd={true}>
                Cart
              </Item>
            </Breadcrumb>
          </div>
        </div>
        {/* <ContinueShopping /> */}
        <div className="py-5 flex gap-3 items-baseline relative w-full">
          <h4 className="text-2xl leading-[29px] text-[#210203]">
            <span className="text-[#210203] text-2xl font-bold">
              Your shopping cart
            </span>
          </h4>

          <small className="text-sm leading-[17px] text-[#210203]">
            <span className="text-[#210203] text-sm font-normal">
              {cart?.products.length} (item
              {cart?.products.length > 1 ? 's' : ''})
            </span>
          </small>
        </div>
        {/* Display grouped products */}
        <div className=" flex flex-col xl:flex-row mt-8 mb-10 xl:mb-20 gap-8">
          <div className="w-full xl:w-3/4">
            <div className="overflow-hidden rounded-xl border border-[#cfcfcf] flex flex-col gap-0 items-start self-stretch relative w-full bg-white">
              {/* Vehicle Year Make Model */}
              <CartYMM />

              {cart?.products.map((tire, key) => (
                <TiresCard key={key} tire={tire} />
              ))}

              <CartSubtotal />
            </div>
          </div>

          {/* summery */}
          <CartSummary />
        </div>
      </Container>
    </>
  );
};

export default Cart;
