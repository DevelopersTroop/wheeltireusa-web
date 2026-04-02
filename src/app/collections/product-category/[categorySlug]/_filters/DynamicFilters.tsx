"use client";

import { TSingleFilter, TPriceFilter, TFilters } from "@/types/filter";
import React, { useState } from "react";
import FilterHeading from "./template/FilterHeading";
import SelectFilterTemplate from "./template/SelectFilterTemplate";
import PriceRange from "./widgets/components/PriceRange";
import { getFilterKeyTitle } from "@/constants/filterKeys";

/**
 * Configuration for a single dynamic filter section.
 */
type FilterSectionConfig = {
    /** The key in the filters JSON (e.g. "wheelDiameter") */
    key: string;
    /** Human-readable title override. If omitted, auto-generated from key. */
    title?: string;
    /** Whether this section starts expanded. Default: false */
    defaultOpen?: boolean;
};

type DynamicFiltersProps = {
    /** The raw filters object from the API */
    filters: TFilters | null;
    /**
     * Keys to exclude from rendering.
     * Example: ["category", "vendorName", "priceSource", "compare"]
     */
    exclude?: string[];
    /**
     * Optional ordered list of filter keys to include. If provided, only these
     * keys are shown, in the given order. Each entry can be a string (key name)
     * or a FilterSectionConfig for more control.
     */
    include?: (string | FilterSectionConfig)[];
    /** Show loading skeleton instead of filters */
    loading?: boolean;
};

/**
 * Skeleton for a single filter section (heading + a few placeholder rows).
 */
const FilterSectionSkeleton = ({ hasItems = false }: { hasItems?: boolean }) => (
    <div className="border-b border-gray-200 px-5 py-4">
        <div className="flex items-center justify-between py-2">
            <div className="h-3.5 w-28 rounded animate-color-pulse" />
            <div className="h-3.5 w-3.5 rounded animate-color-pulse" />
        </div>
        {hasItems && (
            <div className="pt-2 pb-1 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="h-[18px] w-[18px] rounded-[3px] animate-color-pulse shrink-0" />
                        <div
                            className="h-3 rounded animate-color-pulse"
                            style={{ width: `${55 + Math.random() * 35}%` }}
                        />
                    </div>
                ))}
            </div>
        )}
    </div>
);

/**
 * Full filter sidebar skeleton (shown while filters are loading).
 */
const FiltersSkeleton = ({ count = 6 }: { count?: number }) => (
    <>
        {Array.from({ length: count }).map((_, i) => (
            <FilterSectionSkeleton key={i} hasItems={i === 0} />
        ))}
    </>
);

/**
 * Checks if a filter value is a price range object (min/max).
 */
function isPriceFilter(value: unknown): value is TPriceFilter {
    return (
        typeof value === "object" &&
        value !== null &&
        "min" in value &&
        "max" in value &&
        !Array.isArray(value)
    );
}

/**
 * Checks if a filter value is an array of { value, count } items.
 */
function isArrayFilter(value: unknown): value is TSingleFilter[] {
    return Array.isArray(value);
}

import { useSearchParams } from "next/navigation";

/**
 * A single collapsible filter section with a heading and content.
 */
const FilterSection = React.memo(({
    title,
    filterKey,
    data,
    defaultOpen = false,
}: {
    title: string;
    filterKey: string;
    data: TSingleFilter[];
    defaultOpen?: boolean;
}) => {
    const searchParams = useSearchParams();
    const hasSelection = !!searchParams?.get(filterKey);
    
    const [showFilter, setShowFilter] = useState(defaultOpen || hasSelection);

    React.useEffect(() => {
        if (hasSelection) {
            setShowFilter(true);
        }
    }, [hasSelection]);

    return (
        <div className="border-b border-gray-200 px-5 py-4">
            <FilterHeading
                showFilter={showFilter}
                toggleFilter={() => setShowFilter(!showFilter)}
                title={title}
            />
            {showFilter && (
                <SelectFilterTemplate filterKey={filterKey} filterData={data} />
            )}
        </div>
    );
});
FilterSection.displayName = "FilterSection";

const DynamicFilters = ({ filters, exclude = [], include, loading = false }: DynamicFiltersProps) => {
    if (loading || !filters) {
        return loading ? <FiltersSkeleton count={include?.length || 6} /> : null;
    }

    // Normalize include list into FilterSectionConfig[]
    const normalizedInclude: FilterSectionConfig[] | undefined = include?.map(
        (item) => (typeof item === "string" ? { key: item } : item)
    );

    // Determine which keys to render and in what order
    let filterKeys: FilterSectionConfig[];

    if (normalizedInclude) {
        // Use explicit include list (preserves order)
        filterKeys = normalizedInclude.filter((cfg) => {
            const value = filters[cfg.key];
            if (!value) return false;
            if (cfg.key === "price") return isPriceFilter(value);
            return isArrayFilter(value) && value.length > 0;
        });
    } else {
        // Auto-detect: use all keys except excluded, skip empty arrays
        filterKeys = Object.keys(filters)
            .filter((key) => {
                if (exclude.includes(key)) return false;
                const value = filters[key];
                if (key === "price") return isPriceFilter(value);
                return isArrayFilter(value) && value.length > 0;
            })
            .map((key) => ({ key }));
    }

    return (
        <>
            {filterKeys.map((cfg) => {
                const { key, title, defaultOpen } = cfg;
                const value = filters[key];

                // Render price range
                if (key === "price" && isPriceFilter(value)) {
                    return <PriceRange key={key} price={value} />;
                }

                // Render checkbox filter section
                if (isArrayFilter(value)) {
                    return (
                        <FilterSection
                            key={key}
                            filterKey={key}
                            title={title || getFilterKeyTitle(key)}
                            data={value}
                            defaultOpen={defaultOpen}
                        />
                    );
                }

                return null;
            })}
        </>
    );
};

export default DynamicFilters;
