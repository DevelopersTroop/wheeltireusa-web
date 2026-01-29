import Container from '@/components/ui/container/container';

// This component renders a hero banner for the "In-Stock Steering Wheel" section.
const BlogBanner = () => {
  // Define inline styles for the background image of the banner
  const bannerImg = {
    // backgroundImage: `url("/images/banner/in-stock/in-stock-Steering-wheels.png")`,
    backgroundPosition: '80% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    // Outer container for the banner with full width and fixed height
    <div className="w-full relative h-[150px] sm:h-[280px]" style={bannerImg}>
      {/* Dark gradient overlay for better text visibility */}
      <div className="absolute left-0 top-0 w-full h-full bg-linear-to-r from-black/90 to-black/0"></div>
      {/* Using the Container component to wrap the content */}
      <Container>
        {/* Flex container for positioning text content */}
        <div className="flex flex-col gap-2 sm:gap-6 justify-center -top-[11px] items-start self-stretch relative h-[150px] sm:h-[280px]">
          <h5 className="text-xl text-white">
            <span className="text-white text-base sm:text-xl font-normal [text-shadow:2px_2px_4px_black]">
              {"What's new at TireMatic"}
            </span>
          </h5>
          {/* Main title: "In-Stock Steering Wheel" */}
          <h1 className="text-2xl min-[400px]:text-[32px] sm:text-5xl text-white">
            <span className="text-white font-bold uppercase [text-shadow:2px_2px_4px_black]">
              Blogs
            </span>
          </h1>
          {/* Subtitle: "Find Your Perfect Steering Wheel..." */}
        </div>
      </Container>
    </div>
  );
};

export default BlogBanner;
