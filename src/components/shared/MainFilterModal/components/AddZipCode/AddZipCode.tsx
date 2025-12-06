import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import useAddZipCode from './useAddZipCode';

interface AddZipCodeProps {
  title?: string;
  showRearTireSizeLink?: boolean;
  onRearTireSizeLinkClick?: () => void;
}

const AddZipCode: React.FC<AddZipCodeProps> = ({
  title,
  showRearTireSizeLink = false,
  onRearTireSizeLinkClick,
}) => {
  const { onChangeZipCode, zipCode, handleDetectZipCode, loading } =
    useAddZipCode();


  return (
    <>
      <div className="px-6 order-4">
        {title ? <h2>{title}</h2> : ''}

        {/* Rear tire size link - shown above zip code input */}
        {showRearTireSizeLink && onRearTireSizeLinkClick && (
          <div className="mb-4 flex justify-center">
            <button
              className="text-primary underline text-sm hover:text-primary/80 transition-colors"
              onClick={onRearTireSizeLinkClick}
              type="button"
            >
              Add different Rear Tire size
            </button>
          </div>
        )}

        <div className="flex justify-center items-center">
          <InputOTP
            value={zipCode}
            maxLength={5}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            onChange={(value) => onChangeZipCode(value, true)}
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
            onClick={handleDetectZipCode}
          >
            {loading ? 'Detecting' : 'Detect'} Zip Code
          </button>
        </div>
      </div>
    </>
  );
};

export default AddZipCode;
