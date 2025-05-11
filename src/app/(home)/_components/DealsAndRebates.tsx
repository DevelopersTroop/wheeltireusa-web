import Container from '@/components/ui/container/container';
import Image from 'next/image';

const deals = [
  {
    id: 1,
    image: '/images/deals/deals1.png',
    daysLeft: 4,
    brand: '/images/deals/Michelin.png',
    title: 'Save $70 on Michelin Tires This Month!',
    description:
      'Get $70 off a set of four select Michelin passenger or light truck tires. Experience legendary quality and performance for less.',
  },
  {
    id: 2,
    image: '/images/deals/deals2.png',
    daysLeft: 10,
    title: 'Up to 20% Off in Our Tire Clearance!',
    description:
      'Enjoy up to 20% off on a wide selection of all-season tires. Prepare your vehicle for any road condition without breaking the bank.',
  },
  {
    id: 3,
    image: '/images/deals/deals3.png',
    daysLeft: 14,
    title: 'Save 10% on Wheel & Tire Packages!',
    description:
      'Bundle your new tires with a set of wheels and save an extra 10% on the total purchase. Upgrade your ride and your savings!',
  },
  {
    id: 4,
    image: '/images/deals/deals4.png',
    daysLeft: 20,
    brand: '/images/deals/Goodyear.png',
    title: '$50 Rebate on Select Goodyear Tires!',
    description:
      'Purchase a qualifying set of four Goodyear tires and receive a $50 mail-in rebate. See rebate form for details.',
  },
];

const DealsAndRebates = () => {
  return (
    <Container className="mx-auto py-10 md:py-30">
      <h2 className="text-[40px] font-bold text-center mb-4">
        Deals and Rebates
      </h2>
      <p className="text-xl font-normal text-center text-[#464853] mb-8">
        Your road to great deals starts here
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="flex bg-white rounded-xl shadow overflow-hidden"
          >
            <div className="w-1/2 relative h-40 md:h-[248px]">
              <Image
                src={deal.image}
                alt={deal.title}
                layout="fill"
                objectFit="cover"
                className="rounded-l-xl"
              />
              <span className="h-8 absolute top-5 left-5 bg-[#F6511D] text-white text-lg font-bold px-3  rounded">
                {deal.daysLeft} days left
              </span>
            </div>
            <div className="w-1/2 flex flex-col justify-center px-4 py-6 gap-5">
              {deal.brand && (
                <img src={deal?.brand} alt={deal.brand} className="w-24 h-4" />
              )}
              <div>
                <h3 className="text-2xl font-bold mb-2">{deal.title}</h3>
                <p className="text-base text-[#464853] font-normal">
                  {deal.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <a href="#" className="text-[#212227] text-xl underline font-normal">
          View all deals
        </a>
      </div>
    </Container>
  );
};

export default DealsAndRebates;
