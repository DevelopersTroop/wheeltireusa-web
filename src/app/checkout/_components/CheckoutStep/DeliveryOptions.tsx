"use client";

import { TDealer } from "@/types/order";
import { Truck, InfoIcon } from "lucide-react";

// Props interface for the DeliveryOptions component
interface DeliveryOptionsProps {
  requestedDealer?: {
    businessName: string;
    website: string;
    contact: string;
  };
  selectedDealerInfo?: TDealer;
  selectedOptionTitle?: string;
}

// DeliveryOptions Component
export const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  requestedDealer,
  selectedDealerInfo,
  selectedOptionTitle,
}) => {
  return (
    <div className="flex items-start gap-4">
      {/* Icon Section */}
      <div className="relative h-5 w-5 rounded-full flex items-center justify-center text-white mt-1">
        <Truck className="h-5 w-5 text-[#210203]" />
      </div>
      {/* Delivery Options Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">Delivery Options</h2>

        {/* Display requested dealer information if available */}
        {requestedDealer?.businessName ? (
          <div className="flex flex-col gap-y-3">
            <h2 className="font-semibold text-lg">Dealer Requested</h2>
            <div className="p-4 rounded-xs flex gap-2">
              <InfoIcon className="fill-black stroke-white" />
              <p className="text-muted">
                Dealer setup will begin after checkout. An Amani representative
                will confirm once the dealer is onboarded, and shippling will
                proceed afterward.
              </p>
            </div>
            {/* Display requested dealer details */}
            <p className="text-lg text-muted">
              {requestedDealer.businessName}
            </p>
            <p className="text-lg text-muted">
              {requestedDealer.website}
            </p>
            <p className="text-lg text-muted">
              {requestedDealer.contact}
            </p>
          </div>
        ) : null}

        {/* Display selected dealer information if available */}
        {selectedDealerInfo ? (
          <div className="flex flex-col gap-y-3 max-w-xl">
            <h2 className="font-semibold text-lg">Dealer Selected</h2>
            <p className="text-lg text-muted">
              {selectedDealerInfo?.address}
            </p>
            <p className="text-lg text-muted">
              {selectedDealerInfo["addressPhone"]}
            </p>
          </div>
        ) : (
          selectedOptionTitle
        )}
      </div>
    </div>
  );
};