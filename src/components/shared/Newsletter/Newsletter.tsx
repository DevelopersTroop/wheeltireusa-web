"use client";
import {
  closeNewsletterModal,
  openNewsletterModal,
  setIsNewsLetterSubmitted,
} from "@/redux/features/newsletterModalSlice";
import { RootState, useTypedSelector } from "@/redux/store";
import { triggerEvent } from "@/utils/analytics";
import { apiBaseUrl } from "@/utils/api";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Newsletter = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const isOpen = useSelector(
    (state: RootState) => state.persisted.newsletterModal.isOpen
  );
  const isNewsLetterSubmitted = useTypedSelector(
    (state) => state.persisted.newsletterModal.isSubmitted
  );
  const newsLetterModalClosingTimeStamp = useTypedSelector(
    (state) => state.persisted.newsletterModal.closingTimeStamp
  );

  useEffect(() => {
    let showModal = true;
    const calculateHourDiff = (closingTime: number) => {
      const currentTimeStamp = Date.now();
      const diffMs = currentTimeStamp - closingTime; // difference in milliseconds
      return diffMs / (1000 * 60 * 60);
    };

    const timeGap = 24 * 3;
    if (
      !isNewsLetterSubmitted &&
      (newsLetterModalClosingTimeStamp === 0 ||
        (newsLetterModalClosingTimeStamp !== 0 &&
          calculateHourDiff(newsLetterModalClosingTimeStamp) > timeGap))
    )
      dispatch(openNewsletterModal());
  }, []);

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={() => dispatch(closeNewsletterModal())}
      >
        <DialogContent
          closeIconStyle="h-6 w-6 !text-white md:mr-0 md:mt-0 mt-5 mr-5"
          className="max-w-3xl !rounded-none bg-transparent border-none md:p-0 p-6 bg-black"
        >
          <DialogTitle className="sr-only">Newsletter Subscription</DialogTitle>
          <div className="flex flex-col md:flex-row  ">
            {/* Left section: Static image */}
            {/* <div className="w-full  h-[40dvh] md:h-[550px] relative">
              <Image
                alt="Newsletter"
                className="object-cover"
                src="/images/newsletter.png"
                fill
                priority
                fetchPriority="high"
                quality={80}
              />
            </div> */}

            {/* Right section: Converted background to real <Image /> */}
            <div className="relative w-full  md:max-w-[368px] flex flex-col justify-center items-center gap-y-4 px-10 pt-[10rem] pb-[10rem] h-[22vh] md:h-[550px] overflow-hidden">
              {/* Background image */}
              {/* <Image
                src="/images/newsletter-form.png"
                alt="Newsletter Banner"
                fill
                fetchPriority="high"
                quality={80}
                className="object-cover brightness-75 contrast-125 -z-10 relative"
              /> */}

              <div className="relative z-10 ">
                {isSuccess ? (
                  <div className="text-center">
                    <div className="leading-[1.3] text-4xl font-extrabold text-gray-400 uppercase">
                      Thank you!
                    </div>
                    <div className="flex justify-center items-center mt-4">
                      <p
                        onClick={() => {
                          if (couponCode)
                            window.navigator.clipboard.writeText(couponCode);
                        }}
                        className="text-center text-gray-400 font-semibold text-base tracking-wide cursor-pointer"
                      >
                        Use code{" "}
                        <span className="text-base font-bold text-primary">
                          {couponCode}
                        </span>{" "}
                        for 5% off your order.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-center leading-[1.3] text-2xl md:text-[27px] font-extrabold text-gray-300 uppercase">
                      Unlock Exclusive Savings!
                    </div>
                    <div className="text-center text-gray-200 font-semibold text-base tracking-wide py-2.5">
                      Sign up now and enjoy a 5% discount on your first Amani
                      Forged order.
                    </div>
                    <div>
                      <Formik
                        initialValues={{ email: "" }}
                        onSubmit={(values, { setFieldError }) => {
                          setIsSubmitting(true);
                          fetch(`${apiBaseUrl}/subscriptions`, {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ email: values.email }),
                          })
                            .then((res) => res.json())
                            .then((data) => {
                              if (data.statusCode && data.statusCode === 201) {
                                setCouponCode(data.data.coupon.code);
                                triggerEvent(
                                  "coupon_retrived_using_newsletter",
                                  {
                                    coupon_code: data.data.coupon.code,
                                  }
                                );
                                setIsSuccess(true);
                                dispatch(setIsNewsLetterSubmitted(true));
                              } else if (data.errors?.length > 0) {
                                setFieldError("email", data.errors[0].message);
                              }
                            })
                            .finally(() => setIsSubmitting(false));
                        }}
                      >
                        {({ errors }) => (
                          <Form>
                            {errors.email && (
                              <div className="text-red-500 mb-2">
                                {errors.email}
                              </div>
                            )}
                            <Field
                              className="border focus:outline-none border-btext p-3 w-full"
                              type="email"
                              name="email"
                              placeholder="E-mail Address"
                            />
                            <button
                              type="submit"
                              className="py-2 md:py-3.5 border border-primary px-8 bg-primary rounded-xl text-white font-semibold transition duration-300 ease-in-out mt-4 w-full uppercase hover:bg-white hover:border-black hover:text-black"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Please wait..." : "sign-up"}
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Newsletter;
