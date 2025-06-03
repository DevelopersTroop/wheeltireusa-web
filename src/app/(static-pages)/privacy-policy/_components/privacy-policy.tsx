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
            <p>Last Updated: June 3, 2025</p>
            <p>
              At <span className="font-semibold text-btext">Tirematic</span>{' '}
              (we, our, or us) we are committed to protecting your privacy and
              ensuring a safe user experience. This Privacy Policy outlines how
              we collect, use, disclose, and safeguard your information across
              our services.
            </p>
            <p>
              By accessing or using our website, purchasing our products, or
              interacting with our services, you consent to the data practices
              described in this policy.
            </p>
          </div>
          {/* Section 1: Information We Collect */}
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              Information We Collect
            </h3>

            {/* Personal Information */}
            <h4 className="text-lg font-semibold text-btext">
              Personal Information
            </h4>
            <p>We may collect the following information when you:</p>
            <ul className="list-disc pl-5">
              <li>Register for an account</li>
              <li>Place an order</li>
              <li>Submit an inquiry or use support services</li>
              <li>Sign up for promotions or marketing</li>
            </ul>

            {/* Examples include */}
            <h4 className="text-lg font-semibold text-btext">
              Examples include:
            </h4>
            <ul className="list-disc pl-5">
              <li>First and last name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Mailing/billing/shipping address</li>
              <li>Payment information (not stored on our servers)</li>
              <li>Vehicle specifications for custom wheels</li>
              <li>Account preferences and settings</li>
            </ul>
            <p>
              We do not collect personal information unless you voluntarily
              provide it.
            </p>

            {/* Usage Information */}
            <h4 className="text-lg font-semibold text-btext">
              Usage and Device Information
            </h4>
            <p>When you visit our site, we automatically collect:</p>
            <ul className="list-disc pl-5">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device and operating system</li>
              <li>Pages visited and referring URLs</li>
              <li>Site interaction (clicks, scrolls, time spent)</li>
            </ul>
            <p>
              This information helps us improve performance and tailor your
              experience.
            </p>

            {/* Cookies and Tracking Technologies */}
            <h4 className="text-lg font-semibold text-btext">
              Cookies and Tracking Technologies
            </h4>
            <p>
              We use cookies and similar technologies to enhance functionality,
              analyze traffic, and personalize content.
            </p>

            <h4 className="text-lg font-semibold text-btext">
              For full details, please see our{' '}
              <Link href="#">
                {' '}
                <span className="text-primary">Cookie Policy</span>{' '}
              </Link>{' '}
              .
            </h4>
            <p>
              You may control cookie settings via your browser. Note that
              disabling cookies may affect site functionality.
            </p>
          </div>

          {/* Section 2: How We Use Your Information */}
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              How We Use Your Information
            </h3>
            <p>We use your data to:</p>
            <ul className="list-disc pl-5">
              <li>Process and fulfill orders (including custom products)</li>
              <li>Provide customer support</li>
              <li>
                Communicate about purchases, product updates, and promotions
              </li>
              <li>Improve website performance, products, and services</li>
              <li>Analyze user behavior for business insights</li>
            </ul>
            <p>
              You may opt out of marketing communications anytime by clicking
              unsubscribe or adjusting your account settings.
            </p>
          </div>

          {/* Section 3: Sharing Your Information */}
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              Sharing Your Information
            </h3>
            <p>
              We do not sell or lease your data. We may share your information
              with:
            </p>

            {/* Trusted Third-Party Service Providers */}
            <h4 className="text-lg font-semibold text-btext">
              Trusted Third-Party Service Providers:
            </h4>
            <ul className="list-disc pl-5">
              <li>Payment processors</li>
              <li>Shipping and logistics providers</li>
              <li>Customer support platforms</li>
              <li>Analytics and marketing partners</li>
            </ul>
            <p>
              All partners are contractually obligated to protect your
              information.
            </p>

            {/* Internal Entities */}
            <h4 className="text-lg font-semibold text-btext">
              Internal Entities:
            </h4>
            <p>
              We share necessary information between our Florida and California
              facilities for operations, customer service, and fulfillment.
            </p>

            {/* Legal Compliance */}
            <h4 className="text-lg font-semibold text-btext">
              Legal Compliance:
            </h4>
            <p>We may disclose information:</p>
            <ul className="list-disc pl-5">
              <li>As required by law or legal process</li>
              <li>
                To protect rights, property, or safety of users, our business,
                or others
              </li>
            </ul>
          </div>

          {/* number 4 Data Security */}
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">Data Security</h3>
            <p>
              We implement technical and organizational measures to safeguard
              your data:
            </p>
            <ul className="list-disc pl-5">
              <li>SSL encryption for all data transmissions</li>
              <li>Secure servers and industry-standard access controls</li>
            </ul>
            <p>
              While we work to protect your data, no system is 100% secure. We
              encourage you to use strong passwords and protect your login
              credentials.
            </p>
          </div>

          {/* number 5 Your Rights & Choices */}
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              Your Rights & Choices
            </h3>

            {/* Access and Deletion */}
            <h4 className="text-lg font-semibold text-btext">
              Access and Deletion
            </h4>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5">
              <li>Request access to the personal data we hold about you.</li>
              <li>Request correction or deletion of your data</li>
            </ul>
            <p>To make a request, please email us at: sales@tirematic.com</p>
            <p>
              We may retain certain data if required by law, for fraud
              prevention, or for business continuity.
            </p>

            {/* Opt-Out of Marketing Communications */}
            <h4 className="text-lg font-semibold text-btext">
              Opt-Out of Communications
            </h4>
            <p>
              You can unsubscribe from marketing emails by clicking the
              unsubscribe link in our emails or updating your profile
              preferences.
            </p>

            {/* Cookies */}
            <h4 className="text-lg font-semibold text-btext">Cookies</h4>
            <p>
              See{' '}
              <Link href="#">
                {' '}
                <span className="text-primary">Cookie Policy </span>{' '}
              </Link>{' '}
              for your cookie preferences and controls.
            </p>
          </div>

          {/* number 6 Children’s Privacy */}
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              Children’s Privacy
            </h3>
            <p>
              Our site is not intended for users under 18 years of age. We do
              not knowingly collect information from children. If you are under
              18, please do not use our services without guardian consent.
            </p>
          </div>

          {/* number 7 International Data Transfers */}
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              International Data Transfers
            </h3>
            <p>
              If you are visiting from outside the United States, be aware your
              information may be transferred to, stored in, and processed in the
              U.S. By using our services, you consent to this transfer and data
              handling.
            </p>
          </div>

          {/* number 8 California Privacy Rights (CCPA) */}
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              California Privacy Rights (CCPA)
            </h3>
            <p>
              If you are a California resident, you may have additional rights
              under the California Consumer Privacy Act:
            </p>
            <ul className="list-disc pl-5">
              <li>Right to know what personal data is collected</li>
              <li>Right to request deletion</li>
              <li>Right to opt-out of sale (note: we do not sell your data)</li>
            </ul>
            <p>
              For CCPA-related requests, please contact: sales@tirematic.com
            </p>
          </div>

          {/* number 9 External Links */}
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              External Links
            </h3>
            <p>
              Our site may contain links to third-party websites. We are not
              responsible for their content or privacy practices. We encourage
              users to read the privacy policies of those sites before engaging
              with them.
            </p>
          </div>

          {/* number 10  Changes to This Privacy Policy*/}
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              Changes to This Privacy Policy
            </h3>
            <p>
              We may update this Privacy Policy as needed. When changes are
              made, we will revise the Last Updated date. For significant
              updates, we may notify users via email or website notice.
            </p>
          </div>

          {/* number 11 Related Policies & Links */}
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              Related Policies & Links
            </h3>
            <ul className="list-disc pl-5">
              <li className="text-primary">
                {' '}
                <Link href="#"> Cookie Policy </Link>
              </li>
              <li className="text-primary">
                {' '}
                <Link href="#"> Terms & Conditions </Link>{' '}
              </li>
              <li className="text-primary">
                {' '}
                <Link href="#"> Return Policy </Link>
              </li>
            </ul>
          </div>

          {/* number 12 Contact Information */}
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              Contact Information
            </h3>
            <div>
              <p>
                If you have any questions or concerns about this Privacy Policy
                or your personal data, contact us:{' '}
              </p>
              <p>
                Email:{' '}
                <a href="mailto:sales@tirematic.com" className="text-primary">
                  sales@tirematic.com
                </a>
              </p>
              <p>
                Phone:{' '}
                <a href="tel:18663447857" className="text-primary">
                  1 (866) 344-7857
                </a>
              </p>
            </div>
          </div>

          {/* footer */}
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <p>
              This Privacy Policy reflects our commitment to transparency,
              security, and trust. We’re here to provide the best possible
              experience while respecting your rights and data privacy.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
