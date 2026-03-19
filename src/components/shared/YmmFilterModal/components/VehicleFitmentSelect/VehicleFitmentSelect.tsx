"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type VehicleFitmentSelectProps = {
  value?: string;
  placeholder?: string;
  options: string[];
  disabled?: boolean;
  loading?: boolean;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
  required?: boolean;
};

export default function VehicleFitmentSelect({
  value,
  placeholder,
  options,
  disabled,
  loading,
  onChange,
  className,
  label,
  required,
}: VehicleFitmentSelectProps) {
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

  const currentLabel = loading ? "Loading..." : value || placeholder || "";

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setOpen((prev) => !prev)}
        disabled={disabled}
        className={cn(
          "h-12 w-full rounded-md border border-input bg-white px-3 text-left flex items-center justify-between shadow-sm disabled:opacity-50 relative",
          open && "border-primary ring-2 ring-primary",
          !open && "hover:border-primary"
        )}
      >
        {label ? (
          <span className="absolute -top-2 left-2 px-1 bg-white text-xs font-semibold text-gray-700">
            {required ? <span className="text-red-600 mr-0.5">*</span> : null}
            {label}
          </span>
        ) : null}
        <span className="truncate text-base font-bold">{currentLabel}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <div
          className="absolute left-0 top-full mt-1 w-full z-60 rounded-md border bg-white shadow-lg overflow-y-auto max-h-[200px] custom-scrollbar"
        >
          <ul className="py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm hover:bg-primary/10",
                    value === option && "text-primary font-semibold bg-primary/10"
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
      ) : null}
    </div>
  );
}
