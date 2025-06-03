'use client';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
// import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
// import Item from "@/app/ui/breadcrumb/item";
// import Container from "@/app/ui/container/container";
import Link from 'next/link';
import React, { useState } from 'react';
import { FaPhone } from 'react-icons/fa6';

// Accordion component to display collapsible FAQ items
const Accordion = ({ title, content }: { title: string; content: string }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="border border-[#CFCFCF] rounded-lg">
      {/* Accordion header */}
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between text-start w-full py-[17px] px-5 md:px-10"
      >
        <span className="text-lg font-semibold text-[#210203]">{title}</span>
        {/* Icon to indicate accordion state */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className={`w-5 h-5 transform transition-transform duration-200 ${
            accordionOpen ? '' : 'rotate-180'
          }`}
        >
          <path
            fillRule="evenodd"
            d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/* Accordion content */}
      <div
        className={`text-start transition-all duration-300 ease-in-out overflow-hidden text-[#210203]text-base font-normal ${
          accordionOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className="py-[17px] px-5 md:px-10 border-t border-[#CFCFCF]"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </div>
  );
};

// FAQ data categories
const faqs = [
  {
    id: '1',
    title: 'What is the estimated build time?',
    content:
      "<p>At Tirematic, our estimated build time ranges from 6 to 12 weeks, depending on the complexity of your order. We strive to meet your expectations and expedite production when possible. Please note that certain seasons may result in longer queues due to high demand.</p><p class='pt-4' >Need assistance? <a href='tel:1-866-344-7857' class='text-red-500 '>Call us at 1-866-344-7857</a></p>",
  },
  {
    id: '2',
    title: 'Is a deposit required to place an order?',
    content:
      "<p>Yes, a 50% deposit is required before we begin production. Currently, Tirematic accepts cash, check, ACH, or money order. Credit card payments are not supported at this time.</p><p class='pt-4' >Questions? <a href='tel:1-866-344-7857' class='text-red-500 '>Give us a call</a></p>",
  },
  {
    id: '3',
    title: 'Can I use a credit card to make payments?',
    content:
      "<p>At the moment, we do not accept credit card payments. We support cash, check, ACH, or money order as valid payment methods for all orders.</p><p class='pt-4' >For more info, <a href='tel:1-866-344-7857' class='text-red-500 '>contact us here</a></p>",
  },
  {
    id: '4',
    title: 'Do you accept digital wallet payments?',
    content:
      "<p>(e.g., Zelle, CashApp, Venmo)</p><p class='pt-4'>We do not currently support digital wallets. Please use ACH, check, or bank wire transfer. We are working to expand our payment options—check back periodically for updates.</p><p class='pt-4' >Talk to a rep: <a href='tel:1-866-344-7857' class='text-red-500 '>1-866-344-7857</a></p>",
  },
  {
    id: '5',
    title: 'Where can I get a fitment guide?',
    content:
      "<p><span class='text-red-500'>Click here to download our fitment guide</span>. It’s also available anytime from the main menu. For personalized fitment help, contact one of our specialists.</p><p class='pt-4' >Need help? <a href='tel:1-866-344-7857' class='text-red-500 '>Call us</a></p>",
  },
  {
    id: '6',
    title: 'What finishes are available for steering wheels?',
    content:
      "<p>We offer standard finishes in chrome or brushed metal. Custom requests are welcome—we can match most finishes, especially if coordinating with wheel orders. Be sure to provide the paint code and manufacturer for accuracy.</p><p class='pt-4'>Contact our team for special requests or questions.</p><p class='pt-4' >Reach out at: <a href='tel:1-866-344-7857' class='text-red-500 '>1-866-344-7857</a></p>",
  },
  {
    id: '7',
    title: 'Do custom colors or finishes cost extra?',
    content:
      "<p>Yes, custom finishes may incur additional fees depending on color, detailing, and material types (e.g., gold, flake, etc.). Contact us for a quote based on your customization needs.</p><p class='pt-4' >Let’s talk: <a href='tel:1-866-344-7857' class='text-red-500 '>1-866-344-7857</a></p>",
  },
  {
    id: '8',
    title: 'Can individuals purchase directly from Tirematic?',
    content:
      "<p>Yes! Unlike other brands, Tirematic allows direct purchases from both individuals and businesses. We’re happy to assist you in placing a custom or standard order.</p><p class='font-semibold text-base text-gray-600 pt-4'>Have an automotive shop?</p><p class='pt-4'><span class='text-red-500'>Apply to become an official dealer</span> and join our growing network!</p><p class='pt-4' >Call us: <a href='tel:1-866-344-7857' class='text-red-500 '>1-866-344-7857</a></p>",
  },
  {
    id: '9',
    title: 'Can I get Tirematic displays for my store?',
    content:
      "<p>If you're a registered retailer or dealer, contact our team for options on Tirematic showroom displays.</p><p class='pt-4' >Need displays? <a href='tel:1-866-344-7857' class='text-red-500 '>Talk to us</a></p>",
  },
  {
    id: '10',
    title: 'Can I become the exclusive dealer in my area?',
    content:
      "<p>Yes, we offer exclusive distribution opportunities in select regions. Terms will include minimum purchase agreements, territory rights, and service standards. Contact our team for details.</p><p class='pt-4'>New to Tirematic? <span class='text-red-500'>Apply to be a dealer</span> today!</p><p class='pt-4'>Already with us? Get in touch with your Tirematic rep.</p><p class='pt-4' >Let’s connect: <a href='tel:1-866-344-7857' class='text-red-500 '>1-866-344-7857</a></p>",
  },
  {
    id: '11',
    title: 'Do you deliver to residential addresses?',
    content:
      "<p>Currently, we only deliver to commercial addresses such as verified retail shops or auto businesses due to shipping and freight regulations.</p><p class='pt-4' >Have questions? <a href='tel:1-866-344-7857' class='text-red-500 '>Contact us</a></p>",
  },
  {
    id: '12',
    title: 'How do I become a Tirematic dealer?',
    content:
      "<p><span class='text-red-500'>Apply through our online dealer application</span>. You must operate a legitimate automotive business with a storefront. Join the Tirematic family today!</p><p class='pt-4' >Questions? <a href='tel:1-866-344-7857' class='text-red-500 '>Give us a call</a></p>",
  },
  {
    id: '13',
    title: 'Can I pay extra to expedite my order?',
    content:
      "<p>Yes, we offer rush production for an added fee. Depending on availability and workload, some orders can be completed in as little as 10 days. Additional fees typically range from $1000 to $1500.</p><p class='pt-4' >Want to rush your order? <a href='tel:1-866-344-7857' class='text-red-500 '>Let’s talk</a></p>",
  },
  {
    id: '14',
    title: 'Do you ship internationally?',
    content:
      "<p>Yes, Tirematic ships worldwide. Please note that duties, taxes, and international shipping fees will apply. Orders must be paid in full before shipment.</p><p class='pt-4' >Questions? <a href='tel:1-866-344-7857' class='text-red-500 '>Call our team</a></p>",
  },
  {
    id: '15',
    title: 'Do you ship to PO Boxes?',
    content:
      "<p>No, we do not ship to PO Boxes. We only deliver to verified business addresses that are pre-approved in our system.</p><p class='pt-4' >Need help? <a href='tel:1-866-344-7857' class='text-red-500 '>Contact us</a></p>",
  },
  {
    id: '16',
    title: 'Do you offer a military discount?',
    content:
      "<p>Yes! We offer free shipping for all active duty, veterans, and national guard customers as a token of appreciation for your service. Ask a Tirematic specialist for more info.</p><p class='pt-4'>We appreciate your service—thank you!</p><p class='pt-4' >Speak with us: <a href='tel:1-866-344-7857' class='text-red-500 '>1-866-344-7857</a></p>",
  },
];

const paymentInfoData = [
  {
    id: '1',
    title: 'What payment methods are available?',
    content:
      '<p>At Tirematic, we accept a wide range of payment options including cash, major credit/debit cards (Visa, MasterCard, American Express), mobile payments (bKash, Nagad, Rocket), and online bank transfers. All transactions are processed securely to ensure your data is protected.</p>',
  },
  {
    id: '2',
    title: 'Can I split my payment?',
    content:
      '<p>Yes, we offer flexible payment options for your convenience. You can split your payment between multiple cards or combine mobile payments with cash. For large purchases or service packages, we also offer easy installment plans through selected partners.</p>',
  },
];

const orderReturnData = [
  {
    id: '1',
    title: 'How do I return or exchange an item?',
    content:
      '<p>Returning or exchanging an item at Tirematic reflects our commitment to service and quality. It is a process guided by clarity and ease, allowing customers to resolve issues with confidence and convenience. Just as precision matters in every tire we deliver, so too does the smoothness of your post-purchase experience.</p>',
  },
  {
    id: '2',
    title: 'How do I cancel an order?',
    content:
      '<p>At Tirematic, order cancellation is designed with the same precision as our products. Before your order begins its journey to your doorstep, you hold the power to revise or withdraw it. This balance between flexibility and process integrity is central to our philosophy of customer-first service.</p>',
  },
];

const shipmentDelivery = [
  {
    id: '1',
    title: 'Can you deliver to a residential address?',
    content:
      "<p>Yes, we can deliver to residential addresses. Our shipping partners ensure secure and timely delivery to your doorstep. Please ensure someone is available to receive the package, especially for larger shipments that may require a signature.</p><p class='pt-4'>Call us today! <a href='tel:1-866-344-7857' class='text-red-500'>1-866-344-7857</a></p>",
  },
  {
    id: '2',
    title: 'Do you ship outside of the U.S. / internationally?',
    content:
      "<p>Yes, we offer international shipping to select countries. International shipments may be subject to customs duties, taxes, and additional shipping fees. Please check with your local customs office for potential import charges before placing an order.</p><p class='pt-4'>Call us today! <a href='tel:1-866-344-7857' class='text-red-500'>1-866-344-7857</a></p>",
  },
  {
    id: '3',
    title: 'Do you ship to PO Boxes?',
    content:
      "<p>Unfortunately, we do not ship to PO Boxes at this time. To ensure secure and efficient delivery, we require a physical street address for all shipments. If you need assistance finding an alternative delivery location, please contact our support team.</p><p class='pt-4'>Call us today! <a href='tel:1-866-344-7857' class='text-red-500'>1-866-344-7857</a></p>",
  },
];

const distribution = [
  {
    id: '1',
    title: 'How can I get Tirematic displays for my showroom?',
    content:
      "<p>We offer showroom display packages to authorized dealers and retailers. To request a display, please contact our sales team and provide details about your showroom. Availability is subject to approval and stock levels.</p><p class='pt-4'>Call us today! <a href='tel:1-866-344-7857' class='text-red-500'>1-866-344-7857</a></p>",
  },
  {
    id: '2',
    title: 'Can I be the sole distributor in my area?',
    content:
      "<p>We evaluate distributor requests on a case-by-case basis. Exclusive distribution rights depend on market demand, location, and business capacity. If you're interested in becoming a sole distributor, please reach out to discuss potential partnership opportunities.</p><p class='pt-4'>Call us today! <a href='tel:1-866-344-7857' class='text-red-500'>1-866-344-7857</a></p>",
  },
  {
    id: '3',
    title: 'How do I sell Tirematic Wheels?',
    content:
      "<p>To become an authorized seller of Tirematic Wheels, you must apply for a dealership account. Once approved, you will have access to our exclusive product line, marketing materials, and wholesale pricing. Contact our sales team to start the application process.</p><p class='pt-4'>Call us today! <a href='tel:1-866-344-7857' class='text-red-500'>1-866-344-7857</a></p>",
  },
];

// Main FAQs component
const FAQs: React.FC = () => {
  return (
    <>
      {/* Breadcrumb navigation */}
      <Container>
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/frequently-asked-questions`} isEnd={true}>
                FAQ
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Main FAQ content */}
      <Container>
        <div className="flex flex-col justify-center items-center gap-8 pt-2 sm:pt-4 pb-[72px] sm:pb-[152px]">
          {/* Header  */}
          <div className="w-full flex flex-col gap-4 text-[#210203]">
            <h1 className="text-2xl sm:text-4xl md:text-5xl text-center font-bold">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className="text-center text-base sm:text-xl font-normal">
              Here we have collected the most frequently asked <br /> questions.
              Please read them before contacting support.
            </p>
          </div>

          {/* FAQs */}
          <div className="w-full flex flex-col items-center gap-5">
            <div className="w-full text-xl sm:text-2xl font-bold text-center">
              <p>Wheels</p>
            </div>
            <div className="w-full max-w-[864px] flex flex-col gap-2">
              {faqs.map((faq) => (
                <Accordion
                  key={faq.id}
                  title={faq.title}
                  content={faq.content}
                />
              ))}
            </div>
          </div>

          {/* Order & Return */}
          <div className="w-full flex flex-col items-center gap-5">
            <div className="w-full text-xl sm:text-2xl font-bold text-center">
              <p>Order & Return</p>
            </div>
            <div className="w-full max-w-[864px] flex flex-col gap-2">
              {orderReturnData.map((faq) => (
                <Accordion
                  key={faq.id}
                  title={faq.title}
                  content={faq.content}
                />
              ))}
            </div>
          </div>

          {/* Payment Info */}
          <div className="w-full flex flex-col items-center gap-5">
            <div className="w-full text-xl sm:text-2xl font-bold text-center">
              <p>Payment</p>
            </div>
            <div className="w-full max-w-[864px] flex flex-col gap-2 ">
              {paymentInfoData.map((faq) => (
                <Accordion
                  key={faq.id}
                  title={faq.title}
                  content={faq.content}
                />
              ))}
            </div>
          </div>

          {/* Shipment & delivery */}
          <div className="w-full flex flex-col items-center gap-5">
            <div className="w-full text-xl sm:text-2xl font-bold text-center">
              <p>Shipment & delivery</p>
            </div>
            <div className="w-full max-w-[864px] flex flex-col gap-2 ">
              {shipmentDelivery.map((faq) => (
                <Accordion
                  key={faq.id}
                  title={faq.title}
                  content={faq.content}
                />
              ))}
            </div>
          </div>

          {/* Distribution */}
          <div className="w-full flex flex-col items-center gap-5">
            <div className="w-full text-xl sm:text-2xl font-bold text-center">
              <p>Distribution</p>
            </div>
            <div className="w-full max-w-[864px] flex flex-col gap-2 ">
              {distribution.map((faq) => (
                <Accordion
                  key={faq.id}
                  title={faq.title}
                  content={faq.content}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="w-full flex flex-col items-center gap-3 sm:gap-4 pt-6 sm:pt-10">
            <h1 className="text-xl sm:text-[32px] text-center font-bold text-[#210203]">
              Still Have A Questions?
            </h1>
            <p className="text-center text-sm sm:text-base font-normal text-[#210203]">
              We will be happy to answer any questions you may have.
            </p>
            <div className="text-center w-[166px] h-14 ">
              <Link href="/contact-us">
                <button
                  className={`w-full h-full flex gap-2 items-center bg-primary text-white text-base font-semibold px-6 rounded-lg hover:bg-gray-800`}
                >
                  <FaPhone className="text-lg text-white" />
                  <span>Contact Us</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default FAQs;
