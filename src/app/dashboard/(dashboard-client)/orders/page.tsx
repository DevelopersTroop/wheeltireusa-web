'use client';

// Importing necessary hooks and components
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const oldOrdersData: OrderData[] = [
  {
    order_id: '#174849',
    date: 'November 18, 2024',
    status: 'Cancelled',
    total: '$120.00',
    discount: '$10.00',
    net_total: '$110.00',
    items: 0,
  },
  {
    order_id: '#174850',
    date: 'November 19, 2024',
    status: 'On hold',
    total: '$2,345.67',
    discount: '$50.00',
    net_total: '$2,295.67',
    items: 8,
  },
];

// Interface for product information
// interface ProductInfo {
//   price: number;
//   quantity: number;
//   // Add other fields as per your product info structure
// }

// Interface for individual order data
interface OrderData {
  order_id: string;
  date: string;
  status: string;
  total: string;
  discount: number | string;
  net_total: number | string;
  items: number | string;
}

// Interface for API response
// interface OrderListResult {
//   statusCode: number;
//   response: boolean;
//   message: string;
//   data: {
//     total: number;
//     pages: number;
//     orders: any;
//   };
// }

const Order = () => {
  // Fetching authenticated user from the custom hook
  // const { user } = useAuth();

  // State to hold orders, loading, and error states
  // const [orderData, setOrderData] = useState<OrderData[]>([]);
  // const [loading, setLoading] = useState(true);
  const router = useRouter();
  // const [error, setError] = useState<string | null>(null);

  // Fetch orders on component mount
  // useEffect(() => {

  //   // If user is not authenticated, redirect to login page
  //   if (!user) {
  //     return router.push("/login");
  //   }
  //   (async () => {
  //     setLoading(true);
  //     setError(null); // Reset error state before fetching
  //     try {
  //       // Making API request to fetch orders
  //       const orderListResponse = await fetch(
  //         `${apiBaseUrl}/orders/personal-list`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${user.accessToken}`,
  //           },
  //           body: JSON.stringify({
  //             email: user.email,
  //             all: true,
  //             sort: [
  //               {
  //                 whom: "updatedAt",
  //                 order: "desc",
  //               },
  //             ],
  //           }),
  //         }
  //       );

  //       // Handle failed API request
  //       if (!orderListResponse.ok) {
  //         throw new Error("Failed to fetch orders");
  //       }

  //       // Parsing the response
  //       const orderListResult: OrderListResult = await orderListResponse.json();

  //       setLoading(false);

  //       // If orders are fetched successfully
  //       if (orderListResult?.statusCode === 200) {
  //         // Mapping the orders to match the required format
  //         const orders: OrderData[] = orderListResult?.data?.orders.map(
  //           (order: TOrder) => {
  //             const items = order?.data?.productsInfo.reduce(
  //               (sum: number, product: ProductInfo) => sum + product.quantity,
  //               0
  //             );

  //             return {
  //               order_id: `#${order._id}`,
  //               date: new Date(order.createdAt).toLocaleDateString(),
  //               status: order.status,
  //               total: `$${order?.data?.totalCost}`,
  //               discount: `$${order.data?.discount}` || 0,
  //               net_total: `$${order?.data?.netCost}` || 0,
  //               items,
  //             };
  //           }
  //         );
  //         setOrderData(orders); // Update order data state
  //       } else {
  //         setError(orderListResult.message || "Failed to fetch orders");
  //       }
  //     } catch (error: unknown) {
  //       // console.error("Error fetching orders:", error);
  //       setLoading(false);
  //       if (error instanceof Error) {
  //         setError(error.message ?? "An unexpected error occurred");
  //       } else {
  //         setError("An unexpected error occurred");
  //       }
  //     }
  //   })();
  // }, []);

  // // Return a loading spinner while data is being fetched
  // if (loading) return <LoadingSpinner />

  // // Return error message if fetching fails
  // if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* Table view for larger screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border-x border-b p-8">
          <thead>
            <tr className="text-start">
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Order
              </th>
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Date
              </th>
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Status
              </th>
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Total
              </th>
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Discount
              </th>
              <th className="py-5 px-4 border-b text-start uppercase text-bold whitespace-nowrap">
                Net Amount
              </th>
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {oldOrdersData.length > 0 ? (
              oldOrdersData.map((order) => (
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
                    {/* <div
                      className="absolute hidden bg-gray-800 text-white text-sm py-1 rounded shadow-md hover:block"
                      style={{ top: "-30px", left: "0", whiteSpace: "nowrap" }}
                    >
                      {order.order_id}
                    </div> */}
                  </td>

                  <td className="py-5 px-4 border-b">
                    {' '}
                    <Link
                      href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
                    >
                      {' '}
                      {order.date}{' '}
                    </Link>{' '}
                  </td>
                  <td className="py-5 px-4 border-b">
                    {' '}
                    <Link
                      href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
                    >
                      {' '}
                      {order.status}{' '}
                    </Link>{' '}
                  </td>
                  <td className="py-5 px-4 border-b">
                    <span className="text-red-600">
                      <Link
                        href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
                      >
                        {' '}
                        {order.total} for {order.items} items{' '}
                      </Link>
                    </span>
                  </td>
                  <td className="py-5 px-4 border-b">
                    {' '}
                    <Link
                      href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
                    >
                      {' '}
                      {order.discount}{' '}
                    </Link>{' '}
                  </td>
                  <td className="py-5 px-4 border-b">
                    {' '}
                    <Link
                      href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
                    >
                      {' '}
                      {order.net_total}{' '}
                    </Link>{' '}
                  </td>
                  <td className="py-5 px-4 border-b">
                    <button
                      className={
                        'py-2 px-8 bg-primary text-white disabled:bg-red-300 font-semibold rounded-xl hover:bg-orange-600'
                      }
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
              ))
            ) : (
              <>
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
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Card View for Mobile */}
      {oldOrdersData.length > 0 && (
        <div className="block md:hidden">
          {oldOrdersData.map((order) => (
            <div
              key={order.order_id}
              className="bg-white text-sm min-[380px]:text-base border border-gray-200 rounded-lg mb-4 p-2 min-[380px]:p-4 shadow-sm"
            >
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Order</span>
                <Link
                  href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
                >
                  {' '}
                  <span className="text-red-600 font-bold">
                    {order.order_id}
                  </span>{' '}
                </Link>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Date</span>
                <Link
                  href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
                >
                  {' '}
                  <span>{order.date}</span>{' '}
                </Link>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Status</span>
                <Link
                  href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
                >
                  {' '}
                  <span>{order.status}</span>{' '}
                </Link>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Total</span>
                <Link
                  href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
                >
                  {' '}
                  <span>
                    <span className="text-red-600">{order.total}</span> for{' '}
                    {order.items} items
                  </span>{' '}
                </Link>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Discount</span>
                <Link
                  href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
                >
                  {' '}
                  <span>{order.discount}</span>{' '}
                </Link>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Net Amount</span>
                <Link
                  href={`/dashboard/orders/${order.order_id.replace('#', '')}`}
                >
                  {' '}
                  <span>{order.net_total}</span>{' '}
                </Link>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Actions</span>
                <span>
                  <button
                    className={
                      'py-2 px-8 bg-primary text-white disabled:bg-red-300 font-semibold rounded-xl hover:bg-orange-600'
                    }
                    onClick={() =>
                      router.push(
                        `/dashboard/orders/${order.order_id.replace('#', '')}`
                      )
                    }
                  >
                    View
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
