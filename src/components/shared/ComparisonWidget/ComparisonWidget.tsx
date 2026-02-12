'use client';

import {
  clearComparison,
  removeFromComparison,
  setComparisonDrawerOpen,
} from '@/redux/features/comparisonSlice';
import { addToCart } from '@/redux/features/cartSlice';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import { getProductThumbnail } from '@/utils/product';
import { TInventoryItem, TTireProduct, TWheelProduct } from '@/types/product';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoClose, IoCheckmark } from 'react-icons/io5';
import { RiScalesLine } from 'react-icons/ri';
import {
  FaChevronDown,
  FaChevronUp,
  FaTrash,
  FaShoppingCart,
  FaExternalLinkAlt,
  FaArrowRight,
} from 'react-icons/fa';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { toast } from 'sonner';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { getPrice } from '@/utils/price';

const ComparisonWidget = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { products, isComparisonDrawerOpen } = useTypedSelector(
    (state) => state.persisted.comparison
  );
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activePreview, setActivePreview] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-close drawer when pathname changes (user navigates to another page)
  useEffect(() => {
    if (isComparisonDrawerOpen && pathname !== '/compare') {
      // Small delay to allow any click animations to complete
      const timer = setTimeout(() => {
        dispatch(setComparisonDrawerOpen(false));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Don't render on server or if no products
  if (!isMounted || products.length === 0) {
    return null;
  }

  const handleRemove = (productId: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    dispatch(removeFromComparison(productId));
  };

  const handleClearAll = () => {
    dispatch(clearComparison());
  };

  const handleClose = () => {
    dispatch(setComparisonDrawerOpen(false));
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleAddToCart = (product: TInventoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        ...product,
        cartPackage: `tire-${product.id}-${Date.now()}`,
        quantity: 4,
        cartSerial: '',
      })
    );
    toast.success('Added to cart', {
      description: `Set of 4 ${product.brand} ${product.model} added to cart.`,
    });
  };

  // Navigate and close drawer
  const handleNavigate = (href: string) => {
    dispatch(setComparisonDrawerOpen(false));
    router.push(href);
  };

  const formatPrice = (product: TInventoryItem) => {
    const price = getPrice(product);
    if (price) {
      return `$${price.toFixed(2)}`;
    }
    return 'Contact';
  };

  const calculateSetPrice = (product: TInventoryItem) => {
    const price = getPrice(product);
    if (price) {
      return `$${(price * 4).toFixed(2)}`;
    }
    return null;
  };

  const isInStock = (product: TInventoryItem) => {
    return true;
  };

  const getProgressWidth = () => {
    return `${(products.length / 4) * 100}%`;
  };

  // Animation variants with proper typing
  const floatingButtonVariants: Variants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 260, damping: 20 },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
    hover: {
      scale: 1.05,
      transition: { type: 'spring' as const, stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const drawerVariants: Variants = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      },
    },
    exit: {
      y: '100%',
      opacity: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const productCardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  const emptySlotVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  // When drawer is closed, show floating button
  if (!isComparisonDrawerOpen) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial="initial"
          animate="animate"
          exit="exit"
          key="floating-button"
        >
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 bg-primary rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.button
            onClick={() => dispatch(setComparisonDrawerOpen(true))}
            className="relative flex items-center gap-3 bg-linear-to-r from-primary to-primary/80 text-white px-5 py-3.5 rounded-full shadow-xl border border-white/20"
            variants={floatingButtonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <div className="relative">
              <RiScalesLine className="text-2xl" />
              <motion.span
                className="absolute -top-2 -right-2 bg-white text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' as const, delay: 0.2 }}
              >
                {products.length}
              </motion.span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold text-sm">Compare</span>
              <span className="text-xs opacity-80">
                {products.length} of 4 {products[0]?.category?.slug?.startsWith('tire') ? 'tires' : products[0]?.category?.slug?.startsWith('wheel') ? 'wheels' : 'products'}
              </span>
            </div>
            <FaChevronUp className="text-sm opacity-60" />
          </motion.button>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="comparison-drawer"
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-[#e0e0e0] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] ${isMinimized ? 'max-h-16' : 'max-h-[85vh]'
          }`}
        variants={drawerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-primary to-primary/70"
            initial={{ width: 0 }}
            animate={{ width: getProgressWidth() }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eee]">
          <div className="flex items-center gap-4">
            <motion.div
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' as const, delay: 0.1 }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-linear-to-br from-primary/20 to-primary/10 rounded-xl">
                <RiScalesLine className="text-2xl text-primary" />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {products.length}
              </span>
            </motion.div>
            <div>
              <h3 className="font-bold text-lg text-[#210203]">
                {products[0]?.category?.slug?.startsWith('tire')
                  ? 'Tire Comparison'
                  : products[0]?.category?.slug?.startsWith('wheel')
                    ? 'Wheel Comparison'
                    : 'Product Comparison'}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{products.length} of 4 products selected</span>
                <span className="text-gray-300">•</span>
                {products.length >= 2 ? (
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <IoCheckmark /> Ready to compare
                  </span>
                ) : (
                  <span className="text-amber-600">
                    Add {2 - products.length} more to compare
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Price Summary */}
            {products.length >= 2 && !isMinimized && (
              <motion.div
                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-100"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-sm text-gray-500">Price range:</span>
                <span className="font-bold text-primary">
                  {(() => {
                    const prices = products
                      .map((p) => getPrice(p))
                      .filter(
                        (p): p is number => p !== null && p !== undefined
                      );
                    if (prices.length === 0) return 'N/A';
                    const min = Math.min(...prices);
                    const max = Math.max(...prices);
                    return min === max
                      ? `$${min.toFixed(2)}`
                      : `$${min.toFixed(2)} - $${max.toFixed(2)}`;
                  })()}
                </span>
              </motion.div>
            )}

            <motion.button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-2.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 border border-transparent hover:border-red-100"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaTrash className="text-sm" />
              <span className="text-sm font-medium hidden sm:inline">
                Clear
              </span>
            </motion.button>

            <div className="flex items-center gap-1 border-l border-gray-200 pl-3 ml-1">
              <motion.button
                onClick={toggleMinimize}
                className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                title={isMinimized ? 'Expand' : 'Minimize'}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: isMinimized ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaChevronDown />
                </motion.div>
              </motion.button>
              <motion.button
                onClick={handleClose}
                className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                title="Close"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoClose className="text-xl" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {!isMinimized && (
            <motion.div
              className="px-6 py-5 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="flex items-stretch gap-4 overflow-x-auto pb-3 scroll-smooth">
                <AnimatePresence mode="popLayout">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      className={`relative shrink-0 w-[260px] bg-white border border-[#e8e8e8] rounded-2xl overflow-hidden group hover:border-primary/40 hover:shadow-xl transition-shadow ${activePreview === product.id
                        ? 'ring-2 ring-primary'
                        : ''
                        }`}
                      variants={productCardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      transition={{
                        delay: index * 0.08,
                        type: 'spring' as const,
                        stiffness: 300,
                        damping: 24,
                      }}
                      onMouseEnter={() => setActivePreview(product.id)}
                      onMouseLeave={() => setActivePreview(null)}
                    >
                      {/* Remove button */}
                      <motion.button
                        onClick={(e) => handleRemove(product.id, e)}
                        className="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm text-gray-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white shadow-md z-10"
                        title="Remove from comparison"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IoClose className="text-base" />
                      </motion.button>

                      {/* Product Number Badge */}
                      <div className="absolute top-3 left-3 w-7 h-7 bg-primary/90 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                        {index + 1}
                      </div>

                      {/* Stock Badge */}
                      <div
                        className={`absolute top-3 left-12 px-2 py-0.5 rounded-full text-xs font-medium z-10 ${isInStock(product)
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {isInStock(product) ? 'In Stock' : 'Out of Stock'}
                      </div>

                      {/* Product Image - Click to navigate and close */}
                      <button
                        onClick={() =>
                          handleNavigate(`/collections/product/${product.slug}`)
                        }
                        className="w-full cursor-pointer"
                      >
                        <div className="relative w-full h-[130px] bg-linear-to-b from-gray-50 to-white flex items-center justify-center p-4">
                          <Image
                            src={getProductThumbnail(product)}
                            alt={product.title ?? ''}
                            width={100}
                            height={100}
                            className="object-contain hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </button>

                      {/* Product Info */}
                      <div className="p-4 space-y-3 border-t border-gray-100">
                        <div>
                          <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-1">
                            {product.brand}
                          </p>
                          <button
                            onClick={() =>
                              handleNavigate(
                                `/collections/product/${product.slug}`
                              )
                            }
                            className="text-left w-full"
                          >
                            <h4 className="text-base font-bold text-[#210203] line-clamp-1 hover:text-primary transition-colors cursor-pointer">
                              {product.title}
                            </h4>
                          </button>
                          <p className="text-sm text-gray-400 mt-0.5">
                            {products[0]?.category?.slug?.startsWith('tire')
                              ? (product as TTireProduct).tireSize
                              : (product as TWheelProduct).wheelSize}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-xs text-gray-400 uppercase">
                              Per tire
                            </p>
                            <p className="text-xl font-bold text-primary">
                              {formatPrice(product)}
                            </p>
                          </div>
                          {calculateSetPrice(product) && (
                            <div className="text-right">
                              <p className="text-xs text-gray-400">Set of 4</p>
                              <p className="text-sm font-semibold text-gray-700">
                                {calculateSetPrice(product)}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-2 pt-2">
                          <motion.button
                            onClick={(e) => handleAddToCart(product, e)}
                            disabled={!isInStock(product)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isInStock(product)
                              ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-md'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              }`}
                            whileHover={
                              isInStock(product) ? { scale: 1.02 } : {}
                            }
                            whileTap={isInStock(product) ? { scale: 0.98 } : {}}
                          >
                            <FaShoppingCart className="text-xs" />
                            Add to cart
                          </motion.button>
                          <motion.button
                            onClick={() =>
                              handleNavigate(
                                `/collections/product/${product.slug}`
                              )
                            }
                            className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                            title="View Product"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaExternalLinkAlt className="text-xs text-gray-500" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Empty slots with enhanced design */}
                {Array.from({ length: 4 - products.length }).map((_, index) => (
                  <motion.button
                    key={`empty-${index}`}
                    onClick={() =>
                      handleNavigate(`/collections/product-category/${products[0]?.category?.slug === 'wheels' ? 'wheels' : 'tires'}`)
                    }
                    className="shrink-0 w-[260px] h-[320px] bg-linear-to-b from-gray-50 to-white border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group cursor-pointer"
                    variants={emptySlotVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      delay: (products.length + index) * 0.08,
                      type: 'spring' as const,
                      stiffness: 300,
                      damping: 24,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center mb-4 transition-colors"
                      whileHover={{ rotate: 10 }}
                    >
                      <RiScalesLine className="text-3xl text-gray-300 group-hover:text-primary transition-colors" />
                    </motion.div>
                    <p className="text-sm font-medium text-gray-400 group-hover:text-primary transition-colors">
                      Add {products[0]?.category?.slug?.startsWith('tire') ? 'Tire' : 'Wheel'} {products.length + index + 1}
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      Click to browse
                    </p>
                  </motion.button>
                ))}
              </div>

              {/* Bottom Info Bar */}
              <motion.div
                className="mt-4 flex items-center justify-center md:justify-between text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="hidden md:flex items-center gap-4 text-gray-500">
                  {products.length < 2 && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-lg text-amber-700 border border-amber-100">
                      <span className="font-medium">
                        Add {2 - products.length} more{' '}
                        {(() => {
                          const category = products[0]?.category?.slug;
                          if (category?.startsWith('tire')) return 2 - products.length === 1 ? 'tire' : 'tires';
                          if (category?.startsWith('wheel')) return 2 - products.length === 1 ? 'wheel' : 'wheels';
                          return 'products';
                        })()}{' '}
                        to unlock comparison
                      </span>
                    </div>
                  )}
                  {products.length >= 2 && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg text-green-700 border border-green-100">
                      <IoCheckmark className="text-lg" />
                      <span className="font-medium">
                        Ready! Click &quot;Full Comparison&quot; to see detailed
                        specs
                      </span>
                    </div>
                  )}
                </div>

                <div className="hidden md:flex items-center gap-3 text-gray-400">
                  <span className="text-xs">
                    Tip: Click product image to view details
                  </span>
                </div>
                {products.length >= 2 && (
                  <motion.button
                    onClick={() => handleNavigate('/compare')}
                    className="flex items-center gap-2 bg-linear-to-r from-primary to-primary/90 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HiOutlineSwitchHorizontal className="text-lg" />
                    <span>Full Comparison</span>
                    <FaArrowRight className="text-sm opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default ComparisonWidget;
