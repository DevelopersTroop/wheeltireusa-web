import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import TermsOfUseHero from './terms-of-use-hero';
// Component to render the Privacy Policy page
const TermsOfUse = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/terms-of-use`} isEnd={true}>
                Terms Of Use
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Privacy Policy page */}
      <TermsOfUseHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">Terms Of Use</h2>
            <p>Last Updated: June 15, 2025</p>
            <p>
              Welcome to{' '}
              <span className="font-semibold text-btext">Tirematic</span>. These
              Terms of Use (“Terms”) are the agreement that governs your access
              to and use of Tirematic’s online tire store. By visiting our
              website or purchasing from Tirematic, you (“the user”) agree to
              the following terms and conditions for our online tire store and
              services. Please read these terms carefully. If you do not agree
              with any part of these Terms, please do not use the Tirematic
              website or services. Using our site signifies your acceptance of
              these Terms.
            </p>
            <p>
              We’ve written these Terms in a straightforward way to be
              user-friendly and clear. They outline the rules for using our
              site, your responsibilities as a user, our intellectual property
              rights, limitations of our liability, and how changes to the Terms
              will be handled. Our goal is to ensure a safe, fair, and enjoyable
              experience for everyone. If you have any questions about these
              Terms, feel free to contact us (see the end of this document).
              Thank you for choosing Tirematic for your tire needs!
            </p>
          </div>

          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              Agreement to Terms
            </h3>
            <p>
              By accessing or using Tirematic’s website, you confirm that you
              accept and agree to comply with these Terms of Use. This agreement
              takes effect the moment you first use our site. It applies to all
              visitors, whether you’re just browsing our tire catalog or making
              a purchase. If you don’t agree with these Terms or any policy
              referenced herein (like our Privacy Policy), you must discontinue
              use of our site.
            </p>

            <p>
              <span className="font-semibold"> Age requirement: </span> You must
              be at least the legal age of majority in your state or province
              (usually 18 years or older) to use the Tirematic site or make a
              purchase. If you are under the age of majority, you may use our
              site only with the involvement and consent of a parent or legal
              guardian. By using our services, you represent that you meet this
              age requirement or have appropriate consent. We reserve the right
              to ask for proof of age if necessary.
            </p>

            <p>
              <span className="font-semibold"> Electronic agreement: </span> You
              acknowledge that by using the site, a contractual relationship is
              formed between you and Tirematic under these Terms, as if you had
              signed a written contract. You also agree that any notices or
              communications we send you electronically (e.g. via email or
              website notices) satisfy any legal communication requirements.
            </p>
          </div>

          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              Use of the Site and User Responsibilities
            </h3>
            <p>
              We grant you a personal, non-transferable, non-exclusive license
              to access and use the Tirematic website for legitimate purposes –
              primarily, to learn about our products, make purchases, and
              interact with our services. In using our site, you agree to do so
              lawfully and respectfully. You are responsible for your own
              actions on our website. This means you must uphold certain
              responsibilities and refrain from misuse of our site.
              Specifically, by using Tirematic, you agree that you will not:
            </p>
            <ul className="list-disc pl-5">
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  Engage in Illegal or Unauthorized Activities:{' '}
                </span>{' '}
                You will not use the site for any purpose that is unlawful,
                fraudulent, or prohibited by these Terms. This includes not
                violating any local, state, national, or international laws
                while using our service. For example, you agree not to use our
                site to perpetrate fraud, engage in harassment, or conduct any
                criminal activity.
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  Interfere with Site Security or Operations:{' '}
                </span>{' '}
                : You will not attempt to interfere with the proper functioning
                of our website. This means you must not introduce viruses,
                worms, spyware, or any other malicious code that could harm the
                site or other users’ devices. You also agree not to attack our
                site with denial-of-service attacks or attempt to hack into our
                systems. Any attempt to undermine the security, integrity, or
                performance of Tirematic’s services is strictly prohibited.
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  Abuse or Disrupt the Service:{' '}
                </span>{' '}
                You will not attempt to disrupt or impair the experience of
                others. This includes not engaging in activities like spamming
                our contact forms, using bots or scripts to scrape data or
                overload the site with requests. or any attempt to bypass
                measures we use to restrict access or prevent copying of
                content. Use the site in a normal manner – for example,
                searching for tires and making legitimate purchases. Any
                automated use of the system (such as using scripts or scraping
                tools) without our prior written permission is not allowed.
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  Provide False Information or Impersonate Others:{' '}
                </span>{' '}
                You agree to provide truthful, accurate information when
                interacting with Tirematic. For instance, when creating an
                account or placing an order, you will provide accurate personal
                details and a valid payment method. You will not use a false
                identity, impersonate any person or company, or misrepresent
                your affiliation with a person or entity. Misleading information
                can cause errors in delivery and support, so it’s important we
                have the correct details.{' '}
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  Misuse Account Credentials:{' '}
                </span>{' '}
                If you create a Tirematic account, you are responsible for
                maintaining the confidentiality of your login credentials. Do
                not share your password or account access with others. You are
                responsible for all activities that occur under your account. If
                you suspect unauthorized use of your account, notify us
                immediately so we can help secure it. We also reserve the right
                to terminate or suspend accounts that are misused or compromised
                for the protection of our users.{' '}
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  Use Our Content Inappropriately:{' '}
                </span>{' '}
                You may not reproduce, duplicate, copy, or sell any portion of
                the site or the content on it without our express written
                permission (see Intellectual Property Rights below for more
                details). This also means you agree not to use Tirematic’s logo,
                branding, or content in a way that confuses others or implies
                our endorsement of something without permission.
              </li>
            </ul>
            <p>
              In short, you agree to use Tirematic only for its intended purpose
              – as a place to research and purchase tires and related services –
              and to follow the rules and policies we set. If you violate these
              Terms or misuse our site, we reserve the right to terminate your
              access or take other appropriate action. We want Tirematic to be a
              secure, reliable resource for all users, so we appreciate your
              cooperation in keeping it that way.
            </p>
          </div>

          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              Intellectual Property Rights
            </h3>
            <p>
              All content and materials on the Tirematic website are owned by us
              or licensed to us, and are protected by intellectual property
              laws. Unless otherwise indicated, the Tirematic site and all of
              its contents are the exclusive property of Tirematic (or our
              content suppliers) and are protected by copyright, trademark, and
              other intellectual property rights. This includes (but is not
              limited to) the text, descriptions, product listings,
              photographs/images, graphics, logos, button icons, audio clips,
              videos, data compilations, and software used on the site.
              Collectively, these are referred to as the “Content.”
            </p>
            <ul className="list-disc pl-5">
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  Tirematic’s trademarks and branding:{' '}
                </span>{' '}
                “Tirematic” and our logo are trademarks/service marks owned by
                us. You may not use Tirematic’s name, logos, or other brand
                elements without our prior written consent, especially not in
                any way that suggests endorsement or affiliation where none
                exists. All other trademarks appearing on our site (such as tire
                brand names) are the property of their respective owners and are
                used on Tirematic for identification purposes only.
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  Your limited rights to use site content:{' '}
                </span>{' '}
                We grant you a limited, revocable license to access and use the
                Content for your personal, non-commercial use – for example, to
                view product information and make purchasing decisions. However,
                you agree not to reproduce, distribute, modify, create
                derivative works from, publicly display, publicly perform,
                republish, or transmit any Content from our site without our
                express permission, except to the extent allowed by law (such as
                brief quotations for commentary or fair use). In plain terms,
                you can browse and enjoy our website, but you can’t take our
                photos or descriptions to use on your own site or print
                materials without permission.
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  No data mining or extraction:{' '}
                </span>{' '}
                As mentioned in “Use of Site,” automated scraping or data mining
                of our Content is not permitted. The content is provided “as is”
                for informational use by our customers. Systematically
                collecting our product listings or other data to use for another
                purpose (like a competitor’s site or a price comparison
                database) is a violation of these Terms.
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  Submission of content by users:{' '}
                </span>{' '}
                If Tirematic ever allows features like customer reviews,
                comments, or other user-generated content, any such submissions
                you make should be your own original work or content you have a
                right to use. By submitting any content on our site, you would
                grant Tirematic a license to use, display, and distribute that
                content (for example, posting your review on our product page).
                We do not claim ownership of your original contributions, but we
                would have rights to display them. (Currently, if our site has
                no user content features, this may not apply – it’s provided for
                completeness.){' '}
              </li>
              <li>
                {' '}
                <span className="font-semibold">
                  {' '}
                  Intellectual property of others:{' '}
                </span>{' '}
                We respect the intellectual property rights of others and expect
                users to do the same. If you believe that any material on our
                site infringes someone’s copyright or other rights, please
                notify us with details, and we will investigate. We comply with
                applicable intellectual property laws (such as the Digital
                Millennium Copyright Act in the U.S.) in removing or disabling
                access to infringing content when properly notified.{' '}
              </li>
            </ul>
            <p>
              Remember that unauthorized use of our Content or trademarks not
              only violates these Terms but may also violate copyright laws,
              trademark laws, and other regulations. We work hard to create and
              curate the information and images on our site, and we appreciate
              you respecting those efforts. If you’d like to share something
              from Tirematic (like a blog post or infographic if we have those),
              feel free to use provided sharing features or contact us for
              permission if needed.
            </p>
          </div>

          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h3 className="text-2xl font-semibold text-btext">
              Limitation of Liability and Disclaimers
            </h3>
            <p>
              Use at your own risk: Tirematic endeavors to provide accurate,
              reliable information on our site, and we strive for our service
              (including the website and any associated apps or tools) to run
              smoothly. However, using the Tirematic site is at your own risk.
              The site and all content and services provided through it are
              offered on an “as is” and “as available” basis, without warranties
              of any kind (either express or implied). This means we do not
              explicitly guarantee that the information on our site is
              error-free, that the site will be available at all times, or that
              it will meet your expectations. While we do our best, we do not
              warrant that your use of our service will be uninterrupted,
              timely, secure, or error-free. For example, there may be rare
              occasions when the site is down for maintenance, or an unforeseen
              technical issue occurs – we cannot promise such things will never
              happen.
            </p>
            <p>
              To the fullest extent permitted by law, Tirematic disclaims any
              and all warranties, express or implied, regarding the site and its
              content. This includes disclaimers of merchantability (we don’t
              guarantee the website is perfectly suited to a particular purpose)
              and fitness for a particular purpose, as well as any warranty that
              the site will be free of viruses or other harmful components
              (though we certainly aim to prevent that).
            </p>
            <p>
              <span className="font-semibold"> Limitation of Liability: </span>{' '}
              Under no circumstances will Tirematic or its owners, directors,
              officers, employees, or affiliates be liable to you for any
              indirect, incidental, consequential, special, or punitive damages
              arising out of or related to your use of (or inability to use) our
              website or services. This includes, for example, any loss of
              profits, loss of data, loss of goodwill, or other intangible
              losses, even if we have been advised of the possibility of such
              damages. We are also not responsible for damages or losses caused
              by unauthorized access to or alteration of your transmissions or
              data, or for the cost of procurement of substitute goods or
              services.
            </p>

            <p>
              <span className="font-semibold">In simpler terms:</span> if
              something goes wrong in connection with your use of Tirematic –
              such as the site being temporarily unavailable, or information on
              the site having an error – our liability is limited. We will not
              be responsible for large categories of losses that were not
              directly caused by our negligence or breach. If, notwithstanding
              the above, Tirematic is found liable to you for any damage or loss
              arising from or related to your use of the site or purchase of
              products, the maximum liability we would owe is limited to the
              amount you paid Tirematic for the product or service that is the
              subject of the claim (for example, the price of the tires you
              bought). In many cases, consumer protection laws or manufacturer
              warranties cover issues with products, and those would be your
              avenue for relief rather than any claim against the website
              itself.
            </p>

            <p>
              <span className="font-semibold">Exceptions:</span> Some
              jurisdictions do not allow the exclusion or limitation of certain
              warranties or liabilities. For instance, certain state laws might
              not allow a company to fully disclaim an implied warranty, or
              might not allow the exclusion of liability for incidental or
              consequential damages. In such cases, the above disclaimers and
              limitations may not fully apply to you. However, our liability
              will still be limited to the maximum extent permitted by law. This
              means that we will comply with applicable laws that provide you
              additional rights as a consumer. Nothing in these Terms is meant
              to limit your statutory rights (like specific legal protections
              you might have for consumer products).
            </p>

            <p>
              <span className="font-semibold">
                {' '}
                Third-party content and links:{' '}
              </span>{' '}
              Our site might contain links to third-party websites or services
              (for example, a link to a tire manufacturer’s site for additional
              product details, or a tutorial video on YouTube about tire
              maintenance). These external sites are not under our control, and
              Tirematic isn’t responsible for their content, accuracy, or
              availability. Clicking those links is at your discretion. We
              provide them for convenience or reference. We also don’t warrant
              or endorse products or information provided by third parties. If
              you leave our site via a third-party link, be sure to read the
              terms and privacy policy of that other site, as it will have its
              own terms.
            </p>

            <p>
              <span className="font-semibold">Product information:</span> We
              strive to ensure that product descriptions, pricing, and
              availability information on Tirematic are accurate. However,
              mistakes can happen (e.g., a typo or an error from a supplier). We
              do not guarantee that all product descriptions or pricing are free
              of errors, and we reserve the right to correct such errors
              (including after you have submitted an order, if the error
              affected your order). If we discover a significant error in the
              information, we’ll do our best to notify you if it affects you.
              Also, product images on the site are for illustration – the actual
              tire may vary slightly (for example, tread pattern might look a
              bit different in person). If a product you receive is not as
              described, your remedy is typically to return it unused, as
              allowed by our return policy.
            </p>

            <p>
              In summary, Tirematic is not liable for unforeseeable damages and
              does not provide warranties beyond those explicitly stated. We do
              stand behind the quality of the products we sell (see our Warranty
              section) and will assist you with any legitimate issues to the
              best of our ability. But for legal purposes, we must make clear
              that using the site is at your own risk and our direct obligations
              to you are limited.
            </p>
          </div>

          <p>
            Using Tirematic should be a smooth experience, and we truly value
            our customers. These Terms are here to protect both you and us, and
            to set clear expectations. By respecting these guidelines, you’re
            helping us maintain a great platform for everyone who loves quality
            tires and great service. Happy driving, and thanks for choosing
            Tirematic!
          </p>
        </div>
      </Container>
    </>
  );
};

export default TermsOfUse;
