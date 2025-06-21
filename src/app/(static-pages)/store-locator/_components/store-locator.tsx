import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import StoreLocatorHero from './store-locator-hero';
// Component to render the Store Location page
const StoreLocator = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/store-locator`} isEnd={true}>
                Store Locator
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Store Location page */}
      <StoreLocatorHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">Store Locator</h2>
            <p>Last Updated: June 3, 2025</p>
            <p>
              Looking for a tire installation center or Tirematic partner shop
              near you? Our Store Locator tool makes it easy and convenient to
              find trusted tire installers in your area. We want to ensure that
              after you buy your tires, getting them on your vehicle is a smooth
              ride too! Here’s how our Store Locator (a.k.a the Installer
              Finder) works and how it helps you:
            </p>

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-2xl font-semibold text-btext">
                Find a Trusted Installer in 3 Easy Steps:
              </h2>
              <ul className="list-disc pl-5">
                <li>
                  {' '}
                  <span className="font-bold"> Enter Your Location: </span>{' '}
                  Simply input your ZIP code or city into the Store Locator.
                  You’ll find the search bar right on the Store Locator page –
                  it’s hard to miss. Hit “Search” and our system will do the
                  rest, scanning for certified partner installers near you.
                </li>
                <li>
                  {' '}
                  <span className="font-bold">
                    {' '}
                    Browse Nearby Installers:{' '}
                  </span>{' '}
                  Within seconds, you’ll see a list (and map) of nearby tire
                  shops and service centers that partner with Tirematic. You can
                  view each installer’s name, address, and even how far they are
                  from you. We include helpful details like customer ratings,
                  service offerings (e.g., tire installation, balancing,
                  alignment services), and hours of operation. This way, you can
                  choose a location that fits your needs and schedule.
                </li>
                <li>
                  {' '}
                  <span className="font-bold"> Choose & Schedule: </span> Found
                  a shop you like? Awesome! Click on it to see more details and
                  then select “Schedule Installation” (or a similar button) to
                  book your appointment. You can often pick a date and time slot
                  that works for you. Once confirmed, we can ship your tires
                  directly to that installer so they’ll be ready when you
                  arrive. You just show up for your appointment and let the pros
                  handle the rest!
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-2xl font-semibold text-btext">
                Why Use Tirematic’s Store Locator?
              </h2>
              <ul className="list-disc pl-5">
                <li>
                  {' '}
                  <span className="font-bold"> Certified Partners: </span> We’ve
                  done the homework for you. All the installers in our network
                  are certified professionals with a track record of quality
                  service. We vet our partners to ensure they meet our standards
                  for safety and customer satisfaction. Your car will be in good
                  hands.
                </li>
                <li>
                  {' '}
                  <span className="font-bold"> Convenience: </span> No more
                  calling around town asking if a shop can put on tires you
                  bought online. With our integrated scheduling, you secure your
                  install appointment as you purchase your tires. It’s seamless
                  – buy tires, pick installer, book time. Tires can be delivered
                  to the shop ahead of time, saving you the hassle of lugging
                  them around.
                </li>
                <li>
                  {' '}
                  <span className="font-bold"> Transparent Info: </span> The
                  Store Locator gives you key info at a glance – like operating
                  hours and even pricing estimates for installation fees. Many
                  of our partners list their installation price per tire
                  upfront, so you won’t have surprises. Plus, seeing ratings and
                  reviews helps you pick a place where others have had a good
                  experience.
                </li>
                <li>
                  {' '}
                  <span className="font-bold"> Map View: </span> If you’re a
                  visual person, switch to the map view to see pins of each
                  installer around your area. Zoom in/out to explore. Perhaps
                  there’s an installer near your work or on your commute – plan
                  your appointment at the most convenient spot for you.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-2xl font-semibold text-btext">
                Tips for a Smooth Installation:
              </h2>
              <ul className="list-disc pl-5">
                <li>
                  {' '}
                  <span className="font-bold"> Book Early: </span> Popular time
                  slots (like weekends) can fill up fast, especially during peak
                  seasons (winter tire swap time, for example). Use the Store
                  Locator to book your install as soon as you order your tires
                  to get your preferred slot.
                </li>
                <li>
                  {' '}
                  <span className="font-bold">
                    {' '}
                    Double-Check Details:{' '}
                  </span>{' '}
                  Make sure the contact info you provide is correct, and keep an
                  eye on your email/phone for any confirmation or communication
                  from us or the installer. We’ll send you a confirmation of
                  your appointment.
                </li>
                <li>
                  {' '}
                  <span className="font-bold"> Prep for Appointment: </span> On
                  the day of installation, bring your vehicle in at the
                  scheduled time. The installer will have your new tires (if we
                  shipped them directly) and will take care of mounting and
                  balancing. It’s a quick process – many installations are done
                  in under an hour. Feel free to ask the technician any
                  questions while you’re there; they know tires!
                </li>
              </ul>
            </div>
            <p>
              With Tirematic’s Store Locator, getting your new tires installed
              is hassle-free. It’s all about convenience and peace of mind – you
              get to choose a location you trust, at a time that works for you,
              and you know upfront what to expect. We’ve combined the ease of
              online tire shopping with the personal service of local shops for
              the best of both worlds.
            </p>
            <p>
              Ready to find your installer? Try the Store Locator now – enter
              your ZIP code and get started. In just a few clicks, you’ll be on
              your way to new tires, professionally installed and ready to roll.
              Happy travels, and thanks for choosing Tirematic to keep you
              moving safely!
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default StoreLocator;
