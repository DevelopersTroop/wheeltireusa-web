'use client';

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container/container';
import Text from '@/lib/generic-form/fields/Text';
import GenericForm from '@/lib/generic-form/GenericForm';
import { apiBaseUrl } from '@/utils/api';
import { useState } from 'react';
import { z } from 'zod';

// import Alert from '@/app/ui/alert/alert';
// import {apiBaseUrl} from '@/app/utils/api';
// import {TextInput} from '@/components/shared/text-input';
// import {Button} from '@/components/ui/button';
// import {Form} from '@/components/ui/form';
// import {useState} from 'react';
// import {useForm} from 'react-hook-form';

const formSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .nonempty('Email is required'),
});

type TFieldValues = z.infer<typeof formSchema>;

const defaultValues: TFieldValues = {
  email: '',
};

// ClientComponent for handling the forgot password functionality
const ClientComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({
    error: '',
    success: '',
  });

  // // Initialize the form with default values
  // const form = useForm({
  //     defaultValues: {
  //         email: ''
  //     }
  // })

  // Function to handle form submission
  const submit = async (values: { email: string }) => {
    setIsSubmitting(true);

    // Send a POST request to the forgot password API endpoint
    const response = await fetch(`${apiBaseUrl}/auth/forgot-password`, {
      method: 'POST',
      body: JSON.stringify({ email: values.email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Handle API response
    if (!response.ok) {
      setStatus({
        error: response.statusText,
        success: '',
      });
      setIsSubmitting(false);
      return;
    }

    // If the response is OK, set the success message
    setStatus({
      error: '',
      success: 'Password reset link sent to your email',
    });

    setIsSubmitting(false);
  };

  return (
    <Container>
      <div className={'my-20 flex justify-center'}>
        <div
          className={
            'w-full sm:w-4/5 md:w-1/2 lg:w-2/5 shadow-[0_1px_3px_0_rgba(0,0,0,0.09)] px-8 py-8 rounded-xs'
          }
        >
          {/* Page Title */}
          <h2 className={'text-2xl font-bold border-b pb-2.5 border-gray mb-4'}>
            Forgot Password
          </h2>
          <div className="mb-4">
            {/* Display error message if any */}
            {status.error.length ? (
              <Alert variant="destructive">{status.error}</Alert>
            ) : (
              ''
            )}
            {/* Display success message if any */}
            {status.success.length ? <Alert>{status.success}</Alert> : ''}
          </div>
          {/* Forgot Password Form */}
          <GenericForm
            schema={formSchema}
            defaultValues={defaultValues}
            onSubmit={submit}
          >
            <div>
              <Text<TFieldValues>
                name="email"
                placeholder="email@email.com"
                heading="Email"
                showMessage={true}
              />
            </div>
            <Button
              disabled={isSubmitting}
              className="w-40 text-lg font-semibold"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </GenericForm>
        </div>
      </div>
    </Container>
  );
};

export default ClientComponent;
