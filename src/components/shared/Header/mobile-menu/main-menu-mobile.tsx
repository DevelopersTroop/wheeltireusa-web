'use client';
import Link from 'next/link';
import { useState } from 'react';
import { push as Menu } from 'react-burger-menu';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

// MainMenuMobile Component
// This component renders the mobile version of the main menu with support for nested submenus.
const MainMenuMobile = ({
  isOpenMobileMenu,
  setIsOpenMobileMenu,
}: {
  isOpenMobileMenu: boolean;
  setIsOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // State to manage the visibility of submenus
  const [subMenuStatus, setSubMenuStatus] = useState<{
    [key: string]: boolean;
  }>({
    mainMenu: true,
    megaMenu: false,
    tireAdvice: false,
    support: false,
  });

  // Function to open a specific submenu and close all others
  const openSubMenu = (key: string) => {
    setSubMenuStatus((prev) => {
      prev = Object.keys(prev).reduce(
        (acc, next) => {
          acc[next] = false;
          return acc;
        },
        {} as typeof subMenuStatus
      );

      return {
        ...prev,
        [key]: true,
      };
    });
  };

  return (
    <div id="mobile-menu-cotainer" className={'w-full bg-white lg:hidden'}>
      {/* React Burger Menu for the mobile menu */}
      <Menu
        isOpen={isOpenMobileMenu} // Control the menu's open/close state
        onOpen={() => {
          setIsOpenMobileMenu(true); // Open the menu
          openSubMenu('mainMenu'); // Show the main menu by default
        }}
        onClose={() => setIsOpenMobileMenu(false)} // Close the menu
        customBurgerIcon={false} // Disable the default burger icon
        customCrossIcon={false} // Disable the default cross icon
        styles={{
          bmMenuWrap: {
            top: '81px',
            left: '0px',
            backgroundColor: '#fff',
          },
          bmOverlay: {
            top: '81px',
            left: '0px',
          },
        }}
      >
        {/*  Main Menu */}
        {subMenuStatus.mainMenu && (
          <ul>
            {/*  submenu */}
            <li>
              <div
                onClick={() => openSubMenu('megaMenu')}
                className={
                  'text-black tracking-wider w-full border-b pl-3  border-[#F1F1F1] inline-flex justify-between items-center py-2'
                }
              >
                <div>Shop tires</div>
                <div className="pr-4">
                  <button className={'border border-gray-400 p-2'}>
                    <BiChevronRight />
                  </button>{' '}
                </div>
              </div>
            </li>
            <li>
              <Link
                className={
                  'text-black tracking-wider inline-block w-full border-b pl-3 py-3.5 border-[#F1F1F1]'
                }
                href="#"
              >
                Delivery and installation
              </Link>
            </li>
            {/* Steering Wheels submenu */}
            {/* <li>
                            <div onClick={() => openSubMenu('steeringWheels')} className={'text-black tracking-wider w-full border-b pl-3 border-[#F1F1F1] inline-flex justify-between items-center py-2'}>
                                <div> Steering Wheels</div>
                                <div className='pr-4'><button className={'border border-gray-400 p-2'}><BiChevronRight /></button> </div>
                            </div>
                        </li> */}
            {/* <li><Link className={'text-black tracking-wider inline-block w-full border-b uppercase pl-3 py-3.5 border-[#F1F1F1]'} href="/wheel-builder">Wheel Builder</Link></li> */}
            {/* Other menu links */}
            <li>
              <Link
                className={
                  'text-black tracking-wider inline-block w-full border-b pl-3 py-3.5 border-[#F1F1F1]'
                }
                href="#"
              >
                Deals
              </Link>
            </li>

            {/* Tire Advice submenu */}
            <li>
              <div
                onClick={() => openSubMenu('tireAdvice')}
                className={
                  'text-black tracking-wider w-full border-b pl-3 border-[#F1F1F1] inline-flex justify-between items-center py-2'
                }
              >
                <div> Tire Advice</div>
                <div className="pr-4">
                  <button className={'border border-gray-400 p-2'}>
                    <BiChevronRight />
                  </button>{' '}
                </div>
              </div>
            </li>
            <li>
              <Link
                className={
                  'text-black tracking-wider inline-block w-full border-b pl-3 py-3.5 border-[#F1F1F1]'
                }
                href="#"
              >
                Financing
              </Link>
            </li>
            <li>
              <div
                onClick={() => openSubMenu('support')}
                className={
                  'text-black tracking-wider w-full border-b pl-3 border-[#F1F1F1] inline-flex justify-between items-center py-2'
                }
              >
                <div> Support</div>
                <div className="pr-4">
                  <button className={'border border-gray-400 p-2'}>
                    <BiChevronRight />
                  </button>{' '}
                </div>
              </div>
            </li>
          </ul>
        )}
        {/*  Mega Menu */}
        {subMenuStatus.megaMenu && (
          <ul>
            <li>
              <div className="text-black tracking-wider flex items-center gap-3 w-full border-b pl-3 py-3.5 border-[#F1F1F1]">
                <button
                  className={'border border-gray-400 p-2'}
                  onClick={() => openSubMenu('mainMenu')}
                >
                  <BiChevronLeft />
                </button>{' '}
                Shop tires
              </div>
            </li>
            <li>
              <Link
                className={
                  'text-black tracking-wider inline-block w-full border-b pl-3 py-3.5 border-[#F1F1F1]'
                }
                href="/collections/product-category/tires"
              >
                Shop tires
              </Link>
            </li>
          </ul>
        )}

        {/* Tire Advice- Sub Menu */}
        {subMenuStatus.tireAdvice && (
          <ul>
            <li>
              <div className="text-black tracking-wider flex items-center gap-3 w-full border-b pl-3 py-3.5 border-[#F1F1F1]">
                <button
                  className={'border border-gray-400 p-2'}
                  onClick={() => openSubMenu('mainMenu')}
                >
                  <BiChevronLeft />
                </button>{' '}
                Tire Advice
              </div>
            </li>
            <li>
              <Link
                className={
                  'text-black tracking-wider inline-block w-full border-b pl-3 py-3.5 border-[#F1F1F1]'
                }
                href="#"
              >
                Tire Advice
              </Link>
            </li>
          </ul>
        )}

        {/* Support - Sub Menu */}
        {subMenuStatus.support && (
          <ul>
            <li>
              <div className="text-black tracking-wider flex items-center gap-3 w-full border-b pl-3 py-3.5 border-[#F1F1F1]">
                <button
                  className={'border border-gray-400 p-2'}
                  onClick={() => openSubMenu('mainMenu')}
                >
                  <BiChevronLeft />
                </button>{' '}
                Support
              </div>
            </li>
            <li>
              <Link
                className={
                  'text-black tracking-wider inline-block w-full border-b pl-3 py-3.5 border-[#F1F1F1]'
                }
                href="/contact-us"
              >
                Contact Us
              </Link>
            </li>
            {/* <li><Link className={'text-black tracking-wider inline-block w-full border-b pl-3 py-3.5 border-[#F1F1F1]'} href="/financing">Financing</Link></li> */}
            <li>
              <Link
                className={
                  'text-black tracking-wider inline-block w-full border-b pl-3 py-3.5 border-[#F1F1F1]'
                }
                href="/about-us"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                className={
                  'text-black tracking-wider inline-block w-full border-b pl-3 py-3.5 border-[#F1F1F1]'
                }
                href="/frequently-asked-questions"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                className={
                  'text-black tracking-wider inline-block w-full border-b pl-3 py-3.5 border-[#F1F1F1]'
                }
                href="#"
              >
                Sponsorship
              </Link>
            </li>
            {/* <li><Link className={'text-black tracking-wider inline-block w-full border-b pl-3 py-3.5 border-[#F1F1F1]'} href="#">Forgings</Link></li> */}
            {/* <li><Link className={'text-black tracking-wider inline-block w-full border-b pl-3 py-3.5 border-[#F1F1F1]'} href="#">Affiliate Program</Link></li> */}
          </ul>
        )}
      </Menu>
    </div>
  );
};

export default MainMenuMobile;
