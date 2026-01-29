"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";

export default function TopBar() {
  const [currency, setCurrency] = useState("USD");
  return (
    <div className="border-b bg-white text-gray-500 hidden lg:block">
      <div className="container px-4 py-1 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href={"/about"}>About us</Link>
          <Link href={"/track-order"}>Track order</Link>
          <Link href={"/blog"}>Blog</Link>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <p>Currency:</p>
            <Select value={currency} onValueChange={(c) => setCurrency(c)}>
              <SelectTrigger className="border-none shadow-none">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                {/* <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
