"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type YmmCustomSelectProps = {
  value?: string;
  placeholder?: string;
  options: string[];
  disabled?: boolean;
  loading?: boolean;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
  required?: boolean;
  /**
   * If provided, renders an absolute positioned number indicator inside the button
   */
  stepNumber?: string | number;
};

export default function YmmCustomSelect({
  value,
  placeholder,
  options,
  disabled,
  loading,
  onChange,
  className,
  label,
  required,
  stepNumber,
}: YmmCustomSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const currentLabel = loading ? "LOADING..." : value || placeholder || "";

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => !disabled && setOpen((prev) => !prev)}
        disabled={disabled}
        className={cn(
          "w-full bg-white flex items-center justify-between shadow-none ring-0 focus:ring-0 appearance-none h-14 relative rounded-sm transition-colors",
          // Base styles mimicking the requested original UI
          "text-gray-600 uppercase text-xs font-semibold px-3 py-2.5",
          // Border handling based on state
          open 
            ? "border border-primary ring-1 ring-primary z-10" 
            : "border border-gray-300 hover:border-primary",
          disabled && "opacity-50 cursor-not-allowed",
          // Make room for the step number if it exists
          stepNumber && "pl-12"
        )}
      >
        {stepNumber && (
          <>
            <div className="absolute left-3 z-10 text-gray-900 font-bold text-sm sm:text-xs">
              {stepNumber}
            </div>
            <div className="absolute left-8 z-10 w-px h-5 bg-gray-300"></div>
          </>
        )}

        {label && !stepNumber ? (
          <span className="absolute -top-2 left-2 px-1 bg-white text-xs font-semibold text-gray-700">
            {required && <span className="text-red-600 mr-0.5">*</span>}
            {label}
          </span>
        ) : null}
        
        <span className="truncate">{currentLabel}</span>
        
        <ChevronDown 
          className={cn(
            "h-4 w-4 text-gray-500 pointer-events-none transition-transform shrink-0", 
            open && "rotate-180 text-primary"
          )} 
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-full z-50 rounded-md border bg-white shadow-lg overflow-y-auto max-h-[250px] custom-scrollbar">
          <ul className="py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  className={cn(
                    "w-full text-left px-3 py-2.5 text-sm transition-colors hover:bg-primary/10",
                    value === option && "text-primary font-bold bg-primary/5"
                  )}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
