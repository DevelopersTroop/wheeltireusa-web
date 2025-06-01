'use client'; // Client-side component

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading-spinner/loading-spinner';
import useAuth from '@/hooks/useAuth';
// Import necessary hooks, components, and utilities
import Text from '@/lib/generic-form/fields/Text';
import GenericForm from '@/lib/generic-form/GenericForm';
import { setUserDetails } from '@/redux/features/userSlice';
import { apiBaseUrl } from '@/utils/api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  role: z.string().optional(),
});

type TFieldValues = z.infer<typeof formSchema>;

const AccountDetails = () => {
  // Access user authentication details
  const { user } = useAuth();

  // Local states for loading, error, and success messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const dispatch = useDispatch();

  const defaultValues: TFieldValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    role: 'Customer', // Assuming role is static for this example
  };

  // API call to update account details
  const changeAccountApi = async (values: TFieldValues) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${apiBaseUrl}/auth/profile/${user?._id}`, {
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
        const errorData = data;
        throw new Error(errorData.message || 'Failed to update account.');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while the request is in progress
  if (loading) return <LoadingSpinner />;

  return (
    <div className="border-x border-b p-8">
      {success && (
        <Alert className="my-4">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="my-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <GenericForm
        schema={formSchema}
        defaultValues={defaultValues}
        onSubmit={changeAccountApi}
      >
        <div className="w-full flex flex-col min-[500px]:flex-row items-center gap-4">
          <div className="w-full">
            <Text<TFieldValues>
              name="firstName"
              placeholder="First Name"
              heading="First Name"
              showMessage={true}
            />
          </div>
          <div className="w-full">
            <Text<TFieldValues>
              name="lastName"
              placeholder="Last Name"
              heading="Last Name"
              showMessage={true}
            />
          </div>
        </div>

        <div className="flex flex-col min-[500px]:flex-row items-center gap-4">
          <div className="w-full">
            <Text<TFieldValues>
              name="role"
              placeholder="Role"
              heading="Role"
              showMessage={true}
              disabled={true}
            />
          </div>
          <div className="w-full">
            <Text<TFieldValues>
              name="email"
              type="email"
              placeholder="Email"
              heading="Email"
              showMessage={true}
              disabled={true}
            />
          </div>
        </div>
        <div>
          <Button className="w-[140px] font-semibold text-lg">Save</Button>
        </div>
      </GenericForm>
    </div>
  );
};

export default AccountDetails;
