"use client";
import Link from "next/link";
import React from "react";
import { PiChats } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { GrGallery } from "react-icons/gr";
import { LuCircleUserRound } from "react-icons/lu";

const Contact: React.FC = () => {
  const banner = {
    backgroundImage: `url('/images/loginhero.jpeg')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "400px",
  };

  const smallScreenBanner = {
    ...banner,
    height: "200px",
  };

  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const bannerStyle = isSmallScreen ? smallScreenBanner : banner;

  return (
    <div className="flex flex-col justify-center items-center gap-8 my-10">
      {/* content */}
      <div
        className="w-full h-full flex flex-col justify-center items-center gap-8 px-4"
        style={bannerStyle}
      >
        <div>
          <h1 className="text-5xl  sm:text-7xl text-white font-semibold text-center">
            Contact Us
          </h1>
        </div>
        <div>
          <p className="text-center text-gray-200">
            We'd love to help! Here is how you can reach out to us.
          </p>
        </div>
        <div>
          <p className="text-2xl text-white font-semibold" >Support Topics</p>
        </div>
      </div>

      <div className="w-full flex flex-row gap-12 flex-wrap text-center justify-center items-center px-2">
        <Link href="/contact">
          <div className="w-[220px] h-[200px] flex flex-col gap-2 pt-10 items-center outline outline-1 outline-black rounded-md p-4 hover:shadow-2xl transition-shadow duration-500">
            <div>
              <PiChats className="text-6xl text-center" />
            </div>
            <div className="text-center">
              <p>Order Support</p>
            </div>
          </div>
        </Link>

        <Link href="/track-order">
          <div className="w-[220px] h-[200px] flex flex-col gap-2 pt-10 items-center outline outline-1 outline-black rounded-md p-4 hover:shadow-2xl transition-shadow duration-500">
            <div>
              <SlLocationPin className="text-6xl text-center" />
            </div>
            <div className="text-center ">
              <p>Tracking & Shipping</p>
            </div>
          </div>
        </Link>

        <Link href="#">
          <div className="w-[220px] h-[200px] flex flex-col gap-2 pt-10 items-center outline outline-1 outline-black rounded-md p-4 hover:shadow-2xl transition-shadow duration-500">
            <div>
              <img src="http://images.enthusiastenterprises.us/customer-service/site-images/fitment.png" alt="fitment" className="w-[100px]" />
            </div>
            <div className="text-center">
              <p>Fitment Help</p>
            </div>
          </div>
        </Link>
        <Link href="#">
          <div className="w-[220px] h-[200px] flex flex-col gap-2 pt-10 items-center outline outline-1 outline-black rounded-md p-4 hover:shadow-2xl transition-shadow duration-500">
            <div>
              <img src="http://images.enthusiastenterprises.us/customer-service/site-images/new-order.png" alt="new-ordwer" className="w-[70px]" />
            </div>
            <div className="text-center">
              <p>Pricing, Fitment, & Availability</p>
            </div>
          </div>
        </Link>

        <Link href="#">
          <div className="w-[220px] h-[200px] flex flex-col gap-2 pt-10 items-center outline outline-1 outline-black rounded-md p-4 hover:shadow-2xl transition-shadow duration-500">
            <div>
              <img src="http://images.enthusiastenterprises.us/customer-service/site-images/cancel-refund.png" alt="cancle-refund" className="w-[70px]" />
            </div>
            <div className="text-center ">
              <p>Cancellations & Refunds</p>
            </div>
          </div>
        </Link>

        <Link href="#">
          <div className="w-[220px] h-[200px] flex flex-col gap-2 pt-10 items-center outline outline-1 outline-black rounded-md p-4 hover:shadow-2xl transition-shadow duration-500">
            <div>
            <img src="http://images.enthusiastenterprises.us/customer-service/site-images/returns.png" alt="return" className="w-[70px]" />
            </div>
            <div className="text-center ">
              <p>Returns</p>
            </div>
          </div>
        </Link>
        <Link href="#">
          <div className="w-[220px] h-[200px] flex flex-col gap-2 pt-10 items-center outline outline-1 outline-black rounded-md p-4 hover:shadow-2xl transition-shadow duration-500">
            <div>
              <img src="http://images.enthusiastenterprises.us/customer-service/site-images/backorders.png" alt="BackOrders" className="w-[70px]" />
            </div>
            <div className="text-center">
              <p>Backorders</p>
            </div>
          </div>
        </Link>
        <Link href="#">
          <div className="w-[220px] h-[200px] flex flex-col gap-2 pt-10 items-center outline outline-1 outline-black rounded-md p-4 hover:shadow-2xl transition-shadow duration-500">
            <div>
              <img src="http://images.enthusiastenterprises.us/customer-service/site-images/warranty.png" alt="Warranty" className="w-[70px]" />
            </div>
            <div className="text-center ">
              <p>Warranty</p>
            </div>
          </div>
        </Link>
        <Link href="#">
          <div className="w-[220px] h-[200px] flex flex-col gap-2 pt-10 items-center outline outline-1 outline-black rounded-md p-4 hover:shadow-2xl transition-shadow duration-500">
            <div>
              <img src="http://images.enthusiastenterprises.us/customer-service/site-images/suspension.png" alt="Suspension" className="w-[70px]" />
            </div>
            <div className="text-center">
              <p>Suspension</p>
            </div>
          </div>
        </Link>
        <Link href="#">
          <div className="w-[220px] h-[200px] flex flex-col gap-2 pt-10 items-center outline outline-1 outline-black rounded-md p-4 hover:shadow-2xl transition-shadow duration-500">
            <div>
              <img src="http://images.enthusiastenterprises.us/customer-service/site-images/savings.png" alt="Military Discounts" className="w-[70px]" />
            </div>
            <div className="text-center">
              <p>Military Discounts, Promotions, and Giveaways</p>
            </div>
          </div>
        </Link>

        <Link href="#">
          <div className="w-[220px] h-[200px] flex flex-col gap-2 pt-10 items-center outline outline-1 outline-black rounded-md p-4 hover:shadow-2xl transition-shadow duration-500">
            <div>
              <GrGallery className="text-6xl text-center" />
            </div>
            <div className="text-center">
              <p>Gallery</p>
            </div>
          </div>
        </Link>

        <Link href="/track-order">
          <div className="w-[220px] h-[200px] flex flex-col gap-2 pt-10 items-center outline outline-1 outline-black rounded-md p-4 hover:shadow-2xl transition-shadow duration-500">
            <div>
              <LuCircleUserRound className="text-6xl text-center" />
            </div>
            <div className="text-center">
              <p>Account & Payment</p>
            </div>
          </div>
        </Link>

        <Link href="/track-order">
          <div className="w-[220px] h-[200px] flex flex-col gap-2 pt-10 items-center outline outline-1 outline-black rounded-md p-4 hover:shadow-2xl transition-shadow duration-500">
            <div>
              <img src="http://images.enthusiastenterprises.us/customer-service/site-images/programs-communities.png" alt="Programs" className="w-[70px]" />
            </div>
            <div className="text-center ">
              <p>Programs & Communities</p>
            </div>
          </div>
        </Link>

        

      </div>
    </div>
  );
};

export default Contact;