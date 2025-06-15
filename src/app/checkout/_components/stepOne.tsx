'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InfoIcon } from 'lucide-react';
import React, { useState } from 'react';
import { DeliveryOptions } from './deliveryOptions';
import { useTypedSelector } from '@/redux/store';
import useAddZipCode from '@/components/shared/MainFilterModal/components/AddZipCode/useAddZipCode';

// Interface for checkout step props
export interface ICheckoutStepProps {
  step?: number;
  handleBack?: (e: React.MouseEvent) => void;
  handleContinue?: (e: React.MouseEvent) => void;
  setStep: (step: number) => void;
}

// StepOne Component
export const StepOne: React.FC<ICheckoutStepProps> = ({
  handleContinue,
  setStep,
}) => {
  // Access checkout-related state and functions from the context
  // Component state
  const { validateZipCode, loading } = useAddZipCode();
  const { validatedZipCode } = useTypedSelector(
    (state) => state.persisted.checkout
  );
  const [code, setCode] = useState(validatedZipCode || ''); // State to store the ZIP code input
  const [dealerDialog, setDealerDialog] = useState(false); // State to manage the dealer request dialog

  return (
    <div className="flex flex-col gap-y-6">
      {/* ZIP Code and Delivery Options Section */}
      <div className="bg-[#F7F7F7] rounded-xs px-md py-5 grid grid-cols-1 lg:grid-cols-2 gap-lg">
        <div className="flex flex-col gap-y-3 justify-between">
          <div className="pt-3">
            <p className="leading-snug">
              We can ship your tires to an independent recommended installe who
              can professionally install them at a reasonable cost.
            </p>
          </div>
          <div className="space-y-3 w-full">
            <Label>Change ZIP code to update installer options</Label>
            <div className="flex gap-xs max-w-xl">
              {/* ZIP Code Input */}
              <Input
                placeholder="Enter zip code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="h-12 bg-white w-full"
              />
              {/* Validate Button */}
              <Button
                disabled={loading}
                onClick={() => {
                  validateZipCode(code, true);
                }}
                className="flex h-12 items-center justify-center gap-2 w-[180px]"
              >
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.7403 5.97637C18.8327 7.02762 18.8327 8.33802 18.8327 9.99999C18.8327 13.4447 18.8327 15.3791 18.0098 16.6261L13.0503 11.6665L18.7403 5.97637Z"
                    fill="white"
                  />
                  <path
                    d="M17.1261 17.5101L12.1664 12.5504L6.47574 18.2409C7.52699 18.3333 8.83739 18.3333 10.4993 18.3333C13.9446 18.3333 15.8791 18.3333 17.1261 17.5101Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.4993 1.66666C14.4277 1.66666 16.3919 1.66666 17.6123 2.88704C18.0322 3.30693 18.3076 3.81488 18.4883 4.46057L4.95993 17.9889C4.31423 17.8082 3.80629 17.5328 3.3864 17.1129C2.16602 15.8925 2.16602 13.9284 2.16602 9.99999C2.16602 6.07162 2.16602 4.10743 3.3864 2.88705C4.60679 1.66666 6.57098 1.66666 10.4993 1.66666ZM5.08268 7.29775C5.08268 8.78515 6.01358 10.5208 7.46599 11.1415C7.80457 11.2862 8.19413 11.2862 8.53271 11.1415C9.98512 10.5208 10.916 8.78515 10.916 7.29775C10.916 5.79862 9.61018 4.58332 7.99935 4.58332C6.38852 4.58332 5.08268 5.79862 5.08268 7.29775Z"
                    fill="white"
                  />
                  <path
                    d="M9.24935 7.49999C9.24935 8.19035 8.68971 8.74999 7.99935 8.74999C7.30899 8.74999 6.74935 8.19035 6.74935 7.49999C6.74935 6.80963 7.30899 6.24999 7.99935 6.24999C8.68971 6.24999 9.24935 6.80963 9.24935 7.49999Z"
                    fill="white"
                  />
                </svg>
                <span className="text-[18px]">
                  {loading ? 'Validating' : 'View installers'}
                </span>
              </Button>
            </div>
          </div>
        </div>
        <Accordion className="md:hidden" type="single" collapsible>
          <AccordionItem value={'item-1'} className="border rounded-xs px-4">
            <AccordionTrigger className="">
              <div className="flex items-center gap-1">
                <InfoIcon className="fill-primary stroke-white" />
                <p className="text-xl font-bold">Note</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-muted-foreground text-base">
                <p>
                  We will send your selected/recommended installer an order and
                  shipment confirmation that includes your name, phone number,
                  email address, vehicle details, product ordered, and order
                  number.
                </p>
                <p>
                  Installers limit service to vehicles and products that meet
                  their business and equipment capabilities. During checkout we
                  only display locations that can perform the required service
                  based on the product and vehicle selected.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* Right Section: Note */}
        <div className="rounded-xl hidden md:block border border-border bg-white p-smx space-y-2">
          <div className="flex items-center gap-1">
            <InfoIcon className="fill-primary stroke-white" />
            <p className="text-xl font-bold">Note</p>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We will send your selected Recommended Installer order ad shipment
              confirmation that include your name, phone number, email address,
              vehicle, product ordered and order number.
            </p>
            <p>
              Installers limit service to vehicles and products that meet their
              business and equipment capabilities. During checkout we only
              display locations that can perform the required service based on
              the product and vehicle selected.
            </p>
          </div>
        </div>
      </div>
      {/* Delivery Options and Map Section */}
      <div className="grid grid-cols-10 gap-8">
        <div className="col-span-10 lg:col-span-4">
          <h2 className="text-black font-bold text-2xl mb-4">
            Select an Installer
          </h2>
          <DeliveryOptions setStep={setStep!} />
        </div>
        <div className="col-span-10 lg:col-span-6 z-10 rounded-xl overflow-hidden h-fit border border-border">
          <div className="flex justify-between items-start md:items-center py-xs px-smx">
            <div className="grid grid-cols-3 gap-[.5rem] md:gap-[1.5rem]">
              <div className="flex col-span-3 sm:col-span-1 items-center font-semibold gap-4 ">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="28" height="28" rx="14" fill="#1E2EDE" />
                  <path
                    d="M11.9704 11.2754L12.399 12.8271C12.8032 14.2901 13.0053 15.0216 13.5995 15.3543C14.1936 15.687 14.9478 15.491 16.4562 15.099L18.0561 14.6832C19.5645 14.2912 20.3187 14.0952 20.6617 13.519C21.0048 12.9427 20.8027 12.2112 20.3985 10.7482L19.9698 9.1965C19.5656 7.73352 19.3636 7.00204 18.7694 6.66933C18.1752 6.33662 17.421 6.53262 15.9127 6.92462L14.3128 7.34041C12.8044 7.73241 12.0502 7.92841 11.7071 8.50468C11.3641 9.08095 11.5662 9.81244 11.9704 11.2754Z"
                    fill="white"
                  />
                  <path
                    d="M5.89791 8.37245C5.99019 8.03984 6.33464 7.84501 6.66725 7.9373L8.087 8.3312C8.85107 8.54319 9.45575 9.13221 9.66669 9.89574L11.4592 16.3841L11.5911 16.8396C12.1187 17.0365 12.5719 17.4055 12.8595 17.8956L13.1178 17.8159L20.5096 15.8949C20.8437 15.8081 21.1849 16.0085 21.2717 16.3426C21.3586 16.6767 21.1581 17.0179 20.824 17.1047L13.4596 19.0186L13.1857 19.1031C13.1801 20.1623 12.4494 21.1295 11.3436 21.4169C10.0182 21.7613 8.65591 20.9985 8.30077 19.713C7.94563 18.4275 8.73218 17.1062 10.0576 16.7617C10.1232 16.7447 10.189 16.7303 10.2548 16.7186L8.46183 10.2286C8.3716 9.90202 8.10748 9.6341 7.75281 9.5357L6.33307 9.1418C6.00045 9.04951 5.80563 8.70507 5.89791 8.37245Z"
                    fill="white"
                  />
                </svg>
                <p className="text-sm">Mobile Installer</p>
              </div>
              <div className="flex col-span-3 sm:col-span-1 items-center font-semibold gap-4 md:py-xs">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="28" height="28" rx="14" fill="#F9D000" />
                  <path
                    d="M12.1028 8.93891C12.9472 7.42407 13.3694 6.66666 14.0007 6.66666C14.6319 6.66666 15.0541 7.42407 15.8985 8.93891L16.117 9.33081C16.357 9.76128 16.4769 9.97651 16.664 10.1185C16.8511 10.2605 17.0841 10.3133 17.5501 10.4187L17.9743 10.5147C19.6141 10.8857 20.434 11.0712 20.629 11.6985C20.8241 12.3258 20.2652 12.9794 19.1473 14.2866L18.858 14.6248C18.5404 14.9963 18.3815 15.182 18.3101 15.4118C18.2386 15.6416 18.2626 15.8894 18.3107 16.385L18.3544 16.8363C18.5234 18.5804 18.6079 19.4525 18.0972 19.8401C17.5865 20.2278 16.8189 19.8744 15.2835 19.1674L14.8863 18.9845C14.45 18.7837 14.2319 18.6832 14.0007 18.6832C13.7694 18.6832 13.5513 18.7837 13.115 18.9845L12.7178 19.1674C11.1824 19.8744 10.4148 20.2278 9.90408 19.8401C9.3934 19.4525 9.4779 18.5804 9.64692 16.8363L9.69064 16.385C9.73867 15.8894 9.76268 15.6416 9.69123 15.4118C9.61977 15.182 9.46093 14.9963 9.14326 14.6248L8.85405 14.2866C7.73615 12.9794 7.1772 12.3258 7.37227 11.6985C7.56733 11.0712 8.38722 10.8857 10.027 10.5147L10.4512 10.4187C10.9172 10.3133 11.1502 10.2605 11.3373 10.1185C11.5244 9.97651 11.6443 9.76128 11.8843 9.33081L12.1028 8.93891Z"
                    fill="white"
                  />
                </svg>

                <p className="text-sm">Top Rated</p>
              </div>
              <div className="flex col-span-3 sm:col-span-1 items-center font-semibold gap-4 md:py-xs">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="28" height="28" rx="14" fill="#DB1922" />
                  <path
                    d="M17.0184 7.33334H10.9813C10.1795 7.33334 9.77852 7.33334 9.45632 7.53248C9.13412 7.73161 8.95481 8.09022 8.5962 8.80744L7.66046 11.1729C7.44426 11.7194 7.2551 12.3635 7.61903 12.825C7.86317 13.1346 8.24163 13.3333 8.66652 13.3333C9.4029 13.3333 9.99986 12.7364 9.99986 12C9.99986 12.7364 10.5968 13.3333 11.3332 13.3333C12.0696 13.3333 12.6665 12.7364 12.6665 12C12.6665 12.7364 13.2635 13.3333 13.9999 13.3333C14.7362 13.3333 15.3332 12.7364 15.3332 12C15.3332 12.7364 15.9301 13.3333 16.6665 13.3333C17.4029 13.3333 17.9999 12.7364 17.9999 12C17.9999 12.7364 18.5968 13.3333 19.3332 13.3333C19.7581 13.3333 20.1366 13.1346 20.3807 12.825C20.7447 12.3635 20.5555 11.7194 20.3393 11.1729L19.4036 8.80744C19.045 8.09022 18.8657 7.73161 18.5435 7.53248C18.2212 7.33334 17.8203 7.33334 17.0184 7.33334Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.334 20.1667H20.6673C20.9435 20.1667 21.1673 20.3905 21.1673 20.6667C21.1673 20.9428 20.9435 21.1667 20.6673 21.1667H7.33398C7.05784 21.1667 6.83398 20.9428 6.83398 20.6667C6.83398 20.3905 7.05784 20.1667 7.33398 20.1667H8.66732L8.66732 14.3333C9.16307 14.3333 9.62271 14.1787 10.0007 13.9151C10.3786 14.1787 10.8382 14.3333 11.334 14.3333C11.8297 14.3333 12.2894 14.1787 12.6673 13.9151C13.0453 14.1787 13.5049 14.3333 14.0007 14.3333C14.4964 14.3333 14.956 14.1787 15.334 13.9151C15.7119 14.1787 16.1716 14.3333 16.6673 14.3333C17.1631 14.3333 17.6227 14.1787 18.0007 13.9151C18.3786 14.1787 18.8382 14.3333 19.334 14.3333L19.334 20.1667ZM12.334 20.1667H15.6673V18.3333C15.6673 17.7102 15.6673 17.3987 15.5333 17.1667C15.4456 17.0146 15.3193 16.8884 15.1673 16.8006C14.9353 16.6667 14.6237 16.6667 14.0007 16.6667C13.3776 16.6667 13.066 16.6667 12.834 16.8006C12.682 16.8884 12.5557 17.0146 12.468 17.1667C12.334 17.3987 12.334 17.7102 12.334 18.3333V20.1667Z"
                    fill="white"
                  />
                </svg>

                <p className="text-sm">Installer</p>
              </div>
            </div>
            <button
              onClick={() => setDealerDialog(true)}
              className="h-fit bg-none underline font-semibold"
            >
              Request a Dealer
            </button>
          </div>
          {/* <DealerMap /> */}
          {/* <Map /> */}
        </div>
      </div>
      {/* Dealer Request Dialog */}
      {/* <DealerRequest
                isDialogOpen={dealerDialog}
                setIsDialogOpen={setDealerDialog}
            /> */}
    </div>
  );
};
