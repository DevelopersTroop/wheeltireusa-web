import { normalizeImageUrl } from "@/utils/url";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogPageSidebarSkeleton } from "./sidebar-skeleton";
import { TInventoryItem } from "@/types/product";

export const BlogPageSidebar: React.FC<{
  relatedProducts?: TInventoryItem[];
  isLoading: boolean;
}> = ({ relatedProducts, isLoading }) => {
  return (
    <div className="flex flex-col gap-y-4 lg:sticky lg:top-24">
      {/* Related Products section */}
      {(isLoading || (relatedProducts && relatedProducts.length > 0)) && (
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
          {/* Section header */}
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent">
            <ShoppingBag size={17} className="text-primary" />
            <h2 className="text-base font-bold text-gray-900">Related Products</h2>
          </div>

          {isLoading ? (
            <div className="p-4">
              <BlogPageSidebarSkeleton />
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-gray-50">
              {relatedProducts?.map((product, i) => (
                <Link key={i} href={`/wheels/${product.slug}`} className="group block">
                  <div className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                      <Image
                        objectFit="contain"
                        fill
                        src={normalizeImageUrl(product?.itemImage!)}
                        alt={product?.title || ""}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">
                        {product.title}
                      </h3>
                    </div>
                    <ArrowRight
                      size={16}
                      className="shrink-0 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
