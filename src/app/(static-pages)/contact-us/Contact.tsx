'use client';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { IoMdMail } from 'react-icons/io';
import Container from '@/components/ui/container/container';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ContactForm from './_components/ContactForm/ContactForm';
import ContactHero from './_components/ContactHero/ContactHero';

// Static data for contact information
const ContactData = [
  {
    id: '1',
    title: 'Working hours',
    content: 'Mon–Sat: 9 AM – 6 PM EST',
    Icon: null,
  },
  {
    id: '2',
    title: 'For General Inquiries',
    Icon: IoMdMail,
    content: 'support@tirematic.com',
    content1: '866-344-7857',
    Icon1: BsFillTelephoneFill,
  },
  {
    id: '3',
    title: 'For Claims/Warranty Department',
    content: 'warranty@tirematic.com',
    Icon: IoMdMail,
  },
  {
    id: '4',
    title: 'For Wholesale/Dealer Inquiries',
    content: 'sales@tirematic.com',
    Icon: IoMdMail,
  },
  {
    id: '5',
    title: 'For Sponsorship Proposals',
    content: 'sponsorships@tirematic.com',
    Icon: IoMdMail,
  },
];

// Main Contact component
const Contact: React.FC = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/contact-us`} isEnd={true}>
                Contact-us
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section */}
      <ContactHero />
      {/* Main content */}
      <Container>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8 pt-6  md:pt-[70px] pb-[72] md:pb-[152px] font-figtree">
          {/* content */}

          <div className="w-full md:max-w-[528px] md:hidden flex flex-col gap-2">
            <Accordion className="space-y-2" type="single">
              {ContactData.map((data) => (
                <AccordionItem
                  className="bg-[#F7F7F7] rounded-xl"
                  value={data.id}
                  key={data.id}
                >
                  <AccordionTrigger className="text-base font-semibold px-6">
                    {' '}
                    {data.title}{' '}
                  </AccordionTrigger>
                  <AccordionContent className="border-t border-[#CFCFCF]">
                    <div className="flex items-center gap-2 pt-3 px-6">
                      {data.Icon && <data.Icon />}
                      <span className="text-base font-normal">
                        {data.content}
                      </span>
                    </div>
                    {data.content1 && (
                      <div className="flex items-center gap-2 pt-3 px-6">
                        {data.Icon1 && <data.Icon1 />}
                        <span className="text-base font-normal">
                          {data.content1}
                        </span>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact information (desktop view) */}
          <div className="hidden md:flex flex-col gap-2 w-full md:max-w-[528px] order-1 md:order-2">
            <div className="bg-[#F7F7F7] py-5 rounded-lg w-full text-[#210203] flex flex-col gap-4">
              <h2 className="font-semibold text-lg pb-4 px-10 border-b border-[#CFCFCF] text-start ">
                Working hours
              </h2>
              <div className="flex px-10 gap-8">
                <span className="text-base font-normal">Mon–Sat</span>
                <span className="text-base font-semibold">9 AM – 6 PM EST</span>
              </div>
            </div>

            <div className="bg-[#F7F7F7] py-5 rounded-lg w-full text-[#210203] flex flex-col gap-4">
              <h2 className="font-semibold text-lg pb-4 px-10 border-b border-[#CFCFCF] text-start ">
                For General Inquiries:
              </h2>
              <div className="flex flex-col px-10 gap-4">
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:support@tirematic.com"
                    className="flex items-center gap-2"
                  >
                    <IoMdMail className="text-xl" />
                    <p>support@tirematic.com</p>
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:866-344-7857"
                    className="flex items-center gap-2"
                  >
                    <BsFillTelephoneFill className="text-xl" />
                    <p>866-344-7857</p>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#F7F7F7] py-5 rounded-lg w-full text-[#210203] flex flex-col gap-4">
              <h2 className="font-semibold text-lg pb-4 px-10 border-b border-[#CFCFCF] text-start ">
                For Claims/Warranty Department:
              </h2>
              <div className="flex flex-col px-10 gap-4">
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:warranty@tirematic.com"
                    className="flex items-center gap-2"
                  >
                    <IoMdMail className="text-xl" />
                    <p>warranty@tirematic.com</p>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#F7F7F7] py-5 rounded-lg w-full text-[#210203] flex flex-col gap-4">
              <h2 className="font-semibold text-lg pb-4 px-10 border-b border-[#CFCFCF] text-start ">
                For Wholesale/Dealer Inquiries:
              </h2>
              <div className="flex flex-col px-10 gap-4">
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:sales@tirematic.com"
                    className="flex items-center gap-2"
                  >
                    <IoMdMail className="text-xl" />
                    <p>sales@tirematic.com</p>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#F7F7F7] py-5 rounded-lg w-full text-[#210203] flex flex-col gap-4">
              <h2 className="font-semibold text-lg pb-4 px-10 border-b border-[#CFCFCF] text-start ">
                For Sponsorship Proposals:
              </h2>
              <div className="flex flex-col px-10 gap-4">
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:sponsorships@tirematic.com "
                    className="flex items-center gap-2"
                  >
                    <IoMdMail className="text-xl" />
                    <p>sponsorships@tirematic.com</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}

          <ContactForm />
        </div>
      </Container>
    </>
  );
};

export default Contact;

// We're Here to Help – Get in Touch Today
