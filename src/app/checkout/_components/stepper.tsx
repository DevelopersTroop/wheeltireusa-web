'use client';
import { useTypedSelector } from '@/redux/store'; // Custom hook to access the Redux store
import { cn } from '@/lib/utils'; // Utility function for conditional class names
import { Check } from 'lucide-react'; // Icon for completed steps
import Link from 'next/link'; // Next.js Link component for navigation
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'; // React hooks for managing state and side effects

// Interface defining the props for the Stepper component
interface StepperProps {
  currentStep: number; // Current step in the checkout process
  steps: Array<{ title: string; subTitle: string }>; // Array of steps with titles and subtitles
  setStep: (step: number) => void; // Function to update the current step
}

// Stepper component to display and manage the checkout steps
export const Stepper: React.FC<StepperProps> = ({
  setStep,
  steps,
  currentStep,
}) => {
  // Get the authenticated user
  // const { user } = useAuth();
  const user = { id: 0 };
  const [_, setIsMobile] = useState(false); // State to track if the device is mobile
  const { selectedOptionTitle } = useTypedSelector(
    (state) => state.persisted.checkout
  ); // Access the selected shipping option from the Redux store
  const searchParams = useSearchParams();

  // Effect to handle screen resizing and determine if the device is mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768); // Check if the screen width is less than 768px
    handleResize(); // Initialize the state on component mount
    window.addEventListener('resize', handleResize); // Add event listener for window resizing
    return () => window.removeEventListener('resize', handleResize); // Cleanup the event listener on unmount
  }, []);

  const isFinalStep = currentStep === 5; // Check if the current step is the final step

  return (
    <div className="lg:max-w-[90%] mx-auto">
      {' '}
      {/* Wrapper for the stepper */}
      <div className="flex justify-between items-start">
        <div className="w-full flex justify-between relative">
          {/* Horizontal line connecting the steps */}
          <div
            className="absolute top-[15px] h-[1px] bg-gray-200"
            style={{
              left: '14px',
              width: '80%',
            }}
          />
          {/* Render each step */}
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col w-[20%] items-start"
            >
              <div className="flex flex-col items-center">
                {/* Step circle */}
                <div
                  onClick={() => {
                    if (searchParams.get('order_id')?.length) return;
                    if (currentStep > 4) return; // Prevent navigation if the current step is beyond step 4
                    if (
                      selectedOptionTitle &&
                      selectedOptionTitle !== 'Direct to Customer' &&
                      index + 1 === 2
                    )
                      return; // Prevent navigation to step 2 if the selected option is not "Direct To Customer"
                    if (index + 1 <= currentStep) setStep(index + 1); // Allow navigation to the current or previous steps
                  }}
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center cursor-pointer z-10 mb-4',
                    'transition-colors duration-200',
                    index + 1 <= currentStep ? 'bg-black' : 'bg-gray-200' // Highlight completed steps
                  )}
                >
                  {index + 1 < currentStep ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-sm font-medium text-white">
                      {index + 1} {/* Display the step number */}
                    </span>
                  )}
                </div>
              </div>

              {/* Step title and subtitle */}
              <div className="w-full max-w-[150px] text-left">
                <p
                  className={cn(
                    'text-xl font-medium mb-1 hidden md:block',
                    index + 1 <= currentStep ? 'text-black' : 'text-gray-500'
                  )}
                >
                  {step.title}
                </p>
                <p
                  className={cn(
                    'text-sm text-gray-600 leading-tight hidden md:block',
                    index + 1 <= currentStep ? 'text-black' : 'text-gray-500'
                  )}
                >
                  {step.subTitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Prompt for users to sign in if they are not authenticated */}
      {!user?.id && !isFinalStep && (
        <div className="my-5 border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-red-600"
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
            href={`/login?redirect=/checkout?step=${currentStep}`} // Redirect to login with the current step as a query parameter
            className="text-sm font-medium underline hover:text-gray-700"
          >
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
};

export default Stepper;
