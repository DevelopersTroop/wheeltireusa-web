"use client";

import { TOrder } from "@/types/order";
import { usePDF } from "@react-pdf/renderer";
import { format } from "date-fns";
import { PrinterIcon } from "lucide-react";
import OrderInvoicePDF from "./OrderInvoicePDF";

// Props interface for the OrderConfirmation component
interface OrderConfirmationProps {
  email?: string;
  orderData: TOrder | undefined;
}

// OrderConfirmation Component
export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  email,
  orderData,
}) => {
  // Generate a PDF instance using the OrderInvoicePDF component
  const [instance] = usePDF({ document: <OrderInvoicePDF order={orderData} /> });

  // Function to handle printing the order invoice
  const handlePrint = async () => {
    const blob =  instance.blob;
    if (blob) {
      const pdfUrl = URL.createObjectURL(blob);
      
      // Create an invisible iframe to trigger the print dialog
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = pdfUrl;
      document.body.appendChild(iframe);
  
      // Trigger the print dialog once the iframe loads
      iframe.onload = () => {
        iframe?.contentWindow?.print();
        URL.revokeObjectURL(pdfUrl); // Clean up the object URL
      };
    } else {
      console.error("Failed to generate PDF.");
    }
  };

  return (
    <div>
      {/* Order Confirmation Header */}
      <div className="space-y-4 pt-3 pb-5">
        <h2 className="font-bold text-xl">Thank You For Your Order!</h2>
        <p className="text-gray-700">
          Order Received:{" "}
          <span className="font-bold">
            {format(new Date(), "EEE, MM/dd h:mm a")}
          </span>
        </p>
      </div>
      {/* Order Details Section */}
      <div className="space-y-4 pb-14 lg:pb-24">
        <p className="text-gray-700">
          Thanks for your order! We're shipping your item(s) to the address you
          provided.{" "}
          <span className="font-bold">
            Please review important details regarding your order below
          </span>
        </p>
        <ul className="space-y-4 list-disc text-gray-700 pl-5 marker:text-primary">
          <li>
            An order confirmation email will be sent to {email}. Make sure you
            add no-reply@amaniforged.com to your list of approved senders.
          </li>
          <li>
            If you have questions about the items in your order, please give our
            customer service team a call at 1-800-123-4567 during our sales and
            customer care phone hours.
          </li>
          <li>
            All packages shipping from one distribution center leave together.
            If your order ships in multiple packages, packages may be separated
            by the carrier and delivered on different days. In most cases,
            packages not in the first delivery will be delivered the following
            business day. Orders that are shipped from more than one
            distribution center may arrive at different times.
          </li>
        </ul>

        {/* <PDFDownloadLink
          document={<OrderInvoicePDF order={orderData} />}
          fileName="invoice.pdf"
        > */}
          <div onClick={handlePrint} className="text-black font-bold flex items-center gap-2 hover:opacity-80 mt-4 transition-opacity cursor-pointer">
            <PrinterIcon className="text-gray-700" />
            <span>Print Order</span>
          </div>
        {/* </PDFDownloadLink> */}
      </div>
    </div>
  );
};
