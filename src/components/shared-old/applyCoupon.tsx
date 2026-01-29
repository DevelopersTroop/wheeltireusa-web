import { apiInstance } from '@/redux/apis/base';
import {
  revokeCouponCode,
  updateCouponCode,
} from '@/redux/features/checkoutSlice';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import { TCoupon } from '@/types/coupon';
import { TErrorResponse, TResponse } from '@/types/response';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';

export const ApplyCoupon = () => {
  const isLoading = false;
  const [coupon, setCoupon] = useState('');
  const { products: productsInfo } = useTypedSelector(
    (state) => state.persisted.cart
  );
  const dispatch = useAppDispatch();
  const { isCouponApplied, discount, couponCode } = useTypedSelector(
    (state) => state.persisted.checkout
  );
  console.log('TCL: ApplyCoupon -> discount', discount);
  return (
    <div className="px-2 sm:px-6 w-full pb-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Do you have a coupon code?</AccordionTrigger>
          <AccordionContent className="flex items-center gap-2 py-1 px-1">
            <Input
              value={couponCode || coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter your coupon "
              className="h-12 bg-white!"
            />
            <Button
              onClick={async () => {
                if (isCouponApplied) {
                  dispatch(revokeCouponCode());
                  return;
                }
                try {
                  const { data } = await apiInstance.get<
                    TResponse<{
                      data: {
                        coupon: TCoupon;
                      };
                    }>
                  >(`/coupons/apply/${coupon}`);

                  if (!data.data.coupon) {
                    toast.error("Coupon doesn't exist");
                    setCoupon('');
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
                    dispatch(
                      updateCouponCode({
                        couponCode: coupon,
                        couponDiscount: discountAmount,
                      })
                    );
                  } else if (couponData?.amount) {
                    dispatch(
                      updateCouponCode({
                        couponCode: coupon,
                        couponDiscount: couponData?.amount,
                      })
                    );
                  }
                } catch (error) {
                  setCoupon('');
                  const err = error as TErrorResponse;
                  toast.error(err.message);
                }
              }}
              className="h-12! font-semibold"
            >
              {isLoading ? 'Loading' : isCouponApplied ? 'Revoke' : 'Apply'}
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
