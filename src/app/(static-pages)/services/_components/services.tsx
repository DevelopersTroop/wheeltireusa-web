import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import ServicesHero from './services-hero';
// Component to render the Privacy Policy page
const Services = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/services`} isEnd={true}>
                Services
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Privacy Policy page */}
      <ServicesHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">Services</h2>
            <p>Last Updated: June 12, 2025</p>
            <p>
              Welcome to{' '}
              <span className="font-semibold text-btext">
                Tirematic Services
              </span>{' '}
              , where we do more than just sell tires. Our goal is to make your
              tire buying experience as easy, affordable, and safe as possible.
              Here’s an overview of the key services and perks we offer to
              ensure your ride stays smooth from start to finish:
            </p>

            <p>
              {' '}
              <span className="font-bold"> Fast & Free Shipping:</span> We offer
              fast, free shipping on all tires, getting your order to you (or
              your installer) quickly at no extra cost. No hidden fees – just
              affordable tires delivered to your doorstep for your convenience.
            </p>

            <p>
              {' '}
              <span className="font-bold">
                {' '}
                Local Installation Partners:
              </span>{' '}
              Don’t have a wrench or tire machine? No worries! Tirematic
              partners with certified local installers nationwide. You can
              easily schedule an installation at checkout and have your new
              tires shipped directly to a nearby shop. This means you save time
              and ensure the job is done safely by a professional.
            </p>

            <p>
              {' '}
              <span className="font-bold"> Deals & Discounts:</span> Everyone
              loves a good deal. Check out our latest tire deals and rebates for
              special savings on top brands. We also proudly offer an exclusive
              Military Discount for active and retired service members – it’s
              our way of saying thank you (see our Military Discount page for
              details). Affordability is one of our core values, so we’re always
              running promotions to help you save.
            </p>

            <p>
              {' '}
              <span className="font-bold"> Fleet Solutions:</span> If you manage
              a business or fleet, Tirematic has you covered. Our Fleet
              Solutions service provides bulk pricing and dedicated support for
              commercial accounts. Keep your company’s vehicles safe on the road
              with cost-effective tire packages and priority service tailored
              for businesses.
            </p>

            <p>
              {' '}
              <span className="font-bold"> Mobile App Convenience:</span> Shop
              on the go with the Tirematic app (coming soon!). Our modern mobile
              app will let you search for tires, read reviews, and track orders
              right from your phone. It’s a convenient way to manage your tire
              needs anytime, anywhere – perfect for busy drivers.
            </p>

            <p>
              {' '}
              <span className="font-bold"> Tire & Wheel Packages:</span> Upgrade
              made easy! We offer tire packages, including tire-and-wheel
              bundles and seasonal tire packages. These curated sets take the
              guesswork out of matching tires with wheels or finding the right
              winter setup. You get a complete package designed for perfect fit
              and performance – plus package pricing saves you money.
            </p>

            <p>
              {' '}
              <span className="font-bold"> Flexible Financing:</span> Need new
              tires now but want to pay over time? We’ve got flexible financing
              options to fit your budget. Qualified buyers can access 0% APR
              plans or lease-to-own programs through our trusted partners,
              making those big purchases easier on your wallet. Drive now, pay
              later – stress-free!
            </p>

            <p>
              {' '}
              <span className="font-bold">
                {' '}
                At Tirematic, your safety and satisfaction come first.
              </span>{' '}
              Our services are designed to deliver convenience and peace of
              mind, whether you’re a daily commuter, a weekend off-roader, or a
              fleet manager. Enjoy an all-in-one tire shopping experience that’s
              simple, friendly, and centered on you.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Services;
