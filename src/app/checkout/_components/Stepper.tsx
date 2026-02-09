'use client';
import useAuth from '@/hooks/useAuth';
import { useTypedSelector } from '@/redux/store';

interface StepperProps {
  currentStep: number;
  steps: Array<{ title: string; subTitle: string }>;
  setStep: (step: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({
  setStep,
  steps,
  currentStep,
}) => {
  const { user } = useAuth();
  const { selectedOptionTitle } = useTypedSelector(
    (state) => state.persisted.checkout
  );

  const isFinalStep = currentStep === 3;

  return (
    <div className="">
      {/* <div className="flex items-start justify-between">
        <div className="relative flex w-full justify-between">
          <div
            className="absolute top-[15px] h-[1px] bg-gray-200"
            style={{
              left: "14px",
              width: "80%",
            }}
          />
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex w-[20%] flex-col items-start"
            >
              <div className="flex flex-col items-center">
                <div
                  onClick={() => {
                    if (currentStep > 4) return;
                    if (
                      selectedOptionTitle !== "Direct To Customer" &&
                      index + 1 === 2
                    )
                      return;
                    if (index + 1 <= currentStep) setStep(index + 1);
                  }}
                  className={cn(
                    "z-10 mb-4 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full",
                    "transition-colors duration-200",
                    index + 1 <= currentStep ? "bg-black" : "bg-gray-200",
                  )}
                >
                  {index + 1 < currentStep ? (
                    <Check className="h-4 w-4 text-white" />
                  ) : (
                    <span className="text-sm font-medium text-white">
                      {index + 1}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full max-w-fit text-left">
                <p
                  className={cn(
                    "mb-1 hidden text-xl font-medium md:block",
                    index + 1 <= currentStep ? "text-black" : "text-gray-500",
                  )}
                >
                  {step.title}
                </p>
                <p
                  className={cn(
                    "hidden text-sm leading-tight text-gray-600 md:block",
                    index + 1 <= currentStep ? "text-black" : "text-gray-500",
                  )}
                >
                  {step.subTitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* {!user?._id && !isFinalStep && (
        <div className="my-5 flex max-w-3xl flex-col items-start justify-between gap-3 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18.3327 10C18.3327 14.6024 14.6017 18.3333 9.99935 18.3333C5.39698 18.3333 1.66602 14.6024 1.66602 10C1.66602 5.39762 5.39698 1.66666 9.99935 1.66666C14.6017 1.66666 18.3327 5.39762 18.3327 10ZM12.4993 7.5C12.4993 8.88071 11.3801 10 9.99935 10C8.61864 10 7.49935 8.88071 7.49935 7.5C7.49935 6.11929 8.61864 5 9.99935 5C11.3801 5 12.4993 6.11929 12.4993 7.5ZM9.99934 17.0833C11.486 17.0833 12.8658 16.6253 14.0051 15.8427C14.5083 15.497 14.7234 14.8385 14.4308 14.3027C13.8243 13.1919 12.5745 12.5 9.9993 12.5C7.42409 12.5 6.17432 13.1919 5.5678 14.3026C5.27522 14.8385 5.49027 15.4969 5.99348 15.8426C7.13284 16.6253 8.5126 17.0833 9.99934 17.0833Z"
              />
            </svg>
            <p className="text-sm font-medium">
              Have an account? Sign in for the faster checkout
            </p>
          </div>
          <Link
            href={`/login?redirect=/checkout?step=${currentStep}`}
            className="text-sm font-medium underline hover:text-gray-700"
          >
            Sign in
          </Link>
        </div>
      )} */}
    </div>
  );
};

export default Stepper;
