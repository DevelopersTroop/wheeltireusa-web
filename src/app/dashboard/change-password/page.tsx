'use client'; // Client-side component

// Import necessary hooks, components, and utilities
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading-spinner/loading-spinner';
import TextPassword from '@/lib/generic-form/fields/TextPassword';
import GenericForm from '@/lib/generic-form/GenericForm';
// import { Field, Form, Formik } from "formik";
import { useState } from 'react';
import { z } from 'zod';

const formSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
});

type TFieldValues = z.infer<typeof formSchema>;

const defaultValues: TFieldValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePassword = () => {
  // Initialize the Redux dispatch and local state for loading and error messages
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<
    {
      message: string;
    }[]
  >([]);

  // // Access user authentication details
  // const { user } = useAuth();
  // const router = useRouter();

  // Initialize form state with react-hook-form

  // const user = {
  //   firstName: 'John',

  // Logout function to clear user data and redirect to login page
  // const handleLogout = () => {
  //   dispatch(removeUser())
  //   router.push("/login");
  // };

  // API call to change the password
  // const changePasswordApi = async (values: ChangePasswordValues) => {
  //   try {
  //     setLoading(true); // Start loading indicator
  //     setErrors([]); // Clear previous errors
  //     const response = await fetch(
  //       `${apiBaseUrl}/auth/change-password`, // API endpoint for changing password
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": `Bearer ${user?.accessToken}`,
  //         },
  //         body: JSON.stringify({
  //           oldPassword: values.currentPassword,
  //           newPassword: values.newPassword,
  //         }),
  //       }
  //     );
  //     if (response.ok) {
  //       handleLogout(); // Logout if the password change is successful
  //     } else {
  //       const errorData = await response.json();
  //       // setErrors(errorData.errors);
  //       // throw new Error(errorData.errors || "Failed to change password.");
  //       if (Array.isArray(errorData.errors)) {
  //         setErrors(errorData.errors);
  //       } else {
  //         setErrors([{ message: errorData.message || "Failed to change password." }]);
  //       }

  //       throw new Error(errorData.message || "Failed to change password.");
  //     }
  //   } catch (err) {
  //     // setError((err as Error).message);
  //     setErrors((prevErrors) => [
  //       ...prevErrors,
  //       { message: (err as Error).message || "Something went wrong." },
  //     ]);

  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Form submission handler
  const onSubmit = (values: TFieldValues) => {
    if (values.newPassword !== values.confirmPassword) {
      setErrors([
        { message: 'New password and confirm password do not match.' },
      ]);
      setLoading(false);
      return;
    }
    // changePasswordApi(values);
    console.log('Form submitted with values:', values);
  };

  return (
    <div className="border-x border-b p-8">
      {loading ? (
        <div className="w-full">
          <LoadingSpinner />
          <h1 className="text-center text-2xl text-primary mt-10">
            Please Wait
          </h1>
        </div>
      ) : (
        <>
          {errors.length > 0 &&
            errors.map((error) => (
              <Alert variant="destructive" key={error.message} className="mt-4">
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            ))}

          <GenericForm
            schema={formSchema}
            defaultValues={defaultValues}
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-2">
              <TextPassword<TFieldValues>
                name="currentPassword"
                placeholder="Enter your current password"
                heading="Current Password (leave blank to leave unchanged)"
                showMessage={true}
              />
            </div>

            <div className="flex flex-col gap-2">
              <TextPassword<TFieldValues>
                name="newPassword"
                placeholder="Enter your new password"
                heading="New Password (leave blank to leave unchanged)"
                showMessage={true}
              />
            </div>

            <div className="flex flex-col gap-2">
              <TextPassword<TFieldValues>
                name="confirmPassword"
                placeholder="Enter your confirm password"
                heading="Confirm new Password"
                showMessage={true}
              />
            </div>

            <Button className="w-[140px] text-lg font-semibold">Save</Button>
          </GenericForm>
        </>
      )}
    </div>
  );
};

export default ChangePassword;
