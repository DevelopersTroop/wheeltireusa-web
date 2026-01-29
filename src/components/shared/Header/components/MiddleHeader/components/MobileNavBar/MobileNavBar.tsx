"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import navMenus, { NavMenu } from "./config";
// import SearchUnderMenu from "../../../SearchUnderMenu/SearchUnderMenu";


// Recursive Mobile Navbar with Drawer
export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]); // track all open items

  // toggle open/close for a label
  const toggleKey = (label: string) => {
    setOpenKeys((prev) =>
      prev.includes(label) ? prev.filter((k) => k !== label) : [...prev, label]
    );
  };

  /**
   * Recursive renderer for menu items
   */
  const renderMenuItems = (items: NavMenu[], level: number = 0) => {
    return (
      <ul
        className={cn(
          "flex flex-col",
          level > 0 && "pl-5 border-l border-gray-100"
        )}
      >
        {items.map((item) => {
          const isExpanded = openKeys.includes(item.label);

          return (
            <li key={item.label} className="w-full">
              <div
                className={cn(
                  "flex justify-between items-center py-2",
                  level === 0
                    ? "px-4 font-semibold text-lg"
                    : level === 1
                    ? "px-3 text-base font-medium"
                    : "px-2 text-sm font-normal"
                )}
              >
                {/* Navigation Link */}
                <Link
                  href={item.href ?? "#"}
                  target={item.target}
                  onClick={() => {
                    if (!item.children) setIsOpen(false);
                  }}
                  className="flex-1 text-left relative after:absolute after:h-[2px] after:w-[15%] after:bg-primary after:bottom-0 after:left-0"
                >
                  {item.label}
                </Link>

                {/* Toggle button if has children */}
                {item.children && (
                  <button
                    onClick={() => toggleKey(item.label)}
                    aria-label={`Toggle ${item.label}`}
                    className="p-1"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : level === 0 ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Render nested children recursively */}
              {item.children && isExpanded && (
                <div className="transition-all duration-300 ease-in-out">
                  {renderMenuItems(item.children, level + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      {/* Hamburger Icon */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="p-2 text-black block custom-lg:hidden"
      >
        <Menu className="w-7 h-7" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        ></div>
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-4/5 bg-white text-black shadow-lg transition-all duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0 visible" : "-translate-x-full invisible"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="font-bold text-xl">
            <img src="/images/logo.png" className="h-8" />
          </span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <Link
          onClick={() => setIsOpen(false)}
          className="uppercase bg-primary text-white w-full inline-block text-center py-2 text-xl"
          href={"/login"}
        >
          Sign in or Create Account
        </Link>
        {/* <SearchUnderMenu isHomepage={false} /> */}

        {/* Navigation */}
        <nav className="py-2 uppercase">{renderMenuItems(navMenus)}</nav>

        <div className="px-4 mt-6">
          <Link
            className="text-xl font-semibold"
            href={"tel:+1 (813) 812-5257"}
          >
            Call us:{"  "}{" "}
            <span className="text-primary">+1 (813) 812-5257</span>
          </Link>
        </div>
      </div>
    </>
  );
}
