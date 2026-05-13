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

    if (!response.ok) {
      throw data; // ✅ throw full response instead of setting errors here
    }

    // ✅ success
    handleLogout();
  } catch (err: any) {
    // ✅ handle all errors in one place
    if (Array.isArray(err?.errors)) {
      setErrors(err.errors);
    } else {
      setErrors([
        { message: err?.message || 'Something went wrong.' },
      ]);
    }
  } finally {
    setLoading(false);
  }
};

  return { loading, errors, defaultValues, changePasswordApi };
};
