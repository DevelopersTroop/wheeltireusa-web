'use client';
import React from 'react';
import { IoIosMenu } from 'react-icons/io';
// import MainMenuMobile from './main-menu-mobile';
import { cn } from '@/lib/utils';
import useHeader from '../../context/useHeader';

// MobileMenuButton Component
// This component renders a button to toggle the mobile menu's open/close state.
const MobileMenuButton = () => {
  const { setIsOpenMobileMenu } = useHeader(); // Access the mobile menu state and setter function from the header context
  return (
    <>
      {/* Button to toggle the mobile menu */}
      <button
        onClick={() => setIsOpenMobileMenu((prev) => !prev)}
        className={'w-max block lg:hidden ml-0 z-10 relative'}
      >
        <IoIosMenu
          id="mobile-menu"
          strokeWidth={0.05}
          className={cn('text-4xl text-white')}
        />
      </button>
    </>
  );
};

export default MobileMenuButton;
