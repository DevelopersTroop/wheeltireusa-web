import Image from "next/image";
import Link from "next/link";

const BannerAndPoster = () => {
    return (
        <section className="bg-[#fde0d6]">
            <div className="max-w-[1350px] mx-auto p-4 py-10 space-y-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="relative h-[280px] sm:h-[380px] lg:h-[480px] rounded-md overflow-hidden">
                        <Image
                            fill
                            src="/images/abouthero.jpeg"
                            alt="for race or street"
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-2xl lg:text-3xl font-bold uppercase">FOR RACE OR STREET</h3>
                        <p className="text-muted leading-relaxed">
                            We built our reputation by engineering and building wheels for the highest levels of motorsport,
                            focusing on customers of all types and genres using Forgeline’s quality and craftsmanship on their vehicles.
                            All our forged wheels are custom made-to-order one at a time for each individual customer and each unique vehicle
                            application. Whether you’re competing wheel-to-wheel, building a one-of-a-kind custom or outfitting your daily
                            driver, we can engineer and build a unique wheel that perfectly fits your vehicle and your personality.
                        </p>
                        <Link href="/collections/product-category/wheels" className="inline-block">
                            <span className="px-4 py-2 text-primary bg-white bg-opacity-50 text-sm font-semibold uppercase outline outline-1 outline-primary hover:bg-primary hover:text-white transition-colors duration-300">
                                Shop Wheels
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4 order-2 lg:order-1">
                        <h3 className="text-2xl lg:text-3xl font-bold uppercase">CUSTOM SIZES</h3>
                        <p className="text-muted leading-relaxed">
                            Custom made-to-order means we engineer and build every set of forged wheels from scratch to match each
                            specific customer’s order. This includes not only building the style of wheel you want, but also tailoring the
                            sizes you need. With some practical limitations dictated by forging availability, most of our wheels can be made
                            to fit your needs in a wide range of diameters up to 22 inches, depending on wheel model and virtually any width.
                        </p>
                        <Link href="/collections/product-category/wheels" className="inline-block">
                            <span className="px-4 py-2 text-primary bg-white bg-opacity-50 text-sm font-semibold uppercase outline outline-1 outline-primary hover:bg-primary hover:text-white transition-colors duration-300">
                                Learn More
                            </span>
                        </Link>
                    </div>
                    <div className="relative h-[280px] sm:h-[380px] lg:h-[480px] rounded-md overflow-hidden order-1 lg:order-2">
                        <Image
                            fill
                            src="/images/loginhero.jpeg"
                            alt="custom sizes"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerAndPoster;
