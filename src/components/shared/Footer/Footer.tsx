"use client";
import { openNewsletterModal } from "@/redux/features/newsletterModalSlice";
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, MailCheck } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function Footer() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="text-center container mx-auto px-4 text-gray-500">
        <p>
          {
            `
            FORD, FORD F-150 & F-150, FORD F-250 & F-250, FORD F-350 & F-350, FORD RANGER, FORD LIGHTNING, FORD MAVERICK, SUPERCREW, SUPERCAB, POWER STROKE, TRITON V8, ECOBOOST, SUPERDUTY,& TREMOR ARE REGISTERED TRADEMARKS OF THE FORD MOTOR COMPANY. COLORADO, Z71, ZR2, TRAIL BOSS, DURAMAX, CHEVROLET, GMC, CHEVROLET SILVERADO, CHEVROLET TAHOE, GMC SIERRA, GMC CANYON, SILVERADO, SIERRA,DENALI,VORTEC LS V8, DURAMAX, LTZ, SILVERADO LT, SILVERADO HD, SIERRA ALL TERRAIN X, ECOTEC3, Z-71, SILVERADO 1500, SILVERADO SS, YUKON, AT4, AT4X, SLE, AND SLT ARE REGISTERED TRADEMARKS OF GENERAL MOTORS COMPANY (GM). DODGE, DODGE RAM, RAM TRUCKS, RAM 1500, RAM 2500, RAM 3500, DAKOTA, SRT/10, 1500 SLT PLUS, 1500 SLT, ST, LARAMIE, DAYTONA, MEGA CAB, SLT/SPORT/TRX, SLT/TRX, LE, SE, SHELBY, S, WS, SXT, TRX4, BIG HORN, LONE STAR, R/T, SPORT, LARAMIE LONGHORN, TRADESMAN HEAVY DUTY, TRADESMAN/EXPRESS, TRADESMAN, HFE, REBEL, LONGHORN ARE REGISTERED TRADEMARKS OF FIAT CHRYSLER AUTOMOBILES (FCA). ALLISON TRANSMISSION IS A REGISTERED TRADEMARK OF ALLISON TRANSMISSION, INC. CUMMINS IS A REGISTERED TRADEMARK OF CUMMINS INC. SALEEN IS A REGISTERED TRADEMARK OF SALEEN INCORPORATED. ROUSH IS A REGISTERED TRADEMARK OF ROUSH ENTERPRISES, INC. AMERICANTRUCKS HAS NO AFFILIATION WITH THE FORD MOTOR COMPANY, CUMMINS, INC., ALLISON TRANSMISSION, INC., ROUSH ENTERPRISES, SALEEN, THE GENERAL MOTORS COMPANY OR FIAT CHRYSLER AUTOMOBILES.
            `
          }
        </p>
      </div>
      {/* <FAQs /> */}
      <footer className="bg-black pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-2xl font-semibold mb-4">
                Need Help?
              </h3>
              <div className="space-y-2">
                <p className="text-gray-400">
                  Hi, we are always open for cooperation and suggestions,
                  contact us in one of the ways below:
                </p>
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-white">Phone Number</p>
                    <p className="text-gray-300 font-semibold">
                      +1 (813) 812-5257
                    </p>
                  </div>

                  <div>
                    <p className="text-white">Email Address</p>
                    <p className="text-gray-300 font-semibold">
                      info@wheeltireusa.com
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {/* <div>
                  <p className="text-white">Our Location</p>
                  <p className="text-gray-700 font-semibold">
                    KTC AUDIO 2193 S. CHAMBERS RD AURORA, CO. 80014
                  </p>
                </div> */}

                  <div>
                    <p className="text-white">Working Hours</p>
                    <p className="text-gray-300 font-semibold">
                      Monday-Friday 9:00am -7:00pm, Saturday 10:00am-4:00pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white text-2xl font-semibold mb-4">
                Information
              </h3>
              <div className="space-y-2">
                <Link
                  href="/terms-of-use"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Terms of service
                </Link>
                <Link
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Shipping Policy
                </Link>
                <Link
                  href="/return-policy"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Refund policy
                </Link>
                <Link
                  href="/privacy-policy"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Privacy policy
                </Link>
                <Link
                  href="/terms-and-conditions-of-sale"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Terms and Conditions of Sale
                </Link>
                <Link
                  href="/ccpa-notice"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  CCPA Notice
                </Link>
                <Link
                  href="/ccpa-opt-out"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  CCPA Opt-Out
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/about"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>

                <Link
                  href="/blog"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Blogs
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-white text-2xl font-semibold mb-4">
                My Account
              </h3>
              <div className="space-y-2">
                <Link
                  href="/dashboard/orders"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Order History
                </Link>
                <Link
                  href="/dashboard/save-product"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Wishlist
                </Link>
                <Link
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Special Offers
                </Link>
                <Link
                  href="/store-location"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Store Location
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-white text-2xl font-semibold mb-4">
                Stay Connected
              </h3>
              <div className="flex gap-4 mb-8">
                <Link
                  href="https://www.facebook.com/profile.php?id=61584811679009"
                  target="_blank"
                >
                  <Facebook className="w-6 h-6 text-white hover:text-primary cursor-pointer" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/wheel-tire-usa/"
                  target="_blank"
                >
                  <Linkedin className="w-6 h-6 text-white hover:text-primary cursor-pointer" />
                </Link>
              </div>
              <Button
                onClick={() => {
                  dispatch(openNewsletterModal());
                }}
                className="font-semibold"
              >
                <MailCheck />
                Subscribe to Newsletter
              </Button>
              {/* Brand Logos */}
              {/* <div className="space-y-4">
              <img
                src="/custom-offsets-logo.png"
                alt="Custom Offsets"
                className="h-8"
              />
              <img src="/arkon-logo.png" alt="Arkon" className="h-8" />
              <img src="/anthem-logo.png" alt="Anthem" className="h-8" />
              <img
                src="/trail-built-logo.png"
                alt="Trail Built"
                className="h-8"
              />
              <img src="/fitment-logo.png" alt="Fitment" className="h-8" />
              <img src="/novia-logo.png" alt="Novia" className="h-8" />
              <img
                src="/performance-logo.png"
                alt="Performance"
                className="h-8"
              />
            </div> */}
            </div>
          </div>

          <div className="mt-12 pt-4 border-t text-sm text-white text-center">
            <div className="space-x-2">
              <Link href="/terms-of-use" className="hover:underline">
                Terms of Use
              </Link>
              <span>|</span>
              <Link href="/terms-and-conditions-of-sale" className="hover:underline">
                Terms and Conditions
              </Link>
              <span>|</span>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="/ccpa-notice" className="hover:underline">
                California Consumer Privacy Act
              </Link>
              <span>|</span>
              <Link href="/ccpa-opt-out" className="hover:underline">
                CCPA Opt Out
              </Link>
              <span>|</span>
              <span>© 2025 Wheel Tire USA</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
