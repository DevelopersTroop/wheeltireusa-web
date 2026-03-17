"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { truncWord } from "@/utils/string";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Container from "@/components/ui/container/container";

const HomeBlogList = () => {
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
                "The Corvette Z06 GT3.Rs of Pratt Miller Motorsports didn’t start at the front of the pack, during the sixth race of the 2025 IMSA Weathertech season, at Virginia International Raceway.",
        },
        {
            title: "Corvette GT3.R Earns Road America Victories",
            date: "Aug 20, 2025",
            slug: "corvette-gt3r-road-america",
            image: "/images/home-categories/category-3.webp",
            excerpt:
                "Chevrolet’s Corvette Z06 GT3.R enjoyed an extremely successful weekend of racing at the GT America World Challenge Crown Coins Casino GT World event, earning two victories.",
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

    return (
        <>
            

            <div className="max-w-[1350px] p-4 mx-auto py-10 px-25">
                {/* Section Title */}
                <div className="py-4 lg:py-8">
                    <hr className="border-primary border-[1.5px] w-[100px]" />
                    <h3 className="text-3xl lg:text-4xl font-bold uppercase">
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
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        spaceBetween={45}
                        loop={true}
                        style={{ paddingLeft: 35, paddingRight: 35 }}
                        className="!w-full !pb-10"
                    >
                        {/* LEFT BUTTON */}
                        <button className="swiper-button-prev-blog cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-30 hover:scale-110 transition-all duration-200">
                            <ChevronLeft size={38} />
                        </button>

                        {/* Slides */}
                        {posts.map((blog, i) => (
                            <SwiperSlide key={i} className="flex">
                                <div className="shadow-lg rounded-[6px] p-4 flex flex-col h-[360px] w-full hover:shadow-xl transition-all duration-300">

                                    {/* Image */}
                                    <Link
                                        href={`/blog/${blog.slug}`}
                                        className="relative h-[160px] w-full block overflow-hidden rounded-md"
                                    >
                                        <Image
                                            fill
                                            src={blog.image}
                                            alt={blog.title}
                                            style={{ objectFit: "cover" }}
                                        />
                                    </Link>

                                    {/* Content */}
                                    <div className="mt-3 flex flex-col flex-grow">
                                        <Link href={`/blog/${blog.slug}`}>
                                            <h3 className="font-bold text-lg line-clamp-2 hover:text-primary transition-colors">
                                                {blog.title}
                                            </h3>
                                        </Link>

                                        <p className="text-muted font-semibold text-sm mt-1">
                                            {blog.date}
                                        </p>

                                        <p className="text-muted text-sm mt-1 line-clamp-3 flex-grow">
                                            {truncWord(blog.excerpt, 22)}
                                        </p>
                                    </div>

                                    {/* Bottom Button (always aligned) */}
                                    <Link
                                        className="inline-flex text-primary font-medium text-sm items-center gap-1 mt-2"
                                        href={`/blog/${blog.slug}`}
                                    >
                                        <span>Read More</span>
                                        <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}

                        {/* RIGHT BUTTON */}
                        <button className="swiper-button-next-blog cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-30 hover:scale-110 transition-all duration-200">
                            <ChevronRight size={38} />
                        </button>
                    </Swiper>
                </div>
            </div>

        </>

    );
};

export default HomeBlogList;