'use client';

import { addToComparison, removeFromComparison } from '@/redux/features/comparisonSlice';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import { TInventoryItem } from '@/types/product';
import { RiScalesLine } from 'react-icons/ri';

interface CompareButtonProps {
    product: TInventoryItem;
    variant?: 'default' | 'outline' | 'icon';
}

const CompareButton = ({ product, variant = 'default' }: CompareButtonProps) => {
    const dispatch = useAppDispatch();
    const comparisonProducts = useTypedSelector(
        (state) => state.persisted.comparison.products
    );

    // Check if the product is in comparison
    const isInComparison = comparisonProducts.some((p) => p.id === product.id);

    const handleComparisonToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInComparison) {
            dispatch(removeFromComparison(product.id));
        } else {
            dispatch(addToComparison(product));
        }
    };

    if (variant === 'icon') {
        return (
            <button
                onClick={handleComparisonToggle}
                className={`p-3 rounded-full border transition-all duration-200 cursor-pointer ${isInComparison
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-[#cfcfcf] hover:border-primary hover:text-primary'
                    }`}
                title={isInComparison ? 'Remove from comparison' : 'Add to comparison'}
            >
                <RiScalesLine className="text-xl" />
            </button>
        );
    }

    if (variant === 'outline') {
        return (
            <button
                onClick={handleComparisonToggle}
                className={`flex cursor-pointer items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-200 font-medium ${isInComparison
                    ? 'bg-primary/10 text-primary border-primary'
                    : 'bg-white text-[#212227] border-[#cfcfcf] hover:border-primary hover:text-primary'
                    }`}
            >
                <RiScalesLine className="text-lg" />
                <span>{isInComparison ? 'Remove from comparison' : 'Add to comparison'}</span>
            </button>
        );
    }

    return (
        <button
            onClick={handleComparisonToggle}
            className={`flex cursor-pointer items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 font-medium ${isInComparison
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-[#210203] text-white hover:bg-[#210203]/90'
                }`}
        >
            <RiScalesLine className="text-xl" />
            <span>{isInComparison ? 'Remove from comparison' : 'Add to comparison'}</span>
        </button>
    );
};

export default CompareButton;
