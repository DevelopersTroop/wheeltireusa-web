import {
  createListenerMiddleware,
  isAnyOf,
  ListenerEffectAPI,
  ThunkDispatch,
  UnknownAction,
} from '@reduxjs/toolkit';
import {
  clearAffiliateDiscount,
  clearProudctBasedDiscount,
  initiateCheckout,
  mapOrderDataToCheckout,
  revokeCouponCode,
  setSelectedOptionTitle,
  updateCouponCode,
  updateDiscount,
  updateProductBasedDiscount,
  updateProductFromCart,
} from '../features/checkoutSlice';
import { RootState } from '../store';
import { TProductInfo } from '@/types/order';
import { apiInstance } from '../apis/base';
import { TErrorResponse, TResponse } from '@/types/response';
import { TCoupon } from '@/types/coupon';
import { toast } from 'sonner';

export const checkoutListenerMiddleware = createListenerMiddleware();

checkoutListenerMiddleware.startListening({
  matcher: isAnyOf(
    setSelectedOptionTitle,
    initiateCheckout,
    mapOrderDataToCheckout
  ),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;

    const checkoutState = state.persisted.checkout;

    // Map penging
    if (action.type === 'checkout/mapOrderDataToCheckout') {
      const products = state.persisted.checkout.productsInfo;
      if (!products.length) return;
      // const proudctSpecificDiscount =
      //   await calculateProductBasedDiscounts(products);

      // listenerApi.dispatch(updateCartFromCheckout(products));

      if (
        checkoutState.productBasedDiscount ||
        checkoutState.productBasedDiscountApplied
      ) {
        listenerApi.dispatch(clearAffiliateDiscount());
        listenerApi.dispatch(clearProudctBasedDiscount());
      }
      // if (proudctSpecificDiscount) {
      //   listenerApi.dispatch(
      //     updateProductBasedDiscount(proudctSpecificDiscount)
      //   );
      // }

      if (
        checkoutState.couponCode &&
        checkoutState.couponDiscount &&
        checkoutState.isCouponApplied &&
        !checkoutState.newCoupon
      ) {
        applyCoupon(checkoutState.couponCode, products, listenerApi, false);
      }

      if (checkoutState.referralCode.length) {
        const location: { lat: string | number; lng: string | number } = {
          lat: '',
          lng: '',
        };
        navigator.geolocation.getCurrentPosition((pos) => {
          if (pos) {
            const { latitude, longitude } = pos.coords;
            location.lat = latitude;
            location.lng = longitude;
          }
        });
      }

      if (checkoutState.newCoupon) {
        listenerApi.dispatch(clearProudctBasedDiscount());
        listenerApi.dispatch(revokeCouponCode());
        listenerApi.dispatch(clearAffiliateDiscount());
        applyCoupon(checkoutState.newCoupon, products, listenerApi, false);
      }
    }
    if (action.type === 'checkout/initiateCheckout') {
      listenerApi.dispatch(
        updateProductFromCart(Object.values(state.persisted.cart.products))
      );
    }
  },
});

const applyCoupon = async (
  code: string,
  productsInfo: TProductInfo[],
  listener: ListenerEffectAPI<
    unknown,
    ThunkDispatch<unknown, unknown, UnknownAction>,
    unknown
  >,
  shouldToast = true
) => {
  if (!code.length) {
    return;
  }
  try {
    const { data } = await apiInstance.get<
      TResponse<{
        data: {
          coupon: TCoupon;
        };
      }>
    >(`/coupons/apply/${code}`);

    if (!data.data.coupon) {
      toast.error("Coupon doesn't exist");
      return;
    }
    const couponData = data.data.coupon;
    if (couponData?.percentage) {
      const productsPrice = Object.values(productsInfo).reduce(
        (a, b) => a + (b?.price ?? 0) * (b?.quantity ?? 1),
        0
      );
      const discountAmount = Math.round(
        productsPrice * (couponData.percentage / 100)
      );
      listener.dispatch(
        updateCouponCode({
          couponCode: code,
          couponDiscount: discountAmount,
        })
      );
    } else if (couponData?.amount) {
      listener.dispatch(
        updateCouponCode({
          couponCode: code,
          couponDiscount: couponData?.amount,
        })
      );
    }
  } catch (error) {
    const err = error as TErrorResponse;
    toast.error(err.message);
  }
};
