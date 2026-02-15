"use client";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";

import FacebookAuth from "@/components/shared/FacebookAuth";
import GoogleAuth from "@/components/shared/GoogleAuth";
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

const Page = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<
    {
      message: string;
      field: string;
      location: string;
    }[]
  >([]);
  const [success, setSuccess] = useState<{
    isSuccess: boolean;
    message: string;
  }>({
    message: "",
    isSuccess: false,
  });
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);

  const banner = {
    backgroundImage: `url('/images/registerhero.jpeg')`,
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "750px",
  };

  return (
    <div className="px-4 pt-2 md:p-0" style={banner}>
      <div className="w-full md:h-full flex flex-col md:flex-row py-8 px-4 md:p-0 bg-gray-400 bg-opacity-70 rounded-md md:bg-transparent">
        <div className="w-full md:w-[60%] text-white md:pt-2">
          <h1 className="text-6xl text-center uppercase md:block hidden">
            Get Access
          </h1>
          <h1 className="text-2xl text-center uppercase md:hidden block">
            Welcome Back
          </h1>
          <div className="w-full h-2 bg-primary"></div>
        </div>
        <div className="md:bg-gray-400 md:bg-opacity-90 w-full md:w-[40%] flex justify-center items-center">
          <div className="w-full shadow-[0_1px_3px_0_rgba(0,0,0,0.09)] pt-2 md:px-12 md:py-20">
            <h2 className="text-2xl font-bold pb-4 border-b border-gray-200 text-white uppercase">
              Register
            </h2>

            {errors.length > 0 &&
              errors.map((error) => (
                <Alert
                  variant="destructive"
                  key={error.message}
                  className="mt-4"
                >
                  <AlertDescription>{error.message}</AlertDescription>
                </Alert>
              ))}
            {success.isSuccess && (
              <Alert className="mt-4">
                <AlertDescription>{success.message}</AlertDescription>
              </Alert>
            )}

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                setIsLoadingRegister(true);
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
                        message:
                          "Please check your email to verify your account",
                      });
                      setErrors([]);
                      // dispatch(setAccessToken({ accessToken: data.accessToken }));
                      // dispatch(setRefreshToken({ refreshToken: data.refreshToken }));
                      // dispatch(setUserDetails({ userDetails: data.user }));
                    } else if (errors) {
                      setErrors(errors);
                      setSuccess({ isSuccess: false, message: "" });
                    }
                  })
                  .finally(() => {
                    window.scrollTo(0, 0);
                    setIsLoadingRegister(false);
                  });
              }}
            >
              {({ errors: formErrors, touched }) => (
                <Form className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block font-semibold mb-1 text-white"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <Field name="firstName">
                        {({ field }: any) => (
                          <Input
                            {...field}
                            className={`bg-white ${formErrors.firstName && touched.firstName
                              ? "border-red-500"
                              : ""
                              }`}
                          />
                        )}
                      </Field>
                      {formErrors.firstName && touched.firstName && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="block font-semibold mb-1 text-white"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <Field name="lastName">
                        {({ field }: any) => (
                          <Input
                            {...field}
                            className={`bg-white ${formErrors.lastName && touched.lastName
                              ? "border-red-500"
                              : ""
                              }`}
                          />
                        )}
                      </Field>
                      {formErrors.lastName && touched.lastName && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      className="block font-semibold mb-1 text-white"
                      htmlFor="email"
                    >
                      Email address
                    </label>
                    <Field name="email">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          type="email"
                          className={`bg-white ${formErrors.email && touched.email
                            ? "border-red-500"
                            : ""
                            }`}
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
                      className="block font-semibold mb-1 text-white "
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <Field name="password">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          type="password"
                          className={`bg-white ${formErrors.password && touched.password
                            ? "border-red-500"
                            : ""
                            }`}
                        />
                      )}
                    </Field>
                    {formErrors.password && touched.password && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.password}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full uppercase bg-primary"
                    disabled={isLoadingRegister}
                  >
                    {isLoadingRegister ? "Please wait..." : "Create Account"}
                  </Button>
                </Form>
              )}
            </Formik>
            <div className="flex flex-col">
              <p className="text-center flex text-white gap-2 justify-center items-center mt-5">
                <hr className="border-t w-20" />
                Or <hr className="border-t w-20" />
              </p>

              <div className="flex flex-col items-center justify-center">
                <GoogleAuth />
                <FacebookAuth />
              </div>
            </div>
            <div className="flex my-4 justify-end items-center gap-1">
              <div className="w-full">
                <hr className="border-t border-gray-200" />
              </div>
              <p className="text-sm text-nowrap text-white">
                <Link href="/login" className=" hover:underline">
                  Already have an account?
                </Link>
              </p>
              <div className="w-full">
                <hr className="border-t border-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
