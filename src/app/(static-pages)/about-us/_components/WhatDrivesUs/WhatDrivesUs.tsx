import Container from '@/components/ui/container/container';
import React from 'react';

const WhatDrivesUs: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default WhatDrivesUs;
