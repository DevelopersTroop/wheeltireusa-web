"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import TireCard from "./TireCard";
import { useGetProductsQuery } from "@/redux/apis/product";
import { useFilterSync } from "@/hooks/useFilterSync";
import SidebarFilters from "../_filters/mobile-filters/SidebarFilter";
import TireFilters from "../_filters/TireFilters";
import MobileYmmFilter from "../_filters/mobile-ymm/MobileYmmFilter";
import TireYMMFilters from "../_filters/widgets/tire/TireYmmFilter";
import SortByFilter from "../_filters/SortByFilter";
import ProductCardSkeleton from "../_loading/ProductCardSkeleton";
import NoProductsFound from "../NoProductsFound";
import Item from "@/components/ui/breadcrumb/item";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import { Paginate } from "@/components/shared/Paginate/Paginate";

const TireCategory: React.FC<{
  page: number;
  topDescription?: string;
  bottomDescription?: string;
}> = ({ page = 1, topDescription, bottomDescription }) => {
  const searchParams = useSearchParams();
  const { filters } = useFilterSync();
  const { data, isLoading: loading } = useGetProductsQuery(filters);
  return (
    <>
      <div className="flex justify-center items-center my-2.5">
        <h1 className="text-[20px] font-semibold">Aftermarket Truck Tires</h1>
      </div>
      {topDescription && (
        <div
          className="container mx-auto px-4 my-4"
          dangerouslySetInnerHTML={{ __html: topDescription }}
        />
      )}
      <div className="mx-auto flex w-full max-w-[1450px] flex-col gap-6 md:px-4 pb-6 pt-2 md:flex-row">
        <div className="w-full flex flex-row gap-2 justify-between  md:hidden">
          <SidebarFilters>
            <TireFilters />
          </SidebarFilters>

          <MobileYmmFilter>
            <TireYMMFilters />
          </MobileYmmFilter>

          <div className="w-full">
            <SortByFilter />
          </div>
        </div>
        <div className="hidden h-full flex-col gap-3 md:flex md:w-[400px]">
          <TireYMMFilters />
          <TireFilters />
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
        ) : data?.products?.length === 0 ? (
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
                    <Item href={"/collections/product-category/tires"}>
                      Tires
                    </Item>
                  </Breadcrumb>
                </div>
                <div className="hidden md:block w-full max-w-[180px]">
                  <SortByFilter />
                </div>
              </div>
              <div
                className={
                  "flex w-full flex-row flex-wrap justify-center gap-4"
                }
              >
                {data?.products?.map((products) => {
                  const product = products[0];
                  return <div
                    key={product.id}
                    className="max-md:border max-md:border-b max-md:first:border-t max-md:border-t-0 max-md:border-l-0 max-md:border-r-0 max-md:px-2"
                  >
                    <TireCard product={product} key={product.id} /> 
                  </div>
                })}
              </div>

              <div className="mt-8 flex w-full flex-row justify-center">
                <Paginate
                  searchParams={new URLSearchParams(searchParams)}
                  page={page}
                  totalPages={data?.pages}
                  categorySlug={"tires"}
                />
              </div>
            </div>
          </>
        )}
      </div>
      {bottomDescription && (
        <div
          className="container mx-auto px-4 my-6 text-center max-w-4xl text-gray-700 leading-relaxed text-sm md:text-base [&>p]:mb-4"
          dangerouslySetInnerHTML={{ __html: bottomDescription }}
        />
      )}
    </>
  );
};

export default TireCategory;
