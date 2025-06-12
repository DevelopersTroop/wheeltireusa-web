import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import MilitaryDiscountHero from './military-discount-hero';
// Component to render the Privacy Policy page
const MilitaryDiscount = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/military-discount`} isEnd={true}>
                Military Discount
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Privacy Policy page */}
      <MilitaryDiscountHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">
              Military Discount
            </h2>
            <p>Last Updated: June 12, 2025</p>
            <p>
              <span className="font-semibold text-btext">
                Honoring Those Who Serve{' '}
              </span>
              at Tirematic, we’re proud to support the brave men and women in
              our armed forces. Our Military Discount program is a small token
              of appreciation for active duty members and veterans. We believe
              quality tires should be affordable for everyone, especially those
              who have served our country.
            </p>

            {/* <h2 className="text-2xl font-semibold text-btext" >
              What Is the Discount?
            </h2>
            <p>
              Eligible military members can enjoy an exclusive discount on all tires and services. This means extra savings on our already competitive prices. (For example, many of our military customers receive a 5% off discount on their orders — a nice added perk to help stretch your budget.) We combine affordability with gratitude, ensuring you get a great deal on safe, reliable tires.
            </p> */}

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-2xl font-semibold text-btext">
                What Is the Discount?
              </h2>
              <p>
                Eligible military members can enjoy an exclusive discount on all
                tires and services. This means extra savings on our already
                competitive prices. (For example, many of our military customers
                receive a 5% off discount on their orders — a nice added perk to
                help stretch your budget.) We combine affordability with
                gratitude, ensuring you get a great deal on safe, reliable
                tires.
              </p>
            </div>

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-2xl font-semibold text-btext">
                Who Qualifies?
              </h2>
              <p>
                All active duty service members, military veterans, and reserves
                qualify for Tirematic’s military discount. In many cases,
                immediate family members may be eligible too. If you’ve worn the
                uniform or supported someone who does, we want to thank you with
                this savings opportunity.
              </p>
            </div>

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-2xl font-semibold text-btext">
                How to Redeem Your Military Discount:
              </h2>
              <ul className="list-disc pl-5">
                <li>
                  {' '}
                  <span className="font-bold">
                    {' '}
                    Verify Your Military Status:{' '}
                  </span>{' '}
                  During checkout, simply select the “Military Discount” option.
                  You’ll be guided through a quick verification (we partner with
                  a trusted service to instantly confirm your military status,
                  hassle-free). If you prefer, you can also contact our Customer
                  Support with proof of service, and we’ll apply the discount
                  manually.
                </li>
                <li>
                  {' '}
                  <span className="font-bold"> Apply the Discount: </span> Once
                  verified, your discount will be applied automatically to your
                  order total. You’ll see the savings in your cart before you
                  complete payment.
                </li>
                <li>
                  {' '}
                  <span className="font-bold"> Enjoy the Savings: </span> That’s
                  it! Checkout as usual and enjoy your new tires at a discounted
                  price. We’ll handle the rest – from fast shipping to helping
                  arrange installation if needed.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-xl font-semibold text-btext">A Few Notes:</h2>
              <ul className="list-disc pl-5">
                <li>
                  Our military discount can be combined with most other
                  promotions and rebates for even bigger savings. (Stack that
                  savings whenever possible!)
                </li>
                <li>
                  {' '}
                  This discount is our year-round offer – not just on certain
                  holidays. Whether it’s Veterans Day or any day, we’ve got your
                  back.
                </li>
                <li>
                  If you have any trouble verifying online, our support team is
                  just a call or chat away to assist. We’re here to make it
                  easy.
                </li>
              </ul>
            </div>

            <p>
              On behalf of the entire Tirematic team: Thank you for your
              service! We’re honored to help you stay safe on the road, and this
              is one way we give back. If you have questions about eligibility
              or the process, please reach out to us.
            </p>

            <p>
              <span className="font-semibold">
                {' '}
                Ready to shop with your discount?{' '}
              </span>{' '}
              Browse our tire selection and enjoy knowing you’re getting a great
              deal. Driving on quality tires shouldn’t be a luxury – and for our
              military community, it’s our mission to keep it affordable, safe,
              and convenient.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MilitaryDiscount;
