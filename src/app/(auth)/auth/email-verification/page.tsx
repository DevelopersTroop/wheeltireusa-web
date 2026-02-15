"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiBaseUrl } from '@/utils/api';
import Link from 'next/link';

const EmailVerification = () => {
    const searchParams = useSearchParams();
    const [sucessMessage, setSuccessMessage] = useState('') // State to store success messages
    const router = useRouter();
    const [verificationStarted, setVerificationStarted] = useState(false);
    const [timer, setTimer] = useState(3) // Countdown timer for redirecting to the login page

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const token = searchParams.get('token');
                const email = searchParams.get('email');
                const response = await fetch(`${apiBaseUrl}/auth/email-verification`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token, email }),
                });
                const result = await response.json();

                // Handle successful email verification
                if (result.statusCode === 200) {
                    setSuccessMessage('Email verified successfully')
                } else {
                    if (result.errors[0]?.message === "Email already verified") {
                        setSuccessMessage('Email already verified');
                    } else {
                        router.push("/auth/email-verification-failed");
                    }
                }
            } catch (error) {
                router.push("/auth/email-verification-failed");
            } finally {
                setVerificationStarted(false);
            }
        };
        if (searchParams.get('token') && !verificationStarted) {
            setVerificationStarted(true);
            verifyEmail();
        }
    }, []);

    // Effect to handle redirection to the login page after successful verification
    useEffect(() => {
        let timer: NodeJS.Timeout;
        let intervalTimer: NodeJS.Timeout
        if (sucessMessage) {
            // Redirect to the login page after 3 seconds
            timer = setTimeout(() => {
                router.push('/login')
            }, 3000);
            // Update the countdown timer every second
            intervalTimer = setInterval(() => {
                setTimer(prev => prev - 1)
            }, 1000)
            // Cleanup timers when the component unmounts or the effect re-runs
            return () => {
                clearInterval(intervalTimer)
                clearTimeout(timer)
            }
        }
    }, [sucessMessage, router])

    return (
        <div className='py-56 text-center text-3xl'>
            {
                verificationStarted ? 'Please wait...' : sucessMessage.length ? (
                    <div>
                        <div className='text-center text-3xl text-primary'>
                            {sucessMessage}
                        </div>
                        <Link href={'/login'} className='text-center text-lg'>
                            Redirecting to login page in  <span className='text-primary'>
                                {timer}
                            </span>
                        </Link>
                    </div>
                ) : 'Something Went Wrong'
            }
        </div>
    );
};

export default EmailVerification;