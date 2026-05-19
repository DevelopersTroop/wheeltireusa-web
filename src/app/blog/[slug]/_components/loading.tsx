"use client"
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb"
import Item from "@/components/ui/breadcrumb/item"
import { CalendarDays, Clock3, UserCircle } from "lucide-react"

export const ClientLoadingSkeleton: React.FC = () => {
    return (
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-y-5">
            {/* Breadcrumb */}
            <div className="flex w-full items-start">
                <Breadcrumb>
                    <Item href={"/"}>Home</Item>
                    <Item href={`/blog`}>Blog</Item>
                    <Item isEnd href={`#`}>
                        <div className="bg-gray-200 animate-pulse h-4 w-20 rounded" />
                    </Item>
                </Breadcrumb>
            </div>

            {/* Hero Card Skeleton */}
            <div className="rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm">
                {/* Cover image skeleton */}
                <div className="w-full h-[220px] sm:h-[320px] md:h-[420px] bg-gray-200 animate-pulse" />

                <div className="px-5 sm:px-8 pt-6 pb-2">
                    {/* Category badge skeleton */}
                    <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse mb-4" />
                    {/* Title skeleton */}
                    <div className="space-y-3 mb-4">
                        <div className="h-8 bg-gray-200 rounded animate-pulse w-5/6" />
                        <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
                    </div>
                    {/* Meta row skeleton */}
                    <div className="flex gap-4 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-1.5">
                            <UserCircle size={16} className="text-gray-300" />
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CalendarDays size={16} className="text-gray-300" />
                            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock3 size={16} className="text-gray-300" />
                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Body content skeleton */}
                <div className="px-5 sm:px-8 pb-8 pt-4 space-y-4">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
                        <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
                        <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6" />
                        <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
                        <div className="h-4 bg-gray-100 rounded animate-pulse w-4/5" />
                    </div>
                    <div className="h-48 bg-gray-200 rounded animate-pulse w-full" />
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
                        <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3" />
                    </div>
                </div>
            </div>

            {/* Prev / Next skeleton */}
            <div className="grid grid-cols-2 gap-4">
                <div className="h-16 bg-gray-100 rounded-2xl animate-pulse" />
                <div className="h-16 bg-gray-100 rounded-2xl animate-pulse" />
            </div>
        </div>
    )
}