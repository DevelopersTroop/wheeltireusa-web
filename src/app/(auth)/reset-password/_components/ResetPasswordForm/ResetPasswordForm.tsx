'use client';

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import GenericForm from '@/lib/generic-form/GenericForm';
import TextPassword from '@/lib/generic-form/fields/TextPassword';
import {
  resetPasswordSchema,
  TResetPasswordFields,
} from './resetPasswordSchema';
import { useResetPassword } from './useResetPassword';

const defaultValues: TResetPasswordFields = {
  newPassword: '',
  confirmPassword: '',
};

const ResetPasswordForm = () => {
  const { isLoading, errors, success, handleSubmit } = useResetPassword();

  return (
    <div className="my-20 flex justify-center">
      <div className="w-full sm:w-4/5 md:w-1/2 lg:w-2/5 shadow-[0_1px_3px_0_rgba(0,0,0,0.09)] px-8 py-8 rounded-xs">
        <h2 className="text-2xl font-bold border-b pb-2.5 border-gray mb-4">
          Reset Password
        </h2>

        {errors.length > 0 &&
          errors.map((error) => (
            <Alert key={error.message} variant="destructive">
              {error.message}
            </Alert>
          ))}

        {success.isSuccess && <Alert>{success.message}</Alert>}

        <GenericForm
          schema={resetPasswordSchema}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 mt-6">
            <TextPassword<TResetPasswordFields>
              name="newPassword"
              placeholder="Enter your new password"
              heading="New Password"
              showMessage={true}
            />
          </div>

          <div className="flex flex-col gap-2">
            <TextPassword<TResetPasswordFields>
              name="confirmPassword"
              placeholder="Enter your confirm password"
              heading="Confirm Password"
              showMessage={true}
            />
          </div>

          <Button disabled={isLoading} className="w-40 text-lg font-semibold">
            Submit
          </Button>
        </GenericForm>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
