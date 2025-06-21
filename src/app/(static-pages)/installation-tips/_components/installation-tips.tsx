import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import TirePressureGuideHero from './installation-tips-hero';
// Component to render the Installation tips page
const TirePressureGuide = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/installation-tips`} isEnd={true}>
                Installation Tips
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Installation tips page */}
      <TirePressureGuideHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">
              Installation Tips
            </h2>
            <p>Last Updated: June 12, 2025</p>
            <p>
              Congratulations on your new tire purchase! Now, the next step is
              getting those tires on your vehicle safely and correctly. While
              Tirematic makes buying tires easy and convenient, we want to
              ensure your installation experience is just as smooth. Here are
              some Installation Tips and best practices to help you through the
              process, whether you’re using one of our partner installers or
              handling part of it yourself. We’ve got you covered from
              scheduling the install to the first drive on your new tires.
            </p>

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-2xl font-semibold text-btext">
                Before Installation: Plan Ahead
              </h2>
              <ul className="list-disc pl-5">
                <li>
                  <span className="font-bold">
                    {' '}
                    Choose a Certified Installer:{' '}
                  </span>
                  If you haven’t already, use our Store Locator to find a
                  Tirematic-approved installer near you. We partner with
                  top-notch tire shops and service centers that meet our quality
                  standards. Choosing an experienced professional is key – they
                  have the right tools and knowledge to mount and balance your
                  tires properly. This isn’t the time for DIY unless you’re
                  truly equipped for it; tire machines and balancing equipment
                  are best left to the pros for safety.
                </li>
                <li>
                  <span className="font-bold"> Schedule Conveniently: </span>{' '}
                  Book your installation appointment ahead of time (you might
                  have done this at checkout). Aim for a time that works for you
                  and allows you to wait comfortably if needed (many shops have
                  waiting areas). Early morning appointments can often get you
                  in and out quicker. And if you’re shipping tires to the
                  installer directly, schedule the install date after the
                  expected delivery date to be safe. We coordinate shipping to
                  try and have your tires there in time.
                </li>
                <li>
                  <span className="font-bold">
                    Inspect Your Tires on Arrival:
                  </span>
                  If the tires were shipped to you (rather than directly to a
                  shop), give them a once-over. Check that you received the
                  correct size and model. Mistakes are rare, but it’s good to
                  confirm. Also look for any obvious shipping damage (again
                  rare). If anything’s amiss, contact Tirematic support right
                  away and we’ll sort it out. It’s easier to resolve issues
                  before mounting the tires.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-2xl font-semibold text-btext">
                During Installation: What to Expect
              </h2>
              <ul className="list-disc pl-5">
                <li>
                  <span className="font-bold"> Mounting & Balancing: </span>The
                  installer will mount the tires onto your wheels using
                  specialized equipment and then balance them. Balancing
                  involves adding small weights to the wheel to make sure it
                  spins without vibrations. Both steps are critical: proper
                  mounting ensures the tire is seated correctly (no leaks, no
                  wobble), and balancing prevents that annoying shake at high
                  speeds. All Tirematic partner installers include balancing in
                  their installation service.
                </li>
                <li>
                  <span className="font-bold"> Tire Pressure and TPMS: </span>{' '}
                  The technician will inflate the tires to the recommended
                  pressure. If your vehicle has TPMS (tire pressure monitoring
                  sensors in the wheels), they will also transfer or reset those
                  sensors. Some vehicles require reprogramming or a simple reset
                  procedure after new tires are installed – a good installer
                  will handle this, but you can ask to be sure. If new valve
                  stems are needed, they’ll install those too (especially if
                  your old ones were rubber and aging).
                </li>
                <li>
                  <span className="font-bold">
                    Alignment Check (Optional but Recommended):
                  </span>
                  While not part of a basic tire install, it’s a smart idea to
                  have your wheel alignment checked when you put on new tires.
                  Many drivers do this to protect their investment – an
                  alignment ensures your car’s suspension angles are correct so
                  the new tires wear evenly and the car tracks straight. If the
                  installer offers an alignment service, consider getting it
                  done during the same visit. If not, scheduling one within a
                  week or two after the new tires are on is a good move,
                  especially if your old tires had uneven wear (a telltale sign
                  of misalignment).
                </li>

                <li>
                  <span className="font-bold">Ask Questions:</span>
                  Don’t hesitate to chat with the installer if you’re curious
                  about anything. Wondering about optimal tire pressure for your
                  use, or how often to rotate? Tire techs love sharing
                  knowledge. They might also give you specific advice, like
                  “come back after 25-50 miles for a lug nut re-torque” (some
                  recommend this to ensure the lug nuts remain properly tight
                  after the wheels have experienced some driving). Not all shops
                  require that, but it’s a good safety check if offered.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-2xl font-semibold text-btext">
                After Installation: Hitting the Road
              </h2>
              <ul className="list-disc pl-5">
                <li>
                  <span className="font-bold"> Break in Your Tires: </span>New
                  tires may feel a little different at first – that’s normal.
                  They often come with a smooth, release-agent coating from the
                  factory. Give yourself a few easy driving days (around 500
                  miles) to break them in. During this period, avoid extreme
                  hard cornering or sudden aggressive braking if you can, just
                  to let that new tire surface scuff in for optimal grip. You’ll
                  likely notice the handling improve as the tires settle in.
                </li>
                <li>
                  <span className="font-bold"> Monitor Performance: </span> Pay
                  attention to how the car drives with the new tires. It should
                  feel smooth and stable. If you notice any vibration or
                  pulling, reach out to the installer or us. A tiny weight might
                  have slipped off (rare, but it happens) or alignment might
                  need a tweak – issues like these are usually easy to correct,
                  and reputable shops will do so if you report it promptly. You
                  deserve a perfect ride, and we want to make sure you get it.
                </li>
                <li>
                  <span className="font-bold">Maintain Your Investment:</span>
                  Now that your tires are on, keep them in great shape! This
                  means checking tire pressure regularly (see our Tire Pressure
                  Guide), rotating them as recommended (generally every 6 months
                  or 6-8k miles), and keeping an eye on tread wear. Proper
                  maintenance maximizes safety and tire life, which saves you
                  money in the long run – and that’s a big part of Tirematic’s
                  mission of affordability and safety.
                </li>

                <li>
                  <span className="font-bold">Ask Questions:</span>
                  Don’t hesitate to chat with the installer if you’re curious
                  about anything. Wondering about optimal tire pressure for your
                  use, or how often to rotate? Tire techs love sharing
                  knowledge. They might also give you specific advice, like
                  “come back after 25-50 miles for a lug nut re-torque” (some
                  recommend this to ensure the lug nuts remain properly tight
                  after the wheels have experienced some driving). Not all shops
                  require that, but it’s a good safety check if offered.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-2xl font-semibold text-btext">
                Extra Tips for Convenience
              </h2>
              <ul className="list-disc pl-5">
                <li>
                  <span className="font-bold"> Old Tire Disposal: </span>
                  Wondering what happens to your old tires? Installers typically
                  offer tire disposal (often for a small recycling fee). They’ll
                  take your old tires off your hands, which is worth it because
                  disposing of tires yourself can be a hassle. Be sure to
                  confirm with your shop – most partner installers will handle
                  this unless you want to keep the old tires for some reason.
                </li>
                <li>
                  <span className="font-bold"> Enjoy the Upgrade: </span> New
                  tires can truly transform your car’s ride and handling. Take a
                  moment to appreciate the difference! Quieter highway ride?
                  Better grip in the rain? Peace of mind on a road trip? That’s
                  what it’s all about. We love hearing feedback, so feel free to
                  leave a review on our site about your new tires and
                  installation experience. It helps other customers and lets us
                  know how we did facilitating it all.
                </li>
                <li>
                  <span className="font-bold">
                    Keep Your Receipt/Warranty Info:
                  </span>
                  The installer will provide an invoice or receipt for the
                  service. Hang onto that and the Tirematic purchase receipt. In
                  the unlikely event of a warranty claim down the road, having
                  proof of purchase and installation date is helpful. Tire
                  purchases from Tirematic come with manufacturer warranties
                  (like tread life or workmanship warranties), and we’ll assist
                  you if you ever need to make a claim.
                </li>
              </ul>
            </div>

            <p>
              By following these installation tips, you’re setting yourself up
              for a safe and easy transition to your new rubber. At Tirematic,
              we aim to make the entire process – from shopping to installation
              – convenient and worry-free. If at any point you have questions or
              need support regarding your tire installation, don’t hesitate to
              reach out to our Customer Support team. We’re here to help even
              after the sale, ensuring you’re completely satisfied.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TirePressureGuide;
