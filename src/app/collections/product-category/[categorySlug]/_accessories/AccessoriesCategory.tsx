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
          className="container mx-auto px-4 my-6 text-center max-w-4xl text-gray-700 leading-relaxed text-sm md:text-base [&>p]:mb-4"
          dangerouslySetInnerHTML={{ __html: topDescription }}
        />
      )}
      <div className="mx-auto flex w-full max-w-[1450px] flex-col gap-6 px-4 py-6 md:flex-row">
        <div className="w-full flex flex-row gap-2 justify-between md:hidden">
          <SidebarFilters>
            <AccessoriesFilters />
          </SidebarFilters>

          <div className="w-full max-w-[165px]">
            <SortByFilter />
          </div>
        </div>
        <div className="hidden h-full flex-col gap-3 md:flex md:w-[400px]">
          {/* <AccessoriesYMMFilters /> */}
          <AccessoriesFilters />
        </div>
        {loading ? (
          <div
            className={
              "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }
          >
            {Array(12)
              .fill(0)
              .map((_, index) => (
                <ProductCardSkeleton key={`product-card-loading-${index}`} />
              ))}
          </div>
        ) : data?.products.length === 0 ? (
          <>
            <NoProductsFound />
          </>
        ) : (
          <>
            <div className="flex w-full flex-col">
              <div className="flex w-full flex-row justify-between">
                <div className="p-2">
                  <Breadcrumb>
                    <Item href={"/"}>Home</Item>
                    <Item href={"/"}>Collections</Item>
                    <Item href={"/collections/product-category/accessories"}>
                      Accessories
                    </Item>
                  </Breadcrumb>
                </div>
                <div className="hidden md:block w-full max-w-[180px]">
                  <SortByFilter />
                </div>
              </div>
              <div
                className={
                  "flex w-full flex-row flex-wrap justify-center gap-8 bg-gray-200 py-6"
                }
              >
                {data?.products.map((products) => {
                  const product = products[0];
                  return <AccessoriesCard product={product} key={product.id} />
                })}
              </div>
              <div className="mt-8 flex w-full flex-row flex-wrap justify-center gap-4">
                <Paginate
                  searchParams={new URLSearchParams(searchParams)}
                  totalPages={data?.pages}
                  categorySlug={"accessories"}
                  page={page}
                />
              </div>
            </div>
          </>
        )}
      </div>
      {bottomDescription && (
        <div
          className="container mx-auto px-4 my-4"
          dangerouslySetInnerHTML={{ __html: bottomDescription }}
        />
      )}
    </>
  );
};

export default AccessoriesCategory;
