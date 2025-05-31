'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { apiBaseUrl } from '@/utils/api';

// EmailVerification Component
const EmailVerification = () => {
  const searchParams = useSearchParams(); // Hook to access query parameters (e.g., token and email)
  const [sucessMessage, setSuccessMessage] = useState(''); // State to store success messages
  const router = useRouter(); // Hook for navigation
  const [verificationStarted, setVerificationStarted] = useState(false); // State to track if verification has started
  const [timer, setTimer] = useState(3); // Countdown timer for redirecting to the login page

  // Effect to handle email verification
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        // Send a POST request to the email verification API endpoint
        const response = await fetch(`${apiBaseUrl}/auth/email-verification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, email }),
        });
        const result = await response.json(); // Parse the response JSON

        // Handle successful email verification
        if (result.statusCode === 200) {
          setSuccessMessage('Email verified successfully');
        } else {
          // Handle cases where the email is already verified
          if (result.errors[0]?.message === 'Email already verified') {
            setSuccessMessage('Email already verified');
          } else {
            // Redirect to the failure page if verification fails
            router.push('/auth/email-verification-failed');
          }
        }
      } catch (error) {
        // Redirect to the failure page in case of an error
        console.log('error === ', error);
        router.push('/auth/email-verification-failed');
      } finally {
        setVerificationStarted(false);
      }
    };

    // Trigger email verification if a token is present and verification hasn't started
    if (searchParams.get('token') && !verificationStarted) {
      setVerificationStarted(true);
      verifyEmail();
    }
  }, []);

  // Effect to handle redirection to the login page after successful verification
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let intervalTimer: NodeJS.Timeout;
    if (sucessMessage) {
      // Redirect to the login page after 3 seconds
      timer = setTimeout(() => {
        router.push('/login');
      }, 3000);
      // Update the countdown timer every second
      intervalTimer = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      // Cleanup timers when the component unmounts or the effect re-runs
      return () => {
        clearInterval(intervalTimer);
        clearTimeout(timer);
      };
    }
  }, [sucessMessage, router]);

  return (
    <div className="py-56 text-center text-3xl">
      {verificationStarted ? (
        'Please wait...'
      ) : sucessMessage.length ? (
        <div>
          <div className="text-center text-3xl text-primary">
            {sucessMessage}
          </div>
          <Link href={'/login'} className="text-center text-lg">
            Redirecting to login page in{' '}
            <span className="text-primary">{timer}</span>
          </Link>
        </div>
      ) : (
        'Something Went Wrong'
      )}
    </div>
  );
};

export default EmailVerification;
