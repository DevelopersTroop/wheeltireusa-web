"use client";

import { useContext } from "react";
import { YmmFilterModalContext } from "./YmmFilterModalContext";

export default function useYmmFilterModal() {
  const context = useContext(YmmFilterModalContext);
  if (!context) {
    throw new Error("useYmmFilterModal must be used within YmmFilterModalProvider");
  }
  return context;
}
