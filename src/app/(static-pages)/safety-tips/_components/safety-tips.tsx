import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import SafetyTipsHero from './safety-tips-hero';
// Component to render the Privacy Policy page
const SafetyTips = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/safety-tips`} isEnd={true}>
                Safety Tips
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Privacy Policy page */}
      <SafetyTipsHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">Safety Tips</h2>
            <p>Last Updated: June 12, 2025</p>
            <p>
              Safety on the road starts with smart habits and a little proactive
              care. At Tirematic, we care deeply about driver safety (after all,
              it’s one of our core brand values!). We’ve put together some quick
              Safety Tips to help you get the most out of your tires and drive
              with confidence. These tips are easy to follow and can make a big
              difference in your driving safety and your tires’ lifespan:
            </p>
            <p>
              <span className="font-semibold">
                Check Your Tire Pressure Regularly:
              </span>{' '}
              Keeping tires properly inflated is crucial. Low pressure can cause
              poor handling and increase the risk of blowouts, while
              over-inflation can be just as dangerous. We recommend checking
              your tire pressure at least once a month and before long trips.
              Use a quality tire pressure gauge (they’re inexpensive and handy).
              And remember – check when tires are “cold” (car hasn’t been driven
              for a few hours) for the most accurate reading. Maintaining the
              manufacturer’s recommended PSI will give you better fuel
              efficiency, traction, and overall safety.
            </p>

            <p>
              <span className="font-semibold">
                Monitor Tread Depth (Do the Penny Test!):
              </span>{' '}
              Your tire tread is what keeps you gripped to the road. Worn-out
              tread can be downright hazardous, especially in rain or snow. An
              easy trick: use a penny to check. Insert a penny into your tire’s
              tread groove with Lincoln’s head facing down. If you can see the
              top of Abe’s head, your tread is too low (less than 2/32″) and
              it’s time to replace the tire. Don’t wait until they’re completely
              bald – traction drops significantly as tread wears down. Staying
              above that minimum will help prevent hydroplaning and keep your
              vehicle handling predictably.
            </p>

            <p>
              <span className="font-semibold">Rotate Your Tires:</span> Tires
              don’t wear evenly on their own. Front tires often wear faster
              (especially on front-wheel-drive cars) or sometimes one side wears
              more due to alignment. By rotating your tires regularly (every
              5,000 to 8,000 miles, or at every oil change as a good rule of
              thumb), you ensure they wear evenly. Even wear = consistent
              performance and longer tire life. It’s a quick service that any
              installer can do, and it maximizes your investment while keeping
              handling balanced.
            </p>

            <p>
              <span className="font-semibold">
                Don’t Overload Your Vehicle:
              </span>{' '}
              Every vehicle and tire has a weight limit. Overloading your car
              (with excessive cargo or weight beyond what’s recommended) puts
              stress on your tires and can lead to tire failure (like blowouts)
              due to overheating or excessive flexing. Check your vehicle’s
              manual for the maximum load and be mindful of it, especially
              during moves or road trips with heavy luggage. Spread out heavy
              items and ensure your tires are inflated properly to handle the
              load. Safety first – if you’re unsure, it’s better to take two
              trips or lighten the load than push your luck with an overburdened
              vehicle.
            </p>

            <p>
              <span className="font-semibold">
                Mind Your Speed (and Potholes!):
              </span>{' '}
              High speeds can generate excess heat in tires and increase the
              impact of any road hazards. Try to avoid sustained high-speed
              driving on very hot days – it can strain your tires. Also, watch
              out for potholes and curbs. Hitting a pothole at high speed can
              damage your tire (or wheel) in an instant. If you can’t avoid a
              pothole, slow down as much as possible before you hit it (don’t
              brake during the hit) to minimize the shock. And if you ever hit
              something hard, take a moment to inspect your tires for bulges or
              cuts afterward. It’s better to catch damage early than have a
              blowout later.
            </p>

            <p>
              <span className="font-semibold">
                Use the Right Tires for the Season:
              </span>{' '}
              One of our top safety tips is to make sure you have appropriate
              tires for the driving conditions. In winter, if you live in an
              area with snow and ice, winter tires can dramatically improve
              safety – they have special tread patterns and rubber compounds for
              cold traction. In summer or warmer climates, all-season or summer
              performance tires work best. Using the wrong type of tire in
              extreme conditions (for example, summer tires on snow) can be very
              dangerous. Consider swapping seasonally if needed, or choose a
              high-quality all-season if you experience moderate conditions
              year-round.
            </p>

            <p>
              <span className="font-semibold">
                Stay Attentive and Drive Safely:
              </span>{' '}
              Lastly, no tire in the world can substitute for good driving
              habits. Always buckle up, obey speed limits, and stay alert. Give
              yourself and others plenty of space on the road. Properly
              maintained tires will do their job (providing grip and stability),
              but it’s up to us drivers to steer clear of trouble whenever
              possible. Defensive driving + well-maintained tires = the best
              recipe for staying safe out there!
            </p>

            <p>
              Feel free to check out our Tire Safety page for a deeper dive into
              tire maintenance and care. And as always, if you have any
              questions about keeping your tires in top shape, ask us! Our
              Tirematic team is here to help you travel safely. Stay safe and
              happy driving!
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SafetyTips;
