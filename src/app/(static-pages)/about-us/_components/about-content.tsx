import Container from '@/components/ui/container/container';
import React from 'react';

const AboutContent: React.FC = () => {
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

      <div className="bg-[#111113] text-white py-16 sm:py-[152px]">
        <Container>
          <div className="w-full flex flex-col gap-10 sm:gap-20">
            <div className="w-full flex flex-col gap-4">
              <h2 className="text-[40px] sm:text-5xl lg:text-[64px] font-bold text-white">
                What Drives Us
              </h2>
              <p className="text-base sm:text-xl font-normal text-[#F5F4F6]">
                At Tirematic, we re more than just a tire provider — were
                revolutionizing the way people shop for and maintain their
                tires. By combining modern technology with personalized support,
                weve built a business that prioritizes customer satisfaction,
                affordability, and transparency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
              {/* Card 1 */}
              <div className="flex flex-col gap-4 bg-[#212227] rounded-md py-8 px-6 sm:py-10 sm:px-8">
                <div>
                  <img src={'/images/about/User-Hand-Up.svg'} alt="Hand-Up" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    Customer-Centric
                  </h3>
                  <p className="text-base font-normal text-[#F5F4F6]">
                    Every decision we make is focused on delivering the best
                    experience for you.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col gap-4 bg-[#212227] rounded-md py-8 px-6 sm:py-10 sm:px-8">
                <div>
                  <img src={'/images/about/Wheel.svg'} alt="wheel" />{' '}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    Expertise You Can Trust
                  </h3>
                  <p className="text-base font-normal text-[#F5F4F6]">
                    Our team is highly trained to provide guidance tailored to
                    your driving needs.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col gap-4 bg-[#212227] rounded-md py-8 px-6 sm:py-10 sm:px-8">
                <div>
                  {' '}
                  <img
                    src={'/images/about/Lightbulb Bolt.svg'}
                    alt="light"
                  />{' '}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    Innovation at the Core
                  </h3>
                  <p className="text-base font-normal text-[#F5F4F6]">
                    Leveraging cutting-edge tools and technology to simplify the
                    tire buying process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

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

export default AboutContent;
