'use client';

import { useScreenSize } from '@/hooks/useScreenSize';
import { cn } from '@/lib/utils';
import { useTypedSelector } from '@/redux/store';
import { Check } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

// Interface defining the props for the Stepper component
interface StepperProps {
  currentStep: number; // Current step in the checkout process
  steps: Array<{ title: string; subTitle: string }>; // Array of steps with titles and subtitles
  setStep: (step: number) => void; // Function to update the current step
}

// Stepper component to display and manage the checkout steps
export const Stepper: React.FC<StepperProps> = ({
  setStep,
  steps, // This 'steps' variable MUST have a .length of 4
  currentStep,
}) => {
  const { selectedOptionTitle } = useTypedSelector(
    (state) => state.persisted.checkout
  );
  const searchParams = useSearchParams();
  const { isLg, screenSize } = useScreenSize();

  // This calculation is correct, but it relies on 'steps.length'
  // If steps.length is 3 and currentStep is 3, width will be 100%
  // If steps.length is 4 and currentStep is 3, width will be 66.6%
  const progressWidth =
    steps.length > 1
      ? ((currentStep - 1) / (steps.length - 1)) *
        (isLg
          ? currentStep === 4
            ? 100
            : 92
          : screenSize < 768
            ? 100
            : screenSize < 1033
              ? 88
              : 100)
      : 0;

  return (
    <div className="w-full mb-6 overflow-hidden">
      <div className="flex justify-between items-start">
        <div className="w-full flex justify-between relative">
          {/* --- Line Container --- */}
          {/* This container defines the "track" from the center of the first circle to the center of the last. */}
          <div
            className="absolute top-[14px] h-px"
            style={{
              left: '14px', // Half the width of the circle (w-7)
              right: '14px', // Half the width of the circle (w-7)
            }}
          >
            {/* Background line (fills 100% of the track) */}
            <div className="absolute top-0 left-0 h-full w-full bg-gray-200" />

            {/* Progress line (fills a percentage of the track) */}
            <div
              className="relative top-0 left-0 h-full bg-black"
              style={{
                width: `${progressWidth}%`, // This % is now relative to the track
                transition: 'width 0.3s ease-in-out',
              }}
            />
          </div>
          {/* --- End Line Container --- */}

          {/* Render each step */}
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrentOrCompleted = stepNumber <= currentStep;

            // Determine alignment based on position
            const isFirstStep = index === 0;
            const isLastStep = index === steps.length - 1;

            return (
              <div
                key={index}
                className={cn(
                  'relative flex flex-col z-10', // z-10 to place circles above the line
                  // Flexible alignment:
                  isFirstStep
                    ? 'items-start'
                    : isLastStep
                      ? 'items-end'
                      : 'items-center'
                )}
              >
                {/* Step circle */}
                <div
                  onClick={() => {
                    const clickedStep = index + 1;

                    // 1. Don't navigate if order is already placed
                    if (searchParams.get('order_id')?.length) return;

                    // 2. Don't navigate if on the last step (e.g., "Confirmation")
                    if (currentStep > steps.length - 1) return;

                    // 3. Specific business logic: Skip step 2 if not "Direct To Customer"
                    if (
                      selectedOptionTitle !== 'Direct to Customer' &&
                      clickedStep === 2
                    )
                      return;

                    // 4. Only allow navigation to current or previous steps
                    if (clickedStep <= currentStep) {
                      setStep(clickedStep);
                    }
                  }}
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center cursor-pointer mb-1',
                    'transition-colors duration-200',
                    isCurrentOrCompleted ? 'bg-black' : 'bg-gray-200' // Highlight completed/current steps
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <span
                      className={cn(
                        'text-sm font-medium',
                        isCurrentOrCompleted ? 'text-white' : 'text-gray-500' // Fixed text color for upcoming steps
                      )}
                    >
                      {stepNumber} {/* Display the step number */}
                    </span>
                  )}
                </div>

                {/* Step title and subtitle */}
                <div
                  className={cn(
                    'hidden md:block', // Alignment is now handled by the parent div
                    isFirstStep
                      ? 'text-left'
                      : isLastStep
                        ? 'text-right'
                        : 'text-center'
                  )}
                >
                  <p
                    className={cn(
                      'text-lg font-medium mb-1',
                      isCurrentOrCompleted ? 'text-black' : 'text-gray-500'
                    )}
                  >
                    {step.title}
                  </p>
                  {/* <p className={cn(...)}>{step.subTitle}</p> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
