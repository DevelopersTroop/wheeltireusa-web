import Container from '@/components/ui/container/container';

const PerfectTireMatch = () => {
  return (
    <div className="bg-[#131316]">
      <Container className="!py-0">
        <div className="w-full lg:h-[548px] flex flex-col lg:flex-row gap-8 pt-16 lg:pt-0">
          <div className="w-full lg:w-2/5 flex flex-col gap-6 lg:gap-8 items-start justify-center">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl md:text-[40px] text-[#FFFFFF] font-bold">
                  Find Your Perfect Tire Match with Tirematic!
                </h2>
                <p className="text-lg md:text-xl text-[#FFFFFF] font-semibold">
                  Get Expert Recommendations for Every Road and Condition.
                </p>
              </div>
              <p className="text-base text-[#FFFFFF] font-normal">
                Our expertise in tire innovation and performance testing ensures
                that we guide you to the ideal tires for your driving needs.
                Whether it’s city commutes, off-road adventures, or seasonal
                travels, Tirematic has the perfect solution for you. Tell us
                your driving style, vehicle type, and road conditions, and we’ll
                provide tailored recommendations!
              </p>
            </div>
            <button className="w-full max-w-[384px] bg-[#F6511D] hover:bg-[#e0551b] text-white font-semibold text-lg px-6 py-3 rounded flex items-center justify-center gap-2">
              <img src="/images/shopCategoty/Vector.svg" /> Discover the Best
              Tires
            </button>
          </div>
          <div className="w-full lg:w-3/5 h-[360px] lg:h-full lg:max-h-[548px] flex flex-row relative">
            <div className="w-full h-full">
              <img
                src="/images/tireMatch/image1.png"
                alt="Tire"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block absolute bottom-0 md:-left-28 lg:-left-32">
              <img
                src="/images/tireMatch/tire.png"
                alt="Tirematic"
                className=" w-full h-full object-contain"
              />
            </div>
            <div className="w-full h-full">
              <img
                src="/images/tireMatch/image2.png"
                alt="Tirematic"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-full ">
              <img
                src="/images/tireMatch/image3.png"
                alt="Tirematic"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-full">
              <img
                src="/images/tireMatch/image4.png"
                alt="Tirematic"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PerfectTireMatch;
