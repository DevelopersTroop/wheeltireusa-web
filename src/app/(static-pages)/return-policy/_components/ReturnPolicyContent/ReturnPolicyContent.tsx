import Container from '@/components/ui/container/container';

const ReturnPolicyContent = () => {
  return (
    <Container>
      {/* Main content section */}
      <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
        <div className="flex flex-col gap-[10px] items-start justify-center w-full">
          <h2 className="text-3xl font-semibold text-btext">Return policy</h2>
          <p>Last Updated: June 3, 2025</p>
          <p>
            At <span className="font-semibold text-btext">Tirematic</span>, we
            want you to love your new tires. But we also know that sometimes
            things don’t go as planned – maybe the size wasn’t quite right, or
            you had a change of heart. That’s okay! Our Return Policy is
            designed to be customer-friendly and hassle-free, reflecting our
            commitment to your satisfaction, safety, and convenience.
          </p>

          <div className="flex flex-col gap-2 items-start justify-center w-full">
            <h2 className="text-2xl font-semibold text-btext">
              30-Day Satisfaction Guarantee
            </h2>
            <p>
              If you’re not 100% satisfied with your purchase, you have 30 days
              from the delivery date to return unused tires for a full refund or
              exchange. We believe in making things right, so whether the tires
              just don’t meet your expectations or you ordered the wrong size,
              let us know within 30 days and we’ll take care of it.
            </p>
            <p>
              <span className="font-semibold">Key conditions for returns:</span>{' '}
              Tires must be unused and unmounted. (Think of it like trying on
              shoes – once you wear them outside, they’re yours. Similarly, once
              a tire has been driven on or mounted to a wheel, we can’t resell
              it, so those aren’t eligible for a routine return.) If the tires
              are brand new and haven’t been put on your vehicle, we’ll gladly
              accept them back.
            </p>
          </div>

          <div className="flex flex-col gap-2 items-start justify-center w-full">
            <h2 className="text-2xl font-semibold text-btext">
              Easy Return Process
            </h2>
            <p>We’ve made the returns process as simple as possible:</p>
            <ul className="list-disc pl-5">
              <li>
                {' '}
                <span className="font-bold"> Step 1: Contact Us – </span> Just
                give our customer support a heads-up that you’d like to return
                your order. You can call, email, or use live chat. We’ll ask for
                your order number and the reason for return, then guide you
                through next steps.
              </li>
              <li>
                {' '}
                <span className="font-bold">
                  {' '}
                  Step 2: Receive Return Instructions{' '}
                </span>{' '}
                Our team will provide you with a prepaid return shipping label
                or arrange the pickup, depending on the situation. (In many
                cases, we’ll cover the return shipping for you, especially if it
                was our error or a warranty issue. If you’re returning due to
                personal choice or ordering error, a return shipping fee may
                apply, but we always communicate that clearly up front.)
              </li>
              <li>
                {' '}
                <span className="font-bold"> Step 3: Pack & Ship </span> –
                Simply put the tires back in their original packaging (or
                something similar) and attach the provided return label. Drop
                them off at the designated shipping location, or have them
                picked up if arranged. Because tires are heavy items, we work
                with carriers who handle them safely.
              </li>
              <li>
                {' '}
                <span className="font-bold"> Step 4: Refund/Exchange </span> –
                Once we receive and inspect the returned tires, we’ll process
                your refund or ship your exchange tires. Refunds are issued to
                your original form of payment and typically show up within 7–10
                business days after we receive the return. If you opted for an
                exchange (say, a different size or model), we’ll ship the new
                tires out promptly so you’re not waiting long.
              </li>
            </ul>
            <p>
              Throughout the process, our support team will keep you updated.
              You’ll never be left wondering what’s happening with your return.
            </p>
          </div>

          <div className="flex flex-col gap-2 items-start justify-center w-full">
            <h2 className="text-2xl font-semibold text-btext">
              No-Hassle Promise
            </h2>
            <p>
              We stand behind our products and want you to be completely
              satisfied – that’s why we take a case-by-case approach if
              something falls outside the standard policy. Is it past 30 days?
              Did you already mount the tires and discover an issue? Don’t
              panic. Contact us anyway. We have a no-hassle promise: we’ll work
              with you to find a fair solution. That might mean helping with a
              warranty claim if a tire is defective, providing a pro-rated
              refund, or finding another way to make it right. Our ultimate goal
              is your safety and happiness on the road.
            </p>
            <p>
              <span className="font-semibold">Fitment Guarantee:</span> One
              thing we’re proud of is our Guaranteed Fit policy. If you used our
              vehicle search or Tire Size Calculator and bought tires that were
              supposed to fit your vehicle, they should fit perfectly. In the
              rare case that a recommended tire doesn’t fit your car, you’re
              covered. We’ll exchange them for the correct size or give you a
              full refund – including any shipping or installation
              inconvenience. We never want you driving on the wrong size or
              unsafe setup, so we take responsibility for ensuring a proper fit.
            </p>
          </div>

          <p>
            <span className="font-semibold">Bottom line:</span> Shop with
            confidence at Tirematic. Our return and exchange policies are built
            to give you peace of mind. We don’t want anyone stuck with tires
            they can’t use or unhappy with a purchase. From our 30-day return
            guarantee to our fitment promise, you’re protected. This is all part
            of our commitment to transparent, fair, and convenient service –
            keeping you as a customer for life, not just one sale.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default ReturnPolicyContent;
