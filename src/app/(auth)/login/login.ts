'use client';

import { apiBaseUrl } from '@/utils/api';
import { TUser } from '@/types/user';
import { apiInstance } from '@/redux/apis/base';

export const userLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // Make a POST request to the signin endpoint with email and password
  const { data } = await apiInstance.post<{
    data: {
      user: TUser;
      token: {
        accessToken: string;
        refreshToken: string;
      };
    };
  }>(`/auth/signin`, { email, password });
  return data.data;
};
