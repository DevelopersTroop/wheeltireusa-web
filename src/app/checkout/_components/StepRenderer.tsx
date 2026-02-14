import { FinalStep } from './CheckoutStep/FinalStep';
import { StepOne } from './CheckoutStep/StepOne';

interface RendererProps {
  step: number;
  setStep: (step: number) => void;
}
export const Renderer: React.FC<RendererProps> = ({ step, setStep }) => {
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleContinue = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (step < 3) {
      setStep(step + 1);
    }
  };
  switch (step) {
    case 1:
      return <StepOne />;
    case 2:
      return <FinalStep />;
    default:
      return null;
  }
};
