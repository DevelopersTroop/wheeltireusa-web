
import { apiInstance } from "@/redux/apis/base";
import { emptyCart } from "@/redux/features/cartSlice";
import { mapOrderDataToCheckout } from "@/redux/features/checkoutSlice";
import { useAppDispatch } from "@/redux/store";
import { TOrder } from "@/types/order";
import { useRouter } from "next/navigation";

export const mapPendingOrderToCheckout = async (
  dispatch: ReturnType<typeof useAppDispatch>,
  orderId: string,
  router: ReturnType<typeof useRouter>,
  coupon: string | undefined | null
) => {
  try {
    const response = await apiInstance.get<{ data: { order: TOrder } }>(
      `/orders/checkout-order/${orderId}`
    );

    if (!response?.data?.data?.order?.id) {
      throw new Error("Order not found");
    }

    const { data, orderId: id } = response.data.data.order;

    dispatch(emptyCart());

    dispatch(
      mapOrderDataToCheckout({
        ...data,
        existingOrderId: id,
        orderSuccessData: undefined,
        newCoupon: coupon,
        user: undefined,
        orderId: ''
      })
    );
  } catch (error) {
    router.push("/cart");
  }
};
