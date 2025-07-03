import Link from 'next/link';
import { useRouter } from 'next/navigation';
import OrdersTableHeader from './OrdersTableHeader';
import { OrderData } from './orderTypes';

interface Props {
  orders: OrderData[];
}

const OrderTableView = ({ orders }: Props) => {
  const router = useRouter();

  if (orders.length === 0) {
    return (
      <table className="min-w-full bg-white border-x border-b p-8">
        <OrdersTableHeader />
        <tbody>
          <tr>
            <td
              colSpan={7}
              className="py-5 px-4 border-b text-center text-gray-500"
            >
              <div className="text-lg font-semibold">
                You have not made any orders yet.
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className="min-w-full bg-white border-x border-b p-8">
      <OrdersTableHeader />
      <tbody>
        {orders.map((order) => (
          <tr key={order.order_id}>
            <td className="py-5 px-4 border-b text-red-600 relative">
              <div
                className="w-[66px] overflow-hidden whitespace-nowrap text-ellipsis hover:cursor-pointer"
                title={order.order_id}
              >
                <Link
                  href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
                >
                  {' '}
                  {order.order_id}{' '}
                </Link>
              </div>
            </td>
            <td className="py-5 px-4 border-b">
              <Link
                href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
              >
                {order.date}
              </Link>
            </td>
            <td className="py-5 px-4 border-b">
              <Link
                href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
              >
                {order.status}
              </Link>
            </td>
            <td className="py-5 px-4 border-b text-red-600">
              <Link
                href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
              >
                {order.total} for {order.items} items
              </Link>
            </td>
            <td className="py-5 px-4 border-b">
              <Link
                href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
              >
                {order.discount}
              </Link>
            </td>
            <td className="py-5 px-4 border-b">
              <Link
                href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
              >
                {order.net_total}
              </Link>
            </td>
            <td className="py-5 px-4 border-b">
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTableView;
