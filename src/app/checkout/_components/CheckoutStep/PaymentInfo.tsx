"use client";

import { CreditCard } from "lucide-react";

export interface PaymentData {
  _id: string;
  email: string;
  orderId: string;
  currency: string;
  amount: number;
  paymentType: string;
  data: {
    sessionId: string;
    paymentIntent: string;
    status: string;
    paymentGateway: string;
    transactionId: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const PaymentInfo: React.FC<{ paymentData: PaymentData }> = ({
  paymentData,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="flex items-start gap-4 font-bold">
      <div className="relative mt-1 flex h-5 w-5 items-center justify-center rounded-full text-white">
        <CreditCard className="h-5 w-5 text-[#210203]" />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg">Payment Info</h2>
        <div className="space-y-1 text-[#210203]">
          <p className="font-light">Order ID: {paymentData.orderId}</p>
          {/* <p className="font-light">Amount: {formatCurrency(paymentData.amount, paymentData.currency)}</p> */}
          <p className="font-light">
            Payment Method: {paymentData.data.paymentGateway}
          </p>
          <p className="font-light">Status: {paymentData.data.status}</p>
          {/* <p className="font-light">Transaction ID: {paymentData.data.transactionId}</p> */}
          <p className="font-light">Email: {paymentData.email}</p>
          <p className="font-light">
            Date: {formatDate(paymentData.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
