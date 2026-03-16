"use client"
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown, ChevronRight, ChevronUp, PhoneCall } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import navMenus from "./config";
import Container from "@/components/ui/container/container";

// Navbar Component
// This component renders the main navigation bar with support for mega menus and dropdowns
function NavBar() {
  const pathname = usePathname(); // Get the current URL path
  const isHomePage = pathname === "/";
  // State to manage the currently open menu
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // State to manage the currently hovered submenu
  const [hovering, setHovering] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [collectionPagePath, setCollectionPagePath] = useState<string | null>(
    null
  );
  // State to manage a timeout for closing submenus
  const [submenuTimeout, setSubmenuTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  // State to manage nested submenu hover
  const [nestedHovering, setNestedHovering] = useState<{
    [label: string]: number;
  } | null>(null);
  const [currentlyHovering, setCurrentlyHovering] = useState<number | null>(
    null
  );
  // State to manage normal dropdown third-level submenu hover
  const [normalDropdownNestedHovering, setNormalDropdownNestedHovering] =
    useState<{ [label: string]: number } | null>(null);
  const [normalDropdownCurrentlyHovering, setNormalDropdownCurrentlyHovering] =
    useState<number | null>(null);
  // Function to handle mouse enter on a menu item
  const handleMouseEnter = (menu: string) => {
    if (submenuTimeout) clearTimeout(submenuTimeout);
    setOpenMenu(menu);
  };


  // Function to handle mouse leave on a menu item
  const handleMouseLeave = () => {
    setSubmenuTimeout(setTimeout(() => setOpenMenu(null), 400)); // Slight delay before disappearing
  };

  // Close menu on scroll
  useEffect(() => {
    if (!openMenu) return;

    const handleScroll = () => {
      setOpenMenu(null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [openMenu]);
  return (
    <Container>
      <nav
        className={cn(
          "w-full text-white lg:flex items-center justify-between relative hidden"
        )}
      >
        {/* Navigation menu list */}
        <ul className="flex space-x-6 py-4 items-center uppercase z-50">
          {navMenus.map((menu) => (
            <li
              key={menu.label}
              onMouseEnter={() => handleMouseEnter(menu.label || "")}
              onMouseLeave={handleMouseLeave}
              className="static"
            >
              {/* Menu link */}
              <Link
                // onClick={handleProductFilter}
                target={menu.target}
                href={menu.href || "#"}
                className={cn(
                  "text-black p-2 flex items-center transition-all duration-300 relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 text-sm",
                  isHomePage && "hover:text-gray-600 "
                  //after:bg-transparent hover:underline
                )}
              >
                {menu.label} {/* Menu label */}
                {menu.children &&
                  (openMenu === menu.label ? (
                    <ChevronUp className="ml-2 w-4 h-4" />
                  ) : (
                    <ChevronDown className="ml-2 w-4 h-4" />
                  ))}
              </Link>

              {/* Dropdown — full-width dark panel (Element Wheels style) */}
              {menu.children && (
                <div
                  className={cn(
                    "fixed left-0 top-auto w-screen text-white bg-[#1a1a1a] shadow-2xl transition-all duration-300 transform z-50 border-t border-gray-700",
                    openMenu === menu.label
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 pointer-events-none -translate-y-2 invisible"
                  )}
                >
                  <div className="max-w-7xl mx-auto px-8 md:px-12 py-10">
                    {/* Check if children have sub-children (multi-column) */}
                    {menu.children.some((c) => c.children && c.children.length > 0) ? (
                      <div className="flex gap-12">
                        {/* Columns */}
                        <div className="flex-1 flex gap-10">
                          {menu.children.map((submenu, index) => (
                            <div key={index} className="flex-1 min-w-0">
                              <h4 className="font-bold text-[13px] uppercase tracking-wider text-white mb-5">
                                {submenu.label}
                              </h4>
                              {submenu.children && (
                                <ul className="flex flex-col gap-[10px]">
                                  {submenu.children.map((subsub) => (
                                    <li key={subsub.label}>
                                      <Link
                                        href={subsub.href || "#"}
                                        className="text-[13px] text-gray-400 hover:text-white transition-colors duration-200"
                                      >
                                        {subsub.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {submenu.href && (
                                <Link
                                  href={submenu.href}
                                  className="inline-block mt-5 text-[12px] font-bold uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors"
                                >
                                  View All {submenu.label}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Flat children — single column list */
                      <div className="flex gap-12">
                        <div className="min-w-[200px]">
                          <h4 className="font-bold text-[13px] uppercase tracking-wider text-white mb-5">
                            {menu.label}
                          </h4>
                          <ul className="flex flex-col gap-[10px]">
                            {menu.children.map((submenu) => (
                              <li key={submenu.label}>
                                <Link
                                  href={submenu.href || "#"}
                                  className="text-[13px] text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                  {submenu.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          {menu.href && (
                            <Link
                              href={menu.href}
                              className="inline-block mt-5 text-[12px] font-bold uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors"
                            >
                              View All
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <a href="tel:+1 (813) 812-5257" className="flex gap-2 text-black justify-end">
          <PhoneCall size={20} />
          <span className="">Call us:</span>
          +1 (813) 812-5257
        </a>
      </nav>
    </Container>
  );
}

export default NavBar