'use client';

// import { TUser } from "@/app/types/user";
import { apiBaseUrl } from '@/utils/api';
// import { apiBaseUrl } from "@/app/utils/api";
import { TUser } from '@/types/user';

export const userLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // Make a POST request to the signin endpoint with email and password
  const response = await fetch(`${apiBaseUrl}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  // Destructure the response JSON to get statusCode, data, and errors
  const {
    statusCode,
    data,
    errors,
  }: {
    statusCode: 200;
    data: {
      user: TUser;
      token: {
        accessToken: string;
        refreshToken: string;
      };
    };
    errors: { name: string; message: string }[];
  } = await response.json();

  // Check if the status code is 200 (OK)
  if (statusCode === 200) {
    const accessToken = data.token.accessToken;
    console.log('Access Token:', accessToken);
    // Return the data if login is successful
    return data;
  } else {
    // Return the errors if login fails
    return errors;
  }
};
