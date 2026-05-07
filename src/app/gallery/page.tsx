"use client";
import Link from "next/link";
import React from "react";
import GalleryFilters from "./components/filters/gallery-filters";
import Gallery from "./components/gallery";
import SidebarFilters from "../collections/product-category/[categorySlug]/_filters/mobile-filters/SidebarFilter";
import Container from "@/components/ui/container/container";

const KtcAudioGalleryPage: React.FC = () => {
  return (
    <Container>
      <div className="w-full text-center text-2xl py-4">
        <h1>Largest Gallery of Custom Trucks</h1>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-5 p-4">
        <div className="md:hidden">
          <SidebarFilters>
            <GalleryFilters />
          </SidebarFilters>
          <Link
            className="bg-primary text-white text-center py-2 rounded-md font-semibold"
            href={"/gallery/submit"}
          >
            Submit your gallery
          </Link>
        </div>
        <div className="hidden md:flex flex-col gap-3 md:w-[400px] h-full max-w-[300px]">
          {/* <GalleryYMMFilters /> */}
          <GalleryFilters />
          <Link
            className="bg-primary text-white text-center py-2 rounded-md font-semibold"
            href={"/gallery/submit"}
          >
            Submit your gallery
          </Link>
        </div>
        <Gallery />
      </div>
    </Container>
  );
};

export default KtcAudioGalleryPage;
