"use client";

import { InfoIcon, Truck } from "lucide-react";

interface DeliveryOptionsProps {
  requestedDealer?: {
    businessName: string;
    website: string;
    contact: string;
  };
  selectedDealerInfo?: {
    Addressee: string;
    "Address Phone": string;
  };
  selectedOptionTitle?: string;
}

export const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  requestedDealer,
  selectedDealerInfo,
  selectedOptionTitle,
}) => {
  return (
    <div className="flex items-start gap-4">
      <div className="relative mt-1 flex h-5 w-5 items-center justify-center rounded-full text-white">
        <Truck className="h-5 w-5 text-[#210203]" />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">Delivery Options</h2>

        {requestedDealer?.businessName ? (
          <div className="flex flex-col gap-y-3">
            <h2 className="text-lg font-semibold">Dealer Requested</h2>
            <div className="rounded-xs flex gap-2 p-4">
              <InfoIcon className="fill-black stroke-white" />
              <p className="text-muted">
                Dealer setup will begin after checkout. An Amani representative
                will confirm once the dealer is onboarded, and shippling will
                proceed afterward.
              </p>
            </div>
            <p className="text-lg text-muted">{requestedDealer.businessName}</p>
            <p className="text-lg text-muted">{requestedDealer.website}</p>
            <p className="text-lg text-muted">{requestedDealer.contact}</p>
          </div>
        ) : null}

        {selectedDealerInfo ? (
          <div className="flex max-w-lg flex-col gap-y-3">
            <h2 className="text-lg font-semibold">Dealer Selected</h2>
            <p className="text-lg text-muted">
              {selectedDealerInfo?.Addressee}
            </p>
            <p className="text-lg text-muted">
              {selectedDealerInfo["Address Phone"]}
            </p>
          </div>
        ) : (
          selectedOptionTitle
        )}
      </div>
    </div>
  );
};
