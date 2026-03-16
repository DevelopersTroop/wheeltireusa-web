"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { BiSearch } from "react-icons/bi";
import { Controller, useForm } from "react-hook-form";
import { trackEvent } from "@/lib/tracker";
import { useAppDispatch } from "@/redux/store";
import { addSearchHistory } from "@/redux/features/layoutSlice";
import SearchSuggestion from "./components/SearchSuggestion/SearchSuggestion";

interface HeaderSearchButtonProps {
  isHomepage: boolean;
  "aria-label"?: string;
}

const HeaderSearchButton: React.FC<HeaderSearchButtonProps> = ({
  isHomepage,
  "aria-label": ariaLabel,
}) => {
  const [open, setOpen] = React.useState(false);

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: { search: "" },
  });
  
  const dispatch = useAppDispatch();

  const searchInput = watch("search");

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      // Focus appropriate input based on screen size
      if (window.innerWidth >= 1024) {
        document.getElementById("desktop-search-input")?.focus();
      } else {
        document.getElementById("mobile-search-input")?.focus();
      }
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const onSubmit = (data: { search: string }) => {
    const trimmed = data.search.trim();
    if (!trimmed) return;
    dispatch(addSearchHistory(trimmed));
    setOpen(true); // ✅ open overlay on actual submit
    trackEvent("search", {
      query: trimmed,
    });
  };

  const handleHistorySelect = (query: string) => {
    setValue("search", query);
    setOpen(true);
    // Focus appropriate input to run native onChange query search
    if (window.innerWidth >= 1024) {
      document.getElementById("desktop-search-input")?.focus();
    } else {
      document.getElementById("mobile-search-input")?.focus();
    }
  };

  return (
    <>
      {/* BACKGROUND OVERLAY FOR DESKTOP */}
      {open && (
        <button
          onClick={() => setOpen(false)}
          className="hidden lg:block fixed inset-0 bg-gray-900/60 cursor-default border-none z-140 transition-opacity"
          aria-label="Close search overlay"
        />
      )}

      {/* MOBILE FULLSCREEN SEARCH OVERLAY */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-150 flex flex-col bg-white">
          {/* Search bar container */}
          <div className="relative w-full bg-white flex flex-col shadow-sm">
            <form
              className="w-full flex items-center border-b border-gray-300 h-16"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex-1 h-full">
                <Controller
                  name="search"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="mobile-search-input"
                      type="text"
                      autoComplete="off"
                      placeholder="Search..."
                      className="px-4 py-3 text-sm font-medium h-full border-none focus:outline-none w-full bg-white placeholder:text-gray-500"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </div>

              {/* Action buttons */}
              <div className="flex items-center h-full">
                {searchInput?.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setValue("search", "");
                      document.getElementById("mobile-search-input")?.focus();
                    }}
                    aria-label="Clear search"
                    className="h-full w-12 p-0 hover:bg-transparent rounded-none"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={() => setOpen(false)}
                  variant="ghost"
                  aria-label="Close mobile search"
                  className="h-full w-12 p-0 hover:bg-gray-50 rounded-none border-l border-gray-300"
                >
                  <X className="h-5 w-5 text-gray-800" />
                </Button>
              </div>
            </form>
          </div>

          {/* Suggestions Container */}
          <div className="flex-1 bg-white overflow-y-auto">
            <SearchSuggestion setOpen={setOpen} searchInput={searchInput} onHistorySelect={handleHistorySelect} />
          </div>
        </div>
      )}

      {/* HEADER SEARCH AREA */}
      <div className="h-full flex items-center justify-end flex-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`flex items-center justify-end h-full w-full max-w-xl xl:max-w-2xl 2xl:max-w-3xl ${
            open ? "z-150 relative" : ""
          }`}
        >
          {/* DESKTOP SEARCH BAR */}
          <div className="hidden lg:flex flex-1 mx-4 h-10 relative">
            <div
              className={`flex w-full bg-white rounded-sm border items-center transition-shadow ${
                open
                  ? "rounded-b-none ring-1 ring-primary border-primary"
                  : "border-gray-300 shadow-sm"
              }`}
            >
              <Controller
                name="search"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="desktop-search-input"
                    type="text"
                    autoComplete="off"
                    placeholder="Search by Make Model Year, Product Type, Part Number, or Brand..."
                    className="flex-1 px-4 h-full bg-transparent text-sm placeholder:text-gray-500 font-medium focus:outline-none rounded-sm"
                    onClick={() => {
                      if (!open) setOpen(true);
                    }}
                    onChange={(e) => {
                      field.onChange(e);
                      if (!open && e.target.value.trim().length > 0) {
                        setOpen(true);
                      }
                    }}
                  />
                )}
              />

              <div className="flex items-center h-full">
                {searchInput?.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={(e) => {
                      e.preventDefault();
                      setValue("search", "");
                      document.getElementById("desktop-search-input")?.focus();
                    }}
                    aria-label="Clear search"
                    className={`w-10 h-full p-0 rounded-none hover:bg-transparent ${
                      open ? "flex" : "hidden"
                    }`}
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </Button>
                )}
                <Button
                  type="submit"
                  className="h-full px-3 hover:bg-gray-50 rounded-none border-l border-gray-200"
                  variant="ghost"
                  aria-label="Submit desktop search"
                >
                  <BiSearch className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            </div>

            {/* DESKTOP DROPDOWN EXACTLY LIKE CARID */}
            {open && (
              <div className="absolute top-full left-0 right-0 mt-0 bg-white shadow-lg overflow-hidden border border-t-0 border-primary rounded-b-sm max-h-[70vh] flex flex-col z-150">
                <div className="flex-1 overflow-y-auto w-full">
                  <SearchSuggestion setOpen={setOpen} searchInput={searchInput} onHistorySelect={handleHistorySelect} />
                </div>
              </div>
            )}
          </div>

          {/* MOBILE SEARCH ICON */}
          <div
            className="lg:hidden cursor-pointer shrink-0"
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            aria-label={ariaLabel || "Open mobile search"}
          >
            <BiSearch size={26} className="text-gray-600" />
          </div>
        </form>
      </div>
    </>
  );
};

export default HeaderSearchButton;
