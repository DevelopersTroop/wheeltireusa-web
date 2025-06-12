import { Button } from '@/components/ui/button';
import { SelectDirectToCustomer } from './selectDirectToCustomer';
import { useAppDispatch, useTypedSelector } from '@/redux/store';
import {
  setSelectedOption,
  setSelectedOptionTitle,
  setShippingMethod,
  TCheckoutState,
} from '@/redux/features/checkoutSlice';

type DeliveryOptionsProps = {
  setStep: (step: number) => void;
};

export const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  setStep,
}) => {
  const dispatch = useAppDispatch();
  const { selectedOption } = useTypedSelector(
    (state) => state.persisted.checkout
  );
  function dispatchShippingMethod(
    option: number,
    title: TCheckoutState['selectedOptionTitle']
  ) {
    dispatch(setShippingMethod({ option, title }));
  }
  const handleOptionSelect = (
    option: number,
    title: TCheckoutState['selectedOptionTitle']
  ) => {
    dispatchShippingMethod(option, title);
    setSelectedOption(option);
    dispatch(setSelectedOptionTitle(title));
  };
  return (
    <div className="flex flex-col gap-4">
      <SelectDirectToCustomer
        checked={selectedOption === 1} // Assuming this option is always checked for this component
        handleOptionSelect={() => handleOptionSelect(1, 'Direct to Customer')}
        setSelectedOption={() => dispatch(setSelectedOption(1))}
        setStep={setStep}
      />
    </div>
  );
};
