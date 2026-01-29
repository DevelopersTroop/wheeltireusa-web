'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import {
  setAccessToken,
  setRefreshToken,
  setUserDetails,
} from '@/redux/features/userSlice';
import { apiBaseUrl } from '@/utils/api';

export default function FacebookAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const userDetails = searchParams.get('userDetails');

    if (accessToken && refreshToken && userDetails) {
      setLoading(true);
      const parsedUser = JSON.parse(decodeURIComponent(userDetails));

      dispatch(setAccessToken({ accessToken }));
      dispatch(setRefreshToken({ refreshToken }));
      dispatch(setUserDetails({ userDetails: parsedUser }));
      router.push('/dashboard');
    }
  }, [searchParams, router]);

  const handleGoogleLogin = () => {
    window.location.href = `${apiBaseUrl}/auth/signin-with-facebook`;
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="border border-gray-300 rounded-md p-4 hover:shadow-md transition"
      >
        {loading ? (
          <div className="flex justify-center">
            <div className="spinner border-t-2 border-primary rounded-full w-6 h-6 animate-spin"></div>
          </div>
        ) : (
          <img src="/facebook.png" alt="Google" className="w-6 h-6 m-auto" />
        )}
      </button>

      {searchParams.get('error') && (
        <p className="mt-4 text-red-500">
          Authentication failed. Please try again.
        </p>
      )}
    </div>
  );
}
