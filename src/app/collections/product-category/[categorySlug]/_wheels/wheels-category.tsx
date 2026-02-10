"use client";
import React from "react";
import ProductCard from "./product-card";
// import Loading from '../../../product/[singleProduct]/loading';
import { TInventoryItem } from "@/types/product";
import { useSearchParams } from "next/navigation";
import { useFilterSync } from "@/hooks/useFilterSync";
import { useTypedSelector } from "@/redux/store";
import { useGetProductsQuery } from "@/redux/apis/product";
import SidebarFilters from "../_filters/mobile-filters/SidebarFilter";
import MobileYmmFilter from "../_filters/mobile-ymm/MobileYmmFilter";
import SortByFilter from "../_filters/SortByFilter";
import ProductCardSkeleton from "../_loading/ProductCardSkeleton";
import NoProductsFound from "../NoProductsFound";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import Item from "@/components/ui/breadcrumb/item";
import { Paginate } from "@/components/shared/Paginate/Paginate";
import WheelFilters from "../_filters/WheelFilters";
import WheelYMMFilters from "../_filters/widgets/wheels/WheelYmmFilter";
type ProductsPageProps = {
  page?: number;
  topDescription?: string;
  bottomDescription?: string;
};
const WheelsCategory: React.FC<ProductsPageProps> = ({
  page = 1,
  topDescription,
  bottomDescription,
}) => {
  const searchParams = useSearchParams();
  const { filters } = useFilterSync();
  const ymm = useTypedSelector((state) => state.yearMakeModel);
  const { data, isLoading: loading } = useGetProductsQuery(filters);
  console.log("filters", filters);
  return (
    <>
      <div className="flex justify-center items-center my-2.5">
        <h1 className="text-[20px] font-semibold">Truck Wheels and Rims</h1>
      </div>
      {topDescription && (
        <div
          className="container mx-auto px-4 my-6 text-center max-w-4xl text-gray-700 leading-relaxed text-sm md:text-base [&>p]:mb-4"
          dangerouslySetInnerHTML={{ __html: topDescription }}
        />
      )}
      <div className="mx-auto flex w-full max-w-[1450px] flex-col gap-6 md:px-4 pb-6 pt-2 md:flex-row">
        <div className="w-full flex flex-row gap-2 justify-between  md:hidden">
          <SidebarFilters>
            <WheelFilters />
          </SidebarFilters>
          <MobileYmmFilter>
            <WheelYMMFilters />
          </MobileYmmFilter>
          <div className="w-full">
            <SortByFilter />
          </div>
        </div>
        <div className="hidden h-full flex-col gap-3 md:flex md:w-[400px]">
          <WheelYMMFilters />
          <WheelFilters />
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
                    <Item href={"/collections/product-category/wheels"}>
                      Wheels
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
                {data?.products.map((products: TInventoryItem[], index) => {
                  const product= products[0];
                  return <div key={product.id} className="max-md:border max-md:border-b max-md:first:border-t max-md:border-t-0 max-md:border-l-0 max-md:border-r-0 max-md:px-2">
                    <ProductCard
                      product={product}
                      bestSeller={index % 4 === 0 || index % 3 === 0}
                    />
                  </div>
                })}
              </div>
              <div className="mt-8 flex w-full flex-row flex-wrap justify-center gap-4">
                <Paginate
                  searchParams={new URLSearchParams(searchParams)}
                  totalPages={data?.pages}
                  categorySlug={"wheels"}
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

export default WheelsCategory;
