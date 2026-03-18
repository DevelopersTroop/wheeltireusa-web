import Link from "next/link";

const ViewGallery = () => {
  return (
    <div className="relative max-w-[1350px] mx-auto overflow-hidden shadow-lg">
      {/* Gallery Image */}
      <img
        src="/images/gallery/image20.jpeg"
        alt="Gallery"
        className="w-full h-[250px] sm:h-[380px] md:h-[500px] lg:h-[600px] object-cover transition-transform duration-500 hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Heading */}
      <h1 className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-white uppercase text-center px-4 drop-shadow-lg whitespace-nowrap">
        Truck Gallery
      </h1>

      {/* Button */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
        <Link
          href="/ktc-audio-gallery"
          className="inline-block bg-primary text-white py-2 px-5 sm:py-3 sm:px-8 rounded-lg text-base sm:text-xl md:text-2xl font-medium shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
        >
          View Gallery
        </Link>
      </div>
    </div>
  );
};

export default ViewGallery;