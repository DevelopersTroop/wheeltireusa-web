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

  const [errors, setErrors] = useState<
    {
      name: string;
      message: string;
    }[]
  >([]);
  const [success, setSuccess] = useState<{
    isSuccess: boolean;
    message: string;
  }>({
    message: "",
    isSuccess: false,
  });

  const dispatch = useDispatch();
  const { user } = useAuth();

  // const form = useForm({
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //     rememberMe: true
  //   }
  // })

  useEffect(() => {
    if (user) {
      router.push("/dashboard/orders");
    }
  }, [user, router]);

  const banner = {
    backgroundImage: `url('/images/loginhero.jpeg')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "750px",
  };

  return (
    <div className='px-4 pt-2 md:p-0' style={banner}>
      <div className='flex w-full flex-col rounded-md bg-gray-400 bg-opacity-70 px-4 py-8 md:h-full md:flex-row md:bg-transparent md:p-0'>
        <div className='w-full text-white md:w-[60%] md:pt-2'>
          <h1 className='hidden text-center text-6xl uppercase md:block'>
            Get Access
          </h1>
          <h1 className='block text-center text-2xl uppercase md:hidden'>
            Welcome Back
          </h1>
          <div className='h-2 w-full bg-primary'></div>
        </div>

        <div className='flex w-full items-center justify-center md:w-[40%] md:bg-gray-400 md:bg-opacity-90'>
          <div className='w-full pt-2 shadow-[0_1px_3px_0_rgba(0,0,0,0.09)] md:px-12 md:py-20'>
            <h2 className='border-b border-gray-200 pb-4 text-2xl font-bold uppercase text-white'>
              Login
            </h2>
            {errors.length > 0 &&
              errors.map((error: any) => (
                <Alert
                  variant='destructive'
                  key={error.message}
                  className='mt-4'
                >
                  <AlertDescription>{error.message}</AlertDescription>
                </Alert>
              ))}
            {success.isSuccess && (
              <Alert className='mt-4'>
                <AlertDescription>{success.message}</AlertDescription>
              </Alert>
            )}
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                setIsSubmitting(true);
                userLogin({ email: values.email, password: values.password })
                  .then(async (data) => {
                    if (Array.isArray(data)) {
                      setSuccess({ isSuccess: false, message: "" });
                      return setErrors(data);
                    }
                    setErrors([]);
                    setSuccess({
                      isSuccess: true,
                      message: "Login successful",
                    });
                    dispatch(
                      setAccessToken({ accessToken: data.token.accessToken })
                    );
                    dispatch(
                      setRefreshToken({
                        refreshToken: data.token.refreshToken,
                      })
                    );
                    dispatch(setUserDetails({ userDetails: data.user }));

                    router.push("/dashboard");
                  })
                  .finally(() => {
                    setIsSubmitting(false);
                  });
              }}
            >
              {({ errors: formErrors, touched }: any) => (
                <Form className='mt-6 space-y-4'>
                  <div>
                    <label
                      className='mb-1 block font-semibold text-white'
                      htmlFor='email'
                    >
                      Email address
                    </label>
                    <Field name='email'>
                      {({ field }: any) => (
                        <Input
                          {...field}
                          type='email'
                          className={`bg-white ${formErrors.email && touched.email
                            ? "border-red-500"
                            : ""
                            }`}
                        />
                      )}
                    </Field>
                    {formErrors.email && touched.email && (
                      <p className='mt-1 text-sm text-red-500'>
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className='mb-1 block font-semibold text-white'
                      htmlFor='password'
                    >
                      Password
                    </label>
                    <Field name='password'>
                      {({ field }: any) => (
                        <Input
                          {...field}
                          type='password'
                          className={`bg-white ${formErrors.password && touched.password
                            ? "border-red-500"
                            : ""
                            }`}
                        />
                      )}
                    </Field>
                    {formErrors.password && touched.password && (
                      <p className='mt-1 text-sm text-red-500'>
                        {formErrors.password}
                      </p>
                    )}
                  </div>
                  <div className='text-end'>
                    <p className='text-sm text-white'>
                      <Link href='/forgot-password' className='hover:underline'>
                        Forgot password?
                      </Link>
                    </p>
                  </div>
                  <Button
                    type='submit'
                    className='w-full bg-primary uppercase'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Sign In"}
                  </Button>
                </Form>
              )}
            </Formik>

            <div className='flex flex-col'>
              <p className='text-center flex text-white gap-2 justify-center items-center mt-5'>
                <hr className='border-t w-1/2' />
                Or <hr className='border-t w-1/2' />
              </p>

              <div className='flex flex-col items-center justify-center'>
                <GoogleAuth />
                <FacebookAuth />
              </div>
            </div>
            <div className='my-4 flex items-center justify-end gap-1'>
              <div className='w-full'>
                <hr className='border-t border-gray-200' />
              </div>
              <p className='text-nowrap text-sm text-white'>
                <Link href='/register' className='hover:underline'>
                  {"Don't have an account?"}
                </Link>
              </p>
              <div className='w-full '>
                <hr className='border-t border-gray-200' />
              </div>
            </div>

            <img className="w-40 mx-auto" src="/images/logo.png" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
