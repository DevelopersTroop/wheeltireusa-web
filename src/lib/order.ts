import { useCheckout } from "@/context/checkoutContext";
import { apiInstance } from "@/redux/apis/base";
import { useTypedSelector } from "@/redux/store";
import { TOrder } from "@/types/order";
import { createSnapFinanceData } from "./snapFinance";
import { apiBaseUrl } from "@/utils/api";
import { toast } from "sonner";


export const getLatestOrderId = async () => {
  const { data: response } = await apiInstance.get<{
    data: {
      data: {
        order: TOrder;
      };
    };
  }>("/orders/last-order");
  console.log("TCL: getLatestOrderId -> response", response);

  return response.data.data.order.orderId;
};

export const useSnapFinanceOrderData = () => {
  const {
    billingAddress,
    shippingAddress,
    orderInfo,
    selectedOptionTitle,
    affiliateDiscount,
    productBasedDiscountApplied,
    isCouponApplied,
    shippingMethod,
    selectedDealerInfo,
    selectedDealer,
    requestedDealer,
    isAccountCreated,
    productsInfo,
    couponCode,
    couponDiscount,
    localDealerSelected,
    localDealerInfo,
    vehicleInformation,
    discount,
    productBasedDiscount,
    existingOrderId,
    referralCode,
    dealerDiscountApplied,
    paymentStatus,
    selectedOption,
    orderId,
  } = useTypedSelector((state) => state.persisted.checkout);
  const { cartType, subTotalCost, totalCost } = useCheckout();

  const orderData = {
    orderInfo,
    shippingMethod,
    shippingAddress,
    billingAddress,
    discount,
    cartType,
    totalCost: parseFloat(subTotalCost).toFixed(2),
    netCost: parseFloat(totalCost).toFixed(2),
    selectedDealer,
    selectedOptionTitle,
    requestedDealer,
    selectedDealerInfo,
    deliveryCharge: cartType === "CENTER_CAP_ONLY" ? 14.99 : 0,
    isAccountCreated,
    productsInfo,
    isCouponApplied,
    couponCode,
    couponDiscount,
    user: null,
    localDealerSelected,
    localDealerInfo,
    paymentMethod: "Snap Finance",
    vehicleInformation,
    productBasedDiscount,
    productBasedDiscountApplied,
    existingOrderId,
    referralCode,
    affiliateDiscount,
  };

  // Prepare the transaction data for Snap Finance
  const getSnapFinanceTransactionData = (newOrderId: string) => {
    return createSnapFinanceData(newOrderId, {
      ...orderData,
      dealerDiscountApplied,
      paymentStatus,
      selectedOption,
      user: undefined
    });
  };

  const placeOrderWithSnapFinance = async (
    applicationId: string,
    snapStatus: string
  ) => {
    try {
      const { productsInfo, ...rest } = orderData;

      const response = await fetch(
        `${apiBaseUrl}/payments/snap-finance/checkout`,
        // `http://localhost:8080/api/v1/payments/create-paypal-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderData: {
              ...rest,
              snapStatus,
              orderId,
              productsInfo,
              applicationId,
            },
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();

        const parsedError = JSON.parse(error);

        if (parsedError.errors && Array.isArray(parsedError.errors)) {
          throw new Error(parsedError.errors[0].message);
        }

        throw new Error(response.statusText);
      }

      const data = await response.json();

      if (data.success_url) {
        window.location.href = data.success_url;
      }
    } catch (err: any) {
      toast.error("Error", {
        description: err.message,
      });
    }
  };

  return {
    getSnapFinanceTransactionData,
    placeOrderWithSnapFinance,
  };
};
