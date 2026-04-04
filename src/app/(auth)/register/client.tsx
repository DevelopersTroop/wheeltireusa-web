"use client";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";

import FacebookAuth from "@/components/shared/FacebookAuth/FacebookAuth";
import GoogleAuth from "@/components/shared/GoogleAuth/GoogleAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { userRegister } from "./register";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<
    { message: string; field: string; location: string }[]
  >([]);
  const [success, setSuccess] = useState<{ isSuccess: boolean; message: string }>({
    message: "",
    isSuccess: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Hero */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80 animate-fade-in"
        style={{ backgroundImage: "url('/images/registerhero.jpeg')" }}
      ></div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900/50"></div>

      {/* Register Container */}
      <div className="relative z-10 my-3 w-full max-w-4xl mx-4 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row bg-white/10 backdrop-blur-lg border border-white/20">
        
        {/* Left Hero Section */}
        <div className="hidden md:flex md:w-2/3 mb-70 flex-col justify-center p-12 text-white">
          <h1 className="text-5xl font-extrabold uppercase mb-4 animate-slide-up">
            Join Us Today
          </h1>
          <p className="text-lg text-gray-200 animate-slide-up animate-delay-200">
            Create your account and manage your orders seamlessly.
          </p>
          <div className="mt-6 w-24 h-1 bg-primary rounded"></div>
        </div>

        {/* Right Register Form */}
        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col items-center justify-center bg-gray-800/40 backdrop-blur-lg animate-slide-up rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/30 w-full pb-3 uppercase">
            Register
          </h2>

          {/* Error & Success Alerts */}
          {errors.length > 0 &&
            errors.map((error) => (
              <Alert variant="destructive" key={error.message} className="mb-3 w-full">
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            ))}
          {success.isSuccess && (
            <Alert className="mb-3 w-full">
              <AlertDescription>{success.message}</AlertDescription>
            </Alert>
          )}

          {/* Formik Form */}
          <Formik
            initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setIsSubmitting(true);
              userRegister({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                role: "customer",
              })
                .then((response) => {
                  const { statusCode, data, errors } = response;
                  if (data && statusCode === 201) {
                    setSuccess({
                      isSuccess: true,
                      message: "Please check your email to verify your account",
                    });
                    setErrors([]);
                  } else if (errors) {
                    setErrors(errors);
                    setSuccess({ isSuccess: false, message: "" });
                  }
                })
                .finally(() => {
                  window.scrollTo(0, 0);
                  setIsSubmitting(false);
                });
            }}
          >
            {({ errors: formErrors, touched }) => (
              <Form className="w-full space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-semibold text-white">First Name</label>
                    <Field name="firstName">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          placeholder="First Name"
                          className={`w-full text-gray-300 placeholder:text-gray-400 ${formErrors.firstName && touched.firstName ? "border-red-500" : ""}`}
                        />
                      )}
                    </Field>
                    {formErrors.firstName && touched.firstName && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold text-white">Last Name</label>
                    <Field name="lastName">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          placeholder="Last Name"
                          className={`w-full text-gray-300 placeholder:text-gray-400 ${formErrors.lastName && touched.lastName ? "border-red-500" : ""}`}
                        />
                      )}
                    </Field>
                    {formErrors.lastName && touched.lastName && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-white">Email</label>
                  <Field name="email">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="email"
                        placeholder="you@example.com"
                        className={`w-full text-gray-300 placeholder:text-gray-400 ${formErrors.email && touched.email ? "border-red-500" : ""}`}
                      />
                    )}
                  </Field>
                  {formErrors.email && touched.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-white">Password</label>
                  <Field name="password">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className={`w-full text-gray-300 placeholder:text-gray-400 ${formErrors.password && touched.password ? "border-red-500" : ""}`}
                      />
                    )}
                  </Field>
                  {formErrors.password && touched.password && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark transition-colors duration-300 uppercase"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Please wait..." : "Create Account"}
                </Button>
              </Form>
            )}
          </Formik>

          {/* Social Login */}
          <div className="w-full mt-6 flex flex-col items-center">
            <p className="text-white mb-3">Or continue with</p>
            <div className="flex flex-col w-full gap-2">
              <GoogleAuth role="customer" />
              <FacebookAuth role="customer" />
            </div>
          </div>

          {/* Login Link */}
          <p className="mt-6 text-white text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline font-semibold">
              Login
            </Link>
          </p>

          {/* Logo */}
          <img className="w-28 mt-6" src="/images/logo.png" alt="logo" />
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-in-out;
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        .animate-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;