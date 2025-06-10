'use client';

import { ReactNode, useState } from 'react';
import { push as Menu } from 'react-burger-menu';
import { MdOutlineClose } from 'react-icons/md';
import WheelsShowFilterOption from './wheel-show-filter-option';
import TireFilterAndSort from '../../_tires/TireFilterAndSort';

type SidebarProps = {
  children: ReactNode;
};

const SidebarTireFilters = ({ children }: SidebarProps) => {
  // Dispatch is used to trigger actions related to the off-canvas filter's state
  // const dispatch = useDispatch();

  // State to track whether the off-canvas filter menu is open or closed
  // Extract the state of the off-canvas filter from the global Redux store
  // const { isOpenFilter } = useTypedSelector((state) => state.offcanvasFilter);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  // const toggleFilter = () => setIsOpenFilter((prev) => !prev);
  // const openFilter = () => setIsOpenFilter(true);
  // const closeFilter = () => setIsOpenFilter(false);

  return (
    <div id="filter">
      {/* Filter Button: Toggles the off-canvas filter menu visibility */}
      <div className="flex justify-between items-center">
        <button
          className="rounded-xl border border-[#CFCFCF] px-4 w-[93px]  h-[41px]"
          // onClick={() => dispatch(toggleFilter())}
          onClick={() => setIsOpenFilter((prev) => !prev)}
        >
          <p className="flex gap-1 items-center text-[#210203]">
            <img src="/filterIcon.png" alt="icon" className="w-4 h-4" />
            <span className="font-normal text-sm">Filter</span>
          </p>
        </button>

        {/* InStockWheelFilterAndSort Component: Handles sorting and filter options */}
        <TireFilterAndSort />
      </div>

      {/* InStockWheelsShowFilterOption: Displays the selected filters */}
      <WheelsShowFilterOption />

      {/* Off-Canvas Menu: Displays the filter menu as an off-canvas sliding panel */}
      <Menu
        isOpen={isOpenFilter}
        onOpen={() => setIsOpenFilter(true)}
        onClose={() => setIsOpenFilter(false)}
        customCrossIcon={<MdOutlineClose />}
        styles={{
          bmMenuWrap: {
            top: '81px',
            left: '0px',
          },
          bmOverlay: {
            top: '81px',
            left: '0px',
          },
          bmCross: {
            background: '#F7F7F7',
          },
          bmMenu: {
            background: '#F7F7F7',
          },
          bmBurgerButton: { display: 'none' },
        }}
      >
        {/* Content inside the off-canvas menu */}
        <div className="text-black pt-3">{children}</div>
      </Menu>
    </div>
  );
};

export default SidebarTireFilters;
