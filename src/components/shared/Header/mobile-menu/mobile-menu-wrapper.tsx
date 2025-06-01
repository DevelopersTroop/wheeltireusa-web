'use client';
import React from 'react';
import MainMenuMobile from './main-menu-mobile';
import useHeader from '../context/useHeader';

// MobileMenuWrapper Component
// This component acts as a wrapper for the mobile menu, managing its open/close state using the header context.
const MobileMenuWrapper = () => {
  const { setIsOpenMobileMenu, isOpenMobileMenu } = useHeader(); // Access the mobile menu state and setter function from the header context
  return (
    // Render the mobile menu component with the open/close state and setter function as props
    <MainMenuMobile
      setIsOpenMobileMenu={setIsOpenMobileMenu}
      isOpenMobileMenu={isOpenMobileMenu}
    />
  );
};

export default MobileMenuWrapper;
