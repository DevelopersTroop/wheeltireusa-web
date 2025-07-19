'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { OrderData, OrderListResult, TOrder, ProductInfo } from './orderTypes';
import { apiBaseUrl } from '@/utils/api';

export const useOrders = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [orderData, setOrderData] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders on component mount
  useEffect(() => {
    // If user is not authenticated, redirect to login page
    if (!user) {
      return router.push('/login');
    }

    (async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        // Making API request to fetch orders
        const orderListResponse = await fetch(
          `${apiBaseUrl}/orders/personal-list`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify({
              email: user.email,
              all: true,
              sort: [
                {
                  whom: 'updatedAt',
                  order: 'desc',
                },
              ],
            }),
          }
        );

        // Handle failed API request
        if (!orderListResponse.ok) {
          throw new Error('Failed to fetch orders');
        }

        // Parsing the response
        const orderListResult: OrderListResult = await orderListResponse.json();

        setLoading(false);

        // If orders are fetched successfully
        if (orderListResult?.statusCode === 200) {
          // Mapping the orders to match the required format
          const orders: OrderData[] = orderListResult?.data?.orders.map(
            (order: TOrder) => {
              const items = order?.data?.productsInfo.reduce(
                (sum: number, product: ProductInfo) => sum + product.quantity,
                0
              );

              return {
                order_id: `#${order.id}`,
                orderId: order.orderId,
                date: new Date(order.createdAt).toLocaleDateString(),
                status: order.status,
                total: `$${order?.data?.totalCost}`,
                discount: `${order.data?.discount}` || 0,
                net_total: `${order?.data?.netCost}` || 0,
                items,
              };
            }
          );
          setOrderData(orders); // Update order data state
        } else {
          setError(orderListResult.message || 'Failed to fetch orders');
        }
      } catch (error: unknown) {
        // console.error("Error fetching orders:", error);
        setLoading(false);
        if (error instanceof Error) {
          setError(error.message ?? 'An unexpected error occurred');
        } else {
          setError('An unexpected error occurred');
        }
      }
    })();
  }, []);

  return { orderData, loading, error };
};
