import { updateCouponCode } from '@/redux/features/checkoutSlice';
import { useTypedSelector } from '@/redux/store';
import { apiBaseUrl } from '@/utils/api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

export const useApplyCoupon = () => {
  const { products: productsInfo } = useTypedSelector(
    (state) => state.persisted.cart
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const applyCoupon = async (code: string) => {
    setIsLoading(true);
    if (!code.length) {
      return;
    }
    validateCoupon(code)
      .then((validatedData) => {
        if (!validatedData) {
          return;
        }
        if (validatedData?.percentage) {
          const productsPrice = Object.values(productsInfo).reduce(
            (a, b) => a + (b?.sellingPrice ?? 0) * (b?.quantity ?? 1),
            0
          );
          const discountAmount = Math.round(
            productsPrice * (validatedData.percentage / 100)
          );

          dispatch(
            updateCouponCode({
              couponCode: code,
              couponDiscount: discountAmount,
            })
          );
        } else {
          dispatch(
            updateCouponCode({
              couponCode: code,
              couponDiscount: validatedData?.amount,
            })
          );
        }
      })
      .finally(() => setIsLoading(false));
  };

  return { applyCoupon, isLoading };
};

export const validateCoupon = async (code: string, shouldToast = true) => {
  try {
    const response = await fetch(`${apiBaseUrl}/coupons/apply/${code}`);

    const result = await response.json();

    if (!result.data?.coupon) {
      throw new Error();
    }
    return result.data?.coupon;
  } catch (error) {
    if (shouldToast) {
      toast.error('Error', {
        description: 'Invalid coupon code or expired',
      });
    }
    throw error;
  }
};
