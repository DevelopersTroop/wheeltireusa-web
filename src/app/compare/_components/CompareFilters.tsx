'use client';

import { ViewMode } from './comparison-configs';

interface CompareFiltersProps {
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    highlightDifferences: boolean;
    setHighlightDifferences: (highlight: boolean) => void;
    onExpandAll: () => void;
    onCollapseAll: () => void;
}

const CompareFilters = ({
    viewMode,
    setViewMode,
    highlightDifferences,
    setHighlightDifferences,
    onExpandAll,
    onCollapseAll,
}: CompareFiltersProps) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-xl print:hidden">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 p-1 bg-white rounded-lg border border-gray-200">
                    <button
                        onClick={() => setViewMode('all')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'all'
                            ? 'bg-primary text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        All Specs
                    </button>
                    <button
                        onClick={() => setViewMode('differences')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'differences'
                            ? 'bg-amber-500 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Differences Only
                    </button>
                    <button
                        onClick={() => setViewMode('similarities')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'similarities'
                            ? 'bg-green-500 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Similarities
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={highlightDifferences}
                        onChange={(e) => setHighlightDifferences(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">
                        Highlight Differences
                    </span>
                </label>
                <div className="border-l border-gray-300 pl-4 flex items-center gap-2">
                    <button
                        onClick={onExpandAll}
                        className="text-sm text-primary hover:underline"
                    >
                        Expand All
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                        onClick={onCollapseAll}
                        className="text-sm text-primary hover:underline"
                    >
                        Collapse All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompareFilters;
