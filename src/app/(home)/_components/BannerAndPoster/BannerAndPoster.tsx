import Image from "next/image";
import Link from "next/link";

const BannerAndPoster = () => {
  return (
    <section className="bg-gradient-to-b max-w-[1200px] rounded-lg my-15 mx-auto from-[#fde0d6] to-[#fff5f0] py-16">
      <div className="max-w-[1350px] mx-auto px-10 space-y-20">

        {/* First Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[280px] sm:h-[380px] lg:h-[480px] rounded-xl overflow-hidden shadow-xl group">
            <Image
              fill
              src="/images/abouthero.jpeg"
              alt="for race or street"
              style={{ objectFit: "cover" }}
              className="transition-transform duration-700 group-hover:scale-105"
              priority
            />
            {/* Diagonal overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent transform rotate-[-3deg] origin-top-left"></div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl lg:text-4xl font-extrabold uppercase tracking-wider text-primary">
              FOR RACE OR STREET
            </h3>
            <p className="text-muted leading-relaxed text-lg">
              We built our reputation by engineering and building wheels for the highest levels of motorsport,
              focusing on customers of all types and genres using Forgeline’s quality and craftsmanship on their vehicles.
              All our forged wheels are custom made-to-order one at a time for each individual customer and each unique vehicle
              application. Whether you’re competing wheel-to-wheel, building a one-of-a-kind custom or outfitting your daily
              driver, we can engineer and build a unique wheel that perfectly fits your vehicle and your personality.
            </p>
            <Link href="/collections/product-category/wheels" className="inline-block">
              <span className="px-6 py-3 text-primary bg-white bg-opacity-60 text-sm font-semibold uppercase rounded-md shadow-md outline outline-1 outline-primary hover:bg-primary hover:text-white transition-all duration-300">
                Shop Wheels
              </span>
            </Link>
          </div>
        </div>

        {/* Second Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <h3 className="text-3xl lg:text-4xl font-extrabold uppercase tracking-wider text-primary">
              CUSTOM SIZES
            </h3>
            <p className="text-muted leading-relaxed text-lg">
              Custom made-to-order means we engineer and build every set of forged wheels from scratch to match each
              specific customer’s order. This includes not only building the style of wheel you want, but also tailoring the
              sizes you need. With some practical limitations dictated by forging availability, most of our wheels can be made
              to fit your needs in a wide range of diameters up to 22 inches, depending on wheel model and virtually any width.
            </p>
            <Link href="/collections/product-category/wheels" className="inline-block">
              <span className="px-6 py-3 text-primary bg-white bg-opacity-60 text-sm font-semibold uppercase rounded-md shadow-md outline outline-1 outline-primary hover:bg-primary hover:text-white transition-all duration-300">
                Learn More
              </span>
            </Link>
          </div>
          <div className="relative h-[280px] sm:h-[380px] lg:h-[480px] rounded-xl overflow-hidden shadow-xl order-1 lg:order-2 group">
            <Image
              fill
              src="/images/loginhero.jpeg"
              alt="custom sizes"
              style={{ objectFit: "cover" }}
              className="transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent transform rotate-[-3deg] origin-top-left"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BannerAndPoster;