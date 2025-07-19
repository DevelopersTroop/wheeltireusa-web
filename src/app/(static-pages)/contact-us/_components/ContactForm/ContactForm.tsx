'use client';

import { Formik, Form, Field } from 'formik';
import { Input } from '@/components/ui/input';
import { FaCheckCircle, FaPaperPlane } from 'react-icons/fa';
import { useContact } from './useContact';
import { contactValidationSchema } from './contactSchema';

const ContactForm = () => {
  const { isLoading, isSubmitted, name, submitContact } = useContact();

  if (isSubmitted)
    return (
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
    );

  return (
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

      <div data-aos="fade-right" className="w-full mx-auto bg-white rounded-lg">
        <Formik
          initialValues={{
            name: '',
            email: '',
            subject: '',
            message: '',
          }}
          validationSchema={contactValidationSchema}
          onSubmit={(values, { resetForm }) => submitContact(values, resetForm)}
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
                  <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
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
                  disabled={isLoading}
                >
                  <FaPaperPlane className="text-lg text-white" />
                  {isLoading ? 'Please wait...' : 'Send message'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;
