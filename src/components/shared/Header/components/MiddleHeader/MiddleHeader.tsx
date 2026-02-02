'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAuth from '@/hooks/useAuth';
import { HeartIcon, Phone, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import MobileNavbar from './components/MobileNavBar/MobileNavBar';
import HeaderSearchButton from './components/HeaderSearchButton/HeaderSearchButton';
import { useCartHook } from '@/hooks/useCartHook';

export default function MiddleHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuth();
  const { setOpen } = useCartHook();
  //   const { products } = useTypedSelector((state) => state.persisted.cart);

  //   const cartQuantity = useMemo(() => {
  //     return Object.values(products).reduce(
  //       (acc, product) => acc + product.quantity,
  //       0
  //     );
  //   }, [JSON.stringify(products)]);

  return (
    <div className="container">
      <div className="border-b bg-white">
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 bg-white lg:hidden">
            <div className="flex items-center gap-2 p-4">
              <Input
                type="text"
                placeholder="Search products..."
                className="flex-1"
              />
              <Button variant="ghost" onClick={() => setIsSearchOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="px-4 py-3">
          <div className="flex items-center gap-4">
            <MobileNavbar />

            <div className="flex items-center">
              <Link href="/" className="shrink-0">
                <img
                  src="/images/logo.png"
                  alt="Custom Offsets"
                  className="h-6 min-[387px]:h-8 md:h-12"
                />
              </Link>
            </div>

            <div className="w-full hidden lg:block">
              <HeaderSearchButton
                aria-label="Search product"
                isHomepage={false}
              />
            </div>
            <div className="flex items-center justify-end">
              <div className="lg:hidden">
                <HeaderSearchButton
                  aria-label="Search product"
                  isHomepage={false}
                />
              </div>
              <Link
                href={'/dashboard/save-product'}
                className="hidden items-center gap-2 md:flex"
              >
                <HeartIcon size={34} className=" text-gray-600" />
              </Link>

              <div className="hidden items-center gap-8 md:flex">
                <Link
                  href={user?.email ? '/dashboard' : '/login'}
                  className="flex items-center gap-2"
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium">MY ACCOUNT</p>
                    <p className="text-xs text-gray-500">
                      Hello, {user?.email ? user.email : 'Login'}{' '}
                    </p>
                  </div>
                </Link>

                <Button
                  className="relative flex items-center gap-2 cursor-pointer"
                  variant={'ghost'}
                  onClick={setOpen}
                >
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5 text-gray-600" />
                    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      {/* {cartQuantity} */} 0
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">MY CART</p>
                    {/* <p className="text-xs text-gray-500">$0.00</p> */}
                  </div>
                </Button>
              </div>

              <div className="flex items-center gap-2 md:hidden">
                <Link href={user?.email ? '/dashboard' : '/login'}>
                  <User className="h-6 w-6 text-gray-600" />
                </Link>
                <Button onClick={setOpen} className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-600" />
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                    {/* {cartQuantity} */} 0
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
