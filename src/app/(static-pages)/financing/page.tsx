import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import Link from 'next/link';
import { FaPhone } from 'react-icons/fa6';
import FinancingHero2 from './_components/financing-hero2';
import { FinancingMobile } from './_components/financing-mobile';
import PaymentTable from './_components/financing-table';
import { metaDataHelper } from '@/utils/metadata';

// Metadata for the page
export const metadata = metaDataHelper({
  title: 'Financing - Tirematic',
  keywords: '',
  description: '',
  openGraph: {
    title: '',
    description: '',
  },
  alternates: {
    canonical: 'https://tirematic.com/financing',
  },
});

// Component to render the Financing page
const Financing = () => {
  return (
    <Container>
      {/* Breadcrumb navigation */}
      <div className="flex w-full items-start pt-2 pb-4">
        <div className="w-full">
          <Breadcrumb>
            <Item href={`/`}>Home</Item>
            <Item href={`/financing`} isEnd={true}>
              Financing
            </Item>
          </Breadcrumb>
        </div>
      </div>
      {/* <FinancingHero1 /> */}
      <FinancingHero2 />
      {/* Main Content Section */}
      <div className="w-full flex flex-col gap-8 pt-6 pb-20 sm:pb-40">
        {/* Header Section */}
        <div className="w-full flex flex-col gap-4 text-start sm:text-center">
          <h2 className="text-3xl font-bold text-[#210203]">
            You have great options to finance your new wheels & tires!
          </h2>
          {/* Desktop description */}
          <p className="text-lg font-normal text-[#210203] max-w-[752px] m-auto hidden sm:block">
            Quality wheels and tires are an investment in your vehicles safety
            and performance. To make your purchase easier on your finances, we
            offer flexible payment options tailored to suit your budget. As your
            trusted source for top-brand tires at discount prices, we’re
            dedicated to making sure you dont have to compromise on quality.
            Select one of the options below during checkout to secure your
            financing today!
          </p>
          {/* Mobile description */}
          <p className="text-lg font-normal text-[#210203] max-w-[752px] m-auto sm:hidden">
            Quality wheels and tires are an investment in your vehicles safety
            and performance. To make your purchase easier on your finances, we
            offer flexible payment options tailored to suit your budget.{' '}
            <span className="block pt-4 ">
              {' '}
              As your trusted source for top-brand tires at discount prices,
              we’re dedicated to making sure you dont have to compromise on
              quality. Select one of the options below during checkout to secure
              your financing today!{' '}
            </span>
          </p>
        </div>
        {/* Payment Table Section */}
        <PaymentTable />
        {/* Mobile Financing Section */}
        <FinancingMobile />
        {/* Shop Now Button */}
        <div className="w-full max-w-[384px] text-center m-auto">
          <Link href={'/collections/product-category/tires'}>
            <button className="rounded-xl px-6 w-full flex flex-1 gap-2 justify-center items-center relative h-14 bg-primary hover:bg-orange-700 text-white hover:text-white transition duration-300 ease-in-out">
              {/* <MdOutlineShoppingCart className="text-white text-lg font-semibold"/> */}
              <img
                src="Cart-Large.png"
                alt="cart"
                className="w-[20px] h-[20px]"
              />

              <p className="text-lg leading-[22px] text-white">
                <span className="text-white text-lg font-semibold">
                  Shop now
                </span>
              </p>
            </button>
          </Link>
        </div>
        {/* Contact Us Section */}
        <div className="w-full flex flex-col items-center gap-3 sm:gap-4 pt-8 sm:pt-10">
          <h1 className="text-[32px] text-center font-bold text-[#210203]">
            Still Have A Questions?
          </h1>
          <p className="text-center text-base font-normal text-[#210203]">
            We will be happy to answer any questions you may have.
          </p>
          <div className="text-center w-[166px] h-14 ">
            <Link href="/contact-us">
              <button
                className={`w-full h-full flex gap-2 items-center border border-[#210203] text-[#210203] text-lg font-semibold px-6 rounded-lg hover:bg-[#F7F7F7]`}
              >
                <FaPhone className="text-lg text-[#210203]" />
                <span className="inline-block whitespace-nowrap">
                  Contact Us
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Financing;
