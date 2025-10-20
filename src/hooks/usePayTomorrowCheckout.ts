'use client';
import { useTypedSelector } from '@/redux/store';
import { useCheckout } from '@/context/checkoutContext';
import useAuth from './useAuth';
import { apiBaseUrl } from '@/utils/api';
import { toast } from 'sonner';

export const usePaytomorrowCheckout = () => {
  const { cartType, subTotalCost, totalCost } = useCheckout();
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
    vehicleInformation,
    productBasedDiscount,
    productBasedDiscountApplied,
    existingOrderId,
    referralCode,
    affiliateDiscount,
  } = useTypedSelector((state) => state.persisted.checkout);
  const { user } = useAuth();

  const initiatePaytomorrowCheckout = async () => {
    try {
      const orderData = {
        orderInfo,
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
        isAccountCreated,
        shippingMethod,
        deliveryCharge: cartType === 'CENTER_CAP_ONLY' ? 14.99 : 0,
        productsInfo,
        isCouponApplied,
        couponCode,
        couponDiscount,
        user,
        vehicleInformation,
        productBasedDiscount,
        productBasedDiscountApplied,
        existingOrderId,
        referralCode,
        affiliateDiscount,
      };

      const response = await fetch(
        `${apiBaseUrl}/payments/pay-tomorrow/checkout`,
        // `http://localhost:8080/api/v1/payments/create-paypal-payment`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderData,
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

      const result = await response.json();

      window.location.href = result.data.approvalUrl;
    } catch (err: any) {
      toast.error('Error', {
        description: err.message,
      });
    }
  };

  return { initiatePaytomorrowCheckout };
};
