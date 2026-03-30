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
   * Optional label text size (Tailwind class)
   * @default "text-xs"
   */
  labelSize?: string;
  /**
   * If provided, renders an absolute positioned number indicator inside the button
   */
  stepNumber?: string | number;
  /**
   * Maximum height for the dropdown options list
   */
  dropdownMaxHeight?: string | number;
  /**
   * Calculate available height dynamically based on modal/container bounds
   */
  useDynamicHeight?: boolean;
  /**
   * Externally controlled open state. When provided, component becomes controlled.
   * Omit this prop to use internal uncontrolled state.
   */
  open?: boolean;
  /**
   * Callback when open state changes (for controlled mode)
   */
  onOpenChange?: (open: boolean) => void;
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
  labelSize = "text-xs",
  stepNumber,
  dropdownMaxHeight = "250px",
  useDynamicHeight = false,
  open: controlledOpen,
  onOpenChange,
}: YmmCustomSelectProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  // Use controlled open if provided, otherwise use internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  // Unified function to handle open state changes
  const setOpen = (newOpen: boolean | ((prev: boolean) => boolean)) => {
    const newValue = typeof newOpen === 'function' ? newOpen(open) : newOpen;
    if (controlledOpen !== undefined) {
      // Controlled mode - call the callback
      onOpenChange?.(newValue);
    } else {
      // Uncontrolled mode - use internal state
      setInternalOpen(newValue);
    }
  };
  const [dynamicMaxHeight, setDynamicMaxHeight] = useState<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [controlledOpen, onOpenChange]);

  // Calculate available height when dropdown opens
  useEffect(() => {
    if (open && useDynamicHeight && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();

      // Find the closest scrollable parent or modal content
      let scrollableParent: HTMLElement | null = containerRef.current;
      while (scrollableParent && scrollableParent !== document.body) {
        const overflowY = window.getComputedStyle(scrollableParent).overflowY;
        if (overflowY === 'auto' || overflowY === 'scroll') {
          break;
        }
        scrollableParent = scrollableParent.parentElement;
      }

      if (scrollableParent && scrollableParent !== document.body) {
        const parentRect = scrollableParent.getBoundingClientRect();
        const availableHeight = parentRect.bottom - buttonRect.bottom - 8; // 8px for margin
        setDynamicMaxHeight(Math.max(150, availableHeight)); // Minimum 150px
      } else {
        // Fallback to viewport
        const availableHeight = window.innerHeight - buttonRect.bottom - 8;
        setDynamicMaxHeight(Math.max(150, availableHeight));
      }
    } else {
      setDynamicMaxHeight(undefined);
    }
  }, [open, useDynamicHeight]);

  const currentLabel = loading ? "LOADING..." : value || placeholder || "";

  const maxHeight = dynamicMaxHeight ?? dropdownMaxHeight;

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <button
        ref={buttonRef}
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
          <span className={cn("absolute -top-2 left-2 px-1 bg-white font-semibold text-gray-700", labelSize)}>
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
        <div
          ref={dropdownRef}
          className="absolute left-0 top-full mt-1 w-full z-50 rounded-md border bg-white shadow-lg overflow-y-auto custom-scrollbar"
          style={{ maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }}
        >
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
