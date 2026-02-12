'use client';

import { useState, useMemo } from 'react';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import {
  clearComparison,
  removeFromComparison
} from '@/redux/features/comparisonSlice';
import { addToCart } from '@/redux/features/cartSlice';
import { TInventoryItem } from '@/types/product';
import { useCartHook } from '@/hooks/useCartHook';
import { toast } from 'sonner';
import { RiScalesLine } from 'react-icons/ri';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

// Sub-components
import CompareHeader from './CompareHeader';
import CompareStats from './CompareStats';
import CompareFilters from './CompareFilters';
import ProductComparisonHeader from './ProductComparisonHeader';
import ComparisonTable from './ComparisonTable';

// Configs & Helpers
import {
  tireComparisonCategories,
  wheelComparisonCategories,
  checkDifference,
  checkSimilarity,
  getSpecValue,
  ViewMode
} from './comparison-configs';

const ComparePage = () => {
  const dispatch = useAppDispatch();
  const { products } = useTypedSelector((state) => state.persisted.comparison);
  const { setOpen } = useCartHook();

  // UI State
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // Determine category and config
  const categorySlug = products[0]?.category?.slug === 'wheels' ? 'wheels' : 'tires';
  const categoryName = categorySlug === 'wheels' ? 'Wheel' : 'Tire';
  const comparisonCategories = categorySlug === 'wheels' ? wheelComparisonCategories : tireComparisonCategories;

  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    comparisonCategories.map((c) => c.name)
  );

  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 4 }), {})
  );

  // Handlers
  const handleRemove = (productId: number) => {
    dispatch(removeFromComparison(productId));
  };

  const handleClearAll = () => {
    dispatch(clearComparison());
  };

  const handleAddToCart = (product: TInventoryItem, quantity: number) => {
    dispatch(
      addToCart({
        ...product,
        cartPackage: `tire-${product.id}-${Date.now()}`,
        quantity,
        cartSerial: '',
      })
    );
    toast.success('Added to cart', {
      description: `${quantity}x ${product.brand} ${product.model} added to cart.`,
    });
    setOpen();
  };

  const handlePrint = () => window.print();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${categoryName} Comparison - Wheel Tire USA`,
        text: `Comparing ${products.map((p) => `${p.brand} ${p.model}`).join(', ')}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied!', {
        description: 'Comparison link has been copied to clipboard.',
      });
    }
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const expandAll = () => setExpandedCategories(comparisonCategories.map((c) => c.name));
  const collapseAll = () => setExpandedCategories([]);

  // Calculate comparison stats
  const stats = useMemo(() => {
    let totalSpecs = 0;
    let differences = 0;
    let similarities = 0;

    comparisonCategories.forEach((category) => {
      category.specs.forEach((spec) => {
        const hasAnyValue = products.some(
          (p) => getSpecValue(p, spec.key) !== null
        );
        if (hasAnyValue && products.length >= 2) {
          totalSpecs++;
          if (checkDifference(products, spec.key)) {
            differences++;
          } else if (checkSimilarity(products, spec.key)) {
            similarities++;
          }
        }
      });
    });

    return { totalSpecs, differences, similarities };
  }, [products, comparisonCategories]);

  // Find best value (lowest price)
  const bestValueProductId = useMemo(() => {
    const productsWithPrice = products.filter((p) => p.sellingPrice !== null);
    if (productsWithPrice.length === 0) return null;
    return productsWithPrice.reduce((best, current) => {
      const bestPrice = best.sellingPrice ?? Infinity;
      const currentPrice = current.sellingPrice ?? Infinity;
      return currentPrice < bestPrice ? current : best;
    }).id;
  }, [products]);

  // Empty state
  if (products.length === 0) {
    return (
      <div className="container mx-auto w-full px-4 py-16">
        <div className="max-w-5xl mx-auto w-full text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-150" />
            <div className="relative w-28 h-28 bg-linear-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-8">
              <RiScalesLine className="text-6xl text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-[#210203] mb-4">
            No Products to Compare
          </h1>
          <p className="text-gray-600 mb-8 text-lg max-w-3xl mx-auto">
            Add products to your comparison list to see them side by side. You
            can compare up to 4 products at once to find your perfect match.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/collections/product-category/tires"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
            >
              <FaArrowLeft />
              Browse Tires
            </Link>
            <Link
              href="/collections/product-category/wheels"
              className="inline-flex items-center gap-2 bg-[#212227] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#212227]/90 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
            >
              Browse Wheels
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-32 print:pb-8">
      <CompareHeader
        products={products}
        categoryName={categoryName}
        onPrint={handlePrint}
        onShare={handleShare}
        onClearAll={handleClearAll}
      />

      {products.length >= 2 && (
        <CompareStats
          totalSpecs={stats.totalSpecs}
          differences={stats.differences}
          similarities={stats.similarities}
        />
      )}

      <CompareFilters
        viewMode={viewMode}
        setViewMode={setViewMode}
        highlightDifferences={highlightDifferences}
        setHighlightDifferences={setHighlightDifferences}
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
      />

      <ProductComparisonHeader
        products={products}
        selectedQuantities={selectedQuantities}
        onRemove={handleRemove}
        onAddToCart={handleAddToCart}
        onQuantityChange={(id, qty) => setSelectedQuantities(prev => ({ ...prev, [id]: qty }))}
        bestValueId={bestValueProductId}
        categorySlug={categorySlug}
      />

      <ComparisonTable
        products={products}
        categories={comparisonCategories}
        viewMode={viewMode}
        highlightDifferences={highlightDifferences}
        expandedCategories={expandedCategories}
        onToggleCategory={toggleCategory}
      />
    </div>
  );
};

export default ComparePage;
