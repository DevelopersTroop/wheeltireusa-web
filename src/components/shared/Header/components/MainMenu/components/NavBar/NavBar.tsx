"use client"
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import navMenus from "./config";

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

  useEffect(() => {
    console.log(nestedHovering, currentlyHovering);
  }, [nestedHovering, currentlyHovering]);

  // Function to handle mouse leave on a menu item
  const handleMouseLeave = () => {
    setSubmenuTimeout(setTimeout(() => setOpenMenu(null), 400)); // Slight delay before disappearing
  };
  return (
    <nav
      className={cn(
        "bg-transparent w-full text-white ml-4 flex items-center justify-between"
      )}
    >
      {/* Navigation menu list */}
      <ul className="flex space-x-6 py-4 items-center relative uppercase">
        {navMenus.map((menu) => (
          <li
            key={menu.label}
            onMouseEnter={() => handleMouseEnter(menu.label || "")}
            onMouseLeave={handleMouseLeave}
            className={cn(menu.meagMenu ? "" : "relative")}
          >
            {/* Menu link */}
            <Link
              // onClick={handleProductFilter}
              target={menu.target}
              href={menu.href || "#"}
              className={cn(
                "text-white p-2 flex items-center transition-all duration-300 relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300",
                isHomePage && "hover:text-white "
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

            {/* Mega Menu */}
            {menu.meagMenu && (
              <div
                className={cn(
                  "absolute left-0 top-[75%] w-full text-black bg-white px-16 py-10 grid grid-cols-12  gap-16 shadow-lg transition-all duration-300 transform rounded-b-[20px]",
                  openMenu === menu.label
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 pointer-events-none -translate-y-20"
                )}
              >
                {menu.children?.map((submenu, index) => (
                  <div
                    key={index}
                    className={cn(
                      "col-span-6",
                      (index === 3 || index === 2) &&
                        " border-black border-t-2 mt-2 "
                    )}
                  >
                    <Link
                      // onClick={handleProductFilter}
                      className="font-bold text-xl"
                      href={submenu.href ?? "#"}
                    >
                      {submenu.label}
                    </Link>
                    {submenu.children && (
                      <div className="w-full bg-white transition-opacity duration-300">
                        {submenu.children.map((subsub, i) => (
                          <div
                            key={subsub.label}
                            className="relative"
                            onMouseOver={() => {
                              setCurrentlyHovering(i);
                              setNestedHovering((prev) => ({
                                ...prev,
                                [subsub?.label ?? ""]: i,
                              }));
                            }}
                          >
                            <div className="w-full flex items-center justify-between">
                              <Link
                                // onClick={handleProductFilter}
                                key={subsub.label}
                                href={subsub.href || ""}
                                className={cn(
                                  `text-base flex w-fit items-center py-2 transition-all duration-300 hover:text-primary relative 
                                  after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary 
                                  after:scale-x-0 hover:after:scale-x-100 
                                  after:origin-left after:transition-transform after:duration-300`
                                )}
                              >
                                {subsub.label}
                                {subsub.children && (
                                  <ChevronDown className="ml-2 w-4 h-4" />
                                )}
                              </Link>
                              {/* {index === 1 && <ArrowRight />} */}
                            </div>
                            {/* {subsub.children && (
                                <ul
                                  className={cn(
                                    "pl-4 overflow-hidden transition-all duration-300 transform",
                                    nestedHovering &&
                                      currentlyHovering &&
                                      currentlyHovering >=
                                        nestedHovering[subsub?.label ?? ""]
                                      ? "max-h-96 opacity-100 translate-y-0"
                                      : "max-h-0 opacity-0 -translate-y-2"
                                  )}
                                >
                                  {subsub.children?.map((nestedSubMenu) => (
                                    <li
                                      key={nestedSubMenu.label}
                                      className="mb-3"
                                    >
                                      <Link
                                        href={nestedSubMenu.href || "#"}
                                        className="block py-1 transition-all duration-300 hover:text-primary"
                                      >
                                        {nestedSubMenu.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )} */}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Normal Dropdown */}
            {!menu.meagMenu && menu.children && (
              <div
                className={cn(
                  "absolute top-full left-0 text-black bg-white w-56 py-4 shadow-2xl transition-all duration-300 transform rounded-b-[12px]",
                  openMenu === menu.label
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-20 pointer-events-none"
                )}
              >
                {menu.children.map((submenu) => (
                  <div
                    key={submenu.label}
                    className="relative"
                    onMouseEnter={() => setHovering(submenu?.label || "")}
                    onMouseLeave={() => setHovering(null)}
                  >
                    {/* Submenu link */}
                    <Link
                      // onClick={handleProductFilter}
                      href={submenu?.href || "#"}
                      className="flex items-center py-2 mx-4 transition-all duration-300 hover:text-primary relative 
after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary 
after:scale-x-0 hover:after:scale-x-100 after:origin-left 
after:transition-transform after:duration-300"
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
                          "absolute left-full top-0 w-56 bg-white p-4 shadow-md transition-opacity duration-300 transform",
                          hovering === submenu.label
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                        )}
                      >
                        {submenu.children.map((subsub) => (
                          <Link
                            // onClick={handleProductFilter}
                            key={subsub.label}
                            href={subsub?.href || "#"}
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

      <a href="tel:+1 (813) 812-5257" className="flex gap-2">
        <span className="text-gray-300">Call us:</span>
        +1 (813) 812-5257
      </a>
    </nav>
  );
}

export default NavBar