'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  setAccessToken,
  setRefreshToken,
  setUserDetails,
} from '@/redux/features/userSlice';
import { TFieldValues } from './loginSchema';
import useAuth from '@/hooks/useAuth';
import { apiInstance } from '@/redux/apis/base';
import { TUser } from '@/types/user';

const userLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // Make a POST request to the signin endpoint with email and password
  const { data } = await apiInstance.post<{
    data: {
      user: TUser;
      tokens: {
        accessToken: string;
        refreshToken: string;
      };
    };
  }>(`/auth/signin`, { email, password });
  return data.data;
};

export const useLogin = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name: string; message: string }[]>([]);
  const [success, setSuccess] = useState<{
    isSuccess: boolean;
    message: string;
  }>({
    message: '',
    isSuccess: false,
  });

  useEffect(() => {
    if (user) {
      const redirect = searchParams.get('redirect');
      if (redirect) {
        router.push(redirect);
      } else {
        router.push('/dashboard/orders');
      }
    }
  }, [user, router, searchParams]);

  const onSubmit = (values: TFieldValues) => {
    setIsSubmitting(true);
    userLogin({ email: values.email, password: values.password })
      .then(async (data) => {
        if (Array.isArray(data)) {
          setSuccess({ isSuccess: false, message: '' });
          return setErrors(data);
        }
        setErrors([]);
        setSuccess({ isSuccess: true, message: 'Login successful' });
        dispatch(setAccessToken({ accessToken: data.tokens.accessToken }));
        dispatch(setRefreshToken({ refreshToken: data.tokens.refreshToken }));
        dispatch(setUserDetails({ userDetails: data.user }));

        const redirect = searchParams.get('redirect');
        if (redirect) {
          router.push(redirect);
        } else {
          router.push('/dashboard/orders');
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return { onSubmit, errors, success, isSubmitting };
};
