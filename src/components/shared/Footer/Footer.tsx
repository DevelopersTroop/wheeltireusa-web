import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { AiOutlineX } from 'react-icons/ai';
import Container from '@/components/ui/container/container';

// Footer Component
// This component renders the footer section of the website, including links, social media icons, contact information, and a newsletter subscription form.
export const Footer = () => {
  return (
    <div className="relative z-10 bg-black">
      {/* Footer background color */}
      <Container>
        <div className={'w-full py-14 text-white'}>
          <div
            className={
              'w-full flex gap-12 flex-col justify-between lg:flex-row'
            }
          >
            {/* Left Section: Logo, Social Media, and Main Menu */}
            <div
              className={
                'flex flex-col lg:flex-row w-full lg:w-[320px] gap-x-8 gap-y-10'
              }
            >
              <div
                className={
                  'w-full flex flex-col items-center lg:items-start justify-between'
                }
              >
                <div
                  className={
                    'w-full flex flex-col items-center lg:items-start space-y-10'
                  }
                >
                  {/* Logo */}
                  <div className={'flex justify-center lg:justify-start'}>
                    <Link href={'/'}>
                      <Image
                        src="/images/header/TirematicLogo.svg"
                        alt="Tirematic"
                        width={160}
                        height={29}
                        quality={100}
                        unoptimized={true}
                        className="h-7 lg:h-8 w-full object-contain"
                      />
                    </Link>
                  </div>

                  <div className="w-full flex flex-col items-center  lg:items-start gap-5">
                    <h3 className={'text-2xl font-bold'}>
                      Your Road to Reliability
                    </h3>
                    <Link href={'/collections/product-category/tires'}>
                      <button className="w-[320px] max-w-[384px] bg-[#F6511D] hover:bg-[#e0551b] text-white font-semibold text-lg px-6 py-3 rounded flex items-center justify-center gap-2">
                        <img src="/images/shopCategoty/Vector.svg" />
                        Find Your Perfect Match
                      </button>
                    </Link>
                    <p className={'leading-loose'}>
                      Guaranteed Best Prices on Tires and Wheels
                    </p>
                  </div>
                  {/* Social Media Links */}
                  <div className={'mt-8 text-center lg:text-left'}>
                    <ul
                      className={
                        'flex p-0 text-2xl gap-8 md:gap-6 lg:gap-8 max-w-full'
                      }
                    >
                      <li>
                        <Link target={'_blank'} href="#">
                          <FaFacebook className="w-8 h-8" />
                        </Link>
                      </li>
                      <li>
                        <Link target={'_blank'} href="#">
                          <FaYoutube className="w-8 h-8" />
                        </Link>
                      </li>
                      <li>
                        <Link target={'_blank'} href="#">
                          <FaInstagram className="w-8 h-8" />
                        </Link>
                      </li>
                      <li>
                        <Link target={'_blank'} href="#">
                          <AiOutlineX className="w-8 h-8" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Main Menu Links */}
            <div className={'w-full lg:w-1/5 font-normal'}>
              <ul
                className={
                  'flex text-base p-0 list-none flex-col gap-5 items-center lg:justify-start lg:items-start'
                }
              >
                <li>
                  <Link href={'#'} className={'text-lg font-semibold'}>
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href={'#'} className={'text-base font-normal'}>
                    Tire Search
                  </Link>
                </li>
                <li>
                  <Link href={'/services'} className={'text-base font-normal'}>
                    Services
                  </Link>
                </li>

                <li>
                  <Link href={'/deals'} className={'text-base font-normal'}>
                    Deals and Rebates
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/military-discount'}
                    className={'text-base font-normal'}
                  >
                    Military Discount
                  </Link>
                </li>
                <li>
                  <Link href={'/financing'} className={'text-base font-normal'}>
                    Financing Options
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Care */}
            <div className={'w-full lg:w-1/5 font-normal'}>
              <ul
                className={
                  'flex text-base p-0 list-none flex-col gap-5 items-center lg:justify-start lg:items-start'
                }
              >
                <li>
                  <Link href={'#'} className={'text-lg font-semibold'}>
                    Customer Care
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/customer-support'}
                    className={'text-base font-normal'}
                  >
                    Customer Support
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/store-locator'}
                    className={'text-base font-normal'}
                  >
                    Store Locator
                  </Link>
                </li>

                <li>
                  <Link
                    href={'/return-policy'}
                    className={'text-base font-normal'}
                  >
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/safety-tips'}
                    className={'text-base font-normal'}
                  >
                    Safety Tips
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tips & Guidelines */}
            <div className={'w-full lg:w-1/5 font-normal'}>
              <ul
                className={
                  'flex text-base p-0 list-none flex-col gap-5 items-center lg:justify-start lg:items-start'
                }
              >
                <li>
                  <Link href={'#'} className={'text-lg font-semibold'}>
                    Tips & Guidelines
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/safety-tips'}
                    className={'text-base font-normal'}
                  >
                    Tire Safety
                  </Link>
                </li>
                <li>
                  <Link href={'#'} className={'text-base font-normal'}>
                    Tire Size Calculator
                  </Link>
                </li>

                <li>
                  <Link
                    href={'/tire-pressure-guide'}
                    className={'text-base font-normal'}
                  >
                    Tire Pressure Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/installation-tips'}
                    className={'text-base font-normal'}
                  >
                    Installation Tips
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/blog-resources'}
                    className={'text-base font-normal'}
                  >
                    Blog Resources
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="w-full lg:w-1/5 font-normal text-white">
              <ul className="flex text-base p-0 list-none flex-col gap-5 items-center lg:items-start">
                <li>
                  <Link href={'#'} className="text-lg font-semibold">
                    Company
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="text-base font-normal">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-base font-normal">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/become-an-installer"
                    className="text-base font-normal"
                  >
                    Become an Installer
                  </Link>
                </li>
                <li className="w-full h-full flex items-center justify-center my-auto">
                  <div className="h-px bg-[#3D3F48] w-full" />
                </li>
                <li>
                  <h4 className="text-base font-normal">Contact information</h4>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <img
                    src="/images/MapPoint.png"
                    className='="w-4 h-4'
                    alt="location"
                  />
                  <span>
                    Customer Service 2232 Dell Range Blvd Ste 242 #5367
                    Cheyenne, WY 82009
                  </span>
                </li>
                <li className="flex flex-col text-sm">
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/phone.png"
                      className="w-4 h-4"
                      alt="phone"
                    />
                    <span>(844) 576-2842</span>
                  </div>
                  <span className="text-xs text-gray-400 ml-6">
                    (Mon–Sat, 9 AM – 6 PM)
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className={'flex flex-col gap-8  text-center mt-4'}>
            <div className="flex flex-row gap-6 justify-center underline">
              <Link href={'/privacy-policy'}>Privacy Policy </Link>
              <Link href={'/terms-of-use'}>Terms of Use</Link>
              <Link href={'/warranty'}>Warranty</Link>
              <Link href={'/sitemap.xml'}>Sitemap</Link>
            </div>
            <div>&copy; 2025 Tirematic Corporation. All Rights Reserved.</div>
          </div>
        </div>
      </Container>
    </div>
  );
};
