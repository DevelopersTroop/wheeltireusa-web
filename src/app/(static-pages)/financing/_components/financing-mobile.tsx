'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { paymentProviders } from './financing-table';

// Component to render the mobile version of the financing table
export const FinancingMobile = () => {
  const [selectedPaymentProvider, setSelectedPaymentProvider] =
    useState('PayPal');

  // Memoized value for the selected payment provider's details
  const selectedPayment = useMemo(() => {
    return paymentProviders.find(
      (provider) => provider.name === selectedPaymentProvider
    );
  }, [selectedPaymentProvider]);
  return (
    <div className="md:hidden flex flex-col gap-3">
      {/* Dropdown to select a payment provider */}
      <Select value={selectedPaymentProvider}>
        <SelectTrigger className="border px-4 py-3">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="py-2  max-w-full">
          {paymentProviders.map((provider) => (
            <SelectItem
              className="py-3"
              key={provider.name}
              value={provider.name}
              onClick={() => setSelectedPaymentProvider(provider.name)}
            >
              <div className="flex items-center max-w-full">
                <img src={provider.image} />
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Link to learn more about the selected payment provider */}
      <Link
        href={selectedPayment?.link || ''}
        target="_blank"
        className="text-base font-semibold underline text-[#210203]"
      >
        Learn More
      </Link>
      {/* Table displaying details of the selected payment provider */}
      <div className="rounded-lg border border-gray-300 overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {/* How it works */}
            <tr className="border-b border-gray-300">
              <td className="p-3 text-base font-semibold border-r">
                How It Works
              </td>
              <td className="p-3 text-base font-normal text-center">
                {selectedPayment?.howItWorks}
              </td>
            </tr>

            {/* Advantages */}
            <tr className="border-b border-gray-300">
              <td className="p-3 text-base font-semibold border-r">
                Advantages
              </td>
              <td className="p-3">
                <ul className="list-none list-inside space-y-2">
                  {selectedPayment?.advantages.map((adv, index) => (
                    <li
                      key={index}
                      className="flex flex-row gap-2 text-base font-normal"
                    >
                      <IoCheckmarkOutline className="text-2xl text-green-500" />
                      <p className="w-full">{adv}</p>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>

            {/* Credit Required */}
            <tr className="border-b border-gray-300">
              <td className="p-3 text-base font-semibold border-r">
                Credit Required
              </td>
              <td className="p-3 text-center">
                {selectedPayment?.creditRequired ? (
                  <IoCheckmarkOutline className="text-2xl text-green-500 text-center mx-auto" />
                ) : (
                  <RxCross2 className="text-2xl text-primary text-center mx-auto" />
                )}
              </td>
            </tr>

            {/* Interest Charged */}
            <tr className="border-b border-gray-300">
              <td className="p-3 text-base font-semibold border-r">
                Interest Charged
              </td>
              <td className="p-3 text-center">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <p>
                    {selectedPayment?.interestCharged.isTrue ? (
                      <IoCheckmarkOutline className="text-2xl text-green-500 text-center mx-auto" />
                    ) : (
                      <RxCross2 className="text-2xl text-primary text-center mx-auto" />
                    )}
                  </p>
                  {selectedPayment?.interestCharged.content}
                </div>
              </td>
            </tr>

            {/* Repayment Options */}
            <tr className="border-b border-gray-300">
              <td className="p-3 text-base font-semibold border-r">
                Repayment Options
              </td>
              <td className="p-3 text-base font-normal text-center">
                {selectedPayment?.repaymentOptions}
              </td>
            </tr>

            {/* Minimum Order Amount */}
            <tr className="border-b border-gray-300">
              <td className="p-3 text-base font-semibold whitespace-nowrap border-r">
                Minimum Order Amount
              </td>
              <td className="p-3 text-base font-normal text-center">
                {selectedPayment?.minOrderAmount}
              </td>
            </tr>

            {/* Early Payoff */}
            <tr className="border-b border-gray-300">
              <td className="p-3 text-base font-semibold border-r">
                Early Payoff
              </td>
              <td className="p-3 text-center">
                {selectedPayment?.earlyPayoff ? (
                  <IoCheckmarkOutline className="text-2xl text-green-500 text-center mx-auto" />
                ) : (
                  <RxCross2 className="text-2xl text-primary text-center mx-auto" />
                )}
              </td>
            </tr>

            {/* Late Fees (Last Row - No Border) */}
            <tr>
              <td className="p-3 text-base font-semibold border-r">
                Late Fees
              </td>
              <td className="p-3 text-center">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <p>
                    {selectedPayment?.lateFees.isTrue ? (
                      <IoCheckmarkOutline className="text-2xl text-green-500 text-center mx-auto" />
                    ) : (
                      <RxCross2 className="text-2xl text-primary text-center mx-auto" />
                    )}
                  </p>
                  {selectedPayment?.lateFees.content}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
