import React from 'react';
import useAddZipCode from './useAddZipCode';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

const AddZipCode = () => {
  const { onChangeZipCode } = useAddZipCode();
  return (
    <>
      <div className="px-6 order-4">
        <div className="flex justify-center items-center">
          <InputOTP
            maxLength={5}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            onChange={onChangeZipCode}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="my-4 flex justify-center">
          <button
            className="text-primary underline"
            onClick={() => {
              console.log('Zip Code submitted');
            }}
          >
            Detect Zip Code
          </button>
        </div>
      </div>
    </>
  );
};

export default AddZipCode;
