import Container from '@/components/ui/container/container';
import Image from 'next/image';
import Link from 'next/link';

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

const DealsAndRebatesContent = () => {
  return (
    <Container className="flex flex-col gap-8 mx-auto py-10">
      <div className="flex flex-col gap-3 sm:gap-4 text-start">
        <h2 className="text-2xl sm:text-[40px] font-bold text-start">
          Deals and Rebates
        </h2>
        {/* <p className="text-lg sm:text-xl font-normal text-start text-[#464853]">
          Your road to great deals starts here
        </p> */}
      </div>
      <div className="grid xl:grid-cols-2 gap-3 sm:gap-8">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow overflow-hidden"
          >
            <div className="w-full  sm:w-1/2 relative h-[220px] md:h-[248px]">
              <Image
                src={deal.image}
                alt={deal.title}
                layout="fill"
                objectFit="cover"
                className="rounded-l-xl w-full h-full object-cover"
              />
              <span className="h-8 absolute top-5 left-5 bg-[#F6511D] text-white text-lg font-bold px-3  rounded">
                {deal.daysLeft} days left
              </span>
            </div>
            <div className="w-full sm:w-1/2 flex flex-col justify-center px-4 gap-5 py-6 sm:py-0">
              {deal.brand && (
                <img src={deal?.brand} alt={deal.brand} className="w-24 h-4" />
              )}
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold sm:font-bold mb-2">
                  {deal.title}
                </h3>
                <p className="text-base text-[#464853] font-normal">
                  {deal.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        href={'/deals'}
        className="text-[#212227] text-xl underline font-normal text-center"
      >
        View all deals
      </Link>
    </Container>
  );
};

export default DealsAndRebatesContent;
