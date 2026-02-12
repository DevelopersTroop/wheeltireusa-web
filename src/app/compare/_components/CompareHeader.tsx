'use client';

import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { FaPrint, FaShare, FaTrash } from 'react-icons/fa';
import { TInventoryItem } from '@/types/product';

interface CompareHeaderProps {
    products: TInventoryItem[];
    categoryName: string;
    onPrint: () => void;
    onShare: () => void;
    onClearAll: () => void;
}

const CompareHeader = ({
    products,
    categoryName,
    onPrint,
    onShare,
    onClearAll,
}: CompareHeaderProps) => {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
                <div className="mb-6 print:hidden">
                    <Breadcrumb>
                        <Item href="/">Home</Item>
                        <Item href={`/collections/product-category/${categoryName.toLowerCase()}s`}>
                            {categoryName}s
                        </Item>
                        <Item isEnd={true} href="/compare">
                            Compare
                        </Item>
                    </Breadcrumb>
                </div>

                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <HiOutlineSwitchHorizontal className="text-xl text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#210203]">
                        {categoryName} Comparison
                    </h1>
                </div>
                <p className="text-gray-600">
                    Comparing {products.length}{' '}
                    {products.length === 1 ? categoryName.toLowerCase() : categoryName.toLowerCase() + 's'} • {4 - products.length}{' '}
                    {4 - products.length === 1 ? 'slot' : 'slots'} available
                </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 print:hidden">
                <button
                    onClick={onPrint}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
                >
                    <FaPrint className="text-sm" />
                    <span className="text-sm font-medium">Print</span>
                </button>
                <button
                    onClick={onShare}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
                >
                    <FaShare className="text-sm" />
                    <span className="text-sm font-medium">Share</span>
                </button>
                <button
                    onClick={onClearAll}
                    className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                    <FaTrash className="text-sm" />
                    <span className="font-medium">Clear All</span>
                </button>
            </div>
        </div>
    );
};

export default CompareHeader;
