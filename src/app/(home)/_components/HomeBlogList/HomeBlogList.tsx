"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { truncWord } from "@/utils/string";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const posts = [
  {
    title: "Happy Labor Day 2025!",
    date: "Aug 29, 2025",
    slug: "happy-labor-day-2025",
    image: "/images/home-categories/category-1.webp",
    excerpt:
      "On Monday, September 1, 2025, we will be taking some time off to celebrate the labor, skill, and dedication of the American workforce and to show appreciation for our hardworking team.",
  },
  {
    title: "Pratt Miller Motorsports 1st And 3rd At VIR",
    date: "Aug 27, 2025",
    slug: "pratt-miller-motorsports-vir",
    image: "/images/home-categories/category-2.webp",
    excerpt:
      "The Corvette Z06 GT3.Rs of Pratt Miller Motorsports didn't start at the front of the pack, during the sixth race of the 2025 IMSA Weathertech season, at Virginia International Raceway.",
  },
  {
    title: "Corvette GT3.R Earns Road America Victories",
    date: "Aug 20, 2025",
    slug: "corvette-gt3r-road-america",
    image: "/images/home-categories/category-3.webp",
    excerpt:
      "Chevrolet's Corvette Z06 GT3.R enjoyed an extremely successful weekend of racing at the GT America World Challenge Crown Coins Casino GT World event, earning two victories.",
  },
  {
    title: "One Weekend, Two Great Events",
    date: "Aug 13, 2025",
    slug: "one-weekend-two-events",
    image: "/images/home-categories/category-4.webp",
    excerpt:
      "There is something for every automotive lover to enjoy, when two great events happen on the first weekend of September, Triple Crown of Rodding and Holley LS Fest East.",
  },
];

const HomeBlogList = () => {
  return (
    <div className="max-w-[1350px] mx-auto py-8 sm:py-10 px-0 sm:px-6 lg:px-10">
      {/* Section Title */}
      <div className="py-4 lg:py-8 px-4 sm:px-0">
        <hr className="border-primary border-[1.5px] w-[100px] mb-2" />
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase">
          Latest News
        </h3>
      </div>

      {/* Slider */}
      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          navigation={{
            nextEl: ".swiper-button-next-blog",
            prevEl: ".swiper-button-prev-blog",
          }}
          breakpoints={{
            320:  { slidesPerView: 1, spaceBetween: 16 },
            640:  { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
          loop={true}
          className="!w-full !px-8 sm:!px-10"
        >
          {posts.map((blog, i) => (
            <SwiperSlide key={i} className="!h-auto">
              <div className="shadow-lg rounded-[6px] p-3 sm:p-4 flex flex-col h-full w-full hover:shadow-xl transition-all duration-300">

                {/* Image */}
                <Link
                  href={`/blog/${blog.slug}`}
                  className="relative h-[140px] sm:h-[160px] w-full block overflow-hidden rounded-md shrink-0"
                >
                  <Image
                    fill
                    src={blog.image}
                    alt={blog.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </Link>

                {/* Content */}
                <div className="mt-3 flex flex-col flex-grow min-h-0">
                  <Link href={`/blog/${blog.slug}`}>
                    <h3 className="font-bold text-base sm:text-lg line-clamp-2 hover:text-primary transition-colors leading-snug">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-muted font-semibold text-xs sm:text-sm mt-1">
                    {blog.date}
                  </p>
                  <p className="text-muted text-xs sm:text-sm mt-1 line-clamp-3 flex-grow">
                    {truncWord(blog.excerpt, 22)}
                  </p>
                </div>

                {/* Read More — pinned to bottom */}
                <Link
                  className="inline-flex text-primary font-medium text-sm items-center gap-1 mt-3 shrink-0"
                  href={`/blog/${blog.slug}`}
                >
                  <span>Read More</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="swiper-button-prev-blog cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-30 text-black hover:text-primary hover:scale-110 transition-all duration-200">
          <ChevronLeft size={32} className="sm:w-9 sm:h-9" />
        </button>
        <button className="swiper-button-next-blog cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-30 text-black hover:text-primary hover:scale-110 transition-all duration-200">
          <ChevronRight size={32} className="sm:w-9 sm:h-9" />
        </button>
      </div>
    </div>
  );
};

export default HomeBlogList;