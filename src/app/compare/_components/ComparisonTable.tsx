'use client';

import { useState } from 'react';
import { FaChevronUp, FaChevronDown, FaCheck, FaTimes } from 'react-icons/fa';
import { IoRemove } from 'react-icons/io5';
import { TInventoryItem } from '@/types/product';
import {
    SpecCategory,
    getSpecValue,
    checkDifference,
    checkSimilarity
} from './comparison-configs';

interface ComparisonTableProps {
    products: TInventoryItem[];
    categories: SpecCategory[];
    viewMode: 'all' | 'differences' | 'similarities';
    highlightDifferences: boolean;
    expandedCategories: string[];
    onToggleCategory: (name: string) => void;
}

const ComparisonTable = ({
    products,
    categories,
    viewMode,
    highlightDifferences,
    expandedCategories,
    onToggleCategory,
}: ComparisonTableProps) => {
    return (
        <div className="space-y-4">
            {categories.map((category) => {
                const isExpanded = expandedCategories.includes(category.name);

                // Filter specs based on view mode
                const visibleSpecs = category.specs.filter((spec) => {
                    const hasAnyValue = products.some(
                        (p) => getSpecValue(p, spec.key) !== null
                    );
                    if (!hasAnyValue) return false;

                    if (viewMode === 'differences') {
                        return checkDifference(products, spec.key);
                    } else if (viewMode === 'similarities') {
                        return checkSimilarity(products, spec.key);
                    }
                    return true;
                });

                if (visibleSpecs.length === 0) return null;

                return (
                    <div
                        key={category.name}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm print:break-inside-avoid"
                    >
                        {/* Category Header */}
                        <button
                            onClick={() => onToggleCategory(category.name)}
                            className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors print:bg-gray-100"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                    {category.icon}
                                </div>
                                <span className="font-semibold text-[#210203]">
                                    {category.name}
                                </span>
                                <span className="text-sm text-gray-400">
                                    ({visibleSpecs.length} specs)
                                </span>
                            </div>
                            <div className="print:hidden">
                                {isExpanded ? (
                                    <FaChevronUp className="text-gray-400" />
                                ) : (
                                    <FaChevronDown className="text-gray-400" />
                                )}
                            </div>
                        </button>

                        {/* Specs Table */}
                        <div
                            className={`${isExpanded ? 'block' : 'hidden print:block'} overflow-x-auto`}
                        >
                            <table className="w-full min-w-[800px] table-fixed">
                                <tbody>
                                    {visibleSpecs.map((spec, specIndex) => {
                                        const hasDifference = checkDifference(products, spec.key);
                                        const shouldHighlight = highlightDifferences && hasDifference;

                                        return (
                                            <tr
                                                key={spec.key}
                                                className={`border-t border-gray-100 transition-colors ${specIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                                                    } ${shouldHighlight ? 'bg-amber-50' : ''}`}
                                            >
                                                <td className="px-6 py-3 text-sm font-medium text-gray-700 w-[200px] min-w-[200px] sticky left-0 bg-inherit z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                                                    <div className="flex items-center gap-2">
                                                        {spec.label}
                                                        {spec.unit && (
                                                            <span className="text-[10px] text-gray-400 font-normal px-1 py-0.5 bg-gray-100 rounded">
                                                                {spec.unit}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                {products.map((product) => (
                                                    <td
                                                        key={`${product.id}-${spec.key}`}
                                                        className={`px-6 py-3 text-sm text-center ${shouldHighlight ? 'text-amber-900 font-medium' : 'text-gray-600'
                                                            }`}
                                                    >
                                                        {spec.format === 'boolean'
                                                            ? renderBooleanValue(getSpecValue(product, spec.key))
                                                            : getSpecValue(product, spec.key) || (
                                                                <IoRemove className="inline-block text-lg text-gray-300" />
                                                            )}
                                                    </td>
                                                ))}
                                                {/* Fill empty cells to maintain grid alignment with header */}
                                                {Array.from({ length: 4 - products.length }).map((_, i) => (
                                                    <td key={`empty-${i}`} className="px-6 py-3"></td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const renderBooleanValue = (value: string | null) => {
    if (value === null)
        return <IoRemove className="inline-block text-lg text-gray-300" />;
    const isTrue =
        value.toLowerCase() === 'yes' || value.toLowerCase() === 'true';
    return isTrue ? (
        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <FaCheck className="text-[10px]" />
            Yes
        </div>
    ) : (
        <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">
            <FaTimes className="text-[10px]" />
            No
        </div>
    );
};

export default ComparisonTable;
