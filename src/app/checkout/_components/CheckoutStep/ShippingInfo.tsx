"use client";
import { TAddress } from "@/types/order";
import { Package } from "lucide-react";

interface ShippingInfoProps {
  shippingAddress?: TAddress;
  selectedDealer?: string;
}

export const ShippingInfo: React.FC<ShippingInfoProps> = ({
  shippingAddress,
  selectedDealer,
}) => {
  return (
    <div className="flex items-start gap-4 font-bold">
      <div className="relative h-5 w-5 rounded-full flex items-center justify-center text-white mt-1">
        <Package className="h-5 w-5 text-[#210203]" />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg">Shipping Info</h2>
        <div className="space-y-1">
          {shippingAddress?.name ? (
            <>
              <p className="font-light text-gray-700">{shippingAddress.name}</p>
              {shippingAddress.address1 && (
                <p className="font-light text-gray-700">
                  {shippingAddress.address1}
                </p>
              )}
              {shippingAddress.address2 && (
                <p className="font-light text-gray-700">
                  {shippingAddress.address2}
                </p>
              )}
              <p className="font-light text-gray-700">
                {shippingAddress.cityState} {shippingAddress.zipCode}
              </p>
              <p className="font-light text-gray-700">
                {shippingAddress.phone}
              </p>
              <p className="font-light text-gray-700">
                {shippingAddress.email}
              </p>
            </>
          ) : selectedDealer ? (
            <p className="font-medium">
              Authorized Dealer Contact: {selectedDealer}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
