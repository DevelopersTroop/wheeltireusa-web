'use client';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import GenericForm from '@/lib/generic-form/GenericForm';
import TextPassword from '@/lib/generic-form/fields/TextPassword';
import LoadingSpinner from '@/components/ui/loading-spinner/loading-spinner';
import { useChangePassword } from './useChangePassword';
import { changePasswordSchema, TChangePasswordFields } from './passwordSchema';

const ChangePasswordForm = () => {
  const { loading, errors, defaultValues, changePasswordApi } =
    useChangePassword();

  if (loading) {
    return (
      <div className="w-full">
        <LoadingSpinner />
        <h1 className="text-center text-2xl text-primary mt-10">Please Wait</h1>
      </div>
    );
  }

  return (
    <div className="border-x border-b p-8">
      {errors.length > 0 &&
        errors.map((error) => (
          <Alert key={error.message} variant="destructive" className="my-4">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ))}

      <GenericForm
        schema={changePasswordSchema}
        defaultValues={defaultValues}
        onSubmit={changePasswordApi}
      >
        <div className="flex flex-col gap-2">
          <TextPassword<TChangePasswordFields>
            name="currentPassword"
            placeholder="Enter your password"
            heading="Current Password"
            showMessage={true}
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <TextPassword<TChangePasswordFields>
            name="newPassword"
            placeholder="Enter your new password"
            heading="New Password"
            showMessage={true}
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <TextPassword<TChangePasswordFields>
            name="confirmPassword"
            placeholder="Enter your confirm password"
            heading="Confirm New Password"
            showMessage={true}
          />
        </div>

        <Button className="w-[140px] text-lg font-semibold mt-6">Save</Button>
      </GenericForm>
    </div>
  );
};

export default ChangePasswordForm;
