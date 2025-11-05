import { FinalStep } from './CheckoutStep/FinalStep'; // Component for the final step of the checkout process
import { StepTwo } from './CheckoutStep/StepTwo'; // Component for step four of the checkout process
import { StepOne } from './CheckoutStep/StepOne'; // Component for step one of the checkout process// Component for step three of the checkout process
import StripeProvider from '../stripe';
import { StepThree } from './CheckoutStep/StepThree';
// import ShippingAddressForm from "./ShippingAddress"; // Component for the shipping address form (step two)

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
      return <StepTwo setStep={setStep} handleContinue={handleContinue} />;
    case 3:
      return (
        <StripeProvider>
          <StepThree
            handleBack={handleBack} // Pass the "Back" button handler
            handleContinue={handleContinue} // Pass the "Continue" button handler
            setStep={setStep} // Pass the function to update the step
            step={step} // Pass the current step
          />
        </StripeProvider>
      ); // Render the shipping address form (step two)
    case 4:
      return <FinalStep />; // Render the final step
    default:
      return (
        <div className="flex items-center justify-center py-20">
          <h2 className="text-2xl font-semibold"> Not a valid step !</h2>
        </div>
      ); // Render nothing if the step is invalid
  }
};
