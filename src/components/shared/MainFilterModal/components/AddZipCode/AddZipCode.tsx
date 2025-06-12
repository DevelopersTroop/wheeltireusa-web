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
      {/* <div className="grid grid-cols-2 gap-3 px-6 order-4">
        <input
          type="text"
          onChange={(e) => onChangeZipCode(e.target.value)}
          placeholder="Enter your zip code"
        />
      </div> */}
      <div className="px-6 order-4">
        <div className="text-muted-dark text-[20px] py-4">
          Enter your zip code to get best shipping and installation options:
        </div>
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

        <div>
          <button
            className="mt-4 bg-primary text-white px-3 py-2 rounded"
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
