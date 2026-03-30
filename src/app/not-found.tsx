'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, Circle, Cog } from 'lucide-react';

const NotFound = () => {
  // Stagger children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Floating animation for decorative icons
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  const floatingVariants2 = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2.3,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Subtle animated gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, hsl(15 99% 47%) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative floating icons - minimal */}
        <div className="absolute -top-12 left-0 opacity-20">
          <motion.div
            variants={floatingVariants}
            animate="animate"
          >
            <Cog className="w-12 h-12 text-primary" />
          </motion.div>
        </div>
        <div className="absolute top-20 -right-8 opacity-20">
          <motion.div
            variants={floatingVariants2}
            animate="animate"
          >
            <Circle className="w-8 h-8 text-primary" strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* Large 404 */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.h1
            className="text-[120px] md:text-[160px] font-bold text-foreground leading-none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 20,
            }}
          >
            404
          </motion.h1>
          <motion.div
            className="h-1.5 bg-primary rounded-full mx-auto mt-2"
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          />
        </motion.div>

        {/* Message */}
        <motion.div variants={itemVariants} className="space-y-3 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-base text-muted-foreground mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/" className="w-full sm:w-auto">
            <motion.button
              className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold shadow-sm hover:shadow-md transition-shadow flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Home size={18} />
              Go Home
            </motion.button>
          </Link>

          <Link href="/collections/product-category/tires" className="w-full sm:w-auto">
            <motion.button
              className="w-full sm:w-auto px-6 py-3 border-2 border-primary text-primary rounded-md font-semibold hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Circle size={18} strokeWidth={2} />
              Browse Tires
            </motion.button>
          </Link>

          <motion.button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 text-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft size={18} />
            Go Back
          </motion.button>
        </motion.div>

        {/* Quick links */}
        <motion.div variants={itemVariants} className="mt-10 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">Quick links:</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
            <Link
              href="/collections/product-category/wheels"
              className="text-primary hover:underline transition-colors"
            >
              Wheels
            </Link>
            <span className="text-border">•</span>
            <Link
              href="/collections/product-category/tires"
              className="text-primary hover:underline transition-colors"
            >
              Tires
            </Link>
            <span className="text-border">•</span>
            <Link
              href="/compare"
              className="text-primary hover:underline transition-colors"
            >
              Compare
            </Link>
            <span className="text-border">•</span>
            <Link
              href="/contact"
              className="text-primary hover:underline transition-colors"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
