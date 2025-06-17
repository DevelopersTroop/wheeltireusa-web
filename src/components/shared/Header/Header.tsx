'use client';
import FilterModals from '@/components/shared/MainFilterModal/MainFilterModal';
import { useTypedSelector } from '@/redux/store';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../Navbar/Navbar';
import MobileMenuButton from './components/mobile-menu/mobile-menu-button';
import MobileMenuWrapper from './components/mobile-menu/mobile-menu-wrapper';
import HeaderSearchButton from './components/search/HeaderSearchButton';
import UserAccountLink from './components/user-account-link/user-account-link';
import HeaderProvider from './context/header-provider';

export const Header = () => {
  const { products } = useTypedSelector((state) => state.persisted.cart);
  return (
    <>
      <HeaderProvider>
        <div className="sticky top-0 w-full z-20">
          <header className="bg-black h-20 w-full text-white item-center flex justify-center border-b border-gray-800">
            <div className="w-full px-3 lg:px-16 flex justify-between items-center">
              <div className="w-full flex items-center gap-8">
                <MobileMenuButton />
                <div className={'flex justify-center lg:justify-start'}>
                  <Link href={'/'}>
                    <Image
                      src="/images/header/TirematicLogo.png"
                      quality={100}
                      unoptimized={true}
                      alt="Tirematic"
                      width={160}
                      height={29}
                      className="h-7 lg:h-8 w-full object-contain"
                    />
                  </Link>
                </div>
                <div className="hidden lg:block">
                  <Navbar isHomePage />
                </div>
              </div>
              <div className="flex items-center gap-4 lg:gap-8">
                <HeaderSearchButton isHomepage />
                {/* <Link href={'/login'}>
                  <UserCircle />
                </Link> */}
                <UserAccountLink />
                <Link href={'/cart'} className="relative">
                  <ShoppingCart />
                  <span className="absolute w-5 h-5 flex items-center justify-center font-semibold bg-primary text-white rounded-full text-[12px] z-0 firefox-badge chrome-badge">
                    {products.reduce((a, p) => a + p.quantity, 0)}
                  </span>
                </Link>
              </div>
            </div>
          </header>

          <div className="bg-white">
            <MobileMenuWrapper />
          </div>
        </div>
      </HeaderProvider>
      <FilterModals />
    </>
  );
};
