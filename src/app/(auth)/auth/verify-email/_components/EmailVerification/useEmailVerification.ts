'use client';

import { apiBaseUrl } from '@/utils/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useEmailVerification = () => {
  const searchParams = useSearchParams(); // Hook to access query parameters (e.g., token and email)
  const [successMessage, setSuccessMessage] = useState(''); // State to store success messages
  const router = useRouter(); // Hook for navigation
  const [verificationStarted, setVerificationStarted] = useState(false); // State to track if verification has started

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        const response = await fetch(`${apiBaseUrl}/auth/verify-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, email }),
        });

        const result = await response.json();

        if (result.statusCode === 200) {
          setSuccessMessage('Email verified successfully');
        } else if (result.errors?.[0]?.message === 'Email already verified') {
          setSuccessMessage('Email already verified');
        } else {
          router.push('/auth/email-verification-failed');
        }
      } catch (error) {
        console.log('error = ', error);
        router.push('/auth/email-verification-failed');
      } finally {
        setVerificationStarted(false);
      }
    };

    if (searchParams.get('token') && !verificationStarted) {
      setVerificationStarted(true);
      verifyEmail();
    }
  }, []);

  return { successMessage, verificationStarted };
};
