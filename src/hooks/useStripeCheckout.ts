'use client';
import { apiInstance } from '@/redux/apis/base';
import { useTypedSelector } from '@/redux/store';
import { useCheckout } from '@/context/checkoutContext';
import { toast } from 'sonner';
import useAuth from './useAuth';
import { Stripe, StripeElements } from '@stripe/stripe-js';

export const useStripeCheckout = () => {
  const { cartType, subTotalCost, totalCost } = useCheckout();
  const { user } = useAuth();
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
    funnelId,
    taxAmount,
    totalWithTax,
    paymentMethod,
    paymentIntentId,
  } = useTypedSelector((state) => state.persisted.checkout);
  const initiateCheckout = async (
    stripe: Stripe | null,
    paymentElement: StripeElements | null
  ) => {
    console.log('TCL: initiateCheckout -> paymentElement', paymentElement);
    try {
      if (!stripe || !paymentElement) return;
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
        user,
        localDealerSelected,
        localDealerInfo,
        paymentMethod: paymentMethod ?? 'Stripe',
        vehicleInformation,
        productBasedDiscount,
        productBasedDiscountApplied,
        existingOrderId,
        referralCode,
        affiliateDiscount,
        funnelId,
        taxAmount,
        totalWithTax,
      };
      const response = await apiInstance.post<{ data: { orderId: string } }>(
        '/payments/stripe/create-order',
        { orderData, paymentIntentId }
      );

      await new Promise((r) => setTimeout(r, 2000));

      const { error } = await stripe.confirmPayment({
        elements: paymentElement,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?step=2&order_id=${response.data.data.orderId}&method=stripe`,
        },
      });
      if (error && error.message) {
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?order_status=false`;
      }
    } catch (err) {
      // window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?&order_status=false`;
      toast.error('Error', {
        description: (err as Error).message,
      });
    }
  };

  return { initiateCheckout };
};
