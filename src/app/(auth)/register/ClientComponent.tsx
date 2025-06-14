'use client';
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
import { userRegister } from './register';
import { Alert, AlertDescription } from '@/components/ui/alert';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters') // Minimum length check
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter') // Uppercase letter check
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter') // Lowercase letters check
  .regex(/\d/, 'Password must contain at least one digit'); // Digit check

const formSchema = z
  .object({
    fullName: z.string().min(5, 'Full name must be at least 5 characters'),
    email: z.string().email('Invalid email'),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters'),
    terms: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // This makes the error show up under confirmPassword field
  });

type TFieldValues = z.infer<typeof formSchema>;

const defaultValues: TFieldValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
};

const rules = [
  {
    label: 'Min. 8 characters',
    isValid: (pw: string) => pw.length >= 8,
  },
  {
    label: 'Uppercase letters',
    isValid: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    label: 'Lowercase letters',
    isValid: (pw: string) => /[a-z]/.test(pw),
  },
  {
    label: 'At least 1 digit',
    isValid: (pw: string) => /\d/.test(pw),
  },
];

const ClientComponent = () => {
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<
    {
      message: string;
      field: string;
      location: string;
    }[]
  >([]); // State to store error messages
  const [success, setSuccess] = useState<{
    isSuccess: boolean;
    message: string;
  }>({
    message: '',
    isSuccess: false,
  }); // State to store success status and message
  const [isLoadingRegister, setIsLoadingRegister] = useState(false); // State to track loading status

  const onSubmit = (data: TFieldValues) => {
    console.log(data);
    setIsLoadingRegister(true);
    userRegister({
      firstName: data.fullName.split(' ')[0],
      lastName: data.fullName.split(' ')[1] || '',
      email: data.email,
      password: data.password,
      role: 'customer',
    })
      .then((response) => {
        const { statusCode, data, errors } = response;
        if (data && statusCode === 201) {
          // triggerGaSignupEvent({
          //   email: values.email,
          //   role: "customer",
          //   name: `${values.firstName} ${values.lastName}`,
          // })
          // resetForm();
          // setIsVisibleForm(false);
          setSuccess({
            isSuccess: true,
            message: 'Please check your email to verify your account',
          });
          setErrors([]);
          console.log('User registered successfully:', data);
        } else if (errors) {
          setErrors(errors);
          setSuccess({ isSuccess: false, message: '' });
          console.log('Registration failed:', errors);
        }
      })
      .finally(() => {
        window.scrollTo(0, 0);
        setIsLoadingRegister(false);
        console.log('Registration process completed');
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
              Register
            </Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="max-w-[416px] flex flex-col mx-auto mt-8 mb-18 sm:mt-14 sm:mb-40 gap-6">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-[32px] font-bold text-[#210203]">
            Create Account
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-normal text-[#464853]">
              Already have an account?
            </p>
            <Link
              className="text-lg font-normal text-[#212227] underline"
              href={'/login'}
            >
              Login
            </Link>
          </div>
        </div>
        {/* Display error messages if any */}
        {errors.length > 0 &&
          errors.map((error) => (
            <Alert variant="destructive" key={error.message} className="mt-4">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          ))}
        {/* Display success message if registration is successful */}
        {success.isSuccess && (
          <Alert className="mt-4">
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
              name="fullName"
              placeholder="John Smith"
              heading="Full Name"
              showMessage={true}
            />
          </div>
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
              onChangeValidationCheck={(value) => {
                setPassword(value);
                // rules.forEach((rule) => {
                //   rule.isValid(value);
                // }
                // );
              }}
            />
            <div className="text-gray-600 mt-2">
              <p className="mb-1">Password must contain:</p>
              <ul className="space-y-1 text-sm">
                {rules.map((rule, idx) => {
                  const isValid = rule.isValid(password);
                  return (
                    <li key={idx} className="flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                          isValid ? 'border-green-600' : 'border-gray-400'
                        }`}
                      >
                        {isValid && (
                          <span className="w-3 h-3 rounded-full bg-green-600" />
                        )}
                      </span>
                      <span>{rule.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
            <TextPassword<TFieldValues>
              name="confirmPassword"
              placeholder="Enter your confirm password"
              heading="Confirm Password"
              showMessage={true}
            />
          </div>

          <div>
            <TextCheckBox<TFieldValues> name="terms" />
          </div>

          <div>
            <Button
              className="w-full !h-11 bg-[#F6511D] hover:bg-orange-500"
              type="submit"
              disabled={isLoadingRegister}
            >
              <img src="UserCircle.svg" className="w-5 h-5 text-white" />{' '}
              {isLoadingRegister ? 'Please wait...' : 'Register'}
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

export default ClientComponent;
