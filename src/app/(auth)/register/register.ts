import { apiBaseUrl } from '@/utils/api';

export const userRegister = async ({
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
