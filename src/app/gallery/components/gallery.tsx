"use client";
import { useGetGalleriesQuery } from "@/redux/apis/gallery";
import { useTypedSelector } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import React from "react";
import { BlogPagination } from "../../blog/_components/pagination";
import { useFilterSync } from "@/hooks/useFilterSync";
import ProductCardSkeleton from "./product-card-skeleton";
import NoProductsFound from "@/app/collections/product-category/[categorySlug]/NoProductsFound";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import Item from "@/components/ui/breadcrumb/item";
import ProductCard from "./product-card";
import { wrapWheelFilters } from "@/hooks/wheelService";


const Gallery: React.FC = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const { filters } = useFilterSync();
  const ymm = useTypedSelector((state) => state.yearMakeModel);
  const { category, ...parsedFilter } = wrapWheelFilters(
    filters,
    1,
    filters["vehicle"] ? ymm.vehicleInformation : {}
  );
  const { data, isLoading } = useGetGalleriesQuery(parsedFilter);
  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {Array.from({ length: 12 }).map((_, id) => (
            <ProductCardSkeleton key={id} />
          ))}
        </div>
      ) : !isLoading && data?.galleries.length === 0 ? (
        <>
          <NoProductsFound />
        </>
      ) : (
        <>
          <div className="w-full flex-col">
            <div className="w-full flex flex-row flex-wrap">
              <div className="p-2">
                <Breadcrumb>
                  <Item href={"/"}>Home</Item>
                  <Item href={"/gallery"}>Gallery</Item>
                </Breadcrumb>
              </div>
              {/* <GalleryTopFilter /> */}
            </div>
            <div className="w-full flex flex-row flex-wrap gap-5 p-4 justify-center">
              {data?.galleries.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
            {data?.pages && (
              <BlogPagination page={Number(page)} pages={data?.pages} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Gallery;
