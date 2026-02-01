import Link from "next/link";

const ViewGallery = () => {
  return (
    <div className="relative text-center">
      <img
        src="/images/gallery/image20.jpeg"
        alt="Gallery"
        className="w-full"
      />

      <div className="absolute top-0 w-full h-[15%] bg-gradient-to-b from-white to-white/0"></div>
      <h1 className="absolute top-[10%] left-1/2 transform -translate-x-1/2  text-3xl md:text-7xl uppercase font-serif whitespace-nowrap">
        Truck Gallery
      </h1>
      <div>
        <Link href="/ktc-audio-gallery">
          <button className="absolute bottom-[5%] text-2xl left-1/2 transform -translate-x-1/2 outline outline-1 outline-primary hover:outline-primary-hover text-white py-2 px-10 whitespace-nowrap">
            View Gallery
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ViewGallery;
