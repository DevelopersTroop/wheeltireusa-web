"use client";
import { apiBaseUrl } from "@/utils/api";
import { TextInput } from "@/components/ui/textinput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "@/components/ui/alert";

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

  const banner = {
    backgroundImage: `url('/images/forgothero.jpeg')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "750px",
  };

  return (
    <div className="px-4 pt-2 md:p-0" style={banner}>
      <div className="w-full md:h-full flex flex-col md:flex-row py-8 px-4 md:p-0 bg-gray-400 bg-opacity-70 rounded-md md:bg-transparent">
        <div className="w-full md:w-[60%] text-white md:pt-2">
          <h1 className="text-2xl md:text-6xl text-center uppercase">
            Forgot Password
          </h1>
          <div className="w-full h-2 bg-primary"></div>
        </div>
        <div className="md:bg-gray-400 md:bg-opacity-90 w-full md:w-[40%] flex justify-center items-center">
          <div className="w-full shadow-[0_1px_3px_0_rgba(0,0,0,0.09)] pt-2 md:px-12 md:py-20">
            <div className="text-center text-gray-200 py-5">
              <p>
                Don't worry, it happens to the best of us. We'll get you rolling
                on all 4 here shortly.
              </p>
            </div>

            {status.error.length ? (
              <Alert variant={"destructive"}>{status.error}</Alert>
            ) : (
              ""
            )}
            {status.success.length ? (
              <Alert variant={"default"}>{status.success}</Alert>
            ) : (
              ""
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submit)}
                className="space-y-3 pt-2"
              >
                <TextInput
                  control={form.control}
                  label="Email address"
                  required
                  name={"email"}
                  type={"email"}
                  className="bg-white"
                  labelClassName="!text-white"
                />
                <Button
                  disabled={isSubmitting}
                  className="w-full text-lg font-semibold"
                >
                  Send Reset Email
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
