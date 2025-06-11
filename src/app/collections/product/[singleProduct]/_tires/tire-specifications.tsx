'use client';
// Import necessary types and components
import { TInventoryItem } from '@/types/product';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger,
  TouchProvider,
} from '@/components/ui/hybrid-tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BsQuestionCircleFill } from 'react-icons/bs';

// Component to display in-stock wheel details
const TireSpecifications = ({
  product,
  tire,
}: {
  product: TInventoryItem;
  tire: string;
}) => {
  return (
    <>
      {/* Main container for the in-stock wheel details */}
      <div className="border-b border-[#cfcfcf] bg-[#F7F7F7]">
        {/* Accordion to organize content into collapsible sections */}
        <Accordion type="multiple" defaultValue={['specification']}>
          {/* Accordion item for specifications */}
          <AccordionItem
            className="border-b border-[#cfcfcf]"
            value="specification"
          >
            <AccordionTrigger className="px-4 pt-4">
              <div className="relative flex items-center gap-1">
                <h5 className="text-xl leading-6 text-[#210203]">
                  <span className="text-xl font-semibold text-[#210203]">
                    {tire} Specifications
                  </span>
                </h5>
                {/* <BsQuestionCircleFill className="text-[#B1AAAA]" /> */}
                {/* Tooltip for additional information */}
                <TooltipProvider>
                  <TouchProvider>
                    <HybridTooltip>
                      <HybridTooltipTrigger asChild>
                        <span className="cursor-pointer">
                          <BsQuestionCircleFill className="text-[#B1AAAA]" />
                        </span>
                      </HybridTooltipTrigger>
                      <HybridTooltipContent>
                        <p>
                          View details on fitment, compatibility and performance
                        </p>
                      </HybridTooltipContent>
                    </HybridTooltip>
                  </TouchProvider>
                </TooltipProvider>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
              {/* Specification details */}
              <div className="relative flex w-full flex-wrap items-start gap-2 self-stretch">
                {/* Individual specification item */}

                <div className="relative flex w-full flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                  <div className="relative flex items-center gap-1">
                    <svg
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 8L1 11.5M1 11.5H3.92857M1 11.5V8.57143"
                        stroke="#504949"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 5L11 1.5M11 1.5H8.07143M11 1.5V4.42857"
                        stroke="#504949"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <small className="text-xs leading-[14px] text-[#504949]">
                      <span className="text-xs font-normal text-[#504949]">
                        Size
                      </span>
                    </small>
                  </div>
                  <p className="text-base leading-[19px] text-[#210203]">
                    <span className="line-clamp-1 text-base font-normal text-[#210203]">
                      {product.raw_size ? product.raw_size : 'N/A'}
                    </span>
                  </p>
                </div>

                <div className="flex w-full flex-row gap-2">
                  <div className="relative flex w-1/2 flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                    <div className="relative flex items-center gap-1">
                      <svg
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 6.51306C1 9.08617 2.93356 11.2065 5.42339 11.4931C5.7908 11.5354 6.14691 11.3788 6.40841 11.1166C6.73514 10.7891 6.73514 10.2579 6.40841 9.93036C6.14691 9.66818 5.93372 9.27707 6.13094 8.96341C6.91927 7.7096 11 10.589 11 6.51306C11 3.74442 8.76142 1.5 6 1.5C3.23858 1.5 1 3.74442 1 6.51306Z"
                          stroke="#504949"
                        />
                        <circle cx="8.75" cy="6.25" r="0.75" stroke="#504949" />
                        <circle cx="3.25" cy="6.25" r="0.75" stroke="#504949" />
                        <path
                          d="M5.54248 3.99988C5.54248 4.41409 5.20669 4.74988 4.79248 4.74988C4.37827 4.74988 4.04248 4.41409 4.04248 3.99988C4.04248 3.58566 4.37827 3.24988 4.79248 3.24988C5.20669 3.24988 5.54248 3.58566 5.54248 3.99988Z"
                          stroke="#504949"
                        />
                        <path
                          d="M8 4C8 4.41421 7.66421 4.75 7.25 4.75C6.83579 4.75 6.5 4.41421 6.5 4C6.5 3.58579 6.83579 3.25 7.25 3.25C7.66421 3.25 8 3.58579 8 4Z"
                          stroke="#504949"
                        />
                      </svg>

                      <small className="text-xs leading-[14px] text-[#504949]">
                        <span className="text-xs font-normal text-[#504949]">
                          Style
                        </span>
                      </small>
                    </div>
                    <p className="text-base leading-[19px] text-[#210203]">
                      <span className="line-clamp-1 text-base font-normal text-[#210203]">
                        {product.spoke_style ? product?.spoke_style : 'N/A'}
                      </span>
                    </p>
                  </div>
                  <div className="relative flex w-1/2 flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                    <div className="relative flex items-center gap-1">
                      <small className="text-xs leading-[14px] text-[#504949]">
                        <span className="text-xs font-normal text-[#504949]">
                          Load rang
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
                        {product.load_rating ? product.load_rating : 'N/A'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex w-full flex-row gap-2">
                  <div className="relative flex w-1/2 flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
                    <div className="relative flex items-center gap-1">
                      <small className="text-xs leading-[14px] text-[#504949]">
                        <span className="text-xs font-normal text-[#504949]">
                          Serv.Desc.
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
                              <p>View details on Serv.Desc</p>
                            </HybridTooltipContent>
                          </HybridTooltip>
                        </TouchProvider>
                      </TooltipProvider>
                    </div>
                    <p className="text-base leading-[19px] text-[#210203]">
                      <span className="line-clamp-1 text-base font-normal text-[#210203]">
                        {product.std_rim ? product.std_rim : 'N/A'}
                      </span>
                    </p>
                  </div>
                  <div className="relative flex w-1/2 flex-col items-start justify-start gap-2 rounded-md border border-[#cfcfcf] bg-[#FFFFFF] px-3 py-2">
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
                        {product.load_rating ? product.load_rating : 'N/A'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default TireSpecifications;
