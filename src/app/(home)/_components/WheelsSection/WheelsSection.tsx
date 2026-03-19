import { Button } from "@/components/ui/button";
import Link from "next/link";

const WheelsSection = () => {
  return (
    <div className="relative lg:h-[600px] md:h-[500px] h-[400px] overflow-hidden max-w-[1200px] mx-auto rounded-xl">
      {/* Background image with subtle zoom animation */}
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-100 hover:scale-105 transition-transform duration-700 ease-in-out"
        style={{ backgroundImage: `url('/images/gallery/image9.jpeg')` }}
      ></div>

      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/40"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-end">
        <div className="max-w-xl bg-white/20 backdrop-blur-md border border-white/20 p-4 md:p-6 lg:rounded-2xl text-white space-y-4 shadow-lg hover:shadow-2xl transition-shadow duration-500">
          <div className="flex gap-2 items-center">
            {/* Logo optional */}
            {/* <img
              src="/images/logo.png"
              alt="ktc audio"
              className="h-8 inline-block"
            /> */}
            <p className="text-2xl md:text-3xl font-bold tracking-wide">
              WheelTireUSA – Your go-to place for wheels & tires
            </p>
          </div>

          <p className="text-base md:text-lg leading-relaxed opacity-90">
            At WheelTireUSA, we make it easy to find the right wheels and tires for your vehicle.
            Trusted brands, great prices, and fast service help you upgrade with confidence. Shop
            custom wheels, all-season tires, or complete wheel & tire packages hassle-free.
          </p>

          <Link href="/collections/product-category/wheels">
            <Button className="bg-primary hover:bg-primary-hover text-white font-bold h-12 px-6 text-base uppercase tracking-wider transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
              Shop Wheels
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WheelsSection;