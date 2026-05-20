import { useCheckout } from '@/context/checkoutContext';
import { apiInstance } from '@/redux/apis/base';
import { useTypedSelector } from '@/redux/store';
import { apiBaseUrl } from '@/utils/api';
import { toast } from 'sonner';
import { createSnapFinanceData } from './snapFinance';

export type TReserveCheckoutResult = {
  checkoutToken: string;
  orderId: string;
  internalId: number;
};

export const reserveCheckout = async (
  orderData: unknown
): Promise<TReserveCheckoutResult> => {
  const { data: response } = await apiInstance.post<{
    data: TReserveCheckoutResult;
  }>('/payments/reserve-checkout', { orderData });
  return response.data;
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
    deliveryCharge: cartType === 'CENTER_CAP_ONLY' ? 14.99 : 0,
    isAccountCreated,
    productsInfo,
    isCouponApplied,
    couponCode,
    couponDiscount,
    user: null,
    localDealerSelected,
    localDealerInfo,
    paymentMethod: 'Snap Finance',
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
      user: undefined,
    });
  };

  const placeOrderWithSnapFinance = async (
    applicationId: string,
    snapStatus: string,
    checkoutToken: string
  ) => {
    try {
      const { productsInfo, ...rest } = orderData;

      const response = await fetch(
        `${apiBaseUrl}/payments/snap-finance/checkout`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            checkoutToken,
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
      const successUrl = data?.data?.success_url ?? data?.success_url;

      if (successUrl) {
        window.location.href = successUrl;
      }
    } catch (err: any) {
      toast.error('Error', {
        description: err.message,
      });
    }
  };

  return {
    orderData,
    getSnapFinanceTransactionData,
    placeOrderWithSnapFinance,
  };
};
