"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, required = false, error, className, onFocus, onBlur, onChange, ...props }, ref) => {
    const localRef = React.useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [hasContent, setHasContent] = useState(false);

    // Merge refs
    React.useImperativeHandle(ref, () => localRef.current!);

    // Check for content on mount and whenever internal state changes
    React.useEffect(() => {
      if (localRef.current) {
        setHasContent(localRef.current.value.length > 0);
      }
    }, [props.value, props.defaultValue]);

    return (
      <div className="group relative flex flex-col w-full pb-2">
        {/* Main Input Container */}
        <div
          className={cn(
            "relative h-14 w-full transition-all duration-500 rounded-xl overflow-hidden",
            "bg-slate-50 border border-slate-200 shadow-sm",
            isFocused && "border-primary ring-2 ring-primary/10 bg-white",
            error && "border-rose-500 ring-2 ring-rose-500/10 bg-rose-50/10",
            className
          )}
        >
          {/* State Indicator (Left Bar) */}
          <motion.div
            initial={false}
            animate={{
              height: isFocused ? "100%" : "0%",
              opacity: isFocused ? 1 : 0,
              backgroundColor: error ? "#f43f5e" : "#3b82f6"
            }}
            className="absolute left-0 top-0 w-1 z-10"
          />

          {/* Placeholder-style Label (Hides on data) */}
          <AnimatePresence>
            {!hasContent && (
              <motion.label
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none select-none z-20 font-black tracking-widest uppercase italic text-[13px] text-slate-400"
                )}
              >
                {label}
                {required && <span className="ml-1 text-primary">*</span>}
              </motion.label>
            )}
          </AnimatePresence>

          {/* Actual Input Field */}
          <input
            {...props}
            ref={localRef}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
              setHasContent(e.target.value.length > 0);
            }}
            onChange={(e) => {
              setHasContent(e.target.value.length > 0);
              onChange?.(e);
            }}
            className={cn(
              "w-full h-full py-4 px-4 bg-transparent outline-none",
              "text-slate-900 font-bold text-[15px] tracking-tight italic relative z-10",
              "placeholder:text-slate-300",
              props.disabled && "cursor-not-allowed opacity-50"
            )}
          />

          {/* Focus Background Overlay */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-linear-to-b from-primary/3 to-transparent pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute -bottom-4 left-2 text-[9px] font-black text-rose-500 uppercase tracking-widest italic wrap-break-word"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";
