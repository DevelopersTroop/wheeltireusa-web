'use client';

const CartYMM = () => {
  // const { openYmmModal } = useYmm();
  // Demo YMM value for test
  // Remove/comment this in production
  // const yearMakeModel = {
  //   year: 2020,
  //   make: 'Toyota',
  //   model: 'Camry',
  // };

  const yearMakeModel = {
    year: '',
    make: '',
    model: '',
  };
  // For actual usage, uncomment the following line:
  // const yearMakeModel = useSelector(
  //   (state: RootState) => state.persisted.yearMakeModel
  // );

  return (
    <div className="overflow-hidden rounded-b-none border-b border-[#cfcfcf] px-1 sm:px-5 py-3 w-full flex justify-between items-center  relative bg-white">
      <div className="w-[70%] text-base leading-[19px] text-[#210203]">
        {yearMakeModel.year && yearMakeModel.make && yearMakeModel.model ? (
          <>
            {' '}
            Your cart:
            <span className="text-[#210203] text-base font-bold">
              {yearMakeModel.year} {yearMakeModel.make} {yearMakeModel.model}
            </span>
          </>
        ) : (
          <div className="flex gap-2 items-center p-2 border border-[#FFC62B] rounded-md bg-[#f5f4f6]">
            <div>
              {' '}
              <img src={'/InfoCircle.png'} alt="infoCircle" />{' '}
            </div>
            <div>
              <h2>Please ensure correct fitment</h2>
              <p>
                You selected{' '}
                <span className="font-semibold"> 185/65R15 </span>{' '}
              </p>
            </div>
          </div>
        )}
      </div>

      <small className="w-[30%] text-sm leading-[17px] underline text-[#210203] text-end">
        <button>
          <span className="text-sm font-semibold underline">
            {yearMakeModel.year && yearMakeModel.make && yearMakeModel.model
              ? 'Change'
              : 'Select vehicle'}
          </span>
        </button>
      </small>
    </div>
  );
};

export default CartYMM;
