import Container from '@/components/ui/container/container';
import PrivacyPolicyHero from './privacy-policy-hero';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
// Component to render the Privacy Policy page
const PrivacyPolicy = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/privacy-policy`} isEnd={true}>
                Privacy Policy
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Privacy Policy page */}
      <PrivacyPolicyHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">
              Privacy Policy
            </h2>
            <p>Last Updated: June 14, 2025</p>
            <p>
              At <span className="font-semibold text-btext">Tirematic</span>we
              value your privacy and strive to be transparent about how we
              handle your information. This Privacy Policy for Tirematic
              explains what information we collect from you, how we use and
              share it, how we protect it, and the choices and rights you have
              regarding your personal data. By using our website or services,
              you agree to the practices described in this policy. We want you
              to feel confident that your data is safe with us and that we use
              it responsibly in line with our customer-first values.
            </p>
          </div>

          {/* Section 1: Information We Collect */}
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              Information We Collect
            </h3>
            <p>
              We collect only the information we need to serve you better. This
              includes:
            </p>
            <ul className="list-disc pl-5">
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  Personal Information:{' '}
                </span>{' '}
                Details you provide to us when you create an account, make a
                purchase, or contact us. For example, we ask for your name,
                shipping address, billing address, email, and phone number so we
                can process orders and communicate with you as needed.
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  Payment Information:{' '}
                </span>{' '}
                When you make a purchase, you provide payment details (such as
                credit card information). For your security, Tirematic does not
                store your full credit card data on our servers – payment
                details are handled securely by our third-party payment
                processor. This means your card information is transmitted
                securely to the payment provider and not kept by us after the
                transaction.{' '}
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  Order and Transaction Information:{' '}
                </span>{' '}
                We maintain records of your purchases (e.g. which tires you
                bought, when, and any promotions applied) to fulfill your orders
                and assist with returns or warranty claims.{' '}
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  Website Usage Data:{' '}
                </span>{' '}
                Like most websites, we automatically collect some technical data
                when you visit Tirematic. This includes your IP address, browser
                type, device information, and browsing actions on our site (such
                as pages viewed and links clicked). We may use cookies or
                similar technologies to remember your preferences, keep you
                logged in, and understand how you use our site so we can improve
                it. You can control cookies through your browser settings;
                however, disabling cookies may affect site functionality (like
                the shopping cart).{' '}
              </li>
              <li>
                {' '}
                <span className="font-semibold"> Communication Data: </span> If
                you email us, chat with customer service, or fill out any forms
                (for example, a contact form or a newsletter signup), we will
                collect the information you choose to give us (such as your
                inquiries, feedback, and any contact details you provide). This
                helps us respond to you and improve our services.{' '}
              </li>
            </ul>
            <p>
              Why we collect this information: It allows us to process your
              orders, provide customer support, improve our website, and offer
              you a more personalized experience. We avoid collecting any
              sensitive personal data that we do not need. For instance, we do
              not intentionally collect information about your race, religion,
              or health, as it’s not necessary for tire sales. If we ever need
              optional information (like your vehicle details to recommend the
              right tires), we will make it clear and you can decide whether to
              share it.
            </p>
          </div>

          {/* Section 2: How We Use Your Information */}
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              How We Use Your Information
            </h3>
            <p>
              We use the information we collect to serve you and make your
              experience with Tirematic great – always in a lawful and fair
              manner. Here are the main purposes for which Tirematic uses your
              personal information:
            </p>
            <ul className="list-disc pl-5">
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  To Process Orders and Provide Services:{' '}
                </span>{' '}
                We use your personal and payment details to process
                transactions, fulfill your tire orders, arrange delivery, and
                provide any services you request. For example, we’ll use your
                address to ship your tires and your email to send you order
                confirmations and tracking information.
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  To Communicate with You:{' '}
                </span>{' '}
                We may contact you via email, phone, or text to update you on
                your order status, respond to your questions, inform you of any
                issues, or collect feedback after a purchase. We also send
                critical service messages (like important updates to our
                policies or product recall notices) when necessary. We’ll never
                spam you – communications are typically tied to your orders or
                direct requests.{' '}
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  To Provide Customer Support:{' '}
                </span>{' '}
                If you reach out with a question, concern, or warranty claim, we
                will use your information to investigate and resolve the issue.
                Knowing your order history or account info helps us give you
                quick, personalized support.
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  To Improve Our Website and Services:{' '}
                </span>{' '}
                We analyze how users navigate our site and use our products so
                we can make Tirematic better. For example, usage data (like
                which tire models are viewed most) helps us optimize our product
                selection and website layout. We might use analytics tools to
                see overall trends, like which pages are popular or where users
                might encounter errors, in order to enhance site performance and
                usability.{' '}
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  For Marketing (With Your Consent):{' '}
                </span>{' '}
                If you opt in to receive marketing communications, we will use
                your email or contact info to send you news about Tirematic –
                such as special offers, new tire launches, or helpful tire care
                tips. These communications are meant to be useful, and you can
                unsubscribe at any time if you no longer wish to receive
                promotional emails. (If you don’t opt in, we won’t use your
                information for marketing.){' '}
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  For Marketing (With Your Consent):{' '}
                </span>{' '}
                We may use certain data (like IP addresses or purchase history)
                to protect our website and you, our customers. This includes
                detecting and preventing fraud, unauthorized transactions, or
                other illegal activities. For instance, we might flag unusual
                account activity to prevent someone from misusing your
                account.{' '}
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  For Marketing (With Your Consent):{' '}
                </span>{' '}
                In some cases we must use or disclose information to meet legal
                and regulatory requirements. For example, maintaining
                transaction records for accounting and tax purposes, or
                providing information if required by a lawful government request
                or to enforce our legal rights.{' '}
              </li>
            </ul>
            <p>
              Why we collect this information: It allows us to process your
              orders, provide customer support, improve our website, and offer
              you a more personalized experience. We avoid collecting any
              sensitive personal data that we do not need. For instance, we do
              not intentionally collect information about your race, religion,
              or health, as it’s not necessary for tire sales. If we ever need
              optional information (like your vehicle details to recommend the
              right tires), we will make it clear and you can decide whether to
              share it.
            </p>
          </div>

          {/* footer */}
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <p>
              Thank you for choosing Tirematic. We appreciate your business and
              your confidence in us to handle your information responsibly. This
              Privacy Policy may be updated from time to time (for example, if
              we add new features or as laws change), and we will post any
              changes on this page with a new effective date. We encourage you
              to review it occasionally. By continuing to use Tirematic after
              changes to the Privacy Policy, you acknowledge and agree to those
              changes. Rest assured, we will not materially change our privacy
              commitments without informing you.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
