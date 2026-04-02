"use client";
import { Paginate } from "@/components/shared/Paginate/Paginate";
import { useSearchParams } from "next/navigation";
import React from "react";
import AccessoriesFilters from "../_filters/AccessoriesFilters";
import { useGetProductsQuery } from "@/redux/apis/product";
import Item from "@/components/ui/breadcrumb/item";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import { useFilterSync } from "@/hooks/useFilterSync";
import SidebarFilters from "../_filters/mobile-filters/SidebarFilter";
import SortByFilter from "../_filters/SortByFilter";
import ProductCardSkeleton from "../_loading/ProductCardSkeleton";
import NoProductsFound from "../NoProductsFound";
import AccessoriesCard from "./AccessoriesCard";
import Container from "@/components/ui/container/container";
import { cn } from "@/lib/utils";
import HomeFilter from "@/app/(home)/_components/HeroSection/components/HomeFilter/HomeFilter";

type ProductsPageProps = {
  page?: number;
  topDescription?: string;
  bottomDescription?: string;
};

const AccessoriesCategory: React.FC<ProductsPageProps> = ({
  page = 1,
  topDescription,
  bottomDescription,
}) => {
  const searchParams = useSearchParams();
  const { filters } = useFilterSync();
  const { data, isLoading: loading } = useGetProductsQuery(filters);

  return (
    <>
      {topDescription && (
        <div
          className="container mx-auto px-3 sm:px-4 my-4 sm:my-6 text-center max-w-4xl text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base [&>p]:mb-3 sm:[&>p]:mb-4"
          dangerouslySetInnerHTML={{ __html: topDescription }}
        />
      )}

      <HomeFilter variant="product" />

      <Container className="flex w-full flex-col gap-4 sm:gap-6 px-3 sm:px-4 pb-4 sm:pb-6 pt-2 lg:flex-row">
        {/* Mobile Filters Header */}
        <div className="flex w-full flex-row gap-2 justify-between lg:hidden sticky top-16 z-20 bg-white py-2">
          <SidebarFilters>
            <AccessoriesFilters />
          </SidebarFilters>
          <div className="w-full max-w-[140px] sm:max-w-[180px]">
            <SortByFilter />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:w-[280px] xl:w-[320px] 2xl:w-[400px] h-full flex-col gap-3 shrink-0">
          <AccessoriesFilters />
        </aside>

        {/* Products Section */}
        {loading ? (
          <div className="grid w-full grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4">
            {Array(12)
              .fill(0)
              .map((_, index) => (
                <ProductCardSkeleton key={`product-card-loading-${index}`} />
              ))}
          </div>
        ) : data?.products.length === 0 ? (
          <div className="w-full">
            <NoProductsFound />
          </div>
        ) : (
          <div className="flex w-full flex-col">
            {/* Header with Breadcrumb & Sort */}
            <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4 px-2">
              <div className="w-full overflow-hidden">
                <Breadcrumb>
                  <Item href={"/"}>Home</Item>
                  <Item href={"/"}>Collections</Item>
                  <Item href={"/collections/product-category/accessories"}>
                    Accessories
                  </Item>
                </Breadcrumb>
              </div>
              <div className="w-[120px] sm:w-[160px] lg:w-[180px] shrink-0">
                <SortByFilter />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4">
              {data?.products.map((products) => {
                const product = products[0];
                return <AccessoriesCard product={product} key={product.id} />
              })}
            </div>

            {/* Pagination */}
            <div className="mt-6 sm:mt-8 flex w-full justify-center">
              <Paginate
                searchParams={new URLSearchParams(searchParams)}
                totalPages={data?.pages}
                categorySlug={"accessories"}
                page={page}
              />
            </div>
          </div>
        )}
      </Container>

      {bottomDescription && (
        <div
          className="container mx-auto px-3 sm:px-4 my-4 sm:my-6 text-center max-w-4xl text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base [&>p]:mb-3 sm:[&>p]:mb-4"
          dangerouslySetInnerHTML={{ __html: bottomDescription }}
        />
      )}
    </>
  );
};

export default AccessoriesCategory;
