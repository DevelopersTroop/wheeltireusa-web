import { FinalStep } from './finalStep'; // Component for the final step of the checkout process
import { StepFour } from './stepFour'; // Component for step four of the checkout process
import { StepOne } from './stepOne'; // Component for step one of the checkout process
import { StepThree } from './stepThree'; // Component for step three of the checkout process
import ShippingAddressForm from './stepTwo'; // Component for the shipping address form (step two)

// Interface defining the props for the Renderer component
interface RendererProps {
  step: number; // Current step in the checkout process
  setStep: (step: number) => void; // Function to update the current step
}

// Component to render the appropriate step in the checkout process
export const Renderer: React.FC<RendererProps> = ({ step, setStep }) => {
  // Function to handle the "Back" button action
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior of the button
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page smoothly
    if (step > 1) {
      setStep(step - 1); // Move to the previous step if not on the first step
    }
  };

  // Function to handle the "Continue" button action
  const handleContinue = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior of the button
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (step < 3) {
      setStep(step + 1); // Move to the next step if not on the last step
    }
  };
  // Render the appropriate component based on the current step
  switch (step) {
    case 1:
      return <StepOne handleContinue={handleContinue} setStep={setStep} />; // Render step one
    case 2:
      return <ShippingAddressForm setStep={setStep} />; // Render the shipping address form (step two)
    case 3:
      return <StepThree setStep={setStep} />; // Render step three
    case 4:
      return (
        <StepFour
          handleBack={handleBack} // Pass the "Back" button handler
          handleContinue={handleContinue} // Pass the "Continue" button handler
          setStep={setStep} // Pass the function to update the step
          step={step} // Pass the current step
        />
      ); // Render step four
    case 5:
      return <FinalStep />; // Render the final step
    default:
      return null; // Render nothing if the step is invalid
  }
};
