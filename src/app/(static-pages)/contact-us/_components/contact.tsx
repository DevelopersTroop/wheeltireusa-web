'use client';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaPaperPlane } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import * as Yup from 'yup';
import ContactHero from './contact-hero';
import { FaCheckCircle } from 'react-icons/fa';
import Container from '@/components/ui/container/container';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { apiBaseUrl } from '@/utils/api';

// Validation schema for the contact form
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
});

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
  const [isLoadingContact, setIsLoadingContact] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Effect to handle success messages
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      toast('Success', {
        description: message,
      });
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Effect to handle error messages
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      toast('Error', {
        description: error || 'Something went wrong',
      });
      return () => clearTimeout(timer);
    }
  }, [error]);

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
                    href="mailto:warranty@amaniforged.com"
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
                    href="mailto:sales@amaniforged.com"
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
                    href="mailto:sponsorships@amaniforged.com "
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

          {!isSubmitted ? (
            <div className="w-full md:max-w-[528px] order-2 md:order-1">
              <div
                data-aos="fade-right"
                data-aos-duration="600"
                className="w-full mb-8"
              >
                <h1 className="text-[40px] font-bold text-center md:text-left text-[#210203]">
                  Contact Us
                </h1>
              </div>

              <div
                data-aos="fade-right"
                className="w-full mx-auto bg-white rounded-lg"
              >
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { resetForm }) => {
                    setIsLoadingContact(true);
                    fetch(`${apiBaseUrl}/contacts`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        name: values.name,
                        email: values.email,
                        subject: values.subject,
                        message: values.message,
                      }),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.statusCode && data.statusCode === 201) {
                          setMessage(data.message);
                          setIsSubmitted(true);
                          setName(values.name);
                          resetForm();
                        } else if (data.errors && data.errors.length > 0) {
                          setError(data.errors[0].message);
                        }
                      })
                      .finally(() => {
                        setIsLoadingContact(false);
                      });
                  }}
                >
                  {({ errors: formErrors, touched }) => (
                    <Form className="space-y-8">
                      <div>
                        <label
                          className="block font-normal text-lg  mb-3"
                          htmlFor="firstName"
                        >
                          Name<span className="text-red-500">*</span>
                        </label>
                        <Field name="name">
                          {({ field }: any) => (
                            <Input
                              {...field}
                              // placeholder="John Smith"
                              className={
                                formErrors.name && touched.name
                                  ? 'border-red-500 py-[13px]'
                                  : 'py-[13px] text-lg font-normal'
                              }
                            />
                          )}
                        </Field>
                        {formErrors.name && touched.name && (
                          <p className="mt-1 text-sm text-red-500">
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block font-normal text-lg  mb-3"
                          htmlFor="email"
                        >
                          Email address<span className="text-red-500">*</span>
                        </label>
                        <Field name="email">
                          {({ field }: any) => (
                            <Input
                              {...field}
                              type="email"
                              // placeholder="johnsmith@gmail.com"
                              className={
                                formErrors.email && touched.email
                                  ? 'border-red-500 py-[13px]'
                                  : 'py-[13px] text-lg font-normal'
                              }
                            />
                          )}
                        </Field>
                        {formErrors.email && touched.email && (
                          <p className="mt-1 text-sm text-red-500">
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block font-normal text-lg  mb-3"
                          htmlFor="subject"
                        >
                          Subject<span className="text-red-500">*</span>
                        </label>
                        <Field name="subject">
                          {({ field }: any) => (
                            <Input
                              {...field}
                              placeholder="Subject"
                              className={
                                formErrors.subject && touched.subject
                                  ? 'border-red-500 py-[15px]'
                                  : ' py-[15px]'
                              }
                            />
                          )}
                        </Field>
                        {formErrors.subject && touched.subject && (
                          <p className="mt-1 text-sm text-red-500">
                            {formErrors.subject}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block font-normal text-lg  mb-3"
                          htmlFor="message"
                        >
                          Message
                        </label>
                        <Field name="message">
                          {({ field }: any) => (
                            <textarea
                              type="textarea"
                              placeholder="Write your message..."
                              {...field}
                              className="w-full h-44 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            />
                          )}
                        </Field>
                      </div>
                      {/* Submit button */}
                      <div className="w-full flex justify-start">
                        <button
                          type="submit"
                          className="w-full md:max-w-96 py-3 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2"
                          disabled={isLoadingContact}
                        >
                          <FaPaperPlane className="text-lg text-white" />
                          {isLoadingContact ? 'Please wait...' : 'Send message'}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          ) : (
            <div className="w-full text-center md:max-w-[528px] order-1">
              {/*  Success message after form submission */}
              <h2 className="text-4xl pb-4 font-semibold text-[#210203]">
                Thank you {name}!
              </h2>
              <p className="w-full text-base text-[#210203]">
                We have received your message and will get back to you soon.
              </p>
              <p className="flex justify-center pt-8">
                {' '}
                <FaCheckCircle className="text-green-500 text-6xl" />{' '}
              </p>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Contact;

// We're Here to Help – Get in Touch Today
