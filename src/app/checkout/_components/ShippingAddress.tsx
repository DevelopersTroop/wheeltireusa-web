"use client";

import { Input as TextInput } from "@/components/ui/input"; // Input component for form fields
import React from "react"; // React library and hooks

// Interface for the custom Input component props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: any;
  required?: boolean;
  error?: any;
  ref: any | Function;
}

// Custom Input component for form fields
export const Input = ({
  label,
  required = false,
  error,
  ...props
}: InputProps) => (
  <div className="flex flex-col gap-y-3 w-full">
    <label className="block text-lg mb-1 font-medium leading-[24px]">
      {label}
      {required && <span className="text-red-600 ml-1">*</span>}
    </label>
    <TextInput
      disabled={props.disabled}
      className={`w-full px-3 py-2 border rounded-[10px] ${
        error ? "border-red-500" : "border-[#D9D9D9] h-14 font-medium"
      } focus:outline-none text-gray-900 bg-white`}
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

