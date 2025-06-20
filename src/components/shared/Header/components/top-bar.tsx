'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// YmmAddMyRideBar Component
// This component displays a bar prompting users to enter their Year, Make, and Model (YMM) to find compatible products for their vehicle.
const TopBar = () => {
  return (
    <div
      className={cn(
        'w-full flex transition-all duration-300 bg-[#5762D5] text-white'
      )}
    >
      {/* Bar content */}
      <div
        className={`py-[13px] w-full flex flex-row font-medium items-center justify-center gap-4 sm:gap-8 
        `}
      >
        {/* Informational text */}
        <div className="text-center">
          <span className="text-[16px] font-normal">
            {"Don't miss our deals and rebates"}
          </span>
        </div>
        {/* Add My Ride button */}
        <div className="w-fit text-center">
          <Link href={'#'} className="underline text-[16px] font-normal">
            Click here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
