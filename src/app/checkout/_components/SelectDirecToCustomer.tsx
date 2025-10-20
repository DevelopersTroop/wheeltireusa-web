// Redux action to reset the selected dealer info
import { Button } from "@/components/ui/button"; // Button component for UI
import { setSelectedDealerInfo } from "@/redux/features/checkoutSlice";
import { useDispatch } from "react-redux";

// Component to render the "Direct to Customer" shipping option
export const SelectDirectToCustomer: React.FC<{
  handleOptionSelect: () => void; // Function to handle the selection of this option
  setSelectedOption: () => void; // Function to set this option as selected
  setStep: (step: number) => void; // Function to navigate to the next step
  checked: boolean; // Boolean to indicate if this option is selected
}> = ({ handleOptionSelect, setSelectedOption, setStep, checked }) => {
  const dispatch = useDispatch(); // Redux dispatch hook
  return (
    <div
      onClick={handleOptionSelect} // Handle selection when the container is clicked
      className={`rounded-lg border transition-all duration-200 py-3 px-4 lg:py-5 lg:px-6 flex flex-col gap-y-5 cursor-pointer hover:border-black ${checked ? "border-black" : "border-[#CFCFCF]"
        }`}
    >
      <div className="flex flex-col gap-3">
        <div className={`flex items-center gap-4`}>
          {/* Radio button for selecting this option */}

          <input
            type="radio"
            name="shipping-option"
            checked={checked} // Mark as checked if this option is selected
            onChange={setSelectedOption} // Handle selection change
            className="w-6 h-6 accent-black ring-black checked:outline-none cursor-pointer"
            onClick={(e) => e.stopPropagation()} // Prevent event propagation to the parent container
          />
          {/* Option title */}
          <div className="flex items-center gap-2 text-xl lg:text-2xl font-bold">
            Ship to my address
          </div>
        </div>
        {/* Option description */}
        <div className="flex flex-col items-start justify-between">
          Does not include mount, balance, and installation
        </div>
      </div>
      {/* Button to proceed to the next step */}
      <Button
        onClick={() => {
          handleOptionSelect(); // Handle selection
          setSelectedOption(); // Set this option as selected
          setStep(2); // Navigate to the next step
          dispatch(setSelectedDealerInfo(undefined)); // Reset the selected dealer info in Redux
        }}
        className="w-full h-14 rounded-xs font-semibold"
      >
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.416 12.9167C18.6493 12.9167 18.8327 13.1001 18.8327 13.3334V14.1667C18.8327 15.5501 17.716 16.6667 16.3327 16.6667C16.3327 15.2917 15.2077 14.1667 13.8327 14.1667C12.4577 14.1667 11.3327 15.2917 11.3327 16.6667H9.66602C9.66602 15.2917 8.54102 14.1667 7.16602 14.1667C5.79102 14.1667 4.66602 15.2917 4.66602 16.6667C3.28268 16.6667 2.16602 15.5501 2.16602 14.1667V12.5001C2.16602 12.0417 2.54102 11.6667 2.99935 11.6667H10.916C12.066 11.6667 12.9993 10.7334 12.9993 9.58341V5.00008C12.9993 4.54175 13.3743 4.16675 13.8327 4.16675H14.5327C15.1327 4.16675 15.6827 4.49175 15.9827 5.00841L16.516 5.94175C16.591 6.07508 16.491 6.25008 16.3327 6.25008C15.1827 6.25008 14.2493 7.18341 14.2493 8.33341V10.8334C14.2493 11.9834 15.1827 12.9167 16.3327 12.9167H18.416Z"
            fill="white"
          />
          <path
            d="M7.16667 18.3333C8.08714 18.3333 8.83333 17.5871 8.83333 16.6667C8.83333 15.7462 8.08714 15 7.16667 15C6.24619 15 5.5 15.7462 5.5 16.6667C5.5 17.5871 6.24619 18.3333 7.16667 18.3333Z"
            fill="white"
          />
          <path
            d="M13.8327 18.3333C14.7532 18.3333 15.4993 17.5871 15.4993 16.6667C15.4993 15.7462 14.7532 15 13.8327 15C12.9122 15 12.166 15.7462 12.166 16.6667C12.166 17.5871 12.9122 18.3333 13.8327 18.3333Z"
            fill="white"
          />
          <path
            d="M18.8333 10.4417V11.6667H16.3333C15.875 11.6667 15.5 11.2917 15.5 10.8333V8.33333C15.5 7.875 15.875 7.5 16.3333 7.5H17.4083L18.6167 9.61667C18.7583 9.86667 18.8333 10.15 18.8333 10.4417Z"
            fill="white"
          />
          <path
            d="M11.4013 1.66675H5.24297C3.7513 1.66675 2.5013 2.73341 2.2263 4.15008H5.86797C6.18464 4.15008 6.43464 4.40841 6.43464 4.72508C6.43464 5.04175 6.18464 5.29175 5.86797 5.29175H2.16797V6.44175H4.33464C4.6513 6.44175 4.90964 6.70008 4.90964 7.01675C4.90964 7.33341 4.6513 7.58341 4.33464 7.58341H2.16797V8.73341H2.80964C3.1263 8.73341 3.38464 8.99175 3.38464 9.30841C3.38464 9.62508 3.1263 9.87508 2.80964 9.87508H2.16797V10.0667C2.16797 10.5251 2.54297 10.9001 3.0013 10.9001H10.6263C11.4763 10.9001 12.168 10.2084 12.168 9.35841V2.43341C12.168 2.00841 11.8263 1.66675 11.4013 1.66675Z"
            fill="white"
          />
          <path
            d="M2.22565 4.15015H2.10065H1.28398C0.967318 4.15015 0.708984 4.40848 0.708984 4.72515C0.708984 5.04181 0.967318 5.29181 1.28398 5.29181H2.04232H2.16732V4.74181C2.16732 4.54181 2.19232 4.34181 2.22565 4.15015Z"
            fill="white"
          />
          <path
            d="M2.04232 6.44165H1.28398C0.967318 6.44165 0.708984 6.69998 0.708984 7.01665C0.708984 7.33332 0.967318 7.58332 1.28398 7.58332H2.04232H2.16732V6.44165H2.04232Z"
            fill="white"
          />
          <path
            d="M2.04232 8.7334H1.28398C0.967318 8.7334 0.708984 8.99173 0.708984 9.3084C0.708984 9.62507 0.967318 9.87507 1.28398 9.87507H2.04232H2.16732V8.7334H2.04232Z"
            fill="white"
          />
        </svg>

        <span>Continue to payment</span>
      </Button>
    </div>
  );
};
