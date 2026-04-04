"use client";
import { apiBaseUrl } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status, setStatus] = useState({
    error: "",
    success: "",
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const submit = async ({ email }: any) => {
    setIsSubmitting(true);

    const response = await fetch(`${apiBaseUrl}/auth/forgot-password`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setStatus({
        error: response.statusText,
        success: "",
      });
      setIsSubmitting(false);
      return;
    }

    setStatus({
      error: "",
      success: "Password reset link sent to your email",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80 animate-fade-in"
        style={{ backgroundImage: "url('/images/loginhero.jpeg')" }}
      ></div>

      {/* Transparent Gray Overlay */}
      <div className="absolute inset-0 bg-gray-900/50"></div>

      {/* Forgot Password Container */}
      <div className="relative z-10 my-3 w-full max-w-4xl mx-4 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row bg-white/10 backdrop-blur-lg border border-white/20">
        {/* Left Hero Section */}
        <div className="hidden md:flex md:w-2/3 flex-col justify-center p-12 text-white">
          <h1 className="text-5xl font-extrabold uppercase mb-4 animate-slide-up">
            Forgot Password
          </h1>
          <p className="text-lg text-gray-200 animate-slide-up animate-delay-200">
            Don&apos;t worry, it happens to the best of us. We&apos;ll get you
            rolling on all 4 here shortly.
          </p>
          <div className="mt-6 w-24 h-1 bg-primary rounded"></div>
        </div>

        {/* Right Forgot Password Form */}
        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col items-center justify-center bg-gray-800/40 backdrop-blur-lg animate-slide-up rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/30 w-full pb-3 uppercase">
            Reset Password
          </h2>

          {/* Error & Success Alerts */}
          {status.error.length > 0 && (
            <Alert variant="destructive" className="mb-3 w-full">
              <AlertDescription>{status.error}</AlertDescription>
            </Alert>
          )}
          {status.success.length > 0 && (
            <Alert className="mb-3 w-full">
              <AlertDescription>{status.success}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form
            onSubmit={form.handleSubmit(submit)}
            className="w-full space-y-4"
          >
            <div>
              <label className="block mb-1 font-semibold text-white">
                Email Address
              </label>
              <Input
                {...form.register("email", { required: true })}
                type="email"
                placeholder="you@example.com"
                className="w-full text-gray-300 placeholder:text-gray-400"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-dark transition-colors duration-300 uppercase"
            >
              {isSubmitting ? "Sending..." : "Send Reset Email"}
            </Button>
          </form>

          {/* Back to Login Link */}
          <p className="mt-6 text-white text-sm">
            Remember your password?{" "}
            <Link href="/login" className="underline font-semibold">
              Sign In
            </Link>
          </p>

          {/* Logo */}
          <img className="w-28 mt-6" src="/images/logo.png" alt="logo" />
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-in-out;
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

export default Page;
