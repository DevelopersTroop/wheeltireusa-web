import Container from '@/components/ui/container/container';

export const TermsOfUseContent = () => {
  return (
    <Container>
      <div className="flex flex-col gap-8 items-start justify-center w-full mt-10 mb-10 md:mb-20">
        <div className="flex flex-col gap-4 items-start justify-center w-full">
          <div className="flex items-center gap-3">
            <span className="text-3xl">1️⃣</span>
            <h2 className="text-4xl font-bold text-btext uppercase">Terms Of Use</h2>
          </div>

          <section className="w-full">
            <h3 className="text-2xl font-bold text-btext mb-4">1. Acceptance of Terms</h3>
            <div className="space-y-4 text-black">
              <p>
                Welcome to WheelTireUSA (“Company,” “we,” “us,” or “our”). By accessing or using our website
                (the “Site”), you agree to comply with and be bound by these Terms of Use.
              </p>
              <p>
                If you do not agree, you must discontinue use of the Site immediately.
              </p>
              <p>
                You represent that you are at least 18 years old or the legal age of majority in your jurisdiction.
              </p>
            </div>
            <hr className="my-8 border-gray-300" />
          </section>

          <section className="w-full">
            <h3 className="text-2xl font-bold text-btext mb-4">2. Website Access & Permitted Use</h3>
            <div className="space-y-4 text-black">
              <p>You may use this Site solely for lawful purposes and personal or commercial shopping.</p>
              <p>You agree not to:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Use the Site for fraudulent purposes</li>
                <li>Attempt to interfere with website security</li>
                <li>Use automated systems (bots, scraping tools, etc.) without permission</li>
                <li>Misrepresent your identity or vehicle information</li>
              </ul>
              <p>We reserve the right to suspend or terminate access at our discretion.</p>
            </div>
            <hr className="my-8 border-gray-300" />
          </section>

          <section className="w-full">
            <h3 className="text-2xl font-bold text-btext mb-4">3. Intellectual Property</h3>
            <div className="space-y-4 text-black">
              <p>
                All content on the Site — including logos, images, product descriptions, videos, text, graphics,
                and software — is owned by or licensed to WheelTireUSA.
              </p>
              <p>
                You may not reproduce, distribute, modify, or commercially exploit any content without written
                permission.
              </p>
            </div>
            <hr className="my-8 border-gray-300" />
          </section>

          <section className="w-full">
            <h3 className="text-2xl font-bold text-btext mb-4">4. Product Information Disclaimer</h3>
            <div className="space-y-4 text-black">
              <p>We strive to ensure accuracy; however:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Fitment information is based on data provided by customers and third parties.</li>
                <li>Compatibility is not guaranteed.</li>
                <li>Customers are responsible for verifying fitment before installation.</li>
              </ul>
              <p>We are not liable for damages resulting from incorrect vehicle information provided by users.</p>
            </div>
            <hr className="my-8 border-gray-300" />
          </section>

          <section className="w-full">
            <h3 className="text-2xl font-bold text-btext mb-4">5. Third-Party Links</h3>
            <div className="space-y-4 text-black">
              <p>
                Our Site may contain links to third-party websites. We are not responsible for the content,
                policies, or practices of third parties.
              </p>
            </div>
            <hr className="my-8 border-gray-300" />
          </section>

          <section className="w-full">
            <h3 className="text-2xl font-bold text-btext mb-4">6. Limitation of Liability</h3>
            <div className="space-y-4 text-black">
              <p>To the maximum extent permitted by law, WheelTireUSA shall not be liable for:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Indirect or consequential damages</li>
                <li>Loss of profits</li>
                <li>Business interruption</li>
                <li>Website downtime</li>
              </ul>
              <p>Your use of the Site is at your own risk.</p>
            </div>
            <hr className="my-8 border-gray-300" />
          </section>

          <section className="w-full">
            <h3 className="text-2xl font-bold text-btext mb-4">7. Changes to Terms</h3>
            <div className="space-y-4 text-black">
              <p>
                We may update these Terms of Use at any time. Continued use of the Site constitutes
                acceptance of any modifications.
              </p>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
};
