import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FooterNewsletter } from '../FooterNewsletter/FooterNewsletter';
import navMenus from '../Navbar/navMenus';

// Footer Component
// This component renders the footer section of the website, including links, social media icons, contact information, and a newsletter subscription form.
export const Footer = () => {
  return (
    <div className="relative z-10 bg-black">
      {' '}
      {/* Footer background color */}
      <footer className="container">
        <div className={'py-14 text-white'}>
          <div className={'flex gap-12 flex-col justify-between lg:flex-row'}>
            {/* Left Section: Logo, Social Media, and Main Menu */}
            <div
              className={
                'flex flex-col lg:flex-row w-full lg:w-1/2 gap-x-8 gap-y-10'
              }
            >
              <div
                className={
                  'w-full lg:w-2/3 flex flex-col items-center lg:items-start justify-between'
                }
              >
                <div className={'space-y-10'}>
                  {/* Logo */}
                  <div className={'flex justify-center lg:justify-start'}>
                    <Link href={'/'}>
                      <Image
                        src="/logo.png"
                        alt="Tirematic"
                        width={100}
                        height={100}
                      />
                    </Link>
                  </div>
                  {/* Social Media Links */}
                  <div className={'mt-8'}>
                    <ul
                      className={
                        'flex p-0 text-2xl gap-8 md:gap-6 lg:gap-8 max-w-full'
                      }
                    >
                      <li>
                        <Link
                          target={'_blank'}
                          href="https://www.facebook.com/AmaniForged"
                        >
                          <FaFacebook />
                        </Link>
                      </li>
                      <li>
                        <Link
                          target={'_blank'}
                          href="https://www.youtube.com/channel/UCE9HtYyk7xz89S7MrpxOL4g"
                        >
                          <FaYoutube />
                        </Link>
                      </li>
                      <li>
                        <Link
                          target={'_blank'}
                          href="https://www.instagram.com/amaniforged"
                        >
                          <FaInstagram />
                        </Link>
                      </li>
                      <li>
                        <Link
                          target={'_blank'}
                          href="https://www.tiktok.com/@amaniforged"
                        >
                          <FaTiktok />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Privacy Policy and Copyright */}
                <div
                  className={
                    'mt-12 text-[rgb(188,184,184)] text-[14px] hidden lg:block'
                  }
                >
                  <div>
                    &copy; 2025 Amani Forged Wheels. All Rights Reserved.
                  </div>
                  <div>
                    <Link href={'/terms-conditions'}>
                      Terms and Conditions |{' '}
                    </Link>
                    <Link href={'/privacy-policy'}>Privacy Policy | </Link>
                    <Link href={'/cookie-policy'}>Cookie Policy</Link>
                  </div>
                </div>
              </div>
              {/* Main Menu Links */}
              <div className={'w-full lg:w-1/3 font-normal'}>
                {/* <h3 className={"uppercase font-bold mb-3"}>Main Menu</h3> */}
                <ul
                  className={
                    'flex text-base p-0 list-none flex-col gap-2.5 items-center lg:justify-start lg:items-start'
                  }
                >
                  {navMenus.map((menu) => (
                    <li key={menu.href}>
                      <Link
                        target="_blank"
                        href={menu.href}
                        className={'text-base font-normal'}
                      >
                        {menu.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Right Section: About and Contact */}
            <div
              className={
                'w-full lg:w-1/2 flex flex-col items-center text-center lg:text-start lg:flex-row lg:items-start gap-x-8 gap-y-10'
              }
            >
              <div className={'w-full flex flex-col gap-y-6'}>
                <h3 className={'capitalize font-bold'}>Where it all began</h3>
                <p className={'leading-loose'}>
                  What began as a distribution warehouse full of passionate
                  wheel enthusiasts, quickly evolved into the youngest
                  multi-piece forged wheel line in the world…{' '}
                  <Link
                    href="/about-us"
                    className={'text-white font-bold underline block'}
                  >
                    Read More
                  </Link>
                </p>
              </div>
              <div
                className={
                  'w-full flex flex-col gap-y-6 items-center lg:items-start'
                }
              >
                <h3 className={'uppercase font-bold'}>Contact Us</h3>
                <div className="flex flex-col gap-4">
                  <Link
                    className="text-white font-normal flex items-center gap-2"
                    href="tel:+18663447857"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.9635 12.422L12.5839 12.7994C12.5839 12.7994 11.6818 13.6964 9.21927 11.2479C6.75676 8.79934 7.65892 7.90231 7.65892 7.90231L7.89793 7.66465C8.48673 7.0792 8.54223 6.13926 8.02853 5.45307L6.97771 4.0494C6.3419 3.20009 5.1133 3.0879 4.38454 3.81252L3.07654 5.11309C2.71519 5.47239 2.47304 5.93816 2.50241 6.45483C2.57753 7.77668 3.1756 10.6207 6.5128 13.939C10.0518 17.4579 13.3724 17.5977 14.7302 17.4711C15.1597 17.4311 15.5333 17.2123 15.8343 16.913L17.0181 15.736C17.8171 14.9414 17.5918 13.5793 16.5694 13.0235L14.9774 12.158C14.306 11.7931 13.4881 11.9003 12.9635 12.422Z"
                        fill="white"
                      />
                    </svg>
                    1 (866) 344-7857
                  </Link>
                  <Link
                    className="flex gap-2 items-center font-normal text-white"
                    href="mailto:sales@amaniforged.com"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.64306 4.30981C1.66675 5.28612 1.66675 6.85747 1.66675 10.0002C1.66675 13.1429 1.66675 14.7142 2.64306 15.6905C3.61937 16.6668 5.19072 16.6668 8.33341 16.6668H11.6667C14.8094 16.6668 16.3808 16.6668 17.3571 15.6905C18.3334 14.7142 18.3334 13.1429 18.3334 10.0002C18.3334 6.85747 18.3334 5.28612 17.3571 4.30981C16.3808 3.3335 14.8094 3.3335 11.6667 3.3335H8.33342C5.19072 3.3335 3.61937 3.3335 2.64306 4.30981ZM15.4802 6.26671C15.7012 6.53189 15.6654 6.92599 15.4002 7.14697L13.5698 8.6723C12.8312 9.28785 12.2325 9.78676 11.7041 10.1266C11.1537 10.4806 10.6176 10.7042 10.0001 10.7042C9.38252 10.7042 8.84648 10.4806 8.29606 10.1266C7.76768 9.78676 7.16901 9.28786 6.43038 8.67231L4.59997 7.14697C4.33479 6.92599 4.29897 6.53189 4.51994 6.26671C4.74092 6.00154 5.13502 5.96571 5.4002 6.18669L7.19928 7.68592C7.97674 8.33381 8.51652 8.78218 8.97223 9.07527C9.41337 9.35899 9.71252 9.45423 10.0001 9.45423C10.2876 9.45423 10.5868 9.35899 11.0279 9.07527C11.4836 8.78218 12.0234 8.33381 12.8009 7.68592L14.6 6.18669C14.8651 5.96571 15.2592 6.00154 15.4802 6.26671Z"
                        fill="white"
                      />
                    </svg>
                    <span>sales@amaniforged.com</span>
                  </Link>
                </div>
                {/* Newsletter Subscription */}
                <div className={'mt-3'}>
                  <FooterNewsletter />
                </div>
              </div>
            </div>
            {/* Mobile Privacy Policy */}
            <div
              className={
                'text-[rgb(188,184,184)] text-[14px] lg:hidden text-center'
              }
            >
              <div>&copy; 2025 Amani Forged Wheels. All Rights Reserved.</div>
              <div>
                <Link href={'/terms-conditions'}>Terms and Conditions | </Link>
                <Link href={'/privacy-policy'}>Privacy Policy | </Link>
                <Link href={'/cookie-policy'}>Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
