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

export interface UseFacebookAuthParams {
  role: string;
}

export interface UseFacebookAuthReturn {
  loading: boolean;
  error: string | null;
  handleFacebookLogin: () => void;
}

/**
 * Hook for Facebook OAuth authentication flow
 * Handles OAuth callback params (accessToken, refreshToken, userDetails) from URL
 * Dispatches auth data to Redux and redirects to dashboard on success
 */
export const useFacebookAuth = ({
  role,
}: UseFacebookAuthParams): UseFacebookAuthReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Handle OAuth callback on mount - check for auth params in URL
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
  }, [searchParams, router, dispatch]);

  const handleFacebookLogin = (): void => {
    window.location.href = `${apiBaseUrl}/auth/signin-with-facebook?role=${role}`;
  };

  const error = searchParams.get('error');

  return {
    loading,
    error,
    handleFacebookLogin,
  };
};
