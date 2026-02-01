import { Button } from "@/components/ui/button";
import Link from "next/link";

const WheelsSection = () => {
  return (
    <div
      className="relative lg:h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/gallery/image9.jpeg')`,
      }}
    >
      <div className="h-full bg-white/40">
        <div className="container mx-auto sm:px-2 py-4 h-full flex items-center sm:items-start justify-end ">
          <div className="max-w-2xl bg-gray-400/70 p-4 md:p-8 lg:rounded-3xl text-black space-y-4">
            <div className="flex gap-4 items-center">
              {/* <img
                src="/images/logo.png"
                alt="ktc audio"
                className="h-8 mb-6 inline-block"
              /> */}
              <p className="text-2xl">
                WheelTireUSA – Your go-to place for wheels & tires
              </p>
            </div>
            <p className="text-lg leading-relaxed mb-8">
              At WheelTireUSA, we make it easy to find the right wheels and
              tires for your vehicle. We offer trusted brands, great prices, and
              fast service so you can upgrade your car with confidence. Whether
              you’re looking for custom wheels, all-season tires, or complete
              wheel and tire packages, we’re here to help you get the perfect
              fit. Shop with us for quality products, reliable support, and a
              smooth, hassle-free experience every time.
            </p>

            <Link className="mt-4 inline-block" href="/collections/product-category/wheels">
              <Button className="bg-primary hover:bg-primary-hover text-white font-bold h-12 block px-8 text-lg uppercase tracking-wider">
                Shop Wheels
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WheelsSection;
