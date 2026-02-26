"use client";
import { setViewType } from "@/redux/features/layoutSlice";
import { RootState } from "@/redux/store";
import { LayoutGrid, List } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ViewToggle = () => {
    const viewType = useSelector((state: RootState) => state.persisted.layout.viewType);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-row gap-2 items-center">
            <button
                onClick={() => dispatch(setViewType("grid"))}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${viewType === "grid" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                aria-label="Grid View"
            >
                <LayoutGrid size={20} />
            </button>
            <button
                onClick={() => dispatch(setViewType("list"))}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${viewType === "list" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                aria-label="List View"
            >
                <List size={20} />
            </button>
        </div>
    );
};

export default ViewToggle;
