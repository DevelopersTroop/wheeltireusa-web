'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiBaseUrl } from '@/utils/api';
import useAuth from '@/hooks/useAuth';
import { TOrder } from '@/types/order';

export const useOrderDetails = () => {
  const { orderId } = useParams();
  const { user } = useAuth();

  const [order, setOrder] = useState<TOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/orders/${orderId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
        const result = await response.json();

        if (response.ok && result.response) {
          setOrder(result.data.order);
        } else {
          throw new Error(result.message || 'Failed to fetch order details');
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, user]);

  return { order, loading, error };
};
