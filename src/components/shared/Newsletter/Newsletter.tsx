"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { setTrackingEmail, setTrackingPhone } from "@/lib/tracker";
import {
  closeNewsletterModal,
  openNewsletterModal,
  setIsNewsLetterSubmitted,
} from "@/redux/features/newsletterModalSlice";
import { RootState, useTypedSelector } from "@/redux/store";
import { triggerEvent } from "@/utils/analytics";
import { apiBaseUrl } from "@/utils/api";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Newsletter = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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
    const calculateHourDiff = (closingTime: number) => {
      const diffMs = Date.now() - closingTime;
      return diffMs / (1000 * 60 * 60);
    };

    const timeGap = 24 * 3;
    if (
      !isNewsLetterSubmitted &&
      (newsLetterModalClosingTimeStamp === 0 ||
        calculateHourDiff(newsLetterModalClosingTimeStamp) > timeGap)
    ) {
      dispatch(openNewsletterModal());
    }
  }, []);

  const handleCopy = () => {
    if (couponCode) {
      navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(closeNewsletterModal())}>
      <DialogContent className="max-w-[560px] p-0 rounded-2xl overflow-hidden border border-border fixed left-4 right-4 top-1/2 -translate-y-1/2 translate-x-0 w-auto mx-auto">
        <DialogTitle className="sr-only">Newsletter Subscription</DialogTitle>

        {/* Header — brand-colored banner */}
        <div
          className="px-8 pt-8 pb-6 relative"
          style={{ backgroundColor: "#EF4F19" }}
        >
          {/* Subtle decorative ring */}
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 pointer-events-none"
            style={{ backgroundColor: "#fff" }}
          />
          <div
            className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10 pointer-events-none"
            style={{ backgroundColor: "#fff" }}
          />

          <span
            className="inline-block text-[11px] font-medium tracking-wide px-3 py-1 rounded-full mb-3 border"
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              borderColor: "rgba(255,255,255,0.3)",
              color: "#fff",
            }}
          >
            Limited time offer
          </span>
          <h2 className="text-[22px] font-semibold text-white leading-snug mb-1.5">
            Get $50 off your first order
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
            Join our newsletter and receive an exclusive discount code instantly
            in your inbox.
          </p>
        </div>

        {/* Body */}
        <div className="px-8 pt-6 pb-8 bg-white">
          {!isSuccess ? (
            <>
              {/* Perks */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-5">
                {["New products first", "Exclusive deals", "No spam, ever"].map(
                  (perk) => (
                    <div
                      key={perk}
                      className="flex items-center gap-1.5 text-sm text-gray-500"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full inline-block"
                        style={{ backgroundColor: "#EF4F19" }}
                      />
                      {perk}
                    </div>
                  )
                )}
              </div>

              {/* Form */}
              <Formik
                initialValues={{ email: "" }}
                onSubmit={(values, { setFieldError }) => {
                  setIsSubmitting(true);
                  setTrackingEmail(values.email)
                  fetch(`${apiBaseUrl}/subscriptions`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: values.email }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.statusCode === 201) {
                        setCouponCode(data.data.coupon.code);
                        triggerEvent("coupon_retrived_using_newsletter", {
                          coupon_code: data.data.coupon.code,
                        });
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
                      <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg mb-3">
                        {errors.email}
                      </div>
                    )}
                    <div className="flex gap-2 sm: flex-col">
                      <Field
                        className="flex-1 text-sm px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400"
                        style={{ "--tw-ring-color": "#EF4F19" } as React.CSSProperties}
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2.5 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap disabled:opacity-60"
                        style={{ backgroundColor: "#EF4F19" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#d94315")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "#EF4F19")
                        }
                      >
                        {isSubmitting ? "Please wait…" : "Claim discount"}
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                      By signing up you agree to our privacy policy. Unsubscribe
                      anytime.
                    </p>
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            /* Success state */
            <div className="text-center py-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-semibold"
                style={{ backgroundColor: "#FEE9E3", color: "#EF4F19" }}
              >
                ✓
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1.5">
                You&apos;re in!
              </h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Here&apos;s your exclusive discount code. Tap to copy it.
              </p>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-3 bg-gray-50 rounded-xl px-6 py-3.5 transition-colors cursor-pointer border-2 border-dashed"
                style={{
                  borderColor: copied ? "#EF4F19" : "#e5e7eb",
                  backgroundColor: copied ? "#FEE9E3" : "#f9fafb",
                }}
              >
                <span
                  className="font-mono text-xl font-semibold tracking-widest"
                  style={{ color: "#EF4F19" }}
                >
                  {couponCode}
                </span>
                <span className="text-xs text-gray-400 font-sans font-normal">
                  {copied ? "copied!" : "tap to copy"}
                </span>
              </button>
              <p className="text-xs text-gray-400 mt-5">
                Check your inbox for a confirmation email too.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Newsletter;