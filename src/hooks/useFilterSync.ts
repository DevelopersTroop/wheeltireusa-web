"use client";
import debounce from "lodash/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Filters = Record<string, string>;

export const useFilterSync = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [localFilters, setLocalFilters] = useState<Filters>({});
  console.log("TCL: useFilterSync -> localFilters", localFilters);

  // Use ref to track if we're syncing from URL to avoid circular updates
  const isSyncingFromURL = useRef(false);

  /**
   * ✅ Extract only your "filter keys"
   * Example: ignore cartPackage, cartSerial, session, etc.
   */
  const parsedFilters = useMemo<Filters>(() => {
    const params: Filters = {};
    searchParams.forEach((value, key) => {
      // only include keys you want to treat as filters
      if (["cartPackage", "cartSerial"].includes(key)) return;
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  // ✅ Sync local state with URL for only managed filters
  useEffect(() => {
    isSyncingFromURL.current = true;
    setLocalFilters(parsedFilters);
    // Reset flag after state update completes
    setTimeout(() => {
      isSyncingFromURL.current = false;
    }, 0);
  }, [parsedFilters]);

  /**
   * ✅ Debounced query updater - using useRef to maintain stable reference
   */
  const updateQueryParamsRef = useRef(
    debounce(
      (
        filters: Filters,
        currentSearchParams: URLSearchParams,
        currentPathname: string,
        currentParsedFilters: Filters
      ) => {
        // 1️⃣ start with full query (so we keep cartPackage, cartSerial, etc.)
        const params = new URLSearchParams(currentSearchParams.toString());

        // 2️⃣ remove all keys we manage (clean slate for filters)
        Object.keys(currentParsedFilters).forEach((key) => params.delete(key));

        // 3️⃣ add updated filters
        Object.entries(filters).forEach(([key, value]) => {
          if (value && value.trim()) params.set(key, value);
        });

        // 4️⃣ build final URL
        const queryString = params.toString();
        const url = queryString
          ? `${currentPathname}?${queryString}`
          : currentPathname;

        router.replace(url, { scroll: false });
      },
      150
    )
  );

  // ✅ Cleanup debounce on unmount
  useEffect(() => {
    return () => updateQueryParamsRef.current.cancel();
  }, []);

  // ✅ Auto-update URL when filters change (but not when syncing from URL)
  useEffect(() => {
    if (!isSyncingFromURL.current) {
      updateQueryParamsRef.current(
        localFilters,
        searchParams,
        pathname,
        parsedFilters
      );
    }
  }, [localFilters, searchParams, pathname, parsedFilters]);

  // ✅ Toggle logic
  const toggleFilterValue = useCallback(
    (key: string, value: string, acceptMultiple = true) => {
      setLocalFilters((prev) => {
        const prevValues = prev[key]?.split(",").filter(Boolean) || [];
        let newValues: string[];

        if (acceptMultiple) {
          newValues = prevValues.includes(value)
            ? prevValues.filter((v) => v !== value)
            : [...prevValues, value];
        } else {
          newValues = [value];
        }

        const updated = { ...prev };
        if (newValues.length === 0) {
          delete updated[key];
        } else {
          updated[key] = newValues.join(",");
        }

        return updated;
      });
    },
    []
  );

  // ✅ For search field / inputs
  const handleSearch = useCallback((key: string, value: string) => {
    setLocalFilters((prev) => {
      const updated = { ...prev };
      if (!value.trim()) delete updated[key];
      else updated[key] = value;
      return updated;
    });
  }, []);

  // ✅ Helpers
  const removeKey = useCallback((key: string) => {
    setLocalFilters((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  }, []);

  const removeSorting = useCallback(() => removeKey("sort"), [removeKey]);

  const clearFilters = useCallback(() => {
    setLocalFilters({});
  }, []);

  return {
    filters: localFilters,
    toggleFilterValue,
    handleSearch,
    removeKey,
    removeSorting,
    clearFilters,
  };
};
