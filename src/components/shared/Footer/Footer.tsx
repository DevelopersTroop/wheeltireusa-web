"use client";
import { openNewsletterModal } from "@/redux/features/newsletterModalSlice";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, MailCheck, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function Footer() {
  const dispatch = useDispatch();
  return (
    <>
      {/* <FAQs /> */}
      <footer className="bg-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-gray-700 text-2xl font-semibold mb-4">
                Need Help?
              </h3>
              <div className="space-y-2">
                <p>
                  Hi, we are always open for cooperation and suggestions,
                  contact us in one of the ways below:
                </p>
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-gray-600">Phone Number</p>
                    <p className="text-gray-700 font-semibold">
                      +1 (813) 812-5257
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600">Email Address</p>
                    <p className="text-gray-700 font-semibold">
                      info@wheeltireusa.com
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {/* <div>
                  <p className="text-gray-600">Our Location</p>
                  <p className="text-gray-700 font-semibold">
                    KTC AUDIO 2193 S. CHAMBERS RD AURORA, CO. 80014
                  </p>
                </div> */}

                  <div>
                    <p className="text-gray-600">Working Hours</p>
                    <p className="text-gray-700 font-semibold">
                      Monday-Friday 9:00am -7:00pm, Saturday 10:00am-4:00pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-gray-700 text-2xl font-semibold mb-4">
                Information
              </h3>
              <div className="space-y-2">
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Terms of service
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Shipping Policy
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Refund policy
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Privacy policy
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Contact Us
                </Link>
                <Link
                  href="/about"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  About Us
                </Link>

                <Link
                  href="/blog"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Blogs
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-gray-700 text-2xl font-semibold mb-4">
                My Account
              </h3>
              <div className="space-y-2">
                <Link
                  href="/dashboard/orders"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Order History
                </Link>
                <Link
                  href="/dashboard/save-product"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Wishlist
                </Link>
                <Link
                  href="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Special Offers
                </Link>
                <Link
                  href="/store-location"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Store Location
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-gray-700 text-2xl font-semibold mb-4">
                Stay Connected
              </h3>
              <div className="flex gap-4 mb-8">
                <Link
                  href="https://www.facebook.com/ktcaudiocustomwheelsandtires"
                  target="_blank"
                >
                  <Facebook className="w-6 h-6 text-gray-600 hover:text-primary cursor-pointer" />
                </Link>
                <Link
                  href="https://www.youtube.com/@ktcaudio313"
                  target="_blank"
                >
                  <Youtube className="w-6 h-6 text-gray-600 hover:text-primary cursor-pointer" />
                </Link>
                <Instagram className="w-6 h-6 text-gray-600 hover:text-primary cursor-pointer" />
                <Twitter className="w-6 h-6 text-gray-600 hover:text-primary cursor-pointer" />
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

          <div className="mt-12 pt-4 border-t text-sm text-gray-600 text-center">
            <div className="space-x-2">
              <Link href="#" className="hover:underline">
                Terms of Use
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline">
                Terms and Conditions
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline">
                California Consumer Privacy Act
              </Link>
              <span>|</span>
              <Link href="#" className="hover:underline">
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
