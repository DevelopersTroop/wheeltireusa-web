import { TCartProduct } from '@/types/cart';
import React from 'react';

// Component to display tire attributes
const TireAttributes = ({ product }: { product: TCartProduct }) => {
  return (
    <div className="flex gap-2 items-start self-stretch flex-wrap relative w-full">
      {/* Display tire size if available */}
      {/* {product?.tire_size !== "" ? */}
      <div
        className="hover:bg-[#210203] bg-white group cursor-pointer rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={product?.tire_size}
        data-tooltip-place="top"
      >
        <div className="flex gap-1 items-center relative">
          <i className="icon-size text-[#504949]  group-hover:text-[#ffffff]"></i>
          <small className="text-xs leading-[14px] text-[#504949]">
            <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
              Size
            </span>
          </small>
        </div>
        <p className="text-base leading-[19px] text-[#210203]">
          <span className="text-[#210203] text-base font-semibold group-hover:text-[#ffffff]">
            {product?.tire_size ? product?.tire_size : 'N/A'}
          </span>
        </p>
      </div>
      {/* : ""} */}

      {/* Display sidewall style if available */}

      {/* <div
        className="hover:bg-[#210203] bg-white group cursor-pointer rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={product?.seo_description}
        data-tooltip-place="top"
      >
        <div className="flex gap-1 items-center relative">
          <i className="icon-size text-[#504949]  group-hover:text-[#ffffff]"></i>
          <small className="text-xs leading-[14px] text-[#504949]">
            <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
              Service Description
            </span>
          </small>
        </div>
        <p className="text-base leading-[19px] text-[#210203]">
          <span className="text-[#210203] text-base font-semibold group-hover:text-[#ffffff]">
            {product?.seo_description
              ? product?.seo_description
              : 'N/A'}
          </span>
        </p>
      </div> */}

      {/* <div
        className="hover:bg-[#210203] bg-white group cursor-pointer rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={product?.utqg}
        data-tooltip-place="top"
      >
        <div className="flex gap-1 items-center relative">
          <i className="icon-size text-[#504949]  group-hover:text-[#ffffff]"></i>
          <small className="text-xs leading-[14px] text-[#504949]">
            <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
              UTQG
            </span>
          </small>
        </div>
        <p className="text-base leading-[19px] text-[#210203]">
          <span className="text-[#210203] text-base font-semibold group-hover:text-[#ffffff]">
            {product?.utqg ? product?.utqg : 'N/A'}
          </span>
        </p>
      </div> */}

      {/* {product?.sidewall !== "" ? */}
      <div
        className="hover:bg-[#210203] bg-white group cursor-pointer rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={product?.sidewall}
        data-tooltip-place="top"
      >
        <div className="flex gap-1 items-center relative">
          <i className="icon-finish text-[#504949] group-hover:text-[#ffffff]"></i>
          <small className="text-xs leading-[14px] text-[#504949]">
            <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
              Style
            </span>
          </small>
        </div>
        <p className="text-base leading-[19px] text-[#210203]">
          <span className="text-[#210203] text-base font-semibold group-hover:text-[#ffffff]">
            {product?.sidewall ? product?.sidewall : 'N/A'}
          </span>
        </p>
      </div>
      {/* : ""} */}
      {/* Display load rating if available */}

      {/* <div
        className="hover:bg-[#210203] bg-white group cursor-pointer rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={product?.eco_focus}
        data-tooltip-place="top"
      >
        <div className="flex gap-1 items-center relative">
          <i className="icon-finish text-[#504949] group-hover:text-[#ffffff]"></i>
          <small className="text-xs leading-[14px] text-[#504949]">
            <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
              Eco Focus
            </span>
          </small>
        </div>
        <p className="text-base leading-[19px] text-[#210203]">
          <span className="text-[#210203] text-base font-semibold group-hover:text-[#ffffff]">
            {product?.eco_focus ? product?.eco_focus : 'N/A'}
          </span>
        </p>
      </div> */}

      <div
        className="hover:bg-[#210203] bg-white group cursor-pointer rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={product?.load_rating}
        data-tooltip-place="top"
      >
        <div className="flex gap-1 items-center relative">
          <i className="icon-finish text-[#504949] group-hover:text-[#ffffff]"></i>
          <small className="text-xs leading-[14px] text-[#504949]">
            <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
              Load Rang
            </span>
          </small>
        </div>
        <p className="text-base leading-[19px] text-[#210203]">
          <span className="text-[#210203] text-base font-semibold group-hover:text-[#ffffff]">
            {product?.load_rating ? product?.load_rating : 'N/A'}
          </span>
        </p>
      </div>

      {/* <div
        className="hover:bg-[#210203] bg-white group cursor-pointer rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={product?.hazad_production}
        data-tooltip-place="top"
      >
        <div className="flex gap-1 items-center relative">
          <i className="icon-finish text-[#504949] group-hover:text-[#ffffff]"></i>
          <small className="text-xs leading-[14px] text-[#504949]">
            <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]">
              Hazard Protection
            </span>
          </small>
        </div>
        <p className="text-base leading-[19px] text-[#210203]">
          <span className="text-[#210203] text-base font-semibold group-hover:text-[#ffffff]">
            {product?.hazad_production ? product?.hazad_production : 'N/A'}
          </span>
        </p>
      </div> */}

      {/* Display service description (load index + speed rating) if both available */}
      {/* {product?.tire_load_index !== "" && product?.speed_rating !== "" ? <>
                <div
                    className="hover:bg-[#210203] bg-white group cursor-pointer rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={`${product?.tire_load_index}${product?.speed_rating}`}
                    data-tooltip-place="top"
                    >
                    <div className="flex gap-1 items-center relative">
                        <small className="text-xs leading-[14px] text-[#504949]">
                            <span className="text-[#504949] text-xs font-normal group-hover:text-[#ffffff]"
                            >Serv. Desc</span>
                        </small>
                    </div>
                    <p className="text-base leading-[19px] text-[#210203]">
                        <span className="text-[#210203] text-base font-semibold group-hover:text-[#ffffff]">{product?.tire_load_index}{product?.speed_rating}</span>
                    </p>
                </div>
            </> : ""} */}

      {/* <div
                className="rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative w-[132px]">
                <div className="flex gap-1 items-center relative">
                    <small className="text-xs leading-[14px] text-[#504949]">
                        <span className="text-[#504949] text-xs font-normal">UTQG</span>
                    </small>
                </div>
                <p className="text-base leading-[19px] text-black">
                    <span className="text-black text-base font-semibold">500 AA A</span>
                </p>
            </div> */}
    </div>
  );
};

export default TireAttributes;
