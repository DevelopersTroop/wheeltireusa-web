'use client';

import { apiBaseUrl } from '@/utils/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { TResetPasswordFields } from './resetPasswordSchema';

export const useResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ message: string; field: string }[]>(
    []
  );
  const [success, setSuccess] = useState<{
    isSuccess: boolean;
    message: string;
  }>({ isSuccess: false, message: '' });

  const handleSubmit = async (values: TResetPasswordFields) => {
    setIsLoading(true);

    if (values.newPassword !== values.confirmPassword) {
      setErrors([
        { message: 'Passwords do not match', field: 'confirmPassword' },
      ]);
      setIsLoading(false);
      return;
    }

    const response = await fetch(`${apiBaseUrl}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: values.newPassword,
        token: searchParams.get('token'),
        email: searchParams.get('email'),
      }),
    });

    if (!response.ok) {
      setErrors([
        {
          message: 'Something went wrong. Please try again later.',
          field: 'confirmPassword',
        },
      ]);
      setIsLoading(false);
      return;
    }

    setSuccess({
      isSuccess: true,
      message: 'Password reset successful. Redirecting to login...',
    });

    setTimeout(() => {
      router.push('/login');
    }, 1000);

    setIsLoading(false);
  };

  return { isLoading, errors, success, handleSubmit };
};
