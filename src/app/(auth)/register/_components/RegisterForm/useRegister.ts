import { useState } from 'react';
import { TFieldValues } from './registerSchema';
import { apiBaseUrl } from '@/utils/api';

const userRegister = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    role: role,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(`${apiBaseUrl}/auth/signup`, requestOptions);
  const {
    statusCode,
    data,
    errors,
  }: {
    statusCode: number;
    data?: {
      user: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        verified: boolean;
        role: number;
        _id: string;
        createdAt: string;
        updatedAt: string;
      };
      accessToken: string;
      refreshToken: string;
    };
    errors?: {
      message: string;
      field: string;
      location: string;
    }[];
  } = await response.json();
  return { statusCode, data, errors };
};

export const useRegister = () => {
  const [errors, setErrors] = useState<
    { message: string; field: string; location: string }[]
  >([]);
  const [success, setSuccess] = useState<{
    isSuccess: boolean;
    message: string;
  }>({
    message: '',
    isSuccess: false,
  });
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);

  const onSubmit = (data: TFieldValues) => {
    setIsLoadingRegister(true);
    userRegister({
      firstName: data.fullName.split(' ')[0],
      lastName: data.fullName.split(' ')[1] || '',
      email: data.email,
      password: data.password,
      role: 'customer',
    })
      .then((response) => {
        const { statusCode, data, errors } = response;
        if (data && statusCode === 201) {
          setSuccess({
            isSuccess: true,
            message: 'Please check your email to verify your account',
          });
          setErrors([]);
        } else if (errors) {
          setErrors(errors);
          setSuccess({ isSuccess: false, message: '' });
        }
      })
      .finally(() => {
        window.scrollTo(0, 0);
        setIsLoadingRegister(false);
      });
  };

  return { onSubmit, errors, success, isLoadingRegister, setErrors };
};
