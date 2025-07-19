'use client';

import { useState } from 'react';
import { useRegister } from './useRegister';
import {
  passwordRules,
  TFieldValues,
  formSchema,
  defaultValues,
} from './registerSchema';
import GenericForm from '@/lib/generic-form/GenericForm';
import Text from '@/lib/generic-form/fields/Text';
import TextPassword from '@/lib/generic-form/fields/TextPassword';
import TextCheckBox from '@/lib/generic-form/fields/TextCheck';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const RegisterForm = () => {
  const { onSubmit, errors, success, isLoadingRegister } = useRegister();
  const [password, setPassword] = useState('');

  return (
    <>
      {errors.length > 0 &&
        errors.map((error) => (
          <Alert variant="destructive" key={error.message} className="mt-4">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ))}

      {success.isSuccess && (
        <Alert className="mt-4">
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
            name="fullName"
            placeholder="John Smith"
            heading="Full Name"
            showMessage={true}
          />
        </div>

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
            onChangeValidationCheck={setPassword}
          />
          <div className="text-gray-600 mt-2">
            <p className="mb-1">Password must contain:</p>
            <ul className="space-y-1 text-sm">
              {passwordRules.map((rule, idx) => {
                const isValid = rule.isValid(password);
                return (
                  <li key={idx} className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                        isValid ? 'border-green-600' : 'border-gray-400'
                      }`}
                    >
                      {isValid && (
                        <span className="w-3 h-3 rounded-full bg-green-600" />
                      )}
                    </span>
                    <span>{rule.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div>
          <TextPassword<TFieldValues>
            name="confirmPassword"
            placeholder="Enter your confirm password"
            heading="Confirm Password"
            showMessage={true}
          />
        </div>

        <div>
          <TextCheckBox<TFieldValues> name="terms" />
        </div>

        <div>
          <Button
            className="w-full !h-11 bg-[#F6511D] hover:bg-orange-500"
            type="submit"
            disabled={isLoadingRegister}
          >
            <img src="UserCircle.svg" className="w-5 h-5 text-white" />{' '}
            {isLoadingRegister ? 'Please wait...' : 'Register'}
          </Button>
        </div>
      </GenericForm>
    </>
  );
};

export default RegisterForm;
