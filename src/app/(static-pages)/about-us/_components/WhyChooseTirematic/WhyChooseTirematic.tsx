import Container from '@/components/ui/container/container';

const features = [
  {
    icon: '/images/about/VerifiedCheck.svg',
    title: 'Top-Quality Products',
    description:
      'We offer a wide range of trusted tire brands to suit every vehicle and budget.',
  },
  {
    icon: '/images/about/MonitorSmartphone.png',
    title: 'Unmatched Convenience',
    description:
      'Shop from the comfort of your home with our user-friendly online platform.',
  },
  {
    icon: '/images/about/Wheel2.png',
    title: 'Expert Assistance',
    description:
      'Our tire professionals are here to guide you every step of the way.',
  },
  {
    icon: '/images/about/BillCheck.png',
    title: 'Affordable Pricing',
    description:
      'Competitive prices and flexible financing options make premium tires accessible to all.',
  },
  {
    icon: '/images/about/ShieldCheck.png',
    title: 'Commitment to Safety',
    description:
      'We ensure that every tire meets the highest standards of safety and performance.',
  },
];

const WhyChooseTirematic = () => {
  return (
    <Container>
      <div className=" flex flex-col gap-6 sm:gap-10 py-16 sm:py-28 bg-white">
        <h2 className="text-[32px] sm:text-5xl lg:text-[64px] font-bold text-[#212227]">
          Why Choose Tirematic?
        </h2>
        <div className="flex flex-col gap-3 sm:gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {features.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 bg-[#F5F4F6] py-10 px-8 rounded-lg "
              >
                <div>
                  <img src={feature.icon} alt={feature.title} />{' '}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-[#212227]">
                    {feature.title}
                  </h3>
                  <p className="text-base font-normal">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-8">
            {features.slice(3, 5).map((feature, index) => (
              <div
                key={index + 3}
                className="flex flex-col gap-4 bg-[#F5F4F6] py-10 px-8 rounded-lg "
              >
                <div>
                  <img src={feature.icon} alt={feature.title} />{' '}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-[#212227]">
                    {feature.title}
                  </h3>
                  <p className="text-base font-normal">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WhyChooseTirematic;
