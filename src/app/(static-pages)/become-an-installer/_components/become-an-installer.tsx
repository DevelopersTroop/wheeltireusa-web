import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import BecomeAnInstallerHero from './become-an-installer-hero';
// Component to render the Privacy Policy page
const BecomeAnInstaller = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/become-an-installer`} isEnd={true}>
                Become an Installer
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Privacy Policy page */}
      <BecomeAnInstallerHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">
              Become an Installer
            </h2>
            <p>
              Are you a tire shop or auto service center looking to boost your
              business? Become a Tirematic Installer! We invite professional
              installers to join our growing Tirematic Installer Network.
              Partnering with us means more customers, more installs, and more
              revenue – all with no cost to join. It’s a win-win opportunity,
              and we’re excited to tell you how it works.
            </p>
          </div>

          <div className="flex flex-col gap-2 items-start justify-center w-full">
            <h2 className="text-2xl font-semibold text-btext">
              Why Partner with Tirematic?
            </h2>

            <p>
              Tirematic is a modern tire e-commerce platform with customers
              ordering tires online every day. Many of these customers need a
              local professional to install their new tires. That’s where you
              come in! Here are some compelling reasons to become an installer
              with us:
            </p>

            <ul className="list-disc pl-5">
              <li>
                <span className="font-bold">
                  {' '}
                  New Customers, No Marketing Needed:{' '}
                </span>
                We do the heavy lifting of attracting online tire buyers. When
                they purchase, we guide them to choose a local installer (like
                you) for the installation service. That means we send customers
                to your shop. You’ll get increased foot traffic and the chance
                to earn their repeat business, all without spending extra on
                advertising. We essentially bring you qualified leads ready for
                an install.
              </li>
              <li>
                <span className="font-bold"> Additional Revenue: </span> For
                every Tirematic customer you service, you set the installation
                fee and get paid directly by the customer at the time of
                service. You keep 100% of what you charge for labor and any
                extras (like new valve stems, alignments, etc. if the customer
                opts in). Joining our network has no sign-up fee or hidden costs
                – it’s free to partner. We benefit by having happy customers
                with convenient installation, and you benefit from the service
                revenue.
              </li>
              <li>
                <span className="font-bold">No Inventory Headaches:</span>
                As an installer partner, you don’t need to stock every tire
                under the sun. The customer brings (or ships) the tires to you.
                Tirematic (and our distributors) handle the product side; you
                focus on what you do best – service. This means you can offer
                your customers a huge selection of tires via Tirematic without
                tying up capital in inventory. If a customer walks in wanting
                tires you don’t have in stock, you can even use Tirematic to
                help them order and earn the install. It’s like having a virtual
                inventory of thousands of tires!
              </li>

              <li>
                <span className="font-bold">Dedicated Support:</span>
                We treat our installer partners as a crucial part of the
                Tirematic family. You’ll have access to our Installer Support
                Team for any questions or issues (like shipment tracking,
                customer scheduling, etc.). We also provide easy-to-use tools to
                manage appointments. If you ever need assistance, we’re just a
                call or email away to help ensure everything goes smoothly for
                you and the customer.
              </li>

              <li>
                <span className="font-bold">Increased Online Visibility:</span>
                When you join, your shop gets listed on our Store Locator and
                during the checkout process as an available installer in your
                area. This is like free advertising on a platform reaching
                thousands of tire shoppers. We’ll display your business name,
                address, hours, and even ratings if you have them. A strong
                profile can attract not only Tirematic orders but also raise
                awareness of your shop in general.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 items-start justify-center w-full">
            <h2 className="text-2xl font-semibold text-btext">How It Works</h2>

            <ul className="list-disc pl-5">
              <li>
                <span className="font-bold"> Apply & Get Approved: </span>Fill
                out our Installer Application (a quick online form) with your
                business details, services offered (tire mounting, balancing,
                etc.), and pricing for standard tire install services. We’ll
                review your info to ensure it meets our quality standards (e.g.,
                proper certifications or experience, a good reputation, etc.).
                Our approval process is pretty quick – usually a few days.
              </li>
              <li>
                <span className="font-bold"> Profile Setup: </span> Once
                approved, we’ll set up your installer profile on Tirematic. You
                can provide a logo or photo, a short description of your
                business (e.g., “Family-owned shop with 20 years’ experience” –
                feel free to brag a little!), and confirm the contact info and
                hours we’ll display. We want your best face forward to
                customers.
              </li>
              <li>
                <span className="font-bold">Receive Installation Jobs:</span>
                When customers in your area buy tires, they’ll see your shop as
                an option. If they select your location, you’ll get a
                notification (either via email or through our installer portal).
                We’ll provide the customer’s contact, the tire info, and the
                chosen appointment time (depending on how we integrate
                scheduling). If we ship tires directly, you’ll also get tracking
                info so you know when the tires are arriving at your shop.
              </li>

              <li>
                <span className="font-bold">Service the Customer:</span>
                The customer comes in at the scheduled time. You perform the
                tire installation (and any agreed upon add-ons). Be sure to give
                them great service – they’ve trusted us and you with their tire
                needs, and a positive experience means they’re likely to come
                back (and leave a good review!). After the job, you’ll collect
                payment from the customer for your services at whatever rates
                you provided. Tirematic does not take a cut of that; it’s all
                yours.
              </li>

              <li>
                <span className="font-bold">Follow-Up & Repeat:</span>
                We appreciate you taking care of Tirematic customers, and many
                will likely become your repeat customers for other services. We
                encourage good communication – for example, if an issue arises
                (tire didn’t arrive on time, etc.), let the customer and us know
                so we can reschedule or resolve it. Our mutual goal is a happy
                driver with new tires. As more orders come in, you’ll continue
                to get jobs. There’s no minimum or maximum – you take as many
                Tirematic referrals as you can handle.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 items-start justify-center w-full">
            <h2 className="text-2xl font-semibold text-btext">How to Join</h2>
            <p>
              Ready to boost your bays with more installs? Applying is easy:
              click the “Join Our Installer Network” button (on this page or our
              contact page) to get started. It will ask for basic info like
              business name, address, contact person, number of service bays,
              etc. We’ll also want to know about your experience and any
              certifications (ASE techs, etc., which many customers appreciate
              for assurance).
            </p>

            <p>
              Once submitted, our partnerships coordinator will reach out,
              possibly have a quick chat to answer any questions either side
              has, and then move forward to approval. We like to move quickly –
              we know business moves fast and you’d like to see the benefits
              ASAP.
            </p>

            <p>
              If you have questions before applying, feel free to reach out to
              our team at installers@tirematic.com or call our support line (ask
              for installer partnerships). We’re happy to discuss how the
              program works in detail or address any concerns.
            </p>

            <p>
              Joining Tirematic’s installer network means driving your business
              forward. We handle the tire retail — you handle the installation —
              together we deliver a superior experience to drivers. It’s about
              collaboration, growth, and delivering convenience to customers.
            </p>

            <p>
              We hope you’ll come on board and grow with us. Let’s put more
              tires on more vehicles, together!
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BecomeAnInstaller;
