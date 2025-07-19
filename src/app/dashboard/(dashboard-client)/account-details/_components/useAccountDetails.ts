'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '@/redux/features/userSlice';
import { apiBaseUrl } from '@/utils/api';
import useAuth from '@/hooks/useAuth';
import { TAccountFieldValues } from './accountSchema';

export const useAccountDetails = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const defaultValues: TAccountFieldValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    role: 'Customer',
  };

  const updateAccount = async (values: TAccountFieldValues) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${apiBaseUrl}/auth/profile/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
        }),
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        dispatch(setUserDetails({ userDetails: data?.data?.user }));
        setSuccess(data.message || 'Account updated successfully');
      } else {
        throw new Error(data.message || 'Failed to update account.');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, defaultValues, updateAccount };
};
