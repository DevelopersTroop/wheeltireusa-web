'use client';
// Import necessary types and components
import { TInventoryItem } from '@/types/product';

import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger,
  TouchProvider,
} from '@/components/ui/hybrid-tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BsQuestionCircleFill } from 'react-icons/bs';

// Component to display in-stock wheel details
const TireDetailsSpecifications = ({
  product,
}: {
  product: TInventoryItem[];
}) => {
  return (
    <>
      {/* Main container for the in-stock wheel details */}
      <div className=" bg-[#F7F7F7]">
        {/* Specification details */}
        <div className="relative flex w-full flex-wrap items-start gap-2 self-stretch">
          {/* Individual specification item */}

          <div className="flex w-full flex-col sm:flex-row gap-3">
            <div className="w-full flex flex-row gap-3">
              <div className="w-full relative flex  flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                <div className="relative flex items-center gap-1">
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-xs font-normal text-[#504949]">
                      Size
                    </span>
                  </small>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="line-clamp-1 text-base font-normal text-[#210203]">
                    {product[0]?.raw_size ? product[0]?.raw_size : 'N/A'}
                  </span>
                </p>
              </div>
              <div className="w-full relative flex flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                <div className="relative flex items-center gap-1">
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-xs font-normal text-[#504949]">
                      Service Description
                    </span>
                  </small>
                  <TooltipProvider>
                    <TouchProvider>
                      <HybridTooltip>
                        <HybridTooltipTrigger asChild>
                          <span className="cursor-pointer">
                            <BsQuestionCircleFill className="text-[#B1AAAA]" />
                          </span>
                        </HybridTooltipTrigger>
                        <HybridTooltipContent>
                          <p>View details on Service Description</p>
                        </HybridTooltipContent>
                      </HybridTooltip>
                    </TouchProvider>
                  </TooltipProvider>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="line-clamp-1 text-base font-normal text-[#210203]">
                    {product[0]?.serviceDescription
                      ? product[0]?.serviceDescription
                      : 'N/A'}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row gap-3">
              <div className="w-full relative flex flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                <div className="relative flex items-center gap-1">
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-xs font-normal text-[#504949]">
                      Load Range
                    </span>
                  </small>
                  <TooltipProvider>
                    <TouchProvider>
                      <HybridTooltip>
                        <HybridTooltipTrigger asChild>
                          <span className="cursor-pointer">
                            <BsQuestionCircleFill className="text-[#B1AAAA]" />
                          </span>
                        </HybridTooltipTrigger>
                        <HybridTooltipContent>
                          <p>View details on load Rang</p>
                        </HybridTooltipContent>
                      </HybridTooltip>
                    </TouchProvider>
                  </TooltipProvider>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="line-clamp-1 text-base font-normal text-[#210203]">
                    {product[0]?.load_range ? product[0]?.load_range : 'N/A'}
                  </span>
                </p>
              </div>
              <div className="w-full relative flex flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                <div className="relative flex items-center gap-1">
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-xs font-normal text-[#504949]">
                      Eco Focus
                    </span>
                  </small>
                  <TooltipProvider>
                    <TouchProvider>
                      <HybridTooltip>
                        <HybridTooltipTrigger asChild>
                          <span className="cursor-pointer">
                            <BsQuestionCircleFill className="text-[#B1AAAA]" />
                          </span>
                        </HybridTooltipTrigger>
                        <HybridTooltipContent>
                          <p>View details on Eco Focus</p>
                        </HybridTooltipContent>
                      </HybridTooltip>
                    </TouchProvider>
                  </TooltipProvider>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="line-clamp-1 text-base font-normal text-[#210203]">
                    {product[0]?.eco_focus ? product[0]?.eco_focus : 'N/A'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col sm:flex-row gap-3">
            <div className="w-full flex flex-row gap-3">
              <div className="w-full relative flex  flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                <div className="relative flex items-center gap-1">
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-xs font-normal text-[#504949]">
                      UTQG
                    </span>
                  </small>
                  <TooltipProvider>
                    <TouchProvider>
                      <HybridTooltip>
                        <HybridTooltipTrigger asChild>
                          <span className="cursor-pointer">
                            <BsQuestionCircleFill className="text-[#B1AAAA]" />
                          </span>
                        </HybridTooltipTrigger>
                        <HybridTooltipContent>
                          <p>View details on UTQG</p>
                        </HybridTooltipContent>
                      </HybridTooltip>
                    </TouchProvider>
                  </TooltipProvider>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="line-clamp-1 text-base font-normal text-[#210203]">
                    {product[0]?.utqg ? product[0]?.utqg : 'N/A'}
                  </span>
                </p>
              </div>
              <div className="w-full relative flex flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                <div className="relative flex items-center gap-1">
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-xs font-normal text-[#504949]">
                      Max. load
                    </span>
                  </small>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="line-clamp-1 text-base font-normal text-[#210203]">
                    {product[0]?.max_load_2_kg
                      ? product[0]?.max_load_2_kg
                      : 'N/A'}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row gap-3">
              <div className="w-full relative flex flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                <div className="relative flex items-center gap-1">
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-xs font-normal text-[#504949]">
                      Max. Inflaction Pressure
                    </span>
                  </small>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="line-clamp-1 text-base font-normal text-[#210203]">
                    {product[0]?.max_inflaction_pressure
                      ? product[0]?.max_inflaction_pressure
                      : 'N/A'}
                  </span>
                </p>
              </div>
              <div className="w-full relative flex flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                <div className="relative flex items-center gap-1">
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-xs font-normal text-[#504949]">
                      Eco Focus
                    </span>
                  </small>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="line-clamp-1 text-base font-normal text-[#210203]">
                    {product[0]?.tread_depth_in
                      ? product[0]?.tread_depth_in
                      : 'N/A'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col sm:flex-row gap-3">
            <div className="w-full flex flex-row gap-3">
              <div className="w-full relative flex  flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                <div className="relative flex items-center gap-1">
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-xs font-normal text-[#504949]">
                      Tire Weight
                    </span>
                  </small>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="line-clamp-1 text-base font-normal text-[#210203]">
                    {product[0]?.tire_weight ? product[0]?.tire_weight : 'N/A'}
                  </span>
                </p>
              </div>
              <div className="w-full relative flex flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                <div className="relative flex items-center gap-1">
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-xs font-normal text-[#504949]">
                      Rim width Range
                    </span>
                  </small>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="line-clamp-1 text-base font-normal text-[#210203]">
                    {product[0]?.rim_width ? product[0]?.rim_width : 'N/A'}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row gap-3">
              <div className="w-full relative flex flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                <div className="relative flex items-center gap-1">
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-xs font-normal text-[#504949]">
                      Meas. Rim Width
                    </span>
                  </small>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="line-clamp-1 text-base font-normal text-[#210203]">
                    {product[0]?.meas_rim_width
                      ? product[0]?.meas_rim_width
                      : 'N/A'}
                  </span>
                </p>
              </div>
              <div className="w-full relative flex flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                <div className="relative flex items-center gap-1">
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-xs font-normal text-[#504949]">
                      Sect. width
                    </span>
                  </small>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="line-clamp-1 text-base font-normal text-[#210203]">
                    {product[0]?.section_width_in
                      ? product[0]?.section_width_in
                      : 'N/A'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col sm:flex-row gap-3">
            <div className="w-full flex flex-row gap-3">
              <div className="w-full relative flex  flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                <div className="relative flex items-center gap-1">
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-xs font-normal text-[#504949]">
                      Tread Width
                    </span>
                  </small>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="line-clamp-1 text-base font-normal text-[#210203]">
                    {product[0]?.tread_width ? product[0]?.tread_width : 'N/A'}
                  </span>
                </p>
              </div>
              <div className="w-full relative flex flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                <div className="relative flex items-center gap-1">
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-xs font-normal text-[#504949]">
                      Overall Diameter
                    </span>
                  </small>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="line-clamp-1 text-base font-normal text-[#210203]">
                    {product[0]?.overall_dia_in
                      ? product[0]?.overall_dia_in
                      : 'N/A'}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row gap-3">
              <div className="w-full relative flex flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                <div className="relative flex items-center gap-1">
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-xs font-normal text-[#504949]">
                      Revs. per mile
                    </span>
                  </small>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="line-clamp-1 text-base font-normal text-[#210203]">
                    {product[0]?.revs_per_mile
                      ? product[0]?.revs_per_mile
                      : 'N/A'}
                  </span>
                </p>
              </div>
              <div className="w-full relative flex flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                <div className="relative flex items-center gap-1">
                  <small className="text-xs leading-[14px] text-[#504949]">
                    <span className="text-xs font-normal text-[#504949]">
                      Country of Origin
                    </span>
                  </small>
                </div>
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="line-clamp-1 text-base font-normal text-[#210203]">
                    {product[0]?.country_of_origin
                      ? product[0]?.country_of_origin
                      : 'N/A'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TireDetailsSpecifications;
