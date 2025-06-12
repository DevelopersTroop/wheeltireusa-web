'use client';

import { useCheckout } from '@/context/checkoutContext';
import { apiInstance } from '@/redux/apis/base';
import { useTypedSelector } from '@/redux/store';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useStripeCheckout = () => {
  const user = {};
  const {
    billingAddress,
    shippingAddress,
    shippingMethod,
    selectedOptionTitle,
    selectedDealerInfo,
    selectedDealer,
    discount,
    orderInfo,
    requestedDealer,
    isAccountCreated,
    productsInfo,
    isCouponApplied,
    couponCode,
    couponDiscount,
    localDealerSelected,
    localDealerInfo,
    vehicleInformation,
    productBasedDiscount,
    productBasedDiscountApplied,
    existingOrderId,
    referralCode,
    affiliateDiscount,
    cartType,
  } = useTypedSelector((state) => state.persisted.checkout);
  const { netCost, subTotalCost } = useCheckout();
  const initiateCheckout = async (paymentMethod: string) => {
    try {
      const orderData = {
        orderInfo,
        shippingMethod,
        shippingAddress,
        billingAddress,
        discount,
        totalCost: parseFloat(netCost).toFixed(2),
        netCost: parseFloat(subTotalCost).toFixed(2),
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
        user,
        localDealerSelected,
        localDealerInfo,
        paymentMethod,
        vehicleInformation,
        productBasedDiscount,
        productBasedDiscountApplied,
        existingOrderId,
        referralCode,
        affiliateDiscount,
      };

      const response = await apiInstance.post(
        '/payments/stripe/create-checkout-session',
        {
          orderData,
        }
      );

      const result = response;
      if (result.data.data.data.sessionUrl) {
        window.location.href = result.data.data.data.sessionUrl;
      }
    } catch (err) {
      const error = err as AxiosError<{ errors: string[]; message: string }>;
      toast('Error', {
        description: error.response?.data.message,
      });
    }
  };

  return { initiateCheckout };
};
