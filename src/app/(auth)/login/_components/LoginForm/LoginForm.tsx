'use client';

import { useLogin } from './useLogin';
import { formSchema, defaultValues, TFieldValues } from './loginSchema';
import GenericForm from '@/lib/generic-form/GenericForm';
import Text from '@/lib/generic-form/fields/Text';
import TextPassword from '@/lib/generic-form/fields/TextPassword';
import TextCheckBox from '@/lib/generic-form/fields/TextCheck';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginForm = () => {
  const { onSubmit, errors, success, isSubmitting } = useLogin();

  return (
    <>
      {errors.length > 0 &&
        errors.map((error) => (
          <Alert variant="destructive" key={error.message} className="my-4">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ))}

      {success.isSuccess && (
        <Alert className="my-4">
          <AlertDescription>{success.message}</AlertDescription>
        </Alert>
      )}

      <GenericForm
        schema={formSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      >
        <div>
          <Text<TFieldValues>
            name="email"
            placeholder="email@email.com"
            heading="Email"
            showMessage={true}
          />
        </div>

        <div className="flex flex-col gap-2">
          <TextPassword<TFieldValues>
            name="password"
            placeholder="Enter your password"
            heading="Password"
            showMessage={true}
            checkForgotPassword={true}
          />
        </div>

        <div>
          <TextCheckBox<TFieldValues> name="terms" />
        </div>

        <div>
          <Button
            className="w-full !h-11 bg-[#F6511D] hover:bg-orange-500"
            type="submit"
            disabled={isSubmitting}
          >
            <img src="UserCircle.svg" className="w-5 h-5 text-white" />{' '}
            {isSubmitting ? 'Please wait...' : 'Login'}
          </Button>
        </div>
      </GenericForm>
    </>
  );
};

export default LoginForm;
