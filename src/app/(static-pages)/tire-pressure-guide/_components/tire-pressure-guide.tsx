import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import TirePressureGuideHero from './tire-pressure-guide-hero';
// Component to render the Privacy Policy page
const TirePressureGuide = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/tire-pressure-guide`} isEnd={true}>
                Tire Pressure Guide
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Privacy Policy page */}
      <TirePressureGuideHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">
              Tire Pressure Guide
            </h2>
            <p>Last Updated: June 12, 2025</p>
            <p>
              Maintaining proper tire pressure is one of the simplest yet most
              important things you can do for your vehicle. Welcome to our Tire
              Pressure Guide, where we’ll walk you through why it matters and
              how to keep your tires inflated just right. Keeping your tires at
              the correct pressure means safer driving, better fuel economy, and
              longer-lasting tires – who wouldn’t want that? Let’s dive in with
              a friendly, step-by-step approach.
            </p>

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-2xl font-semibold text-btext">
                Why Proper Tire Pressure Matters
              </h2>
              <p>
                Driving on underinflated or overinflated tires can affect more
                than just your ride comfort – it’s a safety issue. Underinflated
                tires (too soft) can overheat and are more prone to blowouts,
                plus they make your car’s handling sloppy and increase braking
                distances. Overinflated tires (too hard) reduce the contact
                patch with the road, which can lead to less traction and a
                harsher ride; they also wear out the center of the tread faster.
                In short, incorrect tire pressure = bad news. Properly inflated
                tires, on the other hand, ensure optimal grip, stability, and
                efficiency. You’ll get better gas mileage (saving you money at
                the pump) and your tires will wear evenly and last longer. It’s
                a win-win for safety and savings – very much in line with
                Tirematic’s commitment to affordability and safety!
              </p>
            </div>

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-2xl font-semibold text-btext">
                How to Check Your Tire Pressure (Step-by-Step)
              </h2>
              <p>(Don’t worry – it’s easy, even if you’re not a car guru!)</p>
              <ul className="list-disc pl-5">
                <li>
                  {' '}
                  <span className="font-bold">
                    {' '}
                    Find the Recommended Pressure:{' '}
                  </span>{' '}
                  First, locate your vehicle’s recommended tire pressure. This
                  is usually on a sticker in the driver’s side door jamb or in
                  your owner’s manual. It will say something like “Front: 35
                  PSI, Rear: 33 PSI” (PSI is the unit of pressure, pounds per
                  square inch). Note that the number on your tire’s sidewall is
                  not the recommended pressure – that’s the maximum. Always use
                  the car manufacturer’s recommended values for everyday
                  driving.
                </li>
                <li>
                  {' '}
                  <span className="font-bold"> Use a Good Gauge: </span> Get
                  yourself a tire pressure gauge. You can use a classic pencil
                  gauge, a dial gauge, or a digital one – they all work. Many
                  gas stations also have built-in gauges on their air hoses.
                  Checking pressure is straightforward: remove the cap from your
                  tire’s valve stem (the little nozzle on the wheel), press the
                  gauge onto the valve stem firmly, and read the number. Pro
                  Tip: Do this when the tires are “cold” (car has been sitting
                  for a few hours or driven only a mile or two). Driving heats
                  up tires and raises the pressure, giving an inaccurate
                  reading.
                </li>
                <li>
                  {' '}
                  <span className="font-bold">
                    {' '}
                    Check All Four (and the Spare):{' '}
                  </span>{' '}
                  Tire pressures can often vary from tire to tire, so don’t
                  assume they’re all the same – check each one. And if your car
                  has a spare tire (especially a small “donut” spare), check
                  that occasionally too; spares often require much higher PSI
                  and are commonly neglected until needed (when it’s too late).
                  Make it a habit to check pressures about once a month, or
                  anytime you notice a tire looks a bit low.
                </li>
                <li>
                  {' '}
                  <span className="font-bold">
                    {' '}
                    Inflate or Deflate to Adjust:{' '}
                  </span>{' '}
                  If a tire is below the recommended PSI, add air until it
                  matches the spec. Most gas stations have air pumps – just be
                  sure to add a little at a time and re-check with your gauge,
                  as those pump gauges aren’t always precise. If you overinflate
                  accidentally (pressure is too high), you can let air out:
                  press the small pin inside the valve stem (your gauge or even
                  a car key can do this) and you’ll hear air hiss out. Let out a
                  bit and re-check until you hit the sweet spot (accuracy
                  matters!). Many modern cars have tire pressure monitoring
                  (TPMS) that will warn you if a tire is significantly low, but
                  ideally, you won’t get to that point because you’re checking
                  proactively.
                </li>
                <li>
                  {' '}
                  <span className="font-bold">
                    {' '}
                    Re-cap & You’re Done:{' '}
                  </span>{' '}
                  Once the tire is at the correct PSI, screw the valve cap back
                  on (it keeps dirt and moisture out of the valve). Repeat for
                  each tire. That’s it – you’ve successfully checked and
                  adjusted your tire pressures! Now pat yourself on the back,
                  because you just did wonders for your safety and your tires.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-2xl font-semibold text-btext">
                Additional Tire Pressure Tips
              </h2>
              <ul className="list-disc pl-5">
                <li>
                  {' '}
                  <span className="font-bold"> Seasonal Changes: </span> Tire
                  pressure can fluctuate with the weather. In cold temperatures,
                  tires lose pressure (about 1 PSI for every 10°F drop in air
                  temperature). In hot weather, the opposite can happen. So,
                  it’s common to see your TPMS light come on during the first
                  cold snap of fall – just add air as needed. Keeping an eye on
                  it during seasonal swings will keep you ahead of the game.
                </li>
                <li>
                  {' '}
                  <span className="font-bold"> Visual Checks: </span> While a
                  gauge is necessary to know exact pressure, do give your tires
                  a quick visual once-over whenever you fuel up. If something
                  looks low or you spot a nail, etc., address it right away.
                  Sometimes your eyes can catch a problem before it gets worse.
                </li>
                <li>
                  {' '}
                  <span className="font-bold">
                    {' '}
                    TPMS (Tire Pressure Monitoring Systems):{' '}
                  </span>{' '}
                  TIf your car has TPMS and the warning light comes on, it means
                  at least one tire is significantly underinflated (usually 25%
                  or more below spec). Don’t ignore that light! Stop and check
                  your pressures as soon as safely possible. TPMS is great, but
                  it shouldn’t replace regular manual checks – consider it a
                  backup alert system.
                </li>
                <li>
                  {' '}
                  <span className="font-bold"> Nitrogen vs Air: </span> You
                  might have heard of filling tires with nitrogen. It’s often
                  used to help maintain more stable pressure (nitrogen doesn’t
                  leak or fluctuate with temperature as much as normal air). If
                  your tires are filled with nitrogen (they’ll have green valve
                  caps usually), the general care is the same. You can still top
                  off with regular air if needed; the mix isn’t dangerous. The
                  benefits of nitrogen for typical consumers are modest, so
                  don’t worry if you don’t have it – just keep those pressures
                  where they should be with good old air.
                </li>
                <li>
                  {' '}
                  <span className="font-bold"> When in Doubt, Ask: </span> Not
                  sure if you’re doing it right, or have a persistent pressure
                  loss in one tire? Swing by a tire shop or one of our partner
                  installers. Many will check your pressures for free and can
                  inspect for leaks. It’s better to ask for help than to drive
                  on an iffy tire.
                </li>
              </ul>
            </div>

            <p>
              Maintaining proper tire pressure is a small thing that makes a
              huge difference. You’ll notice your car drives smoother and
              handles better when your tires are at the ideal PSI. Plus, you’ll
              be maximizing your tire life and fuel efficiency – which is great
              for your wallet and the environment.
            </p>

            <p>
              So make this a regular part of your car care routine. Trust us,
              once you get into the habit, it’s a quick task that you’ll do
              almost without thinking – and your car (and Tirematic) will
              silently be thanking you for it!
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TirePressureGuide;
