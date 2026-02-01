"use client";

import { ReactNode, useState } from "react";
import { push as Menu } from "react-burger-menu";
import { MdOutlineClose } from "react-icons/md";

type SidebarProps = {
  children: ReactNode;
};

const SidebarFilters = ({ children }: SidebarProps) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  return (
    <div className="w-full md:hidden">
      <button
        className="w-full text-primary px-auto py-[5px] border-2 border-primary hover:bg-primary-hover hover:text-white transition-colors duration-300 rounded-md text-base font-normal uppercase"
        onClick={() => setIsOpenFilter((prev) => !prev)}
      >
        Filtes
      </button>

      <Menu
        noOverlay
        isOpen={isOpenFilter}
        onOpen={() => setIsOpenFilter(true)}
        onClose={() => setIsOpenFilter(false)}
        customCrossIcon={<MdOutlineClose />}
        styles={{
          bmMenuWrap: {
            top: "0px",
            left: "0px",
            // width: "100%",
          },
          bmMenu: {
            background: "#E5E7EB", // equivalent to bg-gray-200
            padding: "20px 0",
            // height: "100vh",
          },
          bmCrossButton: {
            zIndex: "50",
          },
        }}
      >
        <div className="border-b-2 border-gray-400 text-2xl text-gray-700 font-semibold my-auto fixed bg-gray-100 w-[300px] py-2 px-4 -mt-5 mb-2 z-50">
          Filter
        </div>
        <div className="text-black pt-7 w[80%]">{children}</div>
      </Menu>
    </div>
  );
};

export default SidebarFilters;
