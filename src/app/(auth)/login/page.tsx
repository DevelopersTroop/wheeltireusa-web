'use client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container/container';
import Text from '@/lib/generic-form/fields/Text';
import TextCheckBox from '@/lib/generic-form/fields/TextCheck';
import TextPassword from '@/lib/generic-form/fields/TextPassword';
import GenericForm from '@/lib/generic-form/GenericForm';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';
import { userLogin } from './login';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type TFieldValues = z.infer<typeof formSchema>;

const defaultValues: TFieldValues = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission status
  const [errors, setErrors] = useState<
    {
      name: string;
      message: string;
    }[]
  >([]); // State to store error messages
  const [success, setSuccess] = useState<{
    isSuccess: boolean;
    message: string;
  }>({
    message: '',
    isSuccess: false,
  }); // State to store success status and message

  const onSubmit = (values: TFieldValues) => {
    console.log(values);
    setIsSubmitting(true);
    userLogin({ email: values.email, password: values.password })
      .then(async (data) => {
        if (Array.isArray(data)) {
          setSuccess({ isSuccess: false, message: '' });
          return setErrors(data);
        }
        setErrors([]);
        setSuccess({ isSuccess: true, message: 'Login successful' });
        dispatch(setAccessToken({ accessToken: data.token.accessToken }));
        dispatch(setRefreshToken({ refreshToken: data.token.refreshToken }));
        dispatch(setUserDetails({ userDetails: data.user }));

        // Redirect the user after login
        // const redirect = searchParams.get("redirect");
        // if (redirect) {
        //   router.push(redirect);
        // } else {
        //   router.push("/dashboard");
        // }
        console.log('Login successful');
        router.push('/');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const icons = [
    { src: '/google-icon-logo.svg', alt: 'Google' },
    { src: '/facebook.png', alt: 'Facebook' },
    { src: '/Apple_logo.svg', alt: 'Apple' },
  ];

  return (
    <Container>
      <div className="flex w-full items-start">
        <div className="w-full">
          <Breadcrumb>
            <Item href={`/`}>Home</Item>
            <Item href={`/login`} isEnd={true}>
              Login
            </Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="max-w-[416px] flex flex-col mx-auto mt-14 mb-40 gap-6">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-[32px] font-bold text-[#210203]">My Account</h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-normal text-[#464853]">
              Dont have an account yet?
            </p>
            <Link
              className="text-lg font-normal text-[#212227] underline"
              href={'/register'}
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Display error messages if any */}
        {errors.length > 0 &&
          errors.map((error) => (
            <Alert variant="destructive" key={error.message} className="my-4">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          ))}

        {/* Display success message if login is successful */}
        {success.isSuccess && (
          <Alert className="my-4">
            <AlertDescription>{success.message}</AlertDescription>
          </Alert>
        )}

        <GenericForm
          schema={formSchema}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        >
          <div>
            <Text<TFieldValues>
              name="email"
              placeholder="email@email.com"
              heading="Email"
              showMessage={true}
            />
          </div>
          <div className="flex flex-col gap-2">
            <TextPassword<TFieldValues>
              name="password"
              placeholder="Enter your password"
              heading="Password"
              showMessage={true}
              checkForgotPassword={true}
            />
          </div>
          <div>
            <TextCheckBox<TFieldValues> name="terms" />
          </div>

          <div>
            <Button
              className="w-full !h-11 bg-[#F6511D] hover:bg-orange-500"
              type="submit"
              disabled={isSubmitting}
            >
              <img src="UserCircle.svg" className="w-5 h-5 text-white" />{' '}
              {isSubmitting ? 'Please wait...' : 'Login'}
            </Button>
          </div>
        </GenericForm>
        <div className="flex items-center justify-center gap-2">
          <p className="text-lg font-normal text-[#61636B]">Or</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          {icons.map((icon, idx) => (
            <button
              key={idx}
              className="border border-gray-300 rounded-md p-4 hover:shadow-md transition"
            >
              <img src={icon.src} alt={icon.alt} className="w-6 h-6" />
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
