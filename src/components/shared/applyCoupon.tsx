import { useAppDispatch, useTypedSelector } from '@/redux/store';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  revokeCouponCode,
  updateCouponCode,
} from '@/redux/features/checkoutSlice';
import { useState } from 'react';

export const ApplyCoupon = () => {
  const isLoading = false;
  const [coupon, setCoupon] = useState('');
  const dispatch = useAppDispatch();
  const { isCouponApplied } = useTypedSelector(
    (state) => state.persisted.checkout
  );
  return (
    <div className="px-2 sm:px-6 w-full pb-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Do you have a coupon code?</AccordionTrigger>
          <AccordionContent className="flex items-center gap-2 py-1 px-1">
            <Input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter your coupon "
              className="h-12 !bg-white"
            />
            <Button
              onClick={() => {
                if (isCouponApplied) {
                  dispatch(revokeCouponCode());
                } else {
                  updateCouponCode({
                    couponCode: coupon,
                    couponDiscount: 20,
                  });
                }
              }}
              className="!h-12 font-semibold"
            >
              {isLoading ? 'Loading' : isCouponApplied ? 'Revoke' : 'Apply'}
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
