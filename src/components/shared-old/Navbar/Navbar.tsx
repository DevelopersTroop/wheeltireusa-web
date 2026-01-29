'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import navMenus from './navMenus';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { openMainFilterModal } from '@/redux/features/mainFilterSlice';

// Navbar Component
// This component renders the main navigation bar with support for mega menus and dropdowns
export default function Navbar() {
  // Redux dispatch hook
  const dispatch = useDispatch();

  // State to manage the currently open menu
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // State to manage the currently hovered submenu
  const [hovering, setHovering] = useState<string | null>(null);

  // State to manage a timeout for closing submenus
  const [submenuTimeout, setSubmenuTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Function to handle clicks on specific href values that should open the modal
  const handleModalOpen = (tab: 'Vehicle' | 'TireSize' | 'TireBrand') => {
    console.log('handleModalOpen called with tab:', tab);
    dispatch(openMainFilterModal({ tab }));
  };

  // Function to check if an href should open a modal instead of navigating
  const isModalHref = (href: string) => {
    return (
      href === '#tiresByVehicle' ||
      href === '#tiresBySize' ||
      href === '#tiresByBrand'
    );
  };

  // Function to get the modal tab from href
  const getModalTabFromHref = (
    href: string
  ): 'Vehicle' | 'TireSize' | 'TireBrand' | null => {
    console.log('getModalTabFromHref called with href:', href);
    switch (href) {
      case '#tiresByVehicle':
        return 'Vehicle';
      case '#tiresBySize':
        return 'TireSize';
      case '#tiresByBrand':
        return 'TireBrand';
      default:
        return null;
    }
  };

  // Function to handle mouse enter on a menu item
  const handleMouseEnter = (menu: string) => {
    if (submenuTimeout) clearTimeout(submenuTimeout);
    setOpenMenu(menu);
  };

  // Function to handle mouse leave on a menu item
  const handleMouseLeave = () => {
    setSubmenuTimeout(setTimeout(() => setOpenMenu(null), 400)); // Slight delay before disappearing
  };

  return (
    <nav className={cn('bg-transparent w-full')}>
      {/* Navigation menu list */}
      <ul className="flex gap-4 xl:space-x-6 lg:gap-0 items-center">
        {navMenus.map((menu) => (
          <li
            key={menu.label}
            onMouseEnter={() => handleMouseEnter(menu.label)}
            onMouseLeave={handleMouseLeave}
            className={cn(menu.megaMenu ? '' : 'relative')}
          >
            {/* Menu link */}
            <Link
              target={menu.target}
              href={menu.href}
              className={cn(
                'p-2 flex items-center transition-all duration-300 hover:text-primary relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300'
                //after:bg-transparent hover:underline
              )}
            >
              {
                // menu.label ==="Deals"&&(
                // )
              }
              {menu.label} {/* Menu label */}
              {menu.children &&
                (openMenu === menu.label ? (
                  <ChevronUp className="ml-2 w-4 h-4" />
                ) : (
                  <ChevronDown className="ml-2 w-4 h-4" />
                ))}
            </Link>

            {/* Mega Menu with Left Tabs */}
            {menu.megaMenu && (
              <div
                className={cn(
                  'absolute left-[10%] top-[100%] w-[850px] text-black bg-white flex shadow-lg transition-opacity duration-300 z-50',
                  openMenu === menu.label
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'
                )}
                style={{ minHeight: 320 }}
              >
                {/* Left Tabs */}
                <div className="w-80 border-r flex flex-col gap-1 bg-white">
                  {menu.children?.map((tab, idx) => (
                    <button
                      key={idx}
                      className={cn(
                        'flex items-center gap-3 py-3 px-2 rounded transition-all text-left bg-gray-50 p-6',
                        hovering === tab.label && ' font-semibold text-primary'
                      )}
                      // onMouseEnter={() => setHovering(tab.label)}
                      // onFocus={() => setHovering(tab.label)}
                      onClick={() => setHovering(tab.label)}
                      tabIndex={0}
                    >
                      {/* Optional: Add an icon here if needed */}
                      {tab.image && (
                        <img
                          src={tab.image}
                          alt={tab.label}
                          className="w-20 h-20 object-contain rounded mr-3"
                        />
                      )}
                      <div>
                        <div className="text-lg">{tab.label}</div>
                        {tab.desc && (
                          <div className="text-xs text-gray-500">
                            {tab.desc}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {/* Right Content */}
                <div className="flex-1 p-6">
                  {menu.children?.map(
                    (tab) =>
                      hovering === tab.label && (
                        <div
                          key={tab.label}
                          className="w-full h-full flex flex-col justify-between"
                        >
                          {/* Tab Title */}
                          <div>
                            <div className="text-lg font-semibold mb-2">
                              {tab.label}
                            </div>
                            {/* Tab Content: List of links */}
                            <div className="grid grid-cols-1 gap-2">
                              {tab.children?.map((item) => {
                                const modalTab = getModalTabFromHref(item.href);

                                if (modalTab) {
                                  // Render as button for modal items
                                  return (
                                    <button
                                      key={item.label}
                                      onClick={() => handleModalOpen(modalTab)}
                                      className="block py-1 px-2 rounded transition-all hover:bg-gray-50 hover:text-primary text-left"
                                    >
                                      {item.label}
                                    </button>
                                  );
                                } else {
                                  // Render as Link for regular navigation
                                  return (
                                    <Link
                                      key={item.label}
                                      href={item.href}
                                      className="block py-1 px-2 rounded transition-all hover:bg-gray-50 hover:text-primary"
                                    >
                                      {item.label}
                                    </Link>
                                  );
                                }
                              })}
                            </div>
                          </div>
                          {/* Optional: Add explore links at the bottom */}
                          {tab.exploreLinks && (
                            <div className="mt-6 flex gap-4">
                              {tab.exploreLinks.map((explore) => (
                                <Link
                                  key={explore.label}
                                  href={explore.href}
                                  className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
                                >
                                  {explore.label}
                                  <ChevronRight className="w-4 h-4 mt-1" />
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                  )}
                  {/* If nothing is hovered, show the first tab by default */}
                  {!hovering && menu.children && menu.children[0] && (
                    <div>
                      <div className="text-lg font-semibold mb-2">
                        {menu.children[0].label}
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {menu.children[0].children?.map((item) => {
                          const modalTab = getModalTabFromHref(item.href);

                          if (modalTab) {
                            // Render as button for modal items
                            return (
                              <button
                                key={item.label}
                                onClick={() => handleModalOpen(modalTab)}
                                className="block py-1 px-2 rounded transition-all hover:bg-gray-50 hover:text-primary text-left"
                              >
                                {item.label}
                              </button>
                            );
                          } else {
                            // Render as Link for regular navigation
                            return (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="block py-1 px-2 rounded transition-all hover:bg-gray-50 hover:text-primary"
                              >
                                {item.label}
                              </Link>
                            );
                          }
                        })}
                      </div>
                      {/* Only render exploreLinks if they exist */}
                      {menu.children[0].exploreLinks && (
                        <div className="mt-6 flex gap-6">
                          {menu.children[0].exploreLinks.map((explore) => (
                            <Link
                              key={explore.label}
                              href={explore.href}
                              className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
                            >
                              {explore.label}
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
            {!menu.megaMenu && menu.children && (
              <div
                className={cn(
                  'absolute top-full left-0 text-black bg-white w-56 py-4 shadow-lg transition-opacity duration-300',
                  openMenu === menu.label
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'
                )}
              >
                {menu.children.map((submenu) => (
                  <div
                    key={submenu.label}
                    className="relative"
                    onMouseEnter={() => setHovering(submenu.label)}
                    onMouseLeave={() => setHovering(null)}
                  >
                    {/* Submenu link */}
                    <Link
                      href={submenu.href}
                      className="flex items-center py-2 px-4 transition-all duration-300 hover:text-primary relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                    >
                      {submenu.label}
                      {submenu.children && (
                        <ChevronRight className="ml-2 w-4 h-4" />
                      )}
                    </Link>
                    {/* Third-Level Submenu */}
                    {submenu.children && (
                      <div
                        className={cn(
                          'absolute left-full top-0 w-56 bg-white p-4 shadow-md transition-opacity duration-300',
                          hovering === submenu.label
                            ? 'opacity-100'
                            : 'opacity-0 pointer-events-none'
                        )}
                      >
                        {submenu.children.map((subsub) => (
                          <Link
                            key={subsub.label}
                            href={subsub.href}
                            className="block py-2 transition-all duration-300 hover:text-primary relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                          >
                            {subsub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
