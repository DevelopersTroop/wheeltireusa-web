'use client';

import { Button } from '@/components/ui/button';
import Text from '@/lib/generic-form/fields/Text';
import GenericForm from '@/lib/generic-form/GenericForm';
import { Alert } from '@/components/ui/alert';
import { useForgotPassword } from './useForgotPassword';
import {
  formSchema,
  defaultValues,
  TFieldValues,
} from './forgotPasswordSchema';

const ForgotPasswordForm = () => {
  const { submit, status, isSubmitting } = useForgotPassword();

  return (
    <>
      <div className="mb-4">
        {status.error.length > 0 && (
          <Alert variant="destructive">{status.error}</Alert>
        )}

        {status.success.length > 0 && <Alert>{status.success}</Alert>}
      </div>

      <GenericForm
        schema={formSchema}
        defaultValues={defaultValues}
        onSubmit={submit}
      >
        <div>
          <Text<TFieldValues>
            name="email"
            placeholder="email@email.com"
            heading="Email"
            showMessage={true}
          />
        </div>

        <Button disabled={isSubmitting} className="w-40 text-lg font-semibold">
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </GenericForm>
    </>
  );
};

export default ForgotPasswordForm;
