"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { trackEvent } from "@/lib/tracker";

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

  const searchInput = watch("search");

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      const input = document.querySelector<HTMLInputElement>(
        'input[name="search"]'
      );
      input?.focus();
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
    setOpen(true); // ✅ open overlay on actual submit
    trackEvent("search", {
      query: trimmed,
    });
  };

  return (
    <>
      {/* FULLSCREEN SEARCH OVERLAY */}
      {open && (
        <div className="fixed inset-0 z-150">
          {/* Background overlay */}
          <button
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-gray-900/40 cursor-default border-none"
            aria-label="Close search overlay"
          />

          {/* Search bar container */}
          <div className="relative bg-white shadow-md h-20 mx-auto max-w-7xl">
            <form
              className="h-full flex items-center border-b border-gray-200"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex-1 h-full">
                <Controller
                  name="search"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Search wheels"
                      className="px-6 font-medium text-2xl h-full border-none focus:outline-none w-full bg-white"
                      aria-label="Search for wheels and products"
                      onChange={(e) => {
                        field.onChange(e);
                        // ✅ Open overlay only once user *starts typing*
                        if (!open && e.target.value.trim().length > 0) {
                          setOpen(true);
                        }
                      }}
                    />
                  )}
                />
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-4 px-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  aria-label="Close search"
                  className="p-2"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </Button>
                <Button
                  type="submit"
                  variant="ghost"
                  aria-label="Submit search"
                  className="p-2"
                >
                  <Search className="h-6 w-6 text-black" />
                </Button>
              </div>
            </form>

            {/* Suggestions */}
            {/* <SearchSuggestion setOpen={setOpen} searchInput={searchInput} /> */}
          </div>
        </div>
      )}

      {/* HEADER SEARCH AREA */}
      <div className="h-full flex items-center justify-end flex-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-end h-full w-full max-w-xl xl:max-w-2xl 2xl:max-w-3xl"
        >
          {/* DESKTOP SEARCH BAR */}
          <div className="hidden lg:flex flex-1 mx-4">
            <div className="relative w-full">
              <Controller
                name="search"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Search wheels"
                    className="w-full pl-4 pr-10 h-12"
                    onChange={(e) => {
                      field.onChange(e);
                      // ✅ open overlay only when user *starts typing*
                      if (!open && e.target.value.trim().length > 0) {
                        setOpen(true);
                      }
                    }}
                  />
                )}
              />
              <Button
                type="submit"
                className="absolute right-0 top-1/2 bottom-0 px-3 -translate-y-1/2"
                variant="ghost"
                aria-label="Submit desktop search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* MOBILE SEARCH ICON */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            aria-label={ariaLabel || "Open mobile search"}
          >
            <Search size={32} />
          </Button>
        </form>
      </div>
    </>
  );
};

export default HeaderSearchButton;
