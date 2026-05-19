'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiBaseUrl } from '@/utils/api';
import Link from 'next/link';

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'error-token-expired': 'Your verification link has expired.',
  'error-token-invalid': 'Your verification link is invalid.',
  'error-token-not-found': 'Verification token not found.',
  'Email already verified': 'Your email is already verified.',
  'error-user-not-found': 'No account found for this email.',
};

const resolveAuthError = (message: string) =>
  AUTH_ERROR_MESSAGES[message] ?? message;

const EmailVerification = () => {
  const searchParams = useSearchParams();
  const [sucessMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [timer, setTimer] = useState(3);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendDone, setResendDone] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        const email = searchParams.get('email');
        const response = await fetch(`${apiBaseUrl}/auth/verify-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, email }),
        });
        const result = await response.json();

        if (result.statusCode === 200) {
          setSuccessMessage('Email verified successfully');
        } else {
          const apiMessage = result.errors?.[0]?.message ?? result.message ?? '';
          if (apiMessage === 'Email already verified') {
            setSuccessMessage('Your email is already verified.');
          } else {
            setError(resolveAuthError(apiMessage) || 'Verification link is invalid or has expired.');
          }
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      } finally {
        setVerificationStarted(false);
      }
    };
    if (searchParams.get('token') && !verificationStarted) {
      setVerificationStarted(true);
      verifyEmail();
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let intervalTimer: NodeJS.Timeout;
    if (sucessMessage) {
      timer = setTimeout(() => {
        router.push('/login');
      }, 3000);
      intervalTimer = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => {
        clearInterval(intervalTimer);
        clearTimeout(timer);
      };
    }
  }, [sucessMessage, router]);

  const handleResend = async () => {
    const email = searchParams.get('email');
    setResendLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/auth/resend-verify-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setResendDone(true);
      } else {
        setError(
          resolveAuthError(data?.errors?.[0]?.message ?? data?.message ?? '') || 'Failed to resend. Please try again.'
        );
      }
    } catch {
      setError('Failed to resend. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

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
      ) : error ? (
        <div>
          <p className="text-red-600 text-xl font-semibold mb-4">{error}</p>
          {resendDone ? (
            <p className="text-green-600 text-base">
              Verification email sent! Please check your inbox.
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={resendLoading}
              className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 disabled:opacity-60 transition text-base"
            >
              {resendLoading ? 'Sending...' : 'Resend Verification Email'}
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default EmailVerification;
