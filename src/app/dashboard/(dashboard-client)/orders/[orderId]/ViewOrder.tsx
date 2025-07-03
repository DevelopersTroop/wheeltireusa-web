'use client';
// import { PrinterIcon } from "lucide-react";
import LoadingSpinner from '@/components/ui/loading-spinner/loading-spinner';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PrinterIcon } from 'lucide-react';
import OrderInvoicePDF from '@/app/checkout/_components/orderInvoicePdf';
import { useOrderDetails } from './_components/useOrderDetails';

const ViewOrder = () => {
  const { order, loading, error } = useOrderDetails();

  // Return loading spinner if the order is still loading
  if (loading) return <LoadingSpinner />;

  // Return error message if fetching order failed
  if (error) return <p>Error: {error}</p>;

  // Main component rendering order details and invoice PDF download link
  return (
    <div className="space-y-4">
      {order && (
        <>
          <div className="border-x border-b p-5 pr-10">
            <p className="text-base">
              <span className="bg-yellow-100">{order._id}</span> was placed on{' '}
              <span className="bg-yellow-100">
                {new Date(order.createdAt).toDateString()}
              </span>{' '}
              and is currently{' '}
              <span className="bg-yellow-100">{order.status}</span>.
            </p>
          </div>

          <div>
            <div className="border-x border-b p-5 pr-10 space-y-3">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Order details</h1>
                <PDFDownloadLink
                  document={<OrderInvoicePDF order={order} />}
                  fileName="invoice.pdf"
                >
                  <div className="text-black font-bold flex items-center gap-2 hover:opacity-80 mt-4 transition-opacity">
                    <PrinterIcon className="text-gray-700 text-xl" />
                    <span>Download Invoice</span>
                  </div>
                </PDFDownloadLink>
              </div>
              <div className="flex justify-between">
                <h2 className="text-sm uppercase font-bold">Product</h2>
                <h2 className="text-sm uppercase font-bold">Total</h2>
              </div>
            </div>

            <div className="border p-5 pr-10 space-y-3">
              {order.data.productsInfo.map((product, index) => {
                return (
                  <div
                    key={`${product._id} ${index}`}
                    className="border-b pb-3 mb-3"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="space-y-1">
                        <p className="text-lg font-bold text-gray-800">
                          {product?.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {' '}
                          <span className="font-medium">SKU:</span>{' '}
                          {product?.sku}
                        </p>
                        <p className="text-sm text-gray-600">
                          {' '}
                          <span className="font-medium">Category:</span>{' '}
                          {product?.category?.title}
                        </p>
                        {/* {product?.vehicleInformation?.trim() && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Vehicle Info:</span>{' '}
                            {product.vehicleInformation}
                          </p>
                        )} */}
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Cart Package:</span>{' '}
                          {product?.cartPackage}
                        </p>
                        {/* <p className="text-sm text-gray-600"><span className="font-medium">Max Inventory:</span> {product?.maxInventory}</p> */}
                        {/* <p className="text-sm text-gray-600"><span className="font-medium">Inventory Step:</span> {product?.inventoryStep}</p> */}
                        {/* <p className="text-sm text-gray-600"><span className="font-medium">Min Inventory:</span> {product?.minInventory}</p> */}
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Quantity:</span>{' '}
                          {product?.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Price:</span> $
                          {product?.price}
                        </p>
                      </div>
                    </div>
                    <p className="text-right text-lg text-red-600">
                      ${(product?.price ?? 0) * (product?.quantity ?? 0)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="border p-5 pr-10 space-y-3">
              <div className="flex justify-between space-x-2">
                <p className="text-sm uppercase font-bold"> Subtotal </p>
                <p className="text-sm text-red-600">
                  {/* ${order?.data?.productsInfo.reduce((acc, product) => acc + product.price * product.quantity, 0)} */}
                  ${order?.data?.totalCost}
                </p>
              </div>
              {/* <div className="flex justify-between space-x-2">
                <p className="text-sm uppercase font-bold"> Shipping </p>
                <p className="text-sm">
                    ${order.data.shippingMethod.title}
                </p>
              </div> */}
              <div className="flex justify-between space-x-2">
                <p className="text-sm uppercase font-bold">discount</p>
                <p className="text-sm text-red-600">${order?.data?.discount}</p>
              </div>
              <div className="flex justify-between space-x-2">
                <p className="text-sm uppercase font-bold">Shipping Charge</p>
                <p className="text-sm text-red-600">
                  ${order.data.deliveryCharge}
                </p>
              </div>
              <div className="flex justify-between space-x-2">
                <p className="text-sm uppercase font-bold"> Total </p>
                <p className="text-sm text-red-600">
                  {/* ${order.data.productsInfo.reduce((acc, product) => acc + product.price * product.quantity, 0) + order.data.shippingCharge} */}
                  ${order.data.netCost}
                </p>
              </div>
            </div>
          </div>

          {order?.data?.shippingAddress?.address1 ? (
            <div className="border-[#eee] dark:border-dark-3 rounded-md px-4">
              <h5 className="font-medium text-dark dark:text-white mb-3">
                Shipping Address
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Name:</strong>{' '}
                {order.data?.shippingAddress?.name || 'Not Available'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Email:</strong>{' '}
                {order?.data?.shippingAddress?.email || 'Not Available'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Phone:</strong>{' '}
                {order?.data?.shippingAddress?.phone || 'Not Available'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Address:</strong>{' '}
                {order?.data?.shippingAddress?.address1 || 'Not Available'}
              </p>
              {order?.data?.shippingAddress?.address2 && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Address 2:</strong>{' '}
                  {order?.data?.shippingAddress.address2}
                </p>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>City:</strong>{' '}
                {[
                  order?.data?.shippingAddress?.zipCode,
                  order?.data?.shippingAddress?.cityState,
                  order?.data?.shippingAddress?.country,
                ]
                  .filter(Boolean)
                  .join(', ') || 'Not Available'}
              </p>
            </div>
          ) : (
            <p className="p-4 text-md font-bold">
              Shipping address information available
            </p>
          )}

          {order?.data?.billingAddress?.address1 ? (
            <div className="border-[#eee] dark:border-dark-3 rounded-md px-4">
              <h5 className="font-medium text-dark dark:text-white mb-3">
                Billing Address
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Name:</strong>{' '}
                {order?.data?.billingAddress?.name || 'Not Available'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Email:</strong>{' '}
                {order?.data?.billingAddress?.email || 'Not Available'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Phone:</strong>{' '}
                {order?.data?.billingAddress?.phone || 'Not Available'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Address:</strong>{' '}
                {order?.data?.billingAddress?.address1 || 'Not Available'}
              </p>
              {order?.data?.billingAddress?.address2 && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Address 2:</strong>{' '}
                  {order?.data?.billingAddress.address2}
                </p>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>City:</strong>{' '}
                {[
                  order?.data?.billingAddress?.zipCode,
                  order?.data?.billingAddress?.cityState,
                  order?.data?.billingAddress?.country,
                ]
                  .filter(Boolean)
                  .join(', ') || 'Not Available'}
              </p>
            </div>
          ) : (
            <p className="p-4 text-md font-bold">
              Billing address information available
            </p>
          )}

          <div className="border-[#eee] dark:border-dark-3 rounded-md px-4">
            <h5 className="font-medium text-dark dark:text-white mb-3">
              Shipping Method
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Method:</strong>{' '}
              {order?.data?.selectedOptionTitle || 'N/A'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Dealer Phone:</strong>{' '}
              {order?.data?.selectedDealer || 'N/A'}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewOrder;
