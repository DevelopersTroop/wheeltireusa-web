"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Select as RadixSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SelectProps {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    options: { name: string; abbreviation: string }[];
    placeholder?: string;
    required?: boolean;
    error?: string;
    className?: string;
}

export const ModernSelect = ({
    label,
    value,
    onValueChange,
    options,
    placeholder,
    required = false,
    error,
    className,
}: SelectProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.length > 0;

    return (
        <div className="group relative flex flex-col w-full pb-2">
            {/* Main Container */}
            <div
                className={cn(
                    "relative h-14 w-full transition-all duration-500 rounded-xl overflow-hidden",
                    "bg-slate-50 border border-slate-200 shadow-sm",
                    isFocused && "border-primary ring-2 ring-primary/10 bg-white",
                    error && "border-rose-500 ring-2 ring-rose-500/10 bg-rose-50/10",
                    className
                )}
            >
                {/* State Indicator */}
                <motion.div
                    initial={false}
                    animate={{
                        height: isFocused ? "100%" : "0%",
                        opacity: isFocused ? 1 : 0,
                        backgroundColor: error ? "#f43f5e" : "#3b82f6"
                    }}
                    className="absolute left-0 top-0 w-1 z-10"
                />

                {/* Placeholder Label */}
                <AnimatePresence>
                    {!hasValue && (
                        <motion.label
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none select-none z-20 font-black tracking-widest uppercase italic text-[13px] text-slate-400"
                        >
                            {label}
                            {required && <span className="ml-1 text-primary">*</span>}
                        </motion.label>
                    )}
                </AnimatePresence>

                {/* Radix Select */}
                <RadixSelect
                    value={value}
                    onValueChange={(val) => {
                        onValueChange(val);
                        setIsFocused(false);
                    }}
                    onOpenChange={(open) => setIsFocused(open)}
                >
                    <SelectTrigger
                        className={cn(
                            "w-full h-full border-none shadow-none px-4 bg-transparent outline-none focus:ring-0",
                            "text-slate-900 font-bold text-[15px] tracking-tight italic relative z-10 flex justify-between items-center group/trigger",
                            !hasValue && "opacity-0"
                        )}
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-slate-100 shadow-2xl bg-white/95 backdrop-blur-xl max-h-80">
                        {options.map((option) => (
                            <SelectItem
                                key={option.abbreviation}
                                value={option.abbreviation}
                                className="rounded-xl font-bold italic text-slate-700 focus:bg-primary/5 focus:text-primary transition-colors cursor-pointer"
                            >
                                {option.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </RadixSelect>

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
};
