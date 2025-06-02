'use client';

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import TextPassword from '@/lib/generic-form/fields/TextPassword';
import GenericForm from '@/lib/generic-form/GenericForm';
import { apiBaseUrl } from '@/utils/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

// import Alert from "@/app/ui/alert/alert";
// import { apiBaseUrl } from "@/app/utils/api";
// import { TextInput } from "@/components/shared/text-input";
// import { Button } from "@/components/ui/button";
// import { Form } from "@/components/ui/form";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters') // Minimum length check
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter') // Uppercase letter check
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter') // Lowercase letters check
  .regex(/\d/, 'Password must contain at least one digit'); // Digit check

const formSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // This makes the error show up under confirmPassword field
  });

type TFieldValues = z.infer<typeof formSchema>;

const defalutValues: TFieldValues = {
  newPassword: '',
  confirmPassword: '',
};

// ClientComponent for handling the reset password functionality
const ClientComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ message: string; field: string }[]>(
    []
  );
  const [success, setSuccess] = useState<{
    isSuccess: boolean;
    message: string;
  }>({
    message: '',
    isSuccess: false,
  });

  // Function to handle form submission
  async function onSubmit(values: {
    newPassword: string;
    confirmPassword: string;
  }) {
    setIsLoading(true); // Set loading state to true

    // Check if the passwords match
    if (values.newPassword !== values.confirmPassword) {
      setErrors([
        { message: 'Passwords do not match', field: 'confirmPassword' },
      ]);
      setIsLoading(false);
      return;
    }

    // Send the reset password request to the server
    const response = await fetch(`${apiBaseUrl}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: values.newPassword,
        token: searchParams.get('token'),
        email: searchParams.get('email'),
      }),
    });

    // Handle server response
    if (!response.ok) {
      setErrors([
        {
          message: 'Something went wrong, Please try again letter',
          field: 'confirmPassword',
        },
      ]);
      setIsLoading(false);
      return;
    }

    // Set success message and redirect to login page
    setSuccess({
      isSuccess: true,
      message: 'Password reset succesful, you will be redirected to login',
    });

    setTimeout(() => {
      router.push('/login');
    }, 1000);

    setIsLoading(false); // Set loading state to false
  }
  return (
    <div className={'my-20 flex justify-center'}>
      <div
        className={
          'w-full sm:w-4/5 md:w-1/2 lg:w-2/5 shadow-[0_1px_3px_0_rgba(0,0,0,0.09)] px-8 py-8 rounded-xs'
        }
      >
        {/* Page Title */}
        <h2 className={'text-2xl font-bold border-b pb-2.5 border-gray mb-4'}>
          Reset Password
        </h2>
        {/* Display error messages if any */}
        {errors.length
          ? errors.map((error) => (
              <Alert variant="destructive" key={error.message}>
                {error.message}
              </Alert>
            ))
          : ''}

        {/* Display success message if the operation was successful */}
        {success.isSuccess ? <Alert>{success.message}</Alert> : ''}

        {/* Reset Password Form */}

        <GenericForm
          schema={formSchema}
          defaultValues={defalutValues}
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-2 mt-6">
            <TextPassword<TFieldValues>
              name="newPassword"
              placeholder="Enter your new password"
              heading="New Password"
              showMessage={true}
            />
          </div>

          <div className="flex flex-col gap-2">
            <TextPassword<TFieldValues>
              name="confirmPassword"
              placeholder="Enter your confirm password"
              heading="Confirm Password"
              showMessage={true}
            />
          </div>

          <Button disabled={isLoading} className="w-40 text-lg font-semibold">
            Submit
          </Button>
        </GenericForm>
      </div>
    </div>
  );
};

export default ClientComponent;
