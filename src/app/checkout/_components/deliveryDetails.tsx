import { TDealer } from '@/types/order';
import { InfoIcon } from 'lucide-react';

export const DeliveryDetails: React.FC<{
  setStep?: (step: number) => void;
  requestedDealer: any;
  selectedDealerInfo: TDealer | undefined;
  selectedOptionTitle: any;
}> = ({
  setStep,
  requestedDealer,
  selectedDealerInfo,
  selectedOptionTitle,
}) => {
  return (
    <div className="flex items-start gap-4 ">
      <div className="relative h-5 w-5 rounded-full flex items-center justify-center text-white mt-1 font-semibold">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.916 12.9166C18.1493 12.9166 18.3327 13.1 18.3327 13.3333V14.1666C18.3327 15.55 17.216 16.6666 15.8327 16.6666C15.8327 15.2916 14.7077 14.1666 13.3327 14.1666C11.9577 14.1666 10.8327 15.2916 10.8327 16.6666H9.16602C9.16602 15.2916 8.04102 14.1666 6.66602 14.1666C5.29102 14.1666 4.16602 15.2916 4.16602 16.6666C2.78268 16.6666 1.66602 15.55 1.66602 14.1666V12.5C1.66602 12.0416 2.04102 11.6666 2.49935 11.6666H10.416C11.566 11.6666 12.4993 10.7333 12.4993 9.58329V4.99996C12.4993 4.54163 12.8743 4.16663 13.3327 4.16663H14.0327C14.6327 4.16663 15.1827 4.49163 15.4827 5.00829L16.016 5.94163C16.091 6.07496 15.991 6.24996 15.8327 6.24996C14.6827 6.24996 13.7493 7.18329 13.7493 8.33329V10.8333C13.7493 11.9833 14.6827 12.9166 15.8327 12.9166H17.916Z"
            fill="#210203"
          />
          <path
            d="M6.66667 18.3333C7.58714 18.3333 8.33333 17.5871 8.33333 16.6667C8.33333 15.7462 7.58714 15 6.66667 15C5.74619 15 5 15.7462 5 16.6667C5 17.5871 5.74619 18.3333 6.66667 18.3333Z"
            fill="#210203"
          />
          <path
            d="M13.3327 18.3333C14.2532 18.3333 14.9993 17.5871 14.9993 16.6667C14.9993 15.7462 14.2532 15 13.3327 15C12.4122 15 11.666 15.7462 11.666 16.6667C11.666 17.5871 12.4122 18.3333 13.3327 18.3333Z"
            fill="#210203"
          />
          <path
            d="M18.3333 10.4417V11.6667H15.8333C15.375 11.6667 15 11.2917 15 10.8333V8.33333C15 7.875 15.375 7.5 15.8333 7.5H16.9083L18.1167 9.61667C18.2583 9.86667 18.3333 10.15 18.3333 10.4417Z"
            fill="#210203"
          />
          <path
            d="M10.9013 1.66663H4.74297C3.2513 1.66663 2.0013 2.73329 1.7263 4.14996H5.36797C5.68464 4.14996 5.93464 4.40829 5.93464 4.72496C5.93464 5.04163 5.68464 5.29163 5.36797 5.29163H1.66797V6.44163H3.83464C4.1513 6.44163 4.40964 6.69996 4.40964 7.01663C4.40964 7.33329 4.1513 7.58329 3.83464 7.58329H1.66797V8.73329H2.30964C2.6263 8.73329 2.88464 8.99163 2.88464 9.30829C2.88464 9.62496 2.6263 9.87496 2.30964 9.87496H1.66797V10.0666C1.66797 10.525 2.04297 10.9 2.5013 10.9H10.1263C10.9763 10.9 11.668 10.2083 11.668 9.35829V2.43329C11.668 2.00829 11.3263 1.66663 10.9013 1.66663Z"
            fill="#210203"
          />
          <path
            d="M1.72565 4.1499H1.60065H0.783984C0.467318 4.1499 0.208984 4.40824 0.208984 4.7249C0.208984 5.04157 0.467318 5.29157 0.783984 5.29157H1.54232H1.66732V4.74157C1.66732 4.54157 1.69232 4.34157 1.72565 4.1499Z"
            fill="#210203"
          />
          <path
            d="M1.54232 6.44165H0.783984C0.467318 6.44165 0.208984 6.69998 0.208984 7.01665C0.208984 7.33332 0.467318 7.58332 0.783984 7.58332H1.54232H1.66732V6.44165H1.54232Z"
            fill="#210203"
          />
          <path
            d="M1.54232 8.73328H0.783984C0.467318 8.73328 0.208984 8.99161 0.208984 9.30828C0.208984 9.62494 0.467318 9.87494 0.783984 9.87494H1.54232H1.66732V8.73328H1.54232Z"
            fill="#210203"
          />
        </svg>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <h2 className="text-lg font-bold">Delivery Options</h2>
        {requestedDealer?.businessName ? (
          <div className="flex flex-col gap-y-3 max-w-xl">
            <h2 className="font-semibold text-lg">Dealer Requested</h2>
            <div className="p-4 rounded-xs flex gap-2 bg-[#F7F7F7]">
              <InfoIcon className="fill-black stroke-white" />
              <p className="text-muted-foreground">
                Dealer setup will begin after checkout. An Tirematic
                representative will confirm once the dealer is onboarded, and
                shippling will proceed afterward.
              </p>
            </div>
            <p className="text-lg text-muted-foreground">
              {requestedDealer?.businessName}
            </p>
            <p className="text-lg text-muted-foreground">
              {requestedDealer?.website}
            </p>
            <p className="text-lg text-muted-foreground">
              {requestedDealer?.contact}
            </p>
          </div>
        ) : null}
        {selectedDealerInfo ? (
          <div className="flex flex-col gap-y-3 max-w-xl">
            <h2 className="font-semibold text-lg">Dealer Selected</h2>
            <p className="text-lg text-muted-foreground">
              {selectedDealerInfo?.address}
            </p>
            <p className="text-lg text-muted-foreground">
              {selectedDealerInfo.addressPhone}
            </p>
          </div>
        ) : (
          selectedOptionTitle
        )}

        <button
          onClick={() => typeof setStep !== 'undefined' && setStep(1)}
          className="text-black mt-2 font-semibold underline"
        >
          Edit
        </button>
      </div>
    </div>
  );
};
