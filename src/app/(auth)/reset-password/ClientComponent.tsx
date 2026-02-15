"use client";
import { apiBaseUrl } from "@/utils/api";
import { TextInput } from "@/components/ui/textinput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "@/components/ui/alert";

// ClientComponent for handling the reset password functionality
const ClientComponent = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [isLoadin, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{ message: string; field: string; }[]>([]);
    const [success, setSuccess] = useState<{
        isSuccess: boolean;
        message: string;
    }>({
        message: "",
        isSuccess: false,
    });

    // Initialize the form with default values
    const form = useForm({
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    })

    // Function to handle form submission
    async function onSubmit(values: { newPassword: string, confirmPassword: string }) {
        setIsLoading(true) // Set loading state to true

        // Check if the passwords match
        if (values.newPassword !== values.confirmPassword) {
            setErrors([{ message: "Passwords do not match", field: "confirmPassword" }]);
            setIsLoading(false)
            return;
        }

        // Send the reset password request to the server
        const response = await fetch(`${apiBaseUrl}/auth/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: values.newPassword,
                token: searchParams.get('token'),
                email: searchParams.get('email')
            }),
        });

        // Handle server response
        if (!response.ok) {
            setErrors([{ message: "Something went wrong, Please try again letter", field: "confirmPassword" }])
            setIsLoading(false)
            return
        }

        // Set success message and redirect to login page
        setSuccess({
            isSuccess: true,
            message: 'Password reset succesful, you will be redirected to login'
        })

        setTimeout(() => {
            router.push('/login')
        }, 1000)

        setIsLoading(false) // Set loading state to false
    }
    return (
        <div className={"my-20 flex justify-center"}>
            <div
                className={
                    "w-full sm:w-4/5 md:w-1/2 lg:w-2/5 shadow-[0_1px_3px_0_rgba(0,0,0,0.09)] px-8 py-8 rounded-xs"
                }
            >
                {/* Page Title */}
                <h2 className={"text-2xl font-bold border-b pb-2.5 border-gray"}>
                    Reset Password
                </h2>
                {/* Display error messages if any */}
                {errors.length
                    ? errors.map((error) => (
                        <Alert key={error.message} variant={"destructive"}>
                            {error.message}
                        </Alert>
                    ))
                    : ""}

                {/* Display success message if the operation was successful */}
                {success.isSuccess ? (
                    <Alert variant={"default"}>{success.message}</Alert>
                ) : (
                    ""
                )}

                {/* Reset Password Form */}
                <Form {...form}>
                    <form className="space-y-4 mt-4 pt-2" onSubmit={form.handleSubmit(onSubmit)}>
                        <TextInput type="password" className="bg-white" label="New Password" required name="newPassword" control={form.control} />
                        <TextInput type="password" className="bg-white" label="Confirm Password" required name="confirmPassword" control={form.control} />
                        <Button disabled={isLoadin} className="w-40 text-lg font-semibold">
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ClientComponent;
