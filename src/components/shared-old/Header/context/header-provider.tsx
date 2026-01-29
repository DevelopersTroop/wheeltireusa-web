'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';

// Type definition for the HeaderContext
type THeaderContext = {
  setIsOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenMobileMenu: boolean;
};

// Create the HeaderContext with a default value
export const HeaderContext = createContext({} as THeaderContext);

// HeaderProvider Component
// This component provides the HeaderContext to its children, managing the state of the mobile menu.
const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false); // State to track the mobile menu's open/close status
  const pathname = usePathname(); // Get the current route pathname
  const searchParams = useSearchParams(); // Get the current search parameters

  // turn of mobile menu when route changes
  useEffect(() => {
    setIsOpenMobileMenu(false);
  }, [pathname, searchParams]);

  return (
    // Provide the mobile menu state and setter function to the context
    <HeaderContext.Provider value={{ setIsOpenMobileMenu, isOpenMobileMenu }}>
      {children} {/* Render the children components */}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
