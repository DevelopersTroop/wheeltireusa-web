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
      <div className="py-28 bg-white flex flex-col gap-10">
        <h2 className="text-2xl sm:text-[64px] font-bold text-[#212227]">
          Why Choose Tirematic?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300"
            >
              <div>
                {' '}
                <img src={feature.icon} alt={feature.title} />{' '}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default WhyChooseTirematic;
