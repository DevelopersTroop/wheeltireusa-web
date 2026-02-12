'use client';

import { TInventoryItem } from '@/types/product';
import ProductComparisonCard from './ProductComparisonCard';
import Link from 'next/link';
import { RiScalesLine } from 'react-icons/ri';

interface ProductComparisonHeaderProps {
    products: TInventoryItem[];
    selectedQuantities: Record<number, number>;
    onRemove: (id: number) => void;
    onAddToCart: (product: TInventoryItem, quantity: number) => void;
    onQuantityChange: (id: number, qty: number) => void;
    bestValueId: number | null;
    categorySlug: string;
}

const ProductComparisonHeader = ({
    products,
    selectedQuantities,
    onRemove,
    onAddToCart,
    onQuantityChange,
    bestValueId,
    categorySlug,
}: ProductComparisonHeaderProps) => {
    const slots = Array.from({ length: 4 - products.length });
    const categoryName = categorySlug.startsWith('wheel') ? 'Wheel' : 'Tire';

    return (
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg mb-6 overflow-hidden print:relative print:shadow-none">
            <div className="overflow-x-auto">
                <div
                    className="grid gap-4 p-4 min-w-[900px]"
                    style={{
                        gridTemplateColumns: `200px repeat(4, minmax(180px, 1fr))`,
                    }}
                >
                    <div className="flex flex-col justify-center">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                            Products
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            {products.length} of 4 selected
                        </p>
                    </div>

                    {products.map((product) => (
                        <ProductComparisonCard
                            key={product.id}
                            product={product}
                            quantity={selectedQuantities[product.id] || 4}
                            onRemove={onRemove}
                            onAddToCart={onAddToCart}
                            onQuantityChange={onQuantityChange}
                            isBestValue={bestValueId === product.id && products.length >= 2}
                        />
                    ))}

                    {slots.map((_, index) => (
                        <Link
                            key={`empty-${index}`}
                            href={`/collections/product-category/${categorySlug}`}
                            className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all group print:hidden"
                        >
                            <RiScalesLine className="text-3xl text-gray-300 group-hover:text-primary transition-colors mb-2" />
                            <p className="text-sm text-gray-400 group-hover:text-primary transition-colors">
                                Add {categoryName}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductComparisonHeader;
