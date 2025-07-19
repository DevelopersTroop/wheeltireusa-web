'use client';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import GenericForm from '@/lib/generic-form/GenericForm';
import Text from '@/lib/generic-form/fields/Text';
// import { accountSchema, TAccountFieldValues } from '../schema/accountSchema';
// import { useAccountDetails } from '../hooks/useAccountDetails';
import LoadingSpinner from '@/components/ui/loading-spinner/loading-spinner';
import { useAccountDetails } from './useAccountDetails';
import { accountSchema, TAccountFieldValues } from './accountSchema';

const AccountForm = () => {
  const { loading, error, success, defaultValues, updateAccount } =
    useAccountDetails();

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
        schema={accountSchema}
        defaultValues={defaultValues}
        onSubmit={updateAccount}
      >
        <div className="w-full flex flex-col min-[500px]:flex-row items-center gap-4">
          <div className="w-full">
            <Text<TAccountFieldValues>
              name="firstName"
              placeholder="First Name"
              heading="First Name"
              showMessage={true}
            />
          </div>
          <div className="w-full">
            <Text<TAccountFieldValues>
              name="lastName"
              placeholder="Last Name"
              heading="Last Name"
              showMessage={true}
            />
          </div>
        </div>

        <div className="flex flex-col min-[500px]:flex-row items-center gap-4 mt-4">
          <div className="w-full">
            <Text<TAccountFieldValues>
              name="role"
              placeholder="Role"
              heading="Role"
              showMessage={true}
              disabled={true}
            />
          </div>
          <div className="w-full">
            <Text<TAccountFieldValues>
              name="email"
              type="email"
              placeholder="Email"
              heading="Email"
              showMessage={true}
              disabled={true}
            />
          </div>
        </div>

        <div className="mt-6">
          <Button className="w-[140px] font-semibold text-lg">Save</Button>
        </div>
      </GenericForm>
    </div>
  );
};

export default AccountForm;
