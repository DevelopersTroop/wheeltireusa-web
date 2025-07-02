import React from 'react';

const OurStory: React.FC = () => {
  return (
    <>
      <div className="w-full h-full">
        <div className="w-full h-full flex flex-col md:flex-row md:gap-20">
          <div className="w-full px-4 md:pl-6 lg:pl-8 xl:pl-16 md:w-[55%] flex flex-col gap-8 items-start justify-center pt-18 md:pt-0 pb-12 md:pb-0">
            <div className="flex flex-col gap-4">
              <h2 className="text-[40px] sm:text-5xl lg:text-[64px] text-[#212227] font-bold">
                Our Story
              </h2>
              <p className="text-base sm:text-xl text-[#464853] font-normal">
                Tirematic was born out of a need to bridge the gap between
                traditional tire shopping and the convenience of modern
                technology. Our founders saw an opportunity to bring tire
                expertise online, offering customers a smarter, easier, and more
                transparent way to find the perfect tires for their vehicles.
              </p>
              <p className="text-base sm:text-xl text-[#464853] font-normal">
                From humble beginnings, weve grown into a trusted name, serving
                drivers across the nation with reliability and care. Our journey
                continues as we expand our services and enhance our offerings,
                ensuring that every customers experience exceeds expectations.
              </p>
            </div>
          </div>
          <div className="w-full h-[360px] md:h-[693px] md:w-[45%] flex flex-row">
            <div className="w-full h-full">
              <img
                src="/images/about/tire1.png"
                alt="Tire1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-full ">
              <img
                src="/images/about/tire2.png"
                alt="Tirematic"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-full">
              <img
                src="/images/about/tire3.png"
                alt="Tirematic"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStory;
