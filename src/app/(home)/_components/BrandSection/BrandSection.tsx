import Container from '@/components/ui/container/container';
import Image from 'next/image';

type Feature = {
  icon: string;
  title: string;
  subtitle: string;
};

const features: Feature[] = [
  {
    icon: '/images/truck-fast.svg',
    title: 'Fast & Free Shipping',
    subtitle: 'Speedy delivery, zero shipping fees',
  },
  {
    icon: '/images/Card.svg',
    title: 'Financing Options',
    subtitle: 'Buy now, pay later with flexible plans',
  },
  {
    icon: '/images/Sale.svg',
    title: 'The Best Deals',
    subtitle: 'Top quality, lowest prices from the Best Brands',
  },
];

const BrandSection = () => {
  return (
    <div className="bg-[#212227] py-16 sm:pt-10 sm:pb-14   text-white">
      <Container>
        <div className="mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-2">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={48}
                height={48}
              />
              <h3 className="font-semibold text-2xl">{feature.title}</h3>
              <p className="text-base text-[#F5F4F6]">{feature.subtitle}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BrandSection;
