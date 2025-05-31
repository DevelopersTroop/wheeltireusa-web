'use client';
import { removeUser, setUserDetails } from '@/redux/features/userSlice';
import { RootState } from '@/redux/store';
import { apiBaseUrl } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

// Custom hook for managing user authentication
const useAuth = () => {
  const dispatch = useDispatch(); // Dispatch function to trigger Redux actions
  const router = useRouter(); // Router instance for navigation
  const user = useSelector((state: RootState) => state.persisted.user); // Access the current user state from Redux
  // Function to refresh the current user's details
  const refreshUser = async () => {
    // Fetch the current user's details from the API
    const getUser = async () => {
      const response = await fetch(`${apiBaseUrl}/auth/current-user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          // "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJBaGFkIiwibGFzdE5hbWUiOiJIb3NzYWluIiwiZW1haWwiOiJhaGFkeHg5OUBnbWFpbC5jb20iLCJfaWQiOiI2Nzc2Mzc3OTcyNjg1ZjAwZmE3NTdiZWMiLCJ2ZXJpZmllZCI6ZmFsc2UsInJvbGUiOjIsImlhdCI6MTczNTk3NDUyOCwiZXhwIjoxNzY3NTEwNTI4LCJhdWQiOiJBbWFuaSBGb3JnZWQiLCJpc3MiOiJBbWFuaSBGb3JnZWQifQ.eHiKW52FGZ_qVJyeYQGIkSoGXJaOD2P3KFqmRWcb9JI`
        },
      });
      const { statusCode, data } = await response.json();
      // If the API response is successful, return the user data
      if (statusCode === 200) {
        return data['user'];
      } else {
        return null; // Return null if the API response is unsuccessful
      }
    };

    const refreshedUser = await getUser();
    if (refreshedUser) {
      // If user data is successfully fetched, update the Redux store
      dispatch(
        setUserDetails({
          userDetails: refreshedUser,
        })
      );
      return refreshedUser;
    } else {
      return null;
    }
  };
  // Function to log out the user
  const logout = (redirectToLoginPage: boolean = false) => {
    dispatch(removeUser());
    if (redirectToLoginPage) {
      router.push('/login');
    }
  };

  // Function to sign up a new user
  const signUp = async (input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<unknown> => {
    const response = await fetch(`${apiBaseUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...input, role: 'customer' }),
    });

    const result = await response.json();

    if (!response.ok || result?.response === false) {
      const errorMessage =
        result?.errors?.[0]?.message || 'Something went wrong during signup';
      throw new Error(errorMessage);
    }

    return result.data;
  };

  // Return the functions and user state for external use
  return {
    refreshUser,
    logout,
    user:
      user.userDetails !== null
        ? { ...user?.userDetails, accessToken: user?.accessToken }
        : null,
    signUp,
  };
};

export default useAuth; // Export the custom hook as the default export
