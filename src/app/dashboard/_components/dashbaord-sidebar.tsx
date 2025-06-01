'use client'; // Client-side component for dashboard sidebar
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const DashbaordSidebar = () => {
  // State to track the selected navigation item
  const [selectedNav, setSelectedNav] = useState('');

  // Get the current pathname from the URL
  const pathname = usePathname();

  // UseEffect to update the selected navigation item based on the current URL path
  useEffect(() => {
    const path = pathname.split('/')[2];
    setSelectedNav(path); // Set the selected navigation item based on the path
  }, [pathname]);
  return (
    <ul className="flex flex-row lg:flex-col justify-center text-xs min-[390px]:text-base ">
      <li>
        <Link
          href={'/dashboard/orders'}
          className={`cursor-pointer py-2 block ${
            selectedNav === 'orders'
              ? 'text-black font-bold border-b-4 lg:border-l-4 lg:border-b-0  border-red-600'
              : 'text-gray-600'
          } px-2 sm:px-5 py-2 hover:bg-gray-100`}
        >
          Orders{' '}
        </Link>
      </li>
      <li>
        <Link
          href={'/dashboard/save-product'}
          className={`cursor-pointer py-2 block ${
            selectedNav === 'save-product'
              ? 'text-black font-bold border-b-4 lg:border-l-4 lg:border-b-0  border-red-600'
              : 'text-gray-600'
          } px-2 sm:px-5 py-2 hover:bg-gray-100`}
        >
          Save Product{' '}
        </Link>
      </li>
      <li>
        <Link
          href={'/dashboard/account-details'}
          className={`cursor-pointer py-2 block ${
            selectedNav === 'account-details'
              ? 'text-black font-bold border-b-4 lg:border-l-4 lg:border-b-0  border-red-600'
              : 'text-gray-600'
          } px-2 sm:px-5 py-2 hover:bg-gray-100`}
        >
          Account Details{' '}
        </Link>
      </li>
      <li>
        <Link
          href={'/dashboard/change-password'}
          className={`cursor-pointer py-2 block ${
            selectedNav === 'change-password'
              ? 'text-black font-bold border-b-4 lg:border-l-4 lg:border-b-0  border-red-600'
              : 'text-gray-600'
          } px-2 sm:px-5 py-2 hover:bg-gray-100`}
        >
          Change password{' '}
        </Link>
      </li>
      <li>
        <Link
          href={'/dashboard/logout'}
          className={`cursor-pointer py-2 block ${
            selectedNav === 'logout'
              ? 'text-black font-bold border-b-4 lg:border-l-4 lg:border-b-0  border-red-600'
              : 'text-gray-600'
          } px-2 sm:px-5 py-2 hover:bg-gray-100`}
        >
          Log out{' '}
        </Link>
      </li>
    </ul>
  );
};

export default DashbaordSidebar;
