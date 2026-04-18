"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { syncOfflineEvents, trackEvent } from "@/lib/tracker";

export default function CustomAnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lastTrackedPath = useRef<string>("");

    // Memoize the search params string to prevent unnecessary re-renders
    const searchParamsString = useMemo(() => {
        return searchParams.toString();
    }, [searchParams]);

    // 1. Handle Initialization (Sync & Online Listeners)
    useEffect(() => {
        // Sync on mount
        syncOfflineEvents();

        const handleOnline = () => syncOfflineEvents();
        window.addEventListener("online", handleOnline);

        return () => window.removeEventListener("online", handleOnline);
    }, []);

    // 2. Handle Page Tracking
    useEffect(() => {
        const currentFullPath = searchParamsString
            ? `${pathname}?${searchParamsString}`
            : pathname;

        // Only track if the path actually changed
        if (lastTrackedPath.current !== currentFullPath) {
            lastTrackedPath.current = currentFullPath;

            trackEvent("page_view");
        }
    }, [pathname, searchParamsString]); // Use memoized string instead of searchParams

    return null;
}
