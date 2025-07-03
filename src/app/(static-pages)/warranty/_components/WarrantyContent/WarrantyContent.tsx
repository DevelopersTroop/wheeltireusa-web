import Container from '@/components/ui/container/container';

const WarrantyContent = () => {
  return (
    <Container>
      {/* Main content section */}
      <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
        <div className="flex flex-col gap-[10px] items-start justify-center w-full">
          <h2 className="text-3xl font-semibold text-btext">Warranty</h2>
          <p>Last Updated: June 15, 2025</p>
          <p>
            At <span className="font-semibold text-btext">Tirematic</span>, we
            stand behind the quality of every tire we sell. Our goal is to
            ensure you drive away happy and confident in your purchase. That’s
            why we offer a comprehensive tire warranty coverage to protect you
            against certain unexpected issues. This Tirematic Tire Warranty page
            explains what our warranty covers, how long it lasts, what is not
            covered, and how you can make a claim if you encounter a problem.
            We’ve written it in plain language so it’s easy to understand,
            reflecting Tirematic’s helpful and customer-first approach.
          </p>
          <p>
            In short, if you experience an issue with your tires that falls
            under our warranty, we will work with you to make it right – whether
            that means repairing, replacing, or pro-rating the tire. Please read
            on for details. And as always, if you have any questions about your
            tire’s warranty, feel free to reach out to us for support.
          </p>
        </div>

        <div className="flex flex-col gap-[10px] items-start justify-center w-full">
          <h3 className="text-2xl font-semibold text-btext">
            What the Warranty Covers
          </h3>
          <p>
            Our warranty is designed to cover you for the most important
            tire-related issues that can arise from normal, everyday use.
            Specifically,{' '}
            <span className="font-semibold">
              {' '}
              Tirematic’s warranty covers:{' '}
            </span>
          </p>
          <ul className="list-disc pl-5">
            <li>
              {' '}
              <span className="font-semibold">
                {' '}
                Manufacturing Defects in Materials or Workmanship:{' '}
              </span>{' '}
              If your tire has a flaw due to the way it was made (something that
              shouldn’t happen under proper manufacturing), we will take care of
              it. This is often called a workmanship and materials warranty in
              the tire industry. It means that if, for example, you experience
              tread separation, sidewall cracking, or a sudden air loss that is
              determined to be caused by a defect in the tire’s construction, it
              is covered. We or the tire manufacturer will inspect the tire to
              confirm the issue was due to a manufacturing defect and not
              external damage. If confirmed, we’ll typically offer a free
              replacement tire or an equivalent remedy, especially if the
              problem occurs early in the tire’s life. Tire manufacturers
              generally stand behind their products – almost every major brand
              provides a warranty against defects for the life of the tire. So
              you can have peace of mind that you won’t be stuck with a bad tire
              due to a factory mistake.
            </li>
            <li>
              {' '}
              <span className="font-semibold">
                {' '}
                Treadwear/Tread Life:{' '}
              </span>{' '}
              Tires are expected to last a certain amount of miles under normal
              driving conditions. If your tire wears out prematurely – meaning
              the tread wears down significantly faster than it should – you may
              be eligible for a pro-rated credit or replacement under our
              warranty. Many tires come with a mileage rating (for example,
              40,000 miles, 60,000 miles, etc.), indicating how long they
              typically should last. If you find that your tire’s tread is worn
              down to the treadwear indicators far before reaching the
              advertised mileage, it could qualify for a warranty adjustment. In
              such a case, we will calculate a credit towards a new tire based
              on the difference. For instance, if a tire has a 60,000-mile
              warranty and it only lasted 30,000 miles, you might get roughly
              50% off a new replacement tire (since you only got half the
              expected life). This is often referred to as a pro-rated warranty
              adjustment. Keep in mind that to claim treadwear coverage, you
              need to have maintained the tires properly (regular rotations,
              proper inflation, etc., see the “What’s Not Covered” section for
              details). But rest assured, if you did everything right and the
              tire still wore out too fast, we’ve got you covered.{' '}
            </li>
            <li>
              {' '}
              <span className="font-semibold">
                {' '}
                Balance and Uniformity Issues (Initial Period):{' '}
              </span>{' '}
              If you experience problems like the tire being out-of-round or
              impossible to balance properly (leading to vibration) when it’s
              new, this can be due to a manufacturing anomaly. Typically, such
              issues will show up early on. Tirematic’s policy (aligned with
              many manufacturers) is that if you report a ride uniformity or
              balance issue within the first small portion of tread use (for
              example, within 2/32″ of tread wear or within the first 25% of the
              tire’s life), we will replace the tire if the issue is diagnosed
              to be with the tire itself and not due to incorrect installation
              or vehicle mechanical issues. We want you to have a smooth ride –
              literally! So if the tire itself is causing a persistent vibration
              or pull that can’t be fixed, we consider that under warranty.
            </li>
            <li>
              {' '}
              <span className="font-semibold">
                {' '}
                Manufacturer’s Specific Warranties:{' '}
              </span>{' '}
              Some tire brands offer special guarantees that go beyond the
              standard coverage. For example, a 30-day satisfaction guarantee is
              common – meaning if you buy a tire and within 30 days you’re not
              happy with it for any reason, you can return or exchange it. If
              the tires you purchased have such a manufacturer-backed guarantee,
              Tirematic will honor it. We’ll provide a refund or exchange per
              the terms of the specific program (usually you must return the
              tires within the trial period and not have excessive wear on
              them). Additionally, if a tire model is subject to a safety recall
              by the manufacturer, we will assist you in getting that tire
              replaced or compensated according to the recall, at no cost to
              you. (Recalls are relatively rare, but they do happen in the
              industry if a defect affecting safety is found)
            </li>
          </ul>
          <p>
            In summary, our warranty covers problems that are within the tire’s
            control – defects from the factory and unreasonable early wear under
            normal use. We want you to feel secure that the tires you buy from
            Tirematic will perform as expected. If they don’t due to a covered
            issue, we’ll make it right.
          </p>
        </div>

        <div className="flex flex-col gap-[10px] items-start justify-center w-full">
          <h3 className="text-2xl font-semibold text-btext">
            Duration of Coverage
          </h3>
          <p>
            <span className="font-semibold">
              {' '}
              How long does the Tirematic warranty last?{' '}
            </span>{' '}
            The duration of the warranty depends on the specific coverage
            aspect:{' '}
          </p>
          <ul className="list-disc pl-5">
            <li>
              {' '}
              <span className="font-semibold">
                {' '}
                For Manufacturing Defects (Workmanship/Materials):{' '}
              </span>
              This coverage lasts for the life of the original usable tread of
              the tire. In practical terms, that means until the tire tread is
              worn down to the treadwear indicators (those little bars in the
              grooves that show up when only 2/32″ of tread is left) or a
              certain number of years from purchase, whichever comes first. Most
              tire manufacturers consider a tire’s useful life to be around six
              (6) years from the date of purchase or when the tread reaches
              2/32″ depth – at which point the tire is legally worn out in many
              regions. We follow a similar guideline. So, if you discover a
              manufacturing defect at any point during normal tread life (years
              1 through 6, as long as there’s measurable tread above the
              minimum), it’s covered. After the tread is worn out or the time
              limit is reached, the tire is considered to have served its normal
              life and is not covered.
            </li>
            <li>
              {' '}
              <span className="font-semibold">
                {' '}
                For Treadwear/Mileage:{' '}
              </span>{' '}
              The treadwear warranty is usually stated in terms of mileage (for
              example, 50,000 miles) or years. Check the specifics for the tire
              model you purchased; we will have provided any manufacturer
              mileage warranty information at the time of sale. Our warranty
              will mirror that. If a tire is warranted for 50,000 miles, the
              coverage is pro-rated until 50,000 miles of use (with the time
              limit of six years still applying in most cases). If you drive
              extremely little, note that the year limit (e.g., 6 years) can
              come into play before miles do – rubber degrades over time.{' '}
            </li>
            <li>
              {' '}
              <span className="font-semibold"> Other Timeframes: </span> If a
              specific promotion or manufacturer program applies (like a 30-day
              satisfaction guarantee or a road hazard add-on), those have their
              own time windows. For example, a 30-day trial means exactly that –
              you have 30 days from the date of purchase to decide if you want
              to keep the tires. We will clearly communicate any such terms at
              purchase and on your receipt. They are usually short-term and
              separate from the long-term coverage.
            </li>
          </ul>
          <p>
            To put it simply, our standard warranty on tires generally lasts up
            to 5-6 years from the purchase date or until the tire tread is worn
            to 2/32″, whichever occurs first. This aligns with the industry
            understanding of a tire’s safe lifespan. After six years, even if
            tread remains, factors like dry rot can occur, and it’s recommended
            to replace tires for safety. So our warranty coverage would be
            considered ended by that point.
          </p>

          <p>
            {' '}
            <span className="font-semibold">
              {' '}
              Original purchaser & vehicle:{' '}
            </span>{' '}
            Tirematic’s warranty applies to the original purchaser of the tires
            and the vehicle on which the tires were originally installed. It is
            not transferable to a new owner if you sell the vehicle, nor to a
            different vehicle if you move the tires. This is standard practice –
            it ensures that the tire’s usage conditions are consistent with the
            warranty. Always keep your proof of purchase (invoice/receipt) as it
            will be required to verify coverage and the purchase date when
            making a claim.{' '}
          </p>

          <p>
            <span className="font-semibold">
              Rotation and maintenance records:
            </span>
            For treadwear claims, the duration/mileage coverage often assumes
            you rotated your tires at proper intervals (usually every 5,000 to
            8,000 miles) and kept them inflated correctly. While we don’t
            require you to submit a log book or anything upfront, having records
            of tire rotations and maintenance can be important if you later make
            a treadwear claim. It helps show that the tire was cared for, yet
            didn’t meet its mileage promise. We suggest keeping receipts or a
            simple record of your rotations and alignments – this can typically
            be done at any tire shop or service center.
          </p>

          <p>
            In summary, our warranty coverage duration is generous and in line
            with tire manufacturers’ policies. You can expect years of
            protection on your Tirematic tires, but do remember that proper care
            is part of keeping that coverage valid. Next, we’ll detail what the
            warranty does not cover, as certain conditions or damages fall
            outside of warranty protection.
          </p>
        </div>

        <div className="flex flex-col gap-[10px] items-start justify-center w-full">
          <h3 className="text-2xl font-semibold text-btext">
            What’s Not Covered
          </h3>
          <p>
            {' '}
            While our warranty is comprehensive, there are certain situations
            and types of damage that are not covered. These exclusions are
            generally standard in the tire industry. It’s important to know
            about them so you can avoid unintentionally voiding your warranty or
            understand when an issue might be outside the warranty’s scope.
            <span className="font-semibold">
              {' '}
              The Tirematic warranty will not cover:{' '}
            </span>
          </p>
          <ul className="list-disc pl-5">
            <li>
              {' '}
              <span className="font-semibold"> Normal Wear and Tear: </span>
              Tires eventually wear out due to normal usage. Regular tread wear
              down to 2/32″ is expected over time and is not considered a
              defect. Once a tire is worn out (tread at the wear indicators), it
              has reached the end of its useful life and any further use or any
              issues at that point are not covered. (In other words, we don’t
              warranty that a tire will never wear out – only that it shouldn’t
              wear out prematurely as described in the treadwear coverage
              above.)
            </li>
            <li>
              {' '}
              <span className="font-semibold">
                {' '}
                Road Hazard Damage (Cuts, Punctures, Impact Breaks):{' '}
              </span>{' '}
              Standard manufacturer warranties (and our warranty, by default) do
              not cover damages from external sources on the road. This includes
              things like nails, screws, glass, potholes, or curbs that cause
              flats, cuts, or bulges in your tire. For example, if you run over
              a nail and get a flat, or hit a deep pothole and it damages the
              tire’s sidewall, these are considered road hazards and are not
              covered by the basic warranty. (We do offer an optional Road
              Hazard Protection plan at purchase for those who want that extra
              coverage, which can cover repair or replacement due to such
              incidents, but unless you opted for that, road hazards aren’t
              covered.){' '}
            </li>
            <li>
              {' '}
              <span className="font-semibold">
                {' '}
                Damage from Misuse or Abuse:{' '}
              </span>{' '}
              Any tire damage or failure resulting from misuse is not covered.
              Misuse can take many forms, including: improper inflation (running
              the tire over- or under-inflated), overloading the tire beyond its
              max load, wheel spin damage (such as might happen if you keep
              spinning on ice or stuck in mud), or using the tire in the wrong
              application (for example, using passenger tires on a heavy truck
              that requires light-truck tires). Using the tire outside of its
              intended purpose voids the warranty. Always follow the tire’s load
              and inflation guidelines.
            </li>
            <li>
              {' '}
              <span className="font-semibold">
                {' '}
                Improper Maintenance:{' '}
              </span>{' '}
              Perhaps the most common reason warranties are voided is lack of
              proper maintenance. This includes failing to rotate your tires
              regularly, not keeping them balanced, or not maintaining proper
              alignment of your vehicle. If a tire shows signs of uneven wear
              because it was never rotated or the car’s alignment was off (e.g.,
              one edge of the tire is bald while the other side has plenty of
              tread), that’s not a defect of the tire – that’s a maintenance
              issue. Similarly, consistently running on incorrect tire pressure
              (too low or too high) can cause abnormal wear or damage (like
              sidewall cracking or premature wear in the center of the tread),
              which is not covered. Keep your tires rotated, balanced, and
              properly inflated to avoid these issues and to keep your warranty
              intact{' '}
            </li>
            <li>
              {' '}
              <span className="font-semibold">
                {' '}
                Racing, Competition, or Off-Road Use:{' '}
              </span>{' '}
              Our warranties are for normal on-road consumer use. If you take
              your vehicle to the racetrack, engage in drifting, do burnouts, or
              other racing/competition activities, the tires undergo extreme
              stress outside normal usage – any resulting wear or damage is not
              covered. Similarly, if you use tires off-road beyond their design
              (e.g., taking highway all-season tires rock crawling) and they get
              cut up or chunked, that’s on the user. There are specialty tires
              for off-road that can handle more abuse, but even then, using them
              in extreme conditions can void warranties. In summary, any form of
              abuse or use beyond typical daily driving can negate the
              warranty{' '}
            </li>
            <li>
              {' '}
              <span className="font-semibold">
                {' '}
                Accident or Collision Damage:{' '}
              </span>{' '}
              If your vehicle is in an accident or collision that damages the
              tires (for instance, you hit debris or another vehicle which
              causes a tire to blow out or deform), that damage is not covered
              under the tire warranty. It might be covered by auto insurance
              depending on your policy and the situation, but it’s not a tire
              defect.{' '}
            </li>
            <li>
              {' '}
              <span className="font-semibold"> Vandalism or Theft: </span>{' '}
              Unfortunately, if someone intentionally damages your tires
              (slashing, etc.), or they are stolen, that’s not covered by the
              tire warranty. Such incidents might be covered under a
              comprehensive auto insurance policy, but they fall outside the
              manufacturer/store warranty scope.{' '}
            </li>
            <li>
              {' '}
              <span className="font-semibold">
                {' '}
                Cosmetic or Appearance Issues:{' '}
              </span>{' '}
              Things like weather-checking (minor cracking) on the sidewall due
              to age, or cosmetic blemishes that do not affect performance, are
              generally not covered unless they are deemed severe and early
              enough to be considered a defect. Slight cracking after several
              years can be normal as rubber ages; our warranty targets
              functional issues, not minor cosmetic aging.{' '}
            </li>
            <li>
              {' '}
              <span className="font-semibold">
                {' '}
                Tires with Alterations:{' '}
              </span>{' '}
              If a tire has been intentionally modified or altered (for example,
              regrooved, siped by a third-party after manufacturing (other than
              factory siping), or studded in a way not recommended), the
              warranty may be void. Additionally, any tire that has been
              retreaded (mostly applicable to commercial tires) would not carry
              the original warranty. Most consumer tires are not retreaded, but
              it’s worth noting.{' '}
            </li>
            <li>
              {' '}
              <span className="font-semibold">
                {' '}
                Incorrect Installation or Related Vehicle Conditions:{' '}
              </span>{' '}
              If a tire failure is caused by it being mounted improperly, or
              damage to the bead from installation, that’s not on the tire
              itself. Similarly, problems caused by the vehicle’s condition –
              for instance, rim damage cutting the tire, or suspension issues
              leading to tire damage – are not tire defects. We ensure proper
              installation when we mount tires, but if tires are mounted
              elsewhere, make sure it’s done correctly.{' '}
            </li>
          </ul>
          <p>
            To sum up, the warranty doesn’t cover problems caused by outside
            forces, lack of maintenance, or misuse. The mantra to keep in mind:
            take good care of your tires and they will take care of you. If you
            do so and something still goes wrong (and it’s our fault or the
            tire’s fault), we will cover it. But if the issue comes from neglect
            or a nail on the road, that’s outside the warranty’s reach (though
            we’ll still try to help with a fair solution or paid service if
            possible).
          </p>

          <p>
            One more note: If only one tire is affected by a warrantable
            condition, the warranty generally applies to that tire alone, not
            the set. We will not replace tires that don’t need replacing. That
            said, if you have a very new tire that fails and it’s covered, and
            the matching tire on the other side is also nearly new, we’ll
            replace the bad one and you’ll continue with the others. If a tire
            is replaced under warranty, the replacement tire will be covered for
            the remainder of the original tire’s warranty period (or a minimum
            of some period like 1 year, depending on specifics). We’ll clarify
            that during the claim.
          </p>
        </div>

        <p>
          Thank you for choosing Tirematic for your tire needs. We appreciate
          your business and trust. With proper care, your new tires should serve
          you well for a long time. But if something goes wrong under warranty,
          now you know we have you covered. Drive safe!
        </p>
      </div>
    </Container>
  );
};

export default WarrantyContent;
