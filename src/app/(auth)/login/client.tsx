"use client";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  setAccessToken,
  setRefreshToken,
  setUserDetails,
} from "@/redux/features/userSlice";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { userLogin } from "./login";
import GoogleAuth from "@/components/shared/GoogleAuth";
import FacebookAuth from "@/components/shared/FacebookAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState<{ name: string; message: string }[]>([]);
  const [success, setSuccess] = useState<{ isSuccess: boolean; message: string }>({
    message: "",
    isSuccess: false,
  });

  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    if (user) router.push("/dashboard/orders");
  }, [user, router]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80 animate-fade-in"
        style={{ backgroundImage: "url('/images/loginhero.jpeg')" }}
      ></div>

      {/* Transparent Gray Overlay */}
      <div className="absolute inset-0 bg-gray-900/50"></div>

      {/* Login Container */}
      <div className="relative z-10 my-3 w-full max-w-4xl mx-4 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row bg-white/10 backdrop-blur-lg border border-white/20">
        
        {/* Left Hero Section */}
        <div className="hidden md:flex md:w-2/3 mb-70 flex-col justify-center p-12 text-white">
          <h1 className="text-5xl font-extrabold uppercase mb-4 animate-slide-up">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-200 animate-slide-up animate-delay-200">
            Access your dashboard and manage your orders seamlessly.
          </p>
          <div className="mt-6 w-24 h-1 bg-primary rounded"></div>
        </div>

        {/* Right Login Form */}
        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col items-center justify-center bg-gray-800/40 backdrop-blur-lg animate-slide-up rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/30 w-full pb-3 uppercase">
            Login
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
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setIsSubmitting(true);
              userLogin({ email: values.email, password: values.password })
                .then((data) => {
                  if (Array.isArray(data)) return setErrors(data);
                  setErrors([]);
                  setSuccess({ isSuccess: true, message: "Login successful" });
                  dispatch(setAccessToken({ accessToken: data.token.accessToken }));
                  dispatch(setRefreshToken({ refreshToken: data.token.refreshToken }));
                  dispatch(setUserDetails({ userDetails: data.user }));
                  router.push("/dashboard");
                })
                .finally(() => setIsSubmitting(false));
            }}
          >
            {({ errors: formErrors, touched }) => (
              <Form className="w-full space-y-4">
                <div>
                  <label className="block mb-1 font-semibold text-white">Email</label>
                  <Field name="email">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="email"
                        placeholder="you@example.com"
                        className={`w-full text-gray-300 ${formErrors.email && touched.email ? "border-red-500" : ""}`}
                      />
                    )}
                  </Field>
                  {formErrors.email && touched.email && (
                    <p className="mt-1 text-sm text-primary">{formErrors.email}</p>
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
                        className={`w-full text-gray-300 ${formErrors.password && touched.password ? "border-red-500" : ""}`}
                      />
                    )}
                  </Field>
                  {formErrors.password && touched.password && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
                  )}
                </div>

                <div className="text-end">
                  <Link href="/forgot-password" className="text-sm text-white hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark transition-colors duration-300 uppercase"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
              </Form>
            )}
          </Formik>

          {/* Social Login */}
          <div className="w-full mt-6 flex flex-col items-center">
            <p className="text-white mb-3">Or continue with</p>
            <div className="flex flex-col w-full">
              <GoogleAuth />
              <FacebookAuth />
            </div>
          </div>

          {/* Register Link */}
          <p className="mt-6 text-white text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline font-semibold">
              Sign Up
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

export default LoginPage;