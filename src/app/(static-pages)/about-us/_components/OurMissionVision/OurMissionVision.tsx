import Container from '@/components/ui/container/container';
import React from 'react';

const OurMissionVision: React.FC = () => {
  return (
    <>
      <div className="w-full mx-auto bg-[#5762D5] py-16">
        <Container>
          <div className="w-full flex flex-col">
            {/* Mission */}
            <div className="w-full sm:w-[50%] flex flex-col gap-4">
              <h2 className="text-[40px] sm:text-5xl lg:text-[64px] font-bold text-white">
                Our Mission
              </h2>
              <p className="text-base sm:text-xl font-normal  leading-relaxed text-[#F5F4F6] break-words">
                To deliver exceptional tire solutions at unbeatable value. At
                Tirematic, we strive to make tire buying an effortless,
                customer-first experience that empowers drivers with confidence
                on the road.
              </p>
            </div>

            {/* Vision */}
            <div className="w-full flex flex-row justify-between items-start text-end">
              <div className="hidden sm:w-[50%] sm:flex flex-row gap-4 mb-8"></div>
              <div className="w-full sm:w-[50%] flex flex-col justify-end items-end gap-4">
                <h2 className="text-[40px] sm:text-5xl lg:text-[64px] font-bold text-white">
                  Our Vision
                </h2>
                <p className="text-base sm:text-xl font-normal leading-relaxed text-[#F5F4F6] break-words">
                  We envision a future where every driver has access to
                  top-quality tires, trusted expertise, and seamless services,
                  making road safety and reliability accessible for all.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="w-full h-[220px] sm:h-[320px]">
        <img
          src="/images/about/Rectangle.png"
          alt="about image"
          className="w-full h-full object-cover"
        />
      </div>
    </>
  );
};

export default OurMissionVision;
