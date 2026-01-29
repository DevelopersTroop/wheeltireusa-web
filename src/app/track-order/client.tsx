'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useTrackByEmailMutation,
  useTrackByOrderMutation,
} from '@/redux/apis/orderTracking';
import { format } from 'date-fns';
import { CheckCircle, Clock, Loader2, Package, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState('');
  const [zipCode1, setZipCode1] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode2, setZipCode2] = useState('');

  const [
    trackByNumber,
    { data: orderData, isLoading: isLoadingOrder, error: orderError },
  ] = useTrackByOrderMutation();
  const [
    trackByEmail,
    { data: ordersList, isLoading: isLoadingOrders, error: ordersError },
  ] = useTrackByEmailMutation();

  const handleTrack = async () => {
    if (orderNumber && zipCode1) {
      await trackByNumber({ orderNumber, zipCode: zipCode1 });
    }
  };

  const handleView = async () => {
    if (email && zipCode2) {
      await trackByEmail({ email, zipCode: zipCode2 });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'pending':
      case 'processing':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Order Tracking Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Order Tracking
        </h1>

        <Card className="shadow-sm">
          <CardContent className="p-8">
            <div className="flex flex-wrap gap-4 items-end mb-6">
              <div className="flex-1 min-w-[200px]">
                <Label
                  htmlFor="orderNumber"
                  className="text-sm font-medium text-gray-700 mb-2"
                >
                  Order Number:
                </Label>
                <Input
                  id="orderNumber"
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full h-12"
                  disabled={isLoadingOrder}
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label
                  htmlFor="zipCode1"
                  className="text-sm font-medium text-gray-700 mb-2"
                >
                  Billing ZIP/Postal Code:
                </Label>
                <Input
                  id="zipCode1"
                  type="text"
                  value={zipCode1}
                  onChange={(e) => setZipCode1(e.target.value)}
                  className="w-full h-12"
                  disabled={isLoadingOrder}
                />
              </div>

              <Button
                onClick={handleTrack}
                className="bg-red-600 hover:bg-red-700 text-white px-8 h-12"
                disabled={isLoadingOrder || !orderNumber || !zipCode1}
              >
                {isLoadingOrder ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Tracking...
                  </>
                ) : (
                  'Track'
                )}
              </Button>
            </div>

            {!isLoadingOrder && orderError ? (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>
                  {(orderError as any)?.data?.message ||
                    'Order not found. Please verify your order number and ZIP code.'}
                </AlertDescription>
              </Alert>
            ) : null}

            {orderData?.order ? (
              <Card className="mb-6 border-2 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Order #{orderData.order.orderId}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Placed on{' '}
                        {format(orderData.order.createdAt, 'dd-MMM-yyy')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(orderData.order.status)}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                          orderData.order.status
                        )}`}
                      >
                        {orderData.order.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Shipping Address
                      </p>
                      <p className="text-sm text-gray-600">
                        {orderData.order.data.shippingAddress.address1}
                        {orderData.order.data.shippingAddress.address2 &&
                          `, ${orderData.order.data.shippingAddress.address2}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {orderData.order.data.shippingAddress.city},{' '}
                        {orderData.order.data.shippingAddress.cityState}{' '}
                        {orderData.order?.data?.shippingAddress.zipCode}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Order Summary
                      </p>
                      <p className="text-sm text-gray-600">
                        Items: {orderData.order?.data?.productsInfo.length}
                      </p>
                      <p className="text-sm text-gray-600">
                        Total: ${orderData.order?.data?.totalWithTax}
                      </p>
                      {orderData.order?.data?.shippingMethod && (
                        <p className="text-sm text-gray-600">
                          Shipping:{' '}
                          {orderData.order?.data?.shippingMethod?.title}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            <Accordion type="single" collapsible className="mb-6">
              <AccordionItem value="order-help" className="border-none">
                <AccordionTrigger className="text-blue-600 hover:text-blue-800 text-sm py-2 hover:no-underline">
                  Need Order Number?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700 pt-4">
                  <p className="mb-4">
                    Please provide the information requested to view your order
                    history. If you have a problem using this form, please email{' '}
                    <a
                      href="mailto:sales@wheeltireusa.com"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      sales@wheeltireusa.com
                    </a>
                  </p>
                  <div className="flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-[200px]">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700 mb-2"
                      >
                        Order Email Address:
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12"
                        disabled={isLoadingOrders}
                      />
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <Label
                        htmlFor="zipCode2"
                        className="text-sm font-medium text-gray-700 mb-2"
                      >
                        Billing ZIP/Postal Code:
                      </Label>
                      <Input
                        id="zipCode2"
                        type="text"
                        value={zipCode2}
                        onChange={(e) => setZipCode2(e.target.value)}
                        className="w-full h-12"
                        disabled={isLoadingOrders}
                      />
                    </div>

                    <Button
                      onClick={handleView}
                      className="bg-red-600 hover:bg-red-700 text-white px-8 h-12"
                      disabled={isLoadingOrders || !email || !zipCode2}
                    >
                      {isLoadingOrders ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        'View'
                      )}
                    </Button>
                  </div>
                  {ordersError ? (
                    <Alert variant="destructive" className="mt-4">
                      <AlertDescription>
                        {(ordersError as any)?.data?.message ||
                          'No orders found. Please verify your email and ZIP code.'}
                      </AlertDescription>
                    </Alert>
                  ) : null}

                  {/* Orders List Display */}
                  {ordersList?.orders && ordersList.orders.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Your Orders</h4>
                      {ordersList.orders.map((order) => (
                        <Card
                          key={order.orderId}
                          className="border border-gray-200"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">
                                  Order #{order.orderId}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {format(order.createdAt, 'dd-MMM-yyy')}{' '}
                                  {order.productsCount}
                                  items
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  {order.status}
                                </span>
                                <p className="font-medium text-gray-900">
                                  ${order.totalWithTax}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Service Section */}
      <div className="border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="flex gap-4">
                <div className="w-32 h-40 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-linear-to-br from-blue-100 to-blue-200"></div>
                </div>
                <div className="w-32 h-40 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-linear-to-br from-cyan-100 to-cyan-200"></div>
                </div>
                <div className="w-32 h-40 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200"></div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                SERVICE WITH A SMILE
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Need help choosing the right products for your vehicle?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
