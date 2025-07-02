'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useEmailVerification } from './useEmailVerification';
import { useRouter } from 'next/navigation';

const EmailVerificationSection = () => {
  const { successMessage, verificationStarted } = useEmailVerification();
  const [timer, setTimer] = useState(3);
  const router = useRouter();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    if (successMessage) {
      timeoutId = setTimeout(() => {
        router.push('/login');
      }, 3000);

      intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [successMessage, router]);

  return (
    <div className="py-56 text-center text-3xl">
      {verificationStarted ? (
        'Please wait...'
      ) : successMessage ? (
        <div>
          <div className="text-center text-3xl text-primary">
            {successMessage}
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

export default EmailVerificationSection;
