import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import CustomerSupportHero from './customer-support-hero';
// Component to render the Privacy Policy page
const CustomerSupport = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/customer-support`} isEnd={true}>
                Customer Support
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Privacy Policy page */}
      <CustomerSupportHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">
              Customer Support
            </h2>
            <p>Last Updated: June 12, 2025</p>
            <p>
              <span className="font-semibold text-btext">
                How can we help you today?
              </span>
              , At Tirematic, we’re committed to providing friendly, world-class{' '}
              <span className="font-semibold">customer support</span> every step
              of the way. Buying tires online might be new to you, but rest
              assured, our support team is here to make the process easy and
              worry-free. Whether you have a question about an order, need
              advice on choosing the right tire, or run into an issue, we’ve got
              your back with multiple ways to get assistance.
            </p>

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-2xl font-semibold text-btext">
                Contact Us – We’re Here for You
              </h2>
              <ul className="list-disc pl-5">
                <li>
                  {' '}
                  <span className="font-bold"> Phone Support: </span> Need help
                  right now? Give us a call at 866-344-7857. You’ll reach a
                  real, knowledgeable Tirematic representative who’s happy to
                  answer questions or resolve concerns. Our helpline is open
                  Mon–Sat, 9 AM – 6 PM (ET), so you can get guidance when you
                  need it.
                </li>
                <li>
                  {' '}
                  <span className="font-bold"> Live Chat: </span> Prefer
                  chatting online? Use our Live Chat on the website for instant
                  help. Just click the chat icon and you’ll be connected to a
                  support specialist in real-time. This is great for quick
                  questions or if you’re multitasking on your computer or phone.
                </li>
                <li>
                  {' '}
                  <span className="font-bold"> Email Support: </span> For less
                  urgent inquiries or detailed requests, send us an email at
                  support@tirematic.com. We’ll respond promptly (typically
                  within one business day) with the information you need. It’s a
                  convenient way to get help if you’re busy – drop us a note
                  anytime, and we’ll get back to you with solutions.
                </li>
                <li>
                  {' '}
                  <span className="font-bold"> FAQ and Help Center: </span> You
                  might find your answer even faster in our online Help Center.
                  We’ve compiled a handy FAQ section with answers to common
                  questions about ordering, shipping, returns, and more. It’s
                  available 24/7 on our site – a great first stop for quick
                  info.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-2xl font-semibold text-btext">
                Tirematic Customer Care Difference
              </h2>
              <p>
                Our customer support isn’t just about answering questions – it’s
                about making you feel confident. We know tires are a big
                purchase, and we want you to feel as comfortable as possible.
                Here’s what you can expect from Tirematic support:
              </p>
              <ul className="list-disc pl-5">
                <li>
                  {' '}
                  <span className="font-bold"> Friendly, Real People: </span> No
                  robots here! Our team is made up of tire experts and
                  problem-solvers who genuinely care. We’ll listen patiently and
                  speak to you in a welcoming, easy-to-understand tone (no
                  confusing jargon).
                </li>
                <li>
                  {' '}
                  <span className="font-bold"> Expert Advice: </span> Not sure
                  which tire is best for your car or how to use our site? Ask us
                  anything. Our staff is trained in all things tires – we can
                  help you pick the right size, recommend tires for specific
                  needs (like off-roading or winter driving), and guide you
                  through using our tools like the Tire Size Calculator.
                </li>
                <li>
                  {' '}
                  <span className="font-bold">
                    {' '}
                    Quick Issue Resolution:{' '}
                  </span>{' '}
                  In the rare event something goes wrong (for example, an order
                  mix-up or a warranty question), we move fast to make it right.
                  Your safety and satisfaction are top priority. We’ll
                  troubleshoot the issue, provide options (such as replacements
                  or refunds per our policies), and keep you updated at every
                  step.
                </li>
                <li>
                  {' '}
                  <span className="font-bold">
                    {' '}
                    Transparent Communication:{' '}
                  </span>{' '}
                  You’ll always know what’s going on. If there’s a shipping
                  delay or any hiccup, we’ll proactively inform you. And when
                  you reach out, we’ll clearly explain solutions or next steps.
                  No runarounds – just honest help.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <h2 className="text-2xl font-semibold text-btext">
                Support Hours & Response Times
              </h2>
              <p>
                Our standard support hours are Monday through Saturday, 9:00 AM
                to 6:00 PM Eastern Time. During these hours, you can expect
                prompt responses via phone or live chat. Emails can be sent
                anytime and we’ll typically reply by the next business day
                (often sooner). We’re closed on Sundays so our team can recharge
                – but you can still browse our online resources or send an
                email, and we’ll tackle it first thing Monday.
              </p>
              <p>
                <span className="font-semibold">
                  Your peace of mind is our mission.
                </span>{' '}
                Whether you’re a first-time buyer or a long-time Tirematic
                customer, we want you to feel confident and cared for. Many of
                our customers tell us they love our “small company” friendliness
                combined with “big company” efficiency – that’s exactly the
                experience we strive to deliver.
              </p>

              <p>
                So please, reach out! Even if you just need tire advice or have
                a what-if scenario, we’re happy to chat. At Tirematic, there’s
                no such thing as a silly question – we’re drivers too, and we
                know the road can throw surprises at you. Let’s navigate them
                together.
              </p>

              <p>
                <span className="font-semibold">Need help now?</span> Go ahead
                and call, chat, or email using the info above. We look forward
                to assisting you and making your Tirematic experience as smooth
                as possible. Happy driving, and remember: we’re just a click or
                call away whenever you need us!
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CustomerSupport;
