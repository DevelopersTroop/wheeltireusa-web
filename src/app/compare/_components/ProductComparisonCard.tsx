'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IoClose, IoCheckmark } from 'react-icons/io5';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { TInventoryItem, TTireProduct, TWheelProduct } from '@/types/product';
import { getProductThumbnail } from '@/utils/product';
import { getPrice } from '@/utils/price';

interface ProductComparisonCardProps {
    product: TInventoryItem;
    quantity: number;
    onRemove: (id: number) => void;
    onAddToCart: (product: TInventoryItem, quantity: number) => void;
    onQuantityChange: (id: number, qty: number) => void;
    isBestValue: boolean;
}

const ProductComparisonCard = ({
    product,
    quantity,
    onRemove,
    onAddToCart,
    onQuantityChange,
    isBestValue,
}: ProductComparisonCardProps) => {
    const formatPrice = (p: TInventoryItem) => {
        const price = getPrice(p);
        return price ? `$${price.toFixed(2)}` : 'Contact for Price';
    };

    const calculateTotalPrice = (p: TInventoryItem, q: number) => {
        return p.sellingPrice ? `$${(p.sellingPrice * q).toFixed(2)}` : null;
    };

    const isInStock = (p: TInventoryItem) => true;

    const getProductSize = (p: TInventoryItem) => {
        if (p.category?.slug === 'tire' || p.category?.slug === 'tires') {
            return (p as TTireProduct).tireSize;
        }
        return (p as TWheelProduct).wheelSize;
    };

    return (
        <div className="relative group">
            {/* Remove Button */}
            <button
                onClick={() => onRemove(product.id)}
                className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 z-10 print:hidden"
                title="Remove"
            >
                <IoClose />
            </button>

            {/* Best Value Badge */}
            {isBestValue && (
                <div className="absolute -top-2 left-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full z-10 flex items-center gap-1">
                    <FaStar className="text-[10px]" />
                    Best Value
                </div>
            )}

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/30 transition-all h-full flex flex-col">
                <Link href={`/collections/product/${product.slug}`} className="block">
                    <div className="relative w-[100px] h-[100px] mx-auto mb-3">
                        <Image
                            src={getProductThumbnail(product)}
                            alt={product.title ?? ''}
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>

                <div className="text-center flex-1 flex flex-col">
                    <p className="text-xs text-primary font-semibold uppercase tracking-wide">
                        {product.brand}
                    </p>
                    <Link href={`/collections/product/${product.slug}`}>
                        <h3 className="text-sm font-bold text-[#210203] hover:text-primary transition-colors mt-1 line-clamp-1">
                            {product.title}
                        </h3>
                    </Link>
                    <p className="text-xs text-gray-500 mt-0.5">{getProductSize(product)}</p>

                    {/* Price Section */}
                    <div className="mt-3 space-y-1">
                        <div className="flex items-center justify-center gap-2">
                            <span className="text-lg font-bold text-primary">
                                {formatPrice(product)}
                            </span>
                        </div>
                    </div>

                    {/* Stock Status */}
                    <div
                        className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs font-medium justify-center ${isInStock(product)
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                    >
                        {isInStock(product) ? (
                            <>
                                <IoCheckmark className="text-sm" />
                                In Stock ({product.availableStock})
                            </>
                        ) : (
                            <>
                                <IoClose className="text-sm" />
                                Out of Stock
                            </>
                        )}
                    </div>

                    {/* Quantity Selector & Add to Cart */}
                    <div className="mt-auto pt-4 space-y-2 print:hidden">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <label className="text-xs text-gray-500">Qty:</label>
                            <select
                                value={quantity}
                                onChange={(e) => onQuantityChange(product.id, Number(e.target.value))}
                                className="px-2 py-1 text-sm border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                            >
                                {[1, 2, 4, 6, 8, 10, 12].map((qty) => (
                                    <option key={qty} value={qty}>
                                        {qty}
                                    </option>
                                ))}
                            </select>
                            {calculateTotalPrice(product, quantity) && (
                                <span className="text-sm font-semibold text-gray-600">
                                    = {calculateTotalPrice(product, quantity)}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => onAddToCart(product, quantity)}
                            disabled={!isInStock(product)}
                            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${isInStock(product)
                                    ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-md'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            <FaShoppingCart className="text-sm" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductComparisonCard;
