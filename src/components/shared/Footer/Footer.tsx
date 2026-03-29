"use client";
import { openNewsletterModal } from "@/redux/features/newsletterModalSlice";
import { Button } from "@/components/ui/button";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function Footer() {
  const dispatch = useDispatch();

  return (
    <>
      

      {/* Footer */}
      <footer className="bg-black max-w-[1350px] mx-auto mt-12 sm:mt-16 lg:mt-20 pt-10 sm:pt-12 pb-6 px-4 sm:px-6 lg:px-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">

          {/* Need Help */}
          <div>
            <h3 className="text-white text-xl sm:text-2xl font-semibold mb-4">
              Need Help?
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Hi, we are always open for cooperation and suggestions, contact
              us in one of the ways below:
            </p>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-white text-sm">Phone Number</p>
                <p className="text-gray-300 font-semibold text-sm">
                  +1 (813) 812-5257
                </p>
              </div>
              <div>
                <p className="text-white text-sm">Email Address</p>
                <p className="text-gray-300 font-semibold text-sm break-all">
                  info@wheeltireusa.com
                </p>
              </div>
              <div>
                <p className="text-white text-sm">Working Hours</p>
                <p className="text-gray-300 font-semibold text-sm">
                  Monday–Friday 9:00am–7:00pm, Saturday 10:00am–4:00pm
                </p>
              </div>
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-white text-xl sm:text-2xl font-semibold mb-4">
              Information
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Terms of service",            href: "/terms-of-use" },
                { label: "Shipping Policy",             href: "#" },
                { label: "Refund policy",               href: "/return-policy" },
                { label: "Privacy policy",              href: "/privacy-policy" },
                { label: "Terms and Conditions of Sale",href: "/terms-and-conditions-of-sale" },
                { label: "CCPA Notice",                 href: "/ccpa-notice" },
                { label: "CCPA Opt-Out",                href: "/ccpa-opt-out" },
                { label: "Contact Us",                  href: "/contact" },
                { label: "About Us",                    href: "/about" },
                { label: "Blogs",                       href: "/blog" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* My Account */}
          <div>
            <h3 className="text-white text-xl sm:text-2xl font-semibold mb-4">
              My Account
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Order History",   href: "/dashboard/orders" },
                { label: "Wishlist",        href: "/dashboard/save-product" },
                { label: "Special Offers",  href: "#" },
                { label: "Store Location",  href: "/store-location" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Stay Connected */}
          <div>
            <h3 className="text-white text-xl sm:text-2xl font-semibold mb-4">
              Stay Connected
            </h3>
            <Button
              onClick={() => dispatch(openNewsletterModal())}
              className="font-semibold w-full sm:w-auto"
            >
              <MailCheck className="mr-2 w-4 h-4" />
              Subscribe to Newsletter
            </Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-4 border-t border-gray-700 text-xs sm:text-sm text-gray-400 text-center">
          {/* Mobile: stack links vertically */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-y-2 gap-x-1">
            <Link href="/terms-of-use" className="hover:text-white hover:underline transition-colors">
              Terms of Use
            </Link>
            <span className="hidden sm:inline text-gray-600">|</span>
            <Link href="/terms-and-conditions-of-sale" className="hover:text-white hover:underline transition-colors">
              Terms and Conditions
            </Link>
            <span className="hidden sm:inline text-gray-600">|</span>
            <Link href="/privacy-policy" className="hover:text-white hover:underline transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline text-gray-600">|</span>
            <Link href="/ccpa-notice" className="hover:text-white hover:underline transition-colors">
              California Consumer Privacy Act
            </Link>
            <span className="hidden sm:inline text-gray-600">|</span>
            <Link href="/ccpa-opt-out" className="hover:text-white hover:underline transition-colors">
              CCPA Opt Out
            </Link>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span className="text-gray-500">© 2025 Wheel Tire USA</span>
          </div>
        </div>
      </footer>
    </>
  );
}