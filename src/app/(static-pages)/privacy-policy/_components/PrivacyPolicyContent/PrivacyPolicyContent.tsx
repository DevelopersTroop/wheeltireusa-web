import Container from '@/components/ui/container/container';

const PrivacyPolicyContent = () => {
  return (
    <Container>
      <div className="flex flex-col gap-8 items-start justify-center w-full mt-10 mb-10 md:mb-20">
        <div className="flex flex-col gap-4 items-start justify-center w-full">
          <div className="flex items-center gap-3">
            <span className="text-3xl">3️⃣</span>
            <h2 className="text-4xl font-bold text-btext uppercase">Privacy Policy</h2>
          </div>

          <section className="w-full">
            <h3 className="text-2xl font-bold text-btext mb-4">1. Information We Collect</h3>
            <div className="space-y-4 text-black">
              <p>We may collect:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Billing & shipping address</li>
                <li>Phone number</li>
                <li>Payment information</li>
                <li>Vehicle information</li>
                <li>IP address and browsing data</li>
              </ul>
            </div>
            <hr className="my-8 border-gray-300" />
          </section>

          <section className="w-full">
            <h3 className="text-2xl font-bold text-btext mb-4">2. How We Use Information</h3>
            <div className="space-y-4 text-black">
              <p>We use your information to:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Process orders</li>
                <li>Provide customer support</li>
                <li>Improve website performance</li>
                <li>Prevent fraud</li>
                <li>Send marketing communications (if opted-in)</li>
              </ul>
            </div>
            <hr className="my-8 border-gray-300" />
          </section>

          <section className="w-full">
            <h3 className="text-2xl font-bold text-btext mb-4">3. Sharing Information</h3>
            <div className="space-y-4 text-black">
              <p>We may share data with:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Payment processors</li>
                <li>Shipping carriers</li>
                <li>Marketing service providers</li>
                <li>Analytics providers</li>
              </ul>
              <p>We do not sell personal data in the traditional sense.</p>
            </div>
            <hr className="my-8 border-gray-300" />
          </section>

          <section className="w-full">
            <h3 className="text-2xl font-bold text-btext mb-4">4. Cookies & Tracking</h3>
            <div className="space-y-4 text-black">
              <p>We use cookies to:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Improve website functionality</li>
                <li>Analyze traffic</li>
                <li>Personalize content</li>
                <li>Provide targeted advertising</li>
              </ul>
              <p>You can manage cookie preferences through your browser.</p>
            </div>
            <hr className="my-8 border-gray-300" />
          </section>

          <section className="w-full">
            <h3 className="text-2xl font-bold text-btext mb-4">5. Data Security</h3>
            <div className="space-y-4 text-black">
              <p>
                We implement reasonable administrative, technical, and physical safeguards to protect personal
                information.
              </p>
            </div>
            <hr className="my-8 border-gray-300" />
          </section>

          <section className="w-full">
            <h3 className="text-2xl font-bold text-btext mb-4">6. Your Rights</h3>
            <div className="space-y-4 text-black">
              <p>Depending on your state or country, you may have rights to:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Access your data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p>To submit a request, contact:</p>
              <p className="font-semibold text-primary">privacy@wheeltireusa.com</p>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPolicyContent;
