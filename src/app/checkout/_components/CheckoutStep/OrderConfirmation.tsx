'use client';

import { TOrder } from '@/types/order';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { PrinterIcon } from 'lucide-react';
import OrderInvoicePDF from './OrderInvoicePDF';

interface OrderConfirmationProps {
  email?: string;
  orderData: TOrder | undefined;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  email,
  orderData,
}) => {
  return (
    <div>
      <div className="space-y-4 pb-5 pt-3">
        <h2 className="text-xl font-bold">Thank You For Your Order!</h2>
        <p className="text-gray-700">
          Order Received:{' '}
          <span className="font-bold">
            {format(new Date(), 'EEE, MM/dd h:mm a')}
          </span>
        </p>
      </div>
      <div className="space-y-4 pb-14 lg:pb-24">
        <p className="text-gray-700">
          Thanks for your order! {"We're"} shipping your item(s) to the address
          you provided.{' '}
          <span className="font-bold">
            Please review important details regarding your order below
          </span>
        </p>
        <ul className="list-disc space-y-4 pl-5 text-gray-700 marker:text-primary">
          <li>
            An order confirmation email will be sent to {email}. Make sure you
            add no-reply@ktcaudio.com to your list of approved senders.
          </li>
          <li>
            If you have questions about the items in your order, please give our
            customer service team a call at 1-303-695-6305 during our sales and
            customer care phone hours.
          </li>
          {/* <li>
            All packages shipping from one distribution center leave together.
            If your order ships in multiple packages, packages may be separated
            by the carrier and delivered on different days. In most cases,
            packages not in the first delivery will be delivered the following
            business day. Orders that are shipped from more than one
            distribution center may arrive at different times.
          </li> */}
        </ul>

        <PDFDownloadLink
          document={<OrderInvoicePDF order={orderData} />}
          fileName="invoice.pdf"
        >
          <div className="mt-4 flex items-center gap-2 font-bold text-black transition-opacity hover:opacity-80">
            <PrinterIcon className="text-gray-700" />
            <span>Print Order</span>
          </div>
        </PDFDownloadLink>
      </div>
    </div>
  );
};
