"use client";
import { setSelectedOption as dispatchSelectedOption, setSelectedOptionTitle, setShippingMethod } from "@/redux/features/checkoutSlice";
import { useTypedSelector } from "@/redux/store";
import { SelecteOptionTitle } from "@/types/order";
import { useDispatch } from "react-redux"; // Redux dispatch hook
import { SelectDirectToCustomer } from "./SelectDirecToCustomer";

// DeliveryOptions Component
const DeliveryOptions: React.FC<{
  setStep: (step: number) => void;
}> = ({ setStep }) => {
  const dispatch = useDispatch(); // Redux dispatch hook


  const { selectedOption, selectedDealer } = useTypedSelector(
    (state) => state.persisted.checkout
  ); // Access selected option and dealer from Redux store
  /**
   * Auto-select nearest dealer based on cart type and selected option
   */

  const handleOptionSelect = (option: number, title: SelecteOptionTitle) => {
    dispatchShippingMethod(option, title);
    setSelectedOption(option);
    dispatch(setSelectedOptionTitle(title));
  };

  function setSelectedOption(option: number) {
    dispatch(dispatchSelectedOption(option));
  }

  function dispatchShippingMethod(option: number, title: SelecteOptionTitle) {
    dispatch(setShippingMethod({ option, title }));
  }

  return (
    <>
      <div className="flex flex-col gap-y-3">
        <SelectDirectToCustomer
          checked={selectedOption === 1}
          handleOptionSelect={() =>
            handleOptionSelect(1, "Direct to Customer")
          }
          setSelectedOption={() => setSelectedOption(1)}
          setStep={setStep}
        />
      </div>
    </>
  );
};

export default DeliveryOptions
