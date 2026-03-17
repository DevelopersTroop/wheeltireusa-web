import Link from "next/link";

const ViewGallery = () => {
  return (
    <div className="relative max-w-[1350px] mx-auto overflow-hidden shadow-lg">
      {/* Gallery Image */}
      <img
        src="/images/gallery/image20.jpeg"
        alt="Gallery"
        className="w-full h-[500px] object-cover md:h-[600px] transition-transform duration-500 hover:scale-105"
      />

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Heading */}
      <h1 className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-white uppercase text-center px-4 drop-shadow-lg">
  Truck Gallery
</h1>

      {/* Button */}
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2">
  <Link href="/ktc-audio-gallery">
    <button className="bg-primary text-white py-3 px-8 rounded-lg text-xl md:text-2xl font-medium 
      shadow-md hover:shadow-xl hover:scale-105  transition-transform transition-shadow transition-colors duration-300">
      View Gallery
    </button>
  </Link>
</div>
    </div>
  );
};

export default ViewGallery;