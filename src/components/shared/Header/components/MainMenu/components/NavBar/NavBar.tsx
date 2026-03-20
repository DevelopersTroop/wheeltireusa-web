'use client';
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, PhoneCall } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import navMenus, { NavMenu } from "./config";
import Container from "@/components/ui/container/container";
import { setIsModalOpen } from "@/redux/features/ymmFilterSlice";

function NavBar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolling, setScrolling] = useState(false);
  const dispatch = useDispatch();
  const [submenuTimeout, setSubmenuTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (submenuTimeout) clearTimeout(submenuTimeout);
    setOpenMenu(menu);
  };

  const handleMouseLeave = () => {
    setSubmenuTimeout(setTimeout(() => setOpenMenu(null), 250));
  };

  // Detect scroll for shadow animation
  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleNavMenuClick = (menu: NavMenu) => {
    if (menu.label?.toLowerCase() === "shop wheels") {
      dispatch(setIsModalOpen({ 
        isOpen: true, 
        source: "nav_menu", 
        redirectPath: "/collections/product-category/wheels",
        brandCategory: "wheels"
      }));
    }
    if (menu.label?.toLowerCase() === "shop tires") {
      dispatch(setIsModalOpen({ 
        isOpen: true, 
        source: "nav_menu", 
        redirectPath: "/collections/product-category/tires" ,
        brandCategory: "tire"
      }));
    }
    // if (submenu.label?.toLowerCase() === "shop tires") {
    //   dispatch(setIsModalOpen({ 
    //     isOpen: true, 
    //     source: "nav_menu", 
    //     redirectPath: "/collections/product-category/tires" 
    //   }));
    // }
    // if (submenu.label?.toLowerCase() === "wheels by brands") {
    //   dispatch(setIsModalOpen({ 
    //     isOpen: true, 
    //     source: "nav_menu", 
    //     redirectPath: "/collections/product-category/wheels",
    //     mainTab: "brand",
    //     brandCategory: "wheels"
    //   }));
    // }
  }
  return (
    <div
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 max-w-[1350px] mx-auto px-4",
        scrolling ? "bg-[#2F2F2F] shadow-md" : "bg-[#2F2F2F] shadow-none"
      )}
    >
      <Container>
        <nav className="w-full lg:flex items-center justify-between relative hidden text-white px-2 py-3">
          <ul className="flex space-x-5 py-2 items-center uppercase z-50">
            {navMenus.map((menu) => (
              <li
                key={menu.label}
                onMouseEnter={() => handleMouseEnter(menu.label || "")}
                onMouseLeave={handleMouseLeave}
                className="relative"
                onClick={() => handleNavMenuClick(menu)}
              >
                {/* Main menu button */}
                <Link
                  target={menu.target}
                  href={menu.href || "#"}
                  className={cn(
                    "text-white px-2 py-2 flex items-center text-[13px] font-semibold tracking-wide relative group rounded-sm",
                    "transition-colors duration-500 ease-in-out",
                    openMenu === menu.label
                      ? "bg-primary text-white"
                      : "bg-transparent hover:bg-primary hover:text-white"
                  )}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    {menu.label}
                    {menu.children &&
                      (openMenu === menu.label ? (
                        <ChevronUp className="ml-1.5 w-4 h-4 z-10" />
                      ) : (
                        <ChevronDown className="ml-1.5 w-4 h-4 z-10" />
                      ))}
                  </span>
                </Link>

                {/* Dropdown */}
                {menu.children && (
                  <div
                    className={cn(
                      "absolute left-0 top-full mt-6 text-white bg-[#2F2F2F] shadow-2xl transition-all duration-300 transform z-50 border border-gray-800 rounded-md overflow-hidden",
                      openMenu === menu.label
                        ? "opacity-100 translate-y-0 visible"
                        : "opacity-0 -translate-y-2 invisible pointer-events-none"
                    )}
                    style={{
                      minWidth: menu.children.length > 1 ? `${menu.children.length * 200}px` : "200px",
                      maxWidth: "100vw", // Ensure dropdown does not exceed the viewport width
                      left: 0, // Ensure dropdown opens from the left edge
                    }}
                  >
                    <div className="px-6 py-4">
                      <div className="flex gap-10 max-w-full overflow-x-auto">
                        {menu.children.map((submenu, index) => (
                          <div key={index} className="flex-1 min-w-0">
                            <h4 className="font-bold text-[12px] uppercase tracking-wider text-white py-2 text-center bg-[#555555] mb-4 rounded-sm"
                            >
                              {submenu.label}
                            </h4>
                            {submenu.children && (
                              <ul className="flex flex-col gap-2 max-w-full flex-wrap">
                                {submenu.children.map((subsub) => (
                                  <li key={subsub.label}>
                                    <Link
                                      href={subsub.href || "#"}
                                      className={cn(
                                        "text-[13px] text-white hover:text-gray-400 transition-colors duration-300",
                                        "relative before:absolute before:inset-0 before:bg-primary before:opacity-0 before:rounded-sm before:transition-opacity before:duration-500 hover:before:opacity-10"
                                      )}
                                    >
                                      <span className="relative z-10 px-1">{subsub.label}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {submenu.href && (
                              <Link
                                href={submenu.href}
                                className="inline-block mt-4 text-[11px] font-bold uppercase tracking-wider text-primary hover:text-red-400 transition-colors duration-300"
                              >
                                View All {submenu.label}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Call Button */}
          <a
            href="tel:+1 (813) 812-5257"
            className="flex items-center gap-2 text-white text-sm font-medium hover:text-primary transition-colors duration-300"
          >
            <PhoneCall size={18} />
            <span>Call us:</span>+1 (813) 812-5257
          </a>
        </nav>
      </Container>
    </div>
  );
}

export default NavBar;