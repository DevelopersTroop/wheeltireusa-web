// Component to render the banner section for the About Us page
const AboutBanner = () => {
  // Inline styles for the banner background image
  const banner = {
    backgroundImage: `url("/images/about/about-hero.png")`,
    backgroundPosition: '80% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    // height: "400px",
  };

  return (
    <div
      className="w-full flex items-center h-[162px] sm:h-[271px]"
      style={banner}
    >
      <div className="w-full py-5 pl-5 sm:pl-16">
        <div className="w-full flex flex-col items-center justify-center gap-1 sm:gap-4">
          {/* Banner title */}
          <p className="text-xl font-normal text-[#F5F4F6]">About</p>
          <h1 className="font-bold text-[32px] sm:text-[56px] text-white uppercase">
            Tirematic
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;
