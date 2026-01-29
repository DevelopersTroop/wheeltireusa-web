"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

type TMainMenuContext = {
  setIsOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenMobileMenu: boolean;
};
export const MainMenuContext = createContext({} as TMainMenuContext);

const MainMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // turn of mobile menu when route changes
  useEffect(() => {
    setIsOpenMobileMenu(false);
  }, [pathname, searchParams]);

  return (
    <MainMenuContext.Provider value={{ setIsOpenMobileMenu, isOpenMobileMenu }}>
      {children}
    </MainMenuContext.Provider>
  );
};

export default MainMenuProvider;
