"use client";
import { useParams } from "next/navigation";

import GalleryDetails from "./gallery-details";
import ImageGallery from "./image-gallery";
import { useGetGalleryQuery } from "@/redux/apis/gallery";
import Container from "@/components/ui/container/container";
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import Item from "@/components/ui/breadcrumb/item";

const SingleProduct = () => {
  const { singleProduct } = useParams();
  const { data, isLoading } = useGetGalleryQuery(singleProduct as string);

  if (isLoading)
    return (
      <Container>
        <div className="py-20 text-center">Loading Build...</div>
      </Container>
    );
  if (!data?.gallery)
    return (
      <Container>
        <div className="py-20 text-center">Build not found.</div>
      </Container>
    );

  const { gallery } = data;

  return (
    <>
      <div className="p-4 bg-gray-50 border-b">
        <Breadcrumb>
          <Item href="/">Home</Item>
          <Item href="/gallery">Gallery</Item>
          <Item href={`/gallery/${singleProduct}`}> {gallery.title} </Item>
        </Breadcrumb>
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">
          {/* Left Column: Visuals */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <ImageGallery product={gallery} />
            <div className="hidden lg:block">
              <h1 className="text-4xl font-black uppercase italic mb-2 tracking-tighter">
                {gallery.title}
              </h1>
              <p className="text-gray-500 uppercase text-sm font-bold tracking-widest">
                Built by: {gallery.buildUsername || "Anonymous Enthusiast"}
              </p>
            </div>
          </div>

          {/* Right Column: Specs */}
          <div className="lg:col-span-4 bg-white shadow-sm border p-4 h-fit sticky top-4">
            <div className="lg:hidden mb-6">
              <h1 className="text-3xl font-black uppercase italic">
                {gallery.title}
              </h1>
            </div>
            <GalleryDetails product={gallery} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
