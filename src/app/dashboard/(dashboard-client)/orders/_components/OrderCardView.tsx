// import { OrderData } from '../types/orderTypes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { OrderData } from './orderTypes';

interface Props {
  orders: OrderData[];
}

const OrderCardView = ({ orders }: Props) => {
  const router = useRouter();

  return (
    <div className="block md:hidden">
      {orders.map((order) => (
        <div
          key={order.order_id}
          className="bg-white text-sm border border-gray-200 rounded-lg mb-4 p-4 shadow-sm"
        >
          <div className="flex justify-between mb-2">
            <span className="text-gray-500 font-semibold">Order</span>
            <Link href={`/dashboard/orders/${order.order_id.replace('#', '')}`}>
              <span className="text-red-600 font-bold">{order.order_id}</span>
            </Link>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500 font-semibold">Date</span>
            <Link href={`/dashboard/orders/${order.order_id.replace('#', '')}`}>
              {order.date}
            </Link>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500 font-semibold">Status</span>
            <Link href={`/dashboard/orders/${order.order_id.replace('#', '')}`}>
              {order.status}
            </Link>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500 font-semibold">Total</span>
            <Link href={`/dashboard/orders/${order.order_id.replace('#', '')}`}>
              <span className="text-red-600">{order.total}</span> for{' '}
              {order.items} items
            </Link>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500 font-semibold">Discount</span>
            <Link href={`/dashboard/orders/${order.order_id.replace('#', '')}`}>
              {order.discount}
            </Link>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500 font-semibold">Net Amount</span>
            <Link href={`/dashboard/orders/${order.order_id.replace('#', '')}`}>
              {order.net_total}
            </Link>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500 font-semibold">Actions</span>
            <button
              className="py-2 px-8 bg-primary text-white font-semibold rounded-xl hover:bg-orange-600"
              onClick={() =>
                router.push(
                  `/dashboard/orders/${order.order_id.replace('#', '')}`
                )
              }
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCardView;
