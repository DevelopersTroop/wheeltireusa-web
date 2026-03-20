"use client";
import { Paginate } from "@/components/shared/Paginate/Paginate";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import Item from "@/components/ui/breadcrumb/item";
import { useFilterSync } from "@/hooks/useFilterSync";
import { useGetProductsQuery } from "@/redux/apis/product";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductCategoryLoading from "../../_components/_loading";
import SidebarFilters from "../_filters/mobile-filters/SidebarFilter";
import SortByFilter from "../_filters/SortByFilter";
import TireFilters from "../_filters/TireFilters";
import NoProductsFound from "../NoProductsFound";
import TireCard from "./TireCard";
import TireCardList from "./TireCardList";
import ViewToggle from "@/components/shared/ViewToggle/ViewToggle";
import { useSelector } from "react-redux";
import { RootState, useTypedSelector } from "@/redux/store";
import Container from "@/components/ui/container/container";
import { cn } from "@/lib/utils";
import HomeYmm from "@/app/(home)/_components/HeroSection/components/HomeYmm/HomeYmm";

const TireCategory: React.FC<{
  page: number;
  topDescription?: string;
  bottomDescription?: string;
}> = ({ page = 1, topDescription, bottomDescription }) => {
  const searchParams = useSearchParams();
  const { filters } = useFilterSync();
  const vehicleInformation = useTypedSelector((state) => state.persisted.yearMakeModel.vehicleInformation);
  const activeGarageId = useTypedSelector((state) => state.persisted.yearMakeModel.activeGarageId);
  const [ymmFilters, setYmmFilters] = useState<
    { tireSize: string; loadIndex: string; maxSpeedMPH: string }[]
  >([]);
  useEffect(() => {
    if(vehicleInformation?.boltPattern && activeGarageId) {
      const recommendations = vehicleInformation.tire_fitment?.recommendations ?? {};
      const ymmFilterData: { tireSize: string; loadIndex: string; maxSpeedMPH: string }[] = [];
      const seen = new Set<string>();

      const addItems = (node: unknown) => {
        if (!Array.isArray(node)) return;
        for (const item of node) {
          if (!item || typeof item !== 'object') continue;
          const record = item as Record<string, unknown>;
          const tireSize = String(record.tireSize ?? '').trim();
          const loadIndex = String(record.tireMaxLoadRating ?? '').trim();
          const maxSpeedMPH = String(record.maxTireSpeedMPH ?? '').trim();
          if (!tireSize || !loadIndex || !maxSpeedMPH) continue;
          const key = `${tireSize}|${loadIndex}|${maxSpeedMPH}`;
          if (seen.has(key)) continue;
          seen.add(key);
          ymmFilterData.push({ tireSize, loadIndex, maxSpeedMPH });
        }
      };

      const visitGuaranteed = (node: unknown) => {
        if (!node || typeof node !== 'object') return;
        const record = node as Record<string, unknown>;
        for (const [key, value] of Object.entries(record)) {
          if (key === 'Guaranteed') {
            addItems(value);
          } else if (value && typeof value === 'object') {
            visitGuaranteed(value);
          }
        }
      };

      visitGuaranteed(recommendations);
      setYmmFilters(ymmFilterData);
    } else {
      setYmmFilters([]);
    }
  }, [vehicleInformation])

  
  const { data, isLoading: loading } = useGetProductsQuery({
    ...filters,
    category: 'tire',
    ...(ymmFilters.length > 0 ? {ymmFilter: ymmFilters} : {}),
  }, { refetchOnMountOrArgChange: true });
  const viewType = useSelector((state: RootState) => state.persisted.layout.viewType);
  return (
    <>
      {/* <div className="flex justify-center items-center">
        <h1 className="text-[20px] mt-2 font-semibold">Aftermarket Truck Tires</h1>
      </div> */}
      {topDescription && (
        <div
          className="container mx-auto px-4 my-4"
          dangerouslySetInnerHTML={{ __html: topDescription }}
        />
      )}
      <HomeYmm variant="product" />
      <Container className={
        cn(
          "flex w-full flex-col gap-6 md:px-4 pb-6 pt-2 md:flex-row",
          viewType === "grid" ? "" : "max-w-[1450px]"
        )
      }>
        <div className="w-full flex flex-row gap-2 justify-between  md:hidden">
          <SidebarFilters>
            <TireFilters />
          </SidebarFilters>

          <div className="w-full">
            <SortByFilter />
          </div>
        </div>
        <div className="hidden h-full flex-col gap-3 md:flex md:w-[400px]">
          <TireFilters />
        </div>
        {loading ? <ProductCategoryLoading /> : data?.products?.length === 0 ? (
          <>
            <NoProductsFound />
          </>
        ) : (
          <>
            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full flex-row justify-between items-center mb-4">
                <div className="p-2">
                  <Breadcrumb>
                    <Item href={"/"}>Home</Item>
                    <Item href={"/"}>Collections</Item>
                    <Item href={"/collections/product-category/tires"}>
                      Tires
                    </Item>
                  </Breadcrumb>
                </div>
                {/* Mobile View Toggle */}
                <div className="md:hidden pr-2">
                  <ViewToggle />
                </div>
                {/* Desktop View Toggle & Sort */}
                <div className="hidden md:flex w-full max-w-[240px] gap-2 items-center justify-end">
                  <ViewToggle />
                  <div className="w-[180px]">
                    <SortByFilter />
                  </div>
                </div>
              </div>
              <div
                className={
                  viewType === "grid"
                    ? "grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
                    : "flex w-full flex-col gap-4"
                }
              >
                {data?.products?.map((products) => {
                  const product = products[0];
                  return <div key={product.id}>
                    {viewType === "grid" ? (
                      <TireCard product={product} key={`grid-${product.id}`} />
                    ) : (
                      <TireCardList product={product} key={`list-${product.id}`} />
                    )}
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
      </Container>
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
