import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger,
  TouchProvider,
} from '@/components/ui/hybrid-tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TCartProduct } from '@/redux/features/cartSlice';
import React from 'react';
import { BsQuestionCircleFill } from 'react-icons/bs';

// Component to display tire attributes
const TireAttributes = ({ product }: { product: TCartProduct }) => {
  return (
    <div className="flex gap-2 items-start self-stretch flex-wrap relative w-full">
      {/* Display tire size if available */}
      <div
        className="hover:bg-[#210203] bg-white group cursor-pointer rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={product?.tireSize}
        data-tooltip-place="top"
      >
        <div className="flex gap-1 items-center relative">
          <i className="icon-size text-[#504949]  group-hover:text-[#ffffff]"></i>
          <small className="text-xs leading-[14px] text-[#504949]">
            <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
              Size
            </span>
          </small>
        </div>
        <p className="text-base leading-[19px] text-[#210203]">
          <span className="text-[#212227] text-base font-normal group-hover:text-[#ffffff]">
            {product?.tireSize ? product?.tireSize : 'N/A'}
          </span>
        </p>
      </div>

      <div
        className="hover:bg-[#210203] bg-white group cursor-pointer rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={product?.shortDescription}
        data-tooltip-place="top"
      >
        <div className="flex gap-1 items-center relative">
          <small className="text-xs leading-[14px] text-[#504949]">
            <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
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
          <span className="text-[#212227] text-base font-normal group-hover:text-[#ffffff]">
            {product?.shortDescription ? product?.shortDescription : 'N/A'}
          </span>
        </p>
      </div>

      {/* UTQG */}
      <div
        className="hover:bg-[#210203] bg-white group cursor-pointer rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={product?.utqg}
        data-tooltip-place="top"
      >
        <div className="flex gap-1 items-center relative">
          <small className="text-xs leading-[14px] text-[#504949]">
            <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
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
          <span className="text-[#212227] text-base font-normal group-hover:text-[#ffffff]">
            {product?.utqg ? product?.utqg : 'N/A'}
          </span>
        </p>
      </div>

      {/* Display sidewall style if available */}
      <div
        className="hover:bg-[#210203] bg-white group cursor-pointer rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={product?.sidewall}
        data-tooltip-place="top"
      >
        <div className="flex gap-1 items-center relative">
          <i className="icon-finish text-[#504949] group-hover:text-[#ffffff]"></i>
          <small className="text-xs leading-[14px] text-[#504949]">
            <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
              Style
            </span>
          </small>
        </div>
        <p className="text-base leading-[19px] text-[#210203]">
          <span className="text-[#212227] text-base font-normal group-hover:text-[#ffffff]">
            {product?.sidewall ? product?.sidewall : 'N/A'}
          </span>
        </p>
      </div>

      {/* Display Eco Focus if available */}
      <div
        className="hover:bg-[#210203] bg-white group cursor-pointer rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative"
        data-tooltip-id="my-tooltip"
        data-tooltip-place="top"
      >
        <div className="flex gap-1 items-center relative">
          <small className="text-xs leading-[14px] text-[#504949]">
            <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
              Eco Focus
            </span>
          </small>
        </div>
        <p className="text-base leading-[19px] text-[#210203]">
          <span className="text-[#212227] text-base font-normal group-hover:text-[#ffffff]">
            {product?.ecoFocus ? product?.ecoFocus : 'N/A'}
          </span>
        </p>
      </div>

      {/* Display load rating if available */}
      <div
        className="hover:bg-[#210203] bg-white group cursor-pointer rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={product?.loadRating}
        data-tooltip-place="top"
      >
        <div className="flex gap-1 items-center relative">
          <small className="text-xs leading-[14px] text-[#504949]">
            <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
              Load Range
            </span>
          </small>
        </div>
        <p className="text-base leading-[19px] text-[#210203]">
          <span className="text-[#212227] text-base font-normal group-hover:text-[#ffffff]">
            {product?.loadRating ? product?.loadRating : 'N/A'}
          </span>
        </p>
      </div>

      {/* Hazard Protection */}
      <div
        className="hover:bg-[#210203] bg-white group cursor-pointer rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={product?.hazardProtection}
        data-tooltip-place="top"
      >
        <div className="flex gap-1 items-center relative">
          <small className="text-xs leading-[14px] text-[#504949]">
            <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
              Hazard Protection
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
                  <p>View details on Hazard Protecton</p>
                </HybridTooltipContent>
              </HybridTooltip>
            </TouchProvider>
          </TooltipProvider>
        </div>
        <p className="text-base leading-[19px] text-[#210203]">
          <span className="text-[#212227] text-base font-normal group-hover:text-[#ffffff]">
            {product?.hazardProtection ? product?.hazardProtection : 'N/A'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TireAttributes;
