'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { apiBaseUrl } from '@/utils/api';
import { removeUser } from '@/redux/features/userSlice';
import useAuth from '@/hooks/useAuth';
import { TChangePasswordFields } from './passwordSchema';

export const useChangePassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const defaultValues: TChangePasswordFields = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleLogout = () => {
    dispatch(removeUser());
    router.push('/login');
  };

  const changePasswordApi = async (values: TChangePasswordFields) => {
    try {
      setLoading(true);
      setErrors([]);

      const response = await fetch(`${apiBaseUrl}/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify({
          oldPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        handleLogout();
      } else {
        if (Array.isArray(data.errors)) {
          setErrors(data.errors);
        } else {
          setErrors([
            { message: data.message || 'Failed to change password.' },
          ]);
        }
        throw new Error(data.message || 'Failed to change password.');
      }
    } catch (err) {
      setErrors((prevErrors) => [
        ...prevErrors,
        { message: (err as Error).message || 'Something went wrong.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, defaultValues, changePasswordApi };
};
