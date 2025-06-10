'use client';

import CartSubtotal from './_components/cart-subtotal';
import CartSummary from './_components/cart-summary';
import Container from '@/components/ui/container/container';
import TiresCard from './_components/tires-card';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import CartYMM from './_components/cart-ymm';
import { TCartProduct } from '@/types/cart';

const tires: TCartProduct[] = [
  {
    _id: '680a6da7a29afbb08bef2dref',
    sku: 'TIRE-001',
    singleQuantityPrice: 150,
    totalPrice: 300,
    quantity: 2,
    title: 'All-Season Performance Tire',
    brand: 'Michelin',
    image: 'ns-products/tire.webp',
    slug: 'all-season-performance-tire',
    forging_style: 'Radial',
    model_group: 'Performance',
    tire_size: '225/45R18',
    maxInventory: 10,
    minInventory: 1,
    inventoryStep: 1,
    vehicleInformation: '2022 Toyota Camry',
    cartPackage: 'pkg1',
    cartSerial: 'serial1',
    category: {
      _id: '87565fhjhgiugfdgf6',
      slug: '12345566',
      title: 'Tire',
    },
    isFrontTire: true,
    isRearTire: false,
    item_image: 'ns-products/tire.webp',
    sidewall: 'White',
    load_rating: 'XL',
    load_index: '95',
    speed_rating: 'V',
    item_class: 'Passenger',
    inventory_available: 8,
    tirePackageUrl: '/tire-package/1',
    metaData: {
      frontForging: 'Forged',
      frontDiameter: '18',
      frontWidth: '8',
      finishType: 'Matte',
      year: '2022',
      make: 'Toyota',
      model: 'Camry',
      bodyType: 'Sedan',
      totalProvidedDiscount: 20,
    },
  },
  {
    _id: '680a6da7a29afbb08bef2d4h',
    sku: 'TIRE-002',
    singleQuantityPrice: 180,
    totalPrice: 360,
    quantity: 2,
    title: 'Ultra Grip Winter Tire',
    brand: 'Goodyear',
    image: 'ns-products/tire.webp',
    slug: 'ultra-grip-winter-tire',
    forging_style: 'Radial',
    tire_size: '225/50R19',
    model_group: 'Winter',
    maxInventory: 12,
    minInventory: 1,
    inventoryStep: 1,
    vehicleInformation: '2021 Honda Accord',
    cartPackage: 'pkg2',
    cartSerial: 'serial2',
    category: {
      _id: '5648ghdkghddhg',
      slug: '54357658899',
      title: 'Tire',
    },
    isFrontTire: true,
    isRearTire: true,
    item_image: 'ns-products/tire.webp',
    sidewall: 'Black',
    load_rating: 'SL',
    load_index: '97',
    speed_rating: 'H',
    item_class: 'Passenger',
    inventory_available: 10,
    tirePackageUrl: '/tire-package/2',
    metaData: {
      rearForging: 'Forged',
      rearDiameter: '19',
      rearWidth: '8.5',
      finishType: 'Gloss',
      year: '2021',
      make: 'Honda',
      model: 'Accord',
      bodyType: 'Sedan',
      totalProvidedDiscount: 30,
    },
  },
];

// Main Cart component
const Cart = () => {
  //   const searchParams = useSearchParams(); // Get cart products from Redux

  // const dispatch = useAppDispatch(); // Redux dispatch function
  // const router = useRouter(); // Next.js router
  //   const { user } = useAuth(); // Get authenticated user

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
              {tires.length} (item{tires.length > 1 ? 's' : ''})
            </span>
          </small>
        </div>
        {/* Display grouped products */}
        <div className=" flex flex-col xl:flex-row mt-8 mb-10 xl:mb-20 gap-8">
          <div className="w-full xl:w-3/4">
            <div className="overflow-hidden rounded-xl border border-[#cfcfcf] flex flex-col gap-0 items-start self-stretch relative w-full bg-white">
              {/* Vehicle Year Make Model */}
              <CartYMM />

              {tires.map((tire) => (
                <TiresCard key={tire.cartSerial} tire={tire} />
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
