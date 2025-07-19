'use client';

import { useState } from 'react';
import { apiBaseUrl } from '@/utils/api';

export const useForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({
    error: '',
    success: '',
  });

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

  return { submit, status, isSubmitting };
};
