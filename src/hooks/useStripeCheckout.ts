'use client';
import { useCheckout } from '@/context/checkoutContext';
import { apiInstance } from '@/redux/apis/base';
import { useTypedSelector } from '@/redux/store';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import { toast } from 'sonner';
import useAuth from './useAuth';
import { hasAllRequiredShippingFields } from '@/context/stripeProvider';
import { reserveCheckout } from '@/lib/order';

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
    try {
      if (!stripe || !paymentElement) return;
      const orderData = {
        orderInfo,
        shippingMethod,
        shippingAddress: hasAllRequiredShippingFields(shippingAddress)
          ? shippingAddress
          : billingAddress,
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
      const { checkoutToken } = await reserveCheckout(orderData);

      const response = await apiInstance.post<{ data: { orderId: string } }>(
        '/payments/stripe/checkout',
        { orderData, paymentIntentId, checkoutToken }
      );

      await new Promise((r) => setTimeout(r, 2000));

      const { error } = await stripe.confirmPayment({
        elements: paymentElement,
        confirmParams: {
          return_url: `${window.location.origin}/checkout?step=2&order_id=${response.data.data.orderId}&method=stripe`,
        },
      });
      if (error && error.message) {
				console.log("TCL: useStripeCheckout -> error", error)
        // window.location.href = '/checkout?order_status=false';
      }
    } catch (err) {
      const error = err as any;
      // window.location.href = `/checkout?&order_status=false`;
      toast.error(error.message);
    }
  };

  return { initiateCheckout };
};
