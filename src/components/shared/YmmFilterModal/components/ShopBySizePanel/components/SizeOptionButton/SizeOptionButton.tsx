"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
};

export default function SizeOptionButton({ children, onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "py-3 px-2 rounded-md border border-gray-300 bg-white text-center text-sm sm:text-base font-bold text-gray-800 transition-colors hover:border-primary hover:text-primary",
        className
      )}
    >
      {children}
    </button>
  );
}