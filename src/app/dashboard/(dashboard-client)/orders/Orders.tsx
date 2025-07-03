'use client';

import LoadingSpinner from '@/components/ui/loading-spinner/loading-spinner';
import { useOrders } from './_components/useOrders';
import OrderTableView from './_components/OrderTableView';
import OrderCardView from './_components/OrderCardView';

const Orders = () => {
  const { orderData, loading, error } = useOrders();

  if (loading) return <LoadingSpinner />;
  if (error)
    return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

  return (
    <div>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <OrderTableView orders={orderData} />
      </div>

      {/* Mobile Card View */}
      <OrderCardView orders={orderData} />
    </div>
  );
};

export default Orders;
